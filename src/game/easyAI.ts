import type { Board } from '../types/game'

export function getEmptyCells(board: Board): number[] {
  const empty: number[] = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) empty.push(i)
  }
  return empty
}

export function easyAI(board: Board): number | null {
  const empty = getEmptyCells(board)
  if (empty.length === 0) return null
  return empty[Math.floor(Math.random() * empty.length)]
}
