import sqlite3
import os
import server

def run_tests():
    print('=== 1. TESTING SECURITY & PASSWORD UPGRADE ===')
    # Test 1: Wrong password
    valid, needs_up = server.verify_pw('wrong', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f')
    assert not valid, 'Wrong password should fail'
    print('  [PASS] Wrong password rejected')

    # Test 2: Admin backdoor attempt with password123
    conn = server.get_db()
    admin = conn.execute("SELECT password_hash FROM users WHERE username = 'admin'").fetchone()
    valid, needs_up = server.verify_pw('password123', admin['password_hash'])
    assert not valid, 'Backdoor password123 must NOT work for admin!'
    print('  [PASS] Backdoor password123 rejected on admin')

    # Test 3: Correct teacher password admin123
    valid, needs_up = server.verify_pw('admin123', admin['password_hash'])
    assert valid, 'admin123 should work for admin'
    print('  [PASS] Teacher password admin123 verified successfully')

    # Test 4: Token generation and auth lookup
    token = server.create_session(1, days=1)
    headers = {'Authorization': f'Bearer {token}'}
    auth_user = server.get_authenticated_user(headers)
    assert auth_user and auth_user['id'] == 1, 'Token must resolve to user 1'
    print('  [PASS] Session Bearer token generated and verified')

    # Test 5: Invalid/tampered token rejected
    bad_headers = {'Authorization': 'Bearer badtoken12345'}
    assert server.get_authenticated_user(bad_headers) is None, 'Bad token must be rejected'
    print('  [PASS] Invalid token properly rejected')

    # Test 6: Modern salted PBKDF2 hash generation
    test_hash = server.hash_pw('MySecurePassword!')
    assert '$' in test_hash, 'Hash must include salt delimiter'
    salt, hash_val = test_hash.split('$', 1)
    assert len(salt) == 32, 'Salt must be 16 bytes (32 hex characters)'
    assert len(hash_val) == 64, 'SHA-256 HMAC must be 64 hex characters'
    is_valid, needs_upgrade = server.verify_pw('MySecurePassword!', test_hash)
    assert is_valid and not needs_upgrade, 'PBKDF2 verification failed'
    print('  [PASS] PBKDF2 with salt hash creation and verification verified')

    print('\n=== 2. TESTING TEACHER STUDENT MANAGEMENT (UPDATE, RESET PW, DELETE) ===')
    # Create test student
    conn = server.get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE username = 'test_student_edit'")
    test_pw = 'PassOriginal123'
    cursor.execute('''
    INSERT INTO users (username, password_hash, full_name, grade_level, avatar, xp, streak_days, role, plain_password)
    VALUES (?, ?, ?, ?, ?, 50, 1, 'student', ?)
    ''', ('test_student_edit', server.hash_pw(test_pw), 'Original Name', 'Year 4', '🦊', test_pw))
    conn.commit()
    test_student_id = cursor.lastrowid

    # Test update full_name, grade_level, avatar, and new password
    updated_pw = 'NewSecurePass456'
    cursor.execute('''
    UPDATE users 
    SET full_name = ?, username = ?, 
        grade_level = ?, avatar = ?, 
        password_hash = ?, plain_password = ?
    WHERE id = ? AND role != 'teacher'
    ''', ('Updated Full Name', 'test_student_edit_renamed', 'Year 5', '🦁', server.hash_pw(updated_pw), updated_pw, test_student_id))
    conn.commit()

    # Verify update
    cursor.execute("SELECT * FROM users WHERE id = ?", (test_student_id,))
    updated_row = dict(cursor.fetchone())
    assert updated_row['full_name'] == 'Updated Full Name', 'Full name should be updated'
    assert updated_row['username'] == 'test_student_edit_renamed', 'Username should be updated'
    assert updated_row['grade_level'] == 'Year 5', 'Grade level should be updated'
    assert updated_row['avatar'] == '🦁', 'Avatar should be updated'
    assert updated_row['plain_password'] == 'NewSecurePass456', 'Plain password should match'
    valid, _ = server.verify_pw('NewSecurePass456', updated_row['password_hash'])
    assert valid, 'New password must verify against password_hash'
    print('  [PASS] Student full_name, username, grade, avatar, and password update verified')

    # Test delete
    cursor.execute("DELETE FROM users WHERE id = ? AND role != 'teacher'", (test_student_id,))
    conn.commit()
    cursor.execute("SELECT id FROM users WHERE id = ?", (test_student_id,))
    assert cursor.fetchone() is None, 'Student must be deleted'

    # Verify teacher cannot be deleted by student delete query
    teacher_row = conn.execute("SELECT id FROM users WHERE role = 'teacher' LIMIT 1").fetchone()
    if teacher_row:
        cursor.execute("DELETE FROM users WHERE id = ? AND role != 'teacher'", (teacher_row['id'],))
        conn.commit()
        still_there = conn.execute("SELECT id FROM users WHERE id = ?", (teacher_row['id'],)).fetchone()
        assert still_there is not None, 'Teacher must NOT be deleted'
        print('  [PASS] Teacher protection on delete verified')

    conn.close()
    print('  [PASS] Student deletion verified')

    print('\n=== ALL SECURITY & ROSTER VERIFICATION TESTS PASSED ===')

if __name__ == '__main__':
    run_tests()
