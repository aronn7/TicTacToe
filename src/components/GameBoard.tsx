import type { Board, Cell, WinningCombination } from '../types/game'

interface GameCellProps {
  index: number
  value: Cell
  isWinning: boolean
  disabled: boolean
  onSelect: (index: number) => void
}

export function GameCell({ index, value, isWinning, disabled, onSelect }: GameCellProps) {
  const isFilled = value !== null
  const isDisabled = disabled || isFilled
  const label = isFilled
    ? `Kotak ${index + 1}, sudah diisi ${value}`
    : `Kotak ${index + 1}, kosong. Pilih kotak ini`

  const classes = [
    'game-cell',
    value === 'X' ? 'game-cell--x' : '',
    value === 'O' ? 'game-cell--o' : '',
    isWinning ? 'game-cell--winning' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) onSelect(index)
      }}
    >
      {value !== null && (
        <span className={`game-cell__mark game-cell__mark--${value.toLowerCase()}`} aria-hidden="true">
          {value}
        </span>
      )}
    </button>
  )
}

interface GameBoardProps {
  board: Board
  winningCells: WinningCombination | null
  disabled: boolean
  onSelect: (index: number) => void
}

export function GameBoard({ board, winningCells, disabled, onSelect }: GameBoardProps) {
  return (
    <div className="game-board" role="grid" aria-label="Papan permainan Tic-Tac-Toe">
      {board.map((value, index) => (
        <GameCell
          key={index}
          index={index}
          value={value}
          isWinning={winningCells !== null && winningCells.includes(index)}
          disabled={disabled}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
