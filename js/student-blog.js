// =============================================================================
// STUDENT BLOG & ESSAY ENGINE (Student Submissions, Teacher Curation & Landing Showcase)
// =============================================================================

const StudentBlog = {
  articles: [
    {
      id: 1,
      title: 'Why Fractions & Decimals Rule the Solar System',
      author: 'Beshr Mohamed',
      avatar: '🦊',
      grade: 'Year 4',
      category: 'Science & Math',
      date: '2026-09-28',
      featured: true,
      summary: 'Exploring planetary orbital periods, ratios of gravity on Mars, and how decimal precision guides rocket trajectories.',
      content: `Have you ever wondered why astronomers need decimals? When planetary scientists calculate the distance from Earth to Mars, using whole numbers is simply not enough. In our Stage 4 Maths lessons with Miss Rania, we learned that decimals allow us to divide distances into tenths, hundredths, and thousandths of astronomical units.\n\nFurthermore, ratios and fractions explain why the moon's gravity is exactly 1/6th of Earth's gravity. When you weigh 36 kg on Earth, you only weigh 6 kg on the lunar surface! Mathematics is truly the language of the universe.`
    },
    {
      id: 2,
      title: 'The Geometry of Honeycombs: Nature’s Perfect Hexagons',
      author: 'Sophia Chen',
      avatar: '🐼',
      grade: 'Year 4',
      category: 'Geometry',
      date: '2026-09-27',
      featured: true,
      summary: 'How bees use regular hexagons to maximize honey storage area while minimizing perimeter and wax consumption.',
      content: `Bees are among nature's greatest mathematicians. A regular hexagon has six equal sides and six interior angles of 120 degrees each. When hexagons are placed together, they tessellate perfectly with zero gaps and zero wasted space.\n\nIn our geometry unit, we compared circles, squares, and hexagons. We discovered that hexagons hold the maximum amount of honey while using the least perimeter of beeswax!`
    },
    {
      id: 3,
      title: 'Speed Calculation Secrets: Mastering the Times Tables',
      author: 'Alex Turner',
      avatar: '🦁',
      grade: 'Year 4',
      category: 'Mental Math',
      date: '2026-09-25',
      featured: true,
      summary: 'Mental arithmetic shortcuts, doubling strategies, and the distributive property for rapid calculation.',
      content: `When solving 14 × 6 mentally, you don't need pencil and paper. Instead, break 14 into (10 + 4). Multiply 10 × 6 = 60, and 4 × 6 = 24. Then add 60 + 24 = 84! This is called the distributive property of multiplication. Practicing daily on our classroom portal helped me increase my speed by over 200%.`
    },
    {
      id: 4,
      title: 'Photosynthesis: How Plants Power Our Planet',
      author: 'Emma Watson',
      avatar: '🦄',
      grade: 'Year 4',
      category: 'Science',
      date: '2026-09-24',
      featured: true,
      summary: 'Understanding chlorophyll, carbon dioxide absorption, and oxygen production in primary school biology.',
      content: `Every breath we take is powered by green plants. Through photosynthesis, plant chloroplasts trap sunlight photons to transform water (H2O) and atmospheric carbon dioxide (CO2) into glucose and oxygen (O2). Miss Rania demonstrated this using leaf floating experiments in class!`
    }
  ],

  init() {
    this.loadCustomArticles();
  },

  loadCustomArticles() {
    try {
      const saved = localStorage.getItem('rc_student_blog_articles');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom) && custom.length > 0) {
          const ids = new Set(this.articles.map(a => a.id));
          custom.forEach(a => {
            if (!ids.has(a.id)) this.articles.unshift(a);
            else {
              // Update featured status if modified
              const match = this.articles.find(x => x.id === a.id);
              if (match) match.featured = a.featured;
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not load blog articles:', e);
    }
  },

  saveCustomArticle(articleData) {
    const user = (typeof AppState !== 'undefined' && AppState.currentUser) ? AppState.currentUser : { full_name: 'Student', avatar: '🦊', grade_level: 'Year 4' };
    const newArt = {
      id: Date.now(),
      title: articleData.title.trim(),
      author: user.full_name || 'Student Author',
      avatar: user.avatar || '🦊',
      grade: user.grade_level || 'Year 4',
      category: articleData.category || 'General',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      summary: (articleData.content || '').slice(0, 130) + '...',
      content: articleData.content.trim()
    };

    this.articles.unshift(newArt);
    this.persist();

    if (window.ActivityLogger && user) {
      ActivityLogger.log(
        user,
        'BLOG_POST',
        `Published Student Essay: "${newArt.title}"`,
        `Category: ${newArt.category} • Read by class community`,
        { articleId: newArt.id }
      );
    }

    return newArt;
  },

  toggleFeatured(articleId) {
    const art = this.articles.find(a => a.id === articleId || String(a.id) === String(articleId));
    if (art) {
      art.featured = !art.featured;
      this.persist();
      if (typeof renderLoginShowcase === 'function') renderLoginShowcase();
    }
    return art;
  },

  persist() {
    try {
      localStorage.setItem('rc_student_blog_articles', JSON.stringify(this.articles));
    } catch (e) {}
  },

  getFeaturedArticles() {
    return this.articles.filter(a => a.featured);
  },

  renderBlogView() {
    const container = document.getElementById('studentBlogContainer');
    if (!container) return;

    const user = (typeof AppState !== 'undefined' && AppState.currentUser) ? AppState.currentUser : null;
    const isTeacher = user && (user.role === 'teacher' || user.username === 'admin' || user.username === 'rania');

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin: 0;">✍️ Student Knowledge & Creative Blog</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Student essays, science research, and learning reflections curated by Miss Rania</p>
        </div>
        <div>
          <button type="button" class="primary-glow-btn" onclick="StudentBlog.openNewArticleModal()" style="padding: 0.75rem 1.4rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <span>✏️ Write New Article</span>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        ${this.articles.map(art => `
          <div class="blog-post-card ${art.featured ? 'is-featured' : ''}" style="background: var(--bg-surface-solid); border: 1px solid ${art.featured ? 'rgba(0,229,255,0.4)' : 'var(--border-card)'}; border-radius: 18px; padding: 1.35rem; display: flex; flex-direction: column; box-shadow: var(--shadow-sm); position: relative;">
            ${art.featured ? `<div style="position: absolute; top: 12px; right: 12px; background: rgba(0,229,255,0.12); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 9999px;">⭐ Featured by Miss Rania</div>` : ''}
            
            <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.75rem;">
              <div style="font-size: 1.4rem; width: 36px; height: 36px; border-radius: 50%; background: var(--bg-hover); display: flex; align-items: center; justify-content: center;">${art.avatar}</div>
              <div>
                <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-main);">${art.author}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${art.grade} &bull; ${art.date}</div>
              </div>
            </div>

            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.05em; margin-bottom: 0.35rem;">
              ${art.category}
            </div>

            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.4; margin-bottom: 0.5rem;">
              ${art.title}
            </h3>

            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; flex: 1; margin-bottom: 1rem;">
              ${art.summary}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: auto;">
              <button type="button" class="action-btn-sm" onclick="StudentBlog.openArticleReader(${art.id})" style="font-weight: 700; color: var(--color-primary); background: rgba(0, 102, 255, 0.1); border: 1px solid rgba(0, 102, 255, 0.2); padding: 4px 12px; border-radius: 8px;">
                📖 Read Full Essay
              </button>

              ${isTeacher ? `
                <button type="button" class="action-btn-sm ${art.featured ? 'delete' : 'edit'}" onclick="StudentBlog.handleToggleFeatured(${art.id})" style="font-size: 0.75rem; padding: 4px 10px; border-radius: 8px;" title="Toggle feature on front portal">
                  ${art.featured ? '⭐ Pinned' : '☆ Pin to Landing'}
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  handleToggleFeatured(id) {
    const art = this.toggleFeatured(id);
    this.renderBlogView();
    if (typeof showToast === 'function') {
      showToast(art.featured ? 'Article featured on Portal Landing! ⭐' : 'Article unpinned from landing');
    }
  },

  openArticleReader(id) {
    const art = this.articles.find(a => a.id === id || String(a.id) === String(id));
    if (!art) return;

    const modal = document.getElementById('blogReaderModal');
    if (!modal) return;

    document.getElementById('blogReaderTitle').textContent = art.title;
    document.getElementById('blogReaderMeta').textContent = `By ${art.author} (${art.grade}) • Published ${art.date} • ${art.category}`;
    document.getElementById('blogReaderContent').innerHTML = art.content.split('\n\n').map(p => `<p style="margin-bottom: 1rem; line-height: 1.75; font-size: 0.95rem; color: #e2e8f0;">${p}</p>`).join('');

    modal.classList.add('open');
  },

  openNewArticleModal() {
    const modal = document.getElementById('newArticleModal');
    if (modal) modal.classList.add('open');
  }
};

window.StudentBlog = StudentBlog;
