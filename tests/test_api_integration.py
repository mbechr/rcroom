import json
import urllib.request
import urllib.error

def make_request(base_url, path, method='GET', data=None, token=None, origin=None):
    url = f"{base_url}{path}"
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    if origin:
        headers['Origin'] = origin
    
    encoded_data = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            status = response.status
            body = response.read().decode('utf-8')
            try:
                parsed_json = json.loads(body)
            except Exception:
                parsed_json = body
            return status, parsed_json, response.headers
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        try:
            parsed_json = json.loads(body)
        except Exception:
            parsed_json = body
        return e.code, parsed_json, e.headers

def test_static_html_served_and_security_headers(test_server):
    status, body, headers = make_request(test_server, '/')
    assert status == 200
    assert 'loginCosmosCanvas' in body or 'html' in body.lower()
    
    # Verify security headers
    assert headers.get('X-Content-Type-Options') == 'nosniff'
    assert headers.get('X-Frame-Options') == 'DENY'
    assert 'Content-Security-Policy' in headers

def test_whitelist_static_exposure_and_bypasses(test_server):
    # Tests attempting Windows trailing dot, url-encoding, and path traversal bypasses
    blocked_paths = [
        '/data/ixl_curriculum.db',
        '/server.py',
        '/server.py.',
        '/server.py%2e',
        '/tests/conftest.py',
        '/run_dashboard.bat',
        '/.git/config',
        '/__pycache__/',
        '/api/../server.py',
        '/api/../data/ixl_curriculum.db'
    ]
    for path in blocked_paths:
        status, body, _ = make_request(test_server, path)
        assert status in (403, 404), f"Path {path} should be blocked (got {status})"

def test_student_and_teacher_login_flow(test_server):
    status, body, headers = make_request(test_server, '/api/login', method='POST', data={
        'username': 'alex',
        'password': 'password123'
    })
    assert status == 200 and body['success']
    student_token = body['token']
    assert len(student_token) == 64
    assert 'plain_password' not in body['student']
    assert 'password_hash' not in body['student']
    assert 'Set-Cookie' in headers
    assert 'HttpOnly' in headers.get('Set-Cookie')

    status, body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania',
        'password': 'admin123'
    })
    assert status == 200 and body['success']
    teacher_token = body['token']

    # Reset password for teacher if required to activate full dashboard access
    make_request(test_server, '/api/user/change_password', method='POST', data={
        'current_password': 'admin123',
        'new_password': 'TeacherSecureNewPass_123!'
    }, token=teacher_token)

    return student_token, teacher_token

def test_xss_input_sanitization_in_registration_and_leaderboard(test_server):
    # 1. Register with XSS payload
    xss_name = "<script>alert('xss')</script>Tester"
    status, body, _ = make_request(test_server, '/api/register', method='POST', data={
        'full_name': xss_name,
        'username': 'xss_test_user',
        'password': 'ValidPassword123!'
    })
    assert status == 200 and body['success']
    token = body['token']

    # 2. Leaderboard requires auth and escapes HTML
    status, body, _ = make_request(test_server, '/api/leaderboard', token=token)
    assert status == 200 and body['success']
    leaderboard = body['leaderboard']
    matching = next((u for u in leaderboard if u['username'] == 'xss_test_user'), None)
    if matching:
        assert '<script>' not in matching['full_name']
        assert '&lt;script&gt;' in matching['full_name']

def test_idor_protection_on_reports(test_server):
    _, body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'alex',
        'password': 'password123'
    })
    student_token = body['token']

    # 1. Unauthenticated request to report -> 401
    status, _, _ = make_request(test_server, '/api/reports/1')
    assert status == 401

    # 2. If student has must_reset_password flag, reset it first via /api/user/change_password
    status, body, _ = make_request(test_server, '/api/reports/1', token=student_token)
    if status == 403 and body.get('must_reset_password'):
        change_status, _, _ = make_request(test_server, '/api/user/change_password', method='POST', data={
            'current_password': 'password123',
            'new_password': 'NewSecurePassword123!'
        }, token=student_token)
        assert change_status == 200

        # Now student requests own report -> 200
        status, body, _ = make_request(test_server, '/api/reports/1', token=student_token)
        assert status == 200 and body['success']
    else:
        assert status == 200 and body['success']

    # 3. Student requests another student's report -> 403 Forbidden
    status, _, _ = make_request(test_server, '/api/reports/2', token=student_token)
    assert status == 403

    # 4. Teacher requests any report -> 200 OK
    _, body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania',
        'password': 'admin123'
    })
    if not body.get('success'):
        # In case password was updated in previous test
        _, body, _ = make_request(test_server, '/api/login', method='POST', data={
            'username': 'rania',
            'password': 'TeacherSecureNewPass_123!'
        })
    teacher_token = body['token']

    # Ensure teacher has password reset if needed
    make_request(test_server, '/api/user/change_password', method='POST', data={
        'current_password': '',
        'new_password': 'TeacherSecureNewPass_123!'
    }, token=teacher_token)

    status, body, _ = make_request(test_server, '/api/reports/1', token=teacher_token)
    assert status == 200 and body['success']

