export const TOTAL_QUESTIONS = 10
export const TIMER_SECS = { easy: 30, medium: 20, hard: 12 }
export const POINTS = { correct: 10, streak3: 5, streak5: 10, timerBonus: 3 }

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function shuffle(arr) { return [...arr].sort(() => Math.random() - .5) }

function makeChoices(answer, min, range) {
  const set = new Set([answer])
  while (set.size < 4) {
    const off = rand(1, range) * (Math.random() < .5 ? 1 : -1)
    const c = answer + off
    if (c >= min) set.add(c)
  }
  return shuffle([...set]).map(String)
}

function makeArithmetic(diff) {
  const ops = diff === 'easy' ? ['+', '-'] : diff === 'medium' ? ['+', '-', '×'] : ['+', '-', '×', '÷']
  const op = ops[rand(0, ops.length - 1)]
  let a, b, answer

  if (op === '+') {
    a = diff === 'easy' ? rand(1, 20) : diff === 'medium' ? rand(10, 99) : rand(50, 999)
    b = diff === 'easy' ? rand(1, 20) : diff === 'medium' ? rand(10, 99) : rand(50, 999)
    answer = a + b
  } else if (op === '-') {
    b = diff === 'easy' ? rand(1, 20) : diff === 'medium' ? rand(5, 50) : rand(10, 200)
    a = b + (diff === 'easy' ? rand(0, 20) : diff === 'medium' ? rand(0, 50) : rand(0, 200))
    answer = a - b
  } else if (op === '×') {
    a = diff === 'medium' ? rand(2, 9) : rand(3, 15)
    b = diff === 'medium' ? rand(2, 9) : rand(3, 15)
    answer = a * b
  } else {
    a = diff === 'medium' ? rand(2, 9) : rand(2, 12)
    b = rand(2, diff === 'medium' ? 9 : 12)
    const dividend = a * b
    return {
      type: 'arithmetic', badge: 'Arithmetic',
      text: `${dividend} ÷ ${b} = ?`,
      answer: a, mode: 'mc',
      choices: makeChoices(a, 1, diff === 'easy' ? 5 : diff === 'medium' ? 10 : 20),
    }
  }

  return {
    type: 'arithmetic', badge: 'Arithmetic',
    text: `${a} ${op} ${b} = ?`,
    answer, mode: 'mc',
    choices: makeChoices(answer, 1, diff === 'easy' ? 5 : diff === 'medium' ? 15 : 30),
  }
}

function makePattern(diff) {
  const patterns = [
    () => {
      const step = diff === 'easy' ? rand(2, 5) : diff === 'medium' ? rand(3, 10) : rand(5, 20)
      const start = rand(1, diff === 'easy' ? 10 : 30)
      const seq = [start, start + step, start + 2 * step, start + 3 * step]
      return { seq, answer: start + 4 * step, hint: `Add ${step} each time` }
    },
    () => {
      const factor = diff === 'easy' ? 2 : diff === 'medium' ? rand(2, 3) : rand(2, 4)
      const start = rand(1, diff === 'easy' ? 5 : 10)
      const seq = [start, start * factor, start * factor ** 2, start * factor ** 3]
      return { seq, answer: start * factor ** 4, hint: `Multiply by ${factor} each time` }
    },
    () => {
      const a = rand(1, diff === 'easy' ? 3 : 8)
      const b = rand(1, diff === 'easy' ? 3 : 8)
      const seq = [a, b, a + b, a + 2 * b]
      return { seq, answer: 2 * a + 3 * b, hint: `Add the two previous numbers` }
    },
    () => {
      const start = rand(1, diff === 'easy' ? 3 : 5)
      const seq = [start ** 2, (start + 1) ** 2, (start + 2) ** 2, (start + 3) ** 2]
      return { seq, answer: (start + 4) ** 2, hint: `Perfect squares!` }
    },
  ]

  const { seq, answer, hint } = patterns[rand(0, patterns.length - 1)]()
  return {
    type: 'patterns', badge: 'Pattern',
    text: `${seq.join(', ')}, ?, ...`,
    hint: `Hint: ${hint}`,
    answer, mode: 'mc',
    choices: makeChoices(answer, 1, diff === 'easy' ? 5 : diff === 'medium' ? 15 : 40),
  }
}

