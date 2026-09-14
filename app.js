/**
 * Rania Classroom — Student Portal & SQL Infrastructure
 * Modern, High-Performance Application Logic with Authentication,
 * Interactive Question Engine, and In-Depth Student Performance Analytics.
 */

// =============================================================================
// Sound Synthesizer (Web Audio API — Zero External Dependencies)
// =============================================================================

const SoundFX = {
  ctx: null,
  enabled: (localStorage.getItem('rc_sound_fx') ?? localStorage.getItem('ixl_sound_fx')) !== 'false',

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },

  playTone(freq, type = 'sine', duration = 0.25, delay = 0, gainLevel = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }, delay * 1000);
  },

  correct() {
    // Pleasant Apple-style ascending triad (C5, E5, G5)
    this.playTone(523.25, 'sine', 0.2, 0, 0.18);
    this.playTone(659.25, 'sine', 0.22, 0.09, 0.18);
    this.playTone(783.99, 'sine', 0.35, 0.18, 0.2);
  },

  incorrect() {
    // Gentle low bonk
    this.playTone(240, 'triangle', 0.2, 0, 0.15);
    this.playTone(180, 'triangle', 0.3, 0.1, 0.12);
  },

  fanfare() {
    // Celebration chime
    [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
      this.playTone(f, 'sine', 0.4, idx * 0.12, 0.22);
    });
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('rc_sound_fx', this.enabled);
    return this.enabled;
  }
};

// =============================================================================
// Confetti Particle Engine (Lightweight Canvas Particle Simulation)
// =============================================================================

const ConfettiFX = {
  canvas: null,
  ctx: null,
  particles: [],
  animId: null,

  init() {
    this.canvas = document.getElementById('confettiCanvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      window.addEventListener('resize', () => this.resize());
      this.resize();
    }
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  fire(durationMs = 3200) {
    this.init();
    if (!this.canvas || !this.ctx) return;

    this.resize();
    const colors = ['#0071e3', '#30d158', '#ffd60a', '#ff453a', '#bf5af2', '#64d2ff', '#ffffff'];
    this.particles = [];

    const count = 120;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 3,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.008 + 0.004
      });
    }

    if (this.animId) cancelAnimationFrame(this.animId);
    const start = performance.now();

    const loop = (now) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let alive = false;

      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          alive = true;
          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, p.alpha);
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          this.ctx.restore();
        }
      }

      if (alive && (now - start < durationMs)) {
        this.animId = requestAnimationFrame(loop);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animId = null;
      }
    };

    this.animId = requestAnimationFrame(loop);
  }
};

// Audio and Scratchpad are loaded via modular js/audio.js and js/scratchpad.js


// =============================================================================
// State & Constants
// =============================================================================

const AppState = {
  data: null,
  summary: null,
  flatSkills: [],
  currentView: 'dashboard',
  currentSubject: 'Maths',
  currentGrade: 'Year 4',
  statusFilter: 'all',
  searchQuery: '',
  favorites: new Set(JSON.parse(localStorage.getItem('rc_favorites') || localStorage.getItem('ixl_favorites') || '[]')),
  mastered: new Set(JSON.parse(localStorage.getItem('rc_mastered') || localStorage.getItem('ixl_mastered') || '[]')),
  currentTheme: localStorage.getItem('rc_theme') || 'light',
  collapsedCategories: new Set(),

  // Active User Session (Null if not logged in; requires username & password)
  currentUser: JSON.parse(localStorage.getItem('current_student') || 'null'),

  // Practice Room State
  practice: {
    activeSkill: null,
    currentQuestion: null,
    selectedOption: null,
    score: 0,
    answeredCount: 0,
    correctCount: 0,
    timerSeconds: 0,
    timerInterval: null
  }
};
window.AppState = AppState;

// =============================================================================
// Client & API Database Service (Dual-Mode SQLite / Offline Sync)
// =============================================================================

const DB = {
  // Preloaded Demo Students & Teacher for instant client-side offline fallback
  demoStudents: [
    { id: 1, username: 'alex', full_name: 'Alex Turner', grade_level: 'Year 4', avatar: '🦊', xp: 0, streak_days: 0, role: 'student' },
    { id: 2, username: 'sophia', full_name: 'Sophia Chen', grade_level: 'Year 5', avatar: '🦄', xp: 0, streak_days: 0, role: 'student' },
    { id: 3, username: 'liam', full_name: 'Liam Johnson', grade_level: 'Year 3', avatar: '🚀', xp: 0, streak_days: 0, role: 'student' },
    { id: 4, username: 'emma', full_name: 'Emma Watson', grade_level: 'Year 6', avatar: '🌟', xp: 0, streak_days: 0, role: 'student' },
    { id: 5, username: 'admin', full_name: 'Miss Rania', grade_level: 'Instructor', avatar: '👩‍🏫', xp: 0, streak_days: 0, role: 'teacher' },
    { id: 6, username: 'rania', full_name: 'Miss Rania', grade_level: 'Instructor', avatar: '👩‍🏫', xp: 0, streak_days: 0, role: 'teacher' }
  ],

  apiUrl(endpoint) {
    if (window.location.protocol === 'file:') {
      return `http://localhost:8000${endpoint}`;
    }
    return endpoint;
  },

  async getDemoStudents() {
    try {
      const res = await fetch(this.apiUrl('/api/demo_students'));
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.students) return json.students.filter(s => s.role !== 'teacher');
      }
    } catch (e) {}
    return this.demoStudents.filter(s => s.role !== 'teacher');
  },

  getAuthHeaders() {
    const token = localStorage.getItem('rc_auth_token') || localStorage.getItem('ixl_auth_token') || '';
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  async login(username, password) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPw = (password || '').trim();

    if (!cleanUser) {
      throw new Error('Please enter username');
    }
    if (!cleanPw) {
      throw new Error('Please enter password');
    }

    try {
      const res = await fetch(this.apiUrl('/api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPw })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.token) localStorage.setItem('rc_auth_token', data.token);
          return data.student;
        } else if (data.error) {
          throw new Error(data.error);
        }
      }
    } catch (e) {
      const msg = (e.message || '').toLowerCase();
      if (!msg.includes('fetch') && !msg.includes('network') && !msg.includes('load') && !msg.includes('connection')) {
        throw e;
      }
    }

    // Check custom registered students first from localStorage
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const localFound = localStudents.find(s => s.username.toLowerCase() === cleanUser);
    if (localFound) {
      if (localFound.password && localFound.password !== cleanPw) {
        throw new Error('Incorrect password');
      }
      return localFound;
    }

    // Offline / Fallback Matching
    const found = this.demoStudents.find(s => s.username.toLowerCase() === cleanUser);
    if (found) {
      const isTeacher = found.role === 'teacher' || cleanUser === 'admin' || cleanUser === 'rania';
      const validPw = isTeacher
        ? (cleanPw === 'admin123')
        : (cleanPw === 'password123');
      if (!validPw) {
        throw new Error('Incorrect password');
      }
      return {
        ...found,
        badges: found.badges || [
          { badge_id: 'first_step', badge_name: 'First Step', badge_icon: '🎯', badge_desc: 'Completed your first practice session' },
          { badge_id: 'streak_hero', badge_name: 'Streak Hero', badge_icon: '🔥', badge_desc: 'Maintained a practice streak' }
        ]
      };
    }
    throw new Error('Invalid username or password');
  },

  async register(full_name, username, password, grade_level, avatar) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPw = (password || '').trim();
    if (!cleanUser || !cleanPw || !full_name) {
      throw new Error('Please fill in all required fields');
    }
    try {
      const res = await fetch(this.apiUrl('/api/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, username: cleanUser, password: cleanPw, grade_level, avatar })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.token) localStorage.setItem('rc_auth_token', data.token);
          return data.student;
        }
        throw new Error(data.error || 'Registration failed');
      }
    } catch (e) {
      if (e.message && e.message !== 'Failed to fetch' && !e.message.includes('NetworkError')) {
        throw e;
      }
    }

    // Local fallback registration with persistent localStorage
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    if (localStudents.some(s => s.username.toLowerCase() === cleanUser) || this.demoStudents.some(s => s.username.toLowerCase() === cleanUser)) {
      throw new Error('Username is already taken');
    }
    const newStudent = {
      id: Date.now(),
      username: cleanUser,
      password: cleanPw,
      full_name: full_name.trim(),
      grade_level: grade_level || 'Year 4',
      avatar: avatar || '🦊',
      xp: 0,
      streak_days: 0,
      role: 'student',
      badges: []
    };
    localStudents.push(newStudent);
    localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    this.demoStudents.push(newStudent);
    return newStudent;
  },

  async getReport(studentId) {
    try {
      const res = await fetch(this.apiUrl(`/api/reports/${studentId}`), {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.report) return data.report;
      }
    } catch (e) {}

    // Fallback dynamic report computation from local storage or mock
    const localLogs = JSON.parse(localStorage.getItem(`practice_logs_${studentId}`) || '[]');
    
    // Fresh classroom sessions start from zero
    const baseSessions = [];

    const allSessions = [...localLogs, ...baseSessions];
    const totalQ = allSessions.reduce((acc, s) => acc + s.questions_answered, 0);
    const totalCorrect = allSessions.reduce((acc, s) => acc + s.questions_correct, 0);
    const totalTime = allSessions.reduce((acc, s) => acc + s.duration_seconds, 0);
    const avgScore = allSessions.length ? Math.round(allSessions.reduce((acc, s) => acc + s.smart_score, 0) / allSessions.length) : 0;
    const masteredCount = allSessions.filter(s => s.smart_score >= 90).length;

    // Subject breakdown
    const subjects = {};
    for (const s of allSessions) {
      if (!subjects[s.subject]) {
        subjects[s.subject] = { sessions: 0, questions: 0, correct: 0, sumScore: 0, mastered: 0 };
      }
      subjects[s.subject].sessions++;
      subjects[s.subject].questions += s.questions_answered;
      subjects[s.subject].correct += s.questions_correct;
      subjects[s.subject].sumScore += s.smart_score;
      if (s.smart_score >= 90) subjects[s.subject].mastered++;
    }

    const subjectsBreakdown = {};
    for (const [subj, data] of Object.entries(subjects)) {
      subjectsBreakdown[subj] = {
        sessions: data.sessions,
        questions: data.questions,
        correct: data.correct,
        accuracy: data.questions ? Math.round((data.correct / data.questions) * 100) : 0,
        avg_score: Math.round(data.sumScore / data.sessions),
        mastered: data.mastered
      };
    }

    return {
      student: this.findStudentById(studentId) || AppState.currentUser,
      summary: {
        total_sessions: allSessions.length,
        total_questions: totalQ,
        total_correct: totalCorrect,
        accuracy_rate: totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0,
        avg_smart_score: avgScore,
        total_time_spent: totalTime,
        mastered_skills: masteredCount
      },
      subjects: subjectsBreakdown,
      history: allSessions.slice(0, 30),
      badges: AppState.currentUser.badges || [
        { badge_id: 'first_step', badge_name: 'First Step', badge_icon: '🎯', badge_desc: 'Completed your first practice session' },
        { badge_id: 'streak_hero', badge_name: 'Streak Hero', badge_icon: '🔥', badge_desc: 'Maintained a practice streak for 3+ days' }
      ]
    };
  },

  async submitPracticeSession(data) {
    try {
      const res = await fetch(this.apiUrl('/api/practice/submit'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    // Fallback local persistence via SyncManager
    if (window.SyncManager) {
      window.SyncManager.enqueue(data);
    } else {
      const key = `practice_logs_${data.student_id}`;
      const logs = JSON.parse(localStorage.getItem(key) || '[]');
      const newSession = {
        id: Date.now(),
        ...data,
        completed_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      logs.unshift(newSession);
      localStorage.setItem(key, JSON.stringify(logs));
    }

    // Update user XP locally
    const xpGained = (data.questions_correct * 15) + (data.smart_score >= 90 ? 50 : 20);
    AppState.currentUser.xp = (AppState.currentUser.xp || 0) + xpGained;
    localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));

    return {
      success: true,
      xp_earned: xpGained,
      total_xp: AppState.currentUser.xp,
      new_badges: []
    };
  },

  async getAssignments(studentId = null) {
    try {
      const url = studentId ? `/api/assignments/student/${studentId}` : '/api/assignments';
      const res = await fetch(this.apiUrl(url));
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.assignments) return json.assignments;
      }
    } catch (e) {}

    // Fallback sample assignments
    return [
      { id: 1, skill_code: 'A.1', skill_name: 'Place value models - up to thousands', subject: 'Maths', grade: 'Year 4', due_date: 'Tomorrow', instructions: 'Reach SmartScore 80 before tomorrow!', is_completed: 0, completions_count: 0, total_students: 4 },
      { id: 2, skill_code: 'B.3', skill_name: 'Identify nouns – common and proper', subject: 'English', grade: 'Year 4', due_date: 'Tomorrow', instructions: 'Identify capital letters and proper names.', is_completed: 0, completions_count: 0, total_students: 4 },
      { id: 3, skill_code: 'S.1', skill_name: 'Photosynthesis and plant energy flow', subject: 'Science', grade: 'Year 4', due_date: 'In 3 days', instructions: 'Weekly science inquiry assignment.', is_completed: 0, completions_count: 0, total_students: 4 }
    ];
  },

  async createAssignment(data) {
    try {
      const res = await fetch(this.apiUrl('/api/assignments/create'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, assignment_id: Date.now() };
  },

  async deleteAssignment(assignmentId) {
    try {
      const res = await fetch(this.apiUrl('/api/assignments/delete'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ assignment_id: assignmentId })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true };
  },

  findStudentById(studentId) {
    const numId = Number(studentId);
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    return localStudents.find(s => s.id === numId) || this.demoStudents.find(s => s.id === numId);
  },

  async teacherCreateStudent(data) {
    try {
      const res = await fetch(this.apiUrl('/api/teacher/student/create'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.student) return json;
      }
    } catch (e) {}

    // Persistent storage for custom students (always works on GitHub Pages & offline)
    const fullName = (data.full_name || data.name || '').trim();
    const cleanUser = (data.username || '').trim().toLowerCase();
    const cleanPw = (data.password || '').trim() || 'password123';
    if (!fullName || !cleanUser) {
      return { success: false, error: 'Please enter student full name and username' };
    }

    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    if (localStudents.some(s => s.username.toLowerCase() === cleanUser) || this.demoStudents.some(s => s.username.toLowerCase() === cleanUser)) {
      return { success: false, error: 'Username already registered. Please choose another username' };
    }

    const newStudent = {
      id: Date.now(),
      username: cleanUser,
      password: cleanPw,
      full_name: fullName,
      grade_level: data.grade_level || 'Year 4',
      avatar: data.avatar || '🦊',
      xp: 0,
      streak_days: 0,
      role: 'student',
      questions_answered: 0,
      questions_correct: 0,
      accuracy_rate: 0,
      avg_smart_score: 0,
      last_active: 'Not started',
      badges: []
    };

    localStudents.push(newStudent);
    localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    return { success: true, student: newStudent, student_id: newStudent.id };
  },

  async teacherUpdateStudent(data) {
    try {
      const res = await fetch(this.apiUrl('/api/teacher/student/update'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          this.syncLocalStudentUpdate(data);
          return json;
        } else if (json.error) {
          return json;
        }
      }
    } catch (e) {}

    // Fallback sync for offline/local storage
    return this.syncLocalStudentUpdate(data);
  },

  syncLocalStudentUpdate(data) {
    const numId = Number(data.student_id);
    const fullName = (data.full_name || '').trim();
    const cleanUser = (data.username || '').trim().toLowerCase();
    const cleanPw = (data.password || '').trim();
    const grade = data.grade_level;
    const avatar = data.avatar;

    if (!fullName || !cleanUser) {
      return { success: false, error: 'Full name and username are required' };
    }

    // Update in rc_custom_students
    let localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const existing = localStudents.find(s => s.id === numId);
    if (existing) {
      existing.full_name = fullName;
      existing.username = cleanUser;
      if (grade) existing.grade_level = grade;
      if (avatar) existing.avatar = avatar;
      if (cleanPw) existing.password = cleanPw;
      localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    }

    // Update in demoStudents
    const demo = this.demoStudents.find(s => s.id === numId);
    if (demo) {
      demo.full_name = fullName;
      demo.username = cleanUser;
      if (grade) demo.grade_level = grade;
      if (avatar) demo.avatar = avatar;
      if (cleanPw) demo.password = cleanPw;
    }

    // Update current session if the edited student is currently logged in
    if (AppState.currentUser && AppState.currentUser.id === numId) {
      AppState.currentUser.full_name = fullName;
      AppState.currentUser.username = cleanUser;
      if (grade) AppState.currentUser.grade_level = grade;
      if (avatar) AppState.currentUser.avatar = avatar;
      localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
      if (typeof updateNavProfile === 'function') updateNavProfile();
    }

    return { success: true };
  },

  async teacherResetPassword(studentId, newPassword) {
    const pass = (newPassword || '').trim();
    try {
      const res = await fetch(this.apiUrl('/api/teacher/student/reset_password'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ student_id: studentId, new_password: pass })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          this.syncLocalStudentPassword(studentId, pass);
          return json;
        }
      }
    } catch (e) {}

    return this.syncLocalStudentPassword(studentId, pass);
  },

  syncLocalStudentPassword(studentId, newPassword) {
    const numId = Number(studentId);
    const pass = (newPassword || '').trim();
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const s = localStudents.find(st => st.id === numId);
    if (s) {
      s.password = pass;
      localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    }
    const demo = this.demoStudents.find(st => st.id === numId);
    if (demo) {
      demo.password = pass;
    }
    return { success: true };
  },

  async teacherDeleteStudent(studentId) {
    try {
      const res = await fetch(this.apiUrl('/api/teacher/student/delete'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ student_id: studentId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          this.syncLocalStudentDelete(studentId);
          return json;
        }
      }
    } catch (e) {}

    return this.syncLocalStudentDelete(studentId);
  },

  syncLocalStudentDelete(studentId) {
    const numId = Number(studentId);
    let localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    localStudents = localStudents.filter(s => s.id !== numId);
    localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    this.demoStudents = this.demoStudents.filter(s => s.id !== numId);
    return { success: true };
  },

  async getTeacherOverview() {
    try {
      const res = await fetch(this.apiUrl('/api/teacher/overview'), {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.overview) return json.overview;
      }
    } catch (e) {}

    // Combine pre-loaded demo students and custom students created by teacher
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const allEnrolled = [
      ...this.demoStudents.filter(s => s.role !== 'teacher'),
      ...localStudents
    ];

    const students = allEnrolled.map(s => {
      const q = s.questions_answered !== undefined ? s.questions_answered : (s.xp ? Math.round(s.xp / 22) : 0);
      const c = s.questions_correct !== undefined ? s.questions_correct : 0;
      return {
        id: s.id,
        username: s.username,
        password: s.password || 'password123',
        full_name: s.full_name,
        grade_level: s.grade_level,
        avatar: s.avatar || '🦊',
        xp: s.xp || 0,
        streak_days: s.streak_days || 0,
        questions_answered: q,
        questions_correct: c,
        accuracy_rate: q ? Math.round((c / q) * 100) : 0,
        avg_smart_score: s.avg_smart_score || 0,
        last_active: s.last_active || 'Not started',
        badges_count: (s.badges && s.badges.length) || 0,
        is_custom: !!localStudents.some(ls => ls.id === s.id)
      };
    });

    const totQ = students.reduce((acc, s) => acc + s.questions_answered, 0);
    const totCorr = students.reduce((acc, s) => acc + s.questions_correct, 0);

    return {
      total_students: students.length,
      class_stats: {
        total_questions: totQ,
        total_correct: totCorr,
        accuracy_rate: totQ ? Math.round((totCorr / totQ) * 100) : 0,
        total_hours: 0
      },
      roster: students,
      attention_skills: [],
      mastered_skills: []
    };
  },

  async getLeaderboard() {
    try {
      const res = await fetch(this.apiUrl('/api/leaderboard'));
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.leaderboard) return data.leaderboard;
      }
    } catch (e) {}
    return [...this.demoStudents].sort((a, b) => b.xp - a.xp);
  }
};

