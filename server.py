import http.server
import socketserver
import json
import sqlite3
import hashlib
import os
import urllib.parse
import secrets
from datetime import datetime, timedelta

PORT = int(os.environ.get('PORT', 8000))
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'ixl_curriculum.db')
ALLOWED_ORIGINS = {
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://localhost:5173',
    'null'
}

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

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
    # Ensure plain_password column exists for teacher dashboard management
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(users)")
    cols = [r['name'] for r in cursor.fetchall()]
    if 'plain_password' not in cols:
        try:
            conn.execute("ALTER TABLE users ADD COLUMN plain_password TEXT")
            conn.execute("UPDATE users SET plain_password = 'password123' WHERE role != 'teacher' AND plain_password IS NULL")
            conn.execute("UPDATE users SET plain_password = 'admin123' WHERE role = 'teacher' AND plain_password IS NULL")
        except Exception:
            pass
    conn.commit()
    conn.close()

def hash_pw(pw, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    # PBKDF2 with 100,000 iterations for secure password derivation
    dk = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}${dk.hex()}"

def verify_pw(pw, stored_hash):
    if not stored_hash:
        return False, False
    if '$' in stored_hash:
        salt, hash_val = stored_hash.split('$', 1)
        dk = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt.encode('utf-8'), 100000)
        is_valid = secrets.compare_digest(dk.hex(), hash_val)
        return is_valid, False # Already modern hash, no upgrade needed
    else:
        # Legacy unsalted SHA-256 fallback (for existing database records)
        legacy = hashlib.sha256(pw.encode('utf-8')).hexdigest()
        is_valid = secrets.compare_digest(legacy, stored_hash)
        return is_valid, True # Needs upgrade to PBKDF2

