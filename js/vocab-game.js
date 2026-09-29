// =============================================================================
// VOCABULARY GAME ENGINE (Spellings, Meanings, Sentences & Teacher Management)
// =============================================================================

const VocabEngine = {
  words: [
    {
      id: 1,
      word: 'Photosynthesis',
      category: 'Science',
      grade: 'Stage 4-6',
      meaning: 'The biological process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.',
      sentence: 'Green plants absorb carbon dioxide from the air to perform {word} in the presence of sunlight.',
      level: 'intermediate'
    },
    {
      id: 2,
      word: 'Denominator',
      category: 'Mathematics',
      grade: 'Stage 4',
      meaning: 'The number below the line in a common fraction showing how many equal parts the whole is divided into.',
      sentence: 'In the fraction 3/4, the number 4 is the {word}.',
      level: 'beginner'
    },
    {
      id: 3,
      word: 'Perimeter',
      category: 'Mathematics',
      grade: 'Stage 4',
      meaning: 'The continuous line forming the total boundary or distance around a two-dimensional geometric shape.',
      sentence: 'To find the {word} of a rectangle, add together the lengths of all four sides.',
      level: 'beginner'
    },
    {
      id: 4,
      word: 'Hypothesis',
      category: 'Science',
      grade: 'Stage 4-6',
      meaning: 'A proposed scientific explanation made on the basis of limited evidence as a starting point for further investigation.',
      sentence: 'Before conducting the laboratory experiment, the students formulated a clear scientific {word}.',
      level: 'advanced'
    },
    {
      id: 5,
      word: 'Equivalent',
      category: 'Mathematics',
      grade: 'Stage 4',
      meaning: 'Equal in value, amount, function, or meaning.',
      sentence: 'The fractions 1/2 and 2/4 are {word} because they represent the exact same portion.',
      level: 'beginner'
    },
    {
      id: 6,
      word: 'Metaphor',
      category: 'English',
      grade: 'Stage 4-6',
      meaning: 'A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable.',
      sentence: 'The phrase "time is a thief" is a powerful literary {word}.',
      level: 'intermediate'
    },
    {
      id: 7,
      word: 'Precipitation',
      category: 'Science',
      grade: 'Stage 4-5',
      meaning: 'Rain, snow, sleet, or hail that falls to or condenses on the ground.',
      sentence: 'When water droplets in clouds become too heavy, they fall to Earth as {word}.',
      level: 'intermediate'
    },
    {
      id: 8,
      word: 'Numerator',
      category: 'Mathematics',
      grade: 'Stage 4',
      meaning: 'The number above the line in a common fraction showing how many parts of the whole are taken.',
      sentence: 'In the fraction 5/8, the number 5 represents the {word}.',
      level: 'beginner'
    }
  ],

  currentMode: 'spelling', // 'spelling' | 'meaning' | 'sentence'
  currentIndex: 0,
  score: 0,
  streak: 0,
  shuffledQuestions: [],
  currentWordObj: null,

  init() {
    this.loadCustomWords();
  },

  loadCustomWords() {
    try {
      const saved = localStorage.getItem('rc_custom_vocab_words');
      if (saved) {
        const custom = JSON.parse(saved);
        if (Array.isArray(custom) && custom.length > 0) {
          // Merge custom words
          const existingIds = new Set(this.words.map(w => w.id));
          custom.forEach(w => {
            if (!existingIds.has(w.id)) {
              this.words.push(w);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not load custom vocab words:', e);
    }
  },

  saveCustomWord(wordData) {
    const newWord = {
      id: Date.now(),
      word: wordData.word.trim(),
      category: wordData.category || 'General',
      grade: wordData.grade || 'Year 4',
      meaning: wordData.meaning.trim(),
      sentence: wordData.sentence.trim(),
      level: wordData.level || 'intermediate'
    };
    this.words.unshift(newWord);
    
    try {
      const customOnly = this.words.filter(w => w.id > 100);
      localStorage.setItem('rc_custom_vocab_words', JSON.stringify(customOnly));
    } catch (e) {
      console.warn('Failed to persist custom word:', e);
    }
    return newWord;
  },

  deleteWord(id) {
    this.words = this.words.filter(w => w.id !== id);
    try {
      const customOnly = this.words.filter(w => w.id > 100);
      localStorage.setItem('rc_custom_vocab_words', JSON.stringify(customOnly));
    } catch (e) {}
  },

  speakWord(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  },

  startSession(mode = 'spelling') {
    this.currentMode = mode;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.shuffledQuestions = [...this.words].sort(() => Math.random() - 0.5);
    this.renderNextQuestion();
  },

  renderNextQuestion() {
    const container = document.getElementById('vocabGameArena');
    if (!container) return;

    if (this.currentIndex >= this.shuffledQuestions.length) {
      this.renderGameOver();
      return;
    }

    this.currentWordObj = this.shuffledQuestions[this.currentIndex];
    const w = this.currentWordObj;

    if (this.currentMode === 'spelling') {
      this.renderSpellingCard(w);
    } else if (this.currentMode === 'meaning') {
      this.renderMeaningCard(w);
    } else if (this.currentMode === 'sentence') {
      this.renderSentenceCard(w);
    }
  },

  renderSpellingCard(w) {
    const container = document.getElementById('vocabGameArena');
    const letters = w.word.toUpperCase().split('').sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="vocab-game-card">
        <div class="vocab-card-header">
          <div class="vocab-tag">${w.category} &bull; ${w.grade}</div>
          <div class="vocab-meta-score">Score: <strong>${this.score}</strong> | Streak: <strong>${this.streak} 🔥</strong></div>
        </div>

        <div class="vocab-clue-box">
          <div class="vocab-clue-title">💡 Definition & Clue:</div>
          <div class="vocab-clue-text">"${w.meaning}"</div>
        </div>

        <div style="text-align: center; margin: 1.25rem 0;">
          <button type="button" class="vocab-audio-btn" onclick="VocabEngine.speakWord('${w.word.replace(/'/g, "\\'")}')" title="Listen to pronunciation">
            <span>🔊 Listen to Word</span>
          </button>
        </div>

        <!-- Spelling Input Form -->
        <form id="vocabSpellingForm" onsubmit="VocabEngine.checkSpelling(event)" class="vocab-spelling-form">
          <div class="vocab-letters-hint">
            ${letters.map(l => `<span class="vocab-letter-tile">${l}</span>`).join('')}
          </div>
          <div style="max-width: 360px; margin: 0 auto;">
            <input type="text" id="vocabSpellingInput" placeholder="Type the correct spelling..." autocomplete="off" autofocus required class="vocab-input-box">
          </div>
          <div class="vocab-feedback-banner" id="vocabFeedbackBanner" style="display: none;"></div>
          <div style="margin-top: 1rem; display: flex; gap: 0.75rem; justify-content: center;">
            <button type="submit" class="primary-glow-btn" style="padding: 0.75rem 2rem; font-weight: 700;" id="vocabSubmitBtn">
              Check Spelling ✨
            </button>
            <button type="button" class="secondary-glass-btn" onclick="VocabEngine.skipWord()">
              Skip
            </button>
          </div>
        </form>
      </div>
    `;

    setTimeout(() => {
      const inp = document.getElementById('vocabSpellingInput');
      if (inp) inp.focus();
    }, 100);
  },

  checkSpelling(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('vocabSpellingInput');
    const banner = document.getElementById('vocabFeedbackBanner');
    const submitBtn = document.getElementById('vocabSubmitBtn');
    if (!input || !this.currentWordObj) return;

    const guess = input.value.trim().toLowerCase();
    const correct = this.currentWordObj.word.trim().toLowerCase();

    if (guess === correct) {
      this.score += 100 + this.streak * 20;
      this.streak++;
      if (window.AudioController) AudioController.playSuccess();
      if (window.ConfettiFX) ConfettiFX.fire(1200);

      banner.className = 'vocab-feedback-banner success';
      banner.innerHTML = `🎉 Correct! <strong>${this.currentWordObj.word}</strong> (+${100 + (this.streak - 1) * 20} XP)`;
      banner.style.display = 'block';

      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 1400);
    } else {
      this.streak = 0;
      if (window.AudioController) AudioController.playError();
      banner.className = 'vocab-feedback-banner error';
      banner.innerHTML = `❌ Not quite! The correct spelling is: <strong>${this.currentWordObj.word}</strong>`;
      banner.style.display = 'block';

      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 2200);
    }
  },

  renderMeaningCard(w) {
    const container = document.getElementById('vocabGameArena');
    
    // Pick 3 distractors
    const otherWords = this.words.filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [w, ...otherWords].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="vocab-game-card">
        <div class="vocab-card-header">
          <div class="vocab-tag">${w.category} &bull; ${w.grade}</div>
          <div class="vocab-meta-score">Score: <strong>${this.score}</strong> | Streak: <strong>${this.streak} 🔥</strong></div>
        </div>

        <div style="text-align:center; margin: 1rem 0;">
          <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Target Vocabulary Word:</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: #00e5ff; margin: 0.3rem 0; font-family: var(--font-headline);">${w.word}</div>
          <button type="button" class="vocab-audio-btn" onclick="VocabEngine.speakWord('${w.word.replace(/'/g, "\\'")}')" style="margin-top: 0.25rem;">
            <span>🔊 Pronounce</span>
          </button>
        </div>

        <div style="font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem; text-align: center;">
          Select the correct definition:
        </div>

        <div class="vocab-options-grid">
          ${options.map((opt, i) => `
            <button type="button" class="vocab-option-btn" onclick="VocabEngine.checkMeaning(${opt.id === w.id}, '${w.word.replace(/'/g, "\\'")}', this)">
              <span class="vocab-opt-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt.meaning}</span>
            </button>
          `).join('')}
        </div>

        <div class="vocab-feedback-banner" id="vocabFeedbackBanner" style="display: none; margin-top: 1rem;"></div>
      </div>
    `;
  },

  checkMeaning(isCorrect, targetWord, btnElem) {
    const banner = document.getElementById('vocabFeedbackBanner');
    const allBtns = document.querySelectorAll('.vocab-option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
      if (btnElem) btnElem.classList.add('correct');
      this.score += 100 + this.streak * 20;
      this.streak++;
      if (window.AudioController) AudioController.playSuccess();
      if (window.ConfettiFX) ConfettiFX.fire(1200);

      banner.className = 'vocab-feedback-banner success';
      banner.innerHTML = `🎉 Correct definition for <strong>${targetWord}</strong>! (+${100 + (this.streak - 1) * 20} XP)`;
      banner.style.display = 'block';

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 1400);
    } else {
      if (btnElem) btnElem.classList.add('wrong');
      this.streak = 0;
      if (window.AudioController) AudioController.playError();

      banner.className = 'vocab-feedback-banner error';
      banner.innerHTML = `❌ Incorrect definition. Review the meaning carefully!`;
      banner.style.display = 'block';

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 2000);
    }
  },

  renderSentenceCard(w) {
    const container = document.getElementById('vocabGameArena');
    const sentenceWithBlank = w.sentence.replace('{word}', '________');

    // Pick 3 distractors
    const otherWords = this.words.filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [w, ...otherWords].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="vocab-game-card">
        <div class="vocab-card-header">
          <div class="vocab-tag">${w.category} &bull; ${w.grade}</div>
          <div class="vocab-meta-score">Score: <strong>${this.score}</strong> | Streak: <strong>${this.streak} 🔥</strong></div>
        </div>

        <div class="vocab-clue-box" style="margin: 1.5rem 0;">
          <div class="vocab-clue-title">✍️ Complete the Sentence:</div>
          <div class="vocab-clue-text" style="font-size: 1.15rem; color: #fff; line-height: 1.6;">
            "${sentenceWithBlank}"
          </div>
        </div>

        <div style="font-size: 0.9rem; font-weight: 700; color: #94a3b8; margin-bottom: 0.75rem; text-align: center;">
          Which vocabulary word completes this sentence correctly?
        </div>

        <div class="vocab-word-buttons-grid">
          ${options.map((opt, i) => `
            <button type="button" class="vocab-word-btn" onclick="VocabEngine.checkSentence(${opt.id === w.id}, '${w.word.replace(/'/g, "\\'")}', this)">
              <span style="font-weight: 800; font-size: 1.05rem;">${opt.word}</span>
            </button>
          `).join('')}
        </div>

        <div class="vocab-feedback-banner" id="vocabFeedbackBanner" style="display: none; margin-top: 1rem;"></div>
      </div>
    `;
  },

  checkSentence(isCorrect, targetWord, btnElem) {
    const banner = document.getElementById('vocabFeedbackBanner');
    const allBtns = document.querySelectorAll('.vocab-word-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
      if (btnElem) btnElem.classList.add('correct');
      this.score += 100 + this.streak * 20;
      this.streak++;
      if (window.AudioController) AudioController.playSuccess();
      if (window.ConfettiFX) ConfettiFX.fire(1200);

      banner.className = 'vocab-feedback-banner success';
      banner.innerHTML = `🎉 Correct word in context: <strong>${targetWord}</strong>!`;
      banner.style.display = 'block';

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 1400);
    } else {
      if (btnElem) btnElem.classList.add('wrong');
      this.streak = 0;
      if (window.AudioController) AudioController.playError();

      banner.className = 'vocab-feedback-banner error';
      banner.innerHTML = `❌ Incorrect word. The right choice is: <strong>${targetWord}</strong>`;
      banner.style.display = 'block';

      setTimeout(() => {
        this.currentIndex++;
        this.renderNextQuestion();
      }, 2000);
    }
  },

  skipWord() {
    this.currentIndex++;
    this.renderNextQuestion();
  },

  renderGameOver() {
    const container = document.getElementById('vocabGameArena');
    if (!container) return;

    if (window.ConfettiFX) ConfettiFX.fire(2500);

    // Award XP to student profile
    if (typeof AppState !== 'undefined' && AppState.currentUser) {
      AppState.currentUser.xp = (AppState.currentUser.xp || 0) + this.score;
      if (typeof DB !== 'undefined' && DB.updateStudentStats) {
        DB.updateStudentStats(AppState.currentUser.id, { xp: AppState.currentUser.xp });
      }
    }

    container.innerHTML = `
      <div class="vocab-game-card" style="text-align: center; padding: 2.5rem 1.5rem;">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🏆</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">Vocabulary Arena Completed!</h2>
        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem;">Outstanding practice session with Cambridge academic vocabulary.</p>

        <div style="display: flex; gap: 1rem; justify-content: center; max-width: 400px; margin: 0 auto 1.5rem;">
          <div style="flex: 1; background: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #38bdf8;">TOTAL SCORE</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: #fff;">${this.score}</div>
          </div>
          <div style="flex: 1; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #10b981;">XP AWARDED</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: #fff;">+${this.score}</div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="primary-glow-btn" onclick="VocabEngine.startSession('${this.currentMode}')" style="padding: 0.8rem 1.8rem; font-weight: 700;">
            🔄 Play Again
          </button>
          <button type="button" class="secondary-glass-btn" onclick="VocabEngine.switchModeSelector()" style="padding: 0.8rem 1.5rem;">
            🎮 Change Game Mode
          </button>
        </div>
      </div>
    `;
  },

  switchModeSelector() {
    const container = document.getElementById('vocabGameArena');
    if (!container) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 1rem;">
        <div class="vocab-mode-card" onclick="VocabEngine.startSession('spelling')">
          <div class="vocab-mode-icon">🐝</div>
          <h3 class="vocab-mode-title">Spelling Arena</h3>
          <p class="vocab-mode-desc">Listen to pronunciation, read clues, and spell target Cambridge words with letter hints.</p>
          <div class="vocab-mode-btn">Start Spelling &rarr;</div>
        </div>

        <div class="vocab-mode-card" onclick="VocabEngine.startSession('meaning')">
          <div class="vocab-mode-icon">📖</div>
          <h3 class="vocab-mode-title">Meaning Matcher</h3>
          <p class="vocab-mode-desc">Analyze academic vocabulary and select the precise dictionary definition.</p>
          <div class="vocab-mode-btn">Start Meaning Match &rarr;</div>
        </div>

        <div class="vocab-mode-card" onclick="VocabEngine.startSession('sentence')">
          <div class="vocab-mode-icon">✍️</div>
          <h3 class="vocab-mode-title">Sentence Context Fill</h3>
          <p class="vocab-mode-desc">Fill in contextual sentence blanks with the correct academic vocabulary choice.</p>
          <div class="vocab-mode-btn">Start Sentence Fill &rarr;</div>
        </div>
      </div>
    `;
  }
};

window.VocabEngine = VocabEngine;
