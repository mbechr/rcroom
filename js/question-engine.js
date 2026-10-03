/**
 * RC Classroom — Custom Year-by-Year Question Engine
 * Miss Rania's Dedicated Classroom Question Architecture
 * 
 * Replaces all legacy IXL simulated procedural generators with an
 * authentic, teacher-controlled Year-by-Year question bank.
 */

(function() {
  'use strict';

  const QuestionBank = {
    cache: {},
    sessionAnsweredIds: new Set()
  };

  function normalizeGrade(gradeStr) {
    const g = String(gradeStr || 'Year 4').trim().toLowerCase();
    if (g.includes('reception') || g.includes('early')) return 'reception';
    if (g.includes('year 1') || g.includes('year-1')) return 'year1';
    if (g.includes('year 2') || g.includes('year-2')) return 'year2';
    if (g.includes('year 3') || g.includes('year-3')) return 'year3';
    if (g.includes('year 4') || g.includes('year-4')) return 'year4';
    if (g.includes('year 5') || g.includes('year-5')) return 'year5';
    if (g.includes('year 6') || g.includes('year-6')) return 'year6';
    if (g.includes('year 7') || g.includes('year-7')) return 'year7';
    if (g.includes('year 8') || g.includes('year-8')) return 'year8';
    if (g.includes('year 9') || g.includes('year-9')) return 'year9';
    if (g.includes('year 10') || g.includes('year-10')) return 'year10';
    if (g.includes('year 11') || g.includes('year-11')) return 'year11';
    if (g.includes('year 12') || g.includes('year-12')) return 'year12';
    if (g.includes('year 13') || g.includes('year-13')) return 'year13';
    return 'year4';
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const CustomEngine = {
    registerYear(yearSlug, data) {
      QuestionBank.cache[yearSlug] = data;
    },

    async loadYear(yearStr) {
      const slug = normalizeGrade(yearStr);
      if (QuestionBank.cache[slug]) return QuestionBank.cache[slug];

      try {
        const resp = await fetch('data/questions/' + slug + '.json?v=' + Date.now());
        if (resp.ok) {
          const json = await resp.json();
          QuestionBank.cache[slug] = json;
          return json;
        }
      } catch (e) {
        console.warn('Custom questions file not loaded yet for:', slug);
      }
      return null;
    },

    generate(skill, currentScore) {
      if (!skill) skill = { code: 'A.1', name: 'Curriculum Drill', grade: 'Year 4', subject: 'Maths' };

      const yearSlug = normalizeGrade(skill.grade);
      const yearData = QuestionBank.cache[yearSlug];

      let candidateQuestions = [];

      if (yearData && yearData.skills) {
        const codeKey = (skill.code || '').toUpperCase();
        const permaKey = (skill.permacode || '').toUpperCase();
        const nameLower = (skill.name || skill.skill_name || '').toLowerCase();

        if (yearData.skills[codeKey]) {
          candidateQuestions = yearData.skills[codeKey].questions || [];
        } else if (permaKey && yearData.skills[permaKey]) {
          candidateQuestions = yearData.skills[permaKey].questions || [];
        } else {
          for (const key of Object.keys(yearData.skills)) {
            const entry = yearData.skills[key];
            if (entry.skill_name && entry.skill_name.toLowerCase() === nameLower) {
              candidateQuestions = entry.questions || [];
              break;
            }
          }
        }
      }

      if (candidateQuestions && candidateQuestions.length > 0) {
        const fresh = candidateQuestions.filter(q => !QuestionBank.sessionAnsweredIds.has(q.id));
        const pool = fresh.length > 0 ? fresh : candidateQuestions;
        const chosen = pool[Math.floor(Math.random() * pool.length)];

        QuestionBank.sessionAnsweredIds.add(chosen.id);

        return {
          id: chosen.id,
          type: chosen.type || 'multiple_choice',
          prompt: chosen.prompt,
          visuals: chosen.visuals || ['📚 ' + (skill.subject || 'Curriculum') + ' • ' + (skill.grade || 'Year 4')],
          options: chosen.options ? shuffle(chosen.options) : [chosen.correctAnswer],
          correctAnswer: chosen.correctAnswer,
          explanation: chosen.explanation || 'Review the classroom lecture notes for step-by-step guidance.',
          isPlaceholder: false
        };
      }

      return {
        id: 'placeholder_' + Date.now(),
        isPlaceholder: true,
        type: 'placeholder',
        prompt: '📝 New custom questions for "' + (skill.name || skill.code) + '" are currently being prepared by Miss Rania.',
        visuals: [
          '🎯 Skill Code: ' + (skill.code || 'N/A'),
          '📚 Subject: ' + (skill.subject || 'Maths'),
          '🏫 Miss Rania Classroom Bank'
        ],
        options: ['Return to Skills Bank', 'Select Another Skill'],
        correctAnswer: 'Return to Skills Bank',
        explanation: 'Miss Rania is actively updating and authoring questions for this topic. Please select another lesson or check back soon!'
      };
    },

    clearSessionHistory() {
      QuestionBank.sessionAnsweredIds.clear();
    }
  };

  window.QuestionEngine = CustomEngine;
  window.CustomQuestionBank = QuestionBank;

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('DOMContentLoaded', () => {
      CustomEngine.loadYear('year4');
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomEngine;
  }
})();
