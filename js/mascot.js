/**
 * RC ROOM — Joyful Mascot & Interactive Dopamine Engine
 * Handles Draggable Fox Companion, Sound Synthesizer Hooks,
 * Floating XP Particles, and 3D Perspective Tilts.
 */

(function () {
  'use strict';

  // Floating XP Particle Emitter
  function triggerFloatingXp(text, x, y) {
    try {
      const el = document.createElement('div');
      el.className = 'floating-xp-particle';
      el.textContent = text || '+25 XP';
      el.style.left = (x !== undefined ? x + 'px' : '50%');
      el.style.top = (y !== undefined ? y + 'px' : '45%');
      document.body.appendChild(el);
      setTimeout(() => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 1200);
    } catch (e) {
      console.warn('triggerFloatingXp error:', e);
    }
  }

  // Mascot State Machine
  function setMascotState(state, message) {
    try {
      const fox = document.getElementById('mascotSvg');
      const bubble = document.getElementById('mascotBubbleText');
      if (!fox) return;

      fox.classList.remove('celebrating', 'thinking', 'perking');
      if (state && state !== 'idle') {
        fox.classList.add(state);
      }
      if (bubble && message) {
        bubble.textContent = message;
      }
    } catch (e) {
      console.warn('setMascotState error:', e);
    }
  }

  function mascotOnPracticeOpen() {
    setMascotState('perking', 'You got this, Alex! Take your time 🦊💪');
    setTimeout(() => setMascotState('idle', 'Think carefully & solve! 🧠'), 3500);
  }

  function mascotOnCorrect() {
    setMascotState('celebrating', 'Awesome! +25 XP 🎉');
    setTimeout(() => setMascotState('idle', 'Keep the streak blazing! 🔥'), 3200);
  }

  function mascotOnWrong() {
    setMascotState('thinking', "Let's check the steps! 💡");
    setTimeout(() => setMascotState('idle', 'Every try helps you master it! ⭐'), 4000);
  }

  function handleMascotClick() {
    const quotes = [
      "High five! You're crushing it! ✋",
      "Practice makes permanent! Keep learning! 🌟",
      "Maths & Science are superpowers! 🦸‍♂️",
      "Don't forget today's Zoom class at 5 PM! 🎥",
      "Keep that 5-day streak blazing! 🔥",
      "Curious minds solve the hardest puzzles! 🧩"
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setMascotState('celebrating', q);
    if (window.SoundFX && typeof window.SoundFX.correct === 'function') {
      window.SoundFX.correct();
    }
    setTimeout(() => setMascotState('idle', 'Ready for more? 🚀'), 2800);
  }

  function toggleMascotMinimize(e) {
    if (e) {
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
      if (typeof e.preventDefault === 'function') e.preventDefault();
    }
    const container = document.getElementById('mascotAssistant');
    if (container) {
      container.classList.toggle('is-minimized');
    }
  }

  // Draggable Fox Companion (Mouse & Mobile Touch)
  function initDraggableMascot() {
    const mascot = document.getElementById('mascotAssistant');
    if (!mascot) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onStart = (e) => {
      // Don't drag if clicking minimize button or mini badge
      if (e.target.closest('.mascot-min-btn') || e.target.closest('.mascot-mini-badge')) return;

      isDragging = true;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      startX = clientX;
      startY = clientY;

      const rect = mascot.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      mascot.style.bottom = 'auto';
      mascot.style.right = 'auto';
      mascot.style.left = `${initialLeft}px`;
      mascot.style.top = `${initialTop}px`;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      // Keep within bounds
      newLeft = Math.max(10, Math.min(window.innerWidth - mascot.offsetWidth - 10, newLeft));
      newTop = Math.max(10, Math.min(window.innerHeight - mascot.offsetHeight - 10, newTop));

      mascot.style.left = `${newLeft}px`;
      mascot.style.top = `${newTop}px`;
    };

    const onEnd = () => {
      isDragging = false;
    };

    mascot.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    mascot.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }

  // 3D Perspective Tilt on Card Hover
  function initCardTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(800px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) translateY(-6px) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
      });
    });
  }

  // Audio Text-to-Speech
  function readQuestionAloud() {
    try {
      const promptEl = document.getElementById('practiceQuestionPrompt') || document.getElementById('practiceQuestionText');
      const text = promptEl ? promptEl.textContent.trim() : '';
      if ('speechSynthesis' in window && text) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
        setMascotState('perking', 'Listening carefully... 🎧');
        setTimeout(() => setMascotState('idle', 'Think carefully & solve! 🧠'), 3000);
      } else if (window.showToast) {
        window.showToast('Speech narration active! 🔊');
      }
    } catch (e) {
      console.warn('readQuestionAloud error:', e);
    }
  }

  // Global Exports
  window.triggerFloatingXp = triggerFloatingXp;
  window.setMascotState = setMascotState;
  window.mascotOnPracticeOpen = mascotOnPracticeOpen;
  window.mascotOnCorrect = mascotOnCorrect;
  window.mascotOnWrong = mascotOnWrong;
  window.handleMascotClick = handleMascotClick;
  window.toggleMascotMinimize = toggleMascotMinimize;
  window.initDraggableMascot = initDraggableMascot;
  window.initCardTilt = initCardTilt;
  window.readQuestionAloud = readQuestionAloud;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDraggableMascot();
      initCardTilt();
    });
  } else {
    initDraggableMascot();
    initCardTilt();
  }
})();
