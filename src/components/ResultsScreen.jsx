import { useEffect, useRef } from 'react'
import { TOTAL_QUESTIONS } from '../utils/questions'

function launchConfetti() {
  const colors = ['#FF6B35', '#FFD23F', '#06D6A0', '#118AB2', '#8338EC', '#FF006E']
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    el.style.left = `${Math.random() * 100}vw`
    el.style.top = '-20px'
    el.style.background = colors[Math.floor(Math.random() * colors.length)]
    el.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`
    el.style.animationDuration = `${2000 + Math.floor(Math.random() * 2000)}ms`
    el.style.animationDelay = `${Math.floor(Math.random() * 1000)}ms`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 5000)
  }
}

export default function ResultsScreen({ score, correctCount, wrongCount, bestStreak, onPlayAgain, onSettings }) {
  const launched = useRef(false)
  const pct = correctCount / TOTAL_QUESTIONS
  const stars = pct >= .9 ? '⭐⭐⭐' : pct >= .6 ? '⭐⭐' : '⭐'
  const trophy = pct >= .9 ? '🏆' : pct >= .6 ? '🥈' : '🎖️'
  const messages = {
    '🏆': ["Perfect! You're a math superstar! 🌟", "Amazing! You nailed it! 🎉", "Incredible! Math genius! 🧠"],
    '🥈': ["Great job! Keep practicing! 💪", "Well done! You're getting better! 📈", "Nice work! Almost perfect! 🎯"],
    '🎖️': ["Good effort! Try again! 🔄", "Keep going — practice makes perfect! 📚", "You can do it — try again! 🚀"],
  }
  const msg = messages[trophy][Math.floor(Math.random() * 3)]

  useEffect(() => {
    if (pct >= .9 && !launched.current) {
      launched.current = true
      launchConfetti()
    }
  }, [pct])

  return (
    <div className="screen">
      <div className="results-card">
        <div className="trophy">{trophy}</div>
        <div className="final-score">{score}</div>
        <div className="score-label">points</div>
        <div className="stars">{stars}</div>
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-val">{correctCount}</div>
            <div className="stat-lbl">Correct</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">{wrongCount}</div>
            <div className="stat-lbl">Missed</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">{bestStreak}</div>
            <div className="stat-lbl">Best Streak</div>
          </div>
        </div>
        <p style={{ color: '#666', fontSize: '1rem' }}>{msg}</p>
      </div>
      <div className="results-btns">
        <button className="outline-btn" onClick={onSettings}>⚙️ Settings</button>
        <button className="big-btn" style={{ flex: 1 }} onClick={onPlayAgain}>Play Again! 🎮</button>
      </div>
    </div>
  )
}
