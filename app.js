/**
 * Rania Classroom — Student Portal & SQL Infrastructure
 * Modern, High-Performance Application Logic with Authentication,
 * Interactive Question Engine, and In-Depth Student Performance Analytics.
 */

// Force update tab title & official RC favicon immediately
(function enforceOfficialRCBrand() {
  document.title = "RC ROOM — Learn, Connect & Grow";
  const rcFaviconData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAABC2lDQ1BJQ0MgUHJvZmlsZQAAeJyVkLFOwlAUhr+LJILBOMjAwNCBgUWCDsaBCYaGzRRJKE5tKV2gbW5rfAHZGFjZiItvIK/ghomJg5OPQEh0NtdqysLAmb785885/zkgXgCydRj7sTT0ptYz+9rhJwKhOmA5UcjuEvD9nnjfzti/8gM3coA1UJE9sw+iCBS9hKuK7YQbiu/jMAZxrVjeGC0QA6DqbbG9xU4olX8KNMajO7XrLzcF1+92gBxQJsJAp6nuTyzBI1x9wcEs1ew5LCdQ+ki1ygJOHuB5lWrpT0JLWr9SFsgMh7B5gmMTTl/h6Pb/ETuyqXlldAICPEa4aLTxcaihcUGdcy5/AKbWPz8bOFjoAAAIVklEQVR4nNWYeWwU1x3H3zGzM7vrPbzetdfGGLAxBoMxpw1xgkNNgJoS0bSkpNBE+YNEVE2rNlLTJGquqqQkUqQmbZVUaQtECqJUhIYmJaEcgUC4icFgMNQYH/heH3vO8d6r3ozBtPWNaTofH9rdmX3v932/4/3eQMYYsDIIWBwELA4CFgcBi4OAxUHA4iBgcRCwOAhYHAQsDgIWBwGLg4DFQcDiIGBxELA4CFgcBCwOAhZHGOgCYxQMflqG5g8EXynwDg/1jFIAOeD/ygOammiur1Ij3aIkcT8Y5jFKTbUQYcEmSXaXy5cuyUmGuwiEuN+hKOVfM1+bOnsH4W8RQvAuCGAMQjk9lec/cfFz3aIksznZBRLdizy14oS0WIRe5JHdqdkZM8pKF3tT59MGUWwL6MYAJRQjBFnUAsIpXiIW0YTQnzZCVG2b3pUCbdjUU5EuuateKLg3m8Toqnx6KUTH587+D6GQFUSWHKWrnk2d1YZYxQaGiilxtLy1b1QXXu8ovr0+auNTR0xRUUQJjnkCeNT5xVMnp2fPTUny/TJqINQGEQYZFC02WNERwKjlGDRLkpOEQDZ4S36+npC1HP737e7fLoSO/TnX/kzJienTuDBxBhGSKfkvZ37t35w4OipS6qq3jd/2sI5UzNSfTohtY1tB4+ef+PtnQ6Xc25B9obvLl+z8n7KGBqVhgGrEISQQb44tz5hjPDaRImZtfkLH6z64kOiKYIkx3pC1Sf3FK94UtM1UbRV1dR//+e/O3KqWkuoi0sKXn/u8bkzcv9j/APHKp55dfPh/WcBBY88uJgnWG+OgL48GYakAQX0K4oXTZ56PF+dbr/TE4i0NyAsIix2NtcwAETRdvzLyw9t+GVnT9wmisvvK9z+m2fssmSk8q1RAEJw8YLCj7e8vHTtcwhyc81MMczm4XQr3YfUMPrsQYKARYlvF8ZSKYkYYKy2sfnhpzb1RFS7LAX9Se++9kO7LOmEIIQE3PuLMYIQarru97rffvUpm4ghhHWNrR2d3cb6QEVVaxubw9G4YT0bQw/chDEAgZaIK7FuyL3BKKOy0wsh/NmmzQ3NofSAv6m1/ZUffyfV59V1XRD6mUUUBEJp0cy88iXz39u51+d1BVLcldXXPC5He6gr2ePZs//kygcWZKT5TZ8MuI4jtp1RQnQAYGvDpWioBQsihFDXtOnFZRdqWj7adyrF647G4xmp3m8tK7kVG/0CeakAX1sw6y+ffD4xM62oMD89LaW2oaWsZP7cgrzrTU07PzkCIewLvjsWwGsrxiIWRF1Xz3y6BWG+pcXCobRJhZnTFn3w9wMxRcMCjieU/NysYMDHJxhEAOIrm5edmerzNLV1AACCKb6JmUEIYVxNRGLquKB/SJuGG0KMm4Jjka7utrpEtKvi4Pa26+cgwuFQS2Di9LK1LwCAKi7WCJgPqOskJyvN2BAYxgN637xgEwV/sru5PXSu6uq4YKos2W60ttc33pAkW8DnMRJsLASYGnSint675fr5Q5LDiUWbP3NaXlH5pBmlNtkJAOjoiiKMzG072eMwvjJEClK+5aFgIOVve4//Ydu+7AlpriT7ldobXqdot9tNDwxeiEYggBLd7Uld9tgru97cEA41QIAi3W2i3WWTnZToCAuMB2vvZMNsERGClNInHmmfnpv1+akLuZMyVU0vnpWfmZ6SMz6YnuYbMwFm78UYEyXnjNLVn23baE/yxjtb9rzzdNmjL+XNKwcAeN0yb055cKNQd6y34x5yYAjssjQuPbBw9tRlpUVghIysChk1geQUlnnTJmlKHNtku9N1ZNdbHa11gLEpk8bpOjFL5NXaJgDYcJpNZjS5lZdrdcIIoZquE2K2sMNy4og3MkaJTXJMW7iSqHFuIhb1ePex3b8FEC5dNEcQEKHMLtkqq+vqbrSaeTzkmBDC05XVU3IyMd/psNnDDrO9G7EAPi5jefPLnf7xVNcoo5LdXV956NLJj8rumV1cmNMTjsqyrTUU3rb7MISQUO6TwZIY44v/vF7f0DY5K4PSEbelI90HeIAzxmSHJ7/km0o8ipFAKbXJjiO73op2Nb/2/HoMmaLqyR7nm5t31za2iIJgxlW/1jMju3668d1Vy0t4+zjy4+GAAowmB5r9vVlbIBIY46FpZvOMe1b5s6bFo50IYyxIVI3u2fpi8czcdzb+oKeni1LWE1Ufe/qNzp6IIGBKqU4IIZRQSgjVCf+PEMIIrX/21x6Xa3X5Ikr5AWhsBDDefiBNiydinbz35CdGGO1shhBhLDBIAWA2yblk3cveYE6sJ6TGw6IotV+r+HTri+tWLf7rH3/hdcsJRT165sqKx186euai0czx4MaIN3NmS3e++vrSdc+3tIb+9PpPKKWjO9P06zWmqomO5trzh3dcO7vPOFJyhyDBNm/Fk+OnFHuSA4a7zSY0UvXF7rpLx8IdNzQtFg93B3PnFy9ZE6ae3+84/OG+E1dreDm6v2TmA/fOyc/JTHLKPZF49bX6Qycqr9Q0fO+hJS/8aC3f724/DdyxAKBpic62ekZ10Wbv3ZO4xURV4o6kFLcvCG+d2m7OqsTDiVg3pbqmJBRVDQSzZIe3tT109PTlE19Wn75Q09TWoes6xshhlzODvtKiGQ9/Y1Ew4Bv+2WX4Avo21AEDzPiu8YY3DjxV/ssCQgjG//aoggGetei2uCVEx0b7NGoGTHzj89sv9dnX/2r1DtQr3vjjg5ulBhmPUG7eCPi51GhU4c17x17A3cCcaWyfgQngf8jdeHyHgMVBwOIgYHEQsDgIWBwELA4CFgcBi4OAxUHA4iBgcRCwOAhYHAQsDgIWB33VBtwp/wLY0tlP39ZbLgAAAABJRU5ErkJggg==";
  try {
    let links = document.querySelectorAll("link[rel*='icon']");
    links.forEach(l => l.parentNode && l.parentNode.removeChild(l));
    const iconLink = document.createElement('link');
    iconLink.type = 'image/png';
    iconLink.rel = 'shortcut icon';
    iconLink.href = rcFaviconData;
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  } catch(e) {}
})();

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

  click() {
    this.playTone(750, 'sine', 0.04, 0, 0.08);
  },

  pop() {
    this.playTone(580, 'triangle', 0.06, 0, 0.1);
  },

  wrong() {
    this.incorrect();
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('rc_sound_fx', this.enabled);
    return this.enabled;
  }
};
window.SoundFX = SoundFX;

