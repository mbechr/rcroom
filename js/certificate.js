/**
 * Rania Classroom — Automatic Certificate of Mastery Generator
 * Generates an official, print-ready certificate when a student reaches SmartScore 100
 */

const MasteryCertificate = {
  open(student, skill) {
    const modal = document.getElementById('masteryCertModal');
    if (!modal) return;

    const studentNameEl = document.getElementById('certStudentName');
    const skillNameEl = document.getElementById('certSkillName');
    const dateEl = document.getElementById('certDateValue');
    const titleEl = document.getElementById('certTitle');
    const introEl = document.getElementById('certIntro');
    const reasonEl = document.getElementById('certReason');
    const instructorEl = document.getElementById('certInstructor');

    const isAr = window.I18N && window.I18N.currentLang === 'ar';

    const sName = (student && student.full_name) ? student.full_name : 'Alex Turner';
    const sCode = skill ? (skill.code || skill.skill_code || 'A.1') : 'A.1';
    const sTitle = skill ? (skill.name || skill.skill_name || 'Curriculum Skill') : 'Curriculum Skill';

    const today = new Date();
    const dateStr = today.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (studentNameEl) studentNameEl.textContent = sName;
    if (skillNameEl) skillNameEl.textContent = `${sCode}: ${sTitle}`;
    if (dateEl) dateEl.textContent = dateStr;

    if (titleEl) titleEl.textContent = isAr ? 'شهادة إتقان وتفوق' : 'CERTIFICATE OF MASTERY';
    if (introEl) introEl.textContent = isAr ? 'تشهد المعلمة رانيا بأن الطالبـ/ـة المتميز/ة' : 'This certifies that';
    if (reasonEl) {
      reasonEl.innerHTML = isAr
        ? `قد أتمـ/ـت بنجاح باهر تدريبات المهارة وحققـ/ـت درجة الإتقان الكاملة <span class="cert-skill-highlight">(100 SmartScore)</span> في مادة <span class="cert-skill-highlight">${skill.subject || 'الرياضيات'}</span>.`
        : `has demonstrated exceptional diligence and achieved a perfect <span class="cert-skill-highlight">100 SmartScore</span> in <span class="cert-skill-highlight">${skill.subject || 'Maths'}</span>.`;
    }
    if (instructorEl) instructorEl.textContent = isAr ? 'أ. رانيا' : 'Miss Rania';

    modal.classList.add('open');
    if (window.ConfettiFX) ConfettiFX.fire(4000);
    if (window.SoundFX) SoundFX.fanfare();
  },

  close() {
    const modal = document.getElementById('masteryCertModal');
    if (modal) modal.classList.remove('open');
  },

  print() {
    window.print();
  }
};

window.MasteryCertificate = MasteryCertificate;
