/**
 * RANIA CLASSROOM — Cambridge AI Exam Grader (ESL 0510)
 * Automated handwriting redlining, correction pills, verification ticks,
 * and official examiner diagnostics powered by Gemini & client-side PDF manipulation.
 */

(function() {
  'use strict';

  // API Key is loaded securely from localStorage or user input in Examiner Settings
  const DEFAULT_API_KEY = "";

  const INLINE_GRADING_PROMPT = `You are an elite Cambridge IGCSE English as a Second Language (0510) Chief Examiner.
You are evaluating scanned handwritten student scripts with extreme rigor, diagnostic precision, and visual aesthetic awareness.

CRITICAL TASKS:
1. CANDIDATE IDENTIFICATION:
   - Extract the student's name if written on the front page, or default to "Candidate".

2. READING COMPREHENSION (Q1 to Q15, if present):
   - Locate student answers. Return normalized bounding boxes [ymin, xmin, ymax, xmax] (0-1000) for each answer to place verification ticks.
   - Grade strictly out of 30. If Reading exercises are absent, set reading_total to null.

3. WRITING TASK EVALUATION (Exercise 6 - Review / Article / Email):
   - Rigorously spot and locate handwritten errors:
     * Informal register (e.g. 'top-notch' -> 'exceptional', 'snacks' -> 'refreshments', 'grabbing' -> 'obtaining', 'check it out' -> 'explore it').
     * Punctuation & Capitalization (e.g. 'olympic' -> 'Olympic', missing comma after 'Additionally,').
     * British spelling (e.g. 'center' -> 'centre').
     * Grammar & Inversion ('Not only' requires inversion: 'Not only do members gain...').
   - For EACH error found, output the bounding box [ymin, xmin, ymax, xmax] normalized from 0 to 1000 around that exact handwritten word.

4. 5 MANDATORY ADVANCED STYLES EVALUATION:
   Verify presence or absence of:
   1. Inversion with 'Not only'
   2. Sentence opener with 'Coupled with' / 'Apart from' (one comma only)
   3. Appositive noun structure (three commas + support)
   4. Fronted Linker + because
   5. 'Other than' structure

5. PROMPTS COVERAGE & SCORING:
   - Grade Content and Language according to the maximum marks on the paper (e.g. 6/9 for 15, or 8/8 for 16).
   - Compose tailored, high-scoring model sentences embedding missing prompts and complex structures.

OUTPUT STRICTLY VALID JSON ONLY. NO MARKDOWN TICKS AROUND JSON:
{
  "candidate_name": "Student Name",
  "has_reading": false,
  "reading_total": null,
  "writing_content": 6,
  "writing_content_max": 8,
  "writing_language": 6,
  "writing_language_max": 8,
  "writing_total": 12,
  "writing_max": 16,
  "inline_corrections": [
    {
      "page_index": 0,
      "box_2d": [100, 200, 130, 350],
      "original": "top-notch",
      "replacement": "exceptional",
      "category": "Informal Register"
    }
  ],
  "reading_ticks": [
    {
      "page_index": 0,
      "box_2d": [150, 400, 175, 450],
      "is_correct": true,
      "mark": 1
    }
  ],
  "weak_points": [
    "Omitted key stimulus prompts.",
    "Missing Inversion with 'Not only' in the text body.",
    "Informal vocabulary undermines formal register."
  ],
  "to_work_on": [
    "Memorize standard frame sentences and avoid using informal headings.",
    "Integrate all 5 complex grammatical styles into every writing assignment.",
    "Carefully proofread for spelling errors."
  ],
  "mastery_sentences": [
    {"style": "Inversion (Not only)", "sentence": "Not only was the venue difficult to locate initially, but the entrance fee was also remarkably reasonable."},
    {"style": "F.L + because", "sentence": "Furthermore, because the waiting queues were excessively long, visitors spent over an hour waiting."},
    {"style": "Other than", "sentence": "Other than the tickets representing superb value for money, the dining facilities left much to be desired."},
    {"style": "Appositive Structure", "sentence": "The activity instructors, who represent the cornerstone of the park's safety, provided reassuring guidance."},
    {"style": "Coupled with", "sentence": "Coupled with the lack of clear directional signage, the heavy weekend crowds added to visitor frustration."}
  ]
}`;

  let currentUploadedPdfBytes = null;
  let currentUploadedPdfName = "candidate_exam.pdf";
  let currentRenderedImages = [];
  let currentGradingResult = null;
  let currentAnnotatedPdfBytes = null;

  window.initTeacherGrader = function() {
    setupGraderEvents();
  };

  function setupGraderEvents() {
    const fileInput = document.getElementById('graderPdfInput');
    const dropZone = document.getElementById('graderDropZone');
    const startBtn = document.getElementById('graderStartBtn');
    const downloadBtn = document.getElementById('graderDownloadBtn');
    const apiKeyInput = document.getElementById('graderApiKeyInput');

    if (apiKeyInput) {
      const savedKey = localStorage.getItem('rc_gemini_api_key') || '';
      if (savedKey && !apiKeyInput.value) {
        apiKeyInput.value = savedKey;
      }
      apiKeyInput.addEventListener('input', (e) => {
        localStorage.setItem('rc_gemini_api_key', e.target.value.trim());
      });
    }

    if (!fileInput || !dropZone) return;

    // Prevent duplicate event binding
    if (dropZone.dataset.bound === 'true') return;
    dropZone.dataset.bound = 'true';

    dropZone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('border-indigo-500', 'bg-indigo-50/50');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/50');
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => runAiGradingProcess());
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => downloadAnnotatedPdf());
    }
  }

  async function handleFileSelection(file) {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a valid PDF file containing the scanned exam paper.');
      return;
    }

    currentUploadedPdfName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    currentUploadedPdfBytes = new Uint8Array(arrayBuffer);

    // Update UI File Info
    const fileInfo = document.getElementById('graderFileInfo');
    const fileNameEl = document.getElementById('graderFileName');
    const fileSizeEl = document.getElementById('graderFileSize');
    const startBtn = document.getElementById('graderStartBtn');
    const previewContainer = document.getElementById('graderPagesPreview');

    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    if (fileInfo) fileInfo.classList.remove('hidden');
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Convert PDF to images using pdf.js
    renderPdfThumbnails(currentUploadedPdfBytes, previewContainer);
  }

  async function renderPdfThumbnails(pdfBytes, container) {
    if (!window.pdfjsLib) {
      console.warn('pdf.js library not loaded yet.');
      return;
    }

    try {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const loadingTask = window.pdfjsLib.getDocument({ data: pdfBytes });
      const pdfDoc = await loadingTask.promise;
      currentRenderedImages = [];

      if (container) {
        container.innerHTML = '';
        container.classList.remove('hidden');
      }

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // High quality for Gemini OCR

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const base64Data = dataUrl.split(',')[1];
        currentRenderedImages.push({
          pageNumber: i,
          dataUrl: dataUrl,
          base64: base64Data,
          width: viewport.width,
          height: viewport.height
        });

        if (container) {
          const thumbWrap = document.createElement('div');
          thumbWrap.className = 'relative rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white flex flex-col items-center p-2';
          thumbWrap.innerHTML = `
            <img src="${dataUrl}" class="h-32 object-contain rounded mb-1">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Page ${i}</span>
          `;
          container.appendChild(thumbWrap);
        }
      }

      const pagesBadge = document.getElementById('graderPagesBadge');
      if (pagesBadge) {
        pagesBadge.textContent = `${pdfDoc.numPages} Pages Detected`;
        pagesBadge.classList.remove('hidden');
      }

    } catch (err) {
      console.error('Error rendering PDF:', err);
      alert('Error parsing PDF pages. Please verify the file is not password protected.');
    }
  }

  async function runAiGradingProcess() {
    if (!currentUploadedPdfBytes || currentRenderedImages.length === 0) {
      alert('Please upload a student script first.');
      return;
    }

    const apiKeyInput = document.getElementById('graderApiKeyInput');
    const modelSelect = document.getElementById('graderModelSelect');
    const strictnessSelect = document.getElementById('graderStrictnessSelect');
    const teacherNameInput = document.getElementById('graderTeacherNameInput');

    const apiKey = (apiKeyInput && apiKeyInput.value.trim()) || localStorage.getItem('rc_gemini_api_key') || DEFAULT_API_KEY;
    if (!apiKey) {
      const details = document.getElementById('graderSettingsDetails');
      if (details) details.open = true;
      if (apiKeyInput) {
        apiKeyInput.focus();
        apiKeyInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      alert('Please enter your Gemini API Key in "Examiner Settings" to grade this exam. It will be saved securely in your browser.');
      return;
    }

    const model = (modelSelect && modelSelect.value) || 'gemini-2.5-flash';
    const strictness = (strictnessSelect && strictnessSelect.value) || 'Strict Teacher Framework (5 Complex Styles + Intro Frame)';
    const teacherName = (teacherNameInput && teacherNameInput.value.trim()) || 'Rania Classroom';

    const progressBox = document.getElementById('graderProgressBox');
    const progressStatus = document.getElementById('graderProgressStatus');
    const progressBar = document.getElementById('graderProgressBar');
    const startBtn = document.getElementById('graderStartBtn');
    const resultsContainer = document.getElementById('graderResultsContainer');

    if (progressBox) progressBox.classList.remove('hidden');
    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (startBtn) startBtn.disabled = true;

    try {
      updateGraderProgress(20, 'Preparing handwritten script for Chief Examiner AI analysis...');

      // Build Gemini API payload
      const contentsParts = [
        { text: INLINE_GRADING_PROMPT + `\n\nActive Framework: ${strictness}\nExaminer Center: ${teacherName}` }
      ];

      currentRenderedImages.forEach(img => {
        contentsParts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: img.base64
          }
        });
      });

      updateGraderProgress(50, `Analyzing with Cambridge AI Examiner (${model})...`);

      // Call Gemini API
      let rawResult = await callGeminiApi(apiKey, model, contentsParts);
      updateGraderProgress(75, 'Extracting corrections, marks, and diagnostic report...');

      currentGradingResult = rawResult;

      // Render Results on UI
      renderGradingResultsUi(rawResult);

      // Generate Annotated PDF with pdf-lib
      updateGraderProgress(90, 'Stamping and drawing redlines on student PDF...');
      currentAnnotatedPdfBytes = await generateAnnotatedPdf(currentUploadedPdfBytes, rawResult, teacherName);

      updateGraderProgress(100, 'Cambridge Examination Graded Successfully!');
      setTimeout(() => {
        if (progressBox) progressBox.classList.add('hidden');
        if (resultsContainer) resultsContainer.classList.remove('hidden');
        if (startBtn) startBtn.disabled = false;
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }, 600);

    } catch (err) {
      console.error('AI Grading Error:', err);
      if (progressBox) progressBox.classList.add('hidden');
      if (startBtn) startBtn.disabled = false;

      let msg = err.message || 'Unknown error occurred.';
      if (msg.includes('402') || msg.includes('RESOURCE_EXHAUSTED')) {
        alert('Gemini Quota Notice: The current API key quota is exhausted. Please input an active Google AI Studio API key in the System Configuration box above and try again.');
      } else {
        alert('Grading failed: ' + msg);
      }
    }
  }

  function updateGraderProgress(pct, statusText) {
    const progressBar = document.getElementById('graderProgressBar');
    const progressStatus = document.getElementById('graderProgressStatus');
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressStatus) progressStatus.textContent = statusText;
  }

  async function callGeminiApi(apiKey, model, parts) {
    const defaultCandidates = [
      model,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-3.8-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
      'gemini-1.5-pro'
    ];
    const modelsToTry = [...new Set(defaultCandidates.filter(Boolean))];

    let lastError = null;

    for (const m of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: parts }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      };

      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) {
          const errData = await resp.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${resp.status}`;
          throw new Error(`Model ${m}: ${errMsg}`);
        }

        const data = await resp.json();
        const candidate = data.candidates?.[0];
        let text = candidate?.content?.parts?.[0]?.text || '';
        text = text.trim();
        if (text.startsWith('```json')) text = text.slice(7);
        if (text.startsWith('```')) text = text.slice(3);
        if (text.endsWith('```')) text = text.slice(0, -3);

        return JSON.parse(text.trim());
      } catch (err) {
        lastError = err;
        console.warn(`Attempt with model ${m} failed:`, err);
        if (err.message && err.message.includes('402')) {
          throw err; // Don't loop if quota exhausted
        }
      }
    }

    throw lastError || new Error('All model attempts failed.');
  }

  function renderGradingResultsUi(res) {
    const candidateNameEl = document.getElementById('graderCandidateName');
    const writingScoreEl = document.getElementById('graderWritingScore');
    const contentScoreEl = document.getElementById('graderContentScore');
    const langScoreEl = document.getElementById('graderLangScore');
    const totalScoreEl = document.getElementById('graderTotalScore');
    const bandBadgeEl = document.getElementById('graderBandBadge');

    if (candidateNameEl) candidateNameEl.textContent = res.candidate_name || 'Candidate';
    if (writingScoreEl) writingScoreEl.textContent = `${res.writing_total || 0} / ${res.writing_max || 16}`;
    if (contentScoreEl) contentScoreEl.textContent = `${res.writing_content || 0} / ${res.writing_content_max || 8}`;
    if (langScoreEl) langScoreEl.textContent = `${res.writing_language || 0} / ${res.writing_language_max || 8}`;

    let overallTotal = res.writing_total || 0;
    let overallMax = res.writing_max || 16;
    if (res.has_reading && res.reading_total !== null) {
      overallTotal += res.reading_total;
      overallMax += 30;
    }
    if (totalScoreEl) totalScoreEl.textContent = `${overallTotal} / ${overallMax}`;

    if (bandBadgeEl) {
      const pct = (overallTotal / overallMax) * 100;
      if (pct >= 85) {
        bandBadgeEl.textContent = '🌟 Grade A* (Top Marks)';
        bandBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300';
      } else if (pct >= 70) {
        bandBadgeEl.textContent = '🎯 Grade A (High Merit)';
        bandBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-300';
      } else if (pct >= 55) {
        bandBadgeEl.textContent = '👍 Grade B (Competent)';
        bandBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300';
      } else {
        bandBadgeEl.textContent = '⚠️ Needs Revision';
        bandBadgeEl.className = 'px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300';
      }
    }

    // 1. Weak Points
    const weakList = document.getElementById('graderWeakPointsList');
    if (weakList) {
      weakList.innerHTML = (res.weak_points || []).map(p => `
        <li class="flex items-start gap-2 text-xs font-semibold text-rose-900">
          <span class="text-rose-500 font-bold shrink-0">&bull;</span>
          <span>${escapeHtml(p)}</span>
        </li>
      `).join('') || '<li class="text-xs text-slate-500">None identified.</li>';
    }

    // 2. Actionable Steps
    const toWorkList = document.getElementById('graderToWorkOnList');
    if (toWorkList) {
      toWorkList.innerHTML = (res.to_work_on || []).map(p => `
        <li class="flex items-start gap-2 text-xs font-semibold text-blue-900">
          <span class="text-blue-500 font-bold shrink-0">&bull;</span>
          <span>${escapeHtml(p)}</span>
        </li>
      `).join('') || '<li class="text-xs text-slate-500">None identified.</li>';
    }

    // 3. 5 Mastery Sentences
    const masteryList = document.getElementById('graderMasterySentencesList');
    if (masteryList) {
      masteryList.innerHTML = (res.mastery_sentences || []).map(item => `
        <div class="p-3 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col gap-1">
          <span class="text-[11px] font-black tracking-wider uppercase text-emerald-700 flex items-center gap-1.5">
            <span>✨</span> <span>${escapeHtml(item.style || 'Complex Style')}</span>
          </span>
          <p class="text-xs font-medium text-slate-700 leading-relaxed font-serif italic">"${escapeHtml(item.sentence || '')}"</p>
        </div>
      `).join('') || '<div class="text-xs text-slate-500">No model sentences generated.</div>';
    }

    // 4. Corrections Table
    const corrBody = document.getElementById('graderCorrectionsBody');
    if (corrBody) {
      const corrections = res.inline_corrections || [];
      if (corrections.length === 0) {
        corrBody.innerHTML = `<tr><td colspan="4" class="px-4 py-4 text-center text-xs text-slate-400">No spelling or register errors found. Excellent draft!</td></tr>`;
      } else {
        corrBody.innerHTML = corrections.map((c, idx) => `
          <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
            <td class="px-3 py-2.5 font-mono text-xs font-bold text-slate-500">#${idx + 1}</td>
            <td class="px-3 py-2.5 font-bold text-xs text-rose-600 line-through">${escapeHtml(c.original || '')}</td>
            <td class="px-3 py-2.5 font-bold text-xs text-emerald-600">${escapeHtml(c.replacement || '')}</td>
            <td class="px-3 py-2.5">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                ${escapeHtml(c.category || 'Vocabulary')}
              </span>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  async function generateAnnotatedPdf(originalBytes, result, teacherTitle) {
    if (!window.PDFLib) {
      throw new Error('PDFLib library is not loaded.');
    }

    const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
    const pdfDoc = await PDFDocument.load(originalBytes);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    const numPages = pages.length;

    // 1. Draw Official Verification Stamp on Page 1
    if (numPages > 0) {
      const page1 = pages[0];
      const { width: pw, height: ph } = page1.getSize();

      // Outer Stamp Box
      const stampX = 35;
      const stampY = ph - 125;
      const stampW = 240;
      const stampH = 90;

      page1.drawRectangle({
        x: stampX,
        y: stampY,
        width: stampW,
        height: stampH,
        color: rgb(0.99, 1.0, 0.99),
        borderColor: rgb(0.12, 0.45, 0.25),
        borderWidth: 1.5,
      });

      // Top Banner
      page1.drawRectangle({
        x: stampX,
        y: stampY + stampH - 22,
        width: stampW,
        height: 22,
        color: rgb(0.12, 0.45, 0.25),
      });

      page1.drawText("CAMBRIDGE ASSESSMENT VERIFIED", {
        x: stampX + 12,
        y: stampY + stampH - 16,
        size: 8.5,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      });

      // Score Text
      let scoreLine = `WRITING: ${result.writing_total || 0} / ${result.writing_max || 16}`;
      if (result.has_reading && result.reading_total !== null) {
        scoreLine = `TOTAL: ${(result.writing_total || 0) + (result.reading_total || 0)} / ${(result.writing_max || 16) + 30}`;
      }

      page1.drawText(scoreLine, {
        x: stampX + 14,
        y: stampY + 44,
        size: 13,
        font: helveticaBold,
        color: rgb(0.1, 0.4, 0.2),
      });

      page1.drawText(`Content: ${result.writing_content || 0}  |  Language: ${result.writing_language || 0}`, {
        x: stampX + 14,
        y: stampY + 28,
        size: 8,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });

      page1.drawText(`Evaluated by: ${teacherTitle}`, {
        x: stampX + 14,
        y: stampY + 12,
        size: 7.5,
        font: helvetica,
        color: rgb(0.4, 0.4, 0.4),
      });
    }

    // 2. Draw Reading Ticks
    for (const tick of (result.reading_ticks || [])) {
      const pIdx = tick.page_index || 0;
      if (pIdx >= 0 && pIdx < numPages) {
        const page = pages[pIdx];
        const { width: pw, height: ph } = page.getSize();
        const [ymin, xmin, ymax, xmax] = parseNormalizedBox(tick.box_2d);

        const x1 = (xmax / 1000.0) * pw;
        const yTop = (ymin / 1000.0) * ph;
        const pdfY = ph - yTop;

        page.drawText("OK", {
          x: x1 + 6,
          y: pdfY - 10,
          size: 11,
          font: helveticaBold,
          color: rgb(0.1, 0.6, 0.2),
        });
      }
    }

    // 3. Draw Inline Corrections (Red Strikethrough + White Pill Replacement)
    for (const corr of (result.inline_corrections || [])) {
      const pIdx = corr.page_index || 0;
      if (pIdx >= 0 && pIdx < numPages) {
        const page = pages[pIdx];
        const { width: pw, height: ph } = page.getSize();
        const [ymin, xmin, ymax, xmax] = parseNormalizedBox(corr.box_2d);

        const rx0 = (xmin / 1000.0) * pw;
        const ry0 = (ymin / 1000.0) * ph;
        const rx1 = (xmax / 1000.0) * pw;
        const ry1 = (ymax / 1000.0) * ph;

        // pdf-lib y coordinates
        const pdfMidY = ph - ((ry0 + ry1) / 2.0);
        const pdfTopY = ph - ry0;

        // Red Strikethrough line
        page.drawLine({
          start: { x: rx0, y: pdfMidY },
          end: { x: rx1, y: pdfMidY },
          thickness: 1.6,
          color: rgb(0.85, 0.1, 0.1),
        });

        // Replacement Pill
        const replacement = String(corr.replacement || '');
        const pillW = Math.max(replacement.length * 5.8 + 6, 26);
        const pillH = 12;
        let pillX = rx0;
        if (pillX + pillW > pw - 15) {
          pillX = pw - pillW - 15;
        }
        const pillY = pdfTopY + 2;

        page.drawRectangle({
          x: pillX,
          y: pillY,
          width: pillW,
          height: pillH,
          color: rgb(1, 1, 1),
          borderColor: rgb(0.85, 0.1, 0.1),
          borderWidth: 0.7,
        });

        page.drawText(replacement, {
          x: pillX + 3,
          y: pillY + 2.5,
          size: 7.5,
          font: helveticaBold,
          color: rgb(0.85, 0.1, 0.1),
        });
      }
    }

    // 4. Append Full Cambridge Diagnostic Report Page
    const reportPage = pdfDoc.addPage([595, 842]); // Standard A4 (pt)
    const { width: rpw, height: rph } = reportPage.getSize();

    // Report Header Banner
    reportPage.drawRectangle({
      x: 30,
      y: rph - 90,
      width: rpw - 60,
      height: 60,
      color: rgb(0.08, 0.18, 0.36),
    });

    reportPage.drawText("CAMBRIDGE IGCSE ESL — DETAILED MARKING REPORT", {
      x: 45,
      y: rph - 58,
      size: 11.5,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    const todayStr = new Date().toISOString().split('T')[0];
    reportPage.drawText(`Candidate: ${result.candidate_name || 'Student'}  |  Date: ${todayStr}  |  Center: ${teacherTitle}`, {
      x: 45,
      y: rph - 76,
      size: 8,
      font: helvetica,
      color: rgb(0.8, 0.85, 0.95),
    });

    // Box 1: Diagnostic Areas for Improvement (Weak Points)
    reportPage.drawRectangle({
      x: 30,
      y: rph - 240,
      width: rpw - 60,
      height: 135,
      color: rgb(1.0, 0.97, 0.97),
      borderColor: rgb(0.85, 0.2, 0.2),
      borderWidth: 1,
    });

    reportPage.drawText("1. DIAGNOSTIC AREAS FOR IMPROVEMENT (Weak Points):", {
      x: 45,
      y: rph - 125,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.75, 0.1, 0.1),
    });

    let wy = rph - 145;
    (result.weak_points || []).slice(0, 4).forEach(wp => {
      reportPage.drawText(`- ${wp}`, {
        x: 45,
        y: wy,
        size: 8,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });
      wy -= 18;
    });

    // Box 2: Actionable Recommendations (To Reach Top Marks)
    reportPage.drawRectangle({
      x: 30,
      y: rph - 395,
      width: rpw - 60,
      height: 135,
      color: rgb(0.97, 0.99, 1.0),
      borderColor: rgb(0.15, 0.4, 0.75),
      borderWidth: 1,
    });

    reportPage.drawText("2. ACTIONABLE RECOMMENDATIONS (To Reach Top Marks):", {
      x: 45,
      y: rph - 280,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.12, 0.3, 0.65),
    });

    let ty = rph - 300;
    (result.to_work_on || []).slice(0, 4).forEach(tw => {
      reportPage.drawText(`- ${tw}`, {
        x: 45,
        y: ty,
        size: 8,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });
      ty -= 18;
    });

    // Box 3: Model Sentences for the 5 Complex Styles
    reportPage.drawRectangle({
      x: 30,
      y: 40,
      width: rpw - 60,
      height: rph - 455,
      color: rgb(0.97, 1.0, 0.98),
      borderColor: rgb(0.1, 0.5, 0.3),
      borderWidth: 1,
    });

    reportPage.drawText("3. MODEL SENTENCES EXHIBITING THE 5 COMPLEX STYLES:", {
      x: 45,
      y: rph - 435,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.08, 0.4, 0.2),
    });

    let sy = rph - 460;
    (result.mastery_sentences || []).slice(0, 5).forEach(m => {
      reportPage.drawText(`* [${m.style || 'Style'}]: "${m.sentence || ''}"`, {
        x: 45,
        y: sy,
        size: 7.5,
        font: helvetica,
        color: rgb(0.15, 0.25, 0.2),
      });
      sy -= 28;
    });

    return await pdfDoc.save();
  }

  function parseNormalizedBox(box) {
    if (Array.isArray(box) && box.length >= 4) {
      return [parseFloat(box[0]), parseFloat(box[1]), parseFloat(box[2]), parseFloat(box[3])];
    }
    if (typeof box === 'object' && box !== null) {
      return [parseFloat(box.ymin || 0), parseFloat(box.xmin || 0), parseFloat(box.ymax || 0), parseFloat(box.xmax || 0)];
    }
    return [0, 0, 0, 0];
  }

  function downloadAnnotatedPdf() {
    if (!currentAnnotatedPdfBytes) {
      alert('Please run AI grading first.');
      return;
    }

    const candidateName = currentGradingResult?.candidate_name?.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Candidate';
    const blob = new Blob([currentAnnotatedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${candidateName}_Cambridge_Graded_Official.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
