import http.server
import socketserver
import json
import sqlite3
import hashlib
import os
import urllib.parse
import secrets
import threading
import html
from collections import defaultdict
from datetime import datetime, timezone, timedelta

PORT = int(os.environ.get('PORT', 8000))
HOST = os.environ.get('HOST', '127.0.0.1')
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'ixl_curriculum.db')

# Strict CORS Allowlist (No wildcard startswith, No null with credentials)
ALLOWED_ORIGINS = {
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
}

# -----------------------------------------------------------------------------
# Rate Limiting (IP-Based with Automatic TTL Cleanup)
# -----------------------------------------------------------------------------
LOGIN_ATTEMPTS = defaultdict(list)
LOGIN_LOCK = threading.Lock()
RATE_LIMIT_WINDOW = 300  # 5 minutes
RATE_LIMIT_MAX_ATTEMPTS = 5

def check_rate_limit(ip):
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(seconds=RATE_LIMIT_WINDOW)
    with LOGIN_LOCK:
        if len(LOGIN_ATTEMPTS) > 500:
            stale = [k for k, v in LOGIN_ATTEMPTS.items() if not v or v[-1] < cutoff]
            for k in stale:
                del LOGIN_ATTEMPTS[k]

        attempts = [t for t in LOGIN_ATTEMPTS[ip] if t > cutoff]
        LOGIN_ATTEMPTS[ip] = attempts
        if len(attempts) >= RATE_LIMIT_MAX_ATTEMPTS:
            return False
        return True

def record_login_attempt(ip):
    with LOGIN_LOCK:
        LOGIN_ATTEMPTS[ip].append(datetime.now(timezone.utc))

def clear_login_attempts(ip):
    with LOGIN_LOCK:
        if ip in LOGIN_ATTEMPTS:
            del LOGIN_ATTEMPTS[ip]

def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA busy_timeout=5000;")
    return conn

def cleanup_expired_sessions():
    try:
        conn = get_db()
        conn.execute("DELETE FROM user_sessions WHERE datetime('now') >= datetime(expires_at)")
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Notice: Session cleanup failed: {e}")

def init_auth_db():
    conn = get_db()
    conn.execute('''
    CREATE TABLE IF NOT EXISTS user_sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')

    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(users)")
    cols = [r['name'] for r in cursor.fetchall()]

    if 'must_reset_password' not in cols:
        try:
            conn.execute("ALTER TABLE users ADD COLUMN must_reset_password INTEGER DEFAULT 0")
        except Exception as e:
            print(f"Notice: Could not add must_reset_password: {e}")

    if 'plain_password' in cols:
        try:
            conn.execute("UPDATE users SET must_reset_password = 1 WHERE plain_password IS NOT NULL")
            conn.execute("ALTER TABLE users DROP COLUMN plain_password")
        except Exception:
            try:
                conn.execute("UPDATE users SET plain_password = NULL")
            except Exception as e:
                print(f"Notice: Could not nullify plain_password: {e}")

    crm_columns = {
        'parent_name': 'TEXT DEFAULT ""',
        'student_phone': 'TEXT DEFAULT ""',
        'parent_phone': 'TEXT DEFAULT ""',
        'payment_method': 'TEXT DEFAULT "InstaPay"',
        'payment_date': 'TEXT DEFAULT ""',
        'payment_amount': 'REAL DEFAULT 0',
        'payment_status': 'TEXT DEFAULT "overdue"'
    }
    for col_name, col_def in crm_columns.items():
        if col_name not in cols:
            try:
                conn.execute(f"ALTER TABLE users ADD COLUMN {col_name} {col_def}")
            except Exception as e:
                print(f"Notice: Could not add CRM column {col_name}: {e}")

    conn.execute('''
    CREATE TABLE IF NOT EXISTS payment_receipts (
        id TEXT PRIMARY KEY,
        student_id INTEGER NOT NULL,
        student_name TEXT,
        amount REAL DEFAULT 0,
        payment_method TEXT DEFAULT 'InstaPay',
        payment_date TEXT,
        receipt_image TEXT,
        notes TEXT,
        status TEXT DEFAULT 'pending_review',
        submitted_at TEXT,
        reviewed_at TEXT
    )
    ''')

    conn.execute('''
    CREATE TABLE IF NOT EXISTS class_sessions (
        id TEXT PRIMARY KEY,
        date TEXT,
        title TEXT,
        topic_covered TEXT,
        zoom_link TEXT,
        recording_link TEXT,
        pdf_url TEXT,
        pdf_title TEXT,
        notes TEXT,
        target_audience TEXT DEFAULT 'all',
        target_group_id TEXT DEFAULT '',
        target_student_id INTEGER DEFAULT 0,
        created_at TEXT
    )
    ''')

    cursor.execute("PRAGMA table_info(class_sessions)")
    cs_cols = [r['name'] for r in cursor.fetchall()]
    if 'target_audience' not in cs_cols:
        try:
            conn.execute("ALTER TABLE class_sessions ADD COLUMN target_audience TEXT DEFAULT 'all'")
        except Exception as e:
            print(f"Notice: Could not add target_audience: {e}")
    if 'target_group_id' not in cs_cols:
        try:
            conn.execute("ALTER TABLE class_sessions ADD COLUMN target_group_id TEXT DEFAULT ''")
        except Exception as e:
            print(f"Notice: Could not add target_group_id: {e}")
    if 'target_student_id' not in cs_cols:
        try:
            conn.execute("ALTER TABLE class_sessions ADD COLUMN target_student_id INTEGER DEFAULT 0")
        except Exception as e:
            print(f"Notice: Could not add target_student_id: {e}")

    conn.execute('''
    CREATE TABLE IF NOT EXISTS student_groups (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        grade_level TEXT,
        color TEXT DEFAULT 'indigo',
        student_ids TEXT DEFAULT '[]',
        description TEXT,
        created_at TEXT
    )
    ''')

    conn.execute('''
    CREATE TABLE IF NOT EXISTS student_unlocked_skills (
        student_id INTEGER NOT NULL,
        skill_code TEXT NOT NULL,
        unlocked_at TEXT NOT NULL,
        PRIMARY KEY(student_id, skill_code),
        FOREIGN KEY(student_id) REFERENCES users(id)
    )
    ''')
    conn.commit()
    conn.close()
    cleanup_expired_sessions()

def hash_pw(pw, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}${dk.hex()}"

def verify_pw(pw, stored_hash):
    if not stored_hash:
        return False, False
    if '$' in stored_hash:
        salt, hash_val = stored_hash.split('$', 1)
        dk = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt.encode('utf-8'), 100000)
        is_valid = secrets.compare_digest(dk.hex(), hash_val)
        return is_valid, False
    else:
        legacy = hashlib.sha256(pw.encode('utf-8')).hexdigest()
        is_valid = secrets.compare_digest(legacy, stored_hash)
        return is_valid, True

def create_session(user_id, days=7):
    token = secrets.token_hex(32)
    created_at = datetime.now(timezone.utc).isoformat()
    expires_at = (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO user_sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
    ''', (token, user_id, created_at, expires_at))
    conn.commit()
    conn.close()
    return token

