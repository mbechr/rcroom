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
      switchLanguage: 'عربي',
      certificateTitle: 'CERTIFICATE OF MASTERY',
      certPresentedTo: 'This certifies that',
      certReason: 'has demonstrated outstanding academic excellence and achieved 100% mastery in',
      certInstructor: 'Miss Rania',
      certInstructorTitle: 'Lead Educator',
      certDate: 'Date of Achievement',
      certPrintBtn: '🖨️ Print / Save as PDF',
      close: '✕ Close'
    },
    ar: {
      appName: 'منصة مس رانيا التعليمية',
      tagline: 'منصة التدريب والتقييم التفاعلي لطلاب الصفوف الأساسية',
      navDashboard: 'الرئيسية',
      navCurriculum: 'المنهج الدراسي',
      navSkills: 'بنك المهارات',
      navReports: 'تقرير الطالب',
      navTeacher: 'لوحة المعلمة',
      navLeaderboard: 'المتصدرون',
      searchPlaceholder: 'ابحث عن مهارة بالاسم، الموضوع، أو الرمز (مثال: A.1، الكسور)...',
      allSubjects: 'جميع المواد',
      maths: 'الرياضيات',
      english: 'اللغة الإنجليزية',
      science: 'العلوم',
      smartScore: 'درجة الإتقان',
      questionsAnswered: 'الأسئلة المجابة',
      timeSpent: 'الوقت المستغرق',
      accuracy: 'نسبة الدقة',
      masteredSkills: 'المهارات المتقنة',
      practiceStreak: 'أيام التتابع',
      practiceRoom: 'غرفة التدريب التفاعلية',
      submitAnswer: 'إرسال الإجابة',
      nextQuestion: 'السؤال التالي ←',
      scratchpad: 'لوحة الرسم',
      readAloud: 'قراءة صوتية',
      calculator: 'الآلة الحاسبة',
      numberLine: 'خط الأعداد',
      fractionModel: 'نماذج الكسور',
      excellentCorrect: '🌟 أحسنت! إجابة صحيحة وممتازة!',
      reviewSolution: '💡 راجع خطوات الحل التفصيلية:',
      correctAnswerLabel: 'الإجابة الصحيحة:',
      masteryTitle: '🎉 مبروك! حققت درجة الإتقان الكاملة 100!',
      masteryDesc: 'لقد أتقنت هذه المهارة بنجاح باهر! منحتك المعلمة رانيا شهادة تميز رسمية.',
      viewCertificate: '🎓 استعراض وطباعة الشهادة',
      exportCsv: '📥 تصدير كشف الدرجات (CSV)',
      strugglingTitle: '⚠️ مهارات تحتاج دعم ومراجعة جماعية',
      teacherRosterTitle: 'قائمة طلاب الفصل والمتابعة',
      assignmentsTitle: 'الواجبات والمهام المدرسية',
      newAssignment: '+ تكليف جديد',
      addStudent: '+ إضافة طالب',
      resetPassword: 'تغيير كلمة المرور',
      deleteStudent: 'حذف',
      switchLanguage: 'English',
      certificateTitle: 'شهادة إتقان وتميز',
      certPresentedTo: 'تشهد المعلمة رانيا بأن الطالبـ/ـة',
      certReason: 'قد أتمـ/ـت بنجاح متفوق وحققـ/ـت درجة الإتقان الكاملة (100%) في المهارة:',
      certInstructor: 'المعلمة رانيا',
      certInstructorTitle: 'معلمة المادة',
      certDate: 'تاريخ الإنجاز',
      certPrintBtn: '🖨️ طباعة / حفظ كـ PDF',
      close: '✕ إغلاق'
    }
  },

  t(key) {
    const lang = this.translations[this.currentLang] || this.translations.en;
    return lang[key] || this.translations.en[key] || key;
  },

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('rc_lang', lang);
    this.apply();
  },

  toggle() {
    this.setLang(this.currentLang === 'ar' ? 'en' : 'ar');
  },

  apply() {
    const isAr = this.currentLang === 'ar';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key && this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = this.t(key);
        } else {
          el.textContent = this.t(key);
        }
      }
    });

    // Update lang toggle button text
    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerHTML = '🌐 <span>' + this.t('switchLanguage') + '</span>';
    }

    // Refresh sliding nav indicator
    if (typeof window.updateNavIndicator === 'function') {
      setTimeout(() => window.updateNavIndicator(), 50);
    }
  }
};

window.I18N = I18N;