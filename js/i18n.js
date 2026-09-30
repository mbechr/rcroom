/**
 * RC Academy — English-only interface layer.
 * The product UI is intentionally locked to English for a consistent global experience.
 */
(function (window) {
  'use strict';

  const translations = {
    appName: 'RC Classroom',
    tagline: 'Personalized Learning & Mastery Platform',
    navDashboard: 'Dashboard',
    navCurriculum: 'Curriculum',
    navSkills: 'Skills Bank',
    navReports: 'Student Report',
    navTeacher: 'Teacher Suite',
    navLeaderboard: 'Leaderboard',
    navLiveClasses: 'Live Classes',
    navLessonsBooks: 'My Lessons & Books',
    navMyProgress: 'My Progress',
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
    masteryDesc: 'You have completely mastered this skill! You have earned a Certificate of Mastery.',
    viewCertificate: '🎓 View Certificate',
    exportCsv: '📥 Export CSV Roster',
    strugglingTitle: '⚠️ Skills That Need Review',
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
    quickSwitchStudents: 'Select Student:',
    moreLoginOptions: 'Login with Password / Add Student',
    studentHub: 'Student Hub',
    parentPortal: 'Parent Portal',
    teacherSuite: 'Teacher Suite',
    signOut: 'Sign Out'
  };

  const I18N = {
    currentLang: 'en',
    translations: { en: translations },
    t(key) { return translations[key] || key; },
    setLang() {
      this.currentLang = 'en';
      if (typeof localStorage !== 'undefined') localStorage.setItem('rc_lang', 'en');
      this.apply();
    },
    toggle() { this.apply(); },
    apply() {
      this.currentLang = 'en';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.body?.setAttribute('dir', 'ltr');
      document.body?.classList.remove('lang-ar');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!key || !(key in translations)) return;
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = translations[key];
        } else {
          el.textContent = translations[key];
        }
      });

      const toggleBtn = document.getElementById('langToggleBtn');
      if (toggleBtn) {
        toggleBtn.hidden = true;
        toggleBtn.setAttribute('aria-hidden', 'true');
      }

      if (typeof window.updateNavIndicator === 'function') {
        setTimeout(() => window.updateNavIndicator(), 50);
      }
      window.dispatchEvent?.(new CustomEvent('rc:lang-changed', { detail: { lang: 'en', dir: 'ltr' } }));
    }
  };

  window.I18N = I18N;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => I18N.apply());
    else I18N.apply();
  }
})(window);