// =============================================================================
// DOM Selectors
// =============================================================================

const el = {
  // Navigation (Modern Floating Glass Island & Sliding Indicator)
  portalNavbar: document.getElementById('portalNavbar'),
  brandHomeBtn: document.getElementById('brandHomeBtn'),
  portalNavTabs: document.getElementById('portalNavTabs'),
  navTabIndicator: document.getElementById('navIndicatorPill'),
  navXpStripFill: document.getElementById('navXpStripFill'),
  navTabs: document.querySelectorAll('.nav-tab'),
  views: document.querySelectorAll('.portal-view'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  studentProfilePill: document.getElementById('studentProfilePill'),
  navStudentAvatar: document.getElementById('navStudentAvatar'),
  navStudentName: document.getElementById('navStudentName'),
  navStudentGrade: document.getElementById('navStudentGrade'),
  navStudentXP: document.getElementById('navStudentXP'),
  navStudentStreak: document.getElementById('navStudentStreak'),

  // Dashboard Elements
  dashStudentName: document.getElementById('dashStudentName'),
  dashStreakText: document.getElementById('dashStreakText'),
  dashLevelBadge: document.getElementById('dashLevelBadge'),
  dashRankTitle: document.getElementById('dashRankTitle'),
  dashCurrentXP: document.getElementById('dashCurrentXP'),
  dashXpFill: document.getElementById('dashXpFill'),
  dashStartPracticeBtn: document.getElementById('dashStartPracticeBtn'),
  dashViewReportBtn: document.getElementById('dashViewReportBtn'),
  dashSpotlightInput: document.getElementById('dashSpotlightInput'),
  dashTracksPreviewContainer: document.getElementById('dashTracksPreviewContainer'),
  dashViewAllTracksBtn: document.getElementById('dashViewAllTracksBtn'),

  // KPIs
  kpiQuestionsAnswered: document.getElementById('kpiQuestionsAnswered'),
  kpiAccuracyRate: document.getElementById('kpiAccuracyRate'),
  kpiTimeSpent: document.getElementById('kpiTimeSpent'),
  kpiMasteredCount: document.getElementById('kpiMasteredCount'),

  // Curriculum Tracks View
  teacherTracksFullContainer: document.getElementById('teacherTracksFullContainer'),
  trackSubjectFilter: document.getElementById('trackSubjectFilter'),

  // Skills Bank View
  skillsSubjectFilter: document.getElementById('skillsSubjectFilter'),
  skillsSearchInput: document.getElementById('skillsSearchInput'),
  skillsClearSearch: document.getElementById('skillsClearSearch'),
  statusFilterControl: document.getElementById('statusFilterControl'),
  expandCollapseAllSkillsBtn: document.getElementById('expandCollapseAllSkillsBtn'),
  expandCollapseText: document.getElementById('expandCollapseText'),
  gradesNavList: document.getElementById('gradesNavList'),
  currentGradeTitle: document.getElementById('currentGradeTitle'),
  currentGradeSubtitle: document.getElementById('currentGradeSubtitle'),
  skillsCategoriesContainer: document.getElementById('skillsCategoriesContainer'),

  // Report View Elements
  printReportBtn: document.getElementById('printReportBtn'),
  reportAvatar: document.getElementById('reportAvatar'),
  reportFullName: document.getElementById('reportFullName'),
  reportUsername: document.getElementById('reportUsername'),
  reportGrade: document.getElementById('reportGrade'),
  reportRankTitle: document.getElementById('reportRankTitle'),
  reportStreak: document.getElementById('reportStreak'),
  reportGeneratedDate: document.getElementById('reportGeneratedDate'),
  repTotalQuestions: document.getElementById('repTotalQuestions'),
  repAccuracy: document.getElementById('repAccuracy'),
  repAvgScore: document.getElementById('repAvgScore'),
  repTotalTime: document.getElementById('repTotalTime'),
  repMasteredSkills: document.getElementById('repMasteredSkills'),
  reportSubjectBreakdownGrid: document.getElementById('reportSubjectBreakdownGrid'),
  reportBadgesGrid: document.getElementById('reportBadgesGrid'),
  reportRecordCount: document.getElementById('reportRecordCount'),
  reportHistoryTableBody: document.getElementById('reportHistoryTableBody'),

  // Leaderboard
  leaderboardTableBody: document.getElementById('leaderboardTableBody'),

  // Practice Modal
  practiceModal: document.getElementById('practiceModal'),
  closePracticeModalBtn: document.getElementById('closePracticeModalBtn'),
  practiceModalSkillCode: document.getElementById('practiceModalSkillCode'),
  practiceModalSkillSubject: document.getElementById('practiceModalSkillSubject'),
  practiceModalSkillTitle: document.getElementById('practiceModalSkillTitle'),
  practiceTimer: document.getElementById('practiceTimer'),
  practiceAnswered: document.getElementById('practiceAnswered'),
  practiceScore: document.getElementById('practiceScore'),
  practiceQuestionPrompt: document.getElementById('practiceQuestionPrompt'),
  practiceVisualBox: document.getElementById('practiceVisualBox'),
  practiceOptionsGrid: document.getElementById('practiceOptionsGrid'),
  practiceFeedbackBox: document.getElementById('practiceFeedbackBox'),
  practiceFeedbackTitle: document.getElementById('practiceFeedbackTitle'),
  practiceExplanationText: document.getElementById('practiceExplanationText'),
  practiceSkipBtn: document.getElementById('practiceSkipBtn'),
  practiceSubmitBtn: document.getElementById('practiceSubmitBtn'),
  practiceNextBtn: document.getElementById('practiceNextBtn'),

  // Interactive Tools & Modals
  practiceAudioBtn: document.getElementById('practiceAudioBtn'),
  audioBtnIcon: document.getElementById('audioBtnIcon'),
  practiceScratchpadBtn: document.getElementById('practiceScratchpadBtn'),
  practiceSoundFxBtn: document.getElementById('practiceSoundFxBtn'),
  soundFxIcon: document.getElementById('soundFxIcon'),
  practiceFillInContainer: document.getElementById('practiceFillInContainer'),
  practiceFillInInput: document.getElementById('practiceFillInInput'),
  practiceFillInSubmitBtn: document.getElementById('practiceFillInSubmitBtn'),
  practiceTrueFalseContainer: document.getElementById('practiceTrueFalseContainer'),
  dashAssignmentsSection: document.getElementById('dashAssignmentsSection'),
  dashAssignmentsGrid: document.getElementById('dashAssignmentsGrid'),
  dashAssignmentBadge: document.getElementById('dashAssignmentBadge'),
  teacherAssignmentsGrid: document.getElementById('teacherAssignmentsGrid'),
  openCreateAssignmentModalBtn: document.getElementById('openCreateAssignmentModalBtn'),
  createAssignmentModal: document.getElementById('createAssignmentModal'),
  closeCreateAssignmentModalBtn: document.getElementById('closeCreateAssignmentModalBtn'),
  createAssignmentForm: document.getElementById('createAssignmentForm'),
  assignSubject: document.getElementById('assignSubject'),
  assignSkillSearch: document.getElementById('assignSkillSearch'),
  assignSkillTitle: document.getElementById('assignSkillTitle'),
  assignGrade: document.getElementById('assignGrade'),
  assignDueDate: document.getElementById('assignDueDate'),
  assignInstructions: document.getElementById('assignInstructions'),
  openAddStudentModalBtn: document.getElementById('openAddStudentModalBtn'),
  addStudentModal: document.getElementById('addStudentModal'),
  closeAddStudentModalBtn: document.getElementById('closeAddStudentModalBtn'),
  addStudentForm: document.getElementById('addStudentForm'),
  tNewStudentName: document.getElementById('tNewStudentName'),
  tNewStudentUser: document.getElementById('tNewStudentUser'),
  tNewStudentPass: document.getElementById('tNewStudentPass'),
  tNewStudentGrade: document.getElementById('tNewStudentGrade'),
  tNewStudentAvatar: document.getElementById('tNewStudentAvatar'),
  resetPasswordModal: document.getElementById('resetPasswordModal'),
  closeResetPasswordModalBtn: document.getElementById('closeResetPasswordModalBtn'),
  resetPasswordForm: document.getElementById('resetPasswordForm'),
  resetStudentId: document.getElementById('resetStudentId'),
  resetStudentSubtitle: document.getElementById('resetStudentSubtitle'),
  newResetPassword: document.getElementById('newResetPassword'),

  // Edit Student Modal
  editStudentModal: document.getElementById('editStudentModal'),
  closeEditStudentModalBtn: document.getElementById('closeEditStudentModalBtn'),
  editStudentForm: document.getElementById('editStudentForm'),
  editStudentId: document.getElementById('editStudentId'),
  editStudentName: document.getElementById('editStudentName'),
  editStudentUser: document.getElementById('editStudentUser'),
  editStudentPass: document.getElementById('editStudentPass'),
  editStudentGrade: document.getElementById('editStudentGrade'),
  editStudentAvatar: document.getElementById('editStudentAvatar'),
  editStudentSubtitle: document.getElementById('editStudentSubtitle'),

  // Auth Modal
  authModal: document.getElementById('authModal'),
  closeAuthModalBtn: document.getElementById('closeAuthModalBtn'),
  authTabs: document.querySelectorAll('.auth-tab'),
  authTabContents: document.querySelectorAll('.auth-tab-content'),
  demoStudentsList: document.getElementById('demoStudentsList'),
  loginForm: document.getElementById('loginForm'),
  loginUsername: document.getElementById('loginUsername'),
  loginPassword: document.getElementById('loginPassword'),
  loginErrorMsg: document.getElementById('loginErrorMsg'),
  submitLoginBtn: document.getElementById('submitLoginBtn'),
  registerForm: document.getElementById('registerForm'),
  regFullName: document.getElementById('regFullName'),
  regUsername: document.getElementById('regUsername'),
  regPassword: document.getElementById('regPassword'),
  regGrade: document.getElementById('regGrade'),
  avatarPicker: document.getElementById('avatarPicker'),
  regErrorMsg: document.getElementById('regErrorMsg'),
  submitRegisterBtn: document.getElementById('submitRegisterBtn'),

  // Teacher Elements
  teacherTabBtn: document.getElementById('teacherTabBtn'),
  exportClassroomCsvBtn: document.getElementById('exportClassroomCsvBtn'),
  tTotalStudents: document.getElementById('tTotalStudents'),
  tTotalQuestions: document.getElementById('tTotalQuestions'),
  tClassAccuracy: document.getElementById('tClassAccuracy'),
  tTotalHours: document.getElementById('tTotalHours'),
  teacherRosterTableBody: document.getElementById('teacherRosterTableBody'),
  teacherAttentionSkillsList: document.getElementById('teacherAttentionSkillsList'),
  teacherMasteredSkillsList: document.getElementById('teacherMasteredSkillsList'),
  quickTeacherLoginBtn: document.getElementById('quickTeacherLoginBtn'),
  teacherDirectLoginBtn: document.getElementById('teacherDirectLoginBtn'),
  teacherLoginForm: document.getElementById('teacherLoginForm'),
  teacherUsername: document.getElementById('teacherUsername'),
  teacherPassword: document.getElementById('teacherPassword'),
  teacherErrorMsg: document.getElementById('teacherErrorMsg'),

  // Toast
  portalToast: document.getElementById('portalToast'),
  toastIcon: document.getElementById('toastIcon'),
  toastMessage: document.getElementById('toastMessage')
};

// =============================================================================
// App Initialization
// =============================================================================

async function initPortal() {
  applyTheme(AppState.currentTheme);
  setupEventListeners();

  // Strict Authentication Gate Check
  if (!AppState.currentUser) {
    document.body.classList.add('auth-locked');
    openAuthModal(true);
    return; // STOP: Never render curriculum or student views until authenticated!
  }

  document.body.classList.remove('auth-locked');
  updateStudentHeader();
  await loadAndRenderPortal();
}

async function loadAndRenderPortal() {
  const user = AppState.currentUser;
  if (!user) return;

  const isTeacher = user.role === 'teacher' || user.username === 'admin' || user.username === 'rania';
  if (isTeacher) {
    setTimeout(() => switchView('teacher'), 40);
  } else {
    setTimeout(() => switchView('dashboard'), 40);
  }

  try {
    // 1. Load curriculum data
    if (window.RC_CURRICULUM || window.IXL_CURRICULUM) {
      AppState.data = window.RC_CURRICULUM || window.IXL_CURRICULUM;
      AppState.summary = window.RC_SUMMARY || window.IXL_SUMMARY;
    } else {
      const [currResp, summResp] = await Promise.all([
        fetch('data/ixl_complete_curriculum.json'),
        fetch('data/ixl_summary.json')
      ]);
      AppState.data = await currResp.json();
      AppState.summary = await summResp.json();
    }
    window.RC_CURRICULUM = AppState.data;
    window.RC_SUMMARY = AppState.summary;

    buildFlatSkillsIndex();
    renderGradesSidebar();
    if (isTeacher) {
      renderTeacherConsole();
    } else {
      renderDashboard();
      renderTracksView();
      renderSkillsCanvas();
    }

    // Initial position for magnetic sliding navbar indicator
    setTimeout(updateNavIndicator, 100);
  } catch (err) {
    console.error('Data loading error:', err);
    if (el.currentGradeTitle) {
      el.currentGradeTitle.textContent = 'Curriculum Ready';
      el.currentGradeSubtitle.textContent = 'Connected to offline database';
    }
    setTimeout(updateNavIndicator, 100);
  }
}

function buildFlatSkillsIndex() {
  AppState.flatSkills = [];
  if (!AppState.data) return;

  for (const [subjectName, subjectData] of Object.entries(AppState.data)) {
    for (const grade of subjectData.grades) {
      let gradeTotal = 0;
      for (const cat of grade.categories) {
        // Deduplicate cat.skills (removes raw scraper triplicates)
        const uniqueCatSkills = [];
        const seen = new Map();
        for (const skill of cat.skills) {
          const key = skill.permacode || `${skill.code}::${skill.name}`;
          if (!seen.has(key)) {
            seen.set(key, skill);
            uniqueCatSkills.push(skill);
          } else {
            // Prefer the code that contains a dot or is longer (e.g. "B.1" over "B")
            const prev = seen.get(key);
            if (!prev.code.includes('.') && skill.code.includes('.')) {
              const idx = uniqueCatSkills.indexOf(prev);
              if (idx !== -1) uniqueCatSkills[idx] = skill;
              seen.set(key, skill);
            }
          }
        }
        cat.skills = uniqueCatSkills;
        cat.skills_count = uniqueCatSkills.length;
        gradeTotal += uniqueCatSkills.length;

        for (const skill of uniqueCatSkills) {
          AppState.flatSkills.push({
            ...skill,
            subject: subjectName,
            grade: grade.grade_name,
            grade_slug: grade.grade_slug,
            category_name: cat.category_name,
            category_code: cat.category_code,
            super_category: cat.super_category || '',
            _searchToken: `${skill.name} ${skill.code} ${cat.category_name} ${grade.grade_name} ${subjectName}`.toLowerCase()
          });
        }
      }
      grade.skills_count = gradeTotal;
    }
  }
}

// =============================================================================
// Student Navigation & Routing Controller
// Student Navigation & Routing Controller (Automatic Sliding Indicator & View Switcher)
// =============================================================================

function switchView(viewId) {
  AppState.currentView = viewId;

  // Update tabs (both top bar & persistent left sidebar)
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const isActive = tab.dataset.view === viewId;
    tab.classList.toggle('active', isActive);

    if (tab.closest('#portalSidebar')) {
      if (isActive) {
        tab.className = 'nav-tab flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all bg-primary-container text-on-primary font-bold shadow-sm active text-left w-full cursor-pointer';
      } else {
        tab.className = 'nav-tab flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left w-full cursor-pointer';
      }
    } else if (tab.closest('#portalNavTabs')) {
      const isTeacherTab = tab.classList.contains('teacher-nav-tab');
      if (isActive) {
        tab.className = 'nav-tab px-3.5 py-2 transition-all bg-primary-container text-on-primary font-label-md rounded-lg shadow-sm active cursor-pointer' + (isTeacherTab ? ' teacher-nav-tab' : '');
      } else {
        tab.className = 'nav-tab px-3.5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer' + (isTeacherTab ? ' teacher-nav-tab' : '');
      }
    }
  });

  // Update views
  document.querySelectorAll('.portal-view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${viewId}`);
  });

  // Smoothly recalculate and animate sliding magnetic indicator pill
  updateNavIndicator();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // On-demand rendering
  if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'tracks') {
    renderTracksView();
  } else if (viewId === 'skills') {
    renderSkillsCanvas();
  } else if (viewId === 'reports') {
    renderStudentReportView();
  } else if (viewId === 'leaderboard') {
    renderLeaderboardView();
  } else if (viewId === 'teacher') {
    renderTeacherConsoleView();
  }
}

