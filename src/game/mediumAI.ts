import type { Board, Player } from '../types/game'
import { getEmptyCells } from './easyAI'

const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function findWinningMove(board: Board, player: Player): number | null {
  for (const [a, b, c] of LINES) {
    const line = [board[a], board[b], board[c]]
    const emptyIndex = line.indexOf(null)
    if (emptyIndex === -1) continue
    const others = line.filter((_, idx) => idx !== emptyIndex)
    if (others[0] === player && others[1] === player) {
      const cells = [a, b, c]
      return cells[emptyIndex]
    }
  }
  return null
}

export function mediumAI(board: Board): number | null {
  const winMove = findWinningMove(board, 'O')
  if (winMove !== null) return winMove

  const blockMove = findWinningMove(board, 'X')
  if (blockMove !== null) return blockMove

  if (board[4] === null) return 4

  const empty = getEmptyCells(board)
  if (empty.length === 0) return null
  return empty[Math.floor(Math.random() * empty.length)]
}
