import os
import sys
import shutil
import tempfile
import threading
import time
import pytest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

import server

@pytest.fixture(scope='session')
def temp_db():
    """Creates an isolated temporary copy of ixl_curriculum.db for test execution."""
    src_db = os.path.join(ROOT_DIR, 'data', 'ixl_curriculum.db')
    temp_dir = tempfile.mkdtemp()
    temp_db_path = os.path.join(temp_dir, 'test_curriculum.db')
    
    if os.path.exists(src_db):
        shutil.copy2(src_db, temp_db_path)
    
    original_db_path = server.DB_PATH
    server.DB_PATH = temp_db_path
    server.init_auth_db()
    
    yield temp_db_path
    
    server.DB_PATH = original_db_path
    try:
        shutil.rmtree(temp_dir, ignore_errors=True)
    except Exception:
        pass

@pytest.fixture(scope='session')
def test_server(temp_db):
    """Launches a background ThreadingHTTPServer with dynamic ephemeral port binding."""
    httpd = server.create_server(port=0, host='127.0.0.1')
    actual_port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.2)
    
    yield f"http://127.0.0.1:{actual_port}"
    
    httpd.shutdown()
    httpd.server_close()