/**
 * Automatically calculates coordinates and slides the magnetic active pill tracker
 * under the active navigation tab with fluid spring physics.
 */
function updateNavIndicator() {
  const container = el.portalNavTabs || document.getElementById('portalNavTabs');
  const indicator = el.navTabIndicator || document.getElementById('navIndicatorPill');
  if (!container || !indicator) return;

  const activeTab = container.querySelector('.nav-tab.active');
  if (!activeTab || activeTab.offsetParent === null) {
    indicator.style.opacity = '0';
    return;
  }

  // Calculate precise relative position within container (works in both LTR & RTL)
  const tabRect = activeTab.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const leftOffset = (tabRect.left - containerRect.left) + container.scrollLeft;

  indicator.style.opacity = '1';
  indicator.style.width = `${activeTab.offsetWidth}px`;
  indicator.style.transform = `translateX(${leftOffset}px)`;
}
window.updateNavIndicator = updateNavIndicator;

/**
 * Smart Auto-Hide & Auto-Show Scroll Controller
 * Smoothly hides navbar when scrolling down to maximize practice focus,
 * and immediately reveals it on any upward scroll.
 */
let _lastScrollY = window.scrollY;
let _scrollTicking = false;

function initSmartNavbarScroll() {
  window.addEventListener('scroll', () => {
    if (!_scrollTicking) {
      window.requestAnimationFrame(() => {
        handleNavbarScroll();
        _scrollTicking = false;
      });
      _scrollTicking = true;
    }
  }, { passive: true });
}

function handleNavbarScroll() {
  const navbar = el.portalNavbar || document.getElementById('portalNavbar');
  if (!navbar) return;

  // Don't auto-hide when practice modal, drawing board, or dialogs are open
  if (document.body.classList.contains('modal-open') || 
      document.querySelector('.modal-backdrop.open, .practice-modal-backdrop.open')) {
    return;
  }

  const currentScrollY = window.scrollY;
  const delta = currentScrollY - _lastScrollY;

  if (currentScrollY <= 45) {
    navbar.classList.remove('nav-scrolled-hidden');
  } else if (delta > 8 && currentScrollY > 75) {
    // Scrolling down -> auto-hide
    navbar.classList.add('nav-scrolled-hidden');
  } else if (delta < -4) {
    // Scrolling up -> auto-reveal
    navbar.classList.remove('nav-scrolled-hidden');
  }

  _lastScrollY = currentScrollY;
}

function updateStudentHeader() {
  const user = AppState.currentUser;
  if (!user) return;

  const isTeacher = user.role === 'teacher' || user.username === 'admin' || user.username === 'rania';
  const sidebarTeacherTab = document.getElementById('sidebarTeacherTabBtn');
  const topTeacherBtn = document.getElementById('topTeacherQuickBtn');
  const studentLevelPill = document.getElementById('navStudentLevel');

  if (isTeacher) {
    if (topTeacherBtn) topTeacherBtn.style.display = 'inline-flex';
    if (el.teacherTabBtn) el.teacherTabBtn.style.display = 'inline-flex';
    if (sidebarTeacherTab) {
      sidebarTeacherTab.style.display = 'flex';
      sidebarTeacherTab.classList.add('bg-purple-600', 'text-white');
      sidebarTeacherTab.classList.remove('text-purple-700', 'hover:bg-purple-50');
    }
    if (el.navStudentAvatar) el.navStudentAvatar.textContent = user.avatar || '👩‍🏫';
    if (el.navStudentName) el.navStudentName.textContent = user.full_name || 'Miss Rania';
    if (el.navStudentGrade) el.navStudentGrade.innerHTML = `<span>Instructor &bull; Admin</span>`;
    if (el.navStudentXP) el.navStudentXP.textContent = 'Teacher Console';
    if (studentLevelPill) studentLevelPill.textContent = 'Admin';
    if (el.navXpStripFill) el.navXpStripFill.style.width = '100%';
  } else {
    if (topTeacherBtn) topTeacherBtn.style.display = 'none';
    if (el.teacherTabBtn) el.teacherTabBtn.style.display = 'none';
    if (sidebarTeacherTab) {
      sidebarTeacherTab.style.display = 'none'; // Strictly hidden for students
    }
    if (el.navStudentAvatar) el.navStudentAvatar.textContent = user.avatar || '🦊';
    if (el.navStudentName) el.navStudentName.textContent = user.full_name;
    if (el.navStudentGrade) el.navStudentGrade.innerHTML = `(${user.grade_level || 'Student'})`;
    if (el.navStudentXP) el.navStudentXP.textContent = `${(user.xp || 0).toLocaleString()} XP`;
    if (el.navStudentStreak) el.navStudentStreak.textContent = `${user.streak_days || 1} Streak`;
    const rank = getStudentRank(user.xp || 0);
    if (studentLevelPill) studentLevelPill.textContent = `Lv. ${rank.level}`;

    // Automatic Level XP Progress Calculation
    if (el.navXpStripFill) {
      const xp = user.xp || 0;
      const progressInLevel = (xp % 300);
      const pct = Math.min(100, Math.max(10, Math.round((progressInLevel / 300) * 100)));
      el.navXpStripFill.style.width = `${pct}%`;
    }
  }

  // Update student's grade if not set
  if (user.grade_level && !AppState.currentGrade && !isTeacher) {
    AppState.currentGrade = user.grade_level;
  }

  // Re-align indicator after role switch / tab visibility changes
  setTimeout(updateNavIndicator, 60);
}

function getStudentRank(xp) {
  if (xp >= 3000) return { level: 8, title: 'Grandmaster Scholar' };
  if (xp >= 2000) return { level: 6, title: 'Maths & Science Wizard' };
  if (xp >= 1500) return { level: 5, title: 'Academic Prodigy' };
  if (xp >= 1000) return { level: 4, title: 'Maths Explorer' };
  if (xp >= 500) return { level: 3, title: 'Active Apprentice' };
  return { level: 1, title: 'Junior Learner' };
}

// =============================================================================
// VIEW 1: Dashboard Controller
// =============================================================================

