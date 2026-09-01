import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

const AI_DELAY_MS = 400

function playSound(sound: 'click' | 'win' | 'draw'): void {
  const audio = new Audio(`/sounds/${sound}.mp3`)
  audio.volume = 0.6
  audio.play().catch(() => {
    // File audio mungkin belum tersedia atau pemutaran diblokir browser.
    // Aplikasi tetap berjalan tanpa suara.
  })
}

export function useTicTacToe(): void {
  const page = useGameStore((s) => s.page)
  const mode = useGameStore((s) => s.mode)
  const status = useGameStore((s) => s.status)
  const board = useGameStore((s) => s.board)
  const currentPlayer = useGameStore((s) => s.currentPlayer)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const lastSound = useGameStore((s) => s.lastSound)
  const consumeSound = useGameStore((s) => s.consumeSound)
  const makeAIMove = useGameStore((s) => s.makeAIMove)

  const lastSoundRef = useRef<string | null>(null)

  useEffect(() => {
    if (lastSound === null) return
    if (lastSoundRef.current !== lastSound) {
      lastSoundRef.current = lastSound
      if (soundEnabled) playSound(lastSound)
      consumeSound()
    }
  }, [lastSound, soundEnabled, consumeSound])

  useEffect(() => {
    if (page !== 'game') return
    if (mode !== 'pvc') return
    if (status !== 'playing') return
    if (currentPlayer !== 'O') return

    const timer = window.setTimeout(() => {
      makeAIMove()
    }, AI_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [page, mode, status, currentPlayer, board, makeAIMove])
}
