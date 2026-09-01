import type { Board, Player } from '../types/game'
import { checkWinner } from './checkWinner'
import { getEmptyCells } from './easyAI'

function scoreResult(winner: Player | null, depth: number): number {
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  return 0
}

function minimax(board: Board, current: Player, depth: number): number {
  const result = checkWinner(board)
  if (result.winner !== null || result.isDraw) {
    return scoreResult(result.winner, depth)
  }

  const empty = getEmptyCells(board)

  if (current === 'O') {
    let best = -Infinity
    for (const move of empty) {
      board[move] = 'O'
      const score = minimax(board, 'X', depth + 1)
      board[move] = null
      if (score > best) best = score
    }
    return best
  }

  let best = Infinity
  for (const move of empty) {
    board[move] = 'X'
    const score = minimax(board, 'O', depth + 1)
    board[move] = null
    if (score < best) best = score
  }
  return best
}

export function minimaxAI(board: Board): number | null {
  const empty = getEmptyCells(board)
  if (empty.length === 0) return null

  const working: Board = [...board]
  let bestScore = -Infinity
  let bestMoves: number[] = []

  for (const move of empty) {
    working[move] = 'O'
    const score = minimax(working, 'X', 1)
    working[move] = null
    if (score > bestScore) {
      bestScore = score
      bestMoves = [move]
    } else if (score === bestScore) {
      bestMoves.push(move)
    }
  }

  if (bestMoves.length === 0) return null
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}
