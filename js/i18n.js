/**
 * Rania Classroom — Bilingual Localization (i18n) Engine
 * Full Arabic (RTL) & English (LTR) Support
 */

const I18N = {
  currentLang: (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lang')) || (typeof localStorage !== 'undefined' && localStorage.getItem('rc_lang')) || 'en',

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
      navLiveClasses: 'Live Classes 🎥',
      navLessonsBooks: 'My Lessons & Books 📚',
      navMyProgress: 'My Progress 📊',
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
      switchLanguage: 'العربية',
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
      studentHub: 'Student Hub',
      parentPortal: 'Parent Portal 👨‍👩‍👧',
      teacherSuite: 'Teacher Suite 👩‍🏫',
      signOut: 'Sign Out'
    },
    ar: {
      appName: 'أكاديمية رانيا كلاس روم',
      tagline: 'منصة التعلم المخصص والتميز الأكاديمي',
      navDashboard: 'لوحة التحكم',
      navCurriculum: 'المنهج الدراسي',
      navSkills: 'بنك المهارات',
      navReports: 'تقرير الطالب',
      navTeacher: 'لوحة المعلم',
      navLeaderboard: 'لوحة الشرف',
      navLiveClasses: 'الحصص المباشرة 🎥',
      navLessonsBooks: 'دروسي وكتبي 📚',
      navMyProgress: 'تقدمي الدراسي 📊',
      searchPlaceholder: 'ابحث عن المهارات بالاسم أو الموضوع أو الرمز (مثل الكسور، A.1)...',
      allSubjects: 'جميع المواد',
      maths: 'الرياضيات',
      english: 'اللغة الإنجليزية',
      science: 'العلوم',
      smartScore: 'نقاط الإتقان SmartScore',
      questionsAnswered: 'الأسئلة المجابة',
      timeSpent: 'الوقت المستغرق',
      accuracy: 'نسبة الدقة',
      masteredSkills: 'المهارات المتقنة',
      practiceStreak: 'أيام الحماس المتتالية',
      practiceRoom: 'غرفة التدريب التفاعلي',
      submitAnswer: 'تأكيد الإجابة',
      nextQuestion: 'السؤال التالي ←',
      scratchpad: 'المسودة الذكية',
      readAloud: 'قراءة بصوت عالٍ',
      calculator: 'الآلة الحاسبة',
      numberLine: 'خط الأعداد',
      fractionModel: 'نموذج الكسور',
      excellentCorrect: '🌟 أحسنت! إجابة صحيحة ومتميزة!',
      reviewSolution: '💡 راجع خطوات الحل التفصيلية:',
      correctAnswerLabel: 'الإجابة الصحيحة:',
      masteryTitle: '🎉 مبروك! حققت الدرجة الكاملة 100 SmartScore!',
      masteryDesc: 'لقد أتقنت هذه المهارة بالكامل! منحتك مس رانيا شهادة التميز والتفوق الأكاديمي.',
      viewCertificate: '🎓 عرض شهادة التميز',
      exportCsv: '📥 تصدير السجل CSV',
      strugglingTitle: '⚠️ مهارات تحتاج لمراجعة وتعزيز',
      teacherRosterTitle: 'قائمة طلاب الفصل الدراسي',
      assignmentsTitle: 'الواجبات والمهام المدرسية',
      newAssignment: '+ واجب جديد',
      addStudent: '+ إضافة طالب',
      resetPassword: 'إعادة تعيين كلمة المرور',
      deleteStudent: 'حذف',
      switchLanguage: 'English',
      certificateTitle: 'شهادة تفوق وتميز أكاديمي',
      certPresentedTo: 'تشهد أكاديمية رانيا بأن الطالب/ـة',
      certReason: 'قد أظهر/ت تفوقاً أكاديمياً متميزاً وأتقن/ت بنسبة 100% مهارة',
      certInstructor: 'مس رانيا',
      certInstructorTitle: 'المعلمة المشرفة',
      certDate: 'تاريخ الإنجاز',
      certPrintBtn: '🖨️ طباعة / حفظ كـ PDF',
      close: '✕ إغلاق',
      quickSwitchTitle: 'التبديل السريع للحسابات',
      quickSwitchStudents: 'أو اختر طالباً:',
      moreLoginOptions: 'تسجيل الدخول بكلمة المرور / إضافة طالب',
      studentHub: 'بوابة الطالب',
      parentPortal: 'بوابة ولي الأمر 👨‍👩‍👧',
      teacherSuite: 'جناح المعلمة 👩‍🏫',
      signOut: 'تسجيل الخروج'
    }
  },

  t(key) {
    const lang = this.currentLang || 'en';
    const dict = this.translations[lang] || this.translations.en;
    return dict[key] || this.translations.en[key] || key;
  },

  setLang(lang) {
    this.currentLang = (lang === 'ar') ? 'ar' : 'en';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('rc_lang', this.currentLang);
    }
    this.apply();
  },

  toggle() {
    const next = this.currentLang === 'ar' ? 'en' : 'ar';
    this.setLang(next);
  },

  apply() {
    const isAr = this.currentLang === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';
    const lang = isAr ? 'ar' : 'en';

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (document.body) {
      document.body.setAttribute('dir', dir);
      if (isAr) {
        document.body.classList.add('lang-ar');
      } else {
        document.body.classList.remove('lang-ar');
      }
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key) {
        const text = this.t(key);
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = text;
        } else {
          // If element has only text or simple children, update cleanly
          el.textContent = text;
        }
      }
    });

    // Update lang toggle button tooltip & label
    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
      const targetLabel = isAr ? 'English' : 'العربية';
      toggleBtn.title = isAr ? 'Switch to English' : 'التحويل إلى اللغة العربية';
      const labelSpan = toggleBtn.querySelector('.lang-btn-label');
      if (labelSpan) {
        labelSpan.textContent = targetLabel;
      }
    }

    // Refresh sliding nav indicator
    if (typeof window.updateNavIndicator === 'function') {
      setTimeout(() => window.updateNavIndicator(), 50);
    }

    // Notify listeners via custom event
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('rc:lang-changed', { detail: { lang: this.currentLang, dir } }));
    }
  }
};

// Initialize i18n on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.apply());
  } else {
    I18N.apply();
  }
}

window.I18N = I18N;