async function renderDashboard() {
  const user = AppState.currentUser;
  if (!user) return;
  renderDashboardAssignments();

  el.dashStudentName.textContent = user.full_name.split(' ')[0];
  el.dashStreakText.textContent = `${user.streak_days}-day practice streak`;

  const rank = getStudentRank(user.xp);
  if (el.dashLevelBadge) el.dashLevelBadge.textContent = `${rank.level}`;
  if (el.dashRankTitle) el.dashRankTitle.textContent = `Lv. ${rank.level} ${rank.title}`;
  if (el.dashCurrentXP) el.dashCurrentXP.textContent = user.xp.toLocaleString();

  const targetLevelXP = (rank.level + 1) * 350;
  const progressPercent = Math.min(Math.round((user.xp % 350) / 350 * 100), 100);
  const remainingXP = Math.max(0, 350 - (user.xp % 350));
  const questionsNeeded = Math.max(1, Math.ceil(remainingXP / 25));

  if (el.dashXpFill) el.dashXpFill.style.width = `${progressPercent}%`;

  const targetXpEl = document.getElementById('dashTargetXP');
  if (targetXpEl) targetXpEl.textContent = targetLevelXP.toLocaleString();
  const xpPercentTextEl = document.getElementById('dashXpPercentText');
  if (xpPercentTextEl) xpPercentTextEl.textContent = `${progressPercent}% to Level ${rank.level + 1}`;
  const xpRemainingEl = document.getElementById('dashXpRemainingText');
  if (xpRemainingEl) xpRemainingEl.textContent = `${remainingXP} XP Remaining`;
  const milestonePromptEl = document.getElementById('dashMilestonePrompt');
  if (milestonePromptEl) milestonePromptEl.textContent = `Solve ${questionsNeeded} more questions to reach Level ${rank.level + 1}!`;
  const streakBadgeTextEl = document.getElementById('dashStreakBadgeText');
  if (streakBadgeTextEl) streakBadgeTextEl.textContent = `${user.streak_days}-Day Practice Streak`;
  const cohortTagEl = document.getElementById('dashCohortTag');
  if (cohortTagEl) cohortTagEl.textContent = `${user.grade_level} Cohort Alpha`;
  const nextMilestoneEl = document.getElementById('dashNextMilestone');
  if (nextMilestoneEl) nextMilestoneEl.textContent = `Level ${rank.level + 1}`;

  // Fetch student report summary for KPI counters
  try {
    const reportData = await DB.getReport(user.id);
    if (reportData && reportData.summary) {
      animateNumber(el.kpiQuestionsAnswered, reportData.summary.total_questions || 0);
      el.kpiAccuracyRate.textContent = `${reportData.summary.accuracy_rate || 0}%`;
      el.kpiTimeSpent.textContent = formatDuration(reportData.summary.total_time_spent || 0);
      animateNumber(el.kpiMasteredCount, reportData.summary.mastered_skills || 0);
    }
  } catch (e) {}

  // Render Tracks Preview on Dashboard
  const teacherData = window.TEACHER_CURRICULUM;
  if (teacherData && teacherData.tracks) {
    el.dashTracksPreviewContainer.innerHTML = teacherData.tracks.slice(0, 3).map(track => `
      <div class="unit-card">
        <div>
          <div class="unit-top-bar">
            <span class="subject-badge">${track.subject.toUpperCase()}</span>
            <span class="level-badge">${track.badge}</span>
          </div>
          <h3 class="unit-title">${track.title}</h3>
          <p class="unit-objective">${track.description}</p>
        </div>
        <div style="margin-top: 1rem;">
          <button class="primary-glow-btn full-width" onclick="switchView('tracks')">
            <span>🌟</span> <span>Explore Track Units</span>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// =============================================================================
// VIEW 2: Curriculum Tracks Controller (Miss Rania's Courses)
// =============================================================================

function renderTracksView() {
  const teacherData = window.TEACHER_CURRICULUM;
  if (!teacherData || !teacherData.tracks) return;

  const activeSubj = el.trackSubjectFilter.querySelector('.segmented-btn.active').dataset.subject;
  let tracks = teacherData.tracks;
  if (activeSubj !== 'All') {
    tracks = tracks.filter(t => t.subject.toLowerCase() === activeSubj.toLowerCase());
  }

  el.teacherTracksFullContainer.innerHTML = tracks.map(track => `
    <div class="teacher-track-card">
      <div class="track-header">
        <div class="track-badge-group">
          <span class="subject-badge">${track.subject.toUpperCase()}</span>
          <span class="level-badge">${track.badge} &bull; ${track.gradeLevel}</span>
        </div>
        <h2 class="track-title">${track.title}</h2>
        <p class="track-desc">${track.description}</p>
      </div>

      <div class="teacher-tip-callout">
        ${track.teacherTips}
      </div>

      <div class="track-units-grid">
        ${track.units.map(unit => `
          <div class="unit-card">
            <div>
              <div class="unit-top-bar">
                <span class="unit-num-tag">${unit.unitNumber}</span>
              </div>
              <h3 class="unit-title">${unit.title}</h3>
              <p class="unit-objective">${unit.objective}</p>
            </div>

            <div class="unit-skills-list">
              ${unit.assignedSkills.map(s => `
                <div class="unit-skill-row">
                  <div class="unit-skill-info">
                    <span class="unit-skill-title" title="${s.title}">${s.title}</span>
                    <span class="unit-skill-code">${s.grade}</span>
                  </div>
                  <button class="learn-pill-btn" onclick="startPracticeByPermacode('${s.permacode}', '${encodeURIComponent(s.title)}')">
                    <span>Learn</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// =============================================================================
// VIEW 3: Skills Bank Explorer Controller (24,792 Skills)
// =============================================================================

function renderGradesSidebar() {
  if (!AppState.data) return;
  el.gradesNavList.innerHTML = '';

  let grades = [];
  if (AppState.currentSubject === 'All') {
    const map = new Map();
    for (const [subj, info] of Object.entries(AppState.data)) {
      for (const g of info.grades) {
        if (!map.has(g.grade_name)) {
          map.set(g.grade_name, { ...g, totalCount: 0 });
        }
        map.get(g.grade_name).totalCount += g.skills_count;
      }
    }
    grades = Array.from(map.values());
  } else {
    const subjData = AppState.data[AppState.currentSubject];
    if (subjData) grades = subjData.grades;
  }

  const exists = grades.some(g => g.grade_name === AppState.currentGrade);
  if (!exists && grades.length > 0) {
    AppState.currentGrade = grades[0].grade_name;
  }

  grades.forEach(grade => {
    const li = document.createElement('li');
    li.className = `grade-item ${grade.grade_name === AppState.currentGrade ? 'active' : ''}`;
    li.innerHTML = `
      <span>${grade.grade_name}</span>
      <span class="count-badge">${(grade.totalCount || grade.skills_count).toLocaleString()}</span>
    `;
    li.addEventListener('click', () => {
      AppState.currentGrade = grade.grade_name;
      renderGradesSidebar();
      renderSkillsCanvas();
    });
    el.gradesNavList.appendChild(li);
  });
}

function renderSkillsCanvas() {
  if (!AppState.data) return;
  el.skillsCategoriesContainer.innerHTML = '';

  const isSearch = AppState.searchQuery.trim().length > 0;
  if (isSearch) {
    el.currentGradeTitle.textContent = `Search Results: "${AppState.searchQuery}"`;
    el.currentGradeSubtitle.textContent = `Matching skills across ${AppState.currentSubject === 'All' ? 'all curriculum subjects' : AppState.currentSubject}`;
  } else {
    el.currentGradeTitle.textContent = `${AppState.currentSubject === 'All' ? 'All Subjects' : AppState.currentSubject} — ${AppState.currentGrade}`;
    el.currentGradeSubtitle.textContent = 'Select any competency below to begin your practice drill';
  }

  let filtered = [];
  if (isSearch) {
    const q = AppState.searchQuery.trim().toLowerCase();
    filtered = AppState.flatSkills.filter(s => {
      if (AppState.currentSubject !== 'All' && s.subject !== AppState.currentSubject) return false;
      return s._searchToken.includes(q);
    });
  } else {
    if (AppState.currentSubject === 'All') {
      filtered = AppState.flatSkills.filter(s => s.grade === AppState.currentGrade);
    } else {
      filtered = AppState.flatSkills.filter(s => s.subject === AppState.currentSubject && s.grade === AppState.currentGrade);
    }
  }

  // Filter by status
  if (AppState.statusFilter === 'favorites') {
    filtered = filtered.filter(s => AppState.favorites.has(s.id));
  } else if (AppState.statusFilter === 'mastered') {
    filtered = filtered.filter(s => AppState.mastered.has(s.id));
  }

  if (filtered.length === 0) {
    el.skillsCategoriesContainer.innerHTML = `
      <div style="text-align:center; padding: 4rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <h3>No matching skills found</h3>
        <p>Try refining your search terms or choosing a different subject or grade.</p>
      </div>
    `;
    return;
  }

  // Group by category
  const groups = new Map();
  for (const s of filtered) {
    const catKey = `${s.category_code} • ${s.category_name}`;
    if (!groups.has(catKey)) {
      groups.set(catKey, { code: s.category_code, name: s.category_name, items: [] });
    }
    groups.get(catKey).items.push(s);
  }

  for (const [catKey, catData] of groups) {
    const isCollapsed = AppState.collapsedCategories.has(catKey);
    const catBlock = document.createElement('div');
    catBlock.className = 'skill-category-block';
    catBlock.innerHTML = `
      <div class="category-header-row" data-cat="${catKey}">
        <div class="cat-title-group">
          <span class="cat-code-badge">${catData.code}</span>
          <span class="cat-name-text">${catData.name}</span>
          <span class="cat-skills-count">(${catData.items.length} skills)</span>
        </div>
        <span style="transform: ${isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'}; transition: transform 0.2s;">▼</span>
      </div>
      <div class="skills-list-grid" style="display: ${isCollapsed ? 'none' : 'flex'};">
        ${catData.items.map(s => {
          const isFav = AppState.favorites.has(s.id);
          const isMas = AppState.mastered.has(s.id);
          return `
            <div class="skill-row-card">
              <div class="skill-row-left">
                <span class="skill-number-tag">${s.code}</span>
                <span class="skill-title-name" title="${s.name}">${s.name}</span>
              </div>
              <div class="skill-row-right">
                <button class="action-icon-btn ${isFav ? 'favorited' : ''}" data-fav="${s.id}" title="Star as favorite">
                  ${isFav ? '★' : '☆'}
                </button>
                <button class="action-icon-btn ${isMas ? 'mastered' : ''}" data-mas="${s.id}" title="Mark as mastered">
                  ${isMas ? '✓' : '○'}
                </button>
                <button class="learn-pill-btn" onclick="startPracticeByPermacode('${s.permacode}', '${encodeURIComponent(s.name)}')">
                  <span>Learn</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Category accordion toggle
    catBlock.querySelector('.category-header-row').addEventListener('click', () => {
      if (AppState.collapsedCategories.has(catKey)) {
        AppState.collapsedCategories.delete(catKey);
      } else {
        AppState.collapsedCategories.add(catKey);
      }
      renderSkillsCanvas();
    });

    // Favorite toggle
    catBlock.querySelectorAll('button[data-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.fav;
        if (AppState.favorites.has(id)) {
          AppState.favorites.delete(id);
          showToast('Removed from favorites');
        } else {
          AppState.favorites.add(id);
          showToast('Added to favorites ★');
        }
        localStorage.setItem('rc_favorites', JSON.stringify(Array.from(AppState.favorites)));
        renderSkillsCanvas();
      });
    });

    // Mastered toggle
    catBlock.querySelectorAll('button[data-mas]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.mas;
        if (AppState.mastered.has(id)) {
          AppState.mastered.delete(id);
        } else {
          AppState.mastered.add(id);
          showToast('Marked skill as Mastered ✓');
        }
        localStorage.setItem('rc_mastered', JSON.stringify(Array.from(AppState.mastered)));
        renderSkillsCanvas();
      });
    });

    el.skillsCategoriesContainer.appendChild(catBlock);
  }
}

// =============================================================================
// VIEW 4: Student Performance Reports & Analytics (Key Requirement)
// =============================================================================

