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

    print('\n=== ALL SECURITY VERIFICATION TESTS PASSED ===')

if __name__ == '__main__':
    run_tests()
