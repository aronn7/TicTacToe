import type { Board, GameResult, Player, WinningCombination } from '../types/game'

const WINNING_COMBINATIONS: readonly WinningCombination[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function checkWinner(board: Board): GameResult {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination
    const value = board[a]
    if (value !== null && value === board[b] && value === board[c]) {
      return { winner: value as Player, winningCells: combination, isDraw: false }
    }
  }
  const isFull = board.every((cell) => cell !== null)
  return { winner: null, winningCells: null, isDraw: isFull }
}

export { WINNING_COMBINATIONS }
