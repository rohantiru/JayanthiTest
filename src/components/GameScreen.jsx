import { useReducer, useEffect, useRef, useState } from 'react'
import { TIMER_SECS, POINTS, TOTAL_QUESTIONS } from '../utils/questions'

const CIRC = 163

function init(difficulty) {
  return {
    qIndex: 0,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    bestStreak: 0,
    timeLeft: TIMER_SECS[difficulty],
    answered: false,
    feedback: null,
    choiceStates: {},
    inputStyle: '',
    showNext: false,
    streakBadge: null,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TICK':
      return { ...state, timeLeft: state.timeLeft - 1 }

    case 'TIME_UP':
      return {
        ...state,
        answered: true,
        streak: 0,
        wrongCount: state.wrongCount + 1,
        feedback: { correct: false, msg: `⏰ Time's up! The answer was ${action.answer}` },
        choiceStates: action.reveal ? { [String(action.answer)]: 'reveal' } : {},
        showNext: true,
      }

    case 'ANSWER_CORRECT': {
      const newStreak = state.streak + 1
      const newBest = Math.max(state.bestStreak, newStreak)
      let pts = POINTS.correct
      if (state.timeLeft > 0) pts += POINTS.timerBonus
      if (newStreak >= 5) pts += POINTS.streak5
      else if (newStreak >= 3) pts += POINTS.streak3
      const feedMsg = newStreak >= 5 ? `🔥 ${newStreak} in a row! +${pts} pts`
                    : newStreak >= 3 ? `⚡ Streak x${newStreak}! +${pts} pts`
                    : `✅ Correct! +${pts} pts`
      return {
        ...state,
        answered: true,
        streak: newStreak,
        bestStreak: newBest,
        score: state.score + pts,
        correctCount: state.correctCount + 1,
        feedback: { correct: true, msg: feedMsg },
        choiceStates: action.choiceStates || {},
        inputStyle: action.inputStyle || '',
        showNext: true,
        streakBadge: newStreak >= 3 ? `🔥 ${newStreak} in a row!` : state.streakBadge,
      }
    }

    case 'ANSWER_WRONG':
      return {
        ...state,
        answered: true,
        streak: 0,
        wrongCount: state.wrongCount + 1,
        feedback: { correct: false, msg: `❌ Oops! ${action.msg}` },
        choiceStates: action.choiceStates || {},
        inputStyle: action.inputStyle || '',
        showNext: true,
      }

    case 'NEXT_QUESTION':
      return {
        ...state,
        qIndex: state.qIndex + 1,
        timeLeft: TIMER_SECS[action.difficulty],
        answered: false,
        feedback: null,
        choiceStates: {},
        inputStyle: '',
        showNext: false,
        streakBadge: null,
      }

    case 'CLEAR_STREAK_BADGE':
      return { ...state, streakBadge: null }

    default:
      return state
  }
}

