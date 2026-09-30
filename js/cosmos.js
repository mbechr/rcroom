/**
 * Velvet Obsidian Cosmos Canvas (Interactive Animated Login Screen Background)
 * & Stage Showcase Renderer
 */

const LoginCosmos = {
  canvas: null,
  ctx: null,
  particles: [],
  meteors: [],
  animId: null,
  mouse: { x: null, y: null, radius: 150 },
  isRunning: false,
  lastMeteorTime: 0,

  init() {
    this.canvas = document.getElementById('loginCosmosCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.createParticles();
    if (typeof renderLoginShowcase === 'function') {
      renderLoginShowcase();
    }
    this.start();
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles() {
    this.particles = [];
    const count = Math.min(90, Math.max(45, Math.floor((window.innerWidth * window.innerHeight) / 12000)));
    const colors = [
      'rgba(0, 229, 255, 0.9)',   // Celestial Cyan
      'rgba(168, 85, 247, 0.9)',  // Royal Violet
      'rgba(251, 191, 36, 0.85)', // Amber Gold
      'rgba(52, 211, 153, 0.85)', // Emerald
      'rgba(255, 255, 255, 0.95)' // Starlight
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * (this.canvas ? this.canvas.width : window.innerWidth),
        y: Math.random() * (this.canvas ? this.canvas.height : window.innerHeight),
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.6 + 0.3,
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.025 + 0.008,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        orbitRadius: Math.random() * 40 + 10,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.015
      });
    }
  },

  spawnMeteor() {
    if (!this.canvas) return;
    const startX = Math.random() * this.canvas.width * 0.8;
    const startY = Math.random() * (this.canvas.height * 0.3);
    const length = Math.random() * 120 + 80;
    const speed = Math.random() * 8 + 7;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2;

    this.meteors.push({
      x: startX,
      y: startY,
      len: length,
      speed: speed,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      opacity: 1,
      decay: Math.random() * 0.02 + 0.015,
      color: Math.random() > 0.5 ? '#00e5ff' : '#a855f7'
    });
  },

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastMeteorTime = Date.now();
    this.animate();
  },

  pause() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  },

  resume() {
    if (!this.isRunning) {
      this.start();
    }
  },

  animate() {
    if (!this.isRunning || !this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Periodic Meteor Streaks
    const now = Date.now();
    if (now - this.lastMeteorTime > 3200 && Math.random() > 0.35) {
      this.spawnMeteor();
      this.lastMeteorTime = now;
    }

    // Draw and Update Meteors
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.opacity -= m.decay;

      if (m.opacity <= 0 || m.x > this.canvas.width || m.y > this.canvas.height) {
        this.meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - (m.vx / m.speed) * m.len;
      const tailY = m.y - (m.vy / m.speed) * m.len;
      const grad = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, m.color);
      grad.addColorStop(0.3, `rgba(255, 255, 255, ${m.opacity})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.save();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2.2;
      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(m.x, m.y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = m.color;
      this.ctx.shadowBlur = 12;
      this.ctx.beginPath();
      this.ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw Constellation Connection Lines
    const maxDist = 110;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.18;
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw and Update Particles with Mouse Repulsion
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.orbitAngle += p.orbitSpeed;
      p.x += p.vx + Math.cos(p.orbitAngle) * 0.2;
      p.y += p.vy + Math.sin(p.orbitAngle) * 0.2;

      p.alpha = p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed) * 0.25;

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 5;
          p.y += (dy / dist) * force * 5;
        }
      }

      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
};

function renderLoginShowcase() {
  const tickerTrack = document.getElementById('loginTickerTrack');
  const topGainersList = document.getElementById('topGainersList');
  const topTopicsList = document.getElementById('topTopicsList');

  const defaultTopGainers = [
    { rank: '👑', name: 'Beshr Mohamed', avatar: '🦊', grade: 'Year 4', xp: 1540, skill: 'Fractions & Decimals', count: 48 },
    { rank: '🥈', name: 'Sophia Chen', avatar: '🐼', grade: 'Year 4', xp: 1380, skill: 'Geometry & Angles', count: 42 },
    { rank: '🥉', name: 'Alex Turner', avatar: '🦁', grade: 'Year 4', xp: 1250, skill: 'Multiplication Mastery', count: 39 },
    { rank: '⭐', name: 'Liam Johnson', avatar: '🚀', grade: 'Year 4', xp: 1120, skill: 'Light & Shadows', count: 35 },
    { rank: '⭐', name: 'Emma Watson', avatar: '🦄', grade: 'Year 4', xp: 990, skill: 'Data & Graphs', count: 31 }
  ];

  let displayGainers = defaultTopGainers;
  try {
    if (typeof window.DB !== 'undefined' && window.DB.getStudents) {
      const students = window.DB.getStudents().filter(s => s.role !== 'teacher' && s.username !== 'admin' && s.username !== 'rania');
      if (students && students.length >= 2) {
        const sorted = [...students].sort((a, b) => (b.xp || 0) - (a.xp || 0));
        const medals = ['👑', '🥈', '🥉', '⭐', '⭐'];
        const sampleSkills = ['Fractions & Decimals', 'Mental Speed Maths', 'Geometry & Angles', 'Light & Forces', 'Data & Probability'];
        displayGainers = sorted.slice(0, 5).map((s, idx) => ({
          rank: medals[idx] || '⭐',
          name: s.full_name || s.username,
          avatar: s.avatar || '🦊',
          grade: s.grade_level || 'Year 4',
          xp: Math.max(s.xp || 0, 750 + (5 - idx) * 160),
          skill: sampleSkills[idx % sampleSkills.length],
          count: 25 + (5 - idx) * 5
        }));
      }
    }
  } catch (e) {
    console.warn('Could not read students for showcase, using defaults:', e);
  }

  const topTopics = [
    { icon: '📐', title: 'Stage 4 Mathematics', sub: '128 Solved • Fractions & Decimals', rate: '98% Mastery', pct: 98 },
    { icon: '⚡', title: 'Speed Arithmetic Sprints', sub: '94 Sprints • Times Tables', rate: '96% Accuracy', pct: 96 },
    { icon: '🔬', title: 'Primary Stage 4 Science', sub: '86 Solved • Forces & Light', rate: '95% Accuracy', pct: 95 },
    { icon: '🎯', title: 'Geometry & Angles', sub: '74 Solved • Polygons & Shapes', rate: '92% Accuracy', pct: 92 }
  ];

  // Render Ticker
  if (tickerTrack) {
    const tickerItems = [
      ...displayGainers.map(g => `
        <div class="ticker-item">
          <span>${g.rank}</span>
          <strong>${g.name}</strong>
          <span class="ticker-xp">${g.xp.toLocaleString()} XP</span>
          <span class="ticker-skill">🎯 ${g.skill} (${g.count} Solved)</span>
        </div>
      `),
      ...topTopics.map(t => `
        <div class="ticker-item">
          <span>${t.icon}</span>
          <strong>${t.title}</strong>
          <span class="ticker-xp" style="color:#10b981; background:rgba(16,185,129,0.14);">${t.rate}</span>
        </div>
      `)
    ];
    tickerTrack.innerHTML = tickerItems.join('') + tickerItems.join('');
  }

  // Render Left Side Showcase: Top Gainers
  if (topGainersList) {
    topGainersList.innerHTML = displayGainers.map((g, idx) => `
      <div class="login-card-item">
        <div class="login-card-rank">${g.rank}</div>
        <div class="login-card-avatar">${g.avatar}</div>
        <div class="login-card-info">
          <div class="login-card-name">${g.name}</div>
          <div class="login-card-sub">${g.grade} • ${g.skill}</div>
        </div>
        <div class="login-card-stat">
          <span class="stat-num">${g.xp.toLocaleString()}</span>
          <span class="stat-label">XP</span>
        </div>
      </div>
    `).join('');
  }

  // Render Right Side Showcase: Top Active Curriculum Modules
  if (topTopicsList) {
    topTopicsList.innerHTML = topTopics.map(t => `
      <div class="curriculum-bar-item" style="border-radius: 14px; padding: 12px; margin-bottom: 8px;">
        <div class="curriculum-bar-header">
          <div class="curriculum-bar-icon">${t.icon}</div>
          <div class="curriculum-bar-badge">${t.rate}</div>
        </div>
        <div class="curriculum-bar-title">${t.title}</div>
        <div class="curriculum-bar-sub">${t.sub}</div>
        <div class="topic-progress-bar" style="margin-top: 6px;">
          <div class="topic-progress-fill" style="width: ${t.pct}%;"></div>
        </div>
      </div>
    `).join('');
  }
}

window.LoginCosmos = LoginCosmos;
window.renderLoginShowcase = renderLoginShowcase;
