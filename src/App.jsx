import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import ResultsScreen from './components/ResultsScreen'
import { generateQuestions } from './utils/questions'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [difficulty, setDifficulty] = useState('medium')
  const [enabledTypes, setEnabledTypes] = useState(new Set(['arithmetic', 'patterns', 'wordproblems', 'comparison']))
  const [gameKey, setGameKey] = useState(0)
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState(null)

  function startGame() {
    setQuestions(generateQuestions(difficulty, enabledTypes))
    setGameKey(k => k + 1)
    setScreen('game')
  }

  function handleGameEnd(finalResults) {
    setResults(finalResults)
    setScreen('results')
  }

  function toggleType(t) {
    setEnabledTypes(prev => {
      if (prev.has(t) && prev.size === 1) return prev
      const next = new Set(prev)
      prev.has(t) ? next.delete(t) : next.add(t)
      return next
    })
  }

  return (
    <>
      <h1>🧮 Math Adventure!</h1>
      <p className="subtitle">Fun puzzles for curious minds ✨</p>

      {screen === 'start' && (
        <StartScreen
          difficulty={difficulty}
          enabledTypes={enabledTypes}
          onDifficultyChange={setDifficulty}
          onTypeToggle={toggleType}
          onStart={startGame}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={gameKey}
          questions={questions}
          difficulty={difficulty}
          onGameEnd={handleGameEnd}
          onExit={() => setScreen('start')}
        />
      )}

      {screen === 'results' && results && (
        <ResultsScreen
          score={results.score}
          correctCount={results.correctCount}
          wrongCount={results.wrongCount}
          bestStreak={results.bestStreak}
          onPlayAgain={startGame}
          onSettings={() => setScreen('start')}
        />
      )}
    </>
  )
}