def get_session_token(headers):
    auth_header = headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header[7:].strip()
        if token:
            return token
    
    cookie_header = headers.get('Cookie', '')
    if 'session_token=' in cookie_header:
        for item in cookie_header.split(';'):
            item = item.strip()
            if item.startswith('session_token='):
                return item.split('=', 1)[1].strip()
    return None

def get_authenticated_user(headers, allow_must_reset=False):
    token = get_session_token(headers)
    if not token:
        return None
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT u.*, s.token as session_token FROM users u
    JOIN user_sessions s ON u.id = s.user_id
    WHERE s.token = ? AND datetime('now') < datetime(s.expires_at)
    ''', (token,))
    user = cursor.fetchone()
    conn.close()
    if not user:
        return None
    user_dict = dict(user)
    if user_dict.get('must_reset_password') == 1 and not allow_must_reset:
        user_dict['_requires_password_reset'] = True
    return user_dict


class StudentPortalHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        origin = self.headers.get('Origin', '')
        if origin in ALLOWED_ORIGINS:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Credentials', 'true')
        
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')
        
        # Standard Modern Security Headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
        self.send_header('Content-Security-Policy', (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://www.gstatic.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; "
            "font-src 'self' https://fonts.gstatic.com data:; "
            "img-src 'self' data: https:; "
            "connect-src 'self' http://localhost:* http://127.0.0.1:* https://*.firebaseio.com https://*.googleapis.com;"
        ))

        # Cache-Control: Force browsers to always fetch fresh code
        if self.path.startswith('/api/'):
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
        elif self.path.endswith('.html') or self.path == '/' or '.' not in self.path.split('/')[-1]:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
        else:
            self.send_header('Cache-Control', 'no-cache, must-revalidate, max-age=0')

        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def send_json_with_cookie(self, data, token, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Set-Cookie', f'session_token={token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def parse_body(self):
        content_len = int(self.headers.get('Content-Length', 0))
        if content_len == 0:
            return {}
        body = self.rfile.read(content_len).decode('utf-8')
        try:
            return json.loads(body)
        except Exception:
            return {}

    def translate_path(self, path):
        fs_path = super().translate_path(path)
        root = os.path.realpath(os.getcwd())
        real = os.path.realpath(fs_path) if fs_path else ""
        
        # 1) Must stay strictly within the root directory
        if not real or (not real.startswith(root + os.sep) and real != root):
            return ""
            
        # 2) If it is a directory, serve index.html if present
        if os.path.isdir(real):
            index_path = os.path.join(real, 'index.html')
            if os.path.exists(index_path):
                real = index_path
            else:
                return ""
            
        # 3) Strict whitelist for static asset extensions
        allowed = {".html", ".js", ".css", ".ico", ".png", ".jpg", ".jpeg", ".svg", ".woff2", ".woff", ".ttf", ".json"}
        ext = os.path.splitext(real)[1].lower()
        if ext not in allowed:
            return ""
            
        # 4) Block sensitive paths
        rel = os.path.relpath(real, root).replace("\\", "/").lower()
        if rel.startswith(("data/", "tests/", "tools/", ".github/", "__pycache__/", ".git/", "scratch/")):
            return ""
            
        return real

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # ---------------------------------------------------------------------
        # Authentication: Secure Login (IP Rate Limiting + Cookie)
        # ---------------------------------------------------------------------
        if path == '/api/login':
            client_ip = self.client_address[0] if self.client_address else '127.0.0.1'
            data = self.parse_body()
            username = data.get('username', '').strip().lower()
            password = data.get('password', '')

            if not username or not password:
                return self.send_json({'success': False, 'error': 'Username and password required.'}, status=400)

            if not check_rate_limit(client_ip):
                return self.send_json({'success': False, 'error': 'Too many failed login attempts. Please wait 5 minutes.'}, status=429)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE LOWER(username) = ?', (username,))
            user = cursor.fetchone()

            if not user:
                conn.close()
                record_login_attempt(client_ip)
                return self.send_json({'success': False, 'error': 'Invalid username or password.'}, status=401)

            is_valid, needs_upgrade = verify_pw(password, user['password_hash'])
            if not is_valid:
                conn.close()
                record_login_attempt(client_ip)
                return self.send_json({'success': False, 'error': 'Invalid username or password.'}, status=401)

            clear_login_attempts(client_ip)

            if needs_upgrade:
                new_hash = hash_pw(password)
                cursor.execute('UPDATE users SET password_hash = ? WHERE id = ?', (new_hash, user['id']))
                conn.commit()

            token = create_session(user['id'])

            user_data = dict(user)
            if 'password_hash' in user_data:
                del user_data['password_hash']
            if 'plain_password' in user_data:
                del user_data['plain_password']

            cursor.execute('SELECT badge_id, badge_name, badge_icon, badge_desc, awarded_at FROM student_badges WHERE student_id = ?', (user['id'],))
            user_data['badges'] = [dict(b) for b in cursor.fetchall()]

            conn.close()
            return self.send_json_with_cookie({'success': True, 'token': token, 'student': user_data}, token)

        # ---------------------------------------------------------------------
        # Authentication: User Self Password Change (Resets must_reset_password)
        # ---------------------------------------------------------------------
        elif path == '/api/user/change_password':
            auth_user = get_authenticated_user(self.headers, allow_must_reset=True)
            if not auth_user:
                return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)

            data = self.parse_body()
            current_pw = data.get('current_password', '')
            new_pw = data.get('new_password', '')

            if not new_pw or len(new_pw) < 6:
                return self.send_json({'success': False, 'error': 'New password must be at least 6 characters.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('SELECT password_hash FROM users WHERE id = ?', (auth_user['id'],))
            user_row = cursor.fetchone()

            if current_pw:
                is_valid, _ = verify_pw(current_pw, user_row['password_hash'])
                if not is_valid:
                    conn.close()
                    return self.send_json({'success': False, 'error': 'Current password is incorrect.'}, status=401)

            new_salted_hash = hash_pw(new_pw)
            cursor.execute('UPDATE users SET password_hash = ?, must_reset_password = 0 WHERE id = ?', (new_salted_hash, auth_user['id']))
            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'message': 'Password changed successfully.'})

        # ---------------------------------------------------------------------
        # Authentication: Register (HTML Sanitized)
        # ---------------------------------------------------------------------
        elif path == '/api/register':
            data = self.parse_body()
            username = data.get('username', '').strip().lower()
            raw_full_name = data.get('full_name', '').strip()
            full_name = html.escape(raw_full_name)
            password = data.get('password', '')
            grade = data.get('grade_level', 'Year 4')
            avatar = data.get('avatar', '🦊')

            if not username or not password or not full_name:
                return self.send_json({'success': False, 'error': 'All fields are required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            try:
                salted_hash = hash_pw(password)
                cursor.execute('''
                INSERT INTO users (username, password_hash, full_name, grade_level, avatar, xp, streak_days, role, must_reset_password)
                VALUES (?, ?, ?, ?, ?, 100, 1, 'student', 0)
                ''', (username, salted_hash, full_name, grade, avatar))
                user_id = cursor.lastrowid

                cursor.execute('''
                INSERT INTO student_badges (student_id, badge_id, badge_name, badge_icon, badge_desc)
                VALUES (?, 'welcome', 'Welcome Explorer', '🎓', 'Joined Rania Classroom')
                ''', (user_id,))
                conn.commit()

                token = create_session(user_id)

                cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
                user_data = dict(cursor.fetchone())
                if 'password_hash' in user_data:
                    del user_data['password_hash']
                if 'plain_password' in user_data:
                    del user_data['plain_password']

                user_data['badges'] = [{
                    'badge_id': 'welcome',
                    'badge_name': 'Welcome Explorer',
                    'badge_icon': '🎓',
                    'badge_desc': 'Joined Rania Classroom'
                }]

                conn.close()
                return self.send_json_with_cookie({'success': True, 'token': token, 'student': user_data}, token)
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({'success': False, 'error': 'Username is already taken.'}, status=409)

        # ---------------------------------------------------------------------
        # Authentication: Logout
        # ---------------------------------------------------------------------
        elif path == '/api/logout':
            token = get_session_token(self.headers)
            if token:
                conn = get_db()
                conn.execute('DELETE FROM user_sessions WHERE token = ?', (token,))
                conn.commit()
                conn.close()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Set-Cookie', 'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True, 'message': 'Logged out successfully.'}).encode('utf-8'))
            return

        # ---------------------------------------------------------------------
        # Practice Session Submit (Token protected, IDOR verified, Password Reset Enforced)
        # ---------------------------------------------------------------------
        elif path == '/api/practice/submit':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user:
                return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
            if auth_user.get('_requires_password_reset'):
                return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            try:
                student_id = int(student_id)
            except (TypeError, ValueError):
                return self.send_json({'success': False, 'error': 'Valid student_id required.'}, status=400)

            if auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                return self.send_json({'success': False, 'error': 'Unauthorized student ID submission.'}, status=403)

            skill_code = data.get('skill_code', 'A.1')
            skill_name = data.get('skill_name', 'General Skill')
            subject = data.get('subject', 'Maths')
            grade = data.get('grade', 'Year 4')
            smart_score = int(data.get('smart_score', 0))
            answered = int(data.get('questions_answered', 0))
            correct = int(data.get('questions_correct', 0))
            duration = int(data.get('duration_seconds', 0))

            conn = get_db()
            cursor = conn.cursor()

            cursor.execute('''
            INSERT INTO practice_sessions 
            (student_id, skill_code, skill_name, subject, grade, smart_score, questions_answered, questions_correct, duration_seconds)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (student_id, skill_code, skill_name, subject, grade, smart_score, answered, correct, duration))

            xp_earned = (correct * 15) + (50 if smart_score >= 90 else 20)
            cursor.execute('UPDATE users SET xp = xp + ? WHERE id = ?', (xp_earned, student_id))

            if smart_score >= 70:
                cursor.execute('SELECT id FROM assignments WHERE skill_code = ?', (skill_code,))
                assigned_row = cursor.fetchone()
                if assigned_row:
                    cursor.execute('INSERT OR IGNORE INTO assignment_completions (assignment_id, student_id) VALUES (?, ?)', (assigned_row['id'], student_id))

            new_badges = []
            if smart_score == 100:
                cursor.execute('SELECT id FROM student_badges WHERE student_id = ? AND badge_id = ?', (student_id, 'perfectionist'))
                if not cursor.fetchone():
                    cursor.execute('''
                    INSERT INTO student_badges (student_id, badge_id, badge_name, badge_icon, badge_desc)
                    VALUES (?, 'perfectionist', 'Perfectionist', '💎', 'Achieved a perfect 100 SmartScore')
                    ''', (student_id,))
                    new_badges.append({'name': 'Perfectionist', 'icon': '💎'})

            conn.commit()
            cursor.execute('SELECT xp, streak_days FROM users WHERE id = ?', (student_id,))
            updated_user = cursor.fetchone()
            conn.close()

            return self.send_json({
                'success': True,
                'xp_earned': xp_earned,
                'total_xp': updated_user['xp'] if updated_user else 0,
                'new_badges': new_badges
            })

        # ---------------------------------------------------------------------
        # Batch Offline Synchronization Endpoint (/api/sync)
        # ---------------------------------------------------------------------
        elif path == '/api/sync':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user:
                return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
            if auth_user.get('_requires_password_reset'):
                return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            try:
                student_id = int(student_id)
            except (TypeError, ValueError):
                return self.send_json({'success': False, 'error': 'Valid student_id required.'}, status=400)

            if auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                return self.send_json({'success': False, 'error': 'Unauthorized.'}, status=403)

            sessions = data.get('sessions', [])
            conn = get_db()
            cursor = conn.cursor()
            synced_count = 0
            total_xp_added = 0

            for s in sessions:
                cursor.execute('''
                SELECT id FROM practice_sessions 
                WHERE student_id = ? AND skill_code = ? AND smart_score = ? AND completed_at = ?
                ''', (student_id, s.get('skill_code'), s.get('smart_score'), s.get('completed_at')))
                if not cursor.fetchone():
                    cursor.execute('''
                    INSERT INTO practice_sessions 
                    (student_id, skill_code, skill_name, subject, grade, smart_score, questions_answered, questions_correct, duration_seconds, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))
                    ''', (
                        student_id,
                        s.get('skill_code', 'A.1'),
                        s.get('skill_name', 'Skill'),
                        s.get('subject', 'Maths'),
                        s.get('grade', 'Year 4'),
                        s.get('smart_score', 0),
                        s.get('questions_answered', 0),
                        s.get('questions_correct', 0),
                        s.get('duration_seconds', 0),
                        s.get('completed_at')
                    ))
                    xp = (int(s.get('questions_correct', 0)) * 15) + (50 if int(s.get('smart_score', 0)) >= 90 else 20)
                    total_xp_added += xp
                    synced_count += 1

            if total_xp_added > 0:
                cursor.execute('UPDATE users SET xp = xp + ? WHERE id = ?', (total_xp_added, student_id))

            conn.commit()
            cursor.execute('SELECT xp, streak_days FROM users WHERE id = ?', (student_id,))
            updated_user = cursor.fetchone()
            conn.close()

            return self.send_json({
                'success': True,
                'synced_count': synced_count,
                'total_xp': updated_user['xp'] if updated_user else 0
            })

        # ---------------------------------------------------------------------
        # Teacher: Assignments Management
        # ---------------------------------------------------------------------
        elif path == '/api/assignments/create':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            teacher_id = auth_user['id']
            skill_code = data.get('skill_code')
            skill_name = data.get('skill_name', '')
            subject = data.get('subject', 'Maths')
            grade = data.get('grade', 'Year 4')
            due_date = data.get('due_date', '')
            instructions = data.get('instructions', '')

            if not skill_code or not due_date:
                return self.send_json({'success': False, 'error': 'Skill code and due date are required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('''
            INSERT INTO assignments (teacher_id, skill_code, skill_name, subject, grade, due_date, instructions)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (teacher_id, skill_code, skill_name, subject, grade, due_date, instructions))
            conn.commit()
            new_id = cursor.lastrowid
            conn.close()
            return self.send_json({'success': True, 'assignment_id': new_id})

        elif path == '/api/assignments/delete':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            assign_id = data.get('assignment_id')
            if not assign_id:
                return self.send_json({'success': False, 'error': 'assignment_id required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('DELETE FROM assignment_completions WHERE assignment_id = ?', (assign_id,))
            cursor.execute('DELETE FROM assignments WHERE id = ?', (assign_id,))
            conn.commit()
            conn.close()
            return self.send_json({'success': True})

        # ---------------------------------------------------------------------
        # Teacher: Student Roster Management (Zero Plaintext Passwords)
        # ---------------------------------------------------------------------
        elif path == '/api/teacher/student/create':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            raw_full_name = data.get('full_name', '').strip()
            full_name = html.escape(raw_full_name)
            username = data.get('username', '').strip().lower()
            password = data.get('password', 'StudentPass123!')
            grade = data.get('grade_level', 'Year 4')
            avatar = data.get('avatar', '🦊')

            parent_name = html.escape(data.get('parent_name', '').strip())
            student_phone = data.get('student_phone', '').strip()
            parent_phone = data.get('parent_phone', '').strip()
            payment_method = data.get('payment_method', 'InstaPay').strip()
            payment_date = data.get('payment_date', '').strip()
            payment_amount = float(data.get('payment_amount', 0) or 0)
            payment_status = data.get('payment_status', 'overdue').strip()

            if not full_name or not username:
                return self.send_json({'success': False, 'error': 'Name and username are required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            try:
                salted_hash = hash_pw(password)
                cursor.execute('''
                INSERT INTO users (
                    username, password_hash, full_name, grade_level, avatar, xp, streak_days, role,
                    parent_name, student_phone, parent_phone, payment_method, payment_date, payment_amount, payment_status, must_reset_password
                )
                VALUES (?, ?, ?, ?, ?, 100, 1, 'student', ?, ?, ?, ?, ?, ?, ?, 0)
                ''', (
                    username, salted_hash, full_name, grade, avatar,
                    parent_name, student_phone, parent_phone, payment_method, payment_date, payment_amount, payment_status
                ))
                student_id = cursor.lastrowid
                cursor.execute('''
                INSERT INTO student_badges (student_id, badge_id, badge_name, badge_icon, badge_desc)
                VALUES (?, 'welcome', 'Welcome Explorer', '🎓', 'Joined Rania Classroom')
                ''', (student_id,))
                conn.commit()
                conn.close()
                return self.send_json({'success': True, 'student_id': student_id})
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({'success': False, 'error': 'Username already exists.'}, status=409)

        elif path == '/api/teacher/student/update':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            raw_full_name = data.get('full_name', '').strip()
            full_name = html.escape(raw_full_name)
            username = data.get('username', '').strip().lower()
            grade = data.get('grade_level', '').strip()
            avatar = data.get('avatar', '').strip()
            password = data.get('password', '').strip()
            parent_name = html.escape(data.get('parent_name', '').strip())
            student_phone = data.get('student_phone', '').strip()
            parent_phone = data.get('parent_phone', '').strip()
            payment_method = data.get('payment_method', '').strip()
            payment_date = data.get('payment_date', '').strip()
            payment_amount = data.get('payment_amount', None)
            payment_status = data.get('payment_status', '').strip()

            if not student_id or not full_name or not username:
                return self.send_json({'success': False, 'error': 'student_id, full_name, and username are required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()

            cursor.execute('SELECT id FROM users WHERE LOWER(username) = ? AND id != ?', (username, student_id))
            if cursor.fetchone():
                conn.close()
                return self.send_json({'success': False, 'error': 'Username is already taken by another student.'}, status=409)

            updates = [
                'full_name = ?',
                'username = ?',
                'grade_level = CASE WHEN ? != "" THEN ? ELSE grade_level END',
                'avatar = CASE WHEN ? != "" THEN ? ELSE avatar END',
                'parent_name = CASE WHEN ? != "" THEN ? ELSE parent_name END',
                'student_phone = CASE WHEN ? != "" THEN ? ELSE student_phone END',
                'parent_phone = CASE WHEN ? != "" THEN ? ELSE parent_phone END',
                'payment_method = CASE WHEN ? != "" THEN ? ELSE payment_method END',
                'payment_date = CASE WHEN ? != "" THEN ? ELSE payment_date END',
                'payment_status = CASE WHEN ? != "" THEN ? ELSE payment_status END'
            ]
            params = [
                full_name, username, grade, grade, avatar, avatar,
                parent_name, parent_name, student_phone, student_phone, parent_phone, parent_phone,
                payment_method, payment_method, payment_date, payment_date, payment_status, payment_status
            ]

            if payment_amount is not None:
                updates.append('payment_amount = ?')
                params.append(float(payment_amount or 0))

            if password:
                salted_hash = hash_pw(password)
                updates.append('password_hash = ?')
                params.append(salted_hash)

            params.append(student_id)
            sql = f"UPDATE users SET {', '.join(updates)} WHERE id = ? AND role != 'teacher'"
            cursor.execute(sql, tuple(params))

            conn.commit()
            conn.close()
            return self.send_json({'success': True})

        elif path == '/api/teacher/student/reset_password':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            new_password = data.get('new_password', '')

            if not student_id or not new_password:
                return self.send_json({'success': False, 'error': 'student_id and new_password required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('UPDATE users SET password_hash = ?, must_reset_password = 0 WHERE id = ? AND role != \'teacher\'', (hash_pw(new_password), student_id))
            conn.commit()
            conn.close()
            return self.send_json({'success': True})

        elif path == '/api/teacher/student/delete':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')

            if not student_id:
                return self.send_json({'success': False, 'error': 'student_id required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('DELETE FROM practice_sessions WHERE student_id = ?', (student_id,))
            cursor.execute('DELETE FROM student_badges WHERE student_id = ?', (student_id,))
            cursor.execute('DELETE FROM assignment_completions WHERE student_id = ?', (student_id,))
            cursor.execute('DELETE FROM user_sessions WHERE user_id = ?', (student_id,))
            cursor.execute("DELETE FROM users WHERE id = ? AND role != 'teacher'", (student_id,))
            conn.commit()
            conn.close()
            return self.send_json({'success': True})

        # ---------------------------------------------------------------------
        # Payments Management
        # ---------------------------------------------------------------------
        elif path == '/api/payments/submit':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user:
                return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
            if auth_user.get('_requires_password_reset'):
                return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            try:
                student_id = int(student_id)
            except (TypeError, ValueError):
                student_id = auth_user['id']

            if auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                return self.send_json({'success': False, 'error': 'Unauthorized payment submission.'}, status=403)

            student_name = html.escape(data.get('student_name', auth_user.get('full_name', '')))
            amount = float(data.get('amount', 0) or 0)
            payment_method = data.get('payment_method', 'InstaPay')
            payment_date = data.get('payment_date', datetime.now(timezone.utc).strftime('%Y-%m-%d'))
            receipt_image = data.get('receipt_image', '')
            notes = html.escape(data.get('notes', ''))
            receipt_id = data.get('id') or secrets.token_hex(8)

            conn = get_db()
            cursor = conn.cursor()

            cursor.execute('''
            INSERT INTO payment_receipts (id, student_id, student_name, amount, payment_method, payment_date, receipt_image, notes, status, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', datetime('now'))
            ''', (receipt_id, student_id, student_name, amount, payment_method, payment_date, receipt_image, notes))

            cursor.execute('''
            UPDATE users SET payment_status = 'pending', payment_amount = ?, payment_date = ?, payment_method = ?
            WHERE id = ?
            ''', (amount, payment_date, payment_method, student_id))

            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'receipt_id': receipt_id, 'payment_id': receipt_id})

        elif path == '/api/payments/review':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            receipt_id = data.get('receipt_id') or data.get('payment_id')
            action = data.get('action') or data.get('status') or 'approved'
            student_id = data.get('student_id')

            if not receipt_id and not student_id:
                return self.send_json({'success': False, 'error': 'receipt_id, payment_id, or student_id required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            receipt = None
            if receipt_id:
                cursor.execute('SELECT * FROM payment_receipts WHERE id = ?', (str(receipt_id),))
                receipt = cursor.fetchone()

            new_status = 'approved' if action == 'approved' else 'rejected'
            if receipt:
                cursor.execute('UPDATE payment_receipts SET status = ?, reviewed_at = datetime("now") WHERE id = ?', (new_status, str(receipt['id'])))
                target_student_id = receipt['student_id']
                p_date = receipt['payment_date']
                p_amount = receipt['amount']
                p_method = receipt['payment_method']
            else:
                target_student_id = int(student_id) if student_id else None
                p_date = data.get('payment_date', datetime.now(timezone.utc).strftime('%Y-%m-%d'))
                p_amount = float(data.get('amount', 0) or 0)
                p_method = data.get('payment_method', 'InstaPay')

            if target_student_id:
                if action == 'approved':
                    cursor.execute('''
                    UPDATE users SET payment_status = 'paid', payment_date = ?, payment_amount = ?, payment_method = ?
                    WHERE id = ?
                    ''', (p_date, p_amount, p_method, target_student_id))
                else:
                    cursor.execute('UPDATE users SET payment_status = "overdue" WHERE id = ?', (target_student_id,))

            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'status': new_status})

        # ---------------------------------------------------------------------
        # Class Sessions (Zoom & Syllabus Log)
        # ---------------------------------------------------------------------
        elif path == '/api/sessions/create':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            session_id = data.get('id') or secrets.token_hex(8)
            date_str = data.get('session_date') or data.get('date', datetime.now(timezone.utc).strftime('%Y-%m-%d'))
            title = html.escape(data.get('title', 'Class Session'))
            topic = html.escape(data.get('topic') or data.get('topic_covered', ''))
            zoom_link = data.get('zoom_link', '')
            recording_link = data.get('recording_link', '')
            pdf_url = data.get('pdf_link') or data.get('pdf_url', '')
            pdf_title = html.escape(data.get('pdf_title', ''))
            notes = html.escape(data.get('notes', ''))
            target_audience = data.get('target_audience', 'all')
            target_group_id = data.get('target_group_id', '')
            target_student_id = int(data.get('target_student_id', 0) or 0)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('''
            INSERT INTO class_sessions (id, date, title, topic_covered, zoom_link, recording_link, pdf_url, pdf_title, notes, target_audience, target_group_id, target_student_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
            ''', (session_id, date_str, title, topic, zoom_link, recording_link, pdf_url, pdf_title, notes, target_audience, target_group_id, target_student_id))
            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'session_id': session_id})

        elif path == '/api/sessions/delete':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            session_id = data.get('session_id')
            if not session_id:
                return self.send_json({'success': False, 'error': 'session_id required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('DELETE FROM class_sessions WHERE id = ?', (session_id,))
            conn.commit()
            conn.close()
            return self.send_json({'success': True})

        # ---------------------------------------------------------------------
        # Teacher: Student Groups Management
        # ---------------------------------------------------------------------
        elif path == '/api/teacher/groups/save':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            group_id = data.get('id') or f"grp_{int(datetime.now(timezone.utc).timestamp()*1000)}"
            raw_name = data.get('name', 'Student Group').strip()
            name = html.escape(raw_name)
            grade_level = data.get('grade_level', 'Year 4').strip()
            color = data.get('color', 'indigo').strip()
            student_ids_raw = data.get('student_ids', [])
            if isinstance(student_ids_raw, str):
                try:
                    student_ids_list = json.loads(student_ids_raw)
                except Exception:
                    student_ids_list = []
            else:
                student_ids_list = student_ids_raw
            student_ids_json = json.dumps([int(x) for x in student_ids_list if str(x).isdigit()])
            description = html.escape(data.get('description', '').strip())

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('''
            INSERT INTO student_groups (id, name, grade_level, color, student_ids, description, created_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                grade_level=excluded.grade_level,
                color=excluded.color,
                student_ids=excluded.student_ids,
                description=excluded.description
            ''', (group_id, name, grade_level, color, student_ids_json, description))
            conn.commit()
            conn.close()

            return self.send_json({
                'success': True,
                'group_id': group_id,
                'group': {
                    'id': group_id,
                    'name': name,
                    'grade_level': grade_level,
                    'color': color,
                    'student_ids': json.loads(student_ids_json),
                    'description': description
                }
            })

        elif path == '/api/teacher/groups/delete':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            group_id = data.get('group_id') or data.get('id')
            if not group_id:
                return self.send_json({'success': False, 'error': 'group_id required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('DELETE FROM student_groups WHERE id = ?', (str(group_id),))
            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'group_id': group_id})

        # ---------------------------------------------------------------------
        # Teacher: Bulk Group Skills Updater
        # ---------------------------------------------------------------------
        elif path == '/api/teacher/group_skills/update':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            group_id = data.get('group_id')
            student_ids = data.get('student_ids', [])
            action = data.get('action', 'set')
            skill_codes = data.get('skill_codes', [])
            grade = data.get('grade')

            conn = get_db()
            cursor = conn.cursor()

            # If student_ids empty, fetch from group_id
            if not student_ids and group_id:
                cursor.execute('SELECT student_ids, grade_level FROM student_groups WHERE id = ?', (str(group_id),))
                grow = cursor.fetchone()
                if grow:
                    try:
                        student_ids = json.loads(grow['student_ids'])
                    except Exception:
                        student_ids = []
                    if not grade:
                        grade = grow['grade_level']

            updated_count = 0
            for sid in student_ids:
                try:
                    s_id = int(sid)
                except (ValueError, TypeError):
                    continue

                if action == 'lock_all':
                    cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (s_id,))
                elif action == 'unlock_all_grade':
                    cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (s_id,))
                    st_grade = grade
                    if not st_grade:
                        cursor.execute('SELECT grade_level FROM users WHERE id = ?', (s_id,))
                        urow = cursor.fetchone()
                        st_grade = urow['grade_level'] if urow else 'Year 4'
                    cursor.execute('''
                    INSERT OR IGNORE INTO student_unlocked_skills (student_id, skill_code, unlocked_at)
                    SELECT ?, skill_code, datetime('now') FROM skills WHERE grade_name = ?
                    ''', (s_id, st_grade))
                else:
                    cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (s_id,))
                    for code in skill_codes:
                        clean_code = str(code).strip()
                        if clean_code:
                            cursor.execute('''
                            INSERT OR IGNORE INTO student_unlocked_skills (student_id, skill_code, unlocked_at)
                            VALUES (?, ?, datetime('now'))
                            ''', (s_id, clean_code))
                updated_count += 1

            conn.commit()
            conn.close()
            return self.send_json({'success': True, 'group_id': group_id, 'updated_students': updated_count})

        # ---------------------------------------------------------------------
        # Teacher: Curriculum Access & Lesson Assigner
        # ---------------------------------------------------------------------
        elif path == '/api/teacher/student_skills/update':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            student_id = data.get('student_id')
            action = data.get('action', 'set')
            skill_codes = data.get('skill_codes', [])
            grade = data.get('grade')

            if not student_id:
                return self.send_json({'success': False, 'error': 'student_id required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()

            if action == 'lock_all':
                cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
            elif action == 'unlock_all_grade':
                cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
                if not grade:
                    cursor.execute('SELECT grade_level FROM users WHERE id = ?', (student_id,))
                    row = cursor.fetchone()
                    grade = row['grade_level'] if row else 'Year 4'
                cursor.execute('''
                INSERT OR IGNORE INTO student_unlocked_skills (student_id, skill_code, unlocked_at)
                SELECT ?, skill_code, datetime('now') FROM skills WHERE grade_name = ?
                ''', (student_id, grade))
            else:
                cursor.execute('DELETE FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
                for code in skill_codes:
                    clean_code = str(code).strip()
                    if clean_code:
                        cursor.execute('''
                        INSERT OR IGNORE INTO student_unlocked_skills (student_id, skill_code, unlocked_at)
                        VALUES (?, ?, datetime('now'))
                        ''', (student_id, clean_code))

            conn.commit()
            cursor.execute('SELECT COUNT(*) FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
            unlocked_count = cursor.fetchone()[0]
            conn.close()
            return self.send_json({'success': True, 'student_id': student_id, 'unlocked_count': unlocked_count})

        # Unknown POST endpoint
        return self.send_json({'error': 'Endpoint not found'}, status=404)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # ---------------------------------------------------------------------
        # API Endpoints
        # ---------------------------------------------------------------------
        if path.startswith('/api/'):
            # Curriculum Query API (Paginated & Lazy Loaded)
            if path == '/api/curriculum/skills':
                query_params = urllib.parse.parse_qs(parsed.query)
                subject = query_params.get('subject', [None])[0]
                grade = query_params.get('grade', [None])[0]
                category = query_params.get('category', [None])[0]
                search = query_params.get('search', [None])[0]
                
                try:
                    page = max(1, int(query_params.get('page', [1])[0]))
                except ValueError:
                    page = 1
                try:
                    limit = min(200, max(1, int(query_params.get('limit', [100])[0])))
                except ValueError:
                    limit = 100
                    
                offset = (page - 1) * limit

                conditions = []
                params = []
                if subject:
                    conditions.append("subject_name = ?")
                    params.append(subject)
                if grade:
                    conditions.append("grade_name = ?")
                    params.append(grade)
                if category:
                    conditions.append("category_code = ?")
                    params.append(category)
                if search:
                    conditions.append("(skill_name LIKE ? OR skill_code LIKE ? OR permacode LIKE ?)")
                    search_pat = f"%{search}%"
                    params.extend([search_pat, search_pat, search_pat])

                where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""
                
                conn = get_db()
                cursor = conn.cursor()
                cursor.execute(f"SELECT COUNT(*) FROM skills {where_clause}", tuple(params))
                total_count = cursor.fetchone()[0]

                cursor.execute(f'''
                SELECT id, skill_id, subject_name, grade_name, category_code, category_name, super_category, skill_code, permacode, skill_name, preview_text
                FROM skills
                {where_clause}
                ORDER BY id ASC
                LIMIT ? OFFSET ?
                ''', tuple(params + [limit, offset]))

                skills = [dict(s) for s in cursor.fetchall()]
                conn.close()

                return self.send_json({
                    'success': True,
                    'total': total_count,
                    'page': page,
                    'limit': limit,
                    'total_pages': (total_count + limit - 1) // limit if limit else 1,
                    'skills': skills
                })

            # Reports Endpoint with Strict IDOR protection
            elif path.startswith('/api/reports/'):
                try:
                    student_id = int(path.split('/')[-1])
                except ValueError:
                    return self.send_json({'success': False, 'error': 'Invalid student ID'}, status=400)

                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
                if auth_user.get('_requires_password_reset'):
                    return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)
                if auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                    return self.send_json({'success': False, 'error': 'Unauthorized to view this report.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()

                cursor.execute('SELECT id, username, full_name, grade_level, avatar, xp, streak_days, created_at FROM users WHERE id = ?', (student_id,))
                student = cursor.fetchone()
                if not student:
                    conn.close()
                    return self.send_json({'success': False, 'error': 'Student not found'}, status=404)

                cursor.execute('''
                SELECT 
                    COUNT(*) as total_sessions,
                    COALESCE(SUM(questions_answered), 0) as total_questions,
                    COALESCE(SUM(questions_correct), 0) as total_correct,
                    COALESCE(SUM(duration_seconds), 0) as total_time_spent,
                    COALESCE(AVG(smart_score), 0) as avg_smart_score,
                    COALESCE(MAX(smart_score), 0) as max_smart_score,
                    COUNT(DISTINCT skill_code) as unique_skills_practiced,
                    SUM(CASE WHEN smart_score >= 90 THEN 1 ELSE 0 END) as mastered_skills
                FROM practice_sessions
                WHERE student_id = ?
                ''', (student_id,))
                stats = dict(cursor.fetchone())

                total_q = stats['total_questions']
                accuracy = round((stats['total_correct'] / total_q * 100), 1) if total_q > 0 else 0
                stats['accuracy_rate'] = accuracy
                stats['avg_smart_score'] = round(stats['avg_smart_score'], 1)

                cursor.execute('''
                SELECT 
                    subject,
                    COUNT(*) as sessions_count,
                    COALESCE(SUM(questions_answered), 0) as questions,
                    COALESCE(SUM(questions_correct), 0) as correct,
                    COALESCE(AVG(smart_score), 0) as avg_score,
                    SUM(CASE WHEN smart_score >= 90 THEN 1 ELSE 0 END) as mastered
                FROM practice_sessions
                WHERE student_id = ?
                GROUP BY subject
                ''', (student_id,))
                subject_rows = cursor.fetchall()
                subjects_breakdown = {}
                for r in subject_rows:
                    q_count = r['questions']
                    subj_acc = round((r['correct'] / q_count * 100), 1) if q_count > 0 else 0
                    subjects_breakdown[r['subject']] = {
                        'sessions': r['sessions_count'],
                        'questions': q_count,
                        'correct': r['correct'],
                        'accuracy': subj_acc,
                        'avg_score': round(r['avg_score'], 1),
                        'mastered': r['mastered']
                    }

                cursor.execute('''
                SELECT id, skill_code, skill_name, subject, grade, smart_score, questions_answered, questions_correct, duration_seconds, completed_at
                FROM practice_sessions
                WHERE student_id = ?
                ORDER BY completed_at DESC
                LIMIT 30
                ''', (student_id,))
                history = [dict(h) for h in cursor.fetchall()]

                cursor.execute('SELECT badge_id, badge_name, badge_icon, badge_desc, awarded_at FROM student_badges WHERE student_id = ?', (student_id,))
                badges = [dict(b) for b in cursor.fetchall()]

                conn.close()

                report = {
                    'student': dict(student),
                    'summary': stats,
                    'subjects': subjects_breakdown,
                    'history': history,
                    'badges': badges
                }
                return self.send_json({'success': True, 'report': report})

            # Leaderboard (Auth Protected & Sanitized)
            elif path == '/api/leaderboard':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('''
                SELECT id, username, full_name, grade_level, avatar, xp, streak_days
                FROM users
                WHERE role != 'teacher'
                ORDER BY xp DESC
                LIMIT 10
                ''')
                leaders = []
                for l in cursor.fetchall():
                    d = dict(l)
                    raw_name = html.unescape(d.get('full_name', ''))
                    d['full_name'] = html.escape(raw_name)
                    leaders.append(d)
                conn.close()
                return self.send_json({'success': True, 'leaderboard': leaders})

            # Teacher: Overview & Class Metrics (Zero Plaintext Passwords Exposed)
            elif path == '/api/teacher/overview':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user or auth_user.get('role') != 'teacher':
                    return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                
                cursor.execute("SELECT COUNT(*) FROM users WHERE role != 'teacher'")
                total_students = cursor.fetchone()[0]
                
                cursor.execute('''
                SELECT 
                    COUNT(*) as total_sessions,
                    COALESCE(SUM(questions_answered), 0) as total_questions,
                    COALESCE(SUM(questions_correct), 0) as total_correct,
                    COALESCE(SUM(duration_seconds), 0) as total_time_spent,
                    COALESCE(AVG(smart_score), 0) as avg_smart_score
                FROM practice_sessions p
                JOIN users u ON p.student_id = u.id
                WHERE u.role != 'teacher'
                ''')
                class_stats = dict(cursor.fetchone())
                tot_q = class_stats['total_questions']
                class_stats['accuracy_rate'] = round((class_stats['total_correct'] / tot_q * 100), 1) if tot_q > 0 else 0
                class_stats['avg_smart_score'] = round(class_stats['avg_smart_score'], 1)
                class_stats['total_hours'] = round(class_stats['total_time_spent'] / 3600, 1)

                cursor.execute('''
                SELECT 
                    u.id, u.username, u.full_name, u.grade_level, u.avatar, u.xp, u.streak_days,
                    COALESCE(u.parent_name, '') as parent_name,
                    COALESCE(u.student_phone, '') as student_phone,
                    COALESCE(u.parent_phone, '') as parent_phone,
                    COALESCE(u.payment_method, 'InstaPay') as payment_method,
                    COALESCE(u.payment_date, '') as payment_date,
                    COALESCE(u.payment_amount, 0) as payment_amount,
                    COALESCE(u.payment_status, 'overdue') as payment_status,
                    COUNT(p.id) as sessions_count,
                    COALESCE(SUM(p.questions_answered), 0) as questions_answered,
                    COALESCE(SUM(p.questions_correct), 0) as questions_correct,
                    COALESCE(AVG(p.smart_score), 0) as avg_smart_score,
                    COALESCE(MAX(p.completed_at), 'Never') as last_active,
                    (SELECT COUNT(*) FROM student_badges b WHERE b.student_id = u.id) as badges_count
                FROM users u
                LEFT JOIN practice_sessions p ON u.id = p.student_id
                WHERE u.role != 'teacher'
                GROUP BY u.id
                ORDER BY u.xp DESC
                ''')
                roster = []
                for r in cursor.fetchall():
                    row = dict(r)
                    q = row['questions_answered']
                    row['accuracy_rate'] = round((row['questions_correct'] / q * 100), 1) if q > 0 else 0
                    row['avg_smart_score'] = round(row['avg_smart_score'], 1)
                    roster.append(row)

                cursor.execute('''
                SELECT 
                    skill_code, skill_name, subject, grade,
                    COUNT(*) as attempts,
                    SUM(questions_answered) as questions,
                    SUM(questions_correct) as correct,
                    ROUND(AVG(smart_score), 1) as avg_score
                FROM practice_sessions
                GROUP BY skill_code
                HAVING (CAST(SUM(questions_correct) AS FLOAT) / NULLIF(SUM(questions_answered), 0)) < 0.85
                ORDER BY avg_score ASC
                LIMIT 6
                ''')
                attention_skills = [dict(s) for s in cursor.fetchall()]

                cursor.execute('''
                SELECT 
                    skill_code, skill_name, subject, grade,
                    COUNT(*) as attempts,
                    ROUND(AVG(smart_score), 1) as avg_score
                FROM practice_sessions
                GROUP BY skill_code
                HAVING AVG(smart_score) >= 90
                ORDER BY attempts DESC
                LIMIT 6
                ''')
                mastered_skills = [dict(s) for s in cursor.fetchall()]

                conn.close()
                return self.send_json({
                    'success': True,
                    'overview': {
                        'total_students': total_students,
                        'class_stats': class_stats,
                        'roster': roster,
                        'attention_skills': attention_skills,
                        'mastered_skills': mastered_skills
                    }
                })

            # Teacher: Export Grade Roster to CSV
            elif path == '/api/teacher/export_csv':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user or auth_user.get('role') != 'teacher':
                    return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('''
                SELECT 
                    u.id, u.username, u.full_name, u.grade_level, u.xp, u.streak_days,
                    COUNT(p.id) as sessions,
                    COALESCE(SUM(p.questions_answered), 0) as questions,
                    COALESCE(SUM(p.questions_correct), 0) as correct,
                    COALESCE(ROUND(AVG(p.smart_score), 1), 0) as avg_score,
                    COALESCE(MAX(p.completed_at), 'Never') as last_active
                FROM users u
                LEFT JOIN practice_sessions p ON u.id = p.student_id
                WHERE u.role != 'teacher'
                GROUP BY u.id
                ORDER BY u.xp DESC
                ''')
                rows = cursor.fetchall()
                conn.close()

                csv_lines = ['Student ID,Username,Full Name,Grade,XP,Streak Days,Sessions,Total Questions,Correct,Accuracy Rate (%),Avg SmartScore,Last Active']
                for r in rows:
                    q = r['questions']
                    acc = round((r['correct'] / q * 100), 1) if q > 0 else 0
                    csv_lines.append(f"{r['id']},{r['username']},{r['full_name']},{r['grade_level']},{r['xp']},{r['streak_days']},{r['sessions']},{q},{r['correct']},{acc},{r['avg_score']},{r['last_active']}")

                csv_data = '\n'.join(csv_lines).encode('utf-8-sig')
                self.send_response(200)
                self.send_header('Content-Type', 'text/csv; charset=utf-8')
                self.send_header('Content-Disposition', 'attachment; filename="Rania_Classroom_Roster.csv"')
                self.send_header('Content-Length', str(len(csv_data)))
                self.end_headers()
                self.wfile.write(csv_data)
                return

            # Demo Students (Auth Protected)
            elif path == '/api/demo_students':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute("SELECT id, username, full_name, grade_level, avatar, xp, streak_days, role FROM users WHERE role != 'teacher' LIMIT 6")
                demos = [dict(d) for d in cursor.fetchall()]
                conn.close()
                return self.send_json({'success': True, 'students': demos})

            # Assignments Query (Token Protected)
            elif path == '/api/assignments':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
                if auth_user.get('_requires_password_reset'):
                    return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('''
                SELECT 
                    a.id, a.skill_code, a.skill_name, a.subject, a.grade, a.due_date, a.instructions, a.created_at,
                    (SELECT COUNT(*) FROM assignment_completions ac WHERE ac.assignment_id = a.id) as completions_count,
                    (SELECT COUNT(*) FROM users u WHERE u.role != 'teacher') as total_students
                FROM assignments a
                ORDER BY a.due_date ASC
                ''')
                assignments = [dict(r) for r in cursor.fetchall()]
                conn.close()
                return self.send_json({'success': True, 'assignments': assignments})

            elif path.startswith('/api/assignments/student/'):
                try:
                    student_id = int(path.split('/')[-1])
                except ValueError:
                    return self.send_json({'success': False, 'error': 'Invalid student ID'}, status=400)

                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)
                if auth_user.get('_requires_password_reset'):
                    return self.send_json({'success': False, 'error': 'Password reset required.', 'must_reset_password': True}, status=403)
                if auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                    return self.send_json({'success': False, 'error': 'Unauthorized to view student assignments.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('''
                SELECT 
                    a.id, a.skill_code, a.skill_name, a.subject, a.grade, a.due_date, a.instructions, a.created_at,
                    CASE WHEN ac.id IS NOT NULL THEN 1 ELSE 0 END as is_completed,
                    ac.completed_at
                FROM assignments a
                LEFT JOIN assignment_completions ac ON a.id = ac.assignment_id AND ac.student_id = ?
                ORDER BY a.due_date ASC
                ''', (student_id,))
                assignments = [dict(r) for r in cursor.fetchall()]
                conn.close()
                return self.send_json({'success': True, 'assignments': assignments})

            # Payments Query (Teacher Only)
            elif path == '/api/payments/list':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user or auth_user.get('role') != 'teacher':
                    return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM payment_receipts ORDER BY submitted_at DESC LIMIT 100')
                receipts = [dict(r) for r in cursor.fetchall()]
                conn.close()
                return self.send_json({'success': True, 'receipts': receipts, 'payments': receipts})

            # Teacher: Student Groups Query
            elif path == '/api/teacher/groups':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user or auth_user.get('role') != 'teacher':
                    return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM student_groups ORDER BY created_at DESC')
                groups = []
                for r in cursor.fetchall():
                    g = dict(r)
                    try:
                        g['student_ids'] = json.loads(g.get('student_ids', '[]'))
                    except Exception:
                        g['student_ids'] = []
                    groups.append(g)
                conn.close()
                return self.send_json({'success': True, 'groups': groups})

            # Class Sessions Query (Token Protected)
            elif path == '/api/sessions/list':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)

                conn = get_db()
                cursor = conn.cursor()

                if auth_user.get('role') == 'teacher':
                    cursor.execute('SELECT * FROM class_sessions ORDER BY date DESC, created_at DESC LIMIT 100')
                else:
                    student_id = auth_user['id']
                    # Find any groups student belongs to
                    cursor.execute('SELECT id, student_ids FROM student_groups')
                    matched_groups = []
                    for grow in cursor.fetchall():
                        try:
                            sids = json.loads(grow['student_ids'])
                            if student_id in sids or str(student_id) in sids:
                                matched_groups.append(str(grow['id']))
                        except Exception:
                            pass

                    group_placeholders = ','.join('?' * len(matched_groups)) if matched_groups else "''"
                    sql = f'''
                    SELECT * FROM class_sessions 
                    WHERE target_audience = 'all' 
                       OR target_audience IS NULL 
                       OR target_audience = '' 
                       OR target_student_id = ?
                       OR (target_audience = 'group' AND target_group_id IN ({group_placeholders}))
                    ORDER BY date DESC, created_at DESC LIMIT 100
                    '''
                    params = [student_id] + matched_groups if matched_groups else [student_id]
                    cursor.execute(sql, tuple(params))

                sessions = []
                for s in cursor.fetchall():
                    d = dict(s)
                    d['session_date'] = d.get('date')
                    d['topic'] = d.get('topic_covered')
                    d['pdf_link'] = d.get('pdf_url')
                    sessions.append(d)
                conn.close()
                return self.send_json({'success': True, 'sessions': sessions})

            # Student Curriculum Access (Allowed Grade & Unlocked Skills)
            elif path == '/api/student/curriculum_access':
                auth_user = get_authenticated_user(self.headers)
                if not auth_user:
                    return self.send_json({'success': False, 'error': 'Authentication required.'}, status=401)

                student_id = auth_user['id']
                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('SELECT skill_code FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
                unlocked_codes = [r['skill_code'] for r in cursor.fetchall()]
                conn.close()

                return self.send_json({
                    'success': True,
                    'grade_level': auth_user.get('grade_level', 'Year 4'),
                    'unlocked_skills': unlocked_codes,
                    'has_custom_access': len(unlocked_codes) > 0
                })

            # Teacher: Get Student Skills Access
            elif path.startswith('/api/teacher/student_skills/'):
                auth_user = get_authenticated_user(self.headers)
                if not auth_user or auth_user.get('role') != 'teacher':
                    return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

                try:
                    student_id = int(path.split('/')[-1])
                except ValueError:
                    return self.send_json({'success': False, 'error': 'Invalid student ID.'}, status=400)

                conn = get_db()
                cursor = conn.cursor()
                cursor.execute('SELECT id, full_name, username, grade_level FROM users WHERE id = ?', (student_id,))
                student = cursor.fetchone()
                if not student:
                    conn.close()
                    return self.send_json({'success': False, 'error': 'Student not found.'}, status=404)

                cursor.execute('SELECT skill_code FROM student_unlocked_skills WHERE student_id = ?', (student_id,))
                unlocked_codes = [r['skill_code'] for r in cursor.fetchall()]
                conn.close()

                return self.send_json({
                    'success': True,
                    'student': dict(student),
                    'unlocked_skills': unlocked_codes
                })

            # Unrecognized API endpoint
            return self.send_json({'error': 'API endpoint not found'}, status=404)

        # ---------------------------------------------------------------------
        # Static Files Serving (Strict Whitelist Protected)
        # ---------------------------------------------------------------------
        translated = self.translate_path(self.path)
        if not translated or not os.path.exists(translated):
            return self.send_json({'error': 'Forbidden or Not Found'}, status=403)

        super().do_GET()


class ReusableThreadingServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


def create_server(port=PORT, host=HOST):
    os.chdir(os.path.dirname(__file__))
    init_auth_db()
    return ReusableThreadingServer((host, port), StudentPortalHandler)

def run_server(port=PORT, host=HOST):
    os.chdir(os.path.dirname(__file__))
    init_auth_db()
    ports_to_try = [port, 8080, 8001, 8088]
    for p in ports_to_try:
        try:
            with create_server(p, host=host) as httpd:
                print(f'Rania Classroom Secure Server running on http://{host}:{p}')
                httpd.serve_forever()
                break
        except OSError as e:
            if p != ports_to_try[-1]:
                print(f'Notice: Port {p} is in use ({e}), trying port {ports_to_try[ports_to_try.index(p)+1]}...')
            else:
                print(f'Error: Could not bind to any port in {ports_to_try}: {e}')

if __name__ == '__main__':
    run_server()
