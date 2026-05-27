export default function StartScreen({ difficulty, enabledTypes, onDifficultyChange, onTypeToggle, onStart }) {
  const types = [
    { key: 'arithmetic',   emoji: '➕➖✖️➗', label: 'Arithmetic' },
    { key: 'patterns',     emoji: '🔢',      label: 'Number Patterns' },
    { key: 'wordproblems', emoji: '📖',      label: 'Word Problems' },
    { key: 'comparison',   emoji: '⚖️',      label: 'Compare & Order' },
  ]

  return (
    <div className="screen">
      <p className="section-title">Choose your level:</p>
      <div className="difficulty-grid">
        {[
          { key: 'easy',   emoji: '🌱', label: 'Easy' },
          { key: 'medium', emoji: '🔥', label: 'Medium' },
          { key: 'hard',   emoji: '🚀', label: 'Hard' },
        ].map(d => (
          <button
            key={d.key}
            className={`diff-btn${difficulty === d.key ? ' selected' : ''}`}
            data-diff={d.key}
            onClick={() => onDifficultyChange(d.key)}
          >
            <span className="emoji">{d.emoji}</span>
            {d.label}
          </button>
        ))}
      </div>

      <p className="section-title">Pick your puzzles:</p>
      <div className="type-grid">
        {types.map(t => (
          <button
            key={t.key}
            className={`type-btn${enabledTypes.has(t.key) ? ' selected' : ''}`}
            data-type={t.key}
            onClick={() => onTypeToggle(t.key)}
          >
            <span className="emoji">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      <button className="big-btn" onClick={onStart}>
        Let&apos;s Play! 🎮
      </button>
    </div>
  )
}
