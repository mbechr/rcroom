/**
 * Rania Classroom — Offline Sync & Dual-Mode Reconciliation Manager
 * Secure, per-user sync queue with proper acknowledgement and event-driven flushing
 */

const SyncManager = {
  QUEUE_KEY: 'rc_offline_sync_queue',

  init() {
    window.addEventListener('online', () => {
      console.log('Online event detected, flushing offline queue...');
      this.flushQueue();
    });
  },

  getQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.QUEUE_KEY) || '[]');
    } catch (e) {
      console.warn('Could not parse sync queue:', e);
      return [];
    }
  },

  saveQueue(queue) {
    try {
      localStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.error('Could not save sync queue:', e);
    }
  },

  enqueue(sessionData) {
    const user = window.AppState ? window.AppState.currentUser : null;
    if (!user || !user.id) {
      console.warn('Cannot enqueue practice session without authenticated user.');
      return;
    }

    const queue = this.getQueue();
    const sessionWithMeta = Object.assign({}, sessionData, {
      student_id: user.id,
      queued_at: new Date().toISOString()
    });
    queue.push(sessionWithMeta);
    this.saveQueue(queue);

    // Update local logs cache
    try {
      const localLogsKey = 'practice_logs_' + user.id;
      const localLogs = JSON.parse(localStorage.getItem(localLogsKey) || '[]');
      localLogs.unshift(sessionWithMeta);
      localStorage.setItem(localLogsKey, JSON.stringify(localLogs));
    } catch (e) {
      console.warn('Could not update local practice cache:', e);
    }

    // Attempt immediate flush if online
    if (navigator.onLine) {
      this.flushQueue();
    }
  },

  async flushQueue() {
    const queue = this.getQueue();
    if (!queue.length) return;

    const user = window.AppState ? window.AppState.currentUser : null;
    if (!user || !user.id) return;

    // Strict user matching — only sync sessions belonging to the current authenticated student
    const userSessions = queue.filter(s => s.student_id === user.id);
    if (!userSessions.length) return;

    const token = localStorage.getItem('rc_auth_token') || localStorage.getItem('ixl_auth_token') || '';
    const isStaticHost = typeof window !== 'undefined' && window.location && window.location.hostname.endsWith('github.io');
    if (isStaticHost) return;

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const apiEndpoint = (window.DB && typeof window.DB.apiUrl === 'function') ? window.DB.apiUrl('/api/sync') : '/api/sync';

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          student_id: user.id,
          sessions: userSessions
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          console.log(`Successfully synced ${data.synced_count} sessions for student ${user.id}.`);
          // Remove only synced items from queue (per-user ack)
          const remaining = this.getQueue().filter(s => s.student_id !== user.id);
          this.saveQueue(remaining);

          if (window.showToast) {
            window.showToast('✅ Offline practice sessions synced to server!');
          }
        }
      }
    } catch (err) {
      console.warn('Sync attempt failed (network error):', err.message);
    }
  }
};

window.SyncManager = SyncManager;