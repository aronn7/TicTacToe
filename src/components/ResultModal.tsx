import type { GameMode, Player } from '../types/game'
import { Button } from './ui/Button'
import { Modal } from './ui/Modal'

interface ResultModalProps {
  open: boolean
  status: 'playing' | 'won' | 'draw'
  winner: Player | null
  mode: GameMode
  onPlayAgain: () => void
  onBackToMenu: () => void
}

export function ResultModal({ open, status, winner, mode, onPlayAgain, onBackToMenu }: ResultModalProps) {
  if (status === 'playing') return null

  const isAIWin = mode === 'pvc' && winner === 'O'
  let title: string
  let message: string
  if (status === 'won') {
    title = isAIWin ? 'Komputer Menang' : `Pemain ${winner} Menang!`
    message = isAIWin
      ? 'Coba lagi, kamu pasti bisa mengalahkan komputer!'
      : 'Selamat, ronde ini dimenangkan dengan hebat.'
  } else {
    title = 'Hasil Seri'
    message = 'Tidak ada pemenang kali ini. Coba lagi!'
  }

  return (
    <Modal open={open} title={title} labelledById="result-modal-title" onClose={onBackToMenu}>
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <Button aria-label="Main lagi dari awal" onClick={onPlayAgain}>
          Main Lagi
        </Button>
        <Button variant="secondary" aria-label="Kembali ke menu utama" onClick={onBackToMenu}>
          Kembali ke Menu
        </Button>
      </div>
    </Modal>
  )
}