export default function GameScreen({ questions, difficulty, onGameEnd, onExit }) {
  const [state, dispatch] = useReducer(reducer, difficulty, init)
  const stateRef = useRef(state)
  stateRef.current = state

  const [inputValue, setInputValue] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  const q = questions[state.qIndex]
  const total = TIMER_SECS[difficulty]
  const timerFrac = state.timeLeft / total

  // Timer tick — a new timeout is scheduled after each decrement
  useEffect(() => {
    if (state.answered || state.timeLeft <= 0) return
    const id = setTimeout(() => {
      if (!stateRef.current.answered) dispatch({ type: 'TICK' })
    }, 1000)
    return () => clearTimeout(id)
  }, [state.timeLeft, state.answered, state.qIndex])

  // Time-up detection
  useEffect(() => {
    if (state.timeLeft === 0 && !state.answered) {
      dispatch({ type: 'TIME_UP', answer: q.answer, reveal: q.mode === 'mc' })
    }
  }, [state.timeLeft, state.answered])

  // Reset input when question changes
  useEffect(() => {
    setInputValue('')
    setShaking(false)
    if (q.mode === 'input' && inputRef.current) inputRef.current.focus()
  }, [state.qIndex])

  // Auto-hide streak badge
  useEffect(() => {
    if (!state.streakBadge) return
    const id = setTimeout(() => dispatch({ type: 'CLEAR_STREAK_BADGE' }), 1800)
    return () => clearTimeout(id)
  }, [state.streakBadge])

  function handleChoice(choice) {
    if (state.answered) return
    const correct = choice === String(q.answer)
    const choiceStates = correct
      ? { [choice]: 'correct' }
      : { [choice]: 'wrong', [String(q.answer)]: 'reveal' }
    dispatch(correct
      ? { type: 'ANSWER_CORRECT', choiceStates }
      : { type: 'ANSWER_WRONG', msg: `The answer is ${q.answer}`, choiceStates }
    )
  }

  function handleSubmit() {
    if (state.answered) return
    const val = parseInt(inputValue)
    if (isNaN(val)) {
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      return
    }
    const correct = val === q.answer
    dispatch(correct
      ? { type: 'ANSWER_CORRECT', inputStyle: 'correct' }
      : { type: 'ANSWER_WRONG', msg: `The answer was ${q.answer}`, inputStyle: 'wrong' }
    )
    if (!correct) {
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
    }
  }

  function handleNext() {
    if (state.qIndex + 1 >= TOTAL_QUESTIONS) {
      onGameEnd({
        score: state.score,
        correctCount: state.correctCount,
        wrongCount: state.wrongCount,
        bestStreak: state.bestStreak,
      })
      return
    }
    dispatch({ type: 'NEXT_QUESTION', difficulty })
  }

  const timerOffset = CIRC * (1 - timerFrac)
  const timerColor = timerFrac > .5 ? 'var(--green)' : timerFrac > .25 ? 'var(--yellow)' : 'var(--pink)'

  return (
    <div className="screen">
      <div className="hud">
        <button className="home-btn" onClick={onExit} title="Back to menu">🏠</button>
        <div className="hud-pill">⭐ {state.score}</div>
        <div className="timer-ring">
          <svg viewBox="0 0 60 60" width="60" height="60">
            <circle className="timer-track" cx="30" cy="30" r="26" />
            <circle
              className="timer-progress"
              cx="30" cy="30" r="26"
              style={{ strokeDashoffset: timerOffset, stroke: timerColor }}
            />
          </svg>
          <div className="timer-label">{state.timeLeft}</div>
        </div>
        <div className="hud-pill">Q {state.qIndex + 1}/{TOTAL_QUESTIONS}</div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(state.qIndex / TOTAL_QUESTIONS) * 100}%` }} />
      </div>

      <div key={state.qIndex} className="question-card pop">
        <div className="q-type-badge">{q.badge}</div>
        <div className="question-text">{q.text}</div>
        {q.hint && <div className="hint-text">{q.hint}</div>}
      </div>

      {q.mode === 'mc' ? (
        <div className="choices-grid">
          {q.choices.map(choice => (
            <button
              key={choice}
              className={`choice-btn ${state.choiceStates[choice] || ''}`}
              disabled={state.answered}
              onClick={() => handleChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <div className="input-row">
          <input
            ref={inputRef}
            className={`answer-input ${state.inputStyle} ${shaking ? 'shake' : ''}`}
            type="number"
            placeholder="?"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            autoComplete="off"
          />
          <button className="submit-btn" onClick={handleSubmit}>✓</button>
        </div>
      )}

      <div className={`feedback${state.feedback ? ` show ${state.feedback.correct ? 'correct' : 'wrong'}` : ''}`}>
        {state.feedback?.msg}
      </div>

      <button className={`next-btn${state.showNext ? ' show' : ''}`} onClick={handleNext}>
        Next Question →
      </button>

      <div className={`streak-badge${state.streakBadge ? ' show' : ''}`}>
        {state.streakBadge}
      </div>
    </div>
  )
}