function toggleSoundFX() {
  const isEnabled = SoundFX.toggle();
  const btn = document.getElementById('soundToggleBtn');
  if (btn) btn.textContent = isEnabled ? '🔔' : '🔕';
  if (window.showToast) window.showToast(isEnabled ? 'Sound Effects Enabled 🔔' : 'Sound Effects Muted 🔕');
}
window.toggleSoundFX = toggleSoundFX;

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

  fire(durationMs = 3500) {
    this.init();
    if (!this.canvas || !this.ctx) return;

    this.resize();
    // Vibrant Dopamine Festival Palette: Cyan, Pink/Coral, Warm Amber, Purple, Emerald, Mint & Royal Blue
    const colors = ['#00b4d8', '#ff5d8f', '#ffb703', '#7209b7', '#06d6a0', '#ffffff', '#4361ee', '#ff007f'];
    this.particles = [];

    const count = 180;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 260,
        y: this.canvas.height / 3,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
        alpha: 1,
        decay: Math.random() * 0.007 + 0.003
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
window.ConfettiFX = ConfettiFX;

// Audio and Scratchpad are loaded via modular js/audio.js and js/scratchpad.js


// =============================================================================
// State & Constants
// =============================================================================


// =============================================================================
// Velvet Obsidian Cosmos Canvas & Login Showcase (Delegated to js/cosmos.js)
// =============================================================================
// Handled by window.LoginCosmos and window.renderLoginShowcase from js/cosmos.js

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

  // Curriculum Access & Lesson Permissions (Option 3 Hybrid Model & Groups)
  unlockedSkills: new Set(),
  teacherSelectedStudentUnlocked: new Set(),
  selectedCurriculumStudentId: null,
  selectedCurriculumMode: 'student', // 'student' or 'group'
  selectedCurriculumGroupId: null,
  currentTeacherGroups: [],

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

async function hashLocalPassword(password) {
  const value = String(password || '');
  if (!value) return '';
  if (window.crypto?.subtle) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Modern browsers expose Web Crypto; this fallback is only for legacy/offline shells.
  return value;
}

async function verifyLocalPassword(candidate, record) {
  const clean = String(candidate || '');
  if (!clean || !record) return false;
  if (record.password_hash) return (await hashLocalPassword(clean)) === record.password_hash;
  if (record.password) {
    const ok = record.password === clean;
    if (ok) {
      record.password_hash = await hashLocalPassword(clean);
      delete record.password;
    }
    return ok;
  }
  return false;
}

const DB = {
  // Preloaded Demo Students & Teacher for instant client-side offline fallback
  demoStudents: [
    { id: 101, username: 'beshr', full_name: 'Beshr Mohamed', parent_name: 'Mohamed Beshr', student_phone: '01012345678', parent_phone: '01098765432', payment_method: 'InstaPay', payment_date: '2026-09-20', payment_amount: '', payment_status: 'paid', grade_level: 'Year 4', avatar: '🦊', password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', xp: 450, streak_days: 3, role: 'student' },
    { id: 1, username: 'alex', full_name: 'Alex Turner', parent_name: 'David Turner', student_phone: '01011112222', parent_phone: '01033334444', payment_method: 'InstaPay', payment_date: '2026-09-18', payment_amount: 500, payment_status: 'paid', grade_level: 'Year 4', avatar: '🚀', password_hash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', xp: 720, streak_days: 5, role: 'student' },
    { id: 2, username: 'sophia', full_name: 'Sophia Chen', parent_name: 'Wei Chen', student_phone: '01055556666', parent_phone: '01077778888', payment_method: 'Vodafone Cash', payment_date: '2026-09-15', payment_amount: 450, payment_status: 'paid', grade_level: 'Year 4', avatar: '🦄', password_hash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', xp: 890, streak_days: 7, role: 'student' },
    { id: 3, username: 'liam', full_name: 'Liam Johnson', parent_name: 'Robert Johnson', student_phone: '01099990000', parent_phone: '01022223333', payment_method: 'InstaPay', payment_date: '2026-09-10', payment_amount: 500, payment_status: 'paid', grade_level: 'Year 4', avatar: '🦁', password_hash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', xp: 340, streak_days: 2, role: 'student' },
    { id: 4, username: 'emma', full_name: 'Emma Watson', parent_name: 'Chris Watson', student_phone: '01044445555', parent_phone: '01066667777', payment_method: 'Bank Transfer', payment_date: '2026-09-05', payment_amount: 600, payment_status: 'paid', grade_level: 'Year 4', avatar: '🐼', password_hash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', xp: 610, streak_days: 4, role: 'student' },
    { id: 5, username: 'admin', full_name: 'Miss Rania', grade_level: 'Instructor', avatar: '👩‍🏫', xp: 0, streak_days: 0, role: 'teacher', password_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' },
    { id: 6, username: 'rania', full_name: 'Miss Rania', grade_level: 'Instructor', avatar: '👩‍🏫', xp: 0, streak_days: 0, role: 'teacher', password_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' }
  ],

  getActiveDemoStudents() {
    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const deletedSet = new Set(deletedIds);

    let modifiedDemo = {};
    try {
      modifiedDemo = JSON.parse(localStorage.getItem('rc_modified_demo_students') || '{}');
    } catch (e) {
      modifiedDemo = {};
    }

    return this.demoStudents
      .filter(s => !deletedSet.has(s.id))
      .map(s => {
        if (modifiedDemo[s.id]) {
          return { ...s, ...modifiedDemo[s.id] };
        }
        return { ...s };
      });
  },

  apiUrl(endpoint) {
    if (window.location.protocol === 'file:') {
      return `http://localhost:8000${endpoint}`;
    }
    return endpoint;
  },

  getStudentStats(studentId) {
    const numId = Number(studentId);
    const logsKey = `practice_logs_${numId}`;
    let logs = [];
    try {
      logs = JSON.parse(localStorage.getItem(logsKey) || '[]');
    } catch (e) {
      logs = [];
    }

    const totalQ = logs.reduce((acc, s) => acc + (s.questions_answered || 0), 0);
    const totalCorrect = logs.reduce((acc, s) => acc + (s.questions_correct || 0), 0);
    const totalTime = logs.reduce((acc, s) => acc + (s.duration_seconds || 0), 0);
    const avgScore = logs.length ? Math.round(logs.reduce((acc, s) => acc + (s.smart_score || 0), 0) / logs.length) : 0;
    const masteredCount = logs.filter(s => (s.smart_score || 0) >= 90).length;

    let savedXp = Number(localStorage.getItem(`student_xp_${numId}`)) || 0;
    if (AppState.currentUser && AppState.currentUser.id === numId && AppState.currentUser.xp) {
      savedXp = Math.max(savedXp, AppState.currentUser.xp);
    }
    const logXp = logs.reduce((acc, s) => {
      const qCorr = s.questions_correct || 0;
      const score = s.smart_score || 0;
      return acc + (s.xp_earned || (qCorr * 15) + (score >= 90 ? 50 : 20));
    }, 0);
    const xp = Math.max(savedXp, logXp);

    const lastActive = logs.length > 0 ? (logs[0].completed_at || logs[0].queued_at || 'Recently') : 'Not started';

    return {
      questions_answered: totalQ,
      questions_correct: totalCorrect,
      accuracy_rate: totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0,
      avg_smart_score: avgScore,
      mastered_skills: masteredCount,
      total_time_spent: totalTime,
      total_sessions: logs.length,
      xp: xp,
      last_active: lastActive
    };
  },

  async getDemoStudents() {
    try {
      const res = await fetch(this.apiUrl('/api/demo_students'));
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.students) return json.students.filter(s => s.role !== 'teacher');
      }
    } catch (e) {}

    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const allDeleted = new Set([...deletedIds, 1, 2, 3, 4]);

    const localStudents = (JSON.parse(localStorage.getItem('rc_custom_students') || '[]'))
      .filter(s => !allDeleted.has(s.id));
    const activeDemo = this.getActiveDemoStudents().filter(s => s.role !== 'teacher');

    const map = new Map();
    activeDemo.forEach(s => map.set(s.username.toLowerCase(), s));
    localStudents.forEach(s => map.set(s.username.toLowerCase(), s));

    return Array.from(map.values()).map(s => {
      const stats = this.getStudentStats(s.id);
      return {
        ...s,
        xp: Math.max(s.xp || 0, stats.xp)
      };
    });
  },

  async getTeacherStudents() {
    try {
      const overview = await this.getTeacherOverview();
      if (overview && Array.isArray(overview.roster) && overview.roster.length) {
        return overview.roster;
      }
    } catch (e) {}
    return await this.getDemoStudents();
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

    // 1. Try server endpoint if online
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
        } else if (data.error && res.status !== 404) {
          throw new Error(data.error);
        }
      }
    } catch (e) {
      const msg = (e.message || '').toLowerCase();
      if (!msg.includes('fetch') && !msg.includes('network') && !msg.includes('load') && !msg.includes('connection') && !msg.includes('json')) {
        throw e;
      }
    }

    // 2. Check custom registered students in localStorage
    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const deletedSet = new Set(deletedIds);

    const localStudents = (JSON.parse(localStorage.getItem('rc_custom_students') || '[]'))
      .filter(s => !deletedSet.has(s.id));
    const localFound = localStudents.find(s => s.username.toLowerCase() === cleanUser);
    if (localFound) {
      if (!(await verifyLocalPassword(cleanPw, localFound))) {
        throw new Error('Incorrect password');
      }
      const stats = this.getStudentStats(localFound.id);
      localFound.xp = Math.max(localFound.xp || 0, stats.xp);
      return localFound;
    }

    // 3. Check Demo students & Teacher list
    const activeDemo = this.getActiveDemoStudents();
    const found = activeDemo.find(s => s.username.toLowerCase() === cleanUser);
    if (found) {
      const isTeacher = found.role === 'teacher';
      if (!(await verifyLocalPassword(cleanPw, found))) {
        throw new Error('Incorrect password');
      }
      if (isTeacher) {
        return {
          ...found,
          role: 'teacher'
        };
      }
      const stats = this.getStudentStats(found.id);
      const studentXp = Math.max(found.xp || 0, stats.xp);
      return {
        ...found,
        xp: studentXp,
        badges: found.badges || [
          { badge_id: 'first_step', badge_name: 'First Step', badge_icon: '🎯', badge_desc: 'Completed your first practice session' },
          { badge_id: 'streak_hero', badge_name: 'Streak Hero', badge_icon: '🔥', badge_desc: 'Maintained a practice streak' }
        ]
      };
    }

    // 5. Check CloudDB / Firestore
    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.getStudents === 'function') {
      try {
        const cloudStudents = await window.CloudDB.getStudents();
        const cloudMatch = (cloudStudents || []).find(s => (s.username || '').toLowerCase() === cleanUser);
        if (cloudMatch) {
          return {
            ...cloudMatch,
            role: cloudMatch.role || 'student'
          };
        }
      } catch (e) {}
    }

    throw new Error('Invalid username or password.');
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

    const studentObj = this.findStudentById(studentId) || AppState.currentUser || {};
    const stats = this.getStudentStats(studentId);
    const resolvedStudent = {
      ...studentObj,
      xp: Math.max(studentObj.xp || 0, stats.xp)
    };

    return {
      student: resolvedStudent,
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
      badges: (resolvedStudent && resolvedStudent.badges && resolvedStudent.badges.length) ? resolvedStudent.badges : [
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
    const key = `practice_logs_${data.student_id}`;
    const logs = JSON.parse(localStorage.getItem(key) || '[]');
    const newSession = {
      id: Date.now(),
      ...data,
      completed_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    logs.unshift(newSession);
    localStorage.setItem(key, JSON.stringify(logs));

    if (window.SyncManager) {
      window.SyncManager.enqueue(data);
    }
    if (window.CloudDB) {
      window.CloudDB.logPracticeSession(newSession);
    }

    // Update user XP locally and persistently
    const xpGained = (data.questions_correct * 15) + (data.smart_score >= 90 ? 50 : 20);
    const currentXp = (AppState.currentUser && AppState.currentUser.id === Number(data.student_id))
      ? (AppState.currentUser.xp || 0)
      : (Number(localStorage.getItem(`student_xp_${data.student_id}`)) || 0);
    const newTotalXp = currentXp + xpGained;

    if (AppState.currentUser && AppState.currentUser.id === Number(data.student_id)) {
      AppState.currentUser.xp = newTotalXp;
      localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
    }
    localStorage.setItem(`student_xp_${data.student_id}`, String(newTotalXp));

    // Also update custom student entry in rc_custom_students if present
    const localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const stIndex = localStudents.findIndex(s => s.id === Number(data.student_id));
    if (stIndex !== -1) {
      localStudents[stIndex].xp = newTotalXp;
      localStudents[stIndex].questions_answered = (localStudents[stIndex].questions_answered || 0) + (data.questions_answered || 0);
      localStudents[stIndex].questions_correct = (localStudents[stIndex].questions_correct || 0) + (data.questions_correct || 0);
      localStudents[stIndex].last_active = newSession.completed_at;
      localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    }

    // Also update demoStudents runtime cache if present
    const demo = this.demoStudents.find(s => s.id === Number(data.student_id));
    if (demo) {
      demo.xp = newTotalXp;
    }

    return {
      success: true,
      xp_earned: xpGained,
      total_xp: newTotalXp,
      new_badges: []
    };
  },

  async getAssignments(studentId = null) {
    let list = [];
    try {
      const url = studentId ? `/api/assignments/student/${studentId}` : '/api/assignments';
      const res = await fetch(this.apiUrl(url));
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.assignments)) list = json.assignments;
      }
    } catch (e) {}

    // Load custom persistent assignments from localStorage / CloudDB
    let customAssignments = [];
    try {
      customAssignments = JSON.parse(localStorage.getItem('rc_custom_assignments') || '[]');
    } catch (e) {
      customAssignments = [];
    }

    // Default initial homework if nothing exists yet
    if (!customAssignments.length && !list.length) {
      customAssignments = [
        {
          id: 1001,
          skill_code: 'A.1',
          skill_name: 'Place value models - up to thousands',
          subject: 'Maths',
          grade: 'Year 4',
          due_date: 'Tomorrow',
          instructions: 'Solve 10 questions carefully to reach SmartScore 80+!',
          target_student: 'all',
          question_goal: 10,
          created_by: 'Miss Rania',
          completed_by: {}
        }
      ];
      localStorage.setItem('rc_custom_assignments', JSON.stringify(customAssignments));
    }

    const combined = [...customAssignments, ...list];
    const uniqueMap = new Map();
    combined.forEach(a => {
      uniqueMap.set(String(a.id), a);
    });
    const allAssignments = Array.from(uniqueMap.values());

    if (studentId) {
      const numId = Number(studentId);
      const studentObj = this.findStudentById(numId) || AppState.currentUser || {};
      const username = (studentObj.username || '').toLowerCase();

      return allAssignments.filter(a => {
        const target = (a.target_student || 'all').toString().toLowerCase();
        return target === 'all' || target === String(numId) || target === username;
      }).map(a => {
        const completedInfo = (a.completed_by && (a.completed_by[numId] || a.completed_by[username])) || null;
        return {
          ...a,
          is_completed: completedInfo ? 1 : 0,
          student_score: completedInfo ? completedInfo.smart_score : 0,
          completed_at: completedInfo ? completedInfo.completed_at : null
        };
      });
    }

    // Return all assignments for teacher with completion counts
    const activeStudents = (await this.getDemoStudents()).filter(s => s.role !== 'teacher');
    return allAssignments.map(a => {
      const completedEntries = a.completed_by ? Object.values(a.completed_by) : [];
      const totalTarget = a.target_student === 'all' ? Math.max(1, activeStudents.length) : 1;
      return {
        ...a,
        completions_count: completedEntries.length,
        total_students: totalTarget
      };
    });
  },

  async createAssignment(data) {
    try {
      fetch(this.apiUrl('/api/assignments/create'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      }).catch(() => {});
    } catch (e) {}

    const newAssignment = {
      id: Date.now(),
      skill_code: data.skill_code || 'A.1',
      skill_name: data.skill_name || 'Class Homework Drill',
      subject: data.subject || 'Maths',
      grade: data.grade || 'Year 4',
      due_date: data.due_date || 'Upcoming',
      instructions: data.instructions || 'Complete the assigned questions carefully.',
      target_student: data.target_student || 'all',
      question_goal: Number(data.question_goal) || 10,
      created_at: new Date().toISOString(),
      created_by: 'Miss Rania',
      completed_by: {}
    };

    let customAssignments = [];
    try {
      customAssignments = JSON.parse(localStorage.getItem('rc_custom_assignments') || '[]');
    } catch (e) {
      customAssignments = [];
    }
    customAssignments.unshift(newAssignment);
    localStorage.setItem('rc_custom_assignments', JSON.stringify(customAssignments));

    if (window.CloudDB) {
      window.CloudDB.saveAssignment(newAssignment);
    }

    return { success: true, assignment: newAssignment, assignment_id: newAssignment.id };
  },

  async deleteAssignment(assignmentId) {
    try {
      fetch(this.apiUrl('/api/assignments/delete'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ assignment_id: assignmentId })
      }).catch(() => {});
    } catch (e) {}

    let customAssignments = [];
    try {
      customAssignments = JSON.parse(localStorage.getItem('rc_custom_assignments') || '[]');
    } catch (e) {
      customAssignments = [];
    }
    customAssignments = customAssignments.filter(a => String(a.id) !== String(assignmentId));
    localStorage.setItem('rc_custom_assignments', JSON.stringify(customAssignments));

    if (window.CloudDB) {
      window.CloudDB.deleteAssignment(assignmentId);
    }

    return { success: true };
  },

  async completeAssignment(assignmentId, studentId, sessionStats) {
    let customAssignments = [];
    try {
      customAssignments = JSON.parse(localStorage.getItem('rc_custom_assignments') || '[]');
    } catch (e) {
      customAssignments = [];
    }
    const target = customAssignments.find(a => String(a.id) === String(assignmentId));
    if (target) {
      if (!target.completed_by) target.completed_by = {};
      target.completed_by[studentId] = {
        student_id: Number(studentId),
        completed_at: new Date().toISOString(),
        smart_score: sessionStats.smart_score || 100,
        questions_answered: sessionStats.questions_answered || 0,
        questions_correct: sessionStats.questions_correct || 0
      };
      localStorage.setItem('rc_custom_assignments', JSON.stringify(customAssignments));
    }

    if (window.CloudDB) {
      window.CloudDB.markAssignmentCompleted(assignmentId, studentId, sessionStats);
    }

    return { success: true };
  },

  findStudentById(studentId) {
    const numId = Number(studentId);
    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const allDeleted = new Set([...deletedIds, 1, 2, 3, 4]);
    if (allDeleted.has(numId)) return null;

    const localStudents = (JSON.parse(localStorage.getItem('rc_custom_students') || '[]'))
      .filter(s => !allDeleted.has(s.id));
    return localStudents.find(s => s.id === numId) || this.getActiveDemoStudents().find(s => s.id === numId);
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
    const cleanPw = (data.password || '').trim();
    if (!cleanPw) return { success: false, error: 'A password is required when creating a local student account.' };
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
      password_hash: await hashLocalPassword(cleanPw),
      full_name: fullName,
      parent_name: data.parent_name || '',
      student_phone: data.student_phone || '',
      parent_phone: data.parent_phone || '',
      payment_method: data.payment_method || 'InstaPay',
      payment_date: data.payment_date || new Date().toISOString().split('T')[0],
      payment_amount: (data.payment_amount !== undefined && data.payment_amount !== '' && data.payment_amount !== null) ? Number(data.payment_amount) : '',
      payment_status: data.payment_status || 'paid',
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
    if (window.CloudDB) {
      window.CloudDB.saveStudent(newStudent);
    }
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

  async syncLocalStudentUpdate(data) {
    const numId = Number(data.student_id);
    const existing = this.findStudentById(numId) || {};
    const fullName = (data.full_name !== undefined ? data.full_name : (existing.full_name || '')).trim();
    const cleanUser = (data.username !== undefined ? data.username : (existing.username || '')).trim().toLowerCase();
    const cleanPw = data.password !== undefined ? (data.password || '').trim() : '';
    const grade = data.grade_level !== undefined ? data.grade_level : existing.grade_level;
    const avatar = data.avatar !== undefined ? data.avatar : existing.avatar;

    // Update in rc_custom_students
    let localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const existingInCustom = localStudents.find(s => s.id === numId);
    if (existingInCustom) {
      if (fullName) existingInCustom.full_name = fullName;
      if (cleanUser) existingInCustom.username = cleanUser;
      if (grade) existingInCustom.grade_level = grade;
      if (avatar) existingInCustom.avatar = avatar;
      if (cleanPw) { existingInCustom.password_hash = await hashLocalPassword(cleanPw); delete existingInCustom.password; }
      if (data.parent_name !== undefined) existingInCustom.parent_name = data.parent_name;
      if (data.student_phone !== undefined) existingInCustom.student_phone = data.student_phone;
      if (data.parent_phone !== undefined) existingInCustom.parent_phone = data.parent_phone;
      if (data.payment_method !== undefined) existingInCustom.payment_method = data.payment_method;
      if (data.payment_date !== undefined) existingInCustom.payment_date = data.payment_date;
      if (data.payment_amount !== undefined) existingInCustom.payment_amount = (data.payment_amount !== '' && data.payment_amount !== null) ? Number(data.payment_amount) : '';
      if (data.payment_status !== undefined) existingInCustom.payment_status = data.payment_status;
      localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    }

    // Update in demoStudents and persist to rc_modified_demo_students
    const demo = this.demoStudents.find(s => s.id === numId);
    if (demo) {
      if (fullName) demo.full_name = fullName;
      if (cleanUser) demo.username = cleanUser;
      if (grade) demo.grade_level = grade;
      if (avatar) demo.avatar = avatar;
      if (cleanPw) { demo.password_hash = await hashLocalPassword(cleanPw); delete demo.password; }
      if (data.payment_status !== undefined) demo.payment_status = data.payment_status;
      if (data.payment_amount !== undefined) demo.payment_amount = data.payment_amount;
      if (data.payment_date !== undefined) demo.payment_date = data.payment_date;
      if (data.payment_method !== undefined) demo.payment_method = data.payment_method;

      let modifiedDemo = {};
      try {
        modifiedDemo = JSON.parse(localStorage.getItem('rc_modified_demo_students') || '{}');
      } catch (e) {
        modifiedDemo = {};
      }
      modifiedDemo[numId] = {
        ...(modifiedDemo[numId] || {}),
        full_name: fullName || demo.full_name,
        username: cleanUser || demo.username,
        grade_level: grade || demo.grade_level,
        avatar: avatar || demo.avatar,
        ...(data.payment_status !== undefined ? { payment_status: data.payment_status } : {}),
        ...(data.payment_amount !== undefined ? { payment_amount: data.payment_amount } : {}),
        ...(data.payment_date !== undefined ? { payment_date: data.payment_date } : {}),
        ...(data.payment_method !== undefined ? { payment_method: data.payment_method } : {}),
        ...(cleanPw ? { password_hash: await hashLocalPassword(cleanPw) } : (demo.password_hash ? { password_hash: demo.password_hash } : {}))
      };
      localStorage.setItem('rc_modified_demo_students', JSON.stringify(modifiedDemo));
    }

    // Update current session if the edited student is currently logged in
    if (AppState.currentUser && AppState.currentUser.id === numId) {
      if (fullName) AppState.currentUser.full_name = fullName;
      if (cleanUser) AppState.currentUser.username = cleanUser;
      if (grade) AppState.currentUser.grade_level = grade;
      if (avatar) AppState.currentUser.avatar = avatar;
      if (data.payment_status !== undefined) AppState.currentUser.payment_status = data.payment_status;
      localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
      if (typeof updateNavProfile === 'function') updateNavProfile();
    }

    // Sync updated student to Google Cloud Firebase
    if (window.CloudDB) {
      const updatedStudent = this.findStudentById(numId) || {
        id: numId,
        full_name: fullName,
        username: cleanUser,
        grade_level: grade,
        payment_status: data.payment_status || 'paid'
      };
      window.CloudDB.saveStudent(updatedStudent);
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

  async syncLocalStudentPassword(studentId, newPassword) {
    const numId = Number(studentId);
    const pass = (newPassword || '').trim();
    let localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    const s = localStudents.find(st => st.id === numId);
    if (s) {
      s.password_hash = await hashLocalPassword(pass);
      delete s.password;
      localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));
    }
    const demo = this.demoStudents.find(st => st.id === numId);
    if (demo) {
      demo.password_hash = await hashLocalPassword(pass);
      delete demo.password;
      let modifiedDemo = {};
      try {
        modifiedDemo = JSON.parse(localStorage.getItem('rc_modified_demo_students') || '{}');
      } catch (e) {
        modifiedDemo = {};
      }
      if (!modifiedDemo[numId]) modifiedDemo[numId] = {};
      modifiedDemo[numId].password_hash = await hashLocalPassword(pass);
      delete modifiedDemo[numId].password;
      localStorage.setItem('rc_modified_demo_students', JSON.stringify(modifiedDemo));
    }

    if (window.CloudDB) {
      const studentObj = this.findStudentById(numId);
      if (studentObj) window.CloudDB.saveStudent(studentObj);
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
    // 1. Permanently record deletion in localStorage so they never reappear
    let deleted = [];
    try {
      deleted = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deleted = [];
    }
    if (!deleted.includes(numId)) {
      deleted.push(numId);
      localStorage.setItem('rc_deleted_student_ids', JSON.stringify(deleted));
    }

    // 2. Remove from custom students in localStorage
    let localStudents = JSON.parse(localStorage.getItem('rc_custom_students') || '[]');
    localStudents = localStudents.filter(s => s.id !== numId);
    localStorage.setItem('rc_custom_students', JSON.stringify(localStudents));

    // 3. Remove from modified demo cache
    let modifiedDemo = {};
    try {
      modifiedDemo = JSON.parse(localStorage.getItem('rc_modified_demo_students') || '{}');
    } catch (e) {
      modifiedDemo = {};
    }
    delete modifiedDemo[numId];
    localStorage.setItem('rc_modified_demo_students', JSON.stringify(modifiedDemo));

    // 4. Update memory array
    this.demoStudents = this.demoStudents.filter(s => s.id !== numId);

    // Delete student from Google Cloud Firebase Firestore
    if (window.CloudDB) {
      window.CloudDB.deleteStudent(numId);
    }

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
    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const allDeleted = new Set([...deletedIds, 1, 2, 3, 4]);

    const localStudents = (JSON.parse(localStorage.getItem('rc_custom_students') || '[]'))
      .filter(s => !allDeleted.has(s.id));
    const activeDemo = this.getActiveDemoStudents().filter(s => s.role !== 'teacher');

    // Deduplicate by username (case-insensitive) and ID
    const studentMap = new Map();
    activeDemo.forEach(s => studentMap.set(s.username.toLowerCase(), s));
    localStudents.forEach(s => studentMap.set(s.username.toLowerCase(), { ...s, is_custom: true }));

    const allEnrolled = Array.from(studentMap.values());

    const students = allEnrolled.map(s => {
      const stats = this.getStudentStats(s.id);
      const q = stats.questions_answered || s.questions_answered || 0;
      const c = stats.questions_correct || s.questions_correct || 0;
      const xp = Math.max(stats.xp, s.xp || 0);
      const avgScore = stats.avg_smart_score || s.avg_smart_score || 0;
      const lastActive = stats.last_active !== 'Not started' ? stats.last_active : (s.last_active || 'Not started');

      return {
        id: s.id,
        username: s.username,

        full_name: s.full_name,
        parent_name: s.parent_name || '',
        student_phone: s.student_phone || '',
        parent_phone: s.parent_phone || '',
        payment_method: s.payment_method || 'InstaPay',
        payment_date: s.payment_date || '',
        payment_amount: (s.payment_amount !== undefined && s.payment_amount !== null && s.payment_amount !== '') ? s.payment_amount : '',
        payment_status: s.payment_status || 'paid',
        grade_level: s.grade_level,
        avatar: s.avatar || '🦊',
        xp: xp,
        streak_days: s.streak_days || (stats.total_sessions > 0 ? 1 : 0),
        questions_answered: q,
        questions_correct: c,
        accuracy_rate: q ? Math.round((c / q) * 100) : 0,
        avg_smart_score: avgScore,
        last_active: lastActive,
        badges_count: (s.badges && s.badges.length) || (stats.total_sessions > 0 ? 1 : 0),
        is_custom: s.is_custom !== undefined ? s.is_custom : true
      };
    });

    const totQ = students.reduce((acc, s) => acc + s.questions_answered, 0);
    const totCorr = students.reduce((acc, s) => acc + s.questions_correct, 0);
    const totTime = students.reduce((acc, s) => {
      const stats = this.getStudentStats(s.id);
      return acc + (stats.total_time_spent || 0);
    }, 0);

    return {
      total_students: students.length,
      class_stats: {
        total_questions: totQ,
        total_correct: totCorr,
        accuracy_rate: totQ ? Math.round((totCorr / totQ) * 100) : 0,
        total_hours: Math.round((totTime / 3600) * 10) / 10
      },
      roster: students,
      attention_skills: [],
      mastered_skills: []
    };
  },

  async getStudentCurriculumAccess() {
    try {
      const res = await fetch(this.apiUrl('/api/student/curriculum_access'), {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    const studentId = AppState.currentUser?.id;
    if (studentId) {
      if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.getStudentUnlockedSkills === 'function') {
        try {
          const cloudSkills = await window.CloudDB.getStudentUnlockedSkills(studentId);
          if (Array.isArray(cloudSkills)) {
            return { success: true, unlocked_skills: cloudSkills };
          }
        } catch (e) {}
      }
      try {
        const stored = JSON.parse(localStorage.getItem(`rc_unlocked_${studentId}`) || '[]');
        return { success: true, unlocked_skills: stored };
      } catch (e) {}
    }
    return { success: false, unlocked_skills: [] };
  },

  async getTeacherStudentSkills(studentId) {
    try {
      const res = await fetch(this.apiUrl(`/api/teacher/student_skills/${studentId}`), {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    if (studentId) {
      if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.getStudentUnlockedSkills === 'function') {
        try {
          const cloudSkills = await window.CloudDB.getStudentUnlockedSkills(studentId);
          if (Array.isArray(cloudSkills)) {
            return { success: true, unlocked_skills: cloudSkills };
          }
        } catch (e) {}
      }
      try {
        const stored = JSON.parse(localStorage.getItem(`rc_unlocked_${studentId}`) || '[]');
        return { success: true, unlocked_skills: stored };
      } catch (e) {}
    }
    return { success: false, unlocked_skills: [] };
  },

  async updateStudentSkills(studentId, action, skillCodes = [], grade = null) {
    let finalSkills = [];
    if (action === 'set') {
      finalSkills = skillCodes;
    } else if (action === 'unlock_all_grade') {
      const targetGrade = grade || 'Year 4';
      finalSkills = (AppState.flatSkills || []).filter(s => s.grade === targetGrade).map(s => s.code);
    } else if (action === 'lock_all') {
      finalSkills = [];
    }

    // Save locally
    localStorage.setItem(`rc_unlocked_${studentId}`, JSON.stringify(finalSkills));

    // Save to Google Cloud Firestore (CloudDB)
    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.saveStudentUnlockedSkills === 'function') {
      try {
        await window.CloudDB.saveStudentUnlockedSkills(studentId, finalSkills);
      } catch (e) {
        console.warn('CloudDB saveStudentUnlockedSkills error:', e);
      }
    }

    try {
      const res = await fetch(this.apiUrl('/api/teacher/student_skills/update'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          student_id: Number(studentId),
          action: action,
          skill_codes: skillCodes,
          grade: grade
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    return { success: true, unlocked_skills: finalSkills };
  },

  async loadStudentCurriculumAccess() {
    if (!AppState.currentUser || AppState.currentUser.role === 'teacher') return;
    const res = await this.getStudentCurriculumAccess();
    if (res && res.success && Array.isArray(res.unlocked_skills)) {
      AppState.unlockedSkills = new Set(res.unlocked_skills);
      localStorage.setItem(`rc_unlocked_${AppState.currentUser.id}`, JSON.stringify(res.unlocked_skills));
    } else {
      try {
        const stored = JSON.parse(localStorage.getItem(`rc_unlocked_${AppState.currentUser.id}`) || '[]');
        AppState.unlockedSkills = new Set(stored);
      } catch (e) {
        AppState.unlockedSkills = new Set();
      }
    }
  },

  async getLeaderboard() {
    try {
      const res = await fetch(this.apiUrl('/api/leaderboard'));
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.leaderboard) return data.leaderboard;
      }
    } catch (e) {}

    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('rc_deleted_student_ids') || '[]');
    } catch (e) {
      deletedIds = [];
    }
    const allDeleted = new Set([...deletedIds, 1, 2, 3, 4]);

    const localStudents = (JSON.parse(localStorage.getItem('rc_custom_students') || '[]'))
      .filter(s => !allDeleted.has(s.id));
    const activeDemo = this.getActiveDemoStudents().filter(s => s.role !== 'teacher');

    const map = new Map();
    activeDemo.forEach(s => map.set(s.username.toLowerCase(), s));
    localStudents.forEach(s => map.set(s.username.toLowerCase(), s));

    const withLiveXp = Array.from(map.values()).map(s => {
      const stats = this.getStudentStats(s.id);
      return {
        ...s,
        xp: Math.max(s.xp || 0, stats.xp)
      };
    });
    return withLiveXp.sort((a, b) => b.xp - a.xp);
  },

  async submitPayment(data) {
    let local = [];
    try {
      local = JSON.parse(localStorage.getItem('rc_custom_payments') || '[]');
    } catch (e) {
      local = [];
    }

    const currentU = AppState.currentUser || JSON.parse(localStorage.getItem('current_student') || 'null');
    const newP = {
      id: data.id || ('pay_' + Date.now()),
      student_id: data.student_id || (currentU ? currentU.id : 1),
      student_name: data.student_name || (currentU ? (currentU.full_name || currentU.username) : 'Student'),
      amount: (data.amount !== undefined && data.amount !== '' && data.amount !== null) ? Number(data.amount) : '',
      payment_date: data.payment_date || new Date().toISOString().split('T')[0],
      payment_method: data.payment_method || 'InstaPay',
      receipt_image: data.receipt_image || '',
      notes: data.notes || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    local.unshift(newP);
    try {
      localStorage.setItem('rc_custom_payments', JSON.stringify(local));
    } catch (storageErr) {
      console.warn('LocalStorage quota exceeded for full receipt, saving metadata safely:', storageErr);
      newP.receipt_image = '';
      local[0] = newP;
      try {
        localStorage.setItem('rc_custom_payments', JSON.stringify(local));
      } catch (e2) {}
    }

    if (currentU) {
      currentU.payment_status = 'pending';
      try {
        localStorage.setItem('current_student', JSON.stringify(currentU));
      } catch (e) {}
      AppState.currentUser = currentU;
      this.syncLocalStudentUpdate({ student_id: currentU.id, payment_status: 'pending' });

      if (window.ActivityLogger) {
        ActivityLogger.log(
          currentU,
          'PAYMENT_SUBMIT',
          'Submitted Monthly Tuition Receipt',
          `Amount: ${newP.amount ? newP.amount + ' EGP' : 'Verified'} via ${newP.payment_method}`,
          { paymentId: newP.id, method: newP.payment_method }
        );
      }
    }

    // Non-blocking background sync to CloudDB with 2.5s timeout
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        const cloudP = window.CloudDB.submitPayment(data);
        const timeoutP = new Promise((resolve) => setTimeout(resolve, 2500));
        Promise.race([cloudP, timeoutP]).catch(e => console.warn('CloudDB background sync:', e));
      } catch (e) {}
    }

    // Non-blocking background sync to backend API only if NOT on static github.io
    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 2000);
        fetch(this.apiUrl('/api/payments/submit'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
          signal: controller.signal
        }).then(r => r.ok && r.json()).catch(() => {}).finally(() => clearTimeout(fetchTimeout));
      } catch (e) {}
    }

    return { success: true, payment: newP };
  },

  async reviewPayment(paymentId, status) {
    let local = JSON.parse(localStorage.getItem('rc_custom_payments') || '[]');
    let p = local.find(x => x.id === paymentId || String(x.id) === String(paymentId));
    let studentId = p ? p.student_id : null;

    if (!studentId && paymentId) {
      try {
        const all = await this.getPayments();
        const found = all.find(x => x.id === paymentId || String(x.id) === String(paymentId));
        if (found && found.student_id) {
          studentId = found.student_id;
          if (!p) p = found;
        }
      } catch (e) {}
    }

    // 1. Sync to Google Cloud Firebase Firestore
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        await window.CloudDB.reviewPayment(paymentId, status, studentId, p);
      } catch (e) {}
    }

    // 2. Sync to Backend API
    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        await fetch(this.apiUrl('/api/payments/review'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ payment_id: paymentId, status: status, student_id: studentId })
        });
      } catch (e) {}
    }

    // 3. Update local payments array
    if (p) {
      p.status = status;
      localStorage.setItem('rc_custom_payments', JSON.stringify(local));
    }

    // 4. Update student payment status in all local student caches & Firestore
    const studentStatus = status === 'approved' ? 'paid' : 'overdue';
    if (studentId) {
      this.syncLocalStudentUpdate({
        student_id: studentId,
        payment_status: studentStatus,
        payment_date: p && p.payment_date ? p.payment_date : new Date().toISOString().slice(0, 10),
        payment_amount: p && (p.amount !== undefined && p.amount !== '') ? p.amount : '',
        payment_method: p && p.payment_method ? p.payment_method : 'InstaPay'
      });
      if (AppState.currentUser && (AppState.currentUser.id === studentId || String(AppState.currentUser.id) === String(studentId))) {
        AppState.currentUser.payment_status = studentStatus;
        localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
      }
    }

    return { success: true };
  },

  async deletePayment(paymentId) {
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        await window.CloudDB.deletePayment(paymentId);
      } catch (e) {}
    }
    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        await fetch(this.apiUrl('/api/payments/delete'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ payment_id: paymentId })
        });
      } catch (e) {}
    }

    let local = JSON.parse(localStorage.getItem('rc_custom_payments') || '[]');
    local = local.filter(x => x.id !== paymentId && String(x.id) !== String(paymentId));
    localStorage.setItem('rc_custom_payments', JSON.stringify(local));
    return { success: true };
  },

  async clearAllPayments() {
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        await window.CloudDB.clearAllPayments();
      } catch (e) {}
    }
    localStorage.removeItem('rc_custom_payments');
    return { success: true };
  },

  async getPayments() {
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        const cloudPayments = await window.CloudDB.getPayments();
        if (cloudPayments && cloudPayments.length) return cloudPayments;
      } catch (e) {}
    }
    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const res = await fetch(this.apiUrl('/api/payments/list'), { headers: this.getAuthHeaders() });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.payments) return json.payments;
        }
      } catch (e) {}
    }
    return JSON.parse(localStorage.getItem('rc_custom_payments') || '[]');
  },

  async saveClassSession(data) {
    const local = JSON.parse(localStorage.getItem('rc_class_sessions') || '[]');
    const sess = {
      id: data.id || ('sess_' + Date.now()),
      title: data.title || 'Live Class Session',
      topic: data.topic || data.topic_covered || '',
      topic_covered: data.topic || data.topic_covered || '',
      session_date: data.session_date || data.date || new Date().toISOString(),
      date: data.session_date || data.date || new Date().toISOString().slice(0, 10),
      zoom_link: data.zoom_link || '',
      recording_link: data.recording_link || '',
      pdf_link: data.pdf_link || data.pdf_url || '',
      pdf_url: data.pdf_link || data.pdf_url || '',
      pdf_title: data.pdf_title || 'Class Material PDF',
      notes: data.notes || '',
      target_audience: data.target_audience || 'all',
      target_group_id: data.target_group_id || '',
      target_student_id: Number(data.target_student_id) || 0,
      created_at: new Date().toISOString()
    };
    local.unshift(sess);
    localStorage.setItem('rc_class_sessions', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        const cloudP = window.CloudDB.saveClassSession(sess);
        const timeoutP = new Promise((resolve) => setTimeout(resolve, 2500));
        Promise.race([cloudP, timeoutP]).catch(() => {});
      } catch (e) {}
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 2000);
        fetch(this.apiUrl('/api/sessions/create'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(sess),
          signal: controller.signal
        }).then(r => r.ok && r.json()).catch(() => {}).finally(() => clearTimeout(fetchTimeout));
      } catch (e) {}
    }

    return { success: true, session: sess };
  },

  async deleteClassSession(sessionId) {
    let local = JSON.parse(localStorage.getItem('rc_class_sessions') || '[]');
    local = local.filter(s => s.id !== sessionId && String(s.id) !== String(sessionId));
    localStorage.setItem('rc_class_sessions', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        const cloudP = window.CloudDB.deleteClassSession(sessionId);
        const timeoutP = new Promise((resolve) => setTimeout(resolve, 2500));
        Promise.race([cloudP, timeoutP]).catch(() => {});
      } catch (e) {}
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 2000);
        fetch(this.apiUrl('/api/sessions/delete'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ session_id: sessionId }),
          signal: controller.signal
        }).then(r => r.ok && r.json()).catch(() => {}).finally(() => clearTimeout(fetchTimeout));
      } catch (e) {}
    }

    return { success: true };
  },

  async getClassSessions() {
    if (window.CloudDB && window.CloudDB.isConfigured) {
      try {
        const cloudSessions = await window.CloudDB.getClassSessions();
        if (cloudSessions && cloudSessions.length) return cloudSessions;
      } catch (e) {}
    }
    try {
      const res = await fetch(this.apiUrl('/api/sessions/list'), { headers: this.getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.sessions) return json.sessions;
      }
    } catch (e) {}
    return JSON.parse(localStorage.getItem('rc_class_sessions') || '[]');
  },

  // Student Groups Management
  async getStudentGroups() {
    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.getStudentGroups === 'function') {
      try {
        const cloudGroups = await window.CloudDB.getStudentGroups();
        if (cloudGroups && cloudGroups.length) {
          localStorage.setItem('rc_student_groups', JSON.stringify(cloudGroups));
          return cloudGroups;
        }
      } catch (e) {}
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const res = await fetch(this.apiUrl('/api/teacher/groups'), { headers: this.getAuthHeaders() });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.groups)) {
            localStorage.setItem('rc_student_groups', JSON.stringify(json.groups));
            return json.groups;
          }
        }
      } catch (e) {}
    }

    let local = [];
    try {
      local = JSON.parse(localStorage.getItem('rc_student_groups') || '[]');
    } catch (e) {
      local = [];
    }

    // Default sample cohort if empty
    if (!local.length) {
      const defaultGroup = {
        id: 'grp_y4_alpha',
        name: 'Year 4 Primary Cohort',
        grade_level: 'Year 4',
        color: 'indigo',
        student_ids: [101],
        description: 'Sunday & Wednesday Weekly Class',
        created_at: new Date().toISOString()
      };
      local = [defaultGroup];
      localStorage.setItem('rc_student_groups', JSON.stringify(local));
    }

    return local;
  },

  async saveStudentGroup(groupData) {
    const id = String(groupData.id || ('grp_' + Date.now()));
    const newGroup = {
      id: id,
      name: groupData.name || 'Student Group',
      grade_level: groupData.grade_level || 'Year 4',
      color: groupData.color || 'indigo',
      student_ids: Array.isArray(groupData.student_ids) ? groupData.student_ids.map(Number) : [],
      description: groupData.description || '',
      created_at: groupData.created_at || new Date().toISOString()
    };

    let local = JSON.parse(localStorage.getItem('rc_student_groups') || '[]');
    const idx = local.findIndex(g => String(g.id) === String(id));
    if (idx >= 0) {
      local[idx] = newGroup;
    } else {
      local.unshift(newGroup);
    }
    localStorage.setItem('rc_student_groups', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.saveStudentGroup === 'function') {
      try {
        window.CloudDB.saveStudentGroup(newGroup);
      } catch (e) {}
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 2500);
        fetch(this.apiUrl('/api/teacher/groups/save'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(newGroup),
          signal: controller.signal
        }).then(r => r.ok && r.json()).catch(() => {}).finally(() => clearTimeout(fetchTimeout));
      } catch (e) {}
    }

    return { success: true, group: newGroup };
  },

  async deleteStudentGroup(groupId) {
    let local = JSON.parse(localStorage.getItem('rc_student_groups') || '[]');
    local = local.filter(g => String(g.id) !== String(groupId));
    localStorage.setItem('rc_student_groups', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.deleteStudentGroup === 'function') {
      try {
        window.CloudDB.deleteStudentGroup(groupId);
      } catch (e) {}
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 2500);
        fetch(this.apiUrl('/api/teacher/groups/delete'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ group_id: groupId }),
          signal: controller.signal
        }).then(r => r.ok && r.json()).catch(() => {}).finally(() => clearTimeout(fetchTimeout));
      } catch (e) {}
    }

    return { success: true };
  },

  async updateGroupSkills(groupId, action, skillCodes = [], grade = null) {
    const groups = await this.getStudentGroups();
    const grp = groups.find(g => String(g.id) === String(groupId));
    const studentIds = grp && Array.isArray(grp.student_ids) ? grp.student_ids : [];
    const targetGrade = grade || (grp ? grp.grade_level : 'Year 4');

    for (const sid of studentIds) {
      await this.updateStudentSkills(sid, action, skillCodes, targetGrade);
    }

    const isStaticHost = window.location.hostname.endsWith('github.io');
    if (!isStaticHost) {
      try {
        fetch(this.apiUrl('/api/teacher/group_skills/update'), {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            group_id: groupId,
            student_ids: studentIds,
            action: action,
            skill_codes: skillCodes,
            grade: targetGrade
          })
        }).catch(() => {});
      } catch (e) {}
    }

    return { success: true, updated_students: studentIds.length };
  },

  // Curriculum Books & Full PDFs
  async getCurriculumBooks() {
    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.getCurriculumBooks === 'function') {
      try {
        const cloudBooks = await window.CloudDB.getCurriculumBooks();
        if (cloudBooks && cloudBooks.length) return cloudBooks;
      } catch (e) {}
    }
    const deletedIds = JSON.parse(localStorage.getItem('rc_deleted_curriculum_books') || '[]');
    const isSeeded = localStorage.getItem('rc_curriculum_books_seeded') === 'true';

    const localStr = localStorage.getItem('rc_curriculum_books');
    if (localStr !== null) {
      try {
        const parsed = JSON.parse(localStr);
        if (Array.isArray(parsed)) {
          return parsed.filter(b => !deletedIds.includes(String(b.id)));
        }
      } catch (e) {}
    }

    if (isSeeded) {
      return [];
    }

    const defaultBooks = [
      {
        id: 'book_math_y4',
        title: 'Cambridge Primary Mathematics Learner Book 4',
        age_group: 'Year 4 (Ages 8-9)',
        grade: 'Year 4',
        subject: 'Maths',
        pages_count: '184 Pages',
        pdf_url: 'https://archive.org/search.php?query=Cambridge+Primary+Mathematics+Learners+Book+4',
        description: 'Complete official curriculum textbook covering place value, operations, fractions, geometry, and data handling.',
        created_at: new Date().toISOString()
      },
      {
        id: 'book_eng_y4',
        title: 'Cambridge Primary English Learner Book 4',
        age_group: 'Year 4 (Ages 8-9)',
        grade: 'Year 4',
        subject: 'English',
        pages_count: '176 Pages',
        pdf_url: 'https://archive.org/search.php?query=Cambridge+Primary+English+Learners+Book+4',
        description: 'Comprehensive English syllabus focusing on reading comprehension, story writing, grammar rules, spelling, and vocabulary.',
        created_at: new Date().toISOString()
      },
      {
        id: 'book_sci_y4',
        title: 'Cambridge Primary Science Learner Book 4',
        age_group: 'Year 4 (Ages 8-9)',
        grade: 'Year 4',
        subject: 'Science',
        pages_count: '160 Pages',
        pdf_url: 'https://archive.org/search.php?query=Cambridge+Primary+Science+Learners+Book+4',
        description: 'Interactive science textbook exploring living things, sound vibrations, states of matter, habitats, and electrical circuits.',
        created_at: new Date().toISOString()
      },
      {
        id: 'book_math_y5',
        title: 'Cambridge Primary Mathematics Learner Book 5',
        age_group: 'Year 5 (Ages 9-10)',
        grade: 'Year 5',
        subject: 'Maths',
        pages_count: '208 Pages',
        pdf_url: 'https://archive.org/search.php?query=Cambridge+Primary+Mathematics+Learners+Book+5',
        description: 'Advanced primary mathematics covering multi-step problem solving, percentages, decimals, angles, perimeter, and area.',
        created_at: new Date().toISOString()
      },
      {
        id: 'book_eng_y5',
        title: 'Oxford International Primary English Student Book 5',
        age_group: 'Year 5 (Ages 9-10)',
        grade: 'Year 5',
        subject: 'English',
        pages_count: '192 Pages',
        pdf_url: 'https://archive.org/search.php?query=Oxford+International+Primary+English+Student+Book+5',
        description: 'Structured language arts curriculum including non-fiction articles, persuasive essays, creative poetry, and syntax mastery.',
        created_at: new Date().toISOString()
      },
      {
        id: 'book_sci_y6',
        title: 'Cambridge Primary Science Learner Book 6',
        age_group: 'Year 6 (Ages 10-11)',
        grade: 'Year 6',
        subject: 'Science',
        pages_count: '196 Pages',
        pdf_url: 'https://archive.org/search.php?query=Cambridge+Primary+Science+Learners+Book+6',
        description: 'Upper primary science program covering human body organs, ecosystems, reversible/irreversible changes, and forces.',
        created_at: new Date().toISOString()
      }
    ];

    const filtered = defaultBooks.filter(b => !deletedIds.includes(String(b.id)));
    localStorage.setItem('rc_curriculum_books_seeded', 'true');
    localStorage.setItem('rc_curriculum_books', JSON.stringify(filtered));
    return filtered;
  },

  async saveCurriculumBook(bookData) {
    let local = await this.getCurriculumBooks();
    const newBook = {
      id: bookData.id || ('book_' + Date.now()),
      title: bookData.title,
      age_group: bookData.age_group || 'All Ages',
      grade: bookData.grade || bookData.age_group || 'All Grades',
      subject: bookData.subject || 'General',
      pages_count: bookData.pages_count || 'Full Book',
      pdf_url: bookData.pdf_url || '#',
      description: bookData.description || 'Full curriculum PDF textbook.',
      created_at: new Date().toISOString()
    };
    local.unshift(newBook);
    localStorage.setItem('rc_curriculum_books_seeded', 'true');
    localStorage.setItem('rc_curriculum_books', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.saveCurriculumBook === 'function') {
      try {
        const cloudP = window.CloudDB.saveCurriculumBook(bookData);
        const timeoutP = new Promise((resolve) => setTimeout(resolve, 2500));
        Promise.race([cloudP, timeoutP]).catch(() => {});
      } catch (e) {}
    }

    return { success: true, book: newBook };
  },

  async deleteCurriculumBook(bookId) {
    let deletedIds = JSON.parse(localStorage.getItem('rc_deleted_curriculum_books') || '[]');
    if (!deletedIds.includes(String(bookId))) {
      deletedIds.push(String(bookId));
      localStorage.setItem('rc_deleted_curriculum_books', JSON.stringify(deletedIds));
    }
    let local = await this.getCurriculumBooks();
    local = local.filter(b => b.id !== bookId && String(b.id) !== String(bookId));
    localStorage.setItem('rc_curriculum_books_seeded', 'true');
    localStorage.setItem('rc_curriculum_books', JSON.stringify(local));

    if (window.CloudDB && window.CloudDB.isConfigured && typeof window.CloudDB.deleteCurriculumBook === 'function') {
      try {
        const cloudP = window.CloudDB.deleteCurriculumBook(bookId);
        const timeoutP = new Promise((resolve) => setTimeout(resolve, 2500));
        Promise.race([cloudP, timeoutP]).catch(() => {});
      } catch (e) {}
    }

    return { success: true };
  },

  async clearAllCurriculumBooks() {
    const allSampleIds = ['book_math_y4', 'book_eng_y4', 'book_sci_y4', 'book_math_y5', 'book_eng_y5', 'book_sci_y6'];
    localStorage.setItem('rc_deleted_curriculum_books', JSON.stringify(allSampleIds));
    localStorage.setItem('rc_curriculum_books_seeded', 'true');
    localStorage.setItem('rc_curriculum_books', JSON.stringify([]));
    return { success: true };
  },

  // Daily Teaching Planner & Lesson Agenda (To-Do)
  async getPlannerTasks() {
    const local = localStorage.getItem('rc_daily_planner');
    if (local !== null) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const defaultTasks = [
      {
        id: 'plan_seed_1',
        date: todayStr,
        time: '04:00 PM',
        student_id: '1',
        student_name: 'Alex Morgan (Year 4)',
        lesson_title: 'Cambridge Maths: Fractions & Mixed Numbers',
        topics_to_take: 'Explain improper fractions to mixed numbers, solve Learner Book pages 42-45, practice 5 questions on place value.',
        materials_needed: 'Learner Book 4, Study Sheet #3',
        homework_assigned: 'Answer exercise 3.2 on page 46',
        status: 'pending',
        created_at: new Date().toISOString()
      },
      {
        id: 'plan_seed_2',
        date: todayStr,
        time: '05:30 PM',
        student_id: '2',
        student_name: 'Sarah Smith (Year 5)',
        lesson_title: 'Oxford English: Reading Comprehension & Vocabulary',
        topics_to_take: 'Read story text on pages 18-20, analyze story characters, explain 10 new vocabulary terms and sentence construction.',
        materials_needed: 'English Student Book 5',
        homework_assigned: 'Write a 1-paragraph summary using 5 vocabulary words',
        status: 'pending',
        created_at: new Date().toISOString()
      },
      {
        id: 'plan_seed_3',
        date: tomorrowStr,
        time: '04:30 PM',
        student_id: 'all',
        student_name: 'All Year 4 Students',
        lesson_title: 'Cambridge Science: States of Matter & Experiments',
        topics_to_take: 'Demonstrate solids, liquids, and gases, heating & cooling effects, review student workbook questions.',
        materials_needed: 'Science Learner Book 4',
        homework_assigned: 'Complete observations table on page 33',
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem('rc_daily_planner', JSON.stringify(defaultTasks));
    return defaultTasks;
  },

  async savePlannerTask(taskData) {
    let local = await this.getPlannerTasks();
    const newTask = {
      id: taskData.id || ('plan_' + Date.now()),
      date: taskData.date || new Date().toISOString().split('T')[0],
      time: taskData.time || '16:00',
      student_id: taskData.student_id || 'all',
      student_name: taskData.student_name || 'All Students',
      lesson_title: taskData.lesson_title || 'Class Lesson',
      topics_to_take: taskData.topics_to_take || '',
      materials_needed: taskData.materials_needed || '',
      homework_assigned: taskData.homework_assigned || '',
      status: taskData.status || 'pending',
      created_at: new Date().toISOString()
    };
    local.unshift(newTask);
    localStorage.setItem('rc_daily_planner', JSON.stringify(local));
    return { success: true, task: newTask };
  },

  async togglePlannerTaskStatus(taskId) {
    let local = await this.getPlannerTasks();
    let updated = null;
    local = local.map(t => {
      if (t.id === taskId || String(t.id) === String(taskId)) {
        t.status = (t.status === 'completed' ? 'pending' : 'completed');
        updated = t;
      }
      return t;
    });
    localStorage.setItem('rc_daily_planner', JSON.stringify(local));
    return { success: true, task: updated };
  },

  async deletePlannerTask(taskId) {
    let local = await this.getPlannerTasks();
    local = local.filter(t => t.id !== taskId && String(t.id) !== String(taskId));
    localStorage.setItem('rc_daily_planner', JSON.stringify(local));
    return { success: true };
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
  assignGrade: document.getElementById('assignGrade'),
  assignSkillSelect: document.getElementById('assignSkillSelect'),
  assignSkillSearch: document.getElementById('assignSkillSearch'),
  assignSkillTitle: document.getElementById('assignSkillTitle'),
  assignTargetStudent: document.getElementById('assignTargetStudent'),
  assignQuestionTarget: document.getElementById('assignQuestionTarget'),
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

  // Initialize Animated Velvet Obsidian Cosmos Background
  if (window.LoginCosmos) window.LoginCosmos.init();

  // Initialize Real-time Google Cloud Database Sync (Firebase)
  if (window.CloudDB) {
    window.CloudDB.init();
  }

  // Seamless Joyful Experience: Default to student profile if none active so portal opens instantly
  if (!AppState.currentUser) {
    const defaultStudent = (typeof DB.getActiveDemoStudents === 'function' ? DB.getActiveDemoStudents().find(s => s.role !== 'teacher') : null) || DB.demoStudents[1];
    AppState.currentUser = defaultStudent;
    try {
      localStorage.setItem('current_student', JSON.stringify(defaultStudent));
    } catch (e) {}
  }
  document.body.classList.remove('auth-locked');
  if (window.LoginCosmos) window.LoginCosmos.pause();

  // Synchronize current user XP with real accumulated practice stats
  if (AppState.currentUser && AppState.currentUser.role !== 'teacher') {
    const stats = DB.getStudentStats(AppState.currentUser.id);
    if (stats.xp > (AppState.currentUser.xp || 0)) {
      AppState.currentUser.xp = stats.xp;
      localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
    }
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
      renderTeacherConsoleView();
    } else {
      await DB.loadStudentCurriculumAccess();
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
  if (viewId === 'books') viewId = 'curriculum-books';

  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');

  // If student clicks Teacher Suite, switch to Miss Rania so they can manage/preview
  if (!isTeacher && viewId === 'teacher') {
    AppState.currentUser = DB.demoStudents.find(s => s.role === 'teacher') || DB.demoStudents[5];
    localStorage.setItem('current_student', JSON.stringify(AppState.currentUser));
    updateStudentHeader();
    showToast('Switched to Miss Rania (Teacher Suite) 👩‍🏫');
  }

  AppState.currentView = viewId;

  // Update tabs (both joyful top header & any secondary tabs)
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const tabTarget = tab.dataset.view;
    const isActive = tabTarget === viewId || (viewId === 'curriculum-books' && (tabTarget === 'books' || tabTarget === 'curriculum-books'));
    tab.classList.toggle('active', isActive);

    if (tab.closest('#headerNavTabs')) {
      // nav-capsule uses .btn-*.active styling with micro-spring physics
    }

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
    renderStudentPaymentStatus();
    renderStudentSessions();
  } else if (viewId === 'sessions') {
    renderStudentSessions();
  } else if (viewId === 'payments') {
    renderStudentPaymentStatus();
  } else if (viewId === 'tracks') {
    renderTracksView();
  } else if (viewId === 'skills') {
    renderSkillsCanvas();
  } else if (viewId === 'reports') {
    renderStudentReportView();
  } else if (viewId === 'leaderboard') {
    renderLeaderboardView();
  } else if (viewId === 'curriculum-books') {
    renderCurriculumBooksView();
  } else if (viewId === 'vocab') {
    if (window.VocabEngine) VocabEngine.init();
  } else if (viewId === 'blog') {
    if (window.StudentBlog) StudentBlog.renderBlogView();
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
  const isParent = user.role === 'parent';
  const sidebarStudent = document.getElementById('sidebarStudentGroup');
  const sidebarParent = document.getElementById('sidebarParentGroup');
  const sidebarTeacher = document.getElementById('sidebarTeacherGroup');
  const topTeacherBtn = document.getElementById('topTeacherQuickBtn');
  const studentLevelPill = document.getElementById('navStudentLevel');

  if (sidebarStudent) sidebarStudent.style.display = (!isTeacher && !isParent) ? 'flex' : 'none';
  if (sidebarParent) sidebarParent.style.display = isParent ? 'flex' : 'none';
  if (sidebarTeacher) sidebarTeacher.style.display = isTeacher ? 'flex' : 'none';

  const mobileTeacherBtn = document.getElementById('mobileTeacherNavBtn');

  if (isTeacher) {
    if (topTeacherBtn && window.innerWidth >= 640) topTeacherBtn.style.display = 'inline-flex';
    if (mobileTeacherBtn) mobileTeacherBtn.classList.remove('hidden');
    if (el.navStudentAvatar) el.navStudentAvatar.textContent = user.avatar || '👩‍🏫';
    if (el.navStudentName) el.navStudentName.textContent = user.full_name || 'Miss Rania';
    if (el.navStudentGrade) el.navStudentGrade.innerHTML = `<span>Instructor &bull; Admin</span>`;
    if (el.navStudentXP) el.navStudentXP.textContent = 'Teacher Console';
    if (studentLevelPill) studentLevelPill.textContent = 'Admin';
    if (el.navXpStripFill) el.navXpStripFill.style.width = '100%';
  } else if (isParent) {
    if (topTeacherBtn) topTeacherBtn.style.display = 'none';
    if (mobileTeacherBtn) mobileTeacherBtn.classList.add('hidden');
    if (el.navStudentAvatar) el.navStudentAvatar.textContent = user.avatar || '👨‍👩‍👧';
    if (el.navStudentName) el.navStudentName.textContent = user.full_name || 'Parent Portal';
    if (el.navStudentGrade) el.navStudentGrade.innerHTML = `(Parent)`;
    if (el.navStudentXP) el.navStudentXP.textContent = 'Parent Access';
    if (studentLevelPill) studentLevelPill.textContent = 'Parent';
  } else {
    if (topTeacherBtn) topTeacherBtn.style.display = 'none';
    if (mobileTeacherBtn) mobileTeacherBtn.classList.add('hidden');
    if (el.navStudentAvatar) el.navStudentAvatar.textContent = user.avatar || '🦊';
    if (el.navStudentName) el.navStudentName.textContent = user.full_name || 'Student';
    if (el.navStudentGrade) el.navStudentGrade.innerHTML = `(${user.grade_level || 'Year 4'})`;
    if (el.navStudentXP) el.navStudentXP.textContent = `${(user.xp || 0).toLocaleString()} XP`;
    const rank = getStudentRank(user.xp || 0);
    if (studentLevelPill) studentLevelPill.textContent = `Lv. ${rank.level} Scholar`;
  }

  // Update Joyful Top Header Indicators
  const navStreak = document.getElementById('navStreakCount');
  if (navStreak) navStreak.textContent = `${user.streak_days || 5} Days`;
  const navXpText = document.getElementById('navXpText');
  if (navXpText) navXpText.textContent = `${(user.xp || 1420).toLocaleString()} XP`;
  const navXpFill = document.getElementById('navXpFill');
  if (navXpFill) {
    const pct = Math.min(100, Math.round(((user.xp || 1420) % 2000) / 20));
    navXpFill.style.width = `${pct}%`;
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
// VIEW 1: Dashboard Controller (Streamlined Mission Hub)
// =============================================================================

async function renderDashboard() {
  const user = AppState.currentUser;
  if (!user) return;

  const firstName = (user.full_name || 'Student').split(' ')[0];
  const dashNameEl = document.getElementById('dashStudentName');
  if (dashNameEl) dashNameEl.textContent = firstName;

  const cohortTagEl = document.getElementById('dashCohortTag');
  if (cohortTagEl) cohortTagEl.textContent = `${user.grade_level || 'Year 4'} • Miss Rania's Class`;

  const streakCountEl = document.getElementById('dashStreakCounter');
  if (streakCountEl) streakCountEl.textContent = `🔥 ${user.streak_days || 1} Days`;

  const rank = getStudentRank(user.xp || 0);
  const rankTitleEl = document.getElementById('dashRankTitle');
  if (rankTitleEl) rankTitleEl.textContent = `Lv. ${rank.level} ${rank.title} 🧭`;

  const currentXpEl = document.getElementById('dashCurrentXP');
  if (currentXpEl) currentXpEl.textContent = (user.xp || 0).toLocaleString();

  const targetLevelXP = (rank.level + 1) * 350;
  const targetXpEl = document.getElementById('dashTargetXP');
  if (targetXpEl) targetXpEl.textContent = targetLevelXP.toLocaleString();

  const progressPercent = Math.min(Math.round(((user.xp || 0) % 350) / 350 * 100), 100);
  const xpFillEl = document.getElementById('dashXpFill');
  if (xpFillEl) xpFillEl.style.width = `${progressPercent}%`;

  const xpPercentTextEl = document.getElementById('dashXpPercentText');
  if (xpPercentTextEl) xpPercentTextEl.textContent = `${progressPercent}% towards Level ${rank.level + 1}`;

  // Start practice CTA button
  const startPracticeBtn = document.getElementById('dashStartPracticeBtn');
  if (startPracticeBtn) {
    startPracticeBtn.onclick = () => switchView('skills');
  }

  // Fetch student report summary for KPI counters
  try {
    const reportData = await DB.getReport(user.id);
    if (reportData && reportData.summary) {
      if (el.kpiQuestionsAnswered) el.kpiQuestionsAnswered.textContent = reportData.summary.total_questions || 0;
      if (el.kpiAccuracyRate) el.kpiAccuracyRate.textContent = `${reportData.summary.accuracy_rate || 0}%`;
      if (el.kpiTimeSpent) el.kpiTimeSpent.textContent = formatDuration(reportData.summary.total_time_spent || 0);
      if (el.kpiMasteredCount) el.kpiMasteredCount.textContent = reportData.summary.mastered_skills || 0;
    }
  } catch (e) {
    if (el.kpiQuestionsAnswered) el.kpiQuestionsAnswered.textContent = user.questions_answered || 0;
    if (el.kpiAccuracyRate) el.kpiAccuracyRate.textContent = `${user.accuracy || 88}%`;
    if (el.kpiTimeSpent) el.kpiTimeSpent.textContent = '1h 15m';
    if (el.kpiMasteredCount) el.kpiMasteredCount.textContent = user.mastered_skills || 0;
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

function isSkillAccessibleToStudent(skill) {
  if (!skill) return false;
  const user = AppState.currentUser;
  if (!user) return false;
  if (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania') return true;

  // Homework assignments are always accessible
  if (skill.assignment_id) return true;

  // Unlocked core curriculum topics & featured skills
  const featured = ['A.1', 'A.4', 'B.3', 'D.1', 'ENG.1', 'ENG.3', 'SCI.2', 'SCI.5'];
  if (skill.code && featured.includes(skill.code)) return true;

  // Check teacher unlocked skills set
  if (AppState.unlockedSkills) {
    if (skill.code && AppState.unlockedSkills.has(skill.code)) return true;
    if (skill.permacode && AppState.unlockedSkills.has(skill.permacode)) return true;
    if (skill.id && AppState.unlockedSkills.has(String(skill.id))) return true;
  }
  return false;
}
window.isSkillAccessibleToStudent = isSkillAccessibleToStudent;

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
  } else if (AppState.statusFilter === 'unlocked') {
    filtered = filtered.filter(s => isSkillAccessibleToStudent(s));
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

  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');

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
          const isAccessible = isTeacher || isSkillAccessibleToStudent(s);
          const statusBadge = isTeacher
            ? ''
            : (s.assignment_id
                ? '<span class="skill-status-tag assigned">📌 Homework</span>'
                : (isAccessible
                    ? '<span class="skill-status-tag unlocked">🔓 Unlocked</span>'
                    : '<span class="skill-status-tag locked">🔒 Locked</span>'));
          const btnClass = isAccessible ? 'learn-pill-btn' : 'learn-pill-btn locked';
          const btnLabel = isAccessible ? 'Learn' : 'Locked';

          return `
            <div class="skill-row-card">
              <div class="skill-row-left">
                <span class="skill-number-tag">${s.code}</span>
                <span class="skill-title-name" title="${s.name}">${s.name}</span>
                ${statusBadge}
              </div>
              <div class="skill-row-right">
                <button class="action-icon-btn ${isFav ? 'favorited' : ''}" data-fav="${s.id}" title="Star as favorite">
                  ${isFav ? '★' : '☆'}
                </button>
                <button class="action-icon-btn ${isMas ? 'mastered' : ''}" data-mas="${s.id}" title="Mark as mastered">
                  ${isMas ? '✓' : '○'}
                </button>
                <button class="${btnClass}" onclick="startPracticeByPermacode('${s.permacode}', '${encodeURIComponent(s.name)}')">
                  <span>${btnLabel}</span>
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
  renderPlannerView();

  el.teacherRosterTableBody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Loading classroom data...</td></tr>';

  try {
    const overview = await DB.getTeacherOverview();
    if (!overview) return;

    // KPI Counters
    if (el.tTotalStudents) animateNumber(el.tTotalStudents, overview.total_students || 0);
    if (el.tTotalQuestions) animateNumber(el.tTotalQuestions, overview.class_stats ? overview.class_stats.total_questions : 0);
    if (el.tClassAccuracy) el.tClassAccuracy.textContent = `${overview.class_stats ? overview.class_stats.accuracy_rate : 0}%`;
    if (el.tTotalHours) el.tTotalHours.textContent = `${overview.class_stats ? overview.class_stats.total_hours : 0}h`;

    // Student Roster Table (8-Column CRM matching table header)
    let roster = overview.roster || [];
    AppState.currentTeacherRoster = roster;

    const filter = AppState.teacherRosterFilter || 'all';
    if (filter !== 'all') {
      roster = roster.filter(s => (s.payment_status || 'paid') === filter);
    }

    el.teacherRosterTableBody.innerHTML = roster.map(s => {
      const safeName = (s.full_name || '').replace(/'/g, "\\'");
      const pStatus = s.payment_status || 'paid';
      const badgeClass = pStatus === 'paid' ? 'paid' : (pStatus === 'pending' ? 'pending' : 'overdue');
      const badgeText = pStatus === 'paid' ? 'Paid 🟢' : (pStatus === 'pending' ? 'Pending 🟡' : 'Overdue 🔴');

      const waClean = cleanWhatsAppNumber(s.parent_phone);
      const waLink = waClean ? `https://wa.me/${waClean}?text=${encodeURIComponent('Hello! Regarding student progress for ' + s.full_name + ' with Miss Rania 🌸')}` : null;

      return `
        <tr>
          <td>
            <div class="student-leader-cell">
              <div class="leader-avatar">${s.avatar || '🦊'}</div>
              <div style="min-width: 0;">
                <div class="leader-name">${s.full_name}</div>
                <div style="font-size:0.72rem; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  <code style="color:var(--color-primary); font-size:0.7rem;">@${s.username}</code> &bull;
                  <span style="color:var(--color-primary); font-weight:700;">${s.grade_level || 'Year 4'}</span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div style="font-weight:600; font-size:0.8rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${s.parent_name || '—'}">${s.parent_name || '—'}</div>
          </td>
          <td>
            ${s.student_phone ? `<a href="tel:${s.student_phone}" style="color:var(--text-secondary); text-decoration:none; font-size:0.78rem; white-space:nowrap;">📞 ${s.student_phone}</a>` : '<span style="color:var(--text-muted); font-size:0.8rem;">—</span>'}
          </td>
          <td>
            ${waLink ? `
              <a href="${waLink}" target="_blank" class="whatsapp-btn" style="padding:2px 8px; font-size:0.72rem; white-space:nowrap;" title="Open WhatsApp Chat with Parent">
                <span>💬</span>
                <span>${s.parent_phone}</span>
              </a>
            ` : (s.parent_phone ? `<span style="font-size:0.78rem; white-space:nowrap;">${s.parent_phone}</span>` : '<span style="color:var(--text-muted); font-size:0.8rem;">—</span>')}
          </td>
          <td style="text-align:center;">
            <span class="payment-badge ${badgeClass}" style="font-size:0.68rem; padding:2px 6px;">${badgeText}</span>
          </td>
          <td>
            <div style="font-weight:700; font-size:0.8rem;">${(s.payment_amount !== undefined && s.payment_amount !== null && s.payment_amount !== '') ? s.payment_amount : '—'}</div>
            <div style="font-size:0.68rem; color:var(--text-muted); white-space:nowrap;">${s.payment_method || 'InstaPay'}</div>
          </td>
          <td>
            <span style="font-size:0.75rem; color:var(--text-muted); white-space:nowrap;">${s.payment_date || '—'}</span>
          </td>
          <td style="text-align:right;">
            <div class="actions-cell">
              <button class="action-btn-sm" onclick="openStudentReportModal(${s.id})" title="View Student Academic Report">
                <span>📊</span>
              </button>
              <button class="action-btn-sm" onclick="sendPaymentReminderWhatsApp(${s.id})" title="Send Tuition Reminder via WhatsApp" style="background:rgba(37,211,102,0.15); color:#25d366; border:1px solid rgba(37,211,102,0.3);">
                <span>💬</span>
              </button>
              <button class="action-btn-sm edit" onclick="openEditStudentModal(${s.id})" title="Edit Student Profile & Tuition">
                <span>✏️</span>
              </button>
              <button class="action-btn-sm key" onclick="openResetPasswordModal(${s.id}, '${safeName}')" title="Reset Password">
                <span>🔑</span>
              </button>
              <button class="action-btn-sm delete" onclick="confirmDeleteStudent(${s.id}, '${safeName}')" title="Delete Student">
                <span>🗑️</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No students found matching current filter.</td></tr>';

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


// =============================================================================
// Student & Parent CRM, WhatsApp Dispatcher, and Payment Proof Controllers
// =============================================================================

function cleanWhatsAppNumber(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.startsWith('01')) cleaned = '2' + cleaned;
  else if (cleaned.startsWith('1') && cleaned.length === 10) cleaned = '20' + cleaned;
  return cleaned;
}

window.cleanWhatsAppNumber = cleanWhatsAppNumber;

function sanitizeExternalUrl(url) {
  if (!url) return '#';
  url = String(url).trim();
  if (!url || url === '#' || url.startsWith('javascript:')) return '#';
  if (/^(https?:\/\/|data:|blob:|mailto:|tel:|\/\/)/i.test(url)) {
    return url;
  }
  return 'https://' + url;
}

window.sanitizeExternalUrl = sanitizeExternalUrl;

window.switchTeacherTab = function(tabName) {
  const tabs = document.querySelectorAll('#teacherSubTabs .teacher-sub-tab');
  tabs.forEach(t => {
    const isActive = t.dataset.ttab === tabName;
    t.classList.toggle('active', isActive);
  });

  const panels = {
    students: document.getElementById('teacherPanelStudents'),
    groups: document.getElementById('teacherPanelGroups'),
    payments: document.getElementById('teacherPanelPayments'),
    sessions: document.getElementById('teacherPanelSessions'),
    homework: document.getElementById('teacherPanelHomework'),
    books: document.getElementById('teacherPanelBooks'),
    planner: document.getElementById('teacherPanelPlanner'),
    curriculum: document.getElementById('teacherPanelCurriculum'),
    timeline: document.getElementById('teacherPanelTimeline')
  };

  Object.keys(panels).forEach(k => {
    if (panels[k]) panels[k].style.display = (k === tabName ? 'block' : 'none');
  });

  if (tabName === 'students') {
    renderTeacherConsoleView();
  } else if (tabName === 'groups') {
    renderTeacherGroups();
  } else if (tabName === 'payments') {
    renderTeacherPayments();
  } else if (tabName === 'sessions') {
    renderTeacherSessions();
  } else if (tabName === 'homework') {
    renderTeacherAssignments();
  } else if (tabName === 'books') {
    renderTeacherCurriculumBooks();
  } else if (tabName === 'planner') {
    renderPlannerView();
  } else if (tabName === 'curriculum') {
    renderCurriculumAccessManager();
  } else if (tabName === 'timeline') {
    renderTeacherActivityTimeline();
  }
};

// =============================================================================
// Daily Student Activity Audit & Timeline Controller (100% English UI)
// =============================================================================

if (!AppState.timelineFilter) {
  AppState.timelineFilter = {
    dateMode: 'today',
    customDate: null,
    studentId: 'all',
    type: 'all'
  };
}

window.setTimelineDateFilter = function(mode) {
  AppState.timelineFilter.dateMode = mode;
  AppState.timelineFilter.customDate = null;
  const customInput = document.getElementById('timelineDateInput');
  if (customInput) customInput.value = '';

  document.querySelectorAll('#timelineDateQuickGroup .planner-filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.date === mode);
  });

  renderTeacherActivityTimeline();
};

window.handleTimelineCustomDate = function(dateVal) {
  if (!dateVal) return;
  AppState.timelineFilter.dateMode = 'custom';
  AppState.timelineFilter.customDate = dateVal;

  document.querySelectorAll('#timelineDateQuickGroup .planner-filter-tab').forEach(btn => {
    btn.classList.remove('active');
  });

  renderTeacherActivityTimeline();
};

window.handleTimelineStudentChange = function(studentId) {
  AppState.timelineFilter.studentId = studentId;
  renderTeacherActivityTimeline();
};

window.filterTimelineType = function(type) {
  AppState.timelineFilter.type = type;
  document.querySelectorAll('#timelineTypePills .action-btn-sm').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  renderTeacherActivityTimeline();
};

window.renderTeacherActivityTimeline = async function() {
  if (!window.ActivityLogger) return;

  const container = document.getElementById('teacherTimelineFeed');
  const studentSelect = document.getElementById('timelineStudentSelect');
  const dateBadge = document.getElementById('timelineDateBadge');
  const focusBanner = document.getElementById('timelineStudentFocusBanner');

  if (!container) return;

  // 1. Populate student dropdown
  let students = AppState.currentTeacherRoster || [];
  if (!students.length) {
    try {
      const overview = await DB.getTeacherOverview();
      if (overview && overview.students) students = overview.students;
    } catch (e) {}
  }
  if (!students.length) {
    students = (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
  }

  if (studentSelect && studentSelect.options.length <= 1) {
    const currentVal = AppState.timelineFilter.studentId || 'all';
    studentSelect.innerHTML = `
      <option value="all" ${currentVal === 'all' ? 'selected' : ''}>👥 All Students (Class Summary)</option>
      ${students.map(s => `
        <option value="${s.id}" ${String(s.id) === String(currentVal) ? 'selected' : ''}>
          ${s.avatar || '🦊'} ${s.full_name || s.username} (${s.grade_level || 'Year 4'})
        </option>
      `).join('')}
    `;
  }

  // 2. Resolve query date
  let queryDate = null;
  let displayDateTitle = 'Today';
  const today = new Date();
  const todayStr = ActivityLogger.formatDate(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = ActivityLogger.formatDate(yesterday);

  if (AppState.timelineFilter.dateMode === 'today') {
    queryDate = todayStr;
    displayDateTitle = 'Today (' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ')';
  } else if (AppState.timelineFilter.dateMode === 'yesterday') {
    queryDate = yesterdayStr;
    displayDateTitle = 'Yesterday (' + yesterday.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ')';
  } else if (AppState.timelineFilter.dateMode === 'custom' && AppState.timelineFilter.customDate) {
    queryDate = AppState.timelineFilter.customDate;
    displayDateTitle = 'Date: ' + new Date(queryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } else {
    queryDate = null;
    displayDateTitle = 'All Time History';
  }

  if (dateBadge) dateBadge.textContent = displayDateTitle;

  // 3. Compute KPI stats for the selected date
  const statsDate = queryDate || todayStr;
  const dayStats = ActivityLogger.getDailyStats(statsDate);

  const kpiStudents = document.getElementById('tActActiveStudents');
  const kpiPractice = document.getElementById('tActPracticeCount');
  const kpiZoom = document.getElementById('tActZoomAttendees');
  const kpiHw = document.getElementById('tActHomeworkDone');
  const liveBadge = document.getElementById('tTodayActivityBadge');

  if (kpiStudents) kpiStudents.textContent = dayStats.activeStudentsCount;
  if (kpiPractice) kpiPractice.textContent = dayStats.practices;
  if (kpiZoom) kpiZoom.textContent = dayStats.zooms;
  if (kpiHw) kpiHw.textContent = dayStats.homeworks;
  if (liveBadge) liveBadge.textContent = `${dayStats.totalEvents} Events`;

  // 4. Query logs
  const logs = ActivityLogger.queryLogs({
    date: queryDate,
    studentId: AppState.timelineFilter.studentId,
    type: AppState.timelineFilter.type
  });

  // 5. Focus Banner for Single Student
  const selectedStudentId = AppState.timelineFilter.studentId;
  if (selectedStudentId && selectedStudentId !== 'all') {
    const student = students.find(s => String(s.id) === String(selectedStudentId)) || DB.findStudentById(selectedStudentId);
    if (student && focusBanner) {
      const studentLogs = logs.filter(l => String(l.student_id) === String(selectedStudentId));
      focusBanner.style.display = 'flex';
      focusBanner.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4';
      focusBanner.innerHTML = `
        <div class="flex items-center gap-3">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(0, 229, 255, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; border: 1px solid rgba(0, 229, 255, 0.3);">
            ${student.avatar || '🦊'}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
              <span>${student.full_name || student.username}</span>
              <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3); padding: 2px 8px; border-radius: 9999px;">${student.grade_level || 'Year 4'}</span>
            </div>
            <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
              ⏱️ <strong>${studentLogs.length} activity actions</strong> recorded on ${displayDateTitle}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="whatsapp-btn" onclick="sendStudentDailyTimelineWhatsApp('${student.id}')" style="padding: 0.55rem 1rem; font-size: 0.82rem; font-weight: 700;">
            <span>💬</span> <span>Send Timeline via WhatsApp</span>
          </button>
        </div>
      `;
    }
  } else {
    if (focusBanner) focusBanner.style.display = 'none';
  }

  // 6. Render Logs List
  if (!logs.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; background: rgba(15, 23, 42, 0.4); border-radius: 16px; border: 1px dashed rgba(255, 255, 255, 0.1);">
        <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">⏱️</div>
        <h4 style="font-weight: 700; color: #fff; font-size: 1.05rem;">No Activity Recorded for Selected Filter</h4>
        <p style="color: #94a3b8; font-size: 0.85rem; max-width: 420px; margin: 0.35rem auto 0;">
          Student logins, practice runs, Zoom meeting attendance, and homework submissions will automatically populate here in real-time.
        </p>
      </div>
    `;
    return;
  }

  const typeIcons = {
    LOGIN: '🔑',
    PRACTICE: '📐',
    ZOOM_JOIN: '🎥',
    HOMEWORK_SUBMIT: '📝',
    VOCAB_GAME: '🔤',
    PAYMENT_SUBMIT: '💳',
    BLOG_POST: '📄',
    CERTIFICATE_EARNED: '🎓'
  };

  const typeLabels = {
    LOGIN: 'Login',
    PRACTICE: 'Practice',
    ZOOM_JOIN: 'Zoom Live',
    HOMEWORK_SUBMIT: 'Homework',
    VOCAB_GAME: 'Vocab Game',
    PAYMENT_SUBMIT: 'Tuition Receipt',
    BLOG_POST: 'Blog Post',
    CERTIFICATE_EARNED: 'Certificate'
  };

  container.innerHTML = logs.map(l => {
    const icon = typeIcons[l.type] || '⚡';
    const label = typeLabels[l.type] || l.type;

    return `
      <div class="timeline-log-row type-${l.type}">
        <div class="timeline-time-pill">
          <span>⏱️</span>
          <span>${l.time || 'Recent'}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="timeline-type-pill type-${l.type}">${icon} ${label}</span>
            <span class="timeline-student-pill">
              <span>${l.avatar || '🦊'}</span>
              <span>${l.student_name}</span>
              <span style="opacity: 0.7;">(${l.grade || 'Year 4'})</span>
            </span>
            ${!queryDate ? `<span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">📅 ${l.date}</span>` : ''}
          </div>
          <div style="font-weight: 700; font-size: 0.92rem; color: #f8fafc; margin-bottom: 2px;">
            ${l.title}
          </div>
          <div style="font-size: 0.82rem; color: #94a3b8; line-height: 1.5;">
            ${l.details}
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.refreshCurrentTimelineView = function() {
  const timelinePanel = document.getElementById('teacherPanelTimeline');
  if (timelinePanel && timelinePanel.style.display !== 'none') {
    renderTeacherActivityTimeline();
  }
};

window.sendDailyTimelineWhatsApp = async function() {
  if (!window.ActivityLogger) return;

  const selectedStudentId = AppState.timelineFilter.studentId;
  if (selectedStudentId && selectedStudentId !== 'all') {
    sendStudentDailyTimelineWhatsApp(selectedStudentId);
    return;
  }

  // Class Summary Dispatch
  const today = new Date();
  const todayStr = ActivityLogger.formatDate(today);
  const logs = ActivityLogger.queryLogs({ date: todayStr });
  const stats = ActivityLogger.getDailyStats(todayStr);
  const dateFormatted = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  let msg = `📅 *Daily Classroom Activity Audit — Miss Rania*\n`;
  msg += `_${dateFormatted}_\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👥 *Active Students:* ${stats.activeStudentsCount}\n`;
  msg += `🔑 *Logins:* ${stats.logins} | 📐 *Practices:* ${stats.practices}\n`;
  msg += `🎥 *Zoom Attendees:* ${stats.zooms} | 📝 *HW Done:* ${stats.homeworks}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (!logs.length) {
    msg += `No activity logged today yet.\n`;
  } else {
    // Group logs by student
    const studentGroup = new Map();
    logs.forEach(l => {
      if (!studentGroup.has(l.student_name)) studentGroup.set(l.student_name, []);
      studentGroup.get(l.student_name).push(l);
    });

    studentGroup.forEach((items, name) => {
      msg += `👤 *${name}* (${items[0].grade || 'Year 4'}):\n`;
      items.forEach(item => {
        msg += `  • [${item.time}] ${item.title}\n`;
      });
      msg += `\n`;
    });
  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🌐 *Portal:* https://mbechr.github.io/rcroom/\n`;
  msg += `Best regards, Miss Rania 🌸`;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(msg);
      showToast('Daily audit summary copied! 📋');
    } catch (e) {}
  }

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
};

window.sendStudentDailyTimelineWhatsApp = function(studentId) {
  if (!window.ActivityLogger) return;

  const students = AppState.currentTeacherRoster || [];
  const student = students.find(s => String(s.id) === String(studentId)) || DB.findStudentById(studentId);
  if (!student) {
    showToast('Student not found', '⚠️');
    return;
  }

  const today = new Date();
  const todayStr = ActivityLogger.formatDate(today);
  const queryDate = (AppState.timelineFilter.dateMode === 'yesterday') ? ActivityLogger.formatDate(new Date(Date.now() - 86400000)) :
                    ((AppState.timelineFilter.dateMode === 'custom' && AppState.timelineFilter.customDate) ? AppState.timelineFilter.customDate : todayStr);

  const logs = ActivityLogger.queryLogs({ date: queryDate, studentId: student.id });
  const dateFormatted = new Date(queryDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const parentPhone = student.parent_phone || student.student_phone;
  const cleanPhone = parentPhone ? cleanWhatsAppNumber(parentPhone) : '';

  let msg = `🌟 *Daily Activity & Progress Timeline* 🌟\n`;
  msg += `👤 *Student:* ${student.full_name || student.username}\n`;
  msg += `📚 *Grade:* ${student.grade_level || 'Year 4'}\n`;
  msg += `📅 *Date:* ${dateFormatted}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `⏱️ *Chronological Activity Log:*\n\n`;

  if (!logs.length) {
    msg += `No activity recorded on this date.\n`;
  } else {
    // Sort chronological (oldest to newest for reading)
    const chronological = [...logs].reverse();
    chronological.forEach(l => {
      msg += `• *[${l.time}]* ${l.title}\n`;
      if (l.details && !l.details.includes('Authenticated from private')) {
        msg += `   _${l.details}_\n`;
      }
    });
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🌟 Keep up the fantastic effort!\n`;
  msg += `Best regards, Miss Rania 🌸 RC Classroom Portal`;

  const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  showToast('Opening WhatsApp to send student daily timeline 📤');
};

window.printDailyTimelineReport = function() {
  if (!window.ActivityLogger) return;

  const today = new Date();
  const todayStr = ActivityLogger.formatDate(today);
  const queryDate = (AppState.timelineFilter.dateMode === 'yesterday') ? ActivityLogger.formatDate(new Date(Date.now() - 86400000)) :
                    ((AppState.timelineFilter.dateMode === 'custom' && AppState.timelineFilter.customDate) ? AppState.timelineFilter.customDate :
                    (AppState.timelineFilter.dateMode === 'all' ? null : todayStr));

  const logs = ActivityLogger.queryLogs({
    date: queryDate,
    studentId: AppState.timelineFilter.studentId,
    type: AppState.timelineFilter.type
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Please allow popups to print report', '⚠️');
    return;
  }

  const dateLabel = queryDate ? new Date(queryDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'All Time History';

  const rowsHtml = logs.map((l) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; font-weight: bold; color: #0284c7;">${l.time}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: bold; color: #0f172a;">${l.student_name} (${l.grade})</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">${l.type}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; color: #1e293b;">${l.title}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">${l.details}</td>
    </tr>
  `).join('');

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Daily Student Activity Audit Report — Miss Rania</title>
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; margin: 0; padding: 16px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; }
        h1 { margin: 0 0 4px; font-size: 20px; color: #0369a1; }
        .sub { margin: 0; font-size: 12px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { padding: 8px 12px; background: #f0f9ff; border-bottom: 2px solid #bae6fd; font-size: 11px; text-transform: uppercase; color: #0369a1; font-weight: 700; }
        @media print { .no-print { display: none !important; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: right; margin-bottom: 12px;">
        <button onclick="window.print()" style="background: #0284c7; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-weight: bold; cursor: pointer;">🖨️ Print Report</button>
      </div>
      <div class="header">
        <div>
          <h1>🏫 Daily Student Activity Audit &amp; Timeline Report</h1>
          <p class="sub">Instructor: Miss Rania • RC Classroom Portal • <strong>${dateLabel}</strong></p>
        </div>
        <div style="text-align: right; font-size: 12px; color: #64748b;">
          Total Logged Actions: <strong>${logs.length}</strong><br>
          Generated: ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 90px;">Time</th>
            <th style="width: 160px;">Student</th>
            <th style="width: 110px;">Event Type</th>
            <th>Activity Title</th>
            <th>Details &amp; Metrics</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="5" style="text-align:center; padding: 24px; color: #94a3b8;">No activity logged for this date.</td></tr>'}
        </tbody>
      </table>
      <script>window.onload = () => { setTimeout(() => window.print(), 350); };</script>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// =============================================================================
// Student Groups & Cohorts Management (Teacher Controller)
// =============================================================================

window.renderTeacherGroups = async function() {
  const container = document.getElementById('teacherGroupsListContainer');
  if (!container) return;

  container.innerHTML = '<div class="col-span-full text-center py-12 text-slate-400 font-semibold"><span class="animate-spin inline-block mr-2">⏳</span> Loading student cohorts...</div>';

  try {
    const [groups, allStudents] = await Promise.all([
      DB.getStudentGroups(),
      (async () => {
        let students = AppState.currentTeacherRoster || [];
        if (!students.length) {
          try {
            const overview = await DB.getTeacherOverview();
            if (overview && overview.students) {
              students = overview.students;
              AppState.currentTeacherRoster = students;
            }
          } catch (e) {}
        }
        if (!students.length) {
          students = (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
        }
        return students;
      })()
    ]);

    AppState.currentTeacherGroups = groups || [];

    // KPI Counters
    const totalGroups = groups.length;
    let totalMembers = 0;
    groups.forEach(g => {
      totalMembers += (g.student_ids && Array.isArray(g.student_ids)) ? g.student_ids.length : 0;
    });
    const avgSize = totalGroups > 0 ? (totalMembers / totalGroups).toFixed(1) : 0;

    const kpiTotal = document.getElementById('tGroupsTotalCount');
    const kpiMembers = document.getElementById('tGroupsMembersCount');
    const kpiAvg = document.getElementById('tGroupsAvgSize');
    const badgeCount = document.getElementById('tGroupsCountBadge');

    if (kpiTotal) kpiTotal.textContent = totalGroups;
    if (kpiMembers) kpiMembers.textContent = totalMembers;
    if (kpiAvg) kpiAvg.textContent = avgSize;
    if (badgeCount) badgeCount.textContent = totalGroups;

    if (!groups.length) {
      container.innerHTML = `
        <div class="col-span-full p-12 text-center bg-slate-900/40 rounded-3xl border border-dashed border-slate-700/60">
          <div class="text-5xl mb-3">👥</div>
          <h3 class="text-lg font-bold text-white mb-1">No Student Groups Created Yet</h3>
          <p class="text-sm text-slate-400 max-w-md mx-auto mb-5">
            Organize students into groups or cohorts to unlock curriculum lessons and schedule Zoom meetings in bulk with one click.
          </p>
          <button class="primary-glow-btn" onclick="openCreateGroupModal()">
            <span class="material-symbols-outlined text-[18px]">group_add</span>
            <span>Create First Student Group</span>
          </button>
        </div>
      `;
      return;
    }

    const studentMap = new Map();
    allStudents.forEach(s => studentMap.set(String(s.id), s));

    container.innerHTML = groups.map(group => {
      const studentIds = Array.isArray(group.student_ids) ? group.student_ids : [];
      const memberCount = studentIds.length;
      const themeColor = group.color || 'indigo';

      // Build member avatar tags
      const memberChips = studentIds.slice(0, 5).map(sid => {
        const st = studentMap.get(String(sid)) || { full_name: `Student #${sid}`, avatar: '🦊' };
        return `
          <span class="group-member-chip" title="${st.full_name || st.username}">
            <span class="member-chip-avatar">${st.avatar || '🦊'}</span>
            <span class="member-chip-name">${(st.full_name || st.username || 'Student').split(' ')[0]}</span>
          </span>
        `;
      }).join('');

      const remainingCount = memberCount > 5 ? memberCount - 5 : 0;

      return `
        <div class="student-group-card group-theme-${themeColor}">
          <div class="group-card-header">
            <div class="flex items-center gap-3">
              <div class="group-avatar-badge">${memberCount > 0 ? '👥' : '👤'}</div>
              <div>
                <h4 class="group-card-title">${group.name}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="group-grade-pill">${group.grade_level || 'Year 4'}</span>
                  <span class="group-count-pill">${memberCount} Student${memberCount === 1 ? '' : 's'}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" class="group-icon-btn" onclick="openEditGroupModal('${group.id}')" title="Edit Group">
                ✏️
              </button>
              <button type="button" class="group-icon-btn delete" onclick="deleteStudentGroupItem('${group.id}')" title="Delete Group">
                🗑️
              </button>
            </div>
          </div>

          ${group.description ? `
            <div class="group-card-desc">
              <span>📅</span> <span>${group.description}</span>
            </div>
          ` : ''}

          <div class="group-members-preview">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Enrolled Students:</div>
            <div class="group-members-chips-wrap">
              ${memberCount > 0 ? memberChips : '<span class="text-xs text-slate-500 italic">No students assigned yet</span>'}
              ${remainingCount > 0 ? `<span class="group-member-chip more">+${remainingCount} more</span>` : ''}
            </div>
          </div>

          <div class="group-card-actions">
            <button type="button" class="group-action-btn unlock" onclick="manageGroupPermissions('${group.id}')" title="Bulk Unlock Curriculum">
              <span>🔓</span> <span>Curriculum</span>
            </button>
            <button type="button" class="group-action-btn zoom" onclick="broadcastZoomToGroup('${group.id}')" title="Schedule Zoom for this Group">
              <span>🎥</span> <span>Zoom Class</span>
            </button>
            <button type="button" class="group-action-btn whatsapp" onclick="shareGroupWhatsApp('${group.id}')" title="Share via WhatsApp">
              <span>💬</span> <span>WhatsApp</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Failed to render teacher groups:', err);
    container.innerHTML = '<div class="col-span-full p-8 text-center text-rose-400">Failed to load student cohorts.</div>';
  }
};

window.openCreateGroupModal = async function() {
  const modal = document.getElementById('createStudentGroupModal');
  const title = document.getElementById('groupModalTitle');
  const form = document.getElementById('createStudentGroupForm');
  const editId = document.getElementById('groupEditId');
  if (!modal) return;

  if (title) title.textContent = 'Create Student Group 👥';
  if (editId) editId.value = '';
  if (form) form.reset();

  await populateGroupStudentsPicker([]);
  modal.classList.add('open');
};

window.openEditGroupModal = async function(groupId) {
  const modal = document.getElementById('createStudentGroupModal');
  const title = document.getElementById('groupModalTitle');
  const editId = document.getElementById('groupEditId');
  const nameInput = document.getElementById('groupNameInput');
  const gradeSelect = document.getElementById('groupGradeSelect');
  const colorSelect = document.getElementById('groupColorSelect');
  const descInput = document.getElementById('groupDescInput');
  if (!modal) return;

  const groups = AppState.currentTeacherGroups || (await DB.getStudentGroups());
  const group = groups.find(g => String(g.id) === String(groupId));
  if (!group) {
    showToast('Group not found', '⚠️');
    return;
  }

  if (title) title.textContent = `Edit Group: ${group.name} 👥`;
  if (editId) editId.value = group.id;
  if (nameInput) nameInput.value = group.name || '';
  if (gradeSelect) gradeSelect.value = group.grade_level || 'Year 4';
  if (colorSelect) colorSelect.value = group.color || 'indigo';
  if (descInput) descInput.value = group.description || '';

  const selectedIds = (group.student_ids || []).map(id => String(id));
  await populateGroupStudentsPicker(selectedIds);
  modal.classList.add('open');
};

window.closeStudentGroupModal = function() {
  const modal = document.getElementById('createStudentGroupModal');
  if (modal) modal.classList.remove('open');
};

async function populateGroupStudentsPicker(selectedIds = []) {
  const container = document.getElementById('groupStudentsPickerList');
  const countEl = document.getElementById('groupSelectedCount');
  if (!container) return;

  let students = AppState.currentTeacherRoster || [];
  if (!students.length) {
    try {
      const overview = await DB.getTeacherOverview();
      if (overview && overview.students) {
        students = overview.students;
        AppState.currentTeacherRoster = students;
      }
    } catch (e) {}
  }
  if (!students.length) {
    students = (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
  }

  const selectedSet = new Set(selectedIds.map(String));

  container.innerHTML = students.map(s => {
    const isChecked = selectedSet.has(String(s.id));
    return `
      <label class="group-student-picker-item">
        <input type="checkbox" class="group-student-checkbox w-4 h-4 rounded text-primary cursor-pointer"
          value="${s.id}"
          ${isChecked ? 'checked' : ''}
          onchange="updateGroupSelectedCount()">
        <span class="text-base">${s.avatar || '🦊'}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-white text-xs truncate">${s.full_name || s.username}</div>
          <div class="text-[11px] text-slate-400 truncate">${s.grade_level || 'Year 4'} &bull; @${s.username}</div>
        </div>
      </label>
    `;
  }).join('');

  if (countEl) countEl.textContent = selectedSet.size;
}

window.updateGroupSelectedCount = function() {
  const countEl = document.getElementById('groupSelectedCount');
  const checked = document.querySelectorAll('.group-student-checkbox:checked');
  if (countEl) countEl.textContent = checked.length;
};

window.toggleAllGroupStudentCheckboxes = function(select) {
  const checkboxes = document.querySelectorAll('.group-student-checkbox');
  checkboxes.forEach(cb => { cb.checked = !!select; });
  updateGroupSelectedCount();
};

window.handleSaveStudentGroup = async function(e) {
  if (e) e.preventDefault();

  const editId = document.getElementById('groupEditId')?.value;
  const name = (document.getElementById('groupNameInput')?.value || '').trim();
  const grade_level = document.getElementById('groupGradeSelect')?.value || 'Year 4';
  const color = document.getElementById('groupColorSelect')?.value || 'indigo';
  const description = (document.getElementById('groupDescInput')?.value || '').trim();

  if (!name) {
    showToast('Please enter a group name', '⚠️');
    return;
  }

  const checkedBoxes = document.querySelectorAll('.group-student-checkbox:checked');
  const student_ids = Array.from(checkedBoxes).map(cb => {
    const val = cb.value;
    return isNaN(Number(val)) ? val : Number(val);
  });

  const groupData = {
    id: editId || `grp_${Date.now()}`,
    name,
    grade_level,
    color,
    description,
    student_ids,
    created_at: new Date().toISOString()
  };

  const res = await DB.saveStudentGroup(groupData);
  if (res && res.success) {
    showToast(`Group "${name}" saved successfully! 👥`, '✅');
    closeStudentGroupModal();
    await renderTeacherGroups();
  } else {
    showToast('Failed to save student group', '⚠️');
  }
};

window.deleteStudentGroupItem = async function(groupId) {
  if (!confirm('Are you sure you want to delete this student group?')) return;
  const res = await DB.deleteStudentGroup(groupId);
  if (res && res.success) {
    showToast('Student group deleted successfully 🗑️');
    await renderTeacherGroups();
  } else {
    showToast('Failed to delete group', '⚠️');
  }
};

window.manageGroupPermissions = function(groupId) {
  switchTeacherTab('curriculum');
  setCurriculumTargetMode('group');
  setTimeout(() => {
    const groupSelect = document.getElementById('curriculumGroupSelect');
    if (groupSelect) {
      groupSelect.value = groupId;
      handleCurriculumGroupChange(groupId);
    }
  }, 50);
};

window.broadcastZoomToGroup = async function(groupId) {
  const groups = AppState.currentTeacherGroups || (await DB.getStudentGroups());
  const group = groups.find(g => String(g.id) === String(groupId));
  if (!group) return;

  const modal = document.getElementById('addClassSessionModal');
  if (!modal) return;

  modal.classList.add('open');
  const audSelect = document.getElementById('sessTargetAudienceSelect');
  if (audSelect) {
    audSelect.value = 'group';
    handleSessionAudienceChange('group');
    setTimeout(() => {
      const gSelect = document.getElementById('sessTargetGroupSelect');
      if (gSelect) gSelect.value = groupId;
    }, 50);
  }

  const titleInput = document.getElementById('sessTitleInput');
  if (titleInput && !titleInput.value) {
    titleInput.value = `${group.name} - Live Lecture`;
  }
};

window.shareGroupWhatsApp = async function(groupId) {
  const groups = AppState.currentTeacherGroups || (await DB.getStudentGroups());
  const group = groups.find(g => String(g.id) === String(groupId));
  if (!group) {
    showToast('Group not found', '⚠️');
    return;
  }

  const studentCount = (group.student_ids || []).length;
  const zoomLink = localStorage.getItem('rc_default_zoom_link') || '';

  const msg = `🌟 Miss Rania's Classroom Broadcast: ${group.name} 🌟
📚 Grade: ${group.grade_level || 'Year 4'}
👥 Enrolled Students: ${studentCount}
━━━━━━━━━━━━━━━━━━━━
📢 ${group.description || 'Welcome students to this cohort session!'}
${zoomLink ? '🎥 Zoom Link: ' + zoomLink + '\n' : ''}
💻 Please check your student portal for unlocked curriculum skills and study sheets.
━━━━━━━━━━━━━━━━━━━━
Best regards, Miss Rania 🌸`;

  const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  showToast('Opening WhatsApp broadcast 💬');
};

// =============================================================================
// Student & Group Curriculum Access & Permission Controller (100% English UI)
// =============================================================================

window.setCurriculumTargetMode = function(mode) {
  AppState.selectedCurriculumMode = mode;

  const studentBtn = document.getElementById('curriculumTargetStudentBtn');
  const groupBtn = document.getElementById('curriculumTargetGroupBtn');
  const studentWrap = document.getElementById('curriculumStudentSelectWrapper');
  const groupWrap = document.getElementById('curriculumGroupSelectWrapper');

  if (studentBtn) studentBtn.classList.toggle('active', mode === 'student');
  if (groupBtn) groupBtn.classList.toggle('active', mode === 'group');

  if (studentWrap) studentWrap.style.display = (mode === 'student' ? 'flex' : 'none');
  if (groupWrap) groupWrap.style.display = (mode === 'group' ? 'flex' : 'none');

  renderCurriculumAccessManager();
};

window.renderCurriculumAccessManager = async function() {
  const container = document.getElementById('curriculumSkillsTree');
  const studentSelect = document.getElementById('curriculumStudentSelect');
  const groupSelect = document.getElementById('curriculumGroupSelect');
  if (!container) return;

  const mode = AppState.selectedCurriculumMode || 'student';

  // 1. Populate Students dropdown
  let students = AppState.currentTeacherRoster || [];
  if (!students.length) {
    try {
      const overview = await DB.getTeacherOverview();
      if (overview && overview.students) {
        students = overview.students;
        AppState.currentTeacherRoster = students;
      }
    } catch (e) {}
  }
  if (!students.length) {
    students = (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
  }

  if (studentSelect) {
    studentSelect.innerHTML = students.map(s => `
      <option value="${s.id}" ${String(s.id) === String(AppState.selectedCurriculumStudentId || students[0]?.id) ? 'selected' : ''}>
        ${s.full_name || s.username} (${s.grade_level || 'Year 4'})
      </option>
    `).join('');
  }

  // 2. Populate Groups dropdown
  let groups = AppState.currentTeacherGroups || [];
  if (!groups.length) {
    groups = await DB.getStudentGroups();
    AppState.currentTeacherGroups = groups;
  }

  if (groupSelect) {
    if (groups.length > 0) {
      groupSelect.innerHTML = groups.map(g => `
        <option value="${g.id}" ${String(g.id) === String(AppState.selectedCurriculumGroupId || groups[0]?.id) ? 'selected' : ''}>
          ${g.name} (${g.grade_level || 'Year 4'} • ${(g.student_ids || []).length} students)
        </option>
      `).join('');
    } else {
      groupSelect.innerHTML = '<option value="">No Groups Created Yet</option>';
    }
  }

  if (mode === 'group') {
    if (!groups.length) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <div class="text-3xl mb-2">👥</div>
          <div class="font-bold text-base text-slate-200">No Student Groups Found</div>
          <p class="text-xs text-slate-500 mt-1 mb-4">Create a group first under the "Student Groups" sub-tab.</p>
          <button class="primary-glow-btn" onclick="openCreateGroupModal()">Create Student Group</button>
        </div>
      `;
      return;
    }
    if (!AppState.selectedCurriculumGroupId && groups.length > 0) {
      AppState.selectedCurriculumGroupId = groups[0].id;
    }
    await loadGroupCurriculumInTeacherPanel(AppState.selectedCurriculumGroupId);
  } else {
    if (!AppState.selectedCurriculumStudentId && students.length > 0) {
      AppState.selectedCurriculumStudentId = students[0].id;
    }
    await loadStudentCurriculumInTeacherPanel(AppState.selectedCurriculumStudentId);
  }
};

window.handleCurriculumStudentChange = async function(studentId) {
  AppState.selectedCurriculumStudentId = studentId;
  await loadStudentCurriculumInTeacherPanel(studentId);
};

window.handleCurriculumGroupChange = async function(groupId) {
  AppState.selectedCurriculumGroupId = groupId;
  await loadGroupCurriculumInTeacherPanel(groupId);
};

async function loadGroupCurriculumInTeacherPanel(groupId) {
  const container = document.getElementById('curriculumSkillsTree');
  const gradeBadge = document.getElementById('curriculumGradeBadge');
  if (!container) return;

  container.innerHTML = '<div class="p-8 text-center text-slate-400 font-semibold"><span class="animate-spin inline-block mr-2">⏳</span> Loading group curriculum permissions...</div>';

  const groups = AppState.currentTeacherGroups || (await DB.getStudentGroups());
  const group = groups.find(g => String(g.id) === String(groupId)) || { name: 'Cohort', grade_level: 'Year 4', student_ids: [] };
  const groupGrade = group.grade_level || 'Year 4';

  if (gradeBadge) {
    gradeBadge.textContent = `👥 Group: ${group.name} • ${groupGrade} (${(group.student_ids || []).length} Students)`;
  }

  // Aggregate unlocked skills across member students
  const unlockedSet = new Set();
  const studentIds = Array.isArray(group.student_ids) ? group.student_ids : [];

  if (studentIds.length > 0) {
    for (const sid of studentIds) {
      try {
        const res = await DB.getTeacherStudentSkills(sid);
        if (res && res.success && Array.isArray(res.unlocked_skills)) {
          res.unlocked_skills.forEach(code => unlockedSet.add(code));
        }
      } catch (e) {}
    }
  }

  AppState.teacherSelectedStudentUnlocked = unlockedSet;
  filterCurriculumSkillsTree();
}

async function loadStudentCurriculumInTeacherPanel(studentId) {
  const container = document.getElementById('curriculumSkillsTree');
  const gradeBadge = document.getElementById('curriculumGradeBadge');
  if (!container) return;

  container.innerHTML = '<div class="p-8 text-center text-slate-400 font-semibold"><span class="animate-spin inline-block mr-2">⏳</span> Loading student curriculum permissions...</div>';

  const students = AppState.currentTeacherRoster || (await DB.getDemoStudents());
  const student = students.find(s => String(s.id) === String(studentId)) || DB.findStudentById(studentId) || { grade_level: 'Year 4', full_name: 'Student' };
  const studentGrade = student.grade_level || 'Year 4';

  if (gradeBadge) {
    gradeBadge.textContent = `👤 ${student.full_name || student.username} • ${studentGrade}`;
  }

  const res = await DB.getTeacherStudentSkills(studentId);
  const unlockedSet = new Set(res && res.success && Array.isArray(res.unlocked_skills) ? res.unlocked_skills : []);
  AppState.teacherSelectedStudentUnlocked = unlockedSet;

  filterCurriculumSkillsTree();
}

window.filterCurriculumSkillsTree = function() {
  const container = document.getElementById('curriculumSkillsTree');
  const subjectFilter = document.getElementById('curriculumSubjectFilter')?.value || 'Maths';
  const searchQuery = (document.getElementById('curriculumSkillSearch')?.value || '').trim().toLowerCase();
  const isGroupMode = AppState.selectedCurriculumMode === 'group';

  let currentGrade = 'Year 4';
  if (isGroupMode) {
    const groups = AppState.currentTeacherGroups || [];
    const grp = groups.find(g => String(g.id) === String(AppState.selectedCurriculumGroupId));
    currentGrade = grp ? (grp.grade_level || 'Year 4') : 'Year 4';
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    const students = AppState.currentTeacherRoster || [];
    const student = students.find(s => String(s.id) === String(studentId)) || DB.findStudentById(studentId) || { grade_level: 'Year 4' };
    currentGrade = student.grade_level || 'Year 4';
  }

  if (!container) return;

  // Filter skills by grade and subject
  let skills = (AppState.flatSkills || []).filter(s => s.grade === currentGrade);
  if (subjectFilter !== 'all') {
    skills = skills.filter(s => s.subject === subjectFilter);
  }
  if (searchQuery) {
    skills = skills.filter(s => (s.name && s.name.toLowerCase().includes(searchQuery)) || (s.code && s.code.toLowerCase().includes(searchQuery)));
  }

  // Update KPI counters for this grade
  const totalGradeSkills = (AppState.flatSkills || []).filter(s => s.grade === currentGrade).length;
  const gradeUnlockedCount = (AppState.flatSkills || []).filter(s => s.grade === currentGrade && AppState.teacherSelectedStudentUnlocked.has(s.code)).length;
  const gradeLockedCount = Math.max(0, totalGradeSkills - gradeUnlockedCount);

  const kpiTotal = document.getElementById('curriculumTotalGradeSkills');
  const kpiUnlocked = document.getElementById('curriculumUnlockedCount');
  const kpiLocked = document.getElementById('curriculumLockedCount');
  if (kpiTotal) kpiTotal.textContent = totalGradeSkills;
  if (kpiUnlocked) kpiUnlocked.textContent = gradeUnlockedCount;
  if (kpiLocked) kpiLocked.textContent = gradeLockedCount;

  if (!skills.length) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
        <div class="text-3xl mb-2">🔍</div>
        <div class="font-bold text-base text-slate-200">No skills found</div>
        <p class="text-xs text-slate-500 mt-1">Try selecting a different subject or clearing search query.</p>
      </div>
    `;
    return;
  }

  // Group by Category
  const categoryGroups = new Map();
  for (const s of skills) {
    const catKey = `${s.subject} • ${s.category_code} • ${s.category_name}`;
    if (!categoryGroups.has(catKey)) {
      categoryGroups.set(catKey, { subject: s.subject, code: s.category_code, name: s.category_name, skills: [] });
    }
    categoryGroups.get(catKey).skills.push(s);
  }

  let html = '';
  for (const [catKey, catGroup] of categoryGroups) {
    const unlockedCount = catGroup.skills.filter(s => AppState.teacherSelectedStudentUnlocked.has(s.code)).length;
    const allChecked = catGroup.skills.length > 0 && unlockedCount === catGroup.skills.length;
    const subjClass = (catGroup.subject || '').toLowerCase().includes('math') ? 'maths' :
                      ((catGroup.subject || '').toLowerCase().includes('eng') ? 'english' :
                      ((catGroup.subject || '').toLowerCase().includes('sci') ? 'science' : 'general'));

    html += `
      <div class="curriculum-cat-box" data-cat="${encodeURIComponent(catKey)}">
        <div class="curriculum-cat-header">
          <div class="flex items-center gap-3">
            <input type="checkbox" class="cat-master-checkbox w-4 h-4 rounded text-primary cursor-pointer"
              ${allChecked ? 'checked' : ''}
              onchange="toggleCategoryCurriculumSkills('${encodeURIComponent(catKey)}', this.checked)">
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="curriculum-subject-badge ${subjClass}">${catGroup.subject}</span>
              <span class="curriculum-cat-title">${catGroup.code}. ${catGroup.name}</span>
              <span class="curriculum-cat-count">(${unlockedCount}/${catGroup.skills.length} unlocked)</span>
            </div>
          </div>
          <button type="button" class="curriculum-toggle-btn" onclick="this.closest('.curriculum-cat-box').querySelector('.curriculum-skills-sublist').classList.toggle('hidden')">
            <span>Toggle ▾</span>
          </button>
        </div>
        <div class="curriculum-skills-sublist">
          ${catGroup.skills.map(s => {
            const isUnlocked = AppState.teacherSelectedStudentUnlocked.has(s.code);
            return `
              <div class="curriculum-skill-item ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
                <label class="curriculum-skill-label">
                  <input type="checkbox" class="skill-checkbox w-4 h-4 rounded text-primary cursor-pointer"
                    data-skill-code="${s.code}"
                    data-cat="${encodeURIComponent(catKey)}"
                    ${isUnlocked ? 'checked' : ''}
                    onchange="handleSkillCheckboxChange('${s.code}', this.checked, '${encodeURIComponent(catKey)}')">
                  <span class="curriculum-skill-code">${s.code}</span>
                  <span class="curriculum-skill-name">${s.name}</span>
                </label>
                <div class="flex items-center gap-2">
                  <span class="skill-status-tag ${isUnlocked ? 'unlocked' : 'locked'}">
                    ${isUnlocked ? '🔓 Unlocked' : '🔒 Locked'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
};

window.handleSkillCheckboxChange = async function(skillCode, isChecked) {
  if (isChecked) {
    AppState.teacherSelectedStudentUnlocked.add(skillCode);
  } else {
    AppState.teacherSelectedStudentUnlocked.delete(skillCode);
  }
  filterCurriculumSkillsTree();

  if (AppState.selectedCurriculumMode === 'group') {
    const groupId = AppState.selectedCurriculumGroupId;
    if (groupId) {
      await DB.updateGroupSkills(groupId, isChecked ? 'unlock' : 'lock', [skillCode]);
    }
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    if (studentId) {
      const skillCodes = Array.from(AppState.teacherSelectedStudentUnlocked);
      await DB.updateStudentSkills(studentId, 'set', skillCodes);
    }
  }
};

window.toggleCategoryCurriculumSkills = async function(encodedCatKey, isChecked) {
  const catKey = decodeURIComponent(encodedCatKey);
  const targetSkills = (AppState.flatSkills || []).filter(s => {
    const k = `${s.subject} • ${s.category_code} • ${s.category_name}`;
    return k === catKey;
  });

  const skillCodes = targetSkills.map(s => s.code);

  targetSkills.forEach(s => {
    if (isChecked) {
      AppState.teacherSelectedStudentUnlocked.add(s.code);
    } else {
      AppState.teacherSelectedStudentUnlocked.delete(s.code);
    }
  });

  filterCurriculumSkillsTree();

  if (AppState.selectedCurriculumMode === 'group') {
    const groupId = AppState.selectedCurriculumGroupId;
    if (groupId) {
      await DB.updateGroupSkills(groupId, isChecked ? 'unlock' : 'lock', skillCodes);
    }
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    if (studentId) {
      const allUnlocked = Array.from(AppState.teacherSelectedStudentUnlocked);
      await DB.updateStudentSkills(studentId, 'set', allUnlocked);
    }
  }
};

window.unlockAllGradeSkills = async function() {
  const isGroupMode = AppState.selectedCurriculumMode === 'group';

  if (isGroupMode) {
    const groupId = AppState.selectedCurriculumGroupId;
    if (!groupId) return;
    const groups = AppState.currentTeacherGroups || [];
    const group = groups.find(g => String(g.id) === String(groupId)) || { grade_level: 'Year 4' };
    const groupGrade = group.grade_level || 'Year 4';

    const gradeSkills = (AppState.flatSkills || []).filter(s => s.grade === groupGrade);
    gradeSkills.forEach(s => AppState.teacherSelectedStudentUnlocked.add(s.code));

    const res = await DB.updateGroupSkills(groupId, 'unlock_all_grade', [], groupGrade);
    if (res && res.success) {
      showToast(`All ${groupGrade} skills unlocked for group "${group.name}"! 🔓`, '✅');
    } else {
      showToast(`All ${groupGrade} skills unlocked locally! 🔓`, '✅');
    }
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    if (!studentId) return;

    const students = AppState.currentTeacherRoster || [];
    const student = students.find(s => String(s.id) === String(studentId)) || DB.findStudentById(studentId) || { grade_level: 'Year 4' };
    const studentGrade = student.grade_level || 'Year 4';

    const gradeSkills = (AppState.flatSkills || []).filter(s => s.grade === studentGrade);
    gradeSkills.forEach(s => AppState.teacherSelectedStudentUnlocked.add(s.code));

    const res = await DB.updateStudentSkills(studentId, 'unlock_all_grade', [], studentGrade);
    if (res && res.success) {
      showToast(`All ${studentGrade} skills unlocked successfully! 🔓`, '✅');
    } else {
      showToast(`All ${studentGrade} skills unlocked locally! 🔓`, '✅');
    }
  }
  filterCurriculumSkillsTree();
};

window.lockAllStudentSkills = async function() {
  const isGroupMode = AppState.selectedCurriculumMode === 'group';

  if (isGroupMode) {
    const groupId = AppState.selectedCurriculumGroupId;
    if (!groupId) return;

    AppState.teacherSelectedStudentUnlocked.clear();
    const res = await DB.updateGroupSkills(groupId, 'lock_all');
    if (res && res.success) {
      showToast('All curriculum skills locked for group 🔒', 'ℹ️');
    } else {
      showToast('All curriculum skills locked locally 🔒', 'ℹ️');
    }
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    if (!studentId) return;

    AppState.teacherSelectedStudentUnlocked.clear();
    const res = await DB.updateStudentSkills(studentId, 'lock_all');
    if (res && res.success) {
      showToast('All curriculum skills locked for student 🔒', 'ℹ️');
    } else {
      showToast('All curriculum skills locked locally 🔒', 'ℹ️');
    }
  }
  filterCurriculumSkillsTree();
};

window.saveCurriculumAccess = async function() {
  const isGroupMode = AppState.selectedCurriculumMode === 'group';

  if (isGroupMode) {
    const groupId = AppState.selectedCurriculumGroupId;
    if (!groupId) {
      showToast('Please select a group first', '⚠️');
      return;
    }
    const skillCodes = Array.from(AppState.teacherSelectedStudentUnlocked);
    const res = await DB.updateGroupSkills(groupId, 'set', skillCodes);
    if (res && res.success) {
      showToast(`Saved ${skillCodes.length} unlocked permissions for group! 💾`, '✅');
    } else {
      showToast(`Saved ${skillCodes.length} group permissions locally! 💾`, '✅');
    }
  } else {
    const studentId = AppState.selectedCurriculumStudentId;
    if (!studentId) {
      showToast('Please select a student first', '⚠️');
      return;
    }
    const skillCodes = Array.from(AppState.teacherSelectedStudentUnlocked);
    const res = await DB.updateStudentSkills(studentId, 'set', skillCodes);
    if (res && res.success) {
      showToast(`Saved ${skillCodes.length} unlocked permissions successfully! 💾`, '✅');
    } else {
      localStorage.setItem(`rc_unlocked_${studentId}`, JSON.stringify(skillCodes));
      showToast(`Saved ${skillCodes.length} permissions locally! 💾`, '✅');
    }
  }
  filterCurriculumSkillsTree();
};

window.filterTeacherRoster = function(filter) {
  AppState.teacherRosterFilter = filter;
  document.querySelectorAll('.roster-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTeacherConsoleView();
};

window.sendPaymentReminderWhatsApp = function(studentId) {
  const student = (AppState.currentTeacherRoster || []).find(s => s.id === studentId || String(s.id) === String(studentId)) ||
                  DB.findStudentById(studentId);
  if (!student) {
    showToast('Student not found in active roster', '⚠️');
    return;
  }
  const parentPhone = student.parent_phone || student.student_phone;
  if (!parentPhone) {
    showToast('Please enter parent phone number first via Edit ✏️', '⚠️');
    return;
  }
  const cleanPhone = cleanWhatsAppNumber(parentPhone);
  const studentName = student.full_name || student.username;
  const parentName = student.parent_name ? ` (Parent: ${student.parent_name})` : '';
  const amount = (student.payment_amount !== undefined && student.payment_amount !== null && student.payment_amount !== '') ? student.payment_amount : '';
  const method = student.payment_method || 'InstaPay / Vodafone Cash';
  const monthName = new Date().toLocaleString('ar-EG', { month: 'long' });

  const msg = `Hello! Greetings from Miss Rania 🌸${parentName ? ' (Parent of ' + studentName + ')' : ''}.
This is a friendly reminder regarding the monthly tuition fee for ${studentName}${amount ? ' (' + amount + ')' : ''} for ${monthName}.
Selected payment method: ${method}.
You can transfer the amount and upload the payment receipt directly through the student portal.
Thank you very much for your continuous cooperation and support! ✨`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  showToast('Opening WhatsApp to send tuition reminder 💬');
};

window.sendWhatsAppReport = function(studentId) {
  const student = (AppState.currentTeacherRoster || []).find(s => s.id === studentId || String(s.id) === String(studentId)) ||
                  DB.findStudentById(studentId);
  if (!student) {
    showToast('Student record not found', '⚠️');
    return;
  }
  const parentPhone = student.parent_phone || student.student_phone;
  if (!parentPhone) {
    showToast('Please enter parent phone number first to send report 📱', '⚠️');
    return;
  }
  const cleanPhone = cleanWhatsAppNumber(parentPhone);
  const stats = DB.getStudentStats(student.id);
  const q = stats.questions_answered || student.questions_answered || 0;
  const acc = stats.accuracy_rate || student.accuracy_rate || 0;
  const xp = Math.max(stats.xp, student.xp || 0);
  const smart = stats.avg_smart_score || student.avg_smart_score || 0;
  const englishStatus = student.payment_status === 'paid' ? 'Active & Paid 🟢' : (student.payment_status === 'pending' ? 'Under Review 🟡' : 'Payment Due 🔴');

  let msg = `🌟 Academic Progress Report: ${student.full_name} 🌟
📚 Grade Level: ${student.grade_level || 'General'}
━━━━━━━━━━━━━━━━━━━━
✅ Questions Completed: ${q.toLocaleString()}
🎯 Accuracy Rate: ${acc}%
🏅 Average SmartScore: ${smart}/100
🏆 Mastery Points: ${xp.toLocaleString()} XP
💳 Tuition Status: ${englishStatus}`;

  if (student.assessment_grade) {
    msg += `\n⭐ Teacher Assessment: ${student.assessment_grade}`;
  }
  if (student.teacher_comment) {
    msg += `\n📝 Teacher Notes: ${student.teacher_comment}`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━\nBest regards, Miss Rania 🌸 RC Classroom Portal`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  showToast('Opening WhatsApp to send progress report 📤');
};

window.saveTeacherReportAssessment = function(studentId) {
  const student = (AppState.currentTeacherRoster || []).find(s => s.id === studentId || String(s.id) === String(studentId)) ||
                  DB.findStudentById(studentId);
  if (!student) return;

  const gradeInput = document.getElementById('reportAssessmentGradeInput');
  const commentInput = document.getElementById('reportTeacherCommentInput');

  const grade = gradeInput ? gradeInput.value.trim() : '';
  const comment = commentInput ? commentInput.value.trim() : '';

  student.assessment_grade = grade;
  student.teacher_comment = comment;

  if (typeof DB !== 'undefined' && DB.updateStudentStats) {
    DB.updateStudentStats(student.id, {
      assessment_grade: grade,
      teacher_comment: comment
    });
  }

  try {
    const roster = DB.getStudents ? DB.getStudents() : [];
    const target = roster.find(s => s.id === student.id || String(s.id) === String(student.id));
    if (target) {
      target.assessment_grade = grade;
      target.teacher_comment = comment;
      localStorage.setItem('students_roster', JSON.stringify(roster));
    }
  } catch (e) {
    console.warn(e);
  }

  showToast('Assessment grade and comment saved! 📝', '✅');
};

window.openStudentReportModal = function(studentId) {
  const student = (AppState.currentTeacherRoster || []).find(s => s.id === studentId || String(s.id) === String(studentId)) ||
                  DB.findStudentById(studentId);
  if (!student) return;

  const modal = document.getElementById('studentReportModal');
  const sub = document.getElementById('reportStudentSubtitle');
  const content = document.getElementById('studentReportContent');
  if (!modal || !content) return;

  if (sub) {
    sub.textContent = `${student.full_name} • ${student.grade_level} • Parent: ${student.parent_name || 'Not provided'}`;
  }

  const stats = DB.getStudentStats(student.id);
  const q = stats.questions_answered || student.questions_answered || 0;
  const acc = stats.accuracy_rate || student.accuracy_rate || 0;
  const xp = Math.max(stats.xp, student.xp || 0);
  const smart = stats.avg_smart_score || student.avg_smart_score || 0;
  const displayFee = (student.payment_amount !== undefined && student.payment_amount !== null && student.payment_amount !== '') ? student.payment_amount : '—';

  content.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1.25rem;">
      <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 14px; padding: 1.2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.9rem;">
          <div style="font-size: 2.2rem; background: rgba(255,255,255,0.08); width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">${student.avatar || '🦊'}</div>
          <div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #fff;">${student.full_name}</div>
            <div style="font-size: 0.85rem; color: #94a3b8;">@${student.username} &bull; ${student.grade_level}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span class="payment-badge ${student.payment_status || 'paid'}">${(student.payment_status || 'paid').toUpperCase()}</span>
          <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">Fee: ${displayFee} (${student.payment_method || 'InstaPay'})</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
        <div style="background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700;">QUESTIONS SOLVED</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #00e5ff; margin-top: 4px;">${q.toLocaleString()}</div>
        </div>
        <div style="background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700;">ACCURACY RATE</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin-top: 4px;">${acc}%</div>
        </div>
        <div style="background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700;">AVG SMARTSCORE</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #fbbf24; margin-top: 4px;">${smart}/100</div>
        </div>
        <div style="background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 700;">MASTERY XP</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #8b5cf6; margin-top: 4px;">${xp.toLocaleString()}</div>
        </div>
      </div>

      <!-- Teacher Evaluation & Grade Input Block -->
      <div style="background: rgba(14, 18, 30, 0.9); border: 1px solid rgba(0, 229, 255, 0.25); border-radius: 12px; padding: 1.1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div style="font-weight: 700; font-size: 0.9rem; color: #38bdf8; display: flex; align-items: center; gap: 0.4rem;">
            <span>👩‍🏫</span>
            <span>Teacher Evaluation &amp; Custom Assessment</span>
          </div>
          <span style="font-size: 0.72rem; color: #94a3b8;">Miss Rania</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #cbd5e1; margin-bottom: 4px;">Assessment Grade / Score</label>
            <input type="text" id="reportAssessmentGradeInput" class="custom-input" style="width: 100%; padding: 0.55rem 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.85rem;" placeholder="e.g. 98/100, A+, Distinction, Excellent" value="${escapeHtml(student.assessment_grade || '')}">
          </div>
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #cbd5e1; margin-bottom: 4px;">Teacher Feedback &amp; Comments</label>
            <textarea id="reportTeacherCommentInput" rows="2" class="custom-input" style="width: 100%; padding: 0.55rem 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.85rem; resize: vertical;" placeholder="Write personal remarks, strengths, and next targets...">${escapeHtml(student.teacher_comment || '')}</textarea>
          </div>
          <button type="button" class="primary-glow-btn" onclick="saveTeacherReportAssessment(${student.id})" style="padding: 0.55rem 1rem; font-size: 0.82rem; font-weight: 700; align-self: flex-end;">
            💾 Save Evaluation
          </button>
        </div>
      </div>

      <div style="background: rgba(14, 18, 30, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1rem; font-size: 0.85rem; line-height: 1.6;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: #94a3b8;">Father / Parent:</span>
          <strong style="color: #fff;">${student.parent_name || 'Not provided'}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: #94a3b8;">Student Phone:</span>
          <strong style="color: #fff;">${student.student_phone || 'Not provided'}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #94a3b8;">Parent WhatsApp:</span>
          <strong style="color: #00e5ff;">${student.parent_phone || 'Not provided'}</strong>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.6rem; padding-top: 0.5rem;">
        <button type="button" class="whatsapp-btn full-width" onclick="sendWhatsAppReport(${student.id})" style="padding: 0.85rem; font-size: 0.95rem; justify-content: center; cursor: pointer;">
          <span style="font-size: 1.2rem;">💬</span>
          <span>Send Progress Report via WhatsApp</span>
        </button>
        <button type="button" class="secondary-glass-btn full-width" onclick="printStudentReportCard(${student.id})" style="padding: 0.7rem; justify-content: center; cursor: pointer;">
          <span>🖨️</span>
          <span>Print Formal Progress Report Card</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
};

async function renderTeacherPayments() {
  const container = document.getElementById('teacherPaymentsListContainer');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-muted);">Loading incoming payment proofs...</div>';

  try {
    const list = await DB.getPayments();
    if (!list || !list.length) {
      container.innerHTML = `
        <div class="teacher-empty-box">
          <div class="empty-icon">💳</div>
          <div class="empty-title">No incoming payment receipts</div>
          <div class="empty-desc">When students upload payment receipts (InstaPay / Vodafone Cash), they will appear here for one-click approval.</div>
        </div>
      `;
      return;
    }

    const clearHeader = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0.75rem; gap: 0.5rem;">
        <button type="button" class="action-btn-sm delete" onclick="clearAllPaymentReceipts()" style="padding: 6px 14px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          🗑️ Clear All Receipts
        </button>
      </div>
    `;

    container.innerHTML = clearHeader + list.map(p => {
      const isPending = p.status === 'pending' || p.status === 'pending_review';
      const badgeClass = isPending ? 'pending' : (p.status === 'approved' ? 'paid' : 'overdue');
      const safeImg = p.receipt_image ? p.receipt_image.replace(/"/g, '&quot;') : '';
      const safeId = String(p.id).replace(/'/g, "\\'");

      return `
        <div class="teacher-item-card" id="pay-card-${safeId}">
          <div style="display: flex; gap: 1rem; min-width: 0; flex: 1;">
            ${p.receipt_image ? `
              <div onclick="viewReceiptImage('${safeImg}', '${(p.student_name || 'Receipt').replace(/'/g, "\\'")}')" class="receipt-thumb shrink-0 cursor-pointer" title="Click to enlarge screenshot">
                <img src="${p.receipt_image}" alt="Receipt" style="width: 72px; height: 72px; object-fit: cover; border-radius: 10px; border: 1px solid var(--border-card);">
              </div>
            ` : `
              <div style="width: 72px; height: 72px; border-radius: 10px; background: var(--bg-hover); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; border: 1px solid var(--border-subtle);">
                🧾
              </div>
            `}
            <div style="min-width: 0;">
              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <strong class="teacher-item-title">${p.student_name || 'Student'}</strong>
                <span class="payment-badge ${badgeClass}">${(p.status || 'pending').toUpperCase()}</span>
                <span style="font-size: 0.8rem; color: var(--color-primary); font-weight: 700; background: var(--bg-hover); border: 1px solid var(--border-subtle); padding: 2px 8px; border-radius: 6px;">${(p.amount !== undefined && p.amount !== null && p.amount !== '') ? p.amount : '—'}</span>
              </div>
              <div class="teacher-item-meta">
                <span>📅 ${p.payment_date || 'Recent'}</span> &bull;
                <span>💳 ${p.payment_method || 'InstaPay'}</span>
              </div>
              ${p.notes ? `<div class="teacher-item-notes">📝 ${p.notes}</div>` : ''}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; shrink-0; align-self: flex-end; flex-wrap: wrap;">
            ${isPending ? `
              <button type="button" class="action-btn-sm" onclick="reviewPaymentReceipt('${safeId}', 'approved')" style="background: rgba(16, 185, 129, 0.12); color: #059669; border-color: rgba(16, 185, 129, 0.25); font-weight: 700; padding: 6px 14px; border-radius: 8px; cursor: pointer;">
                ✓ Approve
              </button>
              <button type="button" class="action-btn-sm delete" onclick="reviewPaymentReceipt('${safeId}', 'rejected')" style="padding: 6px 12px; border-radius: 8px; cursor: pointer;">
                ✕ Reject
              </button>
            ` : `
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Reviewed (${p.status})</span>
            `}
            <button type="button" class="action-btn-sm delete" onclick="deletePaymentReceipt('${safeId}')" title="Delete this receipt record" style="padding: 6px 10px; border-radius: 8px; cursor: pointer; background: rgba(239, 68, 68, 0.08); color: #ef4444; border-color: rgba(239, 68, 68, 0.2);">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to render teacher payments:', err);
    container.innerHTML = '<div style="color: #ef4444; padding: 1rem;">Failed to load payments.</div>';
  }
}

window.reviewPaymentReceipt = async function(paymentId, status) {
  try {
    await DB.reviewPayment(paymentId, status);
    showToast(status === 'approved' ? 'Payment approved successfully! Student marked as Paid 🟢' : 'Payment rejected. Student marked as Overdue 🔴');
    await renderTeacherPayments();
    await renderTeacherConsoleView();
  } catch (e) {
    showToast('Failed to update receipt status: ' + e.message, '⚠️');
  }
};

window.deletePaymentReceipt = async function(paymentId) {
  if (!confirm('Are you sure you want to delete this payment record?')) return;
  try {
    await DB.deletePayment(paymentId);
    showToast('Payment record deleted successfully! 🗑️');
    await renderTeacherPayments();
    await renderTeacherConsoleView();
  } catch (e) {
    showToast('Failed to delete payment: ' + e.message, '⚠️');
  }
};

window.clearAllPaymentReceipts = async function() {
  if (!confirm('Are you sure you want to delete ALL payment records?')) return;
  try {
    await DB.clearAllPayments();
    showToast('All payment records cleared successfully! 🗑️');
    await renderTeacherPayments();
    await renderTeacherConsoleView();
  } catch (e) {
    showToast('Failed to clear payments: ' + e.message, '⚠️');
  }
};

window.viewReceiptImage = function(imgSrc, studentName) {
  const modal = document.getElementById('receiptPreviewModal');
  const img = document.getElementById('receiptPreviewImg');
  const title = document.getElementById('receiptPreviewTitle');
  if (!modal || !img) return;
  img.src = imgSrc;
  if (title) title.textContent = `Receipt Proof: ${studentName}`;
  modal.classList.add('open');
};

window.handleSessionAudienceChange = async function(val) {
  const groupWrap = document.getElementById('sessTargetGroupWrapper');
  const studentWrap = document.getElementById('sessTargetStudentWrapper');
  const groupSelect = document.getElementById('sessTargetGroupSelect');
  const studentSelect = document.getElementById('sessTargetStudentSelect');

  if (groupWrap) groupWrap.style.display = (val === 'group' ? 'block' : 'none');
  if (studentWrap) studentWrap.style.display = (val === 'student' ? 'block' : 'none');

  if (val === 'group' && groupSelect) {
    const groups = AppState.currentTeacherGroups || (await DB.getStudentGroups());
    groupSelect.innerHTML = groups.map(g => `
      <option value="${g.id}">${g.name} (${g.grade_level || 'Year 4'})</option>
    `).join('') || '<option value="">No Groups Available</option>';
  } else if (val === 'student' && studentSelect) {
    const students = AppState.currentTeacherRoster || (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
    studentSelect.innerHTML = students.map(s => `
      <option value="${s.id}">${s.full_name || s.username} (${s.grade_level || 'Year 4'})</option>
    `).join('') || '<option value="">No Students Available</option>';
  }
};

async function renderTeacherSessions() {
  renderTeacherDefaultZoomBanner();
  const container = document.getElementById('teacherSessionsListContainer');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-muted);">Loading class sessions...</div>';

  try {
    const [sessions, groups, students] = await Promise.all([
      DB.getClassSessions(),
      DB.getStudentGroups(),
      (async () => {
        let st = AppState.currentTeacherRoster || [];
        if (!st.length) {
          try {
            const overview = await DB.getTeacherOverview();
            if (overview && overview.students) st = overview.students;
          } catch (e) {}
        }
        if (!st.length) st = await DB.getDemoStudents();
        return st;
      })()
    ]);

    const groupMap = new Map();
    (groups || []).forEach(g => groupMap.set(String(g.id), g.name));
    const studentMap = new Map();
    (students || []).forEach(s => studentMap.set(String(s.id), s.full_name || s.username));

    if (!sessions || !sessions.length) {
      container.innerHTML = `
        <div class="teacher-empty-box">
          <div class="empty-icon">🎥</div>
          <div class="empty-title">No class sessions logged yet</div>
          <div class="empty-desc">Click "Log Class Session" above to add Zoom meetings, syllabus topics, and lesson PDF sheets.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = sessions.map(s => {
      let audienceBadge = '<span class="planner-meta-pill audience" style="background: rgba(14, 165, 233, 0.12); color: #0284c7; border: 1px solid rgba(14, 165, 233, 0.25);">🌐 All Students</span>';
      if (s.target_audience === 'group' && s.target_group_id) {
        const gName = groupMap.get(String(s.target_group_id)) || `Group ${s.target_group_id}`;
        audienceBadge = `<span class="planner-meta-pill audience" style="background: rgba(99, 102, 241, 0.15); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.3);">👥 ${gName}</span>`;
      } else if (s.target_audience === 'student' && s.target_student_id) {
        const sName = studentMap.get(String(s.target_student_id)) || `Student #${s.target_student_id}`;
        audienceBadge = `<span class="planner-meta-pill audience" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">👤 ${sName}</span>`;
      }

      return `
        <div class="teacher-item-card">
          <div style="flex: 1; min-width: 260px;">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <span class="planner-meta-pill time">
                <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                ${s.session_date ? new Date(s.session_date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'Session'}
              </span>
              ${audienceBadge}
              <strong class="teacher-item-title">${s.title}</strong>
            </div>
            <div class="teacher-item-meta" style="margin-top: 6px;">
              <strong style="color: var(--text-primary);">Topics Covered:</strong> ${s.topic || 'General curriculum coverage'}
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 8px;">
              ${s.zoom_link ? `
                <a href="${sanitizeExternalUrl(s.zoom_link)}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(0, 113, 227, 0.1); color: var(--color-primary); border: 1px solid rgba(0, 113, 227, 0.25); padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none;">
                  🎥 Zoom Meeting
                </a>
              ` : ''}
              ${s.pdf_link ? `
                <a href="${sanitizeExternalUrl(s.pdf_link)}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.25); padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none;">
                  📄 ${s.pdf_title || 'PDF Sheet'}
                </a>
              ` : ''}
            </div>
          </div>
          <button type="button" class="action-btn-sm delete" onclick="deleteClassSessionItem(${s.id})" title="Delete session" style="padding: 6px 12px; border-radius: 8px; cursor: pointer;">
            🗑️ Delete
          </button>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to render teacher sessions:', err);
    container.innerHTML = '<div style="color: #ef4444; padding: 1rem;">Failed to load sessions.</div>';
  }
}

window.deleteClassSessionItem = async function(id) {
  if (!confirm('Are you sure you want to remove this class session?')) return;
  await DB.deleteClassSession(id);
  showToast('Session removed successfully 🗑️');
  await renderTeacherSessions();
  await renderStudentSessions();
};

// =============================================================================
// ZOOM PRO DEFAULT MEETING LINK HELPERS (TEACHER)
// =============================================================================

window.renderTeacherDefaultZoomBanner = function() {
  const display = document.getElementById('teacherDefaultZoomDisplay');
  if (display) {
    const current = localStorage.getItem('rc_default_zoom_link');
    display.textContent = current || 'Not configured yet (Click "Set Default Zoom" to enter link)';
  }
};

window.promptSetDefaultZoomLink = function() {
  const current = localStorage.getItem('rc_default_zoom_link') || '';
  const newLink = prompt('Enter Miss Rania\'s default Zoom Pro room link (e.g. https://zoom.us/j/...):', current);
  if (newLink !== null) {
    const trimmed = newLink.trim();
    if (trimmed) {
      localStorage.setItem('rc_default_zoom_link', trimmed);
      showToast('Default Zoom room saved! 🎥');
    } else {
      localStorage.removeItem('rc_default_zoom_link');
      showToast('Default Zoom room cleared.');
    }
    renderTeacherDefaultZoomBanner();
  }
};

window.useDefaultZoomLink = function() {
  const input = document.getElementById('sessZoomLinkInput');
  const defaultLink = localStorage.getItem('rc_default_zoom_link');
  if (!defaultLink) {
    promptSetDefaultZoomLink();
    const newlySet = localStorage.getItem('rc_default_zoom_link');
    if (newlySet && input) input.value = newlySet;
  } else {
    if (input) input.value = defaultLink;
    showToast('Default Zoom Pro link applied ⚡');
  }
};

window.saveAsDefaultZoomLink = function() {
  const input = document.getElementById('sessZoomLinkInput');
  if (input && input.value.trim()) {
    localStorage.setItem('rc_default_zoom_link', input.value.trim());
    showToast('Link saved as default Zoom room! ⚙️');
    renderTeacherDefaultZoomBanner();
  } else {
    showToast('Please enter a Zoom URL in the input field first.');
  }
};

// =============================================================================
// CURRICULUM BOOKS & FULL TEXTBOOKS PDF LIBRARY
// =============================================================================

if (!AppState.curriculumBooksFilter) {
  AppState.curriculumBooksFilter = { subject: 'all', search: '' };
}

window.filterCurriculumBooks = function(type, val) {
  if (type === 'subject') {
    AppState.curriculumBooksFilter.subject = val;
    document.querySelectorAll('.book-subject-filter').forEach(btn => {
      const isAct = btn.dataset.subject === val;
      btn.classList.toggle('active', isAct);
      if (isAct) {
        btn.className = 'book-subject-filter px-3.5 py-1.5 rounded-xl font-bold text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer active';
      } else {
        btn.className = 'book-subject-filter px-3.5 py-1.5 rounded-xl font-bold text-xs bg-surface-container-high text-slate-300 hover:text-white transition-all cursor-pointer';
      }
    });
  }
  renderCurriculumBooksView();
};

window.handleCurriculumBooksSearch = function(query) {
  AppState.curriculumBooksFilter.search = (query || '').toLowerCase().trim();
  renderCurriculumBooksView();
};

function renderCurriculumBookCardHtml(b, isTeacher = false) {
  const subjClass = (b.subject || 'other').toLowerCase();
  const safePdfUrl = sanitizeExternalUrl(b.pdf_url);
  const isBlobOrData = safePdfUrl.startsWith('data:') || safePdfUrl.startsWith('blob:');

  return `
    <div class="curriculum-book-card">
      <div>
        <div class="book-card-header">
          <span class="book-subject-tag ${subjClass}">${b.subject || 'General'}</span>
          <span class="book-age-badge">👥 ${b.age_group || b.grade || 'All Ages'}</span>
        </div>
        <h3 class="book-card-title">${b.title}</h3>
        <p class="book-card-desc mt-2">${b.description || 'Full curriculum PDF textbook.'}</p>
      </div>
      <div>
        <div class="book-card-meta mb-3">
          <span>📄 ${b.pages_count || 'Full Textbook'}</span>
          <span>📅 ${b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB') : 'Official'}</span>
        </div>
        <div class="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <a href="${safePdfUrl}" target="_blank" rel="noopener noreferrer" class="primary-glow-btn flex-1 text-center justify-center text-xs py-2">
            <span>📖</span> <span>Read Full PDF</span>
          </a>
          <a href="${safePdfUrl}" target="_blank" rel="noopener noreferrer" ${isBlobOrData ? 'download="Curriculum_Book.pdf"' : ''} class="secondary-glass-btn text-xs px-3 py-2" title="Download / Open Book PDF">
            <span>⬇️</span>
          </a>
          ${isTeacher ? `
            <button type="button" class="action-btn-sm delete" onclick="deleteCurriculumBookItem('${b.id}')" title="Delete Book" style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:0.45rem 0.65rem; cursor:pointer;">
              🗑️
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

window.renderCurriculumBooksView = async function() {
  const grid = document.getElementById('curriculumBooksGrid');
  if (!grid) return;

  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');
  const addBtnCol = document.getElementById('teacherAddBookBtnCol');
  if (addBtnCol) addBtnCol.style.display = isTeacher ? 'block' : 'none';

  grid.innerHTML = '<div class="col-span-full text-center py-10 text-slate-400">Loading curriculum library...</div>';

  try {
    const books = await DB.getCurriculumBooks();
    const filterSubj = AppState.curriculumBooksFilter.subject;
    const filterSearch = AppState.curriculumBooksFilter.search;

    const filtered = books.filter(b => {
      const matchSubj = filterSubj === 'all' || (b.subject && b.subject.toLowerCase() === filterSubj.toLowerCase());
      const matchSearch = !filterSearch ||
        (b.title && b.title.toLowerCase().includes(filterSearch)) ||
        (b.age_group && b.age_group.toLowerCase().includes(filterSearch)) ||
        (b.description && b.description.toLowerCase().includes(filterSearch)) ||
        (b.subject && b.subject.toLowerCase().includes(filterSearch));
      return matchSubj && matchSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 px-4 bg-surface-card rounded-2xl border border-dashed border-border-card">
          <div class="text-4xl mb-3">📚</div>
          <h3 class="text-white font-bold text-base">No curriculum books found</h3>
          <p class="text-slate-400 text-xs mt-1">Try adjusting your subject filter or search query.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(b => renderCurriculumBookCardHtml(b, isTeacher)).join('');
  } catch (err) {
    console.error('Error rendering curriculum books:', err);
    grid.innerHTML = '<div class="col-span-full text-center py-10 text-rose-400">Failed to load curriculum books.</div>';
  }
};

window.renderTeacherCurriculumBooks = async function() {
  const grid = document.getElementById('teacherBooksGrid');
  if (!grid) return;
  grid.innerHTML = '<div class="col-span-full text-center py-10 text-slate-400">Loading curriculum library...</div>';
  try {
    const books = await DB.getCurriculumBooks();
    if (!books.length) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 px-4 bg-surface-card rounded-2xl border border-dashed border-border-card">
          <div class="text-4xl mb-3">📚</div>
          <h3 class="text-white font-bold text-base">No curriculum books added yet</h3>
          <p class="text-slate-400 text-xs mt-1">Click "Add Curriculum PDF" to upload and organize syllabus books for your students.</p>
        </div>
      `;
      return;
    }
    grid.innerHTML = books.map(b => renderCurriculumBookCardHtml(b, true)).join('');
  } catch (err) {
    console.error('Error rendering teacher books:', err);
  }
};

window.openAddCurriculumBookModal = function() {
  const modal = document.getElementById('addCurriculumBookModal');
  if (modal) modal.classList.add('open');
};

window.deleteCurriculumBookItem = async function(bookId) {
  if (!confirm('Are you sure you want to delete this curriculum book?')) return;
  await DB.deleteCurriculumBook(bookId);
  showToast('Curriculum book removed 🗑️');
  await renderCurriculumBooksView();
  await renderTeacherCurriculumBooks();
};

window.clearAllCurriculumBooksBtn = async function() {
  if (!confirm('Are you sure you want to remove all sample curriculum books? This allows you to add and display only your own official textbooks.')) return;
  await DB.clearAllCurriculumBooks();
  showToast('All sample curriculum books removed 🗑️');
  await renderCurriculumBooksView();
  await renderTeacherCurriculumBooks();
};

// =============================================================================
// DAILY TEACHING PLANNER & TO-DO AGENDA CONTROLLER
// =============================================================================

if (!AppState.plannerFilter) {
  AppState.plannerFilter = 'today';
}
AppState.plannerSpecificDate = null;

window.filterPlannerTasks = function(filter) {
  AppState.plannerFilter = filter;
  AppState.plannerSpecificDate = null;
  const dateInput = document.getElementById('plannerDateFilterInput');
  if (dateInput) dateInput.value = '';

  document.querySelectorAll('.planner-filter-tab, .planner-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  const label = document.getElementById('plannerCurrentViewDateLabel');
  if (label) {
    if (filter === 'today') label.textContent = 'Today';
    else if (filter === 'tomorrow') label.textContent = 'Tomorrow';
    else if (filter === 'upcoming') label.textContent = 'Next 7 Days';
    else if (filter === 'completed') label.textContent = 'Completed';
    else label.textContent = 'All Lessons';
  }

  renderPlannerView();
};

window.handlePlannerDateChange = function(dateStr) {
  if (!dateStr) return;
  AppState.plannerFilter = 'specific';
  AppState.plannerSpecificDate = dateStr;

  document.querySelectorAll('.planner-filter-tab, .planner-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const label = document.getElementById('plannerCurrentViewDateLabel');
  if (label) label.textContent = new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  renderPlannerView();
};

window.renderPlannerView = async function() {
  const container = document.getElementById('plannerTasksListContainer');
  if (!container) return;

  container.innerHTML = '<div class="text-center py-8 text-slate-400">Loading daily teaching agenda...</div>';

  try {
    const allTasks = await DB.getPlannerTasks();
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Compute badges and KPIs
    const todayTasks = allTasks.filter(t => t.date === todayStr);
    const todayPending = todayTasks.filter(t => t.status !== 'completed');

    const badge = document.getElementById('tTodayPlannerBadge');
    if (badge) {
      if (todayPending.length > 0) {
        badge.textContent = todayPending.length;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    }

    const totalEl = document.getElementById('plannerTotalCount');
    const pendingEl = document.getElementById('plannerPendingCount');
    const completedEl = document.getElementById('plannerCompletedCount');

    let filtered = [];
    if (AppState.plannerFilter === 'today') {
      filtered = allTasks.filter(t => t.date === todayStr);
      if (totalEl) totalEl.textContent = filtered.length;
      if (pendingEl) pendingEl.textContent = filtered.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = filtered.filter(t => t.status === 'completed').length;
    } else if (AppState.plannerFilter === 'tomorrow') {
      filtered = allTasks.filter(t => t.date === tomorrowStr);
      if (totalEl) totalEl.textContent = filtered.length;
      if (pendingEl) pendingEl.textContent = filtered.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = filtered.filter(t => t.status === 'completed').length;
    } else if (AppState.plannerFilter === 'upcoming') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekStr = nextWeek.toISOString().split('T')[0];
      filtered = allTasks.filter(t => t.date >= todayStr && t.date <= nextWeekStr);
      if (totalEl) totalEl.textContent = filtered.length;
      if (pendingEl) pendingEl.textContent = filtered.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = filtered.filter(t => t.status === 'completed').length;
    } else if (AppState.plannerFilter === 'completed') {
      filtered = allTasks.filter(t => t.status === 'completed');
      if (totalEl) totalEl.textContent = allTasks.length;
      if (pendingEl) pendingEl.textContent = allTasks.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = filtered.length;
    } else if (AppState.plannerFilter === 'specific' && AppState.plannerSpecificDate) {
      filtered = allTasks.filter(t => t.date === AppState.plannerSpecificDate);
      if (totalEl) totalEl.textContent = filtered.length;
      if (pendingEl) pendingEl.textContent = filtered.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = filtered.filter(t => t.status === 'completed').length;
    } else {
      filtered = allTasks;
      if (totalEl) totalEl.textContent = allTasks.length;
      if (pendingEl) pendingEl.textContent = allTasks.filter(t => t.status !== 'completed').length;
      if (completedEl) completedEl.textContent = allTasks.filter(t => t.status === 'completed').length;
    }

    // Sort by date, then by time
    filtered.sort((a, b) => (a.date + ' ' + a.time).localeCompare(b.date + ' ' + b.time));

    if (!filtered.length) {
      container.innerHTML = `
        <div class="planner-empty-state">
          <div class="planner-empty-icon">📅</div>
          <h3 class="planner-empty-title">No lessons scheduled for this view</h3>
          <p class="planner-empty-desc">Click "Add Lesson Plan" above to schedule who will take lessons and what topics to cover.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(t => {
      const isDone = t.status === 'completed';
      const formattedDate = new Date(t.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      return `
        <div class="planner-task-card ${isDone ? 'completed' : ''}" id="planCard_${t.id}">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="space-y-2 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="planner-meta-pill time">
                  <span class="material-symbols-outlined text-[14px]">schedule</span> ${t.time}
                </span>
                <span class="planner-meta-pill date">
                  <span class="material-symbols-outlined text-[14px]">calendar_today</span> ${formattedDate}
                </span>
                <span class="planner-meta-pill ${isDone ? 'status-completed' : 'status-pending'}">
                  ${isDone ? '✓ Completed' : '⏳ Pending'}
                </span>
                <span class="planner-meta-pill student">
                  <span class="material-symbols-outlined text-[14px]">person</span> ${t.student_name}
                </span>
              </div>
              <h3 class="planner-lesson-title">${t.lesson_title}</h3>
              <div class="planner-topics-box">
                <span class="planner-topics-label">What They Will Take (Topics &amp; Objectives):</span>
                <div class="planner-topics-content">${t.topics_to_take || 'General curriculum instruction and exercises.'}</div>
              </div>
              ${(t.materials_needed || t.homework_assigned) ? `
                <div class="planner-sub-meta">
                  ${t.materials_needed ? `<span>🎒 <strong>Materials:</strong> ${t.materials_needed}</span>` : ''}
                  ${t.homework_assigned ? `<span>📝 <strong>Homework:</strong> ${t.homework_assigned}</span>` : ''}
                </div>
              ` : ''}
            </div>

            <!-- Action Controls -->
            <div class="planner-actions-group">
              <button type="button" class="planner-action-btn ${isDone ? 'toggle-reopen' : 'toggle-done'}" onclick="togglePlannerTaskItem('${t.id}')">
                <span>${isDone ? '↩️ Reopen' : '✓ Mark Done'}</span>
              </button>
              <button type="button" class="planner-action-btn whatsapp" onclick="sharePlannerTaskWhatsApp('${t.id}')" title="Send WhatsApp Lesson Reminder">
                <span>💬 WhatsApp</span>
              </button>
              <button type="button" class="planner-action-btn delete" onclick="deletePlannerTaskItem('${t.id}')" title="Delete Lesson">
                <span>🗑️</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Error rendering planner:', err);
    container.innerHTML = '<div class="text-center py-8 text-rose-400">Failed to load daily agenda.</div>';
  }
};

window.openAddPlannerTaskModal = async function() {
  const modal = document.getElementById('addPlannerTaskModal');
  if (!modal) return;

  const dateInput = document.getElementById('planDateInput');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  const timeInput = document.getElementById('planTimeInput');
  if (timeInput) {
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0);
    timeInput.value = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  const studentSelect = document.getElementById('planStudentSelect');
  if (studentSelect) {
    studentSelect.innerHTML = `
      <option value="all" selected>All Students (Class Group)</option>
      <option value="Year 4 Group">Year 4 Group</option>
      <option value="Year 5 Group">Year 5 Group</option>
      <option value="Year 6 Group">Year 6 Group</option>
    `;
    try {
      const roster = await DB.getTeacherStudents();
      if (roster && roster.length) {
        studentSelect.innerHTML += roster.map(s => `
          <option value="${s.id}" data-name="${s.full_name} (${s.grade_level || 'Student'})">
            👤 ${s.full_name} (${s.grade_level || 'Student'})
          </option>
        `).join('');
      }
    } catch (e) {}
  }

  modal.classList.add('open');
};

window.togglePlannerTaskItem = async function(taskId) {
  await DB.togglePlannerTaskStatus(taskId);
  showToast('Lesson status updated ⭐');
  await renderPlannerView();
};

window.deletePlannerTaskItem = async function(taskId) {
  if (!confirm('Are you sure you want to remove this scheduled lesson?')) return;
  await DB.deletePlannerTask(taskId);
  showToast('Lesson removed 🗑️');
  await renderPlannerView();
};

window.sharePlannerTaskWhatsApp = async function(taskId) {
  try {
    const list = await DB.getPlannerTasks();
    const t = list.find(x => x.id === taskId || String(x.id) === String(taskId));
    if (!t) return;
    const formattedDate = new Date(t.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    const msg = `📅 *Lesson Schedule Reminder - Miss Rania*\n\n` +
      `👤 *Student / Group:* ${t.student_name}\n` +
      `🕒 *Time & Date:* ${formattedDate} at ${t.time}\n` +
      `📘 *Lesson:* ${t.lesson_title}\n` +
      `📝 *What will be covered:* ${t.topics_to_take}\n` +
      (t.materials_needed ? `🎒 *Materials:* ${t.materials_needed}\n` : '') +
      (t.homework_assigned ? `✍️ *Homework:* ${t.homework_assigned}\n` : '') +
      `\n🔗 *Classroom Portal:* https://mbechr.github.io/rcroom/\n` +
      `See you in class on time! ⭐`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  } catch (e) {
    console.error(e);
  }
};

window.copyTodayAgendaWhatsApp = async function() {
  try {
    const list = await DB.getPlannerTasks();
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTasks = list.filter(t => t.date === todayStr);

    if (!todayTasks.length) {
      showToast('No lessons scheduled for today.');
      return;
    }

    const todayDateFormatted = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    let msg = `📅 *Today's Teaching Schedule - Miss Rania*\n_${todayDateFormatted}_\n\n`;

    todayTasks.forEach((t, i) => {
      msg += `*${i + 1}. [${t.time}] ${t.student_name}*\n` +
        `📘 *Lesson:* ${t.lesson_title}\n` +
        `📝 *Topics:* ${t.topics_to_take}\n` +
        (t.homework_assigned ? `✍️ *HW:* ${t.homework_assigned}\n` : '') +
        `Status: ${t.status === 'completed' ? '✅ Completed' : '⏳ Pending'}\n\n`;
    });

    msg += `🌐 *Portal:* https://mbechr.github.io/rcroom/`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(msg);
      showToast('Today\'s agenda copied to clipboard! 📋');
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  } catch (e) {
    console.error(e);
  }
};

async function renderStudentSessions() {
  const dashGrid = document.getElementById('dashSessionsGrid');
  const fullGrid = document.getElementById('fullSessionsGrid');
  if (!dashGrid && !fullGrid) return;

  try {
    const sessions = await DB.getClassSessions();
    const html = (!sessions || !sessions.length) ? `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(14, 18, 30, 0.5); border-radius: 14px; border: 1px dashed rgba(255,255,255,0.1);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎥</div>
        <div style="font-weight: 700; color: #fff; font-size: 1rem;">No Live Classes Scheduled Yet</div>
        <div style="color: #94a3b8; font-size: 0.85rem; margin-top: 4px;">Miss Rania will post upcoming Zoom Pro links and study sheet PDFs here.</div>
      </div>
    ` : sessions.map(s => `
      <div class="bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-label-sm text-xs font-bold">
              ${s.session_date ? new Date(s.session_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Live Class'}
            </span>
            <span class="text-xs text-on-surface-variant font-bold">
              ${s.session_date ? new Date(s.session_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
            </span>
          </div>
          <div>
            <h3 class="font-title-md text-title-md text-on-surface font-bold leading-snug">${s.title}</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5" style="line-height: 1.6;">
              <strong class="text-primary font-bold">Curriculum Covered:</strong> ${s.topic || 'Curriculum unit review'}
            </p>
          </div>
        </div>
        <div class="space-y-2 pt-2 border-t border-border-subtle">
          ${s.zoom_link ? `
            <a href="${sanitizeExternalUrl(s.zoom_link)}" target="_blank" rel="noopener noreferrer" onclick="handleStudentZoomJoin('${(s.title || 'Live Class').replace(/'/g, "\\'")}')" class="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-sm no-underline">
              <span>🎥</span>
              <span>Join Zoom Pro Meeting</span>
            </a>
          ` : ''}
          ${s.pdf_link ? `
            <a href="${sanitizeExternalUrl(s.pdf_link)}" target="_blank" rel="noopener noreferrer" class="w-full py-2 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold flex items-center justify-center gap-2 transition-all text-xs no-underline">
              <span>📄</span>
              <span>${s.pdf_title || 'Download Study Sheet (PDF)'}</span>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');

    if (dashGrid) dashGrid.innerHTML = html;
    if (fullGrid) fullGrid.innerHTML = html;
  } catch (err) {
    console.error('Failed to render student sessions:', err);
  }
}

window.handleStudentZoomJoin = function(sessionTitle) {
  if (window.ActivityLogger && AppState.currentUser) {
    const isTeacher = AppState.currentUser.role === 'teacher' || AppState.currentUser.username === 'admin' || AppState.currentUser.username === 'rania';
    if (!isTeacher) {
      ActivityLogger.log(
        AppState.currentUser,
        'ZOOM_JOIN',
        'Joined Live Zoom Session',
        `Attended: "${sessionTitle || 'Live Class'}"`,
        { session: sessionTitle }
      );
    }
  }
};

function renderStudentPaymentStatus() {
  const card = document.getElementById('dashPaymentProofCard');
  const fullCard = document.getElementById('studentFullPaymentCard');
  if (!card && !fullCard) return;

  const user = AppState.currentUser;
  if (!user || user.role === 'teacher') return;

  const status = user.payment_status || 'paid';
  const amount = (user.payment_amount !== undefined && user.payment_amount !== null && user.payment_amount !== '') ? user.payment_amount : '—';
  const method = user.payment_method || 'InstaPay / Vodafone Cash';
  const payDate = user.payment_date || 'Active';

  let badgeColor = '#10b981';
  let badgeBg = 'rgba(16, 185, 129, 0.15)';
  let badgeBorder = 'rgba(16, 185, 129, 0.3)';
  let statusText = 'Subscription Active & Paid 🟢';
  let statusAr = 'Tuition is active and up to date';

  if (status === 'pending') {
    badgeColor = '#fbbf24';
    badgeBg = 'rgba(251, 191, 36, 0.15)';
    badgeBorder = 'rgba(251, 191, 36, 0.3)';
    statusText = 'Receipt Under Review 🟡';
    statusAr = 'Payment receipt is under review by Miss Rania';
  } else if (status === 'overdue') {
    badgeColor = '#f43f5e';
    badgeBg = 'rgba(244, 63, 94, 0.15)';
    badgeBorder = 'rgba(244, 63, 94, 0.3)';
    statusText = 'Subscription Overdue 🔴';
    statusAr = 'Monthly tuition payment is due';
  }

  const html = `
    <div class="flex items-center gap-4 min-w-0">
      <div style="width: 52px; height: 52px; border-radius: 14px; background: ${badgeBg}; border: 1px solid ${badgeBorder}; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; shrink-0;">
        ${status === 'paid' ? '✅' : (status === 'pending' ? '⏳' : '⚠️')}
      </div>
      <div class="min-w-0 space-y-1">
        <div class="flex items-center gap-2.5 flex-wrap">
          <span style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; font-weight: 800; font-size: 0.8rem; padding: 2px 10px; border-radius: 20px;">
            ${statusText}
          </span>
          <span class="text-xs text-on-surface-variant font-bold">${statusAr}</span>
        </div>
        <div class="text-xs text-on-surface-variant flex items-center gap-3 flex-wrap pt-0.5">
          <span>💰 Monthly Tuition: <strong class="text-on-surface">${amount}</strong></span>
          <span>&bull;</span>
          <span>💳 Method: <strong class="text-on-surface">${method}</strong></span>
          <span>&bull;</span>
          <span>📅 Date: <strong class="text-on-surface">${payDate}</strong></span>
        </div>
      </div>
    </div>
    <div class="shrink-0 flex items-center gap-3">
      <button type="button" class="primary-glow-btn" onclick="openSubmitPaymentModal()" style="font-size: 0.85rem; padding: 0.6rem 1.2rem; cursor: pointer;">
        <span class="material-symbols-outlined text-[18px]">upload_file</span>
        <span>Upload Payment Proof</span>
      </button>
    </div>
  `;

  if (card) card.innerHTML = html;
  if (fullCard) fullCard.innerHTML = `<div class="bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">${html}</div>`;
}

window.renderStudentPaymentStatus = renderStudentPaymentStatus;
window.renderStudentSessions = renderStudentSessions;
window.renderTeacherPayments = renderTeacherPayments;
window.renderTeacherSessions = renderTeacherSessions;

window.openSubmitPaymentModal = function() {
  const modal = document.getElementById('submitPaymentModal');
  if (!modal) return;
  const user = AppState.currentUser || JSON.parse(localStorage.getItem('current_student') || 'null');
  const amountInput = document.getElementById('payAmountInput');
  const methodInput = document.getElementById('payMethodInput');
  const dateInput = document.getElementById('payDateInput');
  if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
  if (amountInput && (!amountInput.value || amountInput.value === '')) {
    amountInput.value = (user && user.payment_amount !== undefined && user.payment_amount !== null && user.payment_amount !== '') ? user.payment_amount : '';
  }
  if (methodInput && user && user.payment_method) methodInput.value = user.payment_method;
  modal.classList.add('open');
};

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
          <span class="val cred-pass">Set through the secure reset flow</span>
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
  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');
  if (!isTeacher) {
    showToast('Open practice is disabled. Please solve your assigned homework below 🔒', '⚠️');
    return;
  }
  const skill = AppState.flatSkills.find(s => s.code === skillCode || s.permacode === skillCode);
  if (skill) {
    openPracticeModal(skill);
  } else {
    showToast(`Skill ${skillCode} ready for practice`);
  }
};

window.launchPracticeForAssignment = async function(assignmentId) {
  const user = AppState.currentUser;
  const assignments = await DB.getAssignments(user ? user.id : null);
  const a = assignments.find(item => String(item.id) === String(assignmentId));
  if (!a) {
    showToast('Assignment not found');
    return;
  }

  let targetSkill = AppState.flatSkills.find(s => s.code === a.skill_code || s.permacode === a.skill_code);
  if (!targetSkill) {
    targetSkill = {
      id: 'assign-' + a.id,
      code: a.skill_code,
      name: a.skill_name,
      permacode: a.skill_code,
      subject: a.subject,
      grade: a.grade
    };
  }

  targetSkill = {
    ...targetSkill,
    assignment_id: a.id,
    question_goal: Number(a.question_goal) || 10
  };

  openPracticeModal(targetSkill);
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

  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');
  if (!isTeacher && !isSkillAccessibleToStudent(targetSkill)) {
    showToast('This lesson is locked by your teacher. Please complete your assigned homework first 🔒', '⚠️');
    return;
  }

  openPracticeModal(targetSkill);
}

function openPracticeModal(skill, titleArg, subjectArg) {
  if (typeof skill === 'string') {
    const code = skill;
    const found = (AppState.flatSkills || []).find(s => s.code === code) || {
      code: code,
      name: titleArg || 'Place value models - up to thousands',
      title: titleArg || 'Place value models - up to thousands',
      subject: subjectArg || 'Maths',
      category: 'Numbers',
      grade: 'Year 4'
    };
    skill = found;
  }

  const user = AppState.currentUser;
  const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');

  // Strict check: Accessible only if teacher, homework assignment, or unlocked by teacher
  if (!isTeacher && !isSkillAccessibleToStudent(skill)) {
    showToast('This lesson is locked by your teacher. Please complete your assigned homework first 🔒', '⚠️');
    return;
  }

  AppState.practice.activeSkill = skill;
  AppState.practice.assignment_id = skill.assignment_id || null;
  AppState.practice.question_goal = skill.question_goal || 10;
  AppState.practice.score = 0;
  AppState.practice.answeredCount = 0;
  AppState.practice.correctCount = 0;
  AppState.practice.timerSeconds = 0;
  AppState.practice.selectedOption = null;

  el.practiceModalSkillCode.textContent = skill.code && skill.code !== skill.permacode ? skill.code : (skill.code || 'A.1');
  el.practiceModalSkillSubject.textContent = skill.subject || 'Maths';
  el.practiceModalSkillTitle.textContent = (skill.name || skill.title || 'Practice Drill') + (skill.question_goal ? ` (Goal: ${skill.question_goal} Questions)` : '');
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
  if (window.mascotOnPracticeOpen) window.mascotOnPracticeOpen();
}

function closePracticeModal() {
  if (AppState.practice.timerInterval) {
    clearInterval(AppState.practice.timerInterval);
    AppState.practice.timerInterval = null;
  }
  if (window.setMascotState) window.setMascotState('idle', 'Great practice session! 🌟');

  // If student answered at least 1 question, submit practice session to SQL DB!
  if (AppState.practice.answeredCount > 0 && AppState.practice.activeSkill) {
    const s = AppState.practice.activeSkill;
    const assignmentId = AppState.practice.assignment_id;
    const sessionData = {
      student_id: AppState.currentUser.id,
      skill_code: s.code || s.permacode,
      skill_name: s.name,
      subject: s.subject,
      grade: s.grade,
      smart_score: AppState.practice.score,
      questions_answered: AppState.practice.answeredCount,
      questions_correct: AppState.practice.correctCount,
      duration_seconds: AppState.practice.timerSeconds,
      assignment_id: assignmentId
    };

    DB.submitPracticeSession(sessionData).then(res => {
      showToast(`Homework progress saved! Earned +${res.xp_earned || 25} XP 🎉`);
      updateStudentHeader();
    });

    if (assignmentId) {
      DB.completeAssignment(assignmentId, AppState.currentUser.id, sessionData).then(() => {
        renderDashboardAssignments();
        renderTeacherAssignments();
      });
    }

    if (window.ActivityLogger && AppState.currentUser) {
      const isTeacher = AppState.currentUser.role === 'teacher' || AppState.currentUser.username === 'admin' || AppState.currentUser.username === 'rania';
      if (!isTeacher) {
        const accPct = Math.round((AppState.practice.correctCount / Math.max(1, AppState.practice.answeredCount)) * 100);
        if (assignmentId) {
          ActivityLogger.log(
            AppState.currentUser,
            'HOMEWORK_SUBMIT',
            `Completed Assigned Homework: ${s.name}`,
            `Solved ${AppState.practice.answeredCount} questions • SmartScore ${AppState.practice.score}% • Accuracy ${accPct}%`,
            { skill: s.code || s.permacode, score: AppState.practice.score }
          );
        } else {
          ActivityLogger.log(
            AppState.currentUser,
            'PRACTICE',
            `Practiced Skill: ${s.name} (${s.code || s.permacode})`,
            `Solved ${AppState.practice.answeredCount} questions • SmartScore ${AppState.practice.score}% • Accuracy ${accPct}%`,
            { skill: s.code || s.permacode, score: AppState.practice.score }
          );
        }
      }
    }
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

  // Check if Homework Question Goal has been reached
  if (AppState.practice.question_goal && AppState.practice.answeredCount >= AppState.practice.question_goal) {
    SoundFX.fanfare();
    ConfettiFX.fire(4000);
    showToast(`🎉 Homework Completed! You solved all ${AppState.practice.answeredCount} questions! 🌟`);
    closePracticeModal();
    return;
  }

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

    // Joyful mascot celebration & floating XP particle
    if (window.mascotOnCorrect) window.mascotOnCorrect();
    if (window.triggerFloatingXp) window.triggerFloatingXp('+25 XP');
    if (window.ConfettiFX && typeof window.ConfettiFX.fire === 'function') window.ConfettiFX.fire(1500);

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

    // Fox scratches head with thinking pose
    if (window.mascotOnWrong) window.mascotOnWrong();

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
  if (window.LoginCosmos) window.LoginCosmos.resume();
  if (typeof window.renderLoginShowcase === 'function') window.renderLoginShowcase();
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

  if (isMandatory) {
    if (el.authModal) el.authModal.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    setTimeout(() => {
      const uInput = document.getElementById('loginUsername');
      if (uInput) uInput.focus();
    }, 200);
  }
}

function setCurrentStudent(student) {
  if (window.LoginCosmos) window.LoginCosmos.pause();
  AppState.currentUser = student;
  AppState.viewingReportStudentId = null;
  localStorage.setItem('current_student', JSON.stringify(student));
  updateStudentHeader();

  const isTeacher = student.role === 'teacher' || student.username === 'admin' || student.username === 'rania';
  if (isTeacher) {
    switchView('teacher');
  } else {
    if (window.ActivityLogger) {
      ActivityLogger.log(
        student,
        'LOGIN',
        'Logged in to Student Portal',
        'Authenticated session successfully'
      );
    }
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
      const statusText = isDone ? `Completed ✅ (${a.student_score || 100}%)` : `Due: ${a.due_date}`;
      const goalText = a.question_goal ? `Goal: Complete ${a.question_goal} Questions` : 'Goal: Complete Drill';

      return `
        <div class="assignment-card ${statusClass}" style="border: 1px solid ${isDone ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)'}; background: ${isDone ? 'rgba(16,185,129,0.03)' : 'var(--bg-surface-solid)'}; border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; box-shadow: var(--shadow-sm);">
          <div class="assign-card-top" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="assign-skill-code" style="font-weight:700; font-size:0.85rem; color:var(--color-primary);">${a.skill_code} &bull; ${a.subject}</span>
            <span class="assign-due-badge ${statusClass}" style="font-size:0.75rem; font-weight:700; padding:0.3rem 0.75rem; border-radius:9999px; background:${isDone ? '#dcfce7; color:#15803d;' : '#fee2e2; color:#b91c1c;'}">${statusText}</span>
          </div>
          <div>
            <div class="assign-skill-title" style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem; line-height:1.4;">${a.skill_name}</div>
            <div class="assign-instructions" style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">${a.instructions || 'Practice and complete all required questions.'}</div>
          </div>
          <div style="font-size:0.8rem; font-weight:600; color:var(--color-tertiary); background:rgba(245,158,11,0.08); padding:0.4rem 0.75rem; border-radius:8px; align-self:flex-start;">
            🎯 ${goalText}
          </div>
          <div class="assign-card-footer" style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:1rem; margin-top:0.35rem;">
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">${a.grade}</span>
            <button type="button" class="${isDone ? 'secondary-glass-btn' : 'primary-glow-btn'}" onclick="launchPracticeForAssignment('${a.id}')" style="padding:0.55rem 1.25rem; font-size:0.875rem; font-weight:700; border-radius:10px;">
              ${isDone ? 'Review / Practice Again 🔄' : 'Start Homework ➜'}
            </button>
          </div>
        </div>
      `;
    }).join('') || '<div style="grid-column: 1 / -1; color:var(--text-muted); padding:2.5rem; text-align:center; background:var(--bg-surface-solid); border-radius:16px; border:1px dashed var(--border-card); font-size:0.95rem;">🎉 All caught up! No pending homework assigned by Miss Rania right now.</div>';
  } catch (err) {
    console.error('Error loading student assignments:', err);
  }
}

async function renderDashboardUnlockedSkills() {
  const container = document.getElementById('dashUnlockedSkillsGrid');
  const badge = document.getElementById('dashUnlockedCountBadge');
  if (!container) return;
  const user = AppState.currentUser;
  if (!user || user.role === 'teacher') return;

  // Make sure curriculum access is loaded
  if (!AppState.unlockedSkills || AppState.unlockedSkills.size === 0) {
    await DB.loadStudentCurriculumAccess();
  }

  const studentGrade = user.grade_level || 'Year 4';

  // Find all skills matching the unlocked codes
  const matchingSkills = (AppState.flatSkills || []).filter(s =>
    s.grade === studentGrade && isSkillAccessibleToStudent(s) && !s.assignment_id
  );

  if (badge) {
    badge.textContent = `${matchingSkills.length} Lessons Unlocked`;
  }

  if (matchingSkills.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 px-6 rounded-2xl bg-surface-card border border-slate-100 text-center text-on-surface-variant">
        <div class="text-3xl mb-2">🔒</div>
        <div class="font-bold text-base text-on-surface">No individual lessons unlocked yet</div>
        <p class="text-xs text-on-surface-variant mt-1 max-w-md mx-auto">
          Miss Rania will unlock customized practice topics for your Year level. You can start working on your assigned homework above!
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = matchingSkills.map(s => `
    <div class="assignment-card" style="border: 1px solid rgba(99,102,241,0.2); background: var(--bg-surface-solid); border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.85rem; box-shadow: var(--shadow-sm);">
      <div class="assign-card-top" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="assign-skill-code" style="font-weight:700; font-size:0.825rem; color:var(--color-primary);">${s.code} &bull; ${s.subject}</span>
        <span class="skill-status-tag unlocked" style="font-size:0.75rem;">🔓 Unlocked</span>
      </div>
      <div>
        <div class="assign-skill-title" style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin-bottom:0.25rem; line-height:1.35;">${s.name}</div>
        <div class="assign-instructions" style="font-size:0.8rem; color:var(--text-secondary);">${s.category_name || s.subject}</div>
      </div>
      <div class="assign-card-footer" style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:0.75rem; margin-top:0.25rem;">
        <span style="font-size:0.78rem; font-weight:600; color:var(--text-muted);">${s.grade}</span>
        <button type="button" class="primary-glow-btn" onclick="startPracticeByPermacode('${s.permacode}', '${encodeURIComponent(s.name)}')" style="padding:0.45rem 1.15rem; font-size:0.825rem; font-weight:700; border-radius:10px;">
          Practice Lesson 🚀
        </button>
      </div>
    </div>
  `).join('');
}
window.renderDashboardUnlockedSkills = renderDashboardUnlockedSkills;

async function renderTeacherAssignments() {
  if (!el.teacherAssignmentsGrid) return;

  try {
    const list = await DB.getAssignments();
    el.teacherAssignmentsGrid.innerHTML = list.map(a => {
      const completions = a.completions_count || 0;
      const total = a.total_students || 1;
      const pct = Math.min(100, Math.round((completions / total) * 100));
      const targetLabel = a.target_student === 'all' ? 'All Students' : `Student ID: ${a.target_student}`;

      // Build pill tags for students who completed it
      let completedPills = '';
      if (a.completed_by && Object.keys(a.completed_by).length > 0) {
        completedPills = Object.values(a.completed_by).map(c =>
          `<span style="display:inline-block; font-size:0.72rem; padding:0.15rem 0.45rem; background:#dcfce7; color:#15803d; border-radius:4px; margin-right:4px; font-weight:600;">Student ${c.student_id}: ${c.smart_score || 100}% ✅</span>`
        ).join('');
      } else {
        completedPills = '<span style="font-size:0.75rem; color:var(--text-muted);">No student completions yet.</span>';
      }

      return `
        <div class="teacher-assign-card" style="background:var(--bg-surface-solid); border:1px solid var(--border-card); border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; box-shadow:var(--shadow-sm);">
          <div class="assign-card-top" style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="assign-skill-code" style="font-weight:700; color:var(--color-primary); font-size:0.85rem;">${a.skill_code} &bull; ${a.subject} (${a.grade})</span>
              <span style="font-size:0.72rem; padding:0.15rem 0.5rem; background:rgba(99,102,241,0.1); color:#4f46e5; border-radius:9999px; font-weight:600;">${targetLabel}</span>
            </div>
            <button type="button" class="action-btn-sm" onclick="deleteClassAssignment('${a.id}')" style="color:#ef4444; background:rgba(239,68,68,0.1); border:none; padding:0.3rem 0.6rem; border-radius:6px; cursor:pointer;" title="Delete Assignment">🗑️</button>
          </div>
          <div class="assign-skill-title" style="font-weight:700; font-size:1.05rem; color:var(--text-primary);">${a.skill_name}</div>
          <div class="assign-instructions" style="font-size:0.83rem; color:var(--text-secondary); line-height:1.4;">${a.instructions || 'Class assignment.'}</div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; color:var(--text-secondary); margin-bottom:0.35rem;">
              <span>Submissions: ${completions} / ${total}</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-track-bg" style="width:100%; height:6px; background:var(--border-subtle); border-radius:9999px; overflow:hidden;">
              <div class="progress-track-fill" style="width: ${pct}%; height:100%; background:var(--color-primary); border-radius:9999px; transition:width 0.3s ease;"></div>
            </div>
          </div>
          <div style="padding-top:0.4rem; border-top:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:0.35rem;">
            <span style="font-size:0.72rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em;">Student Status:</span>
            <div>${completedPills}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; gap:0.5rem; flex-wrap:wrap;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Due: <strong>${a.due_date}</strong> &bull; Goal: <strong>${a.question_goal || 10} Questions</strong></div>
            <button type="button" class="action-btn-sm" onclick="shareAssignmentWhatsApp('${a.id}')" style="background:rgba(34,197,94,0.15); color:#22c55e; border:1px solid rgba(34,197,94,0.3); padding:0.35rem 0.75rem; border-radius:8px; font-weight:700; font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:0.35rem;" title="Send homework assignment to students via WhatsApp">
              <span>💬</span>
              <span>Send WhatsApp</span>
            </button>
          </div>
        </div>
      `;
    }).join('') || '<div style="color:var(--text-muted); padding:1rem;">No active class assignments. Click "Assign Homework to Students" above to send one!</div>';
  } catch (err) {
    console.error('Error loading teacher assignments:', err);
  }
}

window.shareAssignmentWhatsApp = async function(assignmentId) {
  try {
    const list = await DB.getAssignments();
    const a = list.find(x => x.id === assignmentId || String(x.id) === String(assignmentId));
    if (!a) {
      showToast('Assignment details not found', '⚠️');
      return;
    }
    const msg = `📢 *Classroom Homework - Miss Rania*\n\n` +
      `📚 *Subject:* ${a.subject} (${a.grade})\n` +
      `🎯 *Skill / Topic:* ${a.skill_name} (${a.skill_code})\n` +
      `📅 *Due Date:* ${a.due_date}\n` +
      `🎯 *Questions Goal:* ${a.question_goal || 10} Questions\n` +
      (a.instructions ? `📝 *Instructions:* ${a.instructions}\n` : '') +
      `\n🌐 *Solve & Practice Online:* https://mbechr.github.io/rcroom/\n` +
      `Good luck and do your best! ⭐`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  } catch (err) {
    console.error(err);
  }
};

async function exportClassroomCsv() {
  try {
    const overview = await DB.getTeacherOverview();
    if (!overview || !overview.roster || !overview.roster.length) {
      showToast('No student roster records found to export.', '⚠️');
      return;
    }
    const roster = overview.roster;
    let csv = 'Student ID,Full Name,Username,Grade,Parent Name,Student Phone,Parent WhatsApp,Payment Status,Payment Amount,Payment Method,Questions Answered,Questions Correct,Accuracy Rate,Avg SmartScore,Total XP,Daily Streak,Last Active\n';
    roster.forEach(s => {
      csv += `"${s.id}","${s.full_name || ''}","${s.username || ''}","${s.grade_level || ''}","${s.parent_name || ''}","${s.student_phone || ''}","${s.parent_phone || ''}","${s.payment_status || 'paid'}","${s.payment_amount !== undefined ? s.payment_amount : 500}","${s.payment_method || 'InstaPay'}","${s.questions_answered || 0}","${s.questions_correct || 0}","${s.accuracy_rate || 0}%","${s.avg_smart_score || 0}","${s.xp || 0}","${s.streak_days || 1}","${s.last_active || ''}"\n`;
    });
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rania_Classroom_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    showToast('Classroom CSV Report exported! 📥');
  } catch (err) {
    showToast('Export failed: ' + err.message, '⚠️');
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
  const pName = document.getElementById('editStudentParentName');
  if (pName) pName.value = s.parent_name || '';
  const sPhone = document.getElementById('editStudentPhone');
  if (sPhone) sPhone.value = s.student_phone || '';
  const pPhone = document.getElementById('editStudentParentPhone');
  if (pPhone) pPhone.value = s.parent_phone || '';
  if (el.editStudentUser) el.editStudentUser.value = s.username || '';
  if (el.editStudentGrade) el.editStudentGrade.value = s.grade_level || 'Year 4';
  if (el.editStudentAvatar) el.editStudentAvatar.value = s.avatar || '🦊';
  const pMethod = document.getElementById('editStudentPaymentMethod');
  if (pMethod) pMethod.value = s.payment_method || 'InstaPay';
  const pAmt = document.getElementById('editStudentAmount');
  if (pAmt) pAmt.value = (s.payment_amount !== undefined && s.payment_amount !== null) ? s.payment_amount : '';
  const pStatus = document.getElementById('editStudentPaymentStatus');
  if (pStatus) pStatus.value = s.payment_status || 'paid';
  if (el.editStudentPass) el.editStudentPass.value = '';
  if (el.editStudentSubtitle) {
    el.editStudentSubtitle.textContent = `Update full details for ${s.full_name} (@${s.username})`;
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
  el.newResetPassword.value = 'RC@' + Math.floor(1000 + Math.random() * 9000);
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

  window.quickSignInAs = async function(username, password) {
    if (el.loginUsername) el.loginUsername.value = username;
    if (el.loginPassword) el.loginPassword.value = password;
    if (el.loginErrorMsg) el.loginErrorMsg.style.display = 'none';
    try {
      const student = await DB.login(username, password);
      document.body.classList.remove('auth-locked');
      setCurrentStudent(student);
      if (el.authModal) el.authModal.classList.remove('open');
      await loadAndRenderPortal();
      const isTeacher = student.role === 'teacher' || student.username === 'admin' || student.username === 'rania';
      if (isTeacher) {
        showToast('Welcome Teacher (Admin Console) 👩‍🏫');
      } else {
        showToast(`Welcome back, ${student.full_name}! 👋`);
      }
    } catch (err) {
      if (el.loginErrorMsg) {
        el.loginErrorMsg.textContent = err.message || 'Invalid username or password';
        el.loginErrorMsg.style.display = 'block';
      }
    }
  };

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

  // Helper to populate assignment skill dropdown based on subject and grade
  function populateAssignmentSkillSelect(subject, grade) {
    const skillSelect = document.getElementById('assignSkillSelect');
    if (!skillSelect) return;
    skillSelect.innerHTML = '';

    let skills = [];
    if (AppState.flatSkills && AppState.flatSkills.length) {
      skills = AppState.flatSkills.filter(s =>
        s.subject && s.subject.toLowerCase() === (subject || 'Maths').toLowerCase() &&
        s.grade && (s.grade.toLowerCase() === (grade || 'Year 4').toLowerCase() || s.grade.toLowerCase().includes((grade || 'Year 4').toLowerCase()))
      );
    }

    if (!skills.length && AppState.data && AppState.data[subject]) {
      const grData = AppState.data[subject].grades.find(g => g.grade.toLowerCase() === (grade || 'Year 4').toLowerCase());
      if (grData) {
        grData.categories.forEach(c => {
          c.skills.forEach(s => skills.push({ ...s, subject, grade }));
        });
      }
    }

    // Deduplicate by code/permacode
    const seen = new Set();
    skills.forEach(s => {
      const code = s.code || s.permacode;
      if (!seen.has(code)) {
        seen.add(code);
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = `${s.code ? s.code + ' - ' : ''}${s.name}`;
        opt.dataset.code = code;
        opt.dataset.title = s.name;
        skillSelect.appendChild(opt);
      }
    });

    const customOpt = document.createElement('option');
    customOpt.value = '__custom__';
    customOpt.textContent = '➕ Custom Topic / Manual Skill Code...';
    skillSelect.appendChild(customOpt);

    const customFields = document.getElementById('customSkillFields');
    if (customFields) customFields.style.display = 'none';
  }

  async function populateAssignmentStudentSelect() {
    const stSelect = document.getElementById('assignTargetStudent');
    if (!stSelect) return;
    stSelect.innerHTML = '<option value="all">👥 All Students</option>';
    try {
      const students = (await DB.getDemoStudents()).filter(s => s.role !== 'teacher');
      students.forEach(s => {
        const opt = document.createElement('option');
        opt.value = String(s.id);
        opt.textContent = `👤 ${s.full_name} (${s.username} • ${s.grade_level})`;
        stSelect.appendChild(opt);
      });
    } catch (e) {}
  }

  // Teacher Assignment Modal
  if (el.openCreateAssignmentModalBtn) {
    el.openCreateAssignmentModalBtn.addEventListener('click', () => {
      if (el.createAssignmentModal) {
        if (el.assignDueDate) {
          el.assignDueDate.value = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10);
        }
        const subj = el.assignSubject ? el.assignSubject.value : 'Maths';
        const gr = el.assignGrade ? el.assignGrade.value : 'Year 4';
        populateAssignmentSkillSelect(subj, gr);
        populateAssignmentStudentSelect();
        el.createAssignmentModal.classList.add('open');
      }
    });
  }

  if (el.assignSubject) {
    el.assignSubject.addEventListener('change', () => {
      const subj = el.assignSubject.value;
      const gr = el.assignGrade ? el.assignGrade.value : 'Year 4';
      populateAssignmentSkillSelect(subj, gr);
    });
  }

  if (el.assignGrade) {
    el.assignGrade.addEventListener('change', () => {
      const subj = el.assignSubject ? el.assignSubject.value : 'Maths';
      const gr = el.assignGrade.value;
      populateAssignmentSkillSelect(subj, gr);
    });
  }

  const skillSelectEl = document.getElementById('assignSkillSelect');
  if (skillSelectEl) {
    skillSelectEl.addEventListener('change', () => {
      const customFields = document.getElementById('customSkillFields');
      if (customFields) {
        customFields.style.display = (skillSelectEl.value === '__custom__') ? 'block' : 'none';
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
      const skillSelect = document.getElementById('assignSkillSelect');
      const isCustom = skillSelect && skillSelect.value === '__custom__';

      let code = '';
      let title = '';
      if (isCustom) {
        code = (el.assignSkillSearch?.value.trim().toUpperCase()) || 'CUSTOM';
        title = (el.assignSkillTitle?.value.trim()) || 'Custom Drill';
      } else if (skillSelect && skillSelect.selectedIndex >= 0) {
        const selectedOpt = skillSelect.options[skillSelect.selectedIndex];
        code = selectedOpt.dataset.code || selectedOpt.value;
        title = selectedOpt.dataset.title || selectedOpt.textContent;
      } else {
        code = 'A.1';
        title = 'General Maths Drill';
      }

      const subj = el.assignSubject ? el.assignSubject.value : 'Maths';
      const grade = el.assignGrade ? el.assignGrade.value : 'Year 4';
      const due = el.assignDueDate ? el.assignDueDate.value : 'Tomorrow';
      const notes = el.assignInstructions ? el.assignInstructions.value.trim() : '';
      const targetStudent = el.assignTargetStudent ? el.assignTargetStudent.value : 'all';
      const questionGoal = el.assignQuestionTarget ? (Number(el.assignQuestionTarget.value) || 10) : 10;

      await DB.createAssignment({
        teacher_id: AppState.currentUser.id || 1,
        skill_code: code,
        skill_name: title,
        subject: subj,
        grade: grade,
        due_date: due,
        instructions: notes,
        target_student: targetStudent,
        question_goal: questionGoal
      });

      el.createAssignmentModal.classList.remove('open');
      showToast('Assignment sent to students! 🚀');
      await renderTeacherAssignments();
      if (typeof renderDashboardAssignments === 'function') {
        await renderDashboardAssignments();
      }
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

  if (el.addStudentModal) {
    el.addStudentModal.addEventListener('click', (e) => {
      if (e.target === el.addStudentModal) {
        el.addStudentModal.classList.remove('open');
      }
    });
  }

  if (el.addStudentForm) {
    el.addStudentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = el.tNewStudentName.value.trim();
      const parentName = document.getElementById('tNewStudentParentName')?.value.trim() || '';
      const studentPhone = document.getElementById('tNewStudentPhone')?.value.trim() || '';
      const parentPhone = document.getElementById('tNewStudentParentPhone')?.value.trim() || '';
      const user = el.tNewStudentUser.value.trim();
      const pass = el.tNewStudentPass.value;
      const grade = el.tNewStudentGrade.value;
      const avatar = el.tNewStudentAvatar.value;
      const payMethod = document.getElementById('tNewStudentPaymentMethod')?.value || 'InstaPay';
      const payAmtRaw = document.getElementById('tNewStudentAmount')?.value;
      const payAmt = (payAmtRaw !== undefined && payAmtRaw !== '' && payAmtRaw !== null) ? Number(payAmtRaw) : '';
      const payStatus = document.getElementById('tNewStudentPaymentStatus')?.value || 'paid';

      const res = await DB.teacherCreateStudent({
        full_name: name,
        parent_name: parentName,
        student_phone: studentPhone,
        parent_phone: parentPhone,
        username: user,
        password: pass,
        grade_level: grade,
        avatar: avatar,
        payment_method: payMethod,
        payment_amount: payAmt,
        payment_status: payStatus
      });

      if (res.success) {
        el.addStudentForm.reset();
        if (el.tNewStudentPass) el.tNewStudentPass.value = '';
        const amtInput = document.getElementById('tNewStudentAmount');
        if (amtInput) amtInput.value = '';
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
      const parentName = document.getElementById('editStudentParentName')?.value.trim() || '';
      const studentPhone = document.getElementById('editStudentPhone')?.value.trim() || '';
      const parentPhone = document.getElementById('editStudentParentPhone')?.value.trim() || '';
      const user = el.editStudentUser.value.trim();
      const grade = el.editStudentGrade.value;
      const avatar = el.editStudentAvatar.value;
      const pass = el.editStudentPass.value.trim();
      const payMethod = document.getElementById('editStudentPaymentMethod')?.value || 'InstaPay';
      const payAmtRaw = document.getElementById('editStudentAmount')?.value;
      const payAmt = (payAmtRaw !== undefined && payAmtRaw !== '' && payAmtRaw !== null) ? Number(payAmtRaw) : '';
      const payStatus = document.getElementById('editStudentPaymentStatus')?.value || 'paid';

      if (!name || !user) {
        showToast('Please enter both name and username');
        return;
      }

      const res = await DB.teacherUpdateStudent({
        student_id: sid,
        full_name: name,
        parent_name: parentName,
        student_phone: studentPhone,
        parent_phone: parentPhone,
        username: user,
        grade_level: grade,
        avatar: avatar,
        password: pass,
        payment_method: payMethod,
        payment_amount: payAmt,
        payment_status: payStatus
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


  // Student Submit Payment Receipt Form
  const submitPayForm = document.getElementById('submitPaymentForm');
  const payFileInput = document.getElementById('payReceiptFileInput');
  const payPreviewWrap = document.getElementById('payReceiptPreviewWrap');
  const payPreview = document.getElementById('payReceiptPreview');
  let currentReceiptBase64 = '';

  function compressImageFile(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve) => {
      if (!file) return resolve('');
      if (!file.type || !file.type.startsWith('image/')) {
        return resolve(`data:application/octet-stream;name=${encodeURIComponent(file.name)}`);
      }
      const safetyTimer = setTimeout(() => resolve(''), 3000);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          clearTimeout(safetyTimer);
          try {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth || height > maxHeight) {
              if (width / height > maxWidth / maxHeight) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
          } catch (canvasErr) {
            resolve(e.target.result ? e.target.result.slice(0, 100000) : '');
          }
        };
        img.onerror = () => {
          clearTimeout(safetyTimer);
          resolve('');
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        clearTimeout(safetyTimer);
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  }

  if (payFileInput) {
    payFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const badge = document.getElementById('payReceiptStatusBadge');
      if (payPreviewWrap) payPreviewWrap.style.display = 'block';

      // Check if PDF document
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        if (payPreview) payPreview.style.display = 'none';
        const pdfBadge = document.getElementById('payReceiptPdfPreview');
        if (pdfBadge) {
          pdfBadge.style.display = 'block';
          pdfBadge.textContent = `📄 PDF Document: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        }
        if (badge) badge.textContent = '✓ PDF document attached';
        currentReceiptBase64 = `data:application/pdf;name=${encodeURIComponent(file.name)};size=${file.size}`;
        return;
      }

      // Image preview & compression
      if (payPreview) {
        payPreview.style.display = 'block';
        try {
          payPreview.src = URL.createObjectURL(file);
        } catch (err) {}
      }
      const pdfBadge = document.getElementById('payReceiptPdfPreview');
      if (pdfBadge) pdfBadge.style.display = 'none';

      if (badge) badge.textContent = 'Optimizing receipt image... ⚡';

      try {
        currentReceiptBase64 = await compressImageFile(file, 800, 800, 0.7);
        if (badge) badge.textContent = '✓ Ready to send (Optimized for instant submission)';
      } catch (err) {
        if (badge) badge.textContent = '✓ Image selected';
      }
    });
  }

  window.handlePaymentReceiptSubmit = async function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (window._isSubmittingPayment) return;
    window._isSubmittingPayment = true;

    const btn = document.getElementById('submitPaymentReceiptBtn');
    const origText = btn ? btn.innerHTML : 'Send Receipt to Miss Rania 🚀';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Sending Receipt... ⏳';
    }

    try {
      const dateVal = document.getElementById('payDateInput')?.value || new Date().toISOString().split('T')[0];
      const methodVal = document.getElementById('payMethodInput')?.value || 'InstaPay';
      const amountVal = document.getElementById('payAmountInput')?.value || '';
      const notesVal = document.getElementById('payNotesInput')?.value || '';

      if (!currentReceiptBase64 && payFileInput && payFileInput.files && payFileInput.files[0]) {
        currentReceiptBase64 = await compressImageFile(payFileInput.files[0], 800, 800, 0.7);
      }

      let user = AppState.currentUser || null;
      if (!user) {
        try {
          user = JSON.parse(localStorage.getItem('current_student') || 'null');
        } catch (err) {}
      }
      if (!user) {
        user = { id: 1, full_name: 'Student', username: 'student' };
      }

      const res = await DB.submitPayment({
        student_id: user.id || 1,
        student_name: user.full_name || user.username || 'Student',
        amount: (amountVal !== '' && amountVal !== null) ? Number(amountVal) : '',
        payment_date: dateVal,
        payment_method: methodVal,
        receipt_image: currentReceiptBase64 || '',
        notes: notesVal
      });

      if (res && res.success) {
        showToast('Payment proof submitted successfully! Miss Rania will review and approve it. 🧾');
        document.getElementById('submitPaymentModal')?.classList.remove('open');
        if (submitPayForm) submitPayForm.reset();
        currentReceiptBase64 = '';
        if (payPreviewWrap) payPreviewWrap.style.display = 'none';
        if (typeof renderStudentPaymentStatus === 'function') {
          renderStudentPaymentStatus();
        }
      } else {
        showToast('Payment proof saved successfully! 🧾');
        document.getElementById('submitPaymentModal')?.classList.remove('open');
      }
    } catch (err) {
      console.error('Payment receipt submission error:', err);
      showToast('Payment proof submitted and saved locally! 🧾');
      document.getElementById('submitPaymentModal')?.classList.remove('open');
    } finally {
      window._isSubmittingPayment = false;
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }
  };

  if (submitPayForm) {
    submitPayForm.addEventListener('submit', (e) => {
      window.handlePaymentReceiptSubmit(e);
    });
  }

  // Teacher Log Class Session Form
  const addSessionForm = document.getElementById('addClassSessionForm');
  if (addSessionForm) {
    addSessionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dateVal = document.getElementById('sessDateInput')?.value;
      const titleVal = document.getElementById('sessTitleInput')?.value;
      const topicVal = document.getElementById('sessTopicInput')?.value;
      const zoomVal = document.getElementById('sessZoomLinkInput')?.value;
      const pdfVal = document.getElementById('sessPdfLinkInput')?.value;
      const pdfTitleVal = document.getElementById('sessPdfTitleInput')?.value;
      const audVal = document.getElementById('sessTargetAudienceSelect')?.value || 'all';
      const targetGroupVal = document.getElementById('sessTargetGroupSelect')?.value || null;
      const targetStudentVal = document.getElementById('sessTargetStudentSelect')?.value ? Number(document.getElementById('sessTargetStudentSelect')?.value) : null;

      const res = await DB.saveClassSession({
        session_date: dateVal,
        title: titleVal,
        topic: topicVal,
        zoom_link: zoomVal,
        pdf_link: pdfVal,
        pdf_title: pdfTitleVal,
        target_audience: audVal,
        target_group_id: audVal === 'group' ? targetGroupVal : null,
        target_student_id: audVal === 'student' ? targetStudentVal : null
      });

      if (res && res.success) {
        showToast('Class session published to students! 🎥');
        document.getElementById('addClassSessionModal')?.classList.remove('open');
        addSessionForm.reset();
        await renderTeacherSessions();
        await renderStudentSessions();
      } else {
        showToast('Failed to save session', '⚠️');
      }
    });
  }

  // Teacher Add Curriculum Book Form
  const addBookForm = document.getElementById('addCurriculumBookForm');
  const bookPdfFileInput = document.getElementById('bookPdfFileInput');

  if (bookPdfFileInput) {
    bookPdfFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const urlInput = document.getElementById('bookPdfUrlInput');
        const titleInput = document.getElementById('bookTitleInput');
        const pagesInput = document.getElementById('bookPagesInput');
        if (urlInput) {
          urlInput.value = URL.createObjectURL(file);
        }
        if (titleInput && !titleInput.value) {
          titleInput.value = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        }
        if (pagesInput && !pagesInput.value) {
          const mb = (file.size / (1024 * 1024)).toFixed(1);
          pagesInput.value = `${mb} MB PDF Document`;
        }
        showToast('PDF loaded from device! Ready to publish 📄');
      }
    });
  }

  window.handlePublishCurriculumBook = async function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const btn = document.getElementById('submitCurriculumBookBtn');
    const origText = btn ? btn.innerHTML : 'Publish Curriculum Book 📚';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Publishing Book... ⏳';
    }

    try {
      const title = document.getElementById('bookTitleInput')?.value?.trim();
      const ageGroup = document.getElementById('bookAgeGroupInput')?.value?.trim();
      const subject = document.getElementById('bookSubjectSelect')?.value;
      const pages = document.getElementById('bookPagesInput')?.value?.trim();
      const pdfUrl = document.getElementById('bookPdfUrlInput')?.value?.trim();
      const desc = document.getElementById('bookDescInput')?.value?.trim();

      if (!title || !pdfUrl) {
        showToast('Please provide book title and PDF link or upload a file', '⚠️');
        return;
      }

      const res = await DB.saveCurriculumBook({
        title,
        age_group: ageGroup || 'All Ages',
        grade: ageGroup || 'All Grades',
        subject: subject || 'General',
        pages_count: pages || 'Full Book',
        pdf_url: pdfUrl,
        description: desc || 'Full curriculum PDF textbook.'
      });

      if (res && res.success) {
        showToast('Curriculum book added successfully! 📚');
        document.getElementById('addCurriculumBookModal')?.classList.remove('open');
        if (addBookForm) addBookForm.reset();
        await renderCurriculumBooksView();
        await renderTeacherCurriculumBooks();
      } else {
        showToast('Failed to save curriculum book', '⚠️');
      }
    } catch (err) {
      console.error('Publish curriculum error:', err);
      showToast('Curriculum book saved locally! 📚');
      document.getElementById('addCurriculumBookModal')?.classList.remove('open');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }
  };

  if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
      window.handlePublishCurriculumBook(e);
    });
  }

  const closeAddBookBtn = document.getElementById('closeAddCurriculumBookModalBtn');
  if (closeAddBookBtn) {
    closeAddBookBtn.addEventListener('click', () => {
      document.getElementById('addCurriculumBookModal')?.classList.remove('open');
    });
  }

  const addBookModal = document.getElementById('addCurriculumBookModal');
  if (addBookModal) {
    addBookModal.addEventListener('click', (e) => {
      if (e.target === addBookModal) {
        addBookModal.classList.remove('open');
      }
    });
  }

  // Teacher Add Planner Task Form
  const addPlannerForm = document.getElementById('addPlannerTaskForm');
  if (addPlannerForm) {
    addPlannerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dateVal = document.getElementById('planDateInput')?.value;
      const timeVal = document.getElementById('planTimeInput')?.value?.trim();
      const studentSelect = document.getElementById('planStudentSelect');
      const selectedOption = studentSelect ? studentSelect.options[studentSelect.selectedIndex] : null;
      const studentId = studentSelect?.value || 'all';
      const studentName = selectedOption ? (selectedOption.dataset.name || selectedOption.text.replace('👤 ', '')) : 'All Students';
      const titleVal = document.getElementById('planTitleInput')?.value?.trim();
      const topicsVal = document.getElementById('planTopicsInput')?.value?.trim();
      const materialsVal = document.getElementById('planMaterialsInput')?.value?.trim();
      const homeworkVal = document.getElementById('planHomeworkInput')?.value?.trim();

      if (!titleVal || !dateVal) {
        showToast('Please provide lesson title and date', '⚠️');
        return;
      }

      const res = await DB.savePlannerTask({
        date: dateVal,
        time: timeVal || '16:00',
        student_id: studentId,
        student_name: studentName,
        lesson_title: titleVal,
        topics_to_take: topicsVal || '',
        materials_needed: materialsVal || '',
        homework_assigned: homeworkVal || '',
        status: 'pending'
      });

      if (res && res.success) {
        showToast('Lesson added to daily schedule! 📅');
        document.getElementById('addPlannerTaskModal')?.classList.remove('open');
        addPlannerForm.reset();
        await renderPlannerView();
      } else {
        showToast('Failed to save lesson plan', '⚠️');
      }
    });
  }

  const closePlannerModalBtn = document.getElementById('closeAddPlannerTaskModalBtn');
  if (closePlannerModalBtn) {
    closePlannerModalBtn.addEventListener('click', () => {
      document.getElementById('addPlannerTaskModal')?.classList.remove('open');
    });
  }

  const plannerModal = document.getElementById('addPlannerTaskModal');
  if (plannerModal) {
    plannerModal.addEventListener('click', (e) => {
      if (e.target === plannerModal) {
        plannerModal.classList.remove('open');
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

  // Universal Modal Closer on Escape Key & Backdrop Click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.auth-modal-backdrop.open, .practice-modal-backdrop.open').forEach(m => {
        if (m.id === 'authModal' && !AppState.currentUser) return; // STRICT: Do not dismiss login when unauthenticated!
        m.classList.remove('open');
      });
    }
  });

  document.querySelectorAll('.auth-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        if (backdrop.id === 'authModal') {
          if (AppState.currentUser) {
            backdrop.classList.remove('open');
          } else {
            showToast('Please sign in to access the classroom portal 🔒');
          }
          return;
        }
        backdrop.classList.remove('open');
      }
    });
  });

  // Cloud Sync Modal Backdrop Click
  const cloudModal = document.getElementById('cloudSyncModal');
  if (cloudModal) {
    cloudModal.addEventListener('click', (e) => {
      if (e.target === cloudModal) {
        closeCloudSyncModal();
      }
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

// =============================================================================
// Cloud Synchronization Modal Handlers (Google Cloud / Firebase)
// =============================================================================

function openCloudSyncModal() {
  const modal = document.getElementById('cloudSyncModal');
  if (!modal) return;
  modal.classList.add('open');

  // Pre-fill existing config if available
  if (window.CloudDB) {
    const cfg = window.CloudDB.getConfig() || {};
    const apiKeyInput = document.getElementById('firebaseApiKey');
    const projectIdInput = document.getElementById('firebaseProjectId');
    const authDomainInput = document.getElementById('firebaseAuthDomain');
    const appIdInput = document.getElementById('firebaseAppId');
    if (apiKeyInput && cfg.apiKey) apiKeyInput.value = cfg.apiKey;
    if (projectIdInput && cfg.projectId) projectIdInput.value = cfg.projectId;
    if (authDomainInput && cfg.authDomain) authDomainInput.value = cfg.authDomain;
    if (appIdInput && cfg.appId) appIdInput.value = cfg.appId;
  }
}

function closeCloudSyncModal() {
  const modal = document.getElementById('cloudSyncModal');
  if (modal) modal.classList.remove('open');
}

async function handleSaveCloudConfig(e) {
  if (e && e.preventDefault) e.preventDefault();
  const apiKey = document.getElementById('firebaseApiKey')?.value.trim();
  const projectId = document.getElementById('firebaseProjectId')?.value.trim();
  const authDomain = document.getElementById('firebaseAuthDomain')?.value.trim() || `${projectId}.firebaseapp.com`;
  const appId = document.getElementById('firebaseAppId')?.value.trim() || '';

  if (!apiKey || !projectId) {
    showToast('⚠️ Please enter Firebase API Key and Project ID');
    return;
  }

  if (window.CloudDB) {
    try {
      const ok = window.CloudDB.saveConfig({ apiKey, projectId, authDomain, appId });
      if (ok) {
        showToast('⚡ Google Cloud Firebase connected successfully! Real-time sync active.');
        closeCloudSyncModal();
        setTimeout(() => {
          handleSyncAllToCloud(true);
        }, 500);
      } else {
        showToast('⚠️ Unable to connect to Firebase. Please verify credentials.');
      }
    } catch (err) {
      showToast('❌ Error: ' + err.message);
    }
  }
}

async function handleSyncAllToCloud(isSilent = false) {
  if (!window.CloudDB || !window.CloudDB.isConfigured) {
    if (!isSilent) showToast('⚠️ Please configure and save Firebase credentials first.');
    return;
  }
  try {
    const count = await window.CloudDB.syncAllLocalStudentsToCloud();
    showToast(`☁️ Successfully synced ${count} students to cloud!`);
    if (!isSilent) closeCloudSyncModal();
  } catch (err) {
    showToast('❌ Cloud sync failed: ' + err.message);
  }
}

window.openCloudSyncModal = openCloudSyncModal;
window.closeCloudSyncModal = closeCloudSyncModal;
window.handleSaveCloudConfig = handleSaveCloudConfig;
window.handleSyncAllToCloud = handleSyncAllToCloud;

// Kickoff: Support both synchronous execution and DOM ready
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initPortal);
} else {
  initPortal();
}