function makeWordProblem(diff) {
  const problems = [
    () => {
      const a = rand(5, diff === 'easy' ? 15 : diff === 'medium' ? 30 : 80)
      const b = rand(2, diff === 'easy' ? 10 : diff === 'medium' ? 25 : 60)
      const give = rand(1, Math.min(a, b))
      return {
        text: `Sam had ${a} apples 🍎. Jordan gave Sam ${b} more, but then Sam gave away ${give}. How many apples does Sam have now?`,
        answer: a + b - give,
      }
    },
    () => {
      const bags = rand(2, diff === 'easy' ? 5 : 10)
      const perBag = rand(4, diff === 'easy' ? 8 : diff === 'medium' ? 15 : 30)
      return {
        text: `There are ${bags} bags of candy 🍬. Each bag has ${perBag} pieces. How many pieces total?`,
        answer: bags * perBag,
      }
    },
    () => {
      const kids = rand(2, diff === 'easy' ? 4 : 6)
      const slices = kids * rand(2, diff === 'easy' ? 3 : 5)
      return {
        text: `${slices} pizza slices 🍕 are shared equally among ${kids} kids. How many slices does each kid get?`,
        answer: slices / kids,
      }
    },
    () => {
      const price = rand(5, diff === 'easy' ? 20 : diff === 'medium' ? 50 : 100)
      const paid = price + rand(1, diff === 'easy' ? 10 : 30)
      return {
        text: `A toy costs $${price} 🧸. You pay with $${paid}. How much change do you get back?`,
        answer: paid - price,
      }
    },
    () => {
      const laps = rand(3, diff === 'easy' ? 6 : 10)
      const dist = rand(100, diff === 'easy' ? 400 : diff === 'medium' ? 800 : 2000)
      return {
        text: `A runner completes ${laps} laps 🏃. Each lap is ${dist} meters. How many meters total?`,
        answer: laps * dist,
      }
    },
    () => {
      const shelves = rand(3, diff === 'easy' ? 5 : 8)
      const perShelf = rand(6, diff === 'easy' ? 12 : diff === 'medium' ? 20 : 40)
      return {
        text: `A library has ${shelves} shelves 📚. Each shelf holds ${perShelf} books. How many books in total?`,
        answer: shelves * perShelf,
      }
    },
  ]

  const { text, answer } = problems[rand(0, problems.length - 1)]()
  return { type: 'wordproblems', badge: 'Word Problem', text, answer, mode: 'input' }
}

function makeComparison(diff) {
  const t = ['order', 'missing', 'greatest'][rand(0, 2)]

  if (t === 'missing') {
    const step = diff === 'easy' ? rand(2, 5) : diff === 'medium' ? rand(3, 15) : rand(5, 25)
    const start = rand(5, 50)
    const pos = rand(1, 3)
    const seq = [start, start + step, start + 2 * step, start + 3 * step]
    const answer = seq[pos]
    const display = seq.map((v, i) => (i === pos ? '?' : v))
    return {
      type: 'comparison', badge: 'Fill the Gap',
      text: display.join(' , '),
      hint: `What number belongs in the gap?`,
      answer, mode: 'mc',
      choices: makeChoices(answer, 1, diff === 'easy' ? 8 : 20),
    }
  }

  if (t === 'greatest') {
    const nums = Array.from({ length: 4 }, () => rand(10, diff === 'easy' ? 50 : diff === 'medium' ? 200 : 999))
    const answer = Math.max(...nums)
    return {
      type: 'comparison', badge: 'Compare',
      text: `Which is the BIGGEST?\n${nums.join('   ')}`,
      answer, mode: 'mc',
      choices: shuffle(nums).map(String),
    }
  }

  const nums = Array.from({ length: 4 }, () => rand(10, diff === 'easy' ? 50 : diff === 'medium' ? 200 : 999))
  const answer = Math.min(...nums)
  return {
    type: 'comparison', badge: 'Compare',
    text: `Which is the SMALLEST?\n${nums.join('   ')}`,
    answer, mode: 'mc',
    choices: shuffle(nums).map(String),
  }
}

export function generateQuestions(difficulty, enabledTypes) {
  const types = [...enabledTypes]
  if (!types.length) return []
  const qs = []
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const t = types[i % types.length]
    if (t === 'arithmetic') qs.push(makeArithmetic(difficulty))
    else if (t === 'patterns') qs.push(makePattern(difficulty))
    else if (t === 'wordproblems') qs.push(makeWordProblem(difficulty))
    else qs.push(makeComparison(difficulty))
  }
  return shuffle(qs)
}
