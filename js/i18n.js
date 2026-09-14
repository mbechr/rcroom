/**
 * Rania Classroom — Bilingual Localization (i18n) Engine
 * Full Arabic (RTL) & English (LTR) Support
 */

const I18N = {
  currentLang: (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lang')) || localStorage.getItem('rc_lang') || 'en',

  translations: {
    en: {
      appName: 'RC Classroom',
      tagline: 'Personalized Learning & Mastery Platform',
      navDashboard: 'Dashboard',
      navCurriculum: 'Curriculum',
      navSkills: 'Skills Bank',
      navReports: 'Student Report',
      navTeacher: 'Teacher Suite',
      navLeaderboard: 'Leaderboard',
      searchPlaceholder: 'Search skills by name, topic, or code (e.g. A.1, fractions)...',
      allSubjects: 'All Subjects',
      maths: 'Maths',
      english: 'English',
      science: 'Science',
      smartScore: 'SmartScore',
      questionsAnswered: 'Questions Answered',
      timeSpent: 'Time Spent',
      accuracy: 'Accuracy',
      masteredSkills: 'Mastered Skills',
      practiceStreak: 'Day Streak',
      practiceRoom: 'Interactive Practice Room',
      submitAnswer: 'Submit Answer',
      nextQuestion: 'Next Question →',
      scratchpad: 'Scratchpad',
      readAloud: 'Read Aloud',
      calculator: 'Calculator',
      numberLine: 'Number Line',
      fractionModel: 'Fractions',
      excellentCorrect: '🌟 Excellent! Correct Answer!',
      reviewSolution: '💡 Review the Step-by-Step Solution:',
      correctAnswerLabel: 'Correct Answer:',
      masteryTitle: '🎉 Perfect 100 SmartScore Achieved!',
      masteryDesc: 'You have completely mastered this skill! Miss Rania has awarded you a Certificate of Mastery.',
      viewCertificate: '🎓 View Certificate',
      exportCsv: '📥 Export CSV Roster',
      strugglingTitle: '⚠️ Struggling Skills (Needs Review)',
      teacherRosterTitle: 'Classroom Student Roster',
      assignmentsTitle: 'Active Homework & Assignments',
      newAssignment: '+ New Assignment',
      addStudent: '+ Add Student',
      resetPassword: 'Reset Password',
      deleteStudent: 'Delete',
      switchLanguage: 'English',
      certificateTitle: 'CERTIFICATE OF MASTERY',
      certPresentedTo: 'This certifies that',
      certReason: 'has demonstrated outstanding academic excellence and achieved 100% mastery in',
      certInstructor: 'Miss Rania',
      certInstructorTitle: 'Lead Educator',
      certDate: 'Date of Achievement',
      certPrintBtn: '🖨️ Print / Save as PDF',
      close: '✕ Close',
      quickSwitchTitle: 'Fast Account Switch',
      quickSwitchStudents: 'Or Select Student:',
      moreLoginOptions: 'Login with Password / Add Student',
    }
  },

  t(key) {
    return (this.translations.en && this.translations.en[key]) || key;
  },

  setLang(lang) {
    this.currentLang = 'en';
    localStorage.setItem('rc_lang', 'en');
    this.apply();
  },

  toggle() {
    this.setLang('en');
  },

  apply() {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.body.setAttribute('dir', 'ltr');

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key && this.translations.en && this.translations.en[key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = this.t(key);
        } else {
          el.textContent = this.t(key);
        }
      }
    });

    // Update lang toggle button tooltip/title (icon-only button)
    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">language</span>';
      toggleBtn.title = 'English';
    }

    // Refresh sliding nav indicator
    if (typeof window.updateNavIndicator === 'function') {
      setTimeout(() => window.updateNavIndicator(), 50);
    }
  }
};

window.I18N = I18N;