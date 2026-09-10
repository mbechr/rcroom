/**
 * Rania Classroom — High-DPI, State-Preserving Virtual Scratchpad
 * Fixes:
 * 1. Screen resize / toggle wiping drawing (retains image buffer via offscreen backup)
 * 2. Pointer misalignment on High-DPI / Retina screens / Zoom levels
 */

const Scratchpad = {
  overlay: null,
  canvas: null,
  ctx: null,
  active: false,
  tool: 'pen',
  color: '#ffd60a',
  lineWidth: 4,
  isDrawing: false,
  lastDpr: 1,
  initialized: false,

  init() {
    this.overlay = document.getElementById('scratchpadOverlay');
    this.canvas = document.getElementById('scratchpadCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.setupEvents();
    this.initialized = true;
  },

  setupEvents() {
    // Touch & Pen & Mouse Pointer events
    this.canvas.addEventListener('pointerdown', (e) => this.start(e));
    this.canvas.addEventListener('pointermove', (e) => this.draw(e));
    this.canvas.addEventListener('pointerup', () => this.end());
    this.canvas.addEventListener('pointercancel', () => this.end());

    // Window resize handler with debounce
    window.addEventListener('resize', () => {
      if (this.active) this.resize(true);
    });

    // Tool Buttons
    const penBtn = document.getElementById('spToolPen');
    const eraserBtn = document.getElementById('spToolEraser');
    const clearBtn = document.getElementById('spToolClear');
    const closeBtn = document.getElementById('spCloseBtn');

    if (penBtn) penBtn.addEventListener('click', () => this.setTool('pen'));
    if (eraserBtn) eraserBtn.addEventListener('click', () => this.setTool('eraser'));
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggle());

    // Color Swatches
    document.querySelectorAll('.sp-color').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.sp-color').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        this.color = el.dataset.color;
        this.setTool('pen');
      });
    });

    // Stroke Widths
    document.querySelectorAll('.sp-width-btn').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.sp-width-btn').forEach(w => w.classList.remove('active'));
        el.classList.add('active');
        this.lineWidth = parseInt(el.dataset.width, 10) || 4;
      });
    });
  },

  resize(preserveContent = true) {
    if (!this.canvas) return;
    const body = document.querySelector('.practice-modal-body');
    if (!body) return;

    const targetWidth = Math.max(300, body.clientWidth);
    const targetHeight = Math.max(200, body.clientHeight - 48); // minus top toolbar

    const dpr = window.devicePixelRatio || 1;

    // Check if resize is actually required
    const currentCssWidth = parseFloat(this.canvas.style.width) || 0;
    const currentCssHeight = parseFloat(this.canvas.style.height) || 0;

    if (Math.abs(currentCssWidth - targetWidth) < 2 && Math.abs(currentCssHeight - targetHeight) < 2 && this.lastDpr === dpr) {
      return; // No layout change needed
    }

    // Step 1: Backup current drawing buffer before resize
    let backupCanvas = null;
    if (preserveContent && this.canvas.width > 0 && this.canvas.height > 0) {
      backupCanvas = document.createElement('canvas');
      backupCanvas.width = this.canvas.width;
      backupCanvas.height = this.canvas.height;
      const bCtx = backupCanvas.getContext('2d');
      bCtx.drawImage(this.canvas, 0, 0);
    }

    // Step 2: Update canvas resolution taking DPI into account
    this.canvas.width = Math.floor(targetWidth * dpr);
    this.canvas.height = Math.floor(targetHeight * dpr);
    this.canvas.style.width = targetWidth + 'px';
    this.canvas.style.height = targetHeight + 'px';

    // Reset transform & scale to CSS pixels
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    // Step 3: Restore previous drawing
    if (backupCanvas) {
      const oldDpr = this.lastDpr || 1;
      this.ctx.drawImage(backupCanvas, 0, 0, backupCanvas.width / oldDpr, backupCanvas.height / oldDpr);
    }

    this.lastDpr = dpr;
  },

  toggle() {
    this.active = !this.active;
    if (this.overlay) {
      this.overlay.style.display = this.active ? 'flex' : 'none';
      if (this.active) {
        this.resize(true); // Preserves any existing lines!
      }
    }
    const btn = document.getElementById('practiceScratchpadBtn');
    if (btn) btn.classList.toggle('active', this.active);
  },

  setTool(tool) {
    this.tool = tool;
    document.getElementById('spToolPen')?.classList.toggle('active', tool === 'pen');
    document.getElementById('spToolEraser')?.classList.toggle('active', tool === 'eraser');
  },

  getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  start(e) {
    this.isDrawing = true;
    this.canvas.setPointerCapture(e.pointerId);
    this.ctx.beginPath();
    const pt = this.getCanvasPoint(e);
    this.ctx.moveTo(pt.x, pt.y);
  },

  draw(e) {
    if (!this.isDrawing) return;
    const pt = this.getCanvasPoint(e);

    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    if (this.tool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = this.lineWidth * 3.5;
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
    }

    this.ctx.lineTo(pt.x, pt.y);
    this.ctx.stroke();
  },

  end() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.ctx.closePath();
    }
  },

  clear() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }
};

window.Scratchpad = Scratchpad;