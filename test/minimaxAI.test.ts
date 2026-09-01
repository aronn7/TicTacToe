import { describe, expect, it } from 'vitest'
import { minimaxAI } from '../src/game/minimaxAI'
import type { Board } from '../src/types/game'

function boardFrom(cells: (Player | null)[]): Board {
  return cells as Board
}

type Player = 'X' | 'O'

describe('minimaxAI', () => {
  it('mengambil langkah kemenangan yang tersedia', () => {
    const board = boardFrom(['O', 'O', null, 'X', 'X', null, null, null, null])
    expect(minimaxAI(board)).toBe(2)
  })

  it('memblokir kemenangan pemain', () => {
    const board = boardFrom(['X', 'X', null, 'O', null, null, null, null, null])
    expect(minimaxAI(board)).toBe(2)
  })

  it('tidak memilih kotak yang sudah terisi', () => {
    const board = boardFrom(['X', null, null, null, 'O', null, null, null, null])
    const move = minimaxAI(board)
    expect(move).not.toBeNull()
    if (move !== null) {
      expect(board[move]).toBeNull()
    }
  })

  it('mengembalikan null jika board penuh', () => {
    const board = boardFrom(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])
    expect(minimaxAI(board)).toBeNull()
  })

  it('menghasilkan indeks antara 0 sampai 8', () => {
    const boards: Board[] = [
      boardFrom([null, null, null, null, null, null, null, null, null]),
      boardFrom(['X', null, null, null, null, null, null, null, null]),
      boardFrom(['X', 'O', null, null, 'X', null, null, null, null]),
    ]
    for (const board of boards) {
      const move = minimaxAI(board)
      expect(move).not.toBeNull()
      if (move !== null) {
        expect(move).toBeGreaterThanOrEqual(0)
        expect(move).toBeLessThanOrEqual(8)
      }
    }
  })
})
