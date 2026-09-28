import secrets
import server

def test_password_hashing_and_verification():
    test_pw = f"Pass_{secrets.token_hex(8)}!"
    pw_hash = server.hash_pw(test_pw)
    assert '$' in pw_hash
    salt, val = pw_hash.split('$', 1)
    assert len(salt) == 32
    assert len(val) == 64

    is_valid, needs_up = server.verify_pw(test_pw, pw_hash)
    assert is_valid is True
    assert needs_up is False

    is_valid, _ = server.verify_pw('WrongPassword', pw_hash)
    assert is_valid is False

def test_legacy_sha256_hash_upgrade():
    import hashlib
    raw_pw = f"OldPass_{secrets.token_hex(4)}"
    legacy_hash = hashlib.sha256(raw_pw.encode('utf-8')).hexdigest()
    is_valid, needs_up = server.verify_pw(raw_pw, legacy_hash)
    assert is_valid is True
    assert needs_up is True

def test_session_creation_and_auth(temp_db=None):
    conn = server.get_db()
    user = conn.execute("SELECT id FROM users LIMIT 1").fetchone()
    user_id = user['id']
    conn.close()

    token = server.create_session(user_id, days=1)
    assert len(token) == 64

    headers = {'Authorization': f'Bearer {token}'}
    auth_user = server.get_authenticated_user(headers)
    assert auth_user is not None
    assert auth_user['id'] == user_id

    bad_headers = {'Authorization': 'Bearer 00000000000000000000000000000000'}
    assert server.get_authenticated_user(bad_headers) is None

def test_ip_based_rate_limiting():
    ip = f"192.168.1.{secrets.randbelow(200) + 10}"
    server.clear_login_attempts(ip)

    # 5 attempts allowed
    for _ in range(5):
        assert server.check_rate_limit(ip) is True
        server.record_login_attempt(ip)

    # 6th attempt blocked
    assert server.check_rate_limit(ip) is False

    # Clear resets limit
    server.clear_login_attempts(ip)
    assert server.check_rate_limit(ip) is True
