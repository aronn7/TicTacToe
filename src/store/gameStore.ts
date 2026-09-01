import { create } from 'zustand'
import type {
  Board,
  Difficulty,
  GameMode,
  GameStatus,
  Player,
  Score,
  WinningCombination,
} from '../types/game'
import { checkWinner } from '../game/checkWinner'
import { easyAI } from '../game/easyAI'
import { mediumAI } from '../game/mediumAI'
import { minimaxAI } from '../game/minimaxAI'

export type Page = 'home' | 'mode' | 'difficulty' | 'game'

export type SoundName = 'click' | 'win' | 'draw'

interface GameState {
  page: Page
  board: Board
  currentPlayer: Player
  mode: GameMode
  difficulty: Difficulty
  status: GameStatus
  winner: Player | null
  winningCells: WinningCombination | null
  score: Score
  soundEnabled: boolean
  lastSound: SoundName | null

  setPage: (page: Page) => void
  setMode: (mode: GameMode) => void
  setDifficulty: (difficulty: Difficulty) => void
  makeMove: (index: number) => void
  makeAIMove: () => void
  resetRound: () => void
  resetScore: () => void
  toggleSound: () => void
  returnToMenu: () => void
  consumeSound: () => void
}

const EMPTY_BOARD: Board = [null, null, null, null, null, null, null, null, null]
const EMPTY_SCORE: Score = { x: 0, o: 0, draw: 0 }

function computeAIMove(board: Board, difficulty: Difficulty): number | null {
  switch (difficulty) {
    case 'easy':
      return easyAI(board)
    case 'medium':
      return mediumAI(board)
    case 'hard':
      return minimaxAI(board)
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  page: 'home',
  board: EMPTY_BOARD,
  currentPlayer: 'X',
  mode: 'pvp',
  difficulty: 'medium',
  status: 'playing',
  winner: null,
  winningCells: null,
  score: { ...EMPTY_SCORE },
  soundEnabled: true,
  lastSound: null,

  setPage: (page) => set({ page }),

  setMode: (mode) => set({ mode }),

  setDifficulty: (difficulty) => set({ difficulty }),

  makeMove: (index) => {
    const { board, currentPlayer, status, score, mode } = get()
    if (status !== 'playing') return
    if (index < 0 || index > 8) return
    if (board[index] !== null) return

    const nextBoard: Board = [...board]
    nextBoard[index] = currentPlayer
    const result = checkWinner(nextBoard)

    const nextStatus: GameStatus = result.winner !== null ? 'won' : result.isDraw ? 'draw' : 'playing'
    const nextScore: Score = { ...score }
    if (nextStatus === 'won' && result.winner !== null) {
      if (result.winner === 'X') nextScore.x += 1
      else nextScore.o += 1
    } else if (nextStatus === 'draw') {
      nextScore.draw += 1
    }

    set({
      board: nextBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      status: nextStatus,
      winner: result.winner,
      winningCells: result.winningCells,
      score: nextScore,
      lastSound: nextStatus === 'won' ? 'win' : nextStatus === 'draw' ? 'draw' : 'click',
    })
    void mode
  },

  makeAIMove: () => {
    const { board, status, difficulty } = get()
    if (status !== 'playing') return
    const move = computeAIMove(board, difficulty)
    if (move === null) return
    get().makeMove(move)
  },

  resetRound: () =>
    set({
      board: EMPTY_BOARD,
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningCells: null,
    }),

  resetScore: () => set({ score: { ...EMPTY_SCORE } }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  returnToMenu: () => set({ page: 'mode' }),

  consumeSound: () => set({ lastSound: null }),
}))
