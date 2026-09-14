/**
 * Rania Classroom — Offline Sync & Dual-Mode Reconciliation Manager
 * Fixes:
 * 1. Desynchronization between localStorage and SQLite database
 * 2. Unsynchronized offline sessions causing conflicting stats in Student Report
 */

const SyncManager = {
  QUEUE_KEY: 'rc_offline_sync_queue',

  init() {
    window.addEventListener('online', () => {
      console.log('Online event detected, flushing offline queue...');
      this.flushQueue();
    });

    // Heartbeat sync attempt every 20 seconds if queue not empty
    setInterval(() => {
      if (navigator.onLine && this.getQueue().length > 0) {
        this.flushQueue();
      }
    }, 20000);
  },

  getQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.QUEUE_KEY) || localStorage.getItem('ixl_offline_sync_queue') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveQueue(queue) {
    try {
      localStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {}
  },

  enqueue(sessionData) {
    const queue = this.getQueue();
    const sessionWithMeta = Object.assign({}, sessionData, {
      queued_at: new Date().toISOString()
    });
    queue.push(sessionWithMeta);
    this.saveQueue(queue);

    // Also update local cache for immediate student report view
    const localLogsKey = 'practice_logs_' + sessionData.student_id;
    const localLogs = JSON.parse(localStorage.getItem(localLogsKey) || '[]');
    localLogs.unshift(sessionWithMeta);
    localStorage.setItem(localLogsKey, JSON.stringify(localLogs));

    // Try flushing immediately
    this.flushQueue();
  },

  async flushQueue() {
    const queue = this.getQueue();
    if (!queue.length) return;

    const token = localStorage.getItem('rc_auth_token') || localStorage.getItem('ixl_auth_token') || '';
    const user = window.AppState ? window.AppState.currentUser : null;
    const studentId = user ? user.id : (queue[0] ? queue[0].student_id : null);

    if (!studentId) return;

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;

      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          student_id: studentId,
          sessions: queue
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          console.log('Successfully synced ' + data.synced_count + ' offline sessions with SQLite server.');
          // Clear queue
          this.saveQueue([]);
          if (window.showToast) {
            window.showToast('✅ Offline practice sessions synced to server!');
          }
        }
      }
    } catch (err) {
      // Still offline, will retry next interval or on 'online' event
      console.warn('Sync attempt failed (server unreachable):', err.message);
    }
  }
};

window.SyncManager = SyncManager;