async function renderStudentReportView() {
  const isTeacher = AppState.currentUser && (AppState.currentUser.role === 'teacher' || AppState.currentUser.username === 'admin');
  const targetStudentId = AppState.viewingReportStudentId || (AppState.currentUser ? AppState.currentUser.id : 1);

  // Fetch live SQL audit report
  try {
    const reportData = await DB.getReport(targetStudentId);
    const user = (reportData && reportData.student) ? reportData.student : AppState.currentUser;
    if (!user) return;

    el.reportAvatar.textContent = user.avatar || '🦊';
    el.reportFullName.textContent = user.full_name;
    el.reportUsername.textContent = `@${user.username}`;
    el.reportGrade.textContent = user.grade_level;

    const rank = getStudentRank(user.xp || 1200);
    el.reportRankTitle.textContent = `Level ${rank.level} • ${rank.title}`;
    el.reportStreak.textContent = `🔥 ${user.streak_days || 1} Day Streak`;
    el.reportGeneratedDate.textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    if (!reportData) return;

    const s = reportData.summary;
    animateNumber(el.repTotalQuestions, s.total_questions || 0);
    el.repAccuracy.textContent = `${s.accuracy_rate || 0}%`;
    el.repAvgScore.textContent = s.avg_smart_score || 0;
    el.repTotalTime.textContent = formatDuration(s.total_time_spent || 0);
    animateNumber(el.repMasteredSkills, s.mastered_skills || 0);

    // Subject Breakdown
    el.reportSubjectBreakdownGrid.innerHTML = Object.entries(reportData.subjects || {}).map(([subj, d]) => `
      <div class="subject-progress-card">
        <div class="subj-card-header">
          <span class="subj-name">${subj}</span>
          <span class="subj-acc-tag">${d.accuracy}% Accuracy</span>
        </div>
        <div class="subj-bar-bg">
          <div class="subj-bar-fill" style="width: ${d.accuracy}%;"></div>
        </div>
        <div class="subj-card-footer">
          <span>${d.questions} questions solved</span>
          <span>${d.mastered} skills mastered</span>
        </div>
      </div>
    `).join('') || '<div style="color:var(--text-muted)">No subject history recorded yet.</div>';

    // Badges Showcase
    const badges = reportData.badges || [];
    el.reportBadgesGrid.innerHTML = badges.map(b => `
      <div class="badge-item-card">
        <div class="badge-item-icon">${b.badge_icon}</div>
        <div class="badge-item-info">
          <div class="badge-item-name">${b.badge_name}</div>
          <div class="badge-item-desc">${b.badge_desc}</div>
        </div>
      </div>
    `).join('') || '<div style="color:var(--text-muted)">Practice skills to unlock badges!</div>';

    // Practice Session History Table
    const history = reportData.history || [];
    el.reportRecordCount.textContent = `Showing ${history.length} database logs`;
    el.reportHistoryTableBody.innerHTML = history.map(h => {
      const isMastered = h.smart_score >= 90;
      const isProficient = h.smart_score >= 70;
      const statusClass = isMastered ? 'status-mastered' : (isProficient ? 'status-proficient' : 'status-developing');
      const statusText = isMastered ? 'Mastered' : (isProficient ? 'Proficient' : 'Developing');
      const acc = h.questions_answered ? Math.round((h.questions_correct / h.questions_answered) * 100) : 0;

      return `
        <tr>
          <td>${h.completed_at || 'Just now'}</td>
          <td><strong style="color:var(--color-primary);">${h.skill_code}</strong></td>
          <td>${h.skill_name}</td>
          <td><span class="subject-badge">${h.subject}</span></td>
          <td>${h.questions_answered} (${h.questions_correct} correct)</td>
          <td><strong>${acc}%</strong></td>
          <td><span style="font-weight:700; color:${h.smart_score >= 90 ? 'var(--color-success)' : 'inherit'};">${h.smart_score}</span></td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="8" style="text-align:center;">No practice sessions logged yet. Click Learn to start!</td></tr>';

  } catch (err) {
    console.error('Error generating report:', err);
  }
}

// =============================================================================
// VIEW 5: Leaderboard Controller
// =============================================================================

// =============================================================================
// VIEW 6: Teacher Console & Admin Dashboard (Miss Rania's Panel)
// =============================================================================

async function renderTeacherConsoleView() {
  if (!el.teacherRosterTableBody) return;
  renderTeacherAssignments();

  el.teacherRosterTableBody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Loading classroom data...</td></tr>';

  try {
    const overview = await DB.getTeacherOverview();
    if (!overview) return;

    // KPI Counters
    if (el.tTotalStudents) animateNumber(el.tTotalStudents, overview.total_students || 0);
    if (el.tTotalQuestions) animateNumber(el.tTotalQuestions, overview.class_stats ? overview.class_stats.total_questions : 0);
    if (el.tClassAccuracy) el.tClassAccuracy.textContent = `${overview.class_stats ? overview.class_stats.accuracy_rate : 0}%`;
    if (el.tTotalHours) el.tTotalHours.textContent = `${overview.class_stats ? overview.class_stats.total_hours : 0}h`;

    // Student Roster Table
    const roster = overview.roster || [];
    AppState.currentTeacherRoster = roster;
    el.teacherRosterTableBody.innerHTML = roster.map(s => {
      const acc = s.accuracy_rate || 0;
      const accClass = acc >= 90 ? 'green' : (acc >= 75 ? 'amber' : 'orange');
      const safeName = (s.full_name || '').replace(/'/g, "\\'");

      return `
        <tr>
          <td>
            <div class="student-leader-cell">
              <div class="leader-avatar">${s.avatar || '🦊'}</div>
              <div>
                <div class="leader-name" style="font-weight:700;">${s.full_name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${s.is_custom ? 'Custom Student' : 'Classroom Member'}</div>
              </div>
            </div>
          </td>
          <td>
            <code style="background:rgba(99,102,241,0.12); color:#4338ca; padding:3px 7px; border-radius:6px; font-weight:700; font-size:0.85rem;">@${s.username}</code>
          </td>
          <td>
            <code style="background:rgba(16,185,129,0.12); color:#047857; padding:3px 7px; border-radius:6px; font-weight:700; font-size:0.85rem;">${s.password || 'password123'}</code>
          </td>
          <td><strong style="color:var(--text-main); font-size:0.85rem;">${s.grade_level}</strong></td>
          <td>
            ${s.is_custom
              ? '<span style="background:rgba(59,130,246,0.12); color:#2563eb; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:700;">Custom ✨</span>'
              : '<span style="background:rgba(100,116,139,0.12); color:#475569; padding:3px 8px; border-radius:12px; font-size:0.72rem; font-weight:700;">Enrolled 📌</span>'}
          </td>
          <td><strong>${s.questions_answered ? s.questions_answered.toLocaleString() : 0}</strong></td>
          <td><span class="accuracy-pill ${accClass}">${acc}%</span></td>
          <td><strong style="color:${s.avg_smart_score >= 90 ? 'var(--color-success)' : 'inherit'}">${s.avg_smart_score || 0}</strong></td>
          <td><strong style="color:var(--color-primary); font-family:var(--font-mono);">${(s.xp || 0).toLocaleString()} XP</strong></td>
          <td>
            <div class="actions-cell">
              <button class="action-btn-sm" onclick="inspectStudentReport(${s.id})" title="Student Performance Report">
                📊 Report
              </button>
              <button class="action-btn-sm print" onclick="printStudentReportCard(${s.id})" title="Print Student Report Card">
                🖨️
              </button>
              <button class="action-btn-sm edit" onclick="openEditStudentModal(${s.id})" title="Edit Student Profile & Password">
                ✏️ Edit
              </button>
              <button class="action-btn-sm key" onclick="openResetPasswordModal(${s.id}, '${safeName}')" title="Reset Student Password">
                🔑 Pass
              </button>
              <button class="action-btn-sm delete" onclick="confirmDeleteStudent(${s.id}, '${safeName}')" title="Remove Student from Classroom">
                🗑️ Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="10" style="text-align:center; padding:1.5rem;">No registered students found.</td></tr>';

    // Attention Needed Skills
    const attention = overview.attention_skills || [];
    if (el.teacherAttentionSkillsList) {
      el.teacherAttentionSkillsList.innerHTML = attention.map(s => `
        <div class="teacher-skill-row">
          <div class="teacher-skill-info">
            <div class="teacher-skill-code">${s.skill_code} &bull; ${s.subject} (${s.grade})</div>
            <div class="teacher-skill-title">${s.skill_name}</div>
            <div class="teacher-skill-meta">Attempted ${s.attempts || 1} times &bull; Average Score: <strong>${s.avg_score || 0}</strong></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="accuracy-pill orange">Needs Attention</span>
            <button class="action-btn-sm" onclick="launchPracticeForSkill('${s.skill_code}')">Review Skill &rarr;</button>
          </div>
        </div>
      `).join('') || '<div style="padding:1rem; color:var(--text-muted);">No struggling topics detected! Class is performing exceptionally well. 🌟</div>';
    }

    // Mastered Skills
    const mastered = overview.mastered_skills || [];
    if (el.teacherMasteredSkillsList) {
      el.teacherMasteredSkillsList.innerHTML = mastered.map(s => `
        <div class="teacher-skill-row">
          <div class="teacher-skill-info">
            <div class="teacher-skill-code">${s.skill_code} &bull; ${s.subject} (${s.grade})</div>
            <div class="teacher-skill-title">${s.skill_name}</div>
            <div class="teacher-skill-meta">${s.attempts || 1} mastery completions logged</div>
          </div>
          <span class="accuracy-pill green">SmartScore ${s.avg_score || 95} 🏆</span>
        </div>
      `).join('') || '<div style="padding:1rem; color:var(--text-muted);">No mastered competencies yet.</div>';
    }

  } catch (err) {
    console.error('Teacher console error:', err);
    el.teacherRosterTableBody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Failed to load classroom data.</td></tr>';
  }
}

window.inspectStudentReport = function(studentId) {
  AppState.viewingReportStudentId = studentId;
  switchView('reports');
  showToast('Viewing student performance report 📊');
};

window.printStudentReportCard = async function(studentId) {
  AppState.viewingReportStudentId = studentId;
  await renderStudentReportView();
  setTimeout(() => window.print(), 300);
};

window.printStudentLoginCards = async function() {
  const overview = await DB.getTeacherOverview();
  if (!overview || !overview.roster || !overview.roster.length) {
    showToast('No enrolled students available to print');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Please allow popup windows to print student login cards');
    return;
  }

  const cardsHtml = overview.roster.map(s => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="school-name">RC Classroom 🏫</div>
          <div class="student-name">${s.full_name}</div>
        </div>
        <div class="avatar">${s.avatar || '🦊'}</div>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="lbl">Grade Level:</span>
          <span class="val">${s.grade_level}</span>
        </div>
        <div class="info-row">
          <span class="lbl">Username:</span>
          <span class="val cred-user">${s.username}</span>
        </div>
        <div class="info-row">
          <span class="lbl">Password:</span>
          <span class="val cred-pass">${s.password || 'password123'}</span>
        </div>
      </div>
      <div class="card-footer">
        Portal URL: https://mbechr.github.io/rcroom/
      </div>
    </div>
  `).join('');

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Student Login Credentials — RC Classroom</title>
      <style>
        @page { size: A4 portrait; margin: 10mm; }
        * { box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #fff; color: #1e293b; margin: 0; padding: 12px; }
        .no-print { text-align: center; margin-bottom: 20px; }
        .print-btn { background: #4f46e5; color: white; padding: 10px 24px; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; }
        h1 { text-align: center; font-size: 22px; color: #3730a3; margin: 0 0 4px 0; }
        .sub { text-align: center; font-size: 13px; color: #64748b; margin: 0 0 20px 0; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .card { border: 2px dashed #6366f1; border-radius: 12px; padding: 14px; background: #f8fafc; page-break-inside: avoid; }
        .card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px; }
        .school-name { font-size: 11px; font-weight: bold; color: #6366f1; text-transform: uppercase; }
        .student-name { font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 2px; }
        .avatar { font-size: 26px; }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 13px; }
        .lbl { color: #64748b; font-weight: 500; }
        .val { font-weight: 700; color: #0f172a; }
        .cred-user { color: #4338ca; font-family: monospace; font-size: 14px; }
        .cred-pass { color: #059669; font-family: monospace; font-size: 14px; }
        .card-footer { margin-top: 10px; padding: 6px; background: #e0e7ff; border-radius: 6px; font-size: 11px; text-align: center; color: #3730a3; font-weight: 600; }
        @media print {
          .no-print { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Print Login Cards Now</button>
      </div>
      <h1>🏫 Student Access & Login Cards — RC Classroom</h1>
      <p class="sub">Teacher Suite • Distribute cards to students to begin curriculum practice immediately</p>
      <div class="grid">${cardsHtml}</div>
      <script>window.onload = () => { setTimeout(() => window.print(), 350); };</script>
    </body>
    </html>
  `);
  printWindow.document.close();
};

window.launchPracticeForSkill = function(skillCode) {
  const skill = AppState.flatSkills.find(s => s.code === skillCode || s.permacode === skillCode);
  if (skill) {
    openPracticeModal(skill);
  } else {
    showToast(`Skill ${skillCode} ready for practice`);
  }
};

function exportClassroomCsv() {
  DB.getTeacherOverview().then(overview => {
    if (!overview || !overview.roster) return;
    const roster = overview.roster;
    let csv = 'Student ID,Full Name,Username,Grade,Questions Answered,Questions Correct,Accuracy Rate,Avg SmartScore,Total XP,Daily Streak,Badges Count,Last Active\n';
    roster.forEach(s => {
      csv += `"${s.id}","${s.full_name}","${s.username}","${s.grade_level}","${s.questions_answered || 0}","${s.questions_correct || 0}","${s.accuracy_rate || 0}%","${s.avg_smart_score || 0}","${s.xp || 0}","${s.streak_days || 1}","${s.badges_count || 0}","${s.last_active || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rania_Classroom_Student_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Classroom CSV Report exported! 📥');
  });
}

async function renderLeaderboardView() {
  el.leaderboardTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading class rankings...</td></tr>';

  try {
    const leaders = await DB.getLeaderboard();
    el.leaderboardTableBody.innerHTML = leaders.map((s, idx) => {
      const rankBadge = idx === 0 ? '🥇 1st' : (idx === 1 ? '🥈 2nd' : (idx === 2 ? '🥉 3rd' : `${idx + 1}th`));
      return `
        <tr>
          <td class="rank-cell">${rankBadge}</td>
          <td>
            <div class="student-leader-cell">
              <div class="leader-avatar">${s.avatar || '🦊'}</div>
              <div>
                <div class="leader-name">${s.full_name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">@${s.username}</div>
              </div>
            </div>
          </td>
          <td>${s.grade_level}</td>
          <td>🔥 ${s.streak_days} days</td>
          <td><strong style="color:var(--color-primary); font-family:var(--font-mono);">${s.xp.toLocaleString()} XP</strong></td>
          <td><span class="status-badge status-mastered">${getStudentRank(s.xp).title}</span></td>
        </tr>
      `;
    }).join('');
  } catch (e) {
    el.leaderboardTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Could not load leaderboard.</td></tr>';
  }
}

// =============================================================================
// Universal Interactive Practice Lab (Universal Question Engine)
// =============================================================================

function startPracticeByPermacode(permacode, encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  let targetSkill = AppState.flatSkills.find(s => s.permacode === permacode);
  if (!targetSkill) {
    targetSkill = {
      id: 'custom-' + permacode,
      code: '',
      name: title,
      permacode: permacode,
      subject: AppState.currentSubject === 'All' ? 'Maths' : AppState.currentSubject,
      grade: AppState.currentGrade || 'Year 4'
    };
  }
  openPracticeModal(targetSkill);
}

function openPracticeModal(skill) {
  AppState.practice.activeSkill = skill;
  AppState.practice.score = 0;
  AppState.practice.answeredCount = 0;
  AppState.practice.correctCount = 0;
  AppState.practice.timerSeconds = 0;
  AppState.practice.selectedOption = null;

  el.practiceModalSkillCode.textContent = skill.code && skill.code !== skill.permacode ? skill.code : '';
  el.practiceModalSkillSubject.textContent = skill.subject;
  el.practiceModalSkillTitle.textContent = skill.name;
  el.practiceScore.textContent = '0';
  el.practiceAnswered.textContent = '0';
  el.practiceTimer.textContent = '00:00';

  if (AppState.practice.timerInterval) clearInterval(AppState.practice.timerInterval);
  AppState.practice.timerInterval = setInterval(() => {
    AppState.practice.timerSeconds++;
    const m = String(Math.floor(AppState.practice.timerSeconds / 60)).padStart(2, '0');
    const s = String(AppState.practice.timerSeconds % 60).padStart(2, '0');
    el.practiceTimer.textContent = `${m}:${s}`;
  }, 1000);

  loadNextQuestion();
  el.practiceModal.classList.add('open');
}

function closePracticeModal() {
  if (AppState.practice.timerInterval) {
    clearInterval(AppState.practice.timerInterval);
    AppState.practice.timerInterval = null;
  }

  // If student answered at least 1 question, submit practice session to SQL DB!
  if (AppState.practice.answeredCount > 0 && AppState.practice.activeSkill) {
    const s = AppState.practice.activeSkill;
    DB.submitPracticeSession({
      student_id: AppState.currentUser.id,
      skill_code: s.code || s.permacode,
      skill_name: s.name,
      subject: s.subject,
      grade: s.grade,
      smart_score: AppState.practice.score,
      questions_answered: AppState.practice.answeredCount,
      questions_correct: AppState.practice.correctCount,
      duration_seconds: AppState.practice.timerSeconds
    }).then(res => {
      showToast(`Practice logged! Earned +${res.xp_earned || 25} XP 🎉`);
      updateStudentHeader();
    });
  }

  el.practiceModal.classList.remove('open');
}

// =============================================================================
// Interactive Practice Room Engine (100% Pure English, Rock-Solid Rendering)
// =============================================================================

function ensureUniqueChoices(correct, rawOptions, count = 4) {
  const cleanOptions = Array.from(new Set(
    rawOptions.filter(o => o !== undefined && o !== null && String(o).trim() !== '').map(String)
  ));

  if (!cleanOptions.includes(String(correct))) {
    cleanOptions.unshift(String(correct));
  }

  if (cleanOptions.length >= count) {
    return shuffle(cleanOptions.slice(0, count));
  }

  const set = new Set(cleanOptions);
  const isPureNumber = /^-?\d+(\.\d+)?$/.test(String(correct).replace(/,/g, ''));

  if (isPureNumber) {
    const num = parseFloat(String(correct).replace(/,/g, ''));
    let step = 1;
    while (set.size < count) {
      const delta = (step++ * (step % 2 === 0 ? 1 : -1));
      const val = Math.max(0, Math.round(num + delta));
      set.add(val.toLocaleString());
    }
  }

  return shuffle(Array.from(set).slice(0, count));
}

function loadNextQuestion() {
  if (window.SpeechAudio) window.SpeechAudio.stop();
  AppState.practice.selectedOption = null;

  el.practiceFeedbackBox.style.display = 'none';
  el.practiceSubmitBtn.style.display = 'inline-flex';
  el.practiceNextBtn.style.display = 'none';

  const skill = AppState.practice.activeSkill || {
    name: 'General Mathematics Practice',
    subject: 'Maths',
    grade: 'Year 4'
  };

  const q = window.QuestionEngine ? window.QuestionEngine.generate(skill, AppState.practice.score) : generateQuestion(skill);
  AppState.practice.currentQuestion = q;

  // Render Prompt
  el.practiceQuestionPrompt.textContent = q.prompt;

  // Render Visuals Box
  if (q.visuals && q.visuals.length > 0) {
    el.practiceVisualBox.innerHTML = q.visuals.map(v => `<span class="prompt-visual-badge">${v}</span>`).join(' ');
    el.practiceVisualBox.style.display = 'flex';
  } else {
    el.practiceVisualBox.innerHTML = '';
    el.practiceVisualBox.style.display = 'none';
  }

  // Always show practiceOptionsGrid with clear choices!
  if (el.practiceOptionsGrid) {
    el.practiceOptionsGrid.style.display = 'grid';
    el.practiceOptionsGrid.innerHTML = '';

    let rawOptions = (q.options && q.options.length) ? q.options : [q.correctAnswer];
    const isTrueFalse = rawOptions.length === 2 && rawOptions.includes('True') && rawOptions.includes('False');
    const options = isTrueFalse ? rawOptions : (rawOptions.length >= 4 ? shuffle(rawOptions.slice(0, 4)) : ensureUniqueChoices(q.correctAnswer, rawOptions, 4));

    if (isTrueFalse) {
      el.practiceOptionsGrid.classList.add('two-col-grid');
    } else {
      el.practiceOptionsGrid.classList.remove('two-col-grid');
    }


    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-choice-btn';
      if (opt === 'True') btn.classList.add('tf-true-btn');
      if (opt === 'False') btn.classList.add('tf-false-btn');

      const optText = String(opt);
      btn.innerHTML = `<span class="choice-text">${optText}</span>`;

      btn.onclick = () => {
        el.practiceOptionsGrid.querySelectorAll('.option-choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        AppState.practice.selectedOption = optText;
        if (el.practiceFillInInput) el.practiceFillInInput.value = optText;
      };

      el.practiceOptionsGrid.appendChild(btn);
    });
  }

  // Handle optional direct typing for fill_in questions
  if (q.type === 'fill_in' && el.practiceFillInContainer) {
    el.practiceFillInContainer.style.display = 'flex';
    el.practiceFillInInput.value = '';
    el.practiceFillInInput.disabled = false;
    setTimeout(() => el.practiceFillInInput.focus(), 150);
  } else if (el.practiceFillInContainer) {
    el.practiceFillInContainer.style.display = 'none';
  }

  // Hide auxiliary containers - optionsGrid reliably handles all modes
  if (el.practiceTrueFalseContainer) {
    el.practiceTrueFalseContainer.style.display = 'none';
  }
}

function submitAnswer() {
  const q = AppState.practice.currentQuestion;
  if (!q) return;

  // Sync from direct input if present and choice not explicitly clicked
  if (el.practiceFillInInput && el.practiceFillInInput.value.trim()) {
    if (!AppState.practice.selectedOption) {
      AppState.practice.selectedOption = el.practiceFillInInput.value.trim();
    }
  }

  const selected = AppState.practice.selectedOption;
  if (!selected) {
    showToast('Please select or type an answer first!');
    return;
  }

  AppState.practice.answeredCount++;
  el.practiceAnswered.textContent = String(AppState.practice.answeredCount);

  const normalize = (val) => String(val || '').trim().toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ');
  const cleanSelected = normalize(selected);
  const cleanCorrect = normalize(q.correctAnswer);
  const isCorrect = cleanSelected === cleanCorrect;

  // Sound FX
  if (isCorrect) {
    SoundFX.correct();
  } else {
    SoundFX.incorrect();
  }

  // Highlight all option buttons
  if (el.practiceOptionsGrid) {
    el.practiceOptionsGrid.querySelectorAll('.option-choice-btn').forEach(btn => {
      btn.disabled = true;
      const label = (btn.querySelector('.choice-text') ? btn.querySelector('.choice-text').textContent : btn.textContent).trim();
      if (normalize(label) === cleanCorrect) {
        btn.classList.add('correct');
      } else if (btn.classList.contains('selected')) {
        btn.classList.add('incorrect');
      }
    });
  }

  if (el.practiceFillInInput) {
    el.practiceFillInInput.disabled = true;
  }

  // Show Feedback Banner
  el.practiceFeedbackBox.style.display = 'block';
  if (isCorrect) {
    AppState.practice.correctCount++;
    AppState.practice.score = Math.min(100, AppState.practice.score + 10);
    el.practiceScore.textContent = String(AppState.practice.score);

    el.practiceFeedbackBox.className = 'practice-feedback-banner success';
    el.practiceFeedbackTitle.textContent = '🌟 Excellent! Correct Answer!';
    el.practiceExplanationText.textContent = q.explanation || 'Outstanding! You solved this question correctly.';

    if (AppState.practice.score === 100) {
      SoundFX.fanfare();
      ConfettiFX.fire(3500);
      showToast('🎉 Perfect 100 SmartScore Achieved! Skill Mastered! 💎');
      if (window.MasteryCertificate) {
        setTimeout(() => window.MasteryCertificate.open(AppState.currentUser, AppState.practice.activeSkill), 1000);
      }
    }
  } else {
    AppState.practice.score = Math.max(0, AppState.practice.score - 5);
    el.practiceScore.textContent = String(AppState.practice.score);

    el.practiceFeedbackBox.className = 'practice-feedback-banner failure';
    el.practiceFeedbackTitle.textContent = '💡 Review the Step-by-Step Solution:';
    el.practiceExplanationText.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 0.35rem;">Correct Answer: <span style="color: #30d158;">${q.correctAnswer}</span></div>
      <div style="color: var(--text-secondary); line-height: 1.5;">${q.explanation || 'Review the core rules above and try again next time.'}</div>
    `;
  }

  el.practiceSubmitBtn.style.display = 'none';
  el.practiceNextBtn.style.display = 'inline-flex';
}

// =============================================================================
// Dynamic Curriculum Question Generator (Pure English, Highly Grounded)
// =============================================================================

function generateQuestion(skill) {
  if (typeof window !== 'undefined' && window.QuestionEngine && window.QuestionEngine.generate) {
    return window.QuestionEngine.generate(skill);
  }
  const subj = skill.subject || 'Maths';
  const name = (skill.name || skill.skill_name || '').toLowerCase();
  const code = skill.code || skill.skill_code || '';

  if (subj === 'Maths') {
    // -------------------------------------------------------------------------
    // 1. Place Value & Number Sense (Up to Thousands & Millions)
    // -------------------------------------------------------------------------
    if (name.includes('place value') || name.includes('digit') || name.includes('partition') ||
        name.includes('expanded') || name.includes('model') || name.includes('number sense') ||
        name.includes('names of numbers') || name.includes('numbers to') || name.includes('thousands') ||
        name.includes('millions')) {

      const mode = Math.floor(Math.random() * 5);

      if (mode === 0) {
        // Identify place value name of a specific digit
        const places = [
          { name: 'ones', val: 1 },
          { name: 'tens', val: 10 },
          { name: 'hundreds', val: 100 },
          { name: 'thousands', val: 1000 },
          { name: 'ten thousands', val: 10000 },
          { name: 'hundred thousands', val: 100000 },
          { name: 'millions', val: 1000000 }
        ];
        const numPlaces = Math.floor(Math.random() * 4) + 4; // 4 to 7 digits
        const chosenPlaces = places.slice(0, numPlaces);
        const digits = chosenPlaces.map((p, idx) => idx === chosenPlaces.length - 1 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10));
        
        let fullNum = 0;
        chosenPlaces.forEach((p, idx) => fullNum += digits[idx] * p.val);
        const formattedNum = fullNum.toLocaleString();

        const targetIdx = Math.floor(Math.random() * chosenPlaces.length);
        const targetDigit = digits[targetIdx];
        const correctPlace = chosenPlaces[targetIdx].name;
        const capitalizedCorrect = correctPlace.charAt(0).toUpperCase() + correctPlace.slice(1);

        const allNames = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten thousands', 'Hundred thousands', 'Millions'];
        const distractors = allNames.filter(n => n.toLowerCase() !== correctPlace.toLowerCase());
        const options = shuffle([capitalizedCorrect, ...shuffle(distractors).slice(0, 3)]);

        return {
          type: 'multiple_choice',
          prompt: `In the number ${formattedNum}, what is the place value of the digit ${targetDigit}?`,
          visuals: [`🔢 ${formattedNum}`, `Target digit: ${targetDigit}`],
          correctAnswer: capitalizedCorrect,
          options: options,
          explanation: `In the number ${formattedNum}, the digit ${targetDigit} is in the ${capitalizedCorrect} place, giving it a value of ${(targetDigit * chosenPlaces[targetIdx].val).toLocaleString()}.`
        };
      } else if (mode === 1) {
        // Value of a digit (e.g. In 48,291, what is the value of 8?)
        const base = Math.floor(Math.random() * 800) + 100;
        const multiplier = [10, 100, 1000, 10000][Math.floor(Math.random() * 4)];
        const digit = Math.floor(Math.random() * 8) + 2;
        const fullNum = base * 1000 + digit * multiplier + Math.floor(Math.random() * 9) + 1;
        const val = digit * multiplier;

        const options = shuffle([
          val.toLocaleString(),
          (val * 10).toLocaleString(),
          (Math.max(1, Math.floor(val / 10))).toLocaleString(),
          (digit * 10).toLocaleString()
        ]);

        return {
          type: 'multiple_choice',
          prompt: `What is the value of the digit ${digit} in the number ${fullNum.toLocaleString()}?`,
          visuals: [`🔢 ${fullNum.toLocaleString()}`],
          correctAnswer: val.toLocaleString(),
          options: options,
          explanation: `The digit ${digit} is located at the ${multiplier.toLocaleString()}s place. Therefore, its total value is ${digit} × ${multiplier.toLocaleString()} = ${val.toLocaleString()}.`
        };
      } else if (mode === 2) {
        // Which digit is in a specific place?
        const places = [
          { name: 'tens', mult: 10 },
          { name: 'hundreds', mult: 100 },
          { name: 'thousands', mult: 1000 },
          { name: 'ten thousands', mult: 10000 }
        ];
        const chosen = places[Math.floor(Math.random() * places.length)];
        const num = Math.floor(Math.random() * 89000) + 10000;
        const strNum = String(num);
        const reversedDigits = strNum.split('').reverse();
        const placeIndex = Math.log10(chosen.mult);
        const correctDigit = reversedDigits[placeIndex];

        const otherDigits = Array.from(new Set(strNum.split('').filter(d => d !== correctDigit)));
        while (otherDigits.length < 3) {
          const r = String(Math.floor(Math.random() * 10));
          if (!otherDigits.includes(r) && r !== correctDigit) otherDigits.push(r);
        }
        const options = shuffle([correctDigit, ...otherDigits.slice(0, 3)]);

        return {
          type: 'multiple_choice',
          prompt: `Which digit is in the ${chosen.name} place in ${num.toLocaleString()}?`,
          visuals: [`🔢 ${num.toLocaleString()}`],
          correctAnswer: correctDigit,
          options: options,
          explanation: `Reading from right to left (ones, tens, hundreds, thousands...), the digit in the ${chosen.name} place is ${correctDigit}.`
        };
      } else if (mode === 3) {
        // Expanded form conversion
        const th = Math.floor(Math.random() * 8) + 1;
        const h = Math.floor(Math.random() * 8) + 1;
        const t = Math.floor(Math.random() * 8) + 1;
        const o = Math.floor(Math.random() * 8) + 1;
        const total = th * 1000 + h * 100 + t * 10 + o;
        const expanded = `${(th*1000).toLocaleString()} + ${(h*100).toLocaleString()} + ${t*10} + ${o}`;

        const options = generateFormattedNumericChoices(total, 4, 10);

        return {
          type: 'multiple_choice',
          prompt: `What standard number is represented by this expanded form?\n${expanded}`,
          visuals: [`🧩 Expanded Form`],
          correctAnswer: total.toLocaleString(),
          options: options,
          explanation: `Adding each place value part gives: ${th * 1000} + ${h * 100} + ${t * 10} + ${o} = ${total.toLocaleString()}.`
        };
      } else {
        // Base-10 Model representation
        const th = Math.floor(Math.random() * 5) + 1;
        const h = Math.floor(Math.random() * 6) + 1;
        const t = Math.floor(Math.random() * 8) + 1;
        const total = th * 1000 + h * 100 + t * 10;

        const options = generateFormattedNumericChoices(total, 4, 100);

        return {
          type: 'multiple_choice',
          prompt: `A place value model contains ${th} thousands cubes, ${h} hundreds flats, and ${t} tens rods. What number is shown?`,
          visuals: [`🧱 ${th} Thousands`, `🟦 ${h} Hundreds`, `🟩 ${t} Tens`],
          correctAnswer: total.toLocaleString(),
          options: options,
          explanation: `(${th} × 1,000) + (${h} × 100) + (${t} × 10) = ${th * 1000} + ${h * 100} + ${t * 10} = ${total.toLocaleString()}.`
        };
      }
    }

    // -------------------------------------------------------------------------
    // 2. Rounding & Estimation
    // -------------------------------------------------------------------------
    if (name.includes('round') || name.includes('estimate') || name.includes('estimation')) {
      const nearest = [10, 100, 1000][Math.floor(Math.random() * 3)];
      const num = Math.floor(Math.random() * 8900) + 1050;
      const rounded = Math.round(num / nearest) * nearest;
      const unitLabel = nearest === 10 ? 'ten' : (nearest === 100 ? 'hundred' : 'thousand');

      const options = shuffle([
        rounded.toLocaleString(),
        (rounded + nearest).toLocaleString(),
        (rounded - nearest).toLocaleString(),
        (Math.round(num / (nearest * 10)) * (nearest * 10)).toLocaleString()
      ]);

      return {
        type: 'multiple_choice',
        prompt: `Round the number ${num.toLocaleString()} to the nearest ${unitLabel}:`,
        visuals: [`🎯 Round to nearest ${unitLabel}`],
        correctAnswer: rounded.toLocaleString(),
        options: options,
        explanation: `To round to the nearest ${unitLabel}, examine the digit to the right of the ${unitLabel}s place. Since rounding rules apply (5 or greater rounds up), ${num.toLocaleString()} rounds to ${rounded.toLocaleString()}.`
      };
    }

    // -------------------------------------------------------------------------
    // 3. Multiplication & Times Tables
    // -------------------------------------------------------------------------
    if (name.includes('multipli') || name.includes('table') || name.includes('product') || name.includes('times')) {
      const a = Math.floor(Math.random() * 11) + 2;
      const b = Math.floor(Math.random() * 12) + 2;
      const ans = a * b;

      return {
        type: 'multiple_choice',
        prompt: `Calculate the product:
${a} × ${b} = ?`,
        visuals: [`✖️ ${a} × ${b}`],
        correctAnswer: String(ans),
        options: generateNumericChoices(ans, 4, 2),
        explanation: `${a} groups of ${b} equals ${ans}.`
      };
    }

    // -------------------------------------------------------------------------
    // 4. Division & Quotients
    // -------------------------------------------------------------------------
    if (name.includes('division') || name.includes('divide') || name.includes('quotient')) {
      const divisor = Math.floor(Math.random() * 9) + 2;
      const quotient = Math.floor(Math.random() * 12) + 3;
      const dividend = divisor * quotient;

      return {
        type: 'multiple_choice',
        prompt: `Calculate the quotient:
${dividend} ÷ ${divisor} = ?`,
        visuals: [`➗ ${dividend} ÷ ${divisor}`],
        correctAnswer: String(quotient),
        options: generateNumericChoices(quotient, 4, 1),
        explanation: `${dividend} divided into ${divisor} equal parts gives ${quotient}.`
      };
    }

    // -------------------------------------------------------------------------
    // 5. Addition & Subtraction
    // -------------------------------------------------------------------------
    if (name.includes('add') || name.includes('addition') || name.includes('sum')) {
      const a = Math.floor(Math.random() * 450) + 75;
      const b = Math.floor(Math.random() * 450) + 65;
      const ans = a + b;

      return {
        type: 'multiple_choice',
        prompt: `Calculate the sum:
${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        visuals: [`➕ ${a.toLocaleString()} + ${b.toLocaleString()}`],
        correctAnswer: ans.toLocaleString(),
        options: shuffle([
          ans.toLocaleString(),
          (ans + 10).toLocaleString(),
          (ans - 10).toLocaleString(),
          (ans + 100).toLocaleString()
        ]),
        explanation: `Aligning by place value and adding: ${a.toLocaleString()} + ${b.toLocaleString()} = ${ans.toLocaleString()}.`
      };
    }

    if (name.includes('subtract') || name.includes('subtraction') || name.includes('difference')) {
      const a = Math.floor(Math.random() * 500) + 400;
      const b = Math.floor(Math.random() * 300) + 50;
      const ans = a - b;

      return {
        type: 'multiple_choice',
        prompt: `Calculate the difference:
${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
        visuals: [`➖ ${a.toLocaleString()} - ${b.toLocaleString()}`],
        correctAnswer: ans.toLocaleString(),
        options: shuffle([
          ans.toLocaleString(),
          (ans + 10).toLocaleString(),
          (ans - 10).toLocaleString(),
          (ans + 20).toLocaleString()
        ]),
        explanation: `Subtracting ${b.toLocaleString()} from ${a.toLocaleString()} leaves ${ans.toLocaleString()}.`
      };
    }

    // -------------------------------------------------------------------------
    // 6. Fractions & Decimals
    // -------------------------------------------------------------------------
    if (name.includes('fraction') || name.includes('decimal') || name.includes('percentage') || name.includes('percent')) {
      const fractionPairs = [
        { f: '1/2', d: '0.5', p: '50%' },
        { f: '1/4', d: '0.25', p: '25%' },
        { f: '3/4', d: '0.75', p: '75%' },
        { f: '1/5', d: '0.2', p: '20%' },
        { f: '2/5', d: '0.4', p: '40%' },
        { f: '3/5', d: '0.6', p: '60%' },
        { f: '1/10', d: '0.1', p: '10%' },
        { f: '7/10', d: '0.7', p: '70%' }
      ];
      const item = fractionPairs[Math.floor(Math.random() * fractionPairs.length)];
      const isToDec = Math.random() > 0.5;

      if (isToDec) {
        const distractors = fractionPairs.filter(x => x.d !== item.d).map(x => x.d);
        return {
          type: 'multiple_choice',
          prompt: `Convert the fraction ${item.f} to an equivalent decimal:`,
          visuals: [`½ Fraction: ${item.f}`],
          correctAnswer: item.d,
          options: shuffle([item.d, ...shuffle(distractors).slice(0, 3)]),
          explanation: `Dividing numerator 1 by denominator gives ${item.d} (${item.p}).`
        };
      } else {
        const distractors = fractionPairs.filter(x => x.f !== item.f).map(x => x.f);
        return {
          type: 'multiple_choice',
          prompt: `Which fraction is equivalent to the decimal ${item.d}?`,
          visuals: [`🔢 Decimal: ${item.d}`],
          correctAnswer: item.f,
          options: shuffle([item.f, ...shuffle(distractors).slice(0, 3)]),
          explanation: `${item.d} represents ${item.p}, which simplifies to ${item.f}.`
        };
      }
    }

    // -------------------------------------------------------------------------
    // 7. Geometry, Shapes, Perimeter & Area
    // -------------------------------------------------------------------------
    if (name.includes('shape') || name.includes('geometry') || name.includes('angle') ||
        name.includes('perimeter') || name.includes('area') || name.includes('polygon')) {
      const geoQuestions = [
        {
          prompt: 'How many sides and vertices does a regular hexagon have?',
          vis: '⬡ Hexagon',
          ans: '6 sides and 6 vertices',
          dist: ['5 sides and 5 vertices', '8 sides and 8 vertices', '7 sides and 7 vertices'],
          exp: 'A hexagon is a polygon with exactly 6 straight sides and 6 vertices.'
        },
        {
          prompt: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
          vis: '▭ Rectangle: 8 cm × 5 cm',
          ans: '26 cm',
          dist: ['40 cm', '13 cm', '24 cm'],
          exp: 'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm.'
        },
        {
          prompt: 'What is the area of a square with a side length of 7 cm?',
          vis: '◻ Square: Side = 7 cm',
          ans: '49 cm²',
          dist: ['28 cm²', '14 cm²', '42 cm²'],
          exp: 'Area of a square = side × side = 7 × 7 = 49 cm².'
        },
        {
          prompt: 'An angle measuring exactly 90 degrees is called a:',
          vis: '📐 Angle: 90°',
          ans: 'Right angle',
          dist: ['Acute angle', 'Obtuse angle', 'Straight angle'],
          exp: 'An angle that measures exactly 90° forms a square corner and is called a right angle.'
        },
        {
          prompt: 'An angle that measures less than 90 degrees is known as an:',
          vis: '📐 Angle < 90°',
          ans: 'Acute angle',
          dist: ['Obtuse angle', 'Right angle', 'Reflex angle'],
          exp: 'Angles between 0° and 90° are acute angles.'
        }
      ];
      const g = geoQuestions[Math.floor(Math.random() * geoQuestions.length)];
      return {
        type: 'multiple_choice',
        prompt: g.prompt,
        visuals: [g.vis],
        correctAnswer: g.ans,
        options: shuffle([g.ans, ...g.dist]),
        explanation: g.exp
      };
    }

    // -------------------------------------------------------------------------
    // 8. General Math / Prime Numbers Fallback
    // -------------------------------------------------------------------------
    const primeCheck = Math.random() > 0.5;
    if (primeCheck) {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
      const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 50];
      const chosenPrime = primes[Math.floor(Math.random() * primes.length)];
      const compSample = shuffle(composites).slice(0, 3);

      return {
        type: 'multiple_choice',
        prompt: 'Which of the following numbers is a Prime Number?',
        visuals: [`🔢 Prime Number Challenge`],
        correctAnswer: String(chosenPrime),
        options: shuffle([String(chosenPrime), ...compSample.map(String)]),
        explanation: `${chosenPrime} is a prime number because its only positive divisors are 1 and ${chosenPrime}.`
      };
    } else {
      const a = Math.floor(Math.random() * 25) + 5;
      const b = Math.floor(Math.random() * 25) + 5;
      const ans = a * b;
      return {
        type: 'multiple_choice',
        prompt: `Solve the equation:
${a} × ${b} = ?`,
        visuals: [`✖️ ${a} × ${b}`],
        correctAnswer: String(ans),
        options: generateNumericChoices(ans, 4, 10),
        explanation: `Multiplying ${a} by ${b} equals ${ans}.`
      };
    }
  } else if (subj === 'English') {
    // -------------------------------------------------------------------------
    // English Language Curriculum Questions
    // -------------------------------------------------------------------------
    const englishQuestions = [
      {
        prompt: 'Identify the part of speech of the underlined word in the sentence below:\\n"The clever detective quickly solved the mystery."',
        word: 'quickly',
        ans: 'Adverb',
        dist: ['Adjective', 'Verb', 'Noun'],
        exp: '"Quickly" describes how the action (solved) was performed, making it an adverb.'
      },
      {
        prompt: 'Identify the part of speech of the underlined word in the sentence below:\\n"The majestic eagle soared above the rocky mountain peaks."',
        word: 'majestic',
        ans: 'Adjective',
        dist: ['Noun', 'Verb', 'Preposition'],
        exp: '"Majestic" describes the noun "eagle", so it is an adjective.'
      },
      {
        prompt: 'Which word in this sentence is a preposition?\n"The cat curled comfortably under the warm blanket."',
        word: 'under',
        ans: 'under',
        dist: ['curled', 'warm', 'blanket'],
        exp: '"Under" is a preposition indicating location/position.'
      },
      {
        prompt: 'Select the correct plural spelling of the word "cactus":',
        word: 'cactus',
        ans: 'Cacti',
        dist: ['Cactuses', 'Cacties', 'Cactose'],
        exp: 'The classical plural form of "cactus" is "cacti".'
      },
      {
        prompt: 'Which sentence demonstrates correct punctuation?',
        word: 'Punctuation',
        ans: 'Although it was raining, the children played soccer outdoors.',
        dist: [
          'Although it was raining the children played, soccer outdoors.',
          'Although, it was raining the children played soccer outdoors.',
          'Although it was raining the children played soccer outdoors'
        ],
        exp: 'A dependent clause introducing a sentence must be followed by a comma.'
      },
      {
        prompt: 'Choose the word that is a synonym for "abundant":',
        word: 'abundant',
        ans: 'Plentiful',
        dist: ['Scarce', 'Empty', 'Fragile'],
        exp: '"Abundant" and "plentiful" both mean existing or available in large quantities.'
      }
    ];

    const q = englishQuestions[Math.floor(Math.random() * englishQuestions.length)];
    return {
      type: 'multiple_choice',
      prompt: q.prompt,
      visuals: [`📖 ${q.word}`],
      correctAnswer: q.ans,
      options: shuffle([q.ans, ...q.dist]),
      explanation: q.exp
    };
  } else {
    // -------------------------------------------------------------------------
    // Science Curriculum Questions
    // -------------------------------------------------------------------------
    const scienceQuestions = [
      {
        prompt: 'Which gas do green plants absorb from the atmosphere during photosynthesis?',
        vis: '🌿 Photosynthesis',
        ans: 'Carbon dioxide',
        dist: ['Oxygen', 'Nitrogen', 'Helium'],
        exp: 'Plants take in carbon dioxide and water to produce glucose and oxygen using light energy.'
      },
      {
        prompt: 'What is the green pigment in plant cells that captures light energy?',
        vis: '🔬 Cell Biology',
        ans: 'Chlorophyll',
        dist: ['Hemoglobin', 'Cellulose', 'Carotene'],
        exp: 'Chlorophyll is located in chloroplasts and absorbs light waves for photosynthesis.'
      },
      {
        prompt: 'What force resists motion when two physical surfaces slide past each other?',
        vis: '⚙️ Physics & Mechanics',
        ans: 'Friction',
        dist: ['Gravity', 'Magnetism', 'Buoyancy'],
        exp: 'Friction is the resistive contact force that opposes relative movement between surfaces.'
      },
      {
        prompt: 'Which planet in our Solar System is closest to the Sun?',
        vis: '🪐 Solar System',
        ans: 'Mercury',
        dist: ['Venus', 'Mars', 'Earth'],
        exp: 'Mercury is the innermost and smallest planet in the solar system, orbiting nearest the Sun.'
      },
      {
        prompt: 'At what temperature does pure water freeze at standard sea-level pressure?',
        vis: '🌡️ States of Matter',
        ans: '0°C (32°F)',
        dist: ['100°C (212°F)', '-10°C (14°F)', '10°C (50°F)'],
        exp: 'Water transitions from liquid to solid ice at 0 degrees Celsius.'
      },
      {
        prompt: 'Which organ in the human circulatory system pumps oxygen-rich blood throughout the body?',
        vis: '❤️ Human Biology',
        ans: 'Heart',
        dist: ['Lungs', 'Liver', 'Kidneys'],
        exp: 'The heart is a muscular organ that pumps blood through blood vessels of the circulatory system.'
      }
    ];

    const s = scienceQuestions[Math.floor(Math.random() * scienceQuestions.length)];
    return {
      type: 'multiple_choice',
      prompt: s.prompt,
      visuals: [s.vis],
      correctAnswer: s.ans,
      options: shuffle([s.ans, ...s.dist]),
      explanation: s.exp
    };
  }
}

// =============================================================================
// Authentication & Multi-Student Controller
// =============================================================================


// =============================================================================
// Global Authentication Gate & Session Functions
// =============================================================================

window.logoutUser = function() {
  AppState.currentUser = null;
  localStorage.removeItem('current_student');
  localStorage.removeItem('rc_auth_token');
  document.body.classList.add('auth-locked');
  showToast('Signed out successfully 👋');
  updateStudentHeader();
  openAuthModal(true);
};

async function openAuthModal(isMandatory = false) {
  if (!el.authModal) return;
  el.authModal.classList.add('open');
  if (el.loginErrorMsg) el.loginErrorMsg.style.display = 'none';
  if (el.regErrorMsg) el.regErrorMsg.style.display = 'none';

  const closeBtn = document.getElementById('closeAuthModalBtn');
  if (closeBtn) {
    closeBtn.style.display = (isMandatory || !AppState.currentUser) ? 'none' : 'block';
  }

  // Switch to login tab by default
  const loginTab = document.querySelector('[data-auth-tab="login"]');
  if (loginTab) loginTab.click();

  setTimeout(() => {
    const uInput = document.getElementById('loginUsername');
    if (uInput) uInput.focus();
  }, 200);
}

function setCurrentStudent(student) {
  AppState.currentUser = student;
  AppState.viewingReportStudentId = null;
  localStorage.setItem('current_student', JSON.stringify(student));
  updateStudentHeader();

  const isTeacher = student.role === 'teacher' || student.username === 'admin' || student.username === 'rania';
  if (isTeacher) {
    switchView('teacher');
  } else {
    if (AppState.currentView === 'teacher') switchView('dashboard');
    else if (AppState.currentView === 'dashboard') renderDashboard();
    else if (AppState.currentView === 'reports') renderStudentReportView();
  }
}

// =============================================================================
// Event Listeners & Helpers
// =============================================================================

// =============================================================================
// Assignments & Homework Controller
// =============================================================================

async function renderDashboardAssignments() {
  if (!el.dashAssignmentsGrid) return;
  const user = AppState.currentUser;
  if (!user) return;

  try {
    const list = await DB.getAssignments(user.id);
    if (el.dashAssignmentBadge) {
      el.dashAssignmentBadge.textContent = `${list.length} Active Tasks`;
    }

    el.dashAssignmentsGrid.innerHTML = list.map(a => {
      const isDone = a.is_completed === 1;
      const statusClass = isDone ? 'completed' : 'pending';
      const statusText = isDone ? 'Completed ✓' : `Due: ${a.due_date}`;

      return `
        <div class="assignment-card ${statusClass}">
          <div class="assign-card-top">
            <span class="assign-skill-code">${a.skill_code} &bull; ${a.subject}</span>
            <span class="assign-due-badge ${statusClass}">${statusText}</span>
          </div>
          <div class="assign-skill-title">${a.skill_name}</div>
          <div class="assign-instructions">${a.instructions || 'Practice to reach SmartScore 80.'}</div>
          <div class="assign-card-footer">
            <span style="font-size:0.75rem; color:var(--text-muted);">${a.grade}</span>
            <button type="button" class="${isDone ? 'secondary-glass-btn' : 'primary-glow-btn'}" onclick="launchPracticeForSkill('${a.skill_code}')" style="padding:0.4rem 0.9rem; font-size:0.8rem;">
              ${isDone ? 'Review Again' : 'Start Task 🚀'}
            </button>
          </div>
        </div>
      `;
    }).join('') || '<div style="color:var(--text-muted); padding:1rem;">No assignments currently assigned by Miss Rania.</div>';
  } catch (err) {
    console.error('Error loading student assignments:', err);
  }
}

async function renderTeacherAssignments() {
  if (!el.teacherAssignmentsGrid) return;

  try {
    const list = await DB.getAssignments();
    el.teacherAssignmentsGrid.innerHTML = list.map(a => {
      const completions = a.completions_count || 0;
      const total = a.total_students || 4;
      const pct = Math.round((completions / total) * 100);

      return `
        <div class="teacher-assign-card">
          <div class="assign-card-top">
            <span class="assign-skill-code">${a.skill_code} &bull; ${a.subject} (${a.grade})</span>
            <button type="button" class="action-btn-sm" onclick="deleteClassAssignment(${a.id})" style="color:#ff453a;" title="Delete Assignment">🗑️</button>
          </div>
          <div class="assign-skill-title">${a.skill_name}</div>
          <div class="assign-instructions">${a.instructions || 'Class assignment'}</div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; color:var(--text-secondary);">
              <span>Student Completion: ${completions} / ${total}</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-track-bg">
              <div class="progress-track-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Due: <strong>${a.due_date}</strong></div>
        </div>
      `;
    }).join('') || '<div style="color:var(--text-muted); padding:1rem;">No active class assignments. Click Create New Assignment above!</div>';
  } catch (err) {
    console.error('Error loading teacher assignments:', err);
  }
}

async function exportClassroomCsv() {
  const token = localStorage.getItem('rc_auth_token') || localStorage.getItem('ixl_auth_token') || '';
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch('/api/teacher/export_csv', { headers });
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rania_Classroom_Roster.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast('Grade roster CSV downloaded! 📥');
    } else {
      showToast('Please log in with teacher account to export data.');
    }
  } catch (err) {
    showToast('Export failed: ' + err.message);
  }
}


window.deleteClassAssignment = async function(id) {
  if (!confirm('Are you sure you want to remove this assignment?')) return;
  await DB.deleteAssignment(id);
  showToast('Assignment removed.');
  renderTeacherAssignments();
};

window.openEditStudentModal = function(studentId) {
  if (!el.editStudentModal) return;
  const numId = Number(studentId);
  const roster = AppState.currentTeacherRoster || [];
  const s = roster.find(st => st.id === numId) || DB.findStudentById(numId);
  if (!s) {
    showToast('Student information not found.');
    return;
  }

  if (el.editStudentId) el.editStudentId.value = s.id;
  if (el.editStudentName) el.editStudentName.value = s.full_name || '';
  if (el.editStudentUser) el.editStudentUser.value = s.username || '';
  if (el.editStudentGrade) el.editStudentGrade.value = s.grade_level || 'Year 4';
  if (el.editStudentAvatar) el.editStudentAvatar.value = s.avatar || '🦊';
  if (el.editStudentPass) el.editStudentPass.value = '';
  if (el.editStudentSubtitle) {
    el.editStudentSubtitle.textContent = `Update name, username, grade or password for ${s.full_name} (@${s.username})`;
  }
  el.editStudentModal.classList.add('open');
};

window.openResetPasswordModal = function(studentId, studentName) {
  if (!el.resetPasswordModal) return;
  const numId = Number(studentId);
  const roster = AppState.currentTeacherRoster || [];
  const s = roster.find(st => st.id === numId) || DB.findStudentById(numId);
  el.resetStudentId.value = studentId;
  el.resetStudentSubtitle.textContent = `Set a new password for ${studentName}.`;
  el.newResetPassword.value = (s && s.password) ? s.password : 'StudentPass123!';
  el.resetPasswordModal.classList.add('open');
};

window.confirmDeleteStudent = async function(studentId, studentName) {
  if (!confirm(`Are you sure you want to remove ${studentName} and all associated records?`)) return;
  const res = await DB.teacherDeleteStudent(studentId);
  if (res && res.success === false && res.error) {
    showToast(res.error);
    return;
  }
  showToast(`${studentName} removed from classroom roster 🗑️`);
  await renderTeacherConsoleView();
};



// =============================================================================
// Dynamic Sidebar & Navigation Controller (100% Zoom & Responsive Track)
// =============================================================================

function setupSidebarToggle() {
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const backdrop = document.getElementById('sidebarBackdrop');
  const sidebar = document.getElementById('portalSidebar');

  // Restore saved desktop collapsed state or URL parameter
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('collapsed') === '1') {
      document.body.classList.add('sidebar-collapsed');
    } else if (urlParams.get('drawer') === '1') {
      document.body.classList.add('sidebar-mobile-open');
    } else {
      const savedCollapsed = localStorage.getItem('rc_sidebar_collapsed');
      if (savedCollapsed === 'true' && window.innerWidth >= 1024) {
        document.body.classList.add('sidebar-collapsed');
      }
    }
  } catch (e) {}

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth < 1024) {
        // Mobile off-canvas toggle
        document.body.classList.toggle('sidebar-mobile-open');
      } else {
        // Desktop collapse/expand toggle
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        try {
          localStorage.setItem('rc_sidebar_collapsed', isCollapsed);
        } catch (e) {}
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      document.body.classList.remove('sidebar-mobile-open');
    });
  }

  // Close mobile sidebar on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('sidebar-mobile-open')) {
      document.body.classList.remove('sidebar-mobile-open');
    }
  });

  // Auto close mobile sidebar when any nav item is clicked
  if (sidebar) {
    sidebar.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          document.body.classList.remove('sidebar-mobile-open');
        }
      });
    });
  }
}


