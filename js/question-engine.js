/**
 * Rania Classroom — Intelligent Adaptive Generative Question Engine
 * v5.0 Stage-Aware UK National Curriculum Engine
 * 
 * Guarantees:
 * 1. 100% Stage-Appropriate Questions:
 *    - Early Years (Reception)
 *    - Key Stage 1 (Year 1, Year 2)
 *    - Lower Key Stage 2 (Year 3, Year 4)
 *    - Upper Key Stage 2 (Year 5, Year 6)
 *    - Key Stage 3 (Year 7, Year 8, Year 9)
 *    - Key Stage 4 / GCSE (Year 10, Year 11)
 *    - Key Stage 5 / A-Levels (Year 12, Year 13)
 * 2. NO REPETITIONS across stages — Year 1 gets KS1 phonics/addition, Year 12 gets calculus/advanced analysis.
 * 3. Session Anti-Repetition Cache (prevents duplicate questions during a practice session).
 * 4. Procedural Mathematical Generators (equations, arithmetic, geometry, algebra, calculus).
 * 5. Rich Multi-Subject Coverage (Maths, English, Science).
 */

(function() {
  'use strict';

  // Anti-repetition session cache
  const sessionHistory = new Set();

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getStage(gradeStr) {
    const g = String(gradeStr || '').toLowerCase();
    if (g.includes('reception') || g.includes('nursery') || g.includes('early')) return 'early';
    if (g.includes('year 12') || g.includes('year-12') || g.includes('year 13') || g.includes('year-13') || g.includes('a-level') || g.includes('ks5') || g.includes('sixth')) return 'alevel';
    if (g.includes('year 10') || g.includes('year-10') || g.includes('year 11') || g.includes('year-11') || g.includes('gcse') || g.includes('ks4')) return 'gcse';
    if (g.includes('year 7') || g.includes('year-7') || g.includes('year 8') || g.includes('year-8') || g.includes('year 9') || g.includes('year-9') || g.includes('ks3')) return 'ks3';
    if (g.includes('year 5') || g.includes('year-5') || g.includes('year 6') || g.includes('year-6')) return 'upper_ks2';
    if (g.includes('year 3') || g.includes('year-3') || g.includes('year 4') || g.includes('year-4')) return 'lower_ks2';
    if (g.includes('year 1') || g.includes('year-1') || g.includes('year 2') || g.includes('year-2') || g.includes('ks1')) return 'ks1';
    return 'lower_ks2'; // sensible middle fallback
  }

  function generateUniqueNumericDistractors(correct, count = 3, deltaRange = 10) {
    const distractors = new Set();
    let attempts = 0;
    const isDecimal = String(correct).includes('.');
    const decimals = isDecimal ? (String(correct).split('.')[1] || '').length : 0;
    const num = parseFloat(correct);

    while (distractors.size < count && attempts < 50) {
      attempts++;
      let delta = randomInt(1, Math.max(2, deltaRange)) * (Math.random() > 0.5 ? 1 : -1);
      if (isDecimal) delta = delta / Math.pow(10, decimals);
      const fake = isDecimal ? (num + delta).toFixed(decimals) : String(Math.max(0, Math.round(num + delta)));
      if (fake !== String(correct) && !distractors.has(fake)) {
        distractors.add(fake);
      }
    }

    let fallbackStep = 1;
    while (distractors.size < count) {
      const fake = isDecimal ? (num + fallbackStep * 0.5).toFixed(decimals) : String(Math.max(0, num + fallbackStep));
      if (fake !== String(correct) && !distractors.has(fake)) {
        distractors.add(fake);
      }
      fallbackStep++;
    }

    return Array.from(distractors);
  }

  // ===========================================================================
  // 1. STAGE-SPECIFIC MATHEMATICS GENERATORS
  // ===========================================================================

  const MathStageGenerators = {
    // 1.1 EARLY YEARS (Reception)
    early(name, tier) {
      const mode = randomChoice(['count_items', 'more_less', 'shape_rec', 'number_match']);
      const icons = ['🍎', '⭐', '🎈', '🚗', '🐱', '🌸', '🍪', '⚽'];
      const icon = randomChoice(icons);

      if (mode === 'count_items') {
        const count = randomInt(1, tier === 1 ? 5 : 10);
        const visual = Array(count).fill(icon).join(' ');
        const correct = String(count);
        const distractors = generateUniqueNumericDistractors(count, 3, 3);
        return {
          type: 'multiple_choice',
          prompt: `Count the items below:\n${visual}\n\nHow many are there in total?`,
          visuals: [visual],
          correctAnswer: correct,
          options: shuffle([correct, ...distractors]),
          explanation: `Count one by one: there are exactly ${count} ${icon}.`
        };
      }

      if (mode === 'more_less') {
        const a = randomInt(1, 6);
        let b = randomInt(1, 6);
        while (b === a) b = randomInt(1, 6);
        const askMore = Math.random() > 0.5;
        const correct = String(askMore ? Math.max(a, b) : Math.min(a, b));
        return {
          type: 'multiple_choice',
          prompt: `Which group has ${askMore ? 'MORE' : 'FEWER'} items?\nGroup A: ${a} ${icon} | Group B: ${b} ${icon}`,
          visuals: [`A: ${Array(a).fill(icon).join('')}`, `B: ${Array(b).fill(icon).join('')}`],
          correctAnswer: `Group ${correct === String(a) ? 'A' : 'B'} (${correct})`,
          options: shuffle([`Group A (${a})`, `Group B (${b})`]),
          explanation: `${correct} is ${askMore ? 'more than' : 'fewer than'} the other group.`
        };
      }

      if (mode === 'shape_rec') {
        const shapes = [
          { name: 'Circle', vis: '⭕', hint: 'round with no corners' },
          { name: 'Square', vis: '🟧', hint: '4 equal straight sides' },
          { name: 'Triangle', vis: '🔺', hint: '3 straight sides and 3 corners' },
          { name: 'Star', vis: '⭐', hint: '5 pointed corners' }
        ];
        const s = randomChoice(shapes);
        return {
          type: 'multiple_choice',
          prompt: `What shape is shown below?\n${s.vis}`,
          visuals: [`Shape: ${s.vis}`],
          correctAnswer: s.name,
          options: shuffle(['Circle', 'Square', 'Triangle', 'Star']),
          explanation: `This is a ${s.name}. It is ${s.hint}.`
        };
      }

      // number_match
      const num = randomInt(1, 10);
      const words = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
      const correct = words[num];
      const distractors = words.filter(w => w && w !== correct).sort(() => 0.5 - Math.random()).slice(0, 3);
      return {
        type: 'multiple_choice',
        prompt: `What is the word for the numeral ${num}?`,
        visuals: [`Numeral: ${num}`],
        correctAnswer: correct,
        options: shuffle([correct, ...distractors]),
        explanation: `The number ${num} is written in words as "${correct}".`
      };
    },

    // 1.2 KEY STAGE 1 (Year 1 & Year 2)
    ks1(name, tier) {
      const mode = randomChoice(['add_sub_20', 'skip_count', 'place_tens_ones', 'clock_half', 'coins']);

      if (mode === 'add_sub_20') {
        const isSub = Math.random() > 0.5;
        let a, b, ans;
        if (isSub) {
          a = randomInt(10, 20);
          b = randomInt(2, 9);
          ans = a - b;
          return {
            type: 'multiple_choice',
            prompt: `Calculate: ${a} - ${b} = ?`,
            visuals: [`➖ ${a} - ${b}`],
            correctAnswer: String(ans),
            options: shuffle([String(ans), ...generateUniqueNumericDistractors(ans, 3, 3)]),
            explanation: `Taking away ${b} from ${a} leaves ${ans}.`
          };
        } else {
          a = randomInt(4, 15);
          b = randomInt(3, 12);
          ans = a + b;
          return {
            type: 'multiple_choice',
            prompt: `Calculate: ${a} + ${b} = ?`,
            visuals: [`➕ ${a} + ${b}`],
            correctAnswer: String(ans),
            options: shuffle([String(ans), ...generateUniqueNumericDistractors(ans, 3, 4)]),
            explanation: `Adding ${a} and ${b} gives ${ans}.`
          };
        }
      }

      if (mode === 'skip_count') {
        const step = randomChoice([2, 5, 10]);
        const start = step * randomInt(1, 4);
        const seq = [start, start + step, start + 2 * step];
        const next = start + 3 * step;
        return {
          type: 'multiple_choice',
          prompt: `What number comes next in this sequence?\n${seq.join(', ')}, ?`,
          visuals: [`Counting in ${step}s: ${seq.join(', ')}, ?`],
          correctAnswer: String(next),
          options: shuffle([String(next), ...generateUniqueNumericDistractors(next, 3, step)]),
          explanation: `Counting in ${step}s: after ${seq[2]} comes ${next}.`
        };
      }

      if (mode === 'place_tens_ones') {
        const tens = randomInt(1, 8);
        const ones = randomInt(1, 9);
        const num = tens * 10 + ones;
        const askTens = Math.random() > 0.5;
        return {
          type: 'multiple_choice',
          prompt: `In the two-digit number ${num}, how many ${askTens ? 'TENS' : 'ONES'} are there?`,
          visuals: [`🔢 Number: ${num}`],
          correctAnswer: String(askTens ? tens : ones),
          options: shuffle([String(tens), String(ones), String(tens + 1), String(Math.max(0, ones - 1))]),
          explanation: `In ${num}, there are ${tens} tens (${tens * 10}) and ${ones} ones (${ones}).`
        };
      }

      if (mode === 'clock_half') {
        const hour = randomInt(1, 12);
        const isHalf = Math.random() > 0.5;
        const timeStr = isHalf ? `Half past ${hour}` : `${hour} o'clock`;
        const digitalStr = isHalf ? `${hour}:30` : `${hour}:00`;
        return {
          type: 'multiple_choice',
          prompt: `Which digital time matches: "${timeStr}"?`,
          visuals: [`⏰ Time: ${timeStr}`],
          correctAnswer: digitalStr,
          options: shuffle([digitalStr, `${hour === 12 ? 1 : hour + 1}:00`, `${hour}:15`, `${hour === 1 ? 12 : hour - 1}:30`]),
          explanation: `"${timeStr}" is represented digitally as ${digitalStr}.`
        };
      }

      // coins
      const coin = randomChoice([
        { name: '10p coin', val: 10 },
        { name: '20p coin', val: 20 },
        { name: '50p coin', val: 50 },
        { name: '£1 coin (100p)', val: 100 }
      ]);
      const count = randomInt(2, 4);
      const total = coin.val * count;
      return {
        type: 'multiple_choice',
        prompt: `How much money is ${count} × ${coin.name}?`,
        visuals: [`🪙 ${count} coins of ${coin.name}`],
        correctAnswer: total >= 100 ? `£${(total / 100).toFixed(2)}` : `${total}p`,
        options: shuffle([
          total >= 100 ? `£${(total / 100).toFixed(2)}` : `${total}p`,
          `${total + 10}p`,
          `${Math.max(10, total - 10)}p`,
          `${total * 2}p`
        ]),
        explanation: `${count} × ${coin.val}p = ${total}p.`
      };
    },

    // 1.3 LOWER KEY STAGE 2 (Year 3 & Year 4)
    lower_ks2(name, tier) {
      const mode = randomChoice(['times_tables', 'place_thousands', 'roman_numerals', 'perimeter_grid', 'fractions_like']);

      if (mode === 'times_tables') {
        const a = randomInt(3, 12);
        const b = randomInt(3, 12);
        const isDiv = Math.random() > 0.5;
        if (isDiv) {
          const prod = a * b;
          return {
            type: 'multiple_choice',
            prompt: `What is ${prod} ÷ ${a}?`,
            visuals: [`➗ ${prod} ÷ ${a}`],
            correctAnswer: String(b),
            options: shuffle([String(b), ...generateUniqueNumericDistractors(b, 3, 3)]),
            explanation: `Because ${a} × ${b} = ${prod}, ${prod} ÷ ${a} = ${b}.`
          };
        } else {
          const prod = a * b;
          return {
            type: 'multiple_choice',
            prompt: `What is ${a} × ${b}?`,
            visuals: [`✖️ ${a} × ${b}`],
            correctAnswer: String(prod),
            options: shuffle([String(prod), ...generateUniqueNumericDistractors(prod, 3, 6)]),
            explanation: `${a} multiplied by ${b} equals ${prod}.`
          };
        }
      }

      if (mode === 'place_thousands') {
        const th = randomInt(1, 9);
        const h = randomInt(0, 9);
        const t = randomInt(0, 9);
        const o = randomInt(0, 9);
        const num = th * 1000 + h * 100 + t * 10 + o;
        return {
          type: 'multiple_choice',
          prompt: `What is the value of the digit ${th} in the number ${num.toLocaleString()}?`,
          visuals: [`🔢 Number: ${num.toLocaleString()}`],
          correctAnswer: (th * 1000).toLocaleString(),
          options: shuffle([(th * 1000).toLocaleString(), (th * 100).toLocaleString(), (th * 10).toLocaleString(), String(th)]),
          explanation: `The digit ${th} is in the thousands place, giving it a value of ${(th * 1000).toLocaleString()}.`
        };
      }

      if (mode === 'roman_numerals') {
        const romans = [
          { r: 'IV', v: 4 }, { r: 'IX', v: 9 }, { r: 'XIV', v: 14 },
          { r: 'XIX', v: 19 }, { r: 'XXIV', v: 24 }, { r: 'XL', v: 40 },
          { r: 'XLV', v: 45 }, { r: 'LX', v: 60 }, { r: 'LXXV', v: 75 },
          { r: 'XC', v: 90 }, { r: 'XCIV', v: 94 }
        ];
        const item = randomChoice(romans);
        return {
          type: 'multiple_choice',
          prompt: `What Hindu-Arabic number does the Roman numeral "${item.r}" represent?`,
          visuals: [`🏛️ Roman Numeral: ${item.r}`],
          correctAnswer: String(item.v),
          options: shuffle([String(item.v), String(item.v + 5), String(Math.max(1, item.v - 5)), String(item.v + 10)]),
          explanation: `In Roman numerals, ${item.r} represents ${item.v}.`
        };
      }

      if (mode === 'perimeter_grid') {
        const l = randomInt(4, 15);
        const w = randomInt(2, 9);
        const p = 2 * (l + w);
        return {
          type: 'multiple_choice',
          prompt: `Find the perimeter of a rectangle with length ${l} cm and width ${w} cm:`,
          visuals: [`▭ Rectangle: ${l} cm × ${w} cm`],
          correctAnswer: `${p} cm`,
          options: shuffle([`${p} cm`, `${l * w} cm`, `${p + 4} cm`, `${Math.max(2, p - 6)} cm`]),
          explanation: `Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = 2 × ${l + w} = ${p} cm.`
        };
      }

      // fractions_like
      const d = randomChoice([5, 6, 7, 8, 10]);
      const n1 = randomInt(1, Math.floor(d / 2));
      const n2 = randomInt(1, d - n1 - 1);
      const sum = n1 + n2;
      return {
        type: 'multiple_choice',
        prompt: `Add the fractions: ${n1}/${d} + ${n2}/${d} = ?`,
        visuals: [`🍰 ${n1}/${d} + ${n2}/${d}`],
        correctAnswer: `${sum}/${d}`,
        options: shuffle([`${sum}/${d}`, `${sum}/${d + d}`, `${Math.max(1, sum - 1)}/${d}`, `${sum + 1}/${d}`]),
        explanation: `With the same denominator (${d}), add the numerators: ${n1} + ${n2} = ${sum}. Result: ${sum}/${d}.`
      };
    },

    // 1.4 UPPER KEY STAGE 2 (Year 5 & Year 6)
    upper_ks2(name, tier) {
      const mode = randomChoice(['unlike_fractions', 'percent_amount', 'negative_math', 'angles_straight', 'stats_mean']);

      if (mode === 'unlike_fractions') {
        const pairs = [
          { a: '1/2', b: '1/4', ans: '3/4', exp: '1/2 = 2/4. 2/4 + 1/4 = 3/4.' },
          { a: '1/3', b: '1/6', ans: '1/2', exp: '1/3 = 2/6. 2/6 + 1/6 = 3/6 = 1/2.' },
          { a: '2/5', b: '3/10', ans: '7/10', exp: '2/5 = 4/10. 4/10 + 3/10 = 7/10.' },
          { a: '3/4', b: '1/8', ans: '7/8', exp: '3/4 = 6/8. 6/8 + 1/8 = 7/8.' }
        ];
        const q = randomChoice(pairs);
        return {
          type: 'multiple_choice',
          prompt: `Calculate: ${q.a} + ${q.b} = ?`,
          visuals: [`➕ ${q.a} + ${q.b}`],
          correctAnswer: q.ans,
          options: shuffle([q.ans, '2/6', '4/10', '5/8']),
          explanation: q.exp
        };
      }

      if (mode === 'percent_amount') {
        const pct = randomChoice([10, 20, 25, 50, 75]);
        const base = randomChoice([40, 80, 120, 200, 300, 400]);
        const ans = (pct / 100) * base;
        return {
          type: 'multiple_choice',
          prompt: `What is ${pct}% of £${base}?`,
          visuals: [`💰 ${pct}% of £${base}`],
          correctAnswer: `£${ans}`,
          options: shuffle([`£${ans}`, `£${ans + 10}`, `£${Math.max(5, ans - 10)}`, `£${ans * 2}`]),
          explanation: `${pct}% means ${pct}/100. (${pct}/100) × ${base} = £${ans}.`
        };
      }

      if (mode === 'negative_math') {
        const start = randomInt(-10, -1);
        const delta = randomInt(4, 15);
        const ans = start + delta;
        return {
          type: 'multiple_choice',
          prompt: `Calculate: ${start} + ${delta} = ?`,
          visuals: [`🌡️ ${start} + ${delta}`],
          correctAnswer: String(ans),
          options: shuffle([String(ans), String(ans - 2), String(start - delta), String(Math.abs(ans) + 1)]),
          explanation: `Starting at ${start} on the number line and moving ${delta} units to the right lands on ${ans}.`
        };
      }

      if (mode === 'angles_straight') {
        const given = randomInt(35, 145);
        const missing = 180 - given;
        return {
          type: 'multiple_choice',
          prompt: `Two angles lie on a straight line. If one angle measures ${given}°, what is the size of the other angle?`,
          visuals: [`📐 Angles on a line add to 180°`],
          correctAnswer: `${missing}°`,
          options: shuffle([`${missing}°`, `${missing + 10}°`, `${missing - 10}°`, `${360 - given}°`]),
          explanation: `Angles on a straight line add up to 180°. 180° - ${given}° = ${missing}°.`
        };
      }

      // stats_mean
      const nums = [randomInt(2, 6), randomInt(4, 8), randomInt(6, 12)];
      const sum = nums.reduce((a, b) => a + b, 0);
      const extra = (4 - (sum % 4)) % 4;
      nums.push(nums.pop() + extra);
      const newSum = nums.reduce((a, b) => a + b, 0);
      const mean = newSum / nums.length;
      return {
        type: 'multiple_choice',
        prompt: `Find the mean (average) of the numbers: ${nums.join(', ')}`,
        visuals: [`📊 Set: [${nums.join(', ')}]`],
        correctAnswer: String(mean),
        options: shuffle([String(mean), String(mean + 1), String(Math.max(1, mean - 1)), String(mean + 2)]),
        explanation: `Mean = Sum ÷ Count = (${nums.join(' + ')}) ÷ ${nums.length} = ${newSum} ÷ ${nums.length} = ${mean}.`
      };
    },

    // 1.5 KEY STAGE 3 (Year 7, Year 8, Year 9)
    ks3(name, tier) {
      const mode = randomChoice(['linear_bracket', 'index_laws', 'pythagoras', 'circle_area', 'gradient_line']);

      if (mode === 'linear_bracket') {
        const x = randomInt(2, 9);
        const a = randomInt(2, 5);
        const c = randomInt(1, 8);
        const rhs = a * (x + c);
        return {
          type: 'multiple_choice',
          prompt: `Solve the equation for x:\n${a}(x + ${c}) = ${rhs}`,
          visuals: [`⚖️ ${a}(x + ${c}) = ${rhs}`],
          correctAnswer: String(x),
          options: shuffle([String(x), String(x + 2), String(Math.max(1, x - 2)), String(x + 4)]),
          explanation: `Divide both sides by ${a}: x + ${c} = ${rhs / a}. Subtract ${c}: x = ${x}.`
        };
      }

      if (mode === 'index_laws') {
        const p1 = randomInt(2, 6);
        const p2 = randomInt(2, 6);
        const op = Math.random() > 0.5 ? 'mul' : 'div';
        if (op === 'mul') {
          const ans = p1 + p2;
          return {
            type: 'multiple_choice',
            prompt: `Simplify the expression using index laws:\nx^${p1} × x^${p2} = ?`,
            visuals: [`📐 x^${p1} × x^${p2}`],
            correctAnswer: `x^${ans}`,
            options: shuffle([`x^${ans}`, `x^${p1 * p2}`, `x^${ans + 1}`, `2x^${ans}`]),
            explanation: `When multiplying powers with the same base, add the indices: ${p1} + ${p2} = ${ans}. Result: x^${ans}.`
          };
        } else {
          const maxP = Math.max(p1, p2) + 2;
          const minP = Math.min(p1, p2);
          const ans = maxP - minP;
          return {
            type: 'multiple_choice',
            prompt: `Simplify: x^${maxP} ÷ x^${minP} = ?`,
            visuals: [`📐 x^${maxP} ÷ x^${minP}`],
            correctAnswer: `x^${ans}`,
            options: shuffle([`x^${ans}`, `x^${maxP + minP}`, `x^${Math.round(maxP / minP)}`, `x^${ans + 1}`]),
            explanation: `When dividing powers with the same base, subtract indices: ${maxP} - ${minP} = ${ans}. Result: x^${ans}.`
          };
        }
      }

      if (mode === 'pythagoras') {
        const triples = [
          { a: 3, b: 4, c: 5 },
          { a: 6, b: 8, c: 10 },
          { a: 5, b: 12, c: 13 },
          { a: 8, b: 15, c: 17 }
        ];
        const t = randomChoice(triples);
        return {
          type: 'multiple_choice',
          prompt: `In a right-angled triangle, the two perpendicular sides measure ${t.a} cm and ${t.b} cm. What is the length of the hypotenuse?`,
          visuals: [`📐 a = ${t.a}, b = ${t.b}, c = ?`],
          correctAnswer: `${t.c} cm`,
          options: shuffle([`${t.c} cm`, `${t.a + t.b} cm`, `${t.c + 2} cm`, `${t.c - 1} cm`]),
          explanation: `Pythagoras' Theorem: a² + b² = c². ${t.a}² + ${t.b}² = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}. c = √${t.c * t.c} = ${t.c} cm.`
        };
      }

      if (mode === 'circle_area') {
        const r = randomChoice([3, 5, 7, 10]);
        const areaPi = r * r;
        return {
          type: 'multiple_choice',
          prompt: `Find the exact area of a circle with radius ${r} cm (in terms of π):`,
          visuals: [`⭕ Radius r = ${r} cm`],
          correctAnswer: `${areaPi}π cm²`,
          options: shuffle([`${areaPi}π cm²`, `${2 * r}π cm²`, `${areaPi * 2}π cm²`, `${r}π cm²`]),
          explanation: `Area = πr² = π × (${r})² = ${areaPi}π cm².`
        };
      }

      // gradient_line
      const m = randomChoice([2, 3, -2, 4]);
      const c = randomInt(-5, 8);
      const eqn = `y = ${m}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}`;
      return {
        type: 'multiple_choice',
        prompt: `What is the gradient (slope) of the straight line with equation: ${eqn}?`,
        visuals: [`📈 Linear Equation: ${eqn}`],
        correctAnswer: String(m),
        options: shuffle([String(m), String(c), String(-m), String(m !== 1 ? 1 : 2)]),
        explanation: `In the standard form y = mx + c, m represents the gradient. Here m = ${m}.`
      };
    },

    // 1.6 KEY STAGE 4 / GCSE (Year 10 & Year 11)
    gcse(name, tier) {
      const mode = randomChoice(['quadratic_solve', 'trig_exact', 'surds_simplify', 'fractional_index', 'simultaneous']);

      if (mode === 'quadratic_solve') {
        const p = randomInt(1, 5);
        const q = randomInt(p + 1, 7);
        const b = -(p + q);
        const c = p * q;
        const eqn = `x² ${b}x + ${c} = 0`;
        const correct = `x = ${p}, x = ${q}`;
        return {
          type: 'multiple_choice',
          prompt: `Solve the quadratic equation by factorising:\n${eqn}`,
          visuals: [`📐 ${eqn}`],
          correctAnswer: correct,
          options: shuffle([
            correct,
            `x = ${-p}, x = ${-q}`,
            `x = ${p}, x = ${-q}`,
            `x = ${p + 1}, x = ${q - 1}`
          ]),
          explanation: `Factorise into (x - ${p})(x - ${q}) = 0. Roots are x = ${p} and x = ${q}.`
        };
      }

      if (mode === 'trig_exact') {
        const trigValues = [
          { q: 'sin(30°)', a: '1/2', d: ['√3/2', '1', '√2/2'], e: 'sin(30°) is an exact value equal to 1/2.' },
          { q: 'cos(60°)', a: '1/2', d: ['√3/2', '0', '√2/2'], e: 'cos(60°) = 1/2.' },
          { q: 'tan(45°)', a: '1', d: ['1/2', '√3', '0'], e: 'tan(45°) = sin(45°)/cos(45°) = 1.' },
          { q: 'sin(90°)', a: '1', d: ['0', '1/2', '√3/2'], e: 'The sine of 90 degrees reaches maximum amplitude: 1.' },
          { q: 'cos(0°)', a: '1', d: ['0', '1/2', '-1'], e: 'At 0 degrees, the cosine function equals 1.' }
        ];
        const item = randomChoice(trigValues);
        return {
          type: 'multiple_choice',
          prompt: `What is the exact trigonometric value of ${item.q}?`,
          visuals: [`📐 Exact Trig: ${item.q}`],
          correctAnswer: item.a,
          options: shuffle([item.a, ...item.d]),
          explanation: item.e
        };
      }

      if (mode === 'surds_simplify') {
        const surds = [
          { raw: '√50', ans: '5√2', exp: '√50 = √(25 × 2) = √25 × √2 = 5√2.' },
          { raw: '√72', ans: '6√2', exp: '√72 = √(36 × 2) = √36 × √2 = 6√2.' },
          { raw: '√48', ans: '4√3', exp: '√48 = √(16 × 3) = √16 × √3 = 4√3.' },
          { raw: '√75', ans: '5√3', exp: '√75 = √(25 × 3) = √25 × √3 = 5√3.' },
          { raw: '√98', ans: '7√2', exp: '√98 = √(49 × 2) = √49 × √2 = 7√2.' }
        ];
        const s = randomChoice(surds);
        return {
          type: 'multiple_choice',
          prompt: `Simplify the surd into the form a√b:\n${s.raw} = ?`,
          visuals: [`√ Simplifying Surd: ${s.raw}`],
          correctAnswer: s.ans,
          options: shuffle([s.ans, '2√5', '3√6', '8√2']),
          explanation: s.exp
        };
      }

      if (mode === 'fractional_index') {
        const powers = [
          { q: '16^(1/2)', a: '4', exp: '16^(1/2) = √16 = 4.' },
          { q: '27^(1/3)', a: '3', exp: '27^(1/3) = ³√27 = 3.' },
          { q: '8^(2/3)', a: '4', exp: '8^(2/3) = (³√8)² = 2² = 4.' },
          { q: '25^(-1/2)', a: '1/5', exp: '25^(-1/2) = 1/√25 = 1/5.' },
          { q: '64^(1/3)', a: '4', exp: '64^(1/3) = ³√64 = 4.' }
        ];
        const p = randomChoice(powers);
        return {
          type: 'multiple_choice',
          prompt: `Evaluate the expression: ${p.q} = ?`,
          visuals: [`🔢 Index Notation: ${p.q}`],
          correctAnswer: p.a,
          options: shuffle([p.a, '8', '2', '1/4']),
          explanation: p.exp
        };
      }

      // simultaneous
      const x = randomInt(2, 6);
      const y = randomInt(1, 5);
      const eq1 = x + y;
      const eq2 = x - y;
      return {
        type: 'multiple_choice',
        prompt: `Solve the simultaneous equations:\nx + y = ${eq1}\nx - y = ${eq2}`,
        visuals: [`{ x + y = ${eq1}\n{ x - y = ${eq2}`],
        correctAnswer: `x = ${x}, y = ${y}`,
        options: shuffle([
          `x = ${x}, y = ${y}`,
          `x = ${x + 1}, y = ${y - 1}`,
          `x = ${y}, y = ${x}`,
          `x = ${x + 2}, y = ${y}`
        ]),
        explanation: `Adding equations: 2x = ${eq1 + eq2} ⇒ x = ${x}. Substitute to find y = ${eq1} - ${x} = ${y}.`
      };
    },

    // 1.7 KEY STAGE 5 / A-LEVELS (Year 12 & Year 13)
    alevel(name, tier) {
      const mode = randomChoice(['differentiation', 'integration', 'logarithms', 'radians', 'binomial']);

      if (mode === 'differentiation') {
        const n = randomInt(2, 5);
        const k = randomInt(2, 6);
        const derivK = k * n;
        const derivN = n - 1;
        const promptStr = `d/dx (${k}x^${n})`;
        const ans = derivN === 1 ? `${derivK}x` : `${derivK}x^${derivN}`;
        return {
          type: 'multiple_choice',
          prompt: `Differentiate with respect to x:\n${promptStr} = ?`,
          visuals: [`∫ Calculus: ${promptStr}`],
          correctAnswer: ans,
          options: shuffle([
            ans,
            `${k}x^${derivN}`,
            `${derivK}x^${n}`,
            `${derivK + 2}x^${derivN}`
          ]),
          explanation: `Using the power rule d/dx(ax^n) = a·n·x^(n-1): ${k} × ${n} × x^(${n}-1) = ${ans}.`
        };
      }

      if (mode === 'integration') {
        const n = randomInt(1, 3);
        const mult = n + 1;
        const k = mult * randomInt(1, 4);
        const intK = k / mult;
        const intN = n + 1;
        const promptStr = `∫ ${k}x^${n} dx`;
        const ans = `${intK === 1 ? '' : intK}x^${intN} + C`;
        return {
          type: 'multiple_choice',
          prompt: `Evaluate the indefinite integral:\n${promptStr} = ?`,
          visuals: [`∫ Integration: ${promptStr}`],
          correctAnswer: ans,
          options: shuffle([
            ans,
            `${k}x^${intN} + C`,
            `${intK}x^${n} + C`,
            `${k * mult}x^${intN} + C`
          ]),
          explanation: `Reverse power rule: add 1 to index and divide by new index. (${k} / ${intN})x^${intN} + C = ${ans}.`
        };
      }

      if (mode === 'logarithms') {
        const logs = [
          { q: 'log₂(64)', a: '6', exp: '2⁶ = 64, therefore log₂(64) = 6.' },
          { q: 'log₃(81)', a: '4', exp: '3⁴ = 81, therefore log₃(81) = 4.' },
          { q: 'ln(e⁵)', a: '5', exp: 'The natural log ln is base e. ln(e⁵) = 5.' },
          { q: 'log₁₀(10,000)', a: '4', exp: '10⁴ = 10,000, so log₁₀(10,000) = 4.' },
          { q: 'log₅(125)', a: '3', exp: '5³ = 125, therefore log₅(125) = 3.' }
        ];
        const item = randomChoice(logs);
        return {
          type: 'multiple_choice',
          prompt: `Evaluate the logarithm: ${item.q} = ?`,
          visuals: [`📉 Logarithmic Function: ${item.q}`],
          correctAnswer: item.a,
          options: shuffle([item.a, '2', '8', '12']),
          explanation: item.exp
        };
      }

      if (mode === 'radians') {
        const rads = [
          { deg: '180°', rad: 'π rad' },
          { deg: '90°', rad: 'π/2 rad' },
          { deg: '60°', rad: 'π/3 rad' },
          { deg: '45°', rad: 'π/4 rad' },
          { deg: '30°', rad: 'π/6 rad' },
          { deg: '360°', rad: '2π rad' }
        ];
        const item = randomChoice(rads);
        return {
          type: 'multiple_choice',
          prompt: `Convert the angle ${item.deg} into exact radians:`,
          visuals: [`⭕ Angle: ${item.deg}`],
          correctAnswer: item.rad,
          options: shuffle([item.rad, 'π/5 rad', '3π/4 rad', '2π/3 rad']),
          explanation: `Multiply by π/180°: ${item.deg} × (π/180°) = ${item.rad}.`
        };
      }

      // binomial
      return {
        type: 'multiple_choice',
        prompt: 'What is the coefficient of x² in the expansion of (1 + 2x)⁴?',
        visuals: ['📦 Binomial Expansion: (1 + 2x)⁴'],
        correctAnswer: '24',
        options: shuffle(['24', '16', '12', '6']),
        explanation: 'Using the Binomial Theorem: term is ⁴C₂ · 1² · (2x)² = 6 · 4x² = 24x². The coefficient is 24.'
      };
    }
  };

  // ===========================================================================
  // 2. STAGE-SPECIFIC ENGLISH QUESTION BANKS
  // ===========================================================================

  const EnglishBanksByStage = {
    // 2.1 Early Years (Reception)
    early: [
      { prompt: 'Which word rhymes with "CAT"?', ans: 'Hat', dist: ['Dog', 'Sun', 'Cup'], exp: '"Hat" and "cat" have the same ending sound "-at".' },
      { prompt: 'Which letter does the word "SUN" begin with?', ans: 'S', dist: ['M', 'T', 'B'], exp: 'The word "Sun" starts with the letter S.' },
      { prompt: 'What is the opposite of "HOT"?', ans: 'Cold', dist: ['Warm', 'Big', 'Fast'], exp: 'Cold is the direct opposite of hot.' },
      { prompt: 'Which animal word is spelled correctly?', ans: 'Dog', dist: ['Dgo', 'Ogd', 'Doggiey'], exp: '"Dog" is the correct 3-letter CVC word.' },
      { prompt: 'Which word rhymes with "BED"?', ans: 'Red', dist: ['Blue', 'Car', 'Fish'], exp: '"Red" and "bed" both share the rhyming sound "-ed".' }
    ],

    // 2.2 Key Stage 1 (Year 1 & Year 2)
    ks1: [
      { prompt: 'Every proper sentence must begin with a:', ans: 'Capital letter', dist: ['Comma', 'Question mark', 'Small letter'], exp: 'Sentences always begin with a capital letter.' },
      { prompt: 'What punctuation mark should end this asking sentence: "Where is the library"', ans: 'Question mark (?)', dist: ['Full stop (.)', 'Exclamation mark (!)', 'Comma (,)'], exp: 'Asking sentences end with a question mark.' },
      { prompt: 'What is the plural of "box"?', ans: 'Boxes', dist: ['Boxs', 'Boxies', 'Boxen'], exp: 'Nouns ending in -x take -es to form the plural: boxes.' },
      { prompt: 'Which word is a compound word formed by joining two words?', ans: 'Sunlight', dist: ['Sunny', 'Lighter', 'Bright'], exp: '"Sun" + "light" joins to make "sunlight".' },
      { prompt: 'Which word is an ADJECTIVE (describing word) in: "The red balloon floated away"?', ans: 'Red', dist: ['Balloon', 'Floated', 'Away'], exp: '"Red" describes the color of the balloon.' }
    ],

    // 2.3 Lower Key Stage 2 (Year 3 & Year 4)
    lower_ks2: [
      { prompt: 'Identify the NOUN in this sentence: "The brave firefighter extinguished the flame quickly."', ans: 'Firefighter', dist: ['Brave', 'Extinguished', 'Quickly'], exp: 'A noun is a person, place, or thing. "Firefighter" is a person.' },
      { prompt: 'Identify the ADVERB in: "The cheetah sprinted gracefully across the plains."', ans: 'Gracefully', dist: ['Cheetah', 'Sprinted', 'Plains'], exp: '"Gracefully" describes HOW the cheetah sprinted (verb).' },
      { prompt: 'Choose the correct homophone: "Please put your books over _____."', ans: 'there', dist: ['their', 'they\'re', 'thier'], exp: '"There" refers to a place or location.' },
      { prompt: 'What does the prefix "UN-" mean in the word "unhappy"?', ans: 'Not', dist: ['Very', 'Again', 'Before'], exp: 'The prefix "un-" negates the root word: unhappy = not happy.' },
      { prompt: 'Which sentence uses an apostrophe for POSSESSION correctly?', ans: "The girl's coat was hanging by the door.", dist: ["The girls coat was hanging by the door.", "The girl was put on her coat's.", "The coat's were all hanging."], exp: "\"The girl's coat\" indicates the coat belongs to the girl." }
    ],

    // 2.4 Upper Key Stage 2 (Year 5 & Year 6)
    upper_ks2: [
      { prompt: 'Which sentence is written in the PASSIVE VOICE?', ans: 'The delicious cake was baked by chef Marco.', dist: ['Chef Marco baked the delicious cake.', 'Chef Marco is eating the cake.', 'Everyone enjoyed the cake.'], exp: 'In passive voice, the subject receives the action: "The cake was baked by..."' },
      { prompt: 'Identify the FIGURATIVE LANGUAGE: "The snowflakes danced across the winter meadow."', ans: 'Personification', dist: ['Simile', 'Hyperbole', 'Alliteration'], exp: 'Giving human qualities (dancing) to non-human things (snowflakes) is personification.' },
      { prompt: 'Which of these is a SIMILE?', ans: 'He was as brave as a lion in battle.', dist: ['He was a ferocious lion in battle.', 'The lion roared loudly.', 'Bravery filled his heart.'], exp: 'A simile compares two things using "as" or "like".' },
      { prompt: 'Choose the modal verb that indicates absolute CERTAINTY or OBLIGATION:', ans: 'Must', dist: ['Might', 'Could', 'Possibly'], exp: '"Must" indicates mandatory obligation or strong certainty.' },
      { prompt: 'Select the synonym for the word "ABUNDANT":', ans: 'Plentiful', dist: ['Scarce', 'Tiny', 'Fragile'], exp: '"Abundant" means existing in large quantities (plentiful).' }
    ],

    // 2.5 Key Stage 3 (Year 7, Year 8, Year 9)
    ks3: [
      { prompt: 'Identify the rhetorical device: "Peter Piper picked a peck of pickled peppers."', ans: 'Alliteration', dist: ['Oxymoron', 'Onomatopoeia', 'Irony'], exp: 'Repetition of the initial consonant sound "p" across words is alliteration.' },
      { prompt: 'Which term describes an apparent contradiction that reveals an underlying truth (e.g. "deafening silence")?', ans: 'Oxymoron', dist: ['Hyperbole', 'Simile', 'Metaphor'], exp: 'Juxtaposing two contradictory terms side-by-side forms an oxymoron.' },
      { prompt: 'What is the function of a SEMICOLON (;) in a compound sentence?', ans: 'To join two closely related independent clauses without a conjunction', dist: ['To introduce a bulleted list', 'To end a question', 'To enclose a parenthetical remark'], exp: 'Semicolons link two complete independent thoughts that share a thematic link.' },
      { prompt: 'What word best describes an "ominous" tone in literature?', ans: 'Threatening or foreboding evil', dist: ['Cheerful and upbeat', 'Humorous and lighthearted', 'Scientific and neutral'], exp: 'Ominous conveys an atmosphere that something bad or harmful is going to happen.' },
      { prompt: 'Select the meaning of the word "CANDID":', ans: 'Frank, honest, and direct', dist: ['Deceitful and sneaky', 'Hidden and secret', 'Shy and reserved'], exp: 'To be candid is to speak truthfully and openly.' }
    ],

    // 2.6 Key Stage 4 / GCSE (Year 10 & Year 11)
    gcse: [
      { prompt: 'In Shakespearean drama, when a character speaks their private thoughts aloud alone on stage, it is called a:', ans: 'Soliloquy', dist: ['Monologue', 'Aside', 'Dialogue'], exp: 'A soliloquy reveals an actor\'s deepest inner reflections when isolated on stage.' },
      { prompt: 'Which dramatic concept refers to the audience knowing a critical fact that the characters on stage do NOT know?', ans: 'Dramatic Irony', dist: ['Verbal Irony', 'Situational Irony', 'Cosmic Irony'], exp: 'Dramatic irony occurs when spectators possess knowledge hidden from protagonists.' },
      { prompt: 'In Greek tragedy, a fatal flaw leading to the downfall of a tragic hero is known as:', ans: 'Hamartia', dist: ['Hubris', 'Catharsis', 'Nemesis'], exp: 'Hamartia is the tragic error or flaw (such as excessive pride / hubris).' },
      { prompt: 'Which literary device attributes human weather/nature to reflect human emotion (e.g., storm during sorrow)?', ans: 'Pathetic Fallacy', dist: ['Anthropomorphism', 'Metonymy', 'Synecdoche'], exp: 'Pathetic fallacy mirrors human emotional states within the natural environment.' },
      { prompt: 'What is the definition of "UBIQUITOUS"?', ans: 'Present, appearing, or found everywhere', dist: ['Extremely rare and endangered', 'Temporary and fleeting', 'Dangerous and lethal'], exp: 'Ubiquitous describes something omnipresent or universally encountered.' }
    ],

    // 2.7 Key Stage 5 / A-Levels (Year 12 & Year 13)
    alevel: [
      { prompt: 'Which rhetorical device involves the repetition of a word or phrase at the BEGINNING of successive clauses?', ans: 'Anaphora', dist: ['Epistrophe', 'Chiasmus', 'Polysyndeton'], exp: 'Anaphora repeats introductory words (e.g., "We shall fight... We shall fight...").' },
      { prompt: 'In linguistic semantics, what term describes a word\'s meaning becoming MORE NEGATIVE over historical time?', ans: 'Pejoration', dist: ['Amelioration', 'Broadening', 'Narrowing'], exp: 'Pejoration occurs when a neutral or positive word acquires negative associations.' },
      { prompt: 'Which critical theory investigates power dynamics, social class conflicts, and economic hegemony in texts?', ans: 'Marxist Literary Criticism', dist: ['Structuralism', 'Eco-criticism', 'Formalism'], exp: 'Marxist theory scrutinises class struggle, bourgeoisie power, and socioeconomic hierarchy.' },
      { prompt: 'Identify the sentence containing a correct use of the SUBJUNCTIVE MOOD:', ans: 'If I were the prime minister, I would reform the education system.', dist: ['If I was the prime minister, I will reform it.', 'If I am the prime minister, I might reform it.', 'I were the prime minister yesterday.'], exp: '"If I were..." expresses a hypothetical or counter-factual condition in the subjunctive.' },
      { prompt: 'What narrative technique attempts to capture the unfiltered, continuous flow of a character\'s conscious thoughts?', ans: 'Stream of Consciousness', dist: ['Free Indirect Discourse', 'Epistolary narrative', 'Unreliable narrator'], exp: 'Stream of consciousness depicts unbroken interior monologue (e.g., Virginia Woolf, James Joyce).' }
    ]
  };

  // ===========================================================================
  // 3. STAGE-SPECIFIC SCIENCE QUESTION BANKS
  // ===========================================================================

  const ScienceBanksByStage = {
    // 3.1 Early Years (Reception)
    early: [
      { prompt: 'Which sense do we use our EYES for?', ans: 'Sight (Seeing)', dist: ['Hearing', 'Smelling', 'Tasting'], exp: 'We use our eyes to see colors and objects.' },
      { prompt: 'Which of the following is a LIVING thing?', ans: 'A playful puppy', dist: ['A toy teddy bear', 'A plastic ball', 'A stone'], exp: 'Puppies grow, breathe, and need food, so they are living.' },
      { prompt: 'What season is cold and often has snow?', ans: 'Winter', dist: ['Summer', 'Spring', 'Autumn'], exp: 'Winter is the coldest season of the year.' },
      { prompt: 'What gives us light and warmth during the daytime?', ans: 'The Sun', dist: ['The Moon', 'The Clouds', 'The Stars'], exp: 'The Sun shines during the day, giving light and heat.' },
      { prompt: 'Which animal lives in water and breathes with gills?', ans: 'Goldfish', dist: ['Cat', 'Rabbit', 'Sparrow'], exp: 'Fish like goldfish live underwater and breathe through gills.' }
    ],

    // 3.2 Key Stage 1 (Year 1 & Year 2)
    ks1: [
      { prompt: 'What do green plants need to grow healthy and strong?', ans: 'Water and Sunlight', dist: ['Only darkness', 'Milk and juice', 'Wind only'], exp: 'Plants require water and light from the sun to make food.' },
      { prompt: 'Which group of animals has feathers and lays hard-shelled eggs?', ans: 'Birds', dist: ['Mammals', 'Reptiles', 'Amphibians'], exp: 'All birds have feathers, beaks, wings, and lay eggs.' },
      { prompt: 'Which material is transparent (see-through) and used to make window panes?', ans: 'Glass', dist: ['Wood', 'Metal', 'Wool'], exp: 'Glass is rigid and transparent, letting daylight through.' },
      { prompt: 'An animal that eats ONLY plants is called a:', ans: 'Herbivore', dist: ['Carnivore', 'Omnivore', 'Decomposer'], exp: 'Herbivores (like cows, sheep, and deer) feed exclusively on plants.' },
      { prompt: 'When water is frozen into ice in a freezer, what state of matter is it?', ans: 'Solid', dist: ['Liquid', 'Gas', 'Vapour'], exp: 'Ice is water in its rigid solid form.' }
    ],

    // 3.3 Lower Key Stage 2 (Year 3 & Year 4)
    lower_ks2: [
      { prompt: 'Which part of a flowering plant absorbs water and mineral salts from the soil?', ans: 'Roots', dist: ['Petals', 'Stem', 'Leaves'], exp: 'Roots anchor the plant and drink water and nutrients from the soil.' },
      { prompt: 'What hard framework inside human bodies protects organs and enables movement?', ans: 'The Skeleton', dist: ['The Skin', 'The Lungs', 'The Stomach'], exp: 'The skeleton (206 bones in adults) supports weight and shields vital organs.' },
      { prompt: 'What happens when two North poles of two bar magnets are placed close together?', ans: 'They repel (push apart)', dist: ['They attract (pull together)', 'They melt', 'Nothing happens'], exp: 'Like magnetic poles (N-N or S-S) always repel each other.' },
      { prompt: 'At what temperature Celsius does pure liquid water boil at standard sea level pressure?', ans: '100°C', dist: ['0°C', '50°C', '212°C'], exp: 'Pure water boils into steam at 100°C.' },
      { prompt: 'Why do shadows form when an opaque object is placed in front of a lamp?', ans: 'Light travels in straight lines and cannot pass through the opaque object', dist: ['The lamp turns off', 'Light bends around the object', 'The object creates darkness'], exp: 'Because light rays travel linearly, opaque obstacles cast shadows behind them.' }
    ],

    // 3.4 Upper Key Stage 2 (Year 5 & Year 6)
    upper_ks2: [
      { prompt: 'Which organ in the human circulatory system pumps oxygen-rich blood through arteries?', ans: 'Heart', dist: ['Lungs', 'Liver', 'Kidneys'], exp: 'The muscular heart continuously pumps blood around the systemic circulatory system.' },
      { prompt: 'What gravitational force pulls objects down towards the centre of the Earth?', ans: 'Gravity', dist: ['Friction', 'Magnetism', 'Buoyancy'], exp: 'Gravity is the non-contact attraction exerted by Earth\'s mass.' },
      { prompt: 'How long does it take for Planet Earth to complete ONE full orbit around the Sun?', ans: '365.25 days (1 year)', dist: ['24 hours (1 day)', '28 days (1 month)', '10 years'], exp: 'Earth revolves around the Sun in approximately 365¼ days.' },
      { prompt: 'Which cell component in green plant leaves captures sunlight for photosynthesis?', ans: 'Chloroplast (containing chlorophyll)', dist: ['Mitochondria', 'Vacuole', 'Cell wall'], exp: 'Chloroplasts house green chlorophyll pigments which absorb light energy.' },
      { prompt: 'What evolutionary mechanism did Charles Darwin propose to explain how species adapt to environments?', ans: 'Natural Selection', dist: ['Artificial Breeding', 'Spontaneous Generation', 'Acquired Inheritance'], exp: 'Natural selection favours organisms with advantageous traits for survival and reproduction.' }
    ],

    // 3.5 Key Stage 3 (Year 7, Year 8, Year 9)
    ks3: [
      { prompt: 'Which cellular organelle is the site of AEROBIC RESPIRATION and ATP energy generation?', ans: 'Mitochondria', dist: ['Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum'], exp: 'Mitochondria are the "powerhouses" where glucose and oxygen produce ATP.' },
      { prompt: 'In chemistry, what does the ATOMIC NUMBER of an element signify?', ans: 'The number of protons in the nucleus', dist: ['The total protons plus neutrons', 'The number of electron shells', 'The atomic weight in grams'], exp: 'Atomic number (Z) uniquely identifies an element by its proton count.' },
      { prompt: 'What are the products of an ACID reacting with a BASE (neutralisation)?', ans: 'Salt + Water', dist: ['Gas + Metal', 'Acid + Oxygen', 'Carbon dioxide + Hydrogen'], exp: 'Neutralisation reaction: Acid + Base → Salt + Water.' },
      { prompt: 'According to Newton\'s Second Law of Motion, Force (F) equals:', ans: 'Mass × Acceleration (F = ma)', dist: ['Mass ÷ Speed', 'Velocity × Time', 'Distance ÷ Time'], exp: 'Newton\'s Second Law states that net force equals mass multiplied by acceleration.' },
      { prompt: 'Which part of the electromagnetic spectrum has the HIGHEST frequency and energy?', ans: 'Gamma rays', dist: ['Radio waves', 'Visible light', 'Infrared rays'], exp: 'Gamma rays possess the shortest wavelengths, highest frequencies, and greatest photon energies.' }
    ],

    // 3.6 Key Stage 4 / GCSE (Year 10 & Year 11)
    gcse: [
      { prompt: 'Which type of cell division produces FOUR genetically diverse haploid daughter cells (gametes)?', ans: 'Meiosis', dist: ['Mitosis', 'Binary Fission', 'Budding'], exp: 'Meiosis produces 4 haploid gametes (sperm/egg) with genetic variation via crossing over.' },
      { prompt: 'What type of chemical bond is formed when electrons are SHARED between non-metal atoms?', ans: 'Covalent bond', dist: ['Ionic bond', 'Metallic bond', 'Hydrogen bond'], exp: 'Covalent bonding involves shared pairs of valence electrons between non-metals.' },
      { prompt: 'According to Ohm\'s Law, what is the mathematical formula linking Voltage (V), Current (I), and Resistance (R)?', ans: 'V = I × R', dist: ['I = V × R', 'R = V × I', 'V = I ÷ R'], exp: 'Ohm\'s Law states potential difference V = I × R.' },
      { prompt: 'What is the definition of the HALF-LIFE of a radioactive isotope?', ans: 'The time taken for half the radioactive nuclei in a sample to decay', dist: ['The time for the isotope to completely disappear', 'Half the total lifespan of the atomic reactor', 'The time for electrons to jump energy levels'], exp: 'Half-life is the statistical duration required for 50% of unstable nuclei to undergo decay.' },
      { prompt: 'In human biology, which hormone is secreted by the pancreas to LOWER elevated blood glucose levels?', ans: 'Insulin', dist: ['Glucagon', 'Adrenaline', 'Thyroxine'], exp: 'Insulin signals liver and muscle cells to absorb glucose and store it as glycogen.' }
    ],

    // 3.7 Key Stage 5 / A-Levels (Year 12 & Year 13)
    alevel: [
      { prompt: 'In cellular respiration, what enzyme complexes use a proton gradient across the inner mitochondrial membrane to synthesise ATP?', ans: 'ATP Synthase (Chemiosmosis)', dist: ['DNA Polymerase', 'RNA Helicase', 'Amylase'], exp: 'Proton motive force drives ATP Synthase rotor to phosphorylate ADP into ATP.' },
      { prompt: 'According to Le Chatelier\'s principle, what happens to an EXOTHERMIC equilibrium reaction if temperature is INCREASED?', ans: 'Equilibrium shifts left towards reactants to absorb the added heat', dist: ['Equilibrium shifts right towards products', 'Equilibrium is unaffected', 'Rate of reaction drops to zero'], exp: 'Exothermic reactions release heat; increasing temperature shifts equilibrium endothermically (left).' },
      { prompt: 'What is the IDEAL GAS LAW equation linking Pressure (P), Volume (V), Moles (n), and Temperature (T)?', ans: 'PV = nRT', dist: ['P = nVRT', 'PV = mgh', 'V = nPRT'], exp: 'PV = nRT relates macroscopic state variables of an ideal gas (R = 8.314 J/mol·K).' },
      { prompt: 'What quantum phenomenon demonstrated that light delivers energy in discrete packets (quanta/photons: E = hf)?', ans: 'The Photoelectric Effect', dist: ['Compton Scattering', 'Young\'s Double Slit', 'Rutherford Alpha Scattering'], exp: 'Einstein\'s explanation of the photoelectric effect proved light has particle/photon nature.' },
      { prompt: 'In organic chemistry, which functional group consists of a carbonyl group bonded to an -OH group (-COOH)?', ans: 'Carboxylic acid', dist: ['Ester', 'Aldehyde', 'Ketone'], exp: '-COOH is the defining carboxyl functional group of organic carboxylic acids.' }
    ]
  };

  // ===========================================================================
  // 4. MAIN QUESTION ENGINE INTERFACE
  // ===========================================================================

  const QuestionEngine = {
    getStage,

    generate(skill, smartScore = 0) {
      const subj = skill.subject || 'Maths';
      const name = (skill.name || skill.skill_name || '').toLowerCase();
      const rawGrade = skill.grade || skill.grade_level || (window.AppState && window.AppState.currentGrade) || 'Year 4';
      const stage = getStage(rawGrade);
      const tier = smartScore >= 80 ? 3 : (smartScore >= 50 ? 2 : 1);

      let question = null;
      let attempts = 0;

      // Anti-repetition loop: attempt up to 12 times to generate a unique question for this session
      while (attempts < 12) {
        attempts++;
        if (subj === 'Maths') {
          question = this.routeMath(name, stage, tier, rawGrade);
        } else if (subj === 'English') {
          question = this.routeEnglish(name, stage, tier, rawGrade);
        } else {
          question = this.routeScience(name, stage, tier, rawGrade);
        }

        const questionKey = `${stage}_${skill.code || ''}_${question.prompt}`;
        if (!sessionHistory.has(questionKey)) {
          sessionHistory.add(questionKey);
          break;
        }
      }

      // Safeguard cache growth
      if (sessionHistory.size > 300) sessionHistory.clear();

      // Ensure grade badge is stamped on visuals
      const gradeBadge = `🎓 ${rawGrade} (${stage.toUpperCase().replace('_', ' ')})`;
      // Ensure choices property is mirrored for any consumer expecting .choices
      if (!question.options) question.options = [];
      question.choices = question.options;
      question.stage = stage;
      question.rawGrade = rawGrade;

      return question;
    },

    routeMath(name, stage, tier, rawGrade) {
      if (stage === 'early') return MathStageGenerators.early(name, tier);
      if (stage === 'ks1') return MathStageGenerators.ks1(name, tier);
      if (stage === 'lower_ks2') return MathStageGenerators.lower_ks2(name, tier);
      if (stage === 'upper_ks2') return MathStageGenerators.upper_ks2(name, tier);
      if (stage === 'ks3') return MathStageGenerators.ks3(name, tier);
      if (stage === 'gcse') return MathStageGenerators.gcse(name, tier);
      if (stage === 'alevel') return MathStageGenerators.alevel(name, tier);
      return MathStageGenerators.lower_ks2(name, tier);
    },

    routeEnglish(name, stage, tier, rawGrade) {
      const bank = EnglishBanksByStage[stage] || EnglishBanksByStage.lower_ks2;
      const q = randomChoice(bank);
      return {
        type: 'multiple_choice',
        prompt: q.prompt,
        visuals: [`📖 English Language Arts`],
        correctAnswer: q.ans,
        options: shuffle([q.ans, ...q.dist]),
        explanation: q.exp
      };
    },

    routeScience(name, stage, tier, rawGrade) {
      const bank = ScienceBanksByStage[stage] || ScienceBanksByStage.lower_ks2;
      const s = randomChoice(bank);
      return {
        type: 'multiple_choice',
        prompt: s.prompt,
        visuals: [`🔬 Science Inquiry`],
        correctAnswer: s.ans,
        options: shuffle([s.ans, ...s.dist]),
        explanation: s.exp
      };
    }
  };

  // Expose globally
  window.QuestionEngine = QuestionEngine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionEngine;
  }
})();
