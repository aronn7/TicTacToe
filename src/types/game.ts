export type Player = 'X' | 'O'

export type Cell = Player | null

export type Board = Cell[]

export type GameMode = 'pvp' | 'pvc'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameStatus = 'playing' | 'won' | 'draw'

export type WinningCombination = readonly [number, number, number]

export interface Score {
  x: number
  o: number
  draw: number
}

export interface GameResult {
  winner: Player | null
  winningCells: WinningCombination | null
  isDraw: boolean
}
