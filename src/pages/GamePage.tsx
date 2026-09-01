import { GameBoard } from '../components/GameBoard'
import { ResultModal } from '../components/ResultModal'
import { ScoreBoard } from '../components/ScoreBoard'
import { TurnIndicator } from '../components/TurnIndicator'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useGameStore } from '../store/gameStore'
import type { GameMode } from '../types/game'

interface GamePageProps {
  mode: GameMode
  onBack: () => void
  onPlayAgain: () => void
  onBackToMenu: () => void
}

export function GamePage({ mode, onBack, onPlayAgain, onBackToMenu }: GamePageProps) {
  const board = useGameStore((s) => s.board)
  const status = useGameStore((s) => s.status)
  const winner = useGameStore((s) => s.winner)
  const winningCells = useGameStore((s) => s.winningCells)
  const currentPlayer = useGameStore((s) => s.currentPlayer)
  const score = useGameStore((s) => s.score)
  const difficulty = useGameStore((s) => s.difficulty)
  const makeMove = useGameStore((s) => s.makeMove)
  const resetRound = useGameStore((s) => s.resetRound)
  const resetScore = useGameStore((s) => s.resetScore)

  const isGameOver = status !== 'playing'
  const boardDisabled = isGameOver || (mode === 'pvc' && currentPlayer === 'O')

  return (
    <main className="page page--game">
      <Card className="game-card">
        <header className="game-header">
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <p className="game-mode-label">
            Mode: {mode === 'pvp' ? 'Pemain vs Pemain' : `Pemain vs Komputer (${labelDifficulty(difficulty)})`}
          </p>
        </header>
        <TurnIndicator currentPlayer={currentPlayer} mode={mode} status={status} winner={winner} />
        <GameBoard board={board} winningCells={winningCells} disabled={boardDisabled} onSelect={makeMove} />
        <ScoreBoard score={score} onReset={resetScore} />
        <footer className="game-actions">
          <Button variant="secondary" aria-label="Main lagi dari awal" onClick={onPlayAgain} disabled={false}>
            Main Lagi
          </Button>
          <Button variant="ghost" aria-label="Kembali ke pemilihan mode" onClick={onBack}>
            Kembali ke Menu
          </Button>
        </footer>
      </Card>
      <ResultModal
        open={isGameOver}
        status={status}
        winner={winner}
        mode={mode}
        onPlayAgain={() => {
          resetRound()
          onPlayAgain()
        }}
        onBackToMenu={onBackToMenu}
      />
    </main>
  )
}

function labelDifficulty(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'Mudah'
    case 'medium':
      return 'Sedang'
    case 'hard':
      return 'Sulit'
    default:
      return difficulty
  }
}
