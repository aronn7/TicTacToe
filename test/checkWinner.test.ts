import { describe, expect, it } from 'vitest'
import { checkWinner } from '../src/game/checkWinner'
import type { Board } from '../src/types/game'

function boardFrom(cells: (Player | null)[]): Board {
  return cells as Board
}

type Player = 'X' | 'O'

describe('checkWinner', () => {
  it('mendeteksi kemenangan horizontal', () => {
    const board = boardFrom(['X', 'X', 'X', 'O', 'O', null, null, null, null])
    const result = checkWinner(board)
    expect(result.winner).toBe('X')
    expect(result.isDraw).toBe(false)
  })

  it('mendeteksi kemenangan vertikal', () => {
    const board = boardFrom(['O', 'X', null, 'O', 'X', null, 'O', 'X', null])
    const result = checkWinner(board)
    expect(result.winner).toBe('O')
    expect(result.isDraw).toBe(false)
  })

  it('mendeteksi kemenangan diagonal', () => {
    const board = boardFrom(['X', 'O', null, 'O', 'X', null, null, null, 'X'])
    const result = checkWinner(board)
    expect(result.winner).toBe('X')
    expect(result.isDraw).toBe(false)
  })

  it('tidak memiliki pemenang pada board yang belum selesai', () => {
    const board = boardFrom(['X', 'O', 'X', null, null, null, null, null, null])
    const result = checkWinner(board)
    expect(result.winner).toBeNull()
    expect(result.winningCells).toBeNull()
    expect(result.isDraw).toBe(false)
  })

  it('mendeteksi hasil seri ketika penuh tanpa pemenang', () => {
    const board = boardFrom(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])
    const result = checkWinner(board)
    expect(result.winner).toBeNull()
    expect(result.isDraw).toBe(true)
  })

  it('mengembalikan kombinasi kotak pemenang yang benar', () => {
    const board = boardFrom([null, null, null, 'O', 'O', 'O', 'X', 'X', null])
    const result = checkWinner(board)
    expect(result.winningCells).toEqual([3, 4, 5])
  })
})
