import os
import sys
import secrets

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

import server

def test_security_and_password_upgrade(temp_db=None):
    # Test 1: Wrong password
    valid, needs_up = server.verify_pw('wrong', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f')
    assert not valid

    # Test 2: Dynamic verification of password
    random_pw = f"Pass_{secrets.token_hex(6)}"
    pw_hash = server.hash_pw(random_pw)
    valid, needs_up = server.verify_pw(random_pw, pw_hash)
    assert valid and not needs_up

    # Test 3: Token generation and auth lookup
    token = server.create_session(1, days=1)
    headers = {'Authorization': f'Bearer {token}'}
    auth_user = server.get_authenticated_user(headers)
    assert auth_user and auth_user['id'] == 1

    # Test 4: Invalid/tampered token rejected
    bad_headers = {'Authorization': 'Bearer badtoken12345'}
    assert server.get_authenticated_user(bad_headers) is None

    # Test 5: Modern salted PBKDF2 hash generation
    test_hash = server.hash_pw('SecurePassword_123!')
    assert '$' in test_hash
    salt, hash_val = test_hash.split('$', 1)
    assert len(salt) == 32
    assert len(hash_val) == 64
    is_valid, needs_upgrade = server.verify_pw('SecurePassword_123!', test_hash)
    assert is_valid and not needs_upgrade

def test_teacher_student_management_crud(temp_db=None):
    conn = server.get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE username = 'test_student_edit'")
    test_pw = f"PassInit_{secrets.token_hex(4)}"
    cursor.execute('''
    INSERT INTO users (username, password_hash, full_name, grade_level, avatar, xp, streak_days, role, must_reset_password)
    VALUES (?, ?, ?, ?, ?, 50, 1, 'student', 0)
    ''', ('test_student_edit', server.hash_pw(test_pw), 'Original Name', 'Year 4', '🦊'))
    conn.commit()
    test_student_id = cursor.lastrowid

    # Test update full_name, grade_level, avatar, and new password
    updated_pw = f"PassUpdate_{secrets.token_hex(4)}"
    cursor.execute('''
    UPDATE users 
    SET full_name = ?, username = ?, 
        grade_level = ?, avatar = ?, 
        password_hash = ?
    WHERE id = ? AND role != 'teacher'
    ''', ('Updated Full Name', 'test_student_edit_renamed', 'Year 5', '🦁', server.hash_pw(updated_pw), test_student_id))
    conn.commit()

    # Verify update
    cursor.execute("SELECT * FROM users WHERE id = ?", (test_student_id,))
    updated_row = dict(cursor.fetchone())
    assert updated_row['full_name'] == 'Updated Full Name'
    assert updated_row['username'] == 'test_student_edit_renamed'
    assert updated_row['grade_level'] == 'Year 5'
    assert updated_row['avatar'] == '🦁'
    valid, _ = server.verify_pw(updated_pw, updated_row['password_hash'])
    assert valid

    # Test delete
    cursor.execute("DELETE FROM users WHERE id = ? AND role != 'teacher'", (test_student_id,))
    conn.commit()
    cursor.execute("SELECT id FROM users WHERE id = ?", (test_student_id,))
    assert cursor.fetchone() is None

    conn.close()