def test_teacher_overview_no_passwords(test_server):
    _, body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania',
        'password': 'admin123'
    })
    if not body.get('success'):
        _, body, _ = make_request(test_server, '/api/login', method='POST', data={
            'username': 'rania',
            'password': 'TeacherSecureNewPass_123!'
        })
    teacher_token = body['token']

    status, body, _ = make_request(test_server, '/api/teacher/overview', token=teacher_token)
    assert status == 200 and body['success']
    roster = body['overview']['roster']
    assert len(roster) > 0

    for student in roster:
        assert 'password' not in student
        assert 'plain_password' not in student

def test_strict_cors_headers(test_server):
    # 1. Allowed Origin
    status, _, headers = make_request(test_server, '/api/demo_students', origin='http://localhost:3000')
    assert headers.get('Access-Control-Allow-Origin') == 'http://localhost:3000'

    # 2. Rogue Origin
    status, _, headers = make_request(test_server, '/api/demo_students', origin='http://localhost:9999')
    assert headers.get('Access-Control-Allow-Origin') is None

def test_curriculum_access_and_permissions(test_server):
    # 1. Login Teacher and Student
    status, t_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania', 'password': 'TeacherSecureNewPass_123!'
    })
    assert status == 200 and t_body.get('success')
    teacher_token = t_body['token']

    status, s_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'alex', 'password': 'NewSecurePassword123!'
    })
    if status != 200 or not s_body.get('success'):
        status, s_body, _ = make_request(test_server, '/api/login', method='POST', data={
            'username': 'alex', 'password': 'password123'
        })
    assert status == 200 and s_body.get('success')
    student_token = s_body['token']
    student_id = s_body['student']['id']

    # 2. Unauthenticated student curriculum access -> 401
    status, _, _ = make_request(test_server, '/api/student/curriculum_access')
    assert status == 401

    # 3. Student tries teacher endpoint -> 403
    status, _, _ = make_request(test_server, f'/api/teacher/student_skills/{student_id}', token=student_token)
    assert status == 403

    # 4. Teacher sets unlocked skills for student
    status, set_res, _ = make_request(test_server, '/api/teacher/student_skills/update', method='POST', token=teacher_token, data={
        'student_id': student_id,
        'action': 'set',
        'skill_codes': ['A.1', 'B.2', 'C.3']
    })
    assert status == 200 and set_res['success'] and set_res['unlocked_count'] == 3

    # 5. Teacher fetches student's unlocked skills
    status, t_skills_res, _ = make_request(test_server, f'/api/teacher/student_skills/{student_id}', token=teacher_token)
    assert status == 200 and t_skills_res['success']
    assert set(t_skills_res['unlocked_skills']) == {'A.1', 'B.2', 'C.3'}

    # 6. Student fetches their own unlocked skills
    status, s_curr_res, _ = make_request(test_server, '/api/student/curriculum_access', token=student_token)
    assert status == 200 and s_curr_res['success']
    assert set(s_curr_res['unlocked_skills']) == {'A.1', 'B.2', 'C.3'}

    # 7. Teacher locks all skills for student
    status, lock_res, _ = make_request(test_server, '/api/teacher/student_skills/update', method='POST', token=teacher_token, data={
        'student_id': student_id,
        'action': 'lock_all'
    })
    assert status == 200 and lock_res['success'] and lock_res['unlocked_count'] == 0

    # 8. Student now has 0 unlocked skills
    status, s_curr_res2, _ = make_request(test_server, '/api/student/curriculum_access', token=student_token)
    assert status == 200 and len(s_curr_res2['unlocked_skills']) == 0