function setupEventListeners() {
  // Sidebar Teacher Tab click
  const sidebarTeacherTabBtn = document.getElementById('sidebarTeacherTabBtn');
  if (sidebarTeacherTabBtn) {
    sidebarTeacherTabBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const user = AppState.currentUser;
      const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');
      if (isTeacher) {
        switchView('teacher');
      }
    });
  }
  setupSidebarToggle();
  // Navigation Tabs (Both Top Bar & Left Sidebar)
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const v = tab.dataset.view;
      if (v) switchView(v);
    });
  });

  const topSearchBtn = document.getElementById('topSearchIconBtn');
  if (topSearchBtn) {
    topSearchBtn.addEventListener('click', () => {
      switchView('skills');
      setTimeout(() => {
        if (el.skillsSearchInput) {
          el.skillsSearchInput.focus();
          el.skillsSearchInput.select();
        }
      }, 100);
    });
  }

  // Global Ctrl+K / Cmd+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      switchView('skills');
      setTimeout(() => {
        if (el.skillsSearchInput) {
          el.skillsSearchInput.focus();
          el.skillsSearchInput.select();
        }
      }, 100);
    }
  });

  // Dynamic resize handler for sliding pill indicator
  window.addEventListener('resize', () => {
    updateNavIndicator();
  });

  // Initialize smart auto-hide & auto-show navbar on scroll
  initSmartNavbarScroll();

  if (el.brandHomeBtn) {
    el.brandHomeBtn.addEventListener('click', () => switchView('dashboard'));
  }

  if (el.studentProfilePill) {
    // el.studentProfilePill now handled by setupFastAccountSwitcher
  }

  if (el.switchStudentBtn) {
    // el.switchStudentBtn now handled by setupFastAccountSwitcher
  }

  if (el.closeAuthModalBtn) {
    el.closeAuthModalBtn.addEventListener('click', () => {
      if (AppState.currentUser) {
        el.authModal.classList.remove('open');
      } else {
        showToast('Please sign in first to continue 🔒');
      }
    });
  }

  // Auth Tabs (if any tab exists)
  if (el.authTabs && el.authTabs.length) {
    el.authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.authTabs.forEach(t => t.classList.remove('active'));
        el.authTabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.dataset.authTab;
        const targetEl = document.getElementById(`authTab${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  }

  // Login Form (Unified Authentication for Students and Teacher/Admin)
  if (el.loginForm) {
    el.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = el.loginUsername.value.trim();
      const p = el.loginPassword.value;
      try {
        const student = await DB.login(u, p);
        document.body.classList.remove('auth-locked');
        setCurrentStudent(student);
        el.authModal.classList.remove('open');
        await loadAndRenderPortal();
        const isTeacher = student.role === 'teacher' || student.username === 'admin' || student.username === 'rania';
        if (isTeacher) {
          showToast('Welcome Teacher (Admin Console) 👩‍🏫');
        } else {
          showToast(`Welcome back, ${student.full_name}! 👋`);
        }
      } catch (err) {
        el.loginErrorMsg.textContent = err.message || 'Invalid username or password';
        el.loginErrorMsg.style.display = 'block';
      }
    });
  }

  // Backdrop click on AuthModal (Prevent closing when unauthenticated)
  if (el.authModal) {
    el.authModal.addEventListener('click', (e) => {
      if (e.target === el.authModal) {
        if (AppState.currentUser) {
          el.authModal.classList.remove('open');
        } else {
          showToast('Please sign in to access the classroom portal 🔒');
        }
      }
    });
  }

  // Avatar Picker
  if (el.avatarPicker) {
    el.avatarPicker.querySelectorAll('.avatar-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.avatarPicker.querySelectorAll('.avatar-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  // Register Form
  if (el.registerForm) {
    el.registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = el.regFullName.value.trim();
      const u = el.regUsername.value.trim();
      const p = el.regPassword.value;
      const grade = el.regGrade.value;
      const selectedAvatar = el.avatarPicker.querySelector('.avatar-option-btn.selected');
      const avatar = selectedAvatar ? selectedAvatar.dataset.avatar : '🦊';

      try {
        const student = await DB.register(name, u, p, grade, avatar);
        document.body.classList.remove('auth-locked');
        setCurrentStudent(student);
        el.authModal.classList.remove('open');
        await loadAndRenderPortal();
        showToast(`Account created! Welcome, ${student.full_name}! 🎉`);
      } catch (err) {
        el.regErrorMsg.textContent = err.message || 'Registration failed';
        el.regErrorMsg.style.display = 'block';
      }
    });
  }

  // Teacher Console & Export Events
  if (el.exportClassroomCsvBtn) {
    el.exportClassroomCsvBtn.addEventListener('click', exportClassroomCsv);
  }

  // Interactive Practice Tools Listeners
  if (el.practiceAudioBtn) {
    el.practiceAudioBtn.addEventListener('click', () => {
      if (window.SpeechAudio) window.SpeechAudio.toggleCurrentQuestion();
    });
  }

  if (el.practiceScratchpadBtn) {
    el.practiceScratchpadBtn.addEventListener('click', () => {
      if (window.Scratchpad) window.Scratchpad.toggle();
    });
  }


  if (el.practiceSoundFxBtn) {
    el.practiceSoundFxBtn.addEventListener('click', () => {
      const en = SoundFX.toggle();
      if (el.soundFxIcon) el.soundFxIcon.textContent = en ? '🔔' : '🔕';
      showToast(en ? 'Sound Effects Enabled 🔔' : 'Sound Effects Muted 🔕');
    });
  }

  if (el.practiceFillInSubmitBtn) {
    el.practiceFillInSubmitBtn.addEventListener('click', submitAnswer);
  }

  if (el.practiceFillInInput) {
    el.practiceFillInInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitAnswer();
    });
  }

  // Teacher Assignment Modal
  if (el.openCreateAssignmentModalBtn) {
    el.openCreateAssignmentModalBtn.addEventListener('click', () => {
      if (el.createAssignmentModal) {
        el.assignDueDate.value = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10);
        el.createAssignmentModal.classList.add('open');
      }
    });
  }

  if (el.closeCreateAssignmentModalBtn) {
    el.closeCreateAssignmentModalBtn.addEventListener('click', () => {
      el.createAssignmentModal?.classList.remove('open');
    });
  }

  if (el.createAssignmentForm) {
    el.createAssignmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = el.assignSkillSearch.value.trim().toUpperCase();
      const title = el.assignSkillTitle.value.trim();
      const subj = el.assignSubject.value;
      const grade = el.assignGrade.value;
      const due = el.assignDueDate.value;
      const notes = el.assignInstructions.value.trim();

      await DB.createAssignment({
        teacher_id: AppState.currentUser.id || 1,
        skill_code: code,
        skill_name: title,
        subject: subj,
        grade: grade,
        due_date: due,
        instructions: notes
      });

      el.createAssignmentModal.classList.remove('open');
      showToast('Assignment published to classroom! 📌');
      renderTeacherAssignments();
    });
  }

  // Teacher Add Student Modal
  if (el.openAddStudentModalBtn) {
    el.openAddStudentModalBtn.addEventListener('click', () => {
      el.addStudentModal?.classList.add('open');
    });
  }

  if (el.closeAddStudentModalBtn) {
    el.closeAddStudentModalBtn.addEventListener('click', () => {
      el.addStudentModal?.classList.remove('open');
    });
  }

  if (el.addStudentForm) {
    el.addStudentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = el.tNewStudentName.value.trim();
      const user = el.tNewStudentUser.value.trim();
      const pass = el.tNewStudentPass.value;
      const grade = el.tNewStudentGrade.value;
      const avatar = el.tNewStudentAvatar.value;

      const res = await DB.teacherCreateStudent({
        full_name: name,
        username: user,
        password: pass,
        grade_level: grade,
        avatar: avatar
      });

      if (res.success) {
        el.addStudentForm.reset();
        if (el.tNewStudentPass) el.tNewStudentPass.value = 'password123';
        el.addStudentModal.classList.remove('open');
        showToast(`Student ${name} registered successfully! 👤`);
        renderTeacherConsoleView();
      } else {
        showToast(res.error || 'Failed to add student');
      }
    });
  }

  // Teacher Edit Student Modal
  if (el.closeEditStudentModalBtn) {
    el.closeEditStudentModalBtn.addEventListener('click', () => {
      el.editStudentModal?.classList.remove('open');
    });
  }

  if (el.editStudentModal) {
    el.editStudentModal.addEventListener('click', (e) => {
      if (e.target === el.editStudentModal) {
        el.editStudentModal.classList.remove('open');
      }
    });
  }

  if (el.editStudentForm) {
    el.editStudentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sid = el.editStudentId.value;
      const name = el.editStudentName.value.trim();
      const user = el.editStudentUser.value.trim();
      const grade = el.editStudentGrade.value;
      const avatar = el.editStudentAvatar.value;
      const pass = el.editStudentPass.value.trim();

      if (!name || !user) {
        showToast('Please enter both name and username');
        return;
      }

      const res = await DB.teacherUpdateStudent({
        student_id: sid,
        full_name: name,
        username: user,
        grade_level: grade,
        avatar: avatar,
        password: pass
      });

      if (res && res.success) {
        el.editStudentModal?.classList.remove('open');
        showToast(`Student ${name} updated successfully! ✨`);
        await renderTeacherConsoleView();
      } else {
        showToast((res && res.error) || 'Failed to update student profile');
      }
    });
  }

  // Teacher Reset Password Modal
  if (el.closeResetPasswordModalBtn) {
    el.closeResetPasswordModalBtn.addEventListener('click', () => {
      el.resetPasswordModal?.classList.remove('open');
    });
  }

  if (el.resetPasswordModal) {
    el.resetPasswordModal.addEventListener('click', (e) => {
      if (e.target === el.resetPasswordModal) {
        el.resetPasswordModal.classList.remove('open');
      }
    });
  }

  if (el.resetPasswordForm) {
    el.resetPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sid = el.resetStudentId.value;
      const pass = el.newResetPassword.value.trim();
      if (!pass) return;
      await DB.teacherResetPassword(sid, pass);
      el.resetPasswordModal?.classList.remove('open');
      showToast('Password updated successfully! 🔑');
      await renderTeacherConsoleView();
    });
  }

  // Initialize Scratchpad & Confetti & Tools & Sync
  if (window.Scratchpad) window.Scratchpad.init();
  ConfettiFX.init();
  if (window.SyncManager) window.SyncManager.init();
  if (window.ClassroomTools) window.ClassroomTools.init();
  if (window.I18N) window.I18N.apply();



  // Dashboard CTAs
  if (el.dashStartPracticeBtn) {
    el.dashStartPracticeBtn.addEventListener('click', () => switchView('tracks'));
  }
  if (el.dashViewReportBtn) {
    el.dashViewReportBtn.addEventListener('click', () => switchView('reports'));
  }
  if (el.dashViewAllTracksBtn) {
    el.dashViewAllTracksBtn.addEventListener('click', () => switchView('tracks'));
  }

  // Dashboard search input
  if (el.dashSpotlightInput) {
    el.dashSpotlightInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && el.dashSpotlightInput.value.trim()) {
        AppState.searchQuery = el.dashSpotlightInput.value.trim();
        switchView('skills');
        el.skillsSearchInput.value = AppState.searchQuery;
        el.skillsClearSearch.style.display = 'inline-flex';
        renderSkillsCanvas();
      }
    });
  }

  // Theme Toggle
  if (el.themeToggleBtn) {
    el.themeToggleBtn.addEventListener('click', () => {
      const nextTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Track Subject Filter
  if (el.trackSubjectFilter) {
    el.trackSubjectFilter.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.trackSubjectFilter.querySelectorAll('.segmented-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTracksView();
      });
    });
  }

  // Skills Subject Filter
  if (el.skillsSubjectFilter) {
    el.skillsSubjectFilter.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.skillsSubjectFilter.querySelectorAll('.segmented-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.currentSubject = btn.dataset.subject;
        renderGradesSidebar();
        renderSkillsCanvas();
      });
    });
  }

  // Status Filter
  if (el.statusFilterControl) {
    el.statusFilterControl.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.statusFilterControl.querySelectorAll('.segmented-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.statusFilter = btn.dataset.filter;
        renderSkillsCanvas();
      });
    });
  }

  // Skills Search input debounce
  if (el.skillsSearchInput) {
    let debounceTimer = null;
    el.skillsSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      el.skillsClearSearch.style.display = val ? 'inline-flex' : 'none';
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        AppState.searchQuery = val;
        renderSkillsCanvas();
      }, 100);
    });

    el.skillsClearSearch.addEventListener('click', () => {
      el.skillsSearchInput.value = '';
      el.skillsClearSearch.style.display = 'none';
      AppState.searchQuery = '';
      renderSkillsCanvas();
      el.skillsSearchInput.focus();
    });
  }

  // Expand / Collapse All Categories
  if (el.expandCollapseAllSkillsBtn) {
    el.expandCollapseAllSkillsBtn.addEventListener('click', () => {
      const allHeaders = el.skillsCategoriesContainer.querySelectorAll('.category-header-row');
      const shouldCollapse = el.expandCollapseText.textContent.includes('Collapse');
      if (shouldCollapse) {
        allHeaders.forEach(h => AppState.collapsedCategories.add(h.dataset.cat));
        el.expandCollapseText.textContent = 'Expand All';
      } else {
        AppState.collapsedCategories.clear();
        el.expandCollapseText.textContent = 'Collapse All';
      }
      renderSkillsCanvas();
    });
  }

  // Print Report Button
  if (el.printReportBtn) {
    el.printReportBtn.addEventListener('click', () => window.print());
  }

  // Practice Modal Actions
  if (el.closePracticeModalBtn) {
    el.closePracticeModalBtn.addEventListener('click', closePracticeModal);
  }
  if (el.practiceSkipBtn) {
    el.practiceSkipBtn.addEventListener('click', loadNextQuestion);
  }
  if (el.practiceSubmitBtn) {
    el.practiceSubmitBtn.addEventListener('click', submitAnswer);
  }
  if (el.practiceNextBtn) {
    el.practiceNextBtn.addEventListener('click', loadNextQuestion);
  }

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (AppState.currentUser) {
        switchView('skills');
        if (el.skillsSearchInput) el.skillsSearchInput.focus();
      }
    } else if (e.key === 'Escape') {
      if (el.practiceModal && el.practiceModal.classList.contains('open')) {
        closePracticeModal();
      }
      if (el.authModal && el.authModal.classList.contains('open')) {
        // STRICT: Escape can NEVER close the auth modal if unauthenticated!
        if (AppState.currentUser) {
          el.authModal.classList.remove('open');
        } else {
          showToast('Please sign in to access the classroom portal 🔒');
        }
      }
    }
  });
}

function applyTheme(theme) {
  AppState.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.textContent = 'dark_mode';
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = 'light_mode';
  }
  localStorage.setItem('rc_theme', theme);
}

function showToast(msg, icon = '🎉') {
  el.toastIcon.textContent = icon;
  el.toastMessage.textContent = msg;
  el.portalToast.style.display = 'flex';
  setTimeout(() => {
    el.portalToast.style.display = 'none';
  }, 2600);
}

function animateNumber(element, target, duration = 1000) {
  if (!element) return;
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(start + (target - start) * ease).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateNumericChoices(correct, count = 4, minVal = 0) {
  const s = new Set([correct]);
  let tries = 0;
  while (s.size < count && tries < 40) {
    tries++;
    const delta = (Math.floor(Math.random() * 9) - 4) || 1;
    s.add(Math.max(minVal, correct + delta));
  }
  let step = 1;
  while (s.size < count) {
    s.add(correct + step++);
  }
  return shuffle(Array.from(s).sort((a, b) => a - b).map(String));
}

function generateFormattedNumericChoices(correctNum, count = 4, step = 10) {
  const s = new Set([correctNum]);
  let tries = 0;
  const deltas = [step, -step, step * 10, -step * 10, step * 2, -step * 2, 100, -100];
  while (s.size < count && tries < 40) {
    tries++;
    const d = deltas[Math.floor(Math.random() * deltas.length)];
    const val = correctNum + d;
    if (val > 0) s.add(val);
  }
  let extra = step;
  while (s.size < count) {
    s.add(correctNum + extra);
    extra += step;
  }
  return shuffle(Array.from(s).map(n => n.toLocaleString()));
}

// Kickoff
window.addEventListener('DOMContentLoaded', initPortal);
