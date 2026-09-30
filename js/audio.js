/**
 * Rania Classroom — Freeze-Safe Speech Synthesis Audio Manager
 * Fixes:
 * 1. Web Speech API freezing / stalling in Chrome due to GC or uncancelled state
 * 2. Arabic & English voice auto-selection according to current language & Unicode text
 * 3. Safe extraction of choices text (strings or option objects)
 */

const SpeechAudio = {
  speaking: false,
  watchdogTimer: null,

  speak(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (window.showToast) window.showToast('Text-to-speech is not supported in this browser.');
      return;
    }

    // Always cancel any prior or stuck utterances
    this.stop();

    if (!text || !text.trim()) return;

    // Clean text from symbols, markdown, and multiple spaces
    const cleanText = text
      .split('\n').join(' ')
      .replace(/[#*_~\[\](){}]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utter = new SpeechSynthesisUtterance(cleanText);

    // Auto-detect Arabic vs English
    const isArabic = /[\u0600-\u06FF]/.test(cleanText) || (window.I18N && window.I18N.currentLang === 'ar');
    utter.lang = isArabic ? 'ar-SA' : 'en-GB';
    utter.rate = 0.95; // Measured pace for student comprehension

    // Pick best matching voice if available
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length) {
        const langPrefix = isArabic ? 'ar' : 'en';
        const match = voices.find(v => v.lang && v.lang.startsWith(langPrefix));
        if (match) utter.voice = match;
      }
    } catch (e) {}

    // Retain global reference to avoid Chromium Garbage Collector freeze
    window._currentSpeechUtterance = utter;

    utter.onstart = () => {
      this.speaking = true;
      const btn = document.getElementById('practiceAudioBtn');
      if (btn) btn.classList.add('speaking');
      this.startWatchdog();
    };

    const finish = () => {
      this.speaking = false;
      window._currentSpeechUtterance = null;
      this.stopWatchdog();
      const btn = document.getElementById('practiceAudioBtn');
      if (btn) btn.classList.remove('speaking');
      if (onEnd) onEnd();
    };

    utter.onend = finish;
    utter.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      finish();
    };

    try {
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error('Speech speak failed:', err);
      finish();
    }
  },

  startWatchdog() {
    this.stopWatchdog();
    // Chromium bug workaround: speech gets paused after ~15 seconds of speaking
    this.watchdogTimer = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        this.stopWatchdog();
      }
    }, 8000);
  },

  stopWatchdog() {
    if (this.watchdogTimer) {
      clearInterval(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  },

  stop() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    this.speaking = false;
    window._currentSpeechUtterance = null;
    this.stopWatchdog();
    const btn = document.getElementById('practiceAudioBtn');
    if (btn) btn.classList.remove('speaking');
  },

  toggleCurrentQuestion() {
    if (this.speaking) {
      this.stop();
    } else {
      const q = window.AppState && window.AppState.practice ? window.AppState.practice.currentQuestion : null;
      if (q && q.prompt) {
        let fullSpeech = q.prompt;
        if (q.options && q.options.length) {
          const optsText = q.options
            .map(opt => (typeof opt === 'string' ? opt : (opt.label || opt.text || opt.val || '')))
            .filter(Boolean)
            .join(', ');
          if (optsText) {
            fullSpeech += '. Choices: ' + optsText;
          }
        }
        this.speak(fullSpeech);
      }
    }
  }
};

window.SpeechAudio = SpeechAudio;