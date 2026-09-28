import os
import sys
import shutil
import tempfile
import threading
import time

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

import server
import test_server_unit
import test_api_integration
import test_suite

def run():
    print("==================================================")
    print(" RUNNING HARDENED IXL TEST SUITE (DYNAMIC PORT)")
    print("==================================================")
    
    src_db = os.path.join(ROOT_DIR, 'data', 'ixl_curriculum.db')
    temp_dir = tempfile.mkdtemp()
    temp_db_path = os.path.join(temp_dir, 'test_curriculum.db')
    
    if os.path.exists(src_db):
        shutil.copy2(src_db, temp_db_path)
    
    original_db = server.DB_PATH
    server.DB_PATH = temp_db_path
    server.init_auth_db()
    
    httpd = server.create_server(port=0, host='127.0.0.1')
    actual_port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.2)
    base_url = f"http://127.0.0.1:{actual_port}"

    try:
        print(f"\n[*] Test Server running dynamically on {base_url}")

        print("\n[1/3] Running Unit & IP Rate-Limiting Tests...")
        test_server_unit.test_password_hashing_and_verification()
        test_server_unit.test_legacy_sha256_hash_upgrade()
        test_server_unit.test_session_creation_and_auth(temp_db_path)
        test_server_unit.test_ip_based_rate_limiting()
        print("  -> All Unit Tests PASSED!")

        print("\n[2/3] Running Password Upgrade & Dynamic Credentials Suite...")
        test_suite.test_security_and_password_upgrade(temp_db_path)
        test_suite.test_teacher_student_management_crud(temp_db_path)
        print("  -> All Password Upgrade & CRUD Tests PASSED!")

        print("\n[3/3] Running API Integration, Bypasses & Security Headers Tests...")
        test_api_integration.test_static_html_served_and_security_headers(base_url)
        test_api_integration.test_whitelist_static_exposure_and_bypasses(base_url)
        test_api_integration.test_student_and_teacher_login_flow(base_url)
        test_api_integration.test_xss_input_sanitization_in_registration_and_leaderboard(base_url)
        test_api_integration.test_idor_protection_on_reports(base_url)
        test_api_integration.test_teacher_overview_no_passwords(base_url)
        test_api_integration.test_strict_cors_headers(base_url)
        test_api_integration.test_curriculum_access_and_permissions(base_url)
        print("  -> All API, Bypass, XSS & Security Header Tests PASSED!")

        print("\n==================================================")
        print(" SUCCESS: ALL HARDENED TESTS PASSED PERFECTLY!")
        print("==================================================")
    finally:
        httpd.shutdown()
        httpd.server_close()
        server.DB_PATH = original_db
        try:
            shutil.rmtree(temp_dir, ignore_errors=True)
        except Exception:
            pass

if __name__ == '__main__':
    run()
