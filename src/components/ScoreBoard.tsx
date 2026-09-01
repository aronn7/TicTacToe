import type { Score } from '../types/game'
import { Button } from './ui/Button'

interface ScoreBoardProps {
  score: Score
  onReset: () => void
}

export function ScoreBoard({ score, onReset }: ScoreBoardProps) {
  return (
    <section className="scoreboard" aria-label="Papan skor">
      <div className="scoreboard__items">
        <div className="scoreboard__item scoreboard__item--x">
          <span className="scoreboard__label">Pemain X</span>
          <span className="scoreboard__value" aria-label={`Kemenangan X: ${score.x}`}>
            {score.x}
          </span>
        </div>
        <div className="scoreboard__item scoreboard__item--draw">
          <span className="scoreboard__label">Seri</span>
          <span className="scoreboard__value" aria-label={`Jumlah seri: ${score.draw}`}>
            {score.draw}
          </span>
        </div>
        <div className="scoreboard__item scoreboard__item--o">
          <span className="scoreboard__label">Pemain O</span>
          <span className="scoreboard__value" aria-label={`Kemenangan O: ${score.o}`}>
            {score.o}
          </span>
        </div>
      </div>
      <Button variant="secondary" className="scoreboard__reset" aria-label="Reset skor permainan" onClick={onReset}>
        Reset Skor
      </Button>
    </section>
  )
}
