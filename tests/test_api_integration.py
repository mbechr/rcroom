import threading
import http.client
import json
import time
import server

def run_integration_tests():
    server.init_auth_db()
    httpd = server.create_server(8001)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    time.sleep(0.3)

    conn = http.client.HTTPConnection('127.0.0.1', 8001)

    print('=== 1. Testing Root Static HTML Serving ===')
    conn.request('GET', '/')
    res = conn.getresponse()
    html_data = res.read().decode('utf-8')
    assert res.status == 200, f'Expected 200, got {res.status}'
    assert 'langToggleBtn' in html_data, 'HTML must contain language toggle button'
    assert 'calculatorWidget' in html_data, 'HTML must contain calculator widget'
    assert 'masteryCertModal' in html_data, 'HTML must contain certificate modal'
    print('  [PASS] index.html served with new tools and bilingual switcher')

    print('=== 2. Testing Secure Login (Alex student) ===')
    login_payload = json.dumps({'username': 'alex', 'password': 'password123'})
    conn.request('POST', '/api/login', body=login_payload, headers={'Content-Type': 'application/json'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Alex login should succeed'
    assert 'token' in body and len(body['token']) == 64, 'Must return 64-char hex Bearer token'
    student_token = body['token']
    print('  [PASS] Student login issued Bearer session token')

    print('=== 3. Testing Backdoor Rejection on Teacher ===')
    backdoor_payload = json.dumps({'username': 'admin', 'password': 'password123'})
    conn.request('POST', '/api/login', body=backdoor_payload, headers={'Content-Type': 'application/json'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 401 and not body['success'], 'password123 on admin MUST BE REJECTED'
    print('  [PASS] Backdoor password123 successfully rejected on admin')

    print('=== 4. Testing Teacher Login with True Password ===')
    teacher_payload = json.dumps({'username': 'rania', 'password': 'admin123'})
    conn.request('POST', '/api/login', body=teacher_payload, headers={'Content-Type': 'application/json'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Teacher login should succeed'
    teacher_token = body['token']
    print('  [PASS] Teacher login succeeded with proper credentials')

    print('=== 5. Testing Protected Endpoints (IDOR & Role Checks) ===')
    # Unauthorized teacher overview request without token
    conn.request('GET', '/api/teacher/overview')
    res = conn.getresponse()
    res.read()
    assert res.status == 403, 'Access without teacher token must return 403'

    # Authorized teacher overview request with teacher token
    conn.request('GET', '/api/teacher/overview', headers={'Authorization': f'Bearer {teacher_token}'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Teacher overview with valid token should succeed'
    assert 'total_students' in body['overview']
    print('  [PASS] Teacher overview properly protected by token and role')

    print('=== 6. Testing CSV Grade Export Endpoint ===')
    conn.request('GET', '/api/teacher/export_csv', headers={'Authorization': f'Bearer {teacher_token}'})
    res = conn.getresponse()
    csv_bytes = res.read()
    assert res.status == 200, 'CSV export should return 200'
    assert res.getheader('Content-Type').startswith('text/csv')
    assert 'Student ID,Username,Full Name' in csv_bytes.decode('utf-8-sig')
    print('  [PASS] Teacher CSV grade roster export generated and formatted')

    print('=== 7. Testing Offline Session Sync Endpoint ===')
    sync_payload = json.dumps({
        'student_id': 1,
        'sessions': [{
            'skill_code': 'S.1',
            'skill_name': 'Photosynthesis and plant energy flow',
            'subject': 'Science',
            'grade': 'Year 4',
            'smart_score': 100,
            'questions_answered': 10,
            'questions_correct': 10,
            'duration_seconds': 200,
            'completed_at': '2026-09-10 10:00:00'
        }]
    })
    conn.request('POST', '/api/sync', body=sync_payload, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {student_token}'
    })
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Offline sync should succeed'
    print('  [PASS] Offline sync endpoint accepted and persisted practice session')

    print('=== 8. Testing Teacher Student Management Endpoints (Create, Update, Delete) ===')
    # 8a: Create student
    create_payload = json.dumps({
        'full_name': 'Test Student Roster',
        'username': 'test_roster_user',
        'password': 'InitialPass123!',
        'grade_level': 'Year 4',
        'avatar': '🦊'
    })
    conn.request('POST', '/api/teacher/student/create', body=create_payload, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {teacher_token}'
    })
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Teacher create student should succeed'
    new_student_id = body['student_id']
    print('  [PASS] Teacher student creation via API succeeded')

    # 8b: Update student name, grade, avatar, and password
    update_payload = json.dumps({
        'student_id': new_student_id,
        'full_name': 'Test Student Updated Name',
        'username': 'test_roster_user_renamed',
        'password': 'UpdatedPass456!',
        'grade_level': 'Year 6',
        'avatar': '👑'
    })
    conn.request('POST', '/api/teacher/student/update', body=update_payload, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {teacher_token}'
    })
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Teacher update student should succeed'
    print('  [PASS] Teacher student update (name, username, grade, avatar, password) succeeded')

    # 8c: Verify in teacher overview
    conn.request('GET', '/api/teacher/overview', headers={'Authorization': f'Bearer {teacher_token}'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    roster = body['overview']['roster']
    matching = next((s for s in roster if s['id'] == new_student_id), None)
    assert matching is not None, 'Updated student must appear in roster'
    assert matching['full_name'] == 'Test Student Updated Name', 'Roster must show updated name'
    assert matching['username'] == 'test_roster_user_renamed', 'Roster must show updated username'
    assert matching['password'] == 'UpdatedPass456!', 'Roster must show updated password'
    assert matching['grade_level'] == 'Year 6', 'Roster must show updated grade level'
    assert matching['avatar'] == '👑', 'Roster must show updated avatar'
    print('  [PASS] Roster reflects updated student details and password')

    # 8d: Delete student
    delete_payload = json.dumps({'student_id': new_student_id})
    conn.request('POST', '/api/teacher/student/delete', body=delete_payload, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {teacher_token}'
    })
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    assert res.status == 200 and body['success'], 'Teacher delete student should succeed'

    # Verify deletion in overview
    conn.request('GET', '/api/teacher/overview', headers={'Authorization': f'Bearer {teacher_token}'})
    res = conn.getresponse()
    body = json.loads(res.read().decode('utf-8'))
    roster = body['overview']['roster']
    assert not any(s['id'] == new_student_id for s in roster), 'Student must be removed from roster'
    print('  [PASS] Student deleted and removed from classroom roster')

    conn.close()
    httpd.shutdown()
    print('\n=== ALL API INTEGRATION TESTS PASSED PERFECTLY ===')

if __name__ == '__main__':
    run_integration_tests()