def create_session(user_id, days=7):
    token = secrets.token_hex(32)
    created_at = datetime.utcnow().isoformat()
    expires_at = (datetime.utcnow() + timedelta(days=days)).isoformat()
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO user_sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
    ''', (token, user_id, created_at, expires_at))
    conn.commit()
    conn.close()
    return token

def get_authenticated_user(headers):
    auth_header = headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None
    token = auth_header[7:].strip()
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
    return dict(user) if user else None

class StudentPortalHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        origin = self.headers.get('Origin', '')
        if origin in ALLOWED_ORIGINS or origin.startswith('http://localhost:') or origin.startswith('http://127.0.0.1:'):
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Credentials', 'true')
        elif not origin:
            self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
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

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # ---------------------------------------------------------------------
        # Authentication: Secure Login
        # ---------------------------------------------------------------------
        if path == '/api/login':
            data = self.parse_body()
            username = data.get('username', '').strip().lower()
            password = data.get('password', '')

            if not username or not password:
                return self.send_json({'success': False, 'error': 'Username and password required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE LOWER(username) = ?', (username,))
            user = cursor.fetchone()

            if not user:
                conn.close()
                return self.send_json({'success': False, 'error': 'Student username not found.'}, status=401)

            # Check password securely with PBKDF2 / upgrade legacy hash
            is_valid, needs_upgrade = verify_pw(password, user['password_hash'])
            if not is_valid:
                conn.close()
                return self.send_json({'success': False, 'error': 'Incorrect password.'}, status=401)

            if needs_upgrade:
                new_hash = hash_pw(password)
                cursor.execute('UPDATE users SET password_hash = ? WHERE id = ?', (new_hash, user['id']))
                conn.commit()

            # Create session token
            token = create_session(user['id'])

            user_data = dict(user)
            if 'password_hash' in user_data:
                del user_data['password_hash']

            # Fetch badges
            cursor.execute('SELECT badge_id, badge_name, badge_icon, badge_desc, awarded_at FROM student_badges WHERE student_id = ?', (user['id'],))
            user_data['badges'] = [dict(b) for b in cursor.fetchall()]

            conn.close()
            return self.send_json({'success': True, 'token': token, 'student': user_data})

        # ---------------------------------------------------------------------
        # Authentication: Register
        # ---------------------------------------------------------------------
        elif path == '/api/register':
            data = self.parse_body()
            username = data.get('username', '').strip().lower()
            full_name = data.get('full_name', '').strip()
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
                INSERT INTO users (username, password_hash, full_name, grade_level, avatar, xp, streak_days, role)
                VALUES (?, ?, ?, ?, ?, 100, 1, 'student')
                ''', (username, salted_hash, full_name, grade, avatar))
                user_id = cursor.lastrowid

                # Award Welcome Badge
                cursor.execute('''
                INSERT INTO student_badges (student_id, badge_id, badge_name, badge_icon, badge_desc)
                VALUES (?, 'welcome', 'Welcome Explorer', '🎓', 'Joined Rania Classroom')
                ''', (user_id,))
                conn.commit()

                token = create_session(user_id)

                cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
                user_data = dict(cursor.fetchone())
                del user_data['password_hash']
                user_data['badges'] = [{
                    'badge_id': 'welcome',
                    'badge_name': 'Welcome Explorer',
                    'badge_icon': '🎓',
                    'badge_desc': 'Joined Rania Classroom'
                }]

                conn.close()
                return self.send_json({'success': True, 'token': token, 'student': user_data})
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json({'success': False, 'error': 'Username is already taken.'}, status=409)

        # ---------------------------------------------------------------------
        # Practice Session Submit (Token protected)
        # ---------------------------------------------------------------------
        elif path == '/api/practice/submit':
            auth_user = get_authenticated_user(self.headers)
            data = self.parse_body()
            student_id = data.get('student_id')

            if auth_user:
                # Enforce that user can only submit for themselves unless teacher
                if auth_user['role'] != 'teacher' and auth_user['id'] != int(student_id):
                    return self.send_json({'success': False, 'error': 'Unauthorized student ID submission.'}, status=403)
            elif not student_id:
                return self.send_json({'success': False, 'error': 'Authentication token or valid student_id is required.'}, status=401)

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

            # Auto-complete assignment if practicing an assigned skill with score >= 70
            if smart_score >= 70:
                cursor.execute('SELECT id FROM assignments WHERE skill_code = ?', (skill_code,))
                assigned_row = cursor.fetchone()
                if assigned_row:
                    cursor.execute('INSERT OR IGNORE INTO assignment_completions (assignment_id, student_id) VALUES (?, ?)', (assigned_row['id'], student_id))

            # Check new badges
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
            data = self.parse_body()
            student_id = data.get('student_id')
            sessions = data.get('sessions', [])

            if auth_user:
                if auth_user['role'] != 'teacher' and auth_user['id'] != int(student_id):
                    return self.send_json({'success': False, 'error': 'Unauthorized.'}, status=403)
            elif not student_id:
                return self.send_json({'success': False, 'error': 'student_id required.'}, status=401)

            conn = get_db()
            cursor = conn.cursor()
            synced_count = 0
            total_xp_added = 0

            for s in sessions:
                # Avoid duplicate insertion if timestamp and skill match
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
        # Teacher: Student Roster Management
        # ---------------------------------------------------------------------
        elif path == '/api/teacher/student/create':
            auth_user = get_authenticated_user(self.headers)
            if not auth_user or auth_user.get('role') != 'teacher':
                return self.send_json({'success': False, 'error': 'Teacher authorization required.'}, status=403)

            data = self.parse_body()
            full_name = data.get('full_name', '').strip()
            username = data.get('username', '').strip().lower()
            password = data.get('password', 'StudentPass123!')
            grade = data.get('grade_level', 'Year 4')
            avatar = data.get('avatar', '🦊')

            if not full_name or not username:
                return self.send_json({'success': False, 'error': 'Name and username are required.'}, status=400)

            conn = get_db()
            cursor = conn.cursor()
            try:
                salted_hash = hash_pw(password)
                cursor.execute('''
                INSERT INTO users (username, password_hash, full_name, grade_level, avatar, xp, streak_days, role, plain_password)
                VALUES (?, ?, ?, ?, ?, 100, 1, 'student', ?)
                ''', (username, salted_hash, full_name, grade, avatar, password))
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
            full_name = data.get('full_name', '').strip()
            username = data.get('username', '').strip().lower()
            grade = data.get('grade_level', '').strip()
            avatar = data.get('avatar', '').strip()
            password = data.get('password', '').strip()

            if not student_id or not full_name or not username:
                return self.send_json({'success': False, 'error': 'student_id, full_name, and username are required'}, status=400)

            conn = get_db()
            cursor = conn.cursor()

            # Check if username is taken by another student
            cursor.execute('SELECT id FROM users WHERE LOWER(username) = ? AND id != ?', (username, student_id))
            if cursor.fetchone():
                conn.close()
                return self.send_json({'success': False, 'error': 'Username is already taken by another student.'}, status=409)

            if password:
                salted_hash = hash_pw(password)
                cursor.execute('''
                UPDATE users 
                SET full_name = ?, username = ?, 
                    grade_level = CASE WHEN ? != '' THEN ? ELSE grade_level END,
                    avatar = CASE WHEN ? != '' THEN ? ELSE avatar END,
                    password_hash = ?, plain_password = ?
                WHERE id = ? AND role != 'teacher'
                ''', (full_name, username, grade, grade, avatar, avatar, salted_hash, password, student_id))
            else:
                cursor.execute('''
                UPDATE users 
                SET full_name = ?, username = ?, 
                    grade_level = CASE WHEN ? != '' THEN ? ELSE grade_level END,
                    avatar = CASE WHEN ? != '' THEN ? ELSE avatar END
                WHERE id = ? AND role != 'teacher'
                ''', (full_name, username, grade, grade, avatar, avatar, student_id))

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
            cursor.execute('UPDATE users SET password_hash = ?, plain_password = ? WHERE id = ? AND role != \'teacher\'', (hash_pw(new_password), new_password, student_id))
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

        super().do_POST()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # ---------------------------------------------------------------------
        # Reports Endpoint with IDOR protection
        # ---------------------------------------------------------------------
        if path.startswith('/api/reports/'):
            try:
                student_id = int(path.split('/')[-1])
            except ValueError:
                return self.send_json({'success': False, 'error': 'Invalid student ID'}, status=400)

            auth_user = get_authenticated_user(self.headers)
            if auth_user and auth_user['role'] != 'teacher' and auth_user['id'] != student_id:
                return self.send_json({'success': False, 'error': 'Unauthorized to view this report.'}, status=403)

            conn = get_db()
            cursor = conn.cursor()

            # Student basic info
            cursor.execute('SELECT id, username, full_name, grade_level, avatar, xp, streak_days, created_at FROM users WHERE id = ?', (student_id,))
            student = cursor.fetchone()
            if not student:
                conn.close()
                return self.send_json({'success': False, 'error': 'Student not found'}, status=404)

            # Overall Stats
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

            # Subject Breakdown
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

            # Recent Practice History Log (last 30)
            cursor.execute('''
            SELECT id, skill_code, skill_name, subject, grade, smart_score, questions_answered, questions_correct, duration_seconds, completed_at
            FROM practice_sessions
            WHERE student_id = ?
            ORDER BY completed_at DESC
            LIMIT 30
            ''', (student_id,))
            history = [dict(h) for h in cursor.fetchall()]

            # Badges
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

        # ---------------------------------------------------------------------
        # Leaderboard
        # ---------------------------------------------------------------------
        elif path == '/api/leaderboard':
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('''
            SELECT id, username, full_name, grade_level, avatar, xp, streak_days
            FROM users
            WHERE role != 'teacher'
            ORDER BY xp DESC
            LIMIT 10
            ''')
            leaders = [dict(l) for l in cursor.fetchall()]
            conn.close()
            return self.send_json({'success': True, 'leaderboard': leaders})

        # ---------------------------------------------------------------------
        # Teacher: Overview & Class Metrics
        # ---------------------------------------------------------------------
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
                COALESCE(u.plain_password, 'password123') as password,
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

            # Attention Needed Skills (accuracy < 85%)
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

            # Mastered Skills (avg_score >= 90)
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

        # ---------------------------------------------------------------------
        # Teacher: Export Grade Roster to CSV
        # ---------------------------------------------------------------------
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

            csv_data = '\n'.join(csv_lines).encode('utf-8-sig') # with BOM for Excel Arabic/Unicode compatibility
            self.send_response(200)
            self.send_header('Content-Type', 'text/csv; charset=utf-8')
            self.send_header('Content-Disposition', 'attachment; filename="Rania_Classroom_Roster.csv"')
            self.send_header('Content-Length', str(len(csv_data)))
            self.end_headers()
            self.wfile.write(csv_data)
            return

        # ---------------------------------------------------------------------
        # Demo Students (Public helper for easy exploration)
        # ---------------------------------------------------------------------
        elif path == '/api/demo_students':
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("SELECT id, username, full_name, grade_level, avatar, xp, streak_days, role FROM users WHERE role != 'teacher' LIMIT 6")
            demos = [dict(d) for d in cursor.fetchall()]
            conn.close()
            return self.send_json({'success': True, 'students': demos})

        # ---------------------------------------------------------------------
        # Assignments Query
        # ---------------------------------------------------------------------
        elif path == '/api/assignments':
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

        # Static files
        super().do_GET()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def create_server(port=PORT):
    os.chdir(os.path.dirname(__file__))
    init_auth_db()
    return ReusableTCPServer(('', port), StudentPortalHandler)

def run_server(port=PORT):
    os.chdir(os.path.dirname(__file__))
    init_auth_db()
    ports_to_try = [port, 8080, 8001, 8088]
    for p in ports_to_try:
        try:
            with create_server(p) as httpd:
                print(f'Rania Classroom Secure Server running on http://localhost:{p}')
                httpd.serve_forever()
                break
        except OSError as e:
            if p != ports_to_try[-1]:
                print(f'Notice: Port {p} is in use ({e}), trying port {ports_to_try[ports_to_try.index(p)+1]}...')
            else:
                print(f'Error: Could not bind to any port in {ports_to_try}: {e}')

if __name__ == '__main__':
    run_server()



