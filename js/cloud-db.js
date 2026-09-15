/**
 * Rania Classroom — Universal Cloud Synchronization Engine (Firebase Firestore)
 * 
 * High-Speed Realtime Cloud Database (Google Cloud / Firebase Firestore)
 * - Realtime two-way synchronization for student roster, credentials, and practice progress.
 * - Offline-first architecture (works offline and flushes seamlessly when connected).
 * - Multi-device synchronization: Miss Rania sees student progress update live without reloading.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY_CONFIG = 'rc_firebase_config';
  const DEFAULT_CONFIG = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  };

  const CloudDB = {
    isConfigured: false,
    isInitialized: false,
    firestore: null,
    unsubscribeStudents: null,
    unsubscribeLogs: null,

    init() {
      const config = this.getConfig();
      if (config && config.projectId && config.apiKey) {
        this.initFirebase(config);
      } else {
        this.updateStatusBadge(false);
      }
    },

    getConfig() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    saveConfig(cfg) {
      if (!cfg || !cfg.projectId) {
        throw new Error('Project ID is required');
      }
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cfg));
      return this.initFirebase(cfg);
    },

    initFirebase(cfg) {
      if (!window.firebase) {
        console.warn('Firebase SDK not yet loaded in window.');
        this.updateStatusBadge(false);
        return false;
      }

      try {
        // Reuse or initialize app
        let app;
        if (!firebase.apps.length) {
          app = firebase.initializeApp(cfg);
        } else {
          app = firebase.apps[0];
        }

        this.firestore = firebase.firestore();

        // Enable offline persistence if available
        try {
          this.firestore.enablePersistence({ synchronizeTabs: true }).catch(err => {
            if (err.code === 'failed-precondition' || err.code === 'unimplemented') {
              // Multiple tabs open or unsupported browser; gracefully continue in memory
            }
          });
        } catch (e) {}

        this.isConfigured = true;
        this.isInitialized = true;
        this.updateStatusBadge(true);
        console.log('⚡ Connected to Google Cloud Firebase Firestore:', cfg.projectId);

        // Setup real-time listeners for live classroom data
        this.attachRealtimeListeners();
        return true;
      } catch (err) {
        console.error('Failed to initialize Firebase Firestore:', err);
        this.updateStatusBadge(false);
        return false;
      }
    },

    /**
     * Attach live realtime listeners to sync roster & progress across all devices
     */
    attachRealtimeListeners() {
      if (!this.firestore) return;

      // 1. Realtime Students Roster Listener
      try {
        if (this.unsubscribeStudents) this.unsubscribeStudents();
        this.unsubscribeStudents = this.firestore.collection('students').onSnapshot(snapshot => {
          const cloudStudents = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            cloudStudents.push({
              id: data.id || Number(doc.id) || Date.now(),
              username: data.username,
              password: data.password || '123456',
              full_name: data.full_name || data.username,
              grade_level: data.grade_level || 'Year 4',
              avatar: data.avatar || '🦊',
              xp: data.xp || 0,
              streak_days: data.streak_days || 0,
              role: data.role || 'student',
              questions_answered: data.questions_answered || 0,
              questions_correct: data.questions_correct || 0,
              accuracy_rate: data.accuracy_rate || 0,
              avg_smart_score: data.avg_smart_score || 0,
              last_active: data.last_active || 'Not started',
              is_custom: true
            });
          });

          if (cloudStudents.length > 0) {
            console.log('⚡ Realtime Cloud Update: Loaded', cloudStudents.length, 'students from Firestore.');
            localStorage.setItem('rc_custom_students', JSON.stringify(cloudStudents));

            // Auto-refresh teacher console roster table if currently viewing
            if (window.AppState && window.AppState.currentView === 'teacher' && typeof window.renderTeacherConsoleView === 'function') {
              window.renderTeacherConsoleView();
            }
          }
        }, err => {
          console.warn('Students realtime listener error:', err.message);
        });
      } catch (e) {}

      // 2. Realtime Practice Session Logs Listener
      try {
        if (this.unsubscribeLogs) this.unsubscribeLogs();
        this.unsubscribeLogs = this.firestore.collection('practice_logs')
          .orderBy('completed_at', 'desc')
          .limit(100)
          .onSnapshot(snapshot => {
            let hasNew = false;
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                const session = change.doc.data();
                if (session.student_id) {
                  const key = `practice_logs_${session.student_id}`;
                  let localLogs = [];
                  try { localLogs = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) {}
                  
                  const isExisting = localLogs.some(l => 
                    (l.id && l.id === session.id) || 
                    (l.completed_at && l.completed_at === session.completed_at && l.skill_code === session.skill_code)
                  );

                  if (!isExisting) {
                    localLogs.unshift(session);
                    localStorage.setItem(key, JSON.stringify(localLogs));
                    hasNew = true;
                  }
                }
              }
            });

            if (hasNew && window.AppState && window.AppState.currentView === 'teacher' && typeof window.renderTeacherConsoleView === 'function') {
              window.renderTeacherConsoleView();
            }
          }, err => {
            console.warn('Practice logs realtime listener error:', err.message);
          });
      } catch (e) {}
    },

    // -------------------------------------------------------------------------
    // Cloud Operations
    // -------------------------------------------------------------------------

    /**
     * Create or update student in Google Cloud Firestore
     */
    async saveStudent(studentData) {
      if (!this.isConfigured || !this.firestore) return;

      try {
        const docId = String(studentData.id);
        const payload = {
          id: Number(studentData.id),
          username: (studentData.username || '').toLowerCase().trim(),
          full_name: (studentData.full_name || '').trim(),
          password: studentData.password || '123456',
          grade_level: studentData.grade_level || 'Year 4',
          avatar: studentData.avatar || '🦊',
          xp: studentData.xp || 0,
          role: 'student',
          updated_at: new Date().toISOString()
        };

        await this.firestore.collection('students').doc(docId).set(payload, { merge: true });
        console.log('✅ Student synced to Google Cloud Firestore:', payload.username);
      } catch (err) {
        console.warn('Failed to save student to Firestore:', err);
      }
    },

    /**
     * Delete student from Google Cloud Firestore
     */
    async deleteStudent(studentId) {
      if (!this.isConfigured || !this.firestore) return;

      try {
        const docId = String(studentId);
        await this.firestore.collection('students').doc(docId).delete();
        console.log('🗑️ Student deleted from Google Cloud Firestore:', docId);
      } catch (err) {
        console.warn('Failed to delete student from Firestore:', err);
      }
    },

    /**
     * Log completed student practice session to Google Cloud Firestore
     */
    async logPracticeSession(sessionData) {
      if (!this.isConfigured || !this.firestore) return;

      try {
        const payload = {
          ...sessionData,
          completed_at: sessionData.completed_at || new Date().toISOString()
        };
        await this.firestore.collection('practice_logs').add(payload);
        console.log('⚡ Practice session synced to Google Cloud for student:', sessionData.student_id);

        // Also increment student total XP in Firestore document
        const studentRef = this.firestore.collection('students').doc(String(sessionData.student_id));
        const xpGained = (sessionData.questions_correct * 15) + (sessionData.smart_score >= 90 ? 50 : 20);
        await studentRef.set({
          xp: firebase.firestore.FieldValue.increment(xpGained),
          questions_answered: firebase.firestore.FieldValue.increment(sessionData.questions_answered || 0),
          questions_correct: firebase.firestore.FieldValue.increment(sessionData.questions_correct || 0),
          last_active: payload.completed_at
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to log session to Firestore:', err);
      }
    },

    /**
     * Upload initial/local students to cloud in 1 click
     */
    async syncAllLocalStudentsToCloud() {
      if (!this.isConfigured || !this.firestore) {
        throw new Error('Firebase Firestore is not connected. Please check configuration.');
      }

      const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
      const defaultStudent = { id: 101, username: 'beshr', full_name: 'beshr', grade_level: 'Year 4', avatar: '🦊', password: '123456', xp: 0, role: 'student' };
      const toSync = localStudents.length > 0 ? localStudents : [defaultStudent];

      const batch = this.firestore.batch();
      toSync.forEach(st => {
        const ref = this.firestore.collection('students').doc(String(st.id));
        batch.set(ref, {
          id: Number(st.id),
          username: st.username.toLowerCase(),
          full_name: st.full_name,
          password: st.password || '123456',
          grade_level: st.grade_level || 'Year 4',
          avatar: st.avatar || '🦊',
          xp: st.xp || 0,
          role: 'student',
          updated_at: new Date().toISOString()
        }, { merge: true });
      });

      await batch.commit();
      console.log('✅ Batch uploaded', toSync.length, 'students to Google Cloud Firestore.');
      return toSync.length;
    },

    // -------------------------------------------------------------------------
    // UI Helpers
    // -------------------------------------------------------------------------
    updateStatusBadge(isConnected) {
      const badge = document.getElementById('cloudSyncStatusBadge');
      if (!badge) return;

      if (isConnected) {
        badge.className = 'cloud-status-pill connected';
        badge.innerHTML = '<span class="status-dot green"></span> 🟢 Google Cloud Active';
        badge.title = 'متصل سحابياً بـ Google Cloud Firebase (المزامنة اللحظية مفعلة)';
      } else {
        badge.className = 'cloud-status-pill local';
        badge.innerHTML = '<span class="status-dot amber"></span> ☁️ إعداد السحابة (Google Cloud)';
        badge.title = 'اضغط هنا لربط Google Cloud Firebase والتزامن التلقائي اللحظي';
      }
    }
  };

  window.CloudDB = CloudDB;
})(window);
