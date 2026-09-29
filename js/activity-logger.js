// =============================================================================
// DAILY STUDENT ACTIVITY AUDIT & TIMELINE LOGGER
// Tracks logins, practice sessions, Zoom attendance, homework, vocab, and blogs
// =============================================================================

const ActivityLogger = {
  STORAGE_KEY: 'rc_activity_logs_v1',
  logs: [],

  init() {
    this.loadLogs();
    if (!this.logs || this.logs.length === 0) {
      this.seedInitialLogs();
    }
  },

  loadLogs() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        this.logs = JSON.parse(data);
      } else {
        this.logs = [];
      }
    } catch (e) {
      console.warn('Could not load activity logs:', e);
      this.logs = [];
    }
  },

  saveLogs() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Could not save activity logs:', e);
    }
  },

  formatTime(dateObj) {
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  },

  formatDate(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  /**
   * Log a new student activity event
   */
  log(student, type, title, details, meta = {}) {
    if (!student) return;
    const now = new Date();
    const dateStr = this.formatDate(now);
    const timeStr = this.formatTime(now);

    const newLog = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      student_id: student.id || student.student_id || 1,
      student_name: student.full_name || student.name || student.username || 'Student',
      avatar: student.avatar || '🦊',
      grade: student.grade_level || student.grade || 'Year 4',
      type: type, // 'LOGIN', 'PRACTICE', 'ZOOM_JOIN', 'HOMEWORK_SUBMIT', 'VOCAB_GAME', 'PAYMENT_SUBMIT', 'BLOG_POST', 'CERTIFICATE_EARNED'
      title: title,
      details: details,
      meta: meta,
      timestamp: now.toISOString(),
      date: dateStr,
      time: timeStr
    };

    this.logs.unshift(newLog);
    // Keep last 1500 logs to stay performant
    if (this.logs.length > 1500) {
      this.logs = this.logs.slice(0, 1500);
    }
    this.saveLogs();

    // Auto-refresh timeline if currently visible
    if (typeof window.refreshCurrentTimelineView === 'function') {
      window.refreshCurrentTimelineView();
    }

    return newLog;
  },

  /**
   * Query logs by date, student, and activity type
   */
  queryLogs({ date = null, studentId = 'all', type = 'all' } = {}) {
    let list = [...this.logs];

    if (date) {
      list = list.filter(l => l.date === date);
    }

    if (studentId && studentId !== 'all') {
      list = list.filter(l => String(l.student_id) === String(studentId));
    }

    if (type && type !== 'all') {
      list = list.filter(l => l.type === type);
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return list;
  },

  getDailyStats(dateStr) {
    const dayLogs = this.logs.filter(l => l.date === dateStr);
    const uniqueStudents = new Set(dayLogs.map(l => l.student_id));
    const logins = dayLogs.filter(l => l.type === 'LOGIN').length;
    const practices = dayLogs.filter(l => l.type === 'PRACTICE').length;
    const zooms = dayLogs.filter(l => l.type === 'ZOOM_JOIN').length;
    const homeworks = dayLogs.filter(l => l.type === 'HOMEWORK_SUBMIT').length;
    const vocabs = dayLogs.filter(l => l.type === 'VOCAB_GAME').length;

    return {
      totalEvents: dayLogs.length,
      activeStudentsCount: uniqueStudents.size,
      logins,
      practices,
      zooms,
      homeworks,
      vocabs
    };
  },

  /**
   * Seed realistic sample activity logs for past 3 days
   */
  seedInitialLogs() {
    const today = new Date();
    const todayStr = this.formatDate(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.formatDate(yesterday);

    const sampleLogs = [
      // Today's activities
      {
        id: 'act_seed_1',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'LOGIN',
        title: 'Logged in to Portal',
        details: 'Authenticated from private student terminal',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30).toISOString(),
        date: todayStr,
        time: '08:30 AM'
      },
      {
        id: 'act_seed_2',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'PRACTICE',
        title: 'Practiced Skill: Fractions & Decimals (A.1)',
        details: 'Solved 15 questions • 96% SmartScore • Accuracy 93.3% • +150 XP',
        meta: { skill: 'A.1', count: 15, score: 96 },
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 48).toISOString(),
        date: todayStr,
        time: '08:48 AM'
      },
      {
        id: 'act_seed_3',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'ZOOM_JOIN',
        title: 'Joined Live Zoom Session',
        details: 'Attended: "Stage 4 Mathematics — Fractions, Decimals & Word Problems Review"',
        meta: { session: 'Live Stage 4 Mathematics' },
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15).toISOString(),
        date: todayStr,
        time: '09:15 AM'
      },
      {
        id: 'act_seed_4',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'HOMEWORK_SUBMIT',
        title: 'Completed Assigned Homework Task',
        details: 'Submitted problem set: "Learner Book 4 (Pages 34-38) Fractions Drill"',
        meta: { task: 'Fractions Drill' },
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 5).toISOString(),
        date: todayStr,
        time: '10:05 AM'
      },
      {
        id: 'act_seed_5',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'VOCAB_GAME',
        title: 'Completed Vocabulary Spelling Arena',
        details: 'Scored 450 Points • 8 Words Mastered (Photosynthesis, Denominator, Perimeter)',
        meta: { mode: 'spelling', score: 450 },
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 32).toISOString(),
        date: todayStr,
        time: '10:32 AM'
      },
      {
        id: 'act_seed_6',
        student_id: 2,
        student_name: 'Sophia Chen',
        avatar: '🐼',
        grade: 'Year 4',
        type: 'LOGIN',
        title: 'Logged in to Portal',
        details: 'Authenticated via web app',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0).toISOString(),
        date: todayStr,
        time: '09:00 AM'
      },
      {
        id: 'act_seed_7',
        student_id: 2,
        student_name: 'Sophia Chen',
        avatar: '🐼',
        grade: 'Year 4',
        type: 'PRACTICE',
        title: 'Practiced Skill: Geometry & Regular Angles (G.2)',
        details: 'Solved 20 questions • 100% SmartScore • 100% Mastery Certificate Awarded! 🎓',
        meta: { skill: 'G.2', count: 20, score: 100 },
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 35).toISOString(),
        date: todayStr,
        time: '09:35 AM'
      },
      {
        id: 'act_seed_8',
        student_id: 2,
        student_name: 'Sophia Chen',
        avatar: '🐼',
        grade: 'Year 4',
        type: 'ZOOM_JOIN',
        title: 'Joined Live Zoom Session',
        details: 'Attended: "Stage 4 Mathematics — Fractions, Decimals & Word Problems Review"',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15).toISOString(),
        date: todayStr,
        time: '09:15 AM'
      },
      {
        id: 'act_seed_9',
        student_id: 3,
        student_name: 'Alex Turner',
        avatar: '🦁',
        grade: 'Year 4',
        type: 'LOGIN',
        title: 'Logged in to Portal',
        details: 'Authenticated successfully',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 12).toISOString(),
        date: todayStr,
        time: '09:12 AM'
      },
      {
        id: 'act_seed_10',
        student_id: 3,
        student_name: 'Alex Turner',
        avatar: '🦁',
        grade: 'Year 4',
        type: 'ZOOM_JOIN',
        title: 'Joined Live Zoom Session',
        details: 'Attended: "Stage 4 Mathematics — Fractions, Decimals & Word Problems Review"',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 16).toISOString(),
        date: todayStr,
        time: '09:16 AM'
      },
      {
        id: 'act_seed_11',
        student_id: 3,
        student_name: 'Alex Turner',
        avatar: '🦁',
        grade: 'Year 4',
        type: 'PRACTICE',
        title: 'Practiced Skill: Mental Multiplication Sprints (M.3)',
        details: 'Solved 18 questions • 92% SmartScore • +180 XP',
        meta: {},
        timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15).toISOString(),
        date: todayStr,
        time: '10:15 AM'
      },
      // Yesterday's activities
      {
        id: 'act_seed_12',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'LOGIN',
        title: 'Logged in to Portal',
        details: 'Daily study session check-in',
        meta: {},
        timestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 20).toISOString(),
        date: yesterdayStr,
        time: '04:20 PM'
      },
      {
        id: 'act_seed_13',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'PRACTICE',
        title: 'Practiced Skill: Stage 4 Science — Habitats & Adaptations (S.1)',
        details: 'Solved 14 questions • 95% Accuracy • SmartScore 94',
        meta: {},
        timestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 45).toISOString(),
        date: yesterdayStr,
        time: '04:45 PM'
      },
      {
        id: 'act_seed_14',
        student_id: 1,
        student_name: 'Beshr Mohamed',
        avatar: '🦊',
        grade: 'Year 4',
        type: 'BLOG_POST',
        title: 'Published Student Essay to Blog',
        details: 'Title: "Why Fractions & Decimals Rule the Solar System"',
        meta: {},
        timestamp: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 17, 30).toISOString(),
        date: yesterdayStr,
        time: '05:30 PM'
      }
    ];

    this.logs = sampleLogs;
    this.saveLogs();
  }
};

window.ActivityLogger = ActivityLogger;
ActivityLogger.init();
