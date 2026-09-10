/**
 * Rania Classroom — Interactive Classroom Tools
 * Features:
 * 1. School Calculator with sound feedback
 * 2. Interactive Dynamic Number Line (jump +1, -1, +5, -5, +10, -10, fractions)
 * 3. Fraction Visualizer (visual slice bar & pie model)
 */

const ClassroomTools = {
  calcExpression: '0',
  nlCurrentVal: 5,
  nlMin: 0,
  nlMax: 20,

  init() {
    this.initNumberLine();
    this.initFractions();
  },

  // ---------------------------------------------------------------------------
  // 1. School Calculator Controller
  // ---------------------------------------------------------------------------
  toggleCalculator() {
    const panel = document.getElementById('calculatorWidget');
    if (!panel) return;
    const isShown = panel.style.display === 'flex';
    panel.style.display = isShown ? 'none' : 'flex';
    if (!isShown) {
      this.calcUpdateDisplay();
    }
    const btn = document.getElementById('practiceCalcBtn');
    if (btn) btn.classList.toggle('active', !isShown);
  },

  calcPress(val) {
    if (this.calcExpression === '0' && val !== '.') {
      this.calcExpression = String(val);
    } else {
      // Prevent consecutive operators
      const lastChar = this.calcExpression.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(val)) {
        this.calcExpression = this.calcExpression.slice(0, -1) + val;
      } else {
        this.calcExpression += String(val);
      }
    }
    this.calcUpdateDisplay();
    if (window.SoundFX) SoundFX.playTone(400, 'sine', 0.05, 0, 0.05);
  },

  calcClear() {
    this.calcExpression = '0';
    this.calcUpdateDisplay();
    if (window.SoundFX) SoundFX.playTone(250, 'triangle', 0.08, 0, 0.08);
  },

  calcCalculate() {
    try {
      // Sanitize expression for basic math
      const sanitized = this.calcExpression.replace(/[^0-9+\-*/.]/g, '');
      // Evaluate arithmetic using Function without access to globals
      const result = new Function(`'use strict'; return (${sanitized})`)();
      this.calcExpression = String(Number(result.toFixed(4)));
      if (window.SoundFX) SoundFX.correct();
    } catch (e) {
      this.calcExpression = 'Error';
      if (window.SoundFX) SoundFX.incorrect();
    }
    this.calcUpdateDisplay();
  },

  calcUpdateDisplay() {
    const display = document.getElementById('calcDisplay');
    if (display) display.textContent = this.calcExpression;
  },

  // ---------------------------------------------------------------------------
  // 2. Interactive Number Line Controller
  // ---------------------------------------------------------------------------
  toggleNumberLine() {
    const panel = document.getElementById('numberLineWidget');
    if (!panel) return;
    const isShown = panel.style.display === 'flex';
    panel.style.display = isShown ? 'none' : 'flex';
    if (!isShown) {
      this.renderNumberLine();
    }
    const btn = document.getElementById('practiceNumLineBtn');
    if (btn) btn.classList.toggle('active', !isShown);
  },

  initNumberLine() {
    this.nlCurrentVal = 5;
    this.nlMin = 0;
    this.nlMax = 20;
  },

  jumpNumberLine(delta) {
    this.nlCurrentVal = Math.min(this.nlMax, Math.max(this.nlMin, this.nlCurrentVal + delta));
    this.renderNumberLine();
    if (window.SoundFX) SoundFX.playTone(500 + this.nlCurrentVal * 20, 'sine', 0.1, 0, 0.08);
  },

  renderNumberLine() {
    const axis = document.getElementById('nlAxis');
    const valDisplay = document.getElementById('nlCurrentValDisplay');
    if (!axis) return;

    axis.innerHTML = '';
    const totalTicks = this.nlMax - this.nlMin;

    for (let i = 0; i <= totalTicks; i++) {
      const val = this.nlMin + i;
      const isMajor = val % 5 === 0;
      const tick = document.createElement('div');
      tick.className = `nl-tick ${isMajor ? 'major' : ''}`;

      if (isMajor) {
        const label = document.createElement('span');
        label.className = 'nl-label';
        label.textContent = val;
        tick.appendChild(label);
      }
      axis.appendChild(tick);
    }

    // Pointer pin
    const pointer = document.createElement('div');
    pointer.className = 'nl-pointer';
    const pct = ((this.nlCurrentVal - this.nlMin) / (this.nlMax - this.nlMin)) * 100;
    pointer.style.left = `${pct}%`;
    axis.appendChild(pointer);

    if (valDisplay) {
      valDisplay.textContent = this.nlCurrentVal;
    }
  },

  // ---------------------------------------------------------------------------
  // 3. Fraction Visualizer Controller
  // ---------------------------------------------------------------------------
  toggleFractions() {
    const panel = document.getElementById('fractionVisualizerWidget');
    if (!panel) return;
    const isShown = panel.style.display === 'flex';
    panel.style.display = isShown ? 'none' : 'flex';
    if (!isShown) {
      this.renderFractions();
    }
    const btn = document.getElementById('practiceFracBtn');
    if (btn) btn.classList.toggle('active', !isShown);
  },

  initFractions() {
    const numInput = document.getElementById('fracNumeratorInput');
    const denInput = document.getElementById('fracDenominatorInput');
    if (numInput && denInput) {
      numInput.addEventListener('input', () => this.renderFractions());
      denInput.addEventListener('input', () => this.renderFractions());
    }
  },

  renderFractions() {
    const numInput = document.getElementById('fracNumeratorInput');
    const denInput = document.getElementById('fracDenominatorInput');
    const barContainer = document.getElementById('fractionBarContainer');
    const label = document.getElementById('fractionTextLabel');

    if (!barContainer) return;

    let num = parseInt(numInput?.value || '3', 10);
    let den = parseInt(denInput?.value || '4', 10);

    den = Math.max(1, Math.min(16, den));
    num = Math.max(0, Math.min(den, num));

    if (numInput) numInput.value = num;
    if (denInput) denInput.value = den;

    barContainer.innerHTML = '';
    for (let i = 0; i < den; i++) {
      const slice = document.createElement('div');
      slice.className = `fraction-slice ${i < num ? 'active' : 'empty'}`;
      barContainer.appendChild(slice);
    }

    if (label) {
      const pct = Math.round((num / den) * 100);
      label.textContent = `${num} / ${den} (${pct}%)`;
    }
  }
};

window.ClassroomTools = ClassroomTools;
