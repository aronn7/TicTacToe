import type { Player } from '../types/game'

interface TurnIndicatorProps {
  currentPlayer: Player
  mode: 'pvp' | 'pvc'
  status: 'playing' | 'won' | 'draw'
  winner: Player | null
}

export function TurnIndicator({ currentPlayer, mode, status, winner }: TurnIndicatorProps) {
  if (status === 'won') {
    const isAI = mode === 'pvc' && winner === 'O'
    return (
      <p className="turn-indicator" role="status" aria-live="polite">
        {isAI ? 'Komputer memenangkan ronde ini!' : `Pemain ${winner} memenangkan ronde ini!`}
      </p>
    )
  }
  if (status === 'draw') {
    return (
      <p className="turn-indicator" role="status" aria-live="polite">
        Permainan berakhir seri.
      </p>
    )
  }
  const whoIsPlaying = mode === 'pvc' && currentPlayer === 'O' ? 'Komputer' : `Pemain ${currentPlayer}`
  return (
    <p className="turn-indicator" role="status" aria-live="polite">
      Giliran: <span className={`turn-indicator__player turn-indicator__player--${currentPlayer.toLowerCase()}`}>{whoIsPlaying}</span>
    </p>
  )
}
