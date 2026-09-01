import { useTicTacToe } from './hooks/useTicTacToe'
import { DifficultyPage } from './pages/DifficultyPage'
import { GamePage } from './pages/GamePage'
import { HomePage } from './pages/HomePage'
import { ModePage } from './pages/ModePage'
import { useGameStore } from './store/gameStore'
import type { Difficulty, GameMode } from './types/game'

export default function App() {
  useTicTacToe()

  const page = useGameStore((s) => s.page)
  const mode = useGameStore((s) => s.mode)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const setPage = useGameStore((s) => s.setPage)
  const setMode = useGameStore((s) => s.setMode)
  const setDifficulty = useGameStore((s) => s.setDifficulty)
  const resetRound = useGameStore((s) => s.resetRound)
  const toggleSound = useGameStore((s) => s.toggleSound)

  const handleSelectMode = (selected: GameMode) => {
    setMode(selected)
    if (selected === 'pvc') {
      setPage('difficulty')
    } else {
      resetRound()
      setPage('game')
    }
  }

  const handleSelectDifficulty = (selected: Difficulty) => {
    setDifficulty(selected)
    resetRound()
    setPage('game')
  }

  switch (page) {
    case 'home':
      return <HomePage soundEnabled={soundEnabled} onSoundToggle={toggleSound} />
    case 'mode':
      return <ModePage onSelectMode={handleSelectMode} onBack={() => setPage('home')} />
    case 'difficulty':
      return <DifficultyPage onSelectDifficulty={handleSelectDifficulty} onBack={() => setPage('mode')} />
    case 'game':
      return (
        <GamePage
          mode={mode}
          onBack={() => setPage('mode')}
          onPlayAgain={resetRound}
          onBackToMenu={() => setPage('mode')}
        />
      )
  }
}