def test_payment_submission_and_teacher_approval(test_server):
    # 1. Login Teacher and Student
    _, t_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania', 'password': 'TeacherSecureNewPass_123!'
    })
    teacher_token = t_body['token']

    status, s_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'alex', 'password': 'NewSecurePassword123!'
    })
    if status != 200 or not s_body.get('success'):
        status, s_body, _ = make_request(test_server, '/api/login', method='POST', data={
            'username': 'alex', 'password': 'password123'
        })
    student_token = s_body['token']
    student_id = s_body['student']['id']

    # 2. Student submits payment proof
    status, pay_res, _ = make_request(test_server, '/api/payments/submit', method='POST', token=student_token, data={
        'student_id': student_id,
        'student_name': 'Alex',
        'amount': 500,
        'payment_method': 'InstaPay',
        'payment_date': '2026-09-28',
        'receipt_image': 'data:image/png;base64,sample',
        'notes': 'September Tuition'
    })
    assert status == 200 and pay_res['success']
    receipt_id = pay_res['receipt_id']

    # 3. Teacher lists payment receipts -> receipt appears with pending_review
    status, list_res, _ = make_request(test_server, '/api/payments/list', token=teacher_token)
    assert status == 200 and list_res['success']
    matched_receipt = next((r for r in list_res['receipts'] if r['id'] == receipt_id), None)
    assert matched_receipt is not None
    assert matched_receipt['status'] == 'pending_review'

    # 4. Teacher approves payment receipt
    status, rev_res, _ = make_request(test_server, '/api/payments/review', method='POST', token=teacher_token, data={
        'receipt_id': receipt_id,
        'action': 'approved'
    })
    assert status == 200 and rev_res['success']

    # 5. Check teacher overview -> student's payment_status is 'paid'
    status, ov_res, _ = make_request(test_server, '/api/teacher/overview', token=teacher_token)
    assert status == 200 and ov_res['success']
    roster_student = next((s for s in ov_res['overview']['roster'] if s['id'] == student_id), None)
    assert roster_student is not None
    assert roster_student['payment_status'] == 'paid'
    assert roster_student['payment_amount'] == 500

def test_student_groups_and_bulk_group_skills_and_sessions(test_server):
    # 1. Login Teacher and Students
    _, t_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'rania', 'password': 'TeacherSecureNewPass_123!'
    })
    teacher_token = t_body['token']

    _, s_body, _ = make_request(test_server, '/api/login', method='POST', data={
        'username': 'alex', 'password': 'NewSecurePassword123!'
    })
    student_token = s_body['token']
    student_id = s_body['student']['id']

    # 2. Teacher creates a student group
    group_id = 'grp_test_cohort_alpha'
    status, save_grp_res, _ = make_request(test_server, '/api/teacher/groups/save', method='POST', token=teacher_token, data={
        'id': group_id,
        'name': 'Sunday Morning Cohort',
        'grade_level': 'Year 4',
        'color': 'indigo',
        'description': 'Meets Sun & Wed at 5:00 PM',
        'student_ids': [student_id]
    })
    assert status == 200 and save_grp_res['success']

    # 3. Teacher lists groups
    status, list_grp_res, _ = make_request(test_server, '/api/teacher/groups', token=teacher_token)
    assert status == 200 and list_grp_res['success']
    matched_group = next((g for g in list_grp_res['groups'] if g['id'] == group_id), None)
    assert matched_group is not None
    assert matched_group['name'] == 'Sunday Morning Cohort'
    assert student_id in matched_group['student_ids']

    # 4. Teacher bulk unlocks skills for the entire group
    status, bulk_res, _ = make_request(test_server, '/api/teacher/group_skills/update', method='POST', token=teacher_token, data={
        'group_id': group_id,
        'action': 'set',
        'skill_codes': ['MATH.Y4.A1', 'MATH.Y4.A2', 'MATH.Y4.B1']
    })
    assert status == 200 and bulk_res['success']
    assert bulk_res['students_updated'] >= 1

    # 5. Verify student Alex now has these unlocked skills
    status, s_curr, _ = make_request(test_server, '/api/student/curriculum_access', token=student_token)
    assert status == 200 and s_curr['success']
    assert 'MATH.Y4.A1' in s_curr['unlocked_skills']
    assert 'MATH.Y4.A2' in s_curr['unlocked_skills']
    assert 'MATH.Y4.B1' in s_curr['unlocked_skills']

    # 6. Teacher creates a group-targeted session
    status, sess_res, _ = make_request(test_server, '/api/sessions/create', method='POST', token=teacher_token, data={
        'title': 'Sunday Live Cohort Session',
        'topic': 'Fractions & Number Lines',
        'session_date': '2026-09-30 17:00',
        'zoom_link': 'https://zoom.us/j/999888777',
        'target_audience': 'group',
        'target_group_id': group_id
    })
    assert status == 200 and sess_res['success']

    # 7. Student lists sessions -> should receive the group-targeted session
    status, s_sess_res, _ = make_request(test_server, '/api/sessions/list', token=student_token)
    assert status == 200 and s_sess_res['success']
    matched_sess = next((s for s in s_sess_res['sessions'] if s['title'] == 'Sunday Live Cohort Session'), None)
    assert matched_sess is not None
    assert matched_sess['target_audience'] == 'group'

    # 8. Clean up group
    status, del_grp_res, _ = make_request(test_server, '/api/teacher/groups/delete', method='POST', token=teacher_token, data={
        'id': group_id
    })
    assert status == 200 and del_grp_res['success']





