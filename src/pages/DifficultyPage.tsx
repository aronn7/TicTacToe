import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import type { Difficulty } from '../types/game'

interface DifficultyPageProps {
  onSelectDifficulty: (difficulty: Difficulty) => void
  onBack: () => void
}

const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: 'easy', label: 'Mudah', description: 'Komputer memilih kotak secara acak.' },
  { value: 'medium', label: 'Sedang', description: 'Komputer bisa menang dan memblokir kamu.' },
  { value: 'hard', label: 'Sulit', description: 'Komputer berpikir dengan algoritma Minimax.' },
]

export function DifficultyPage({ onSelectDifficulty, onBack }: DifficultyPageProps) {
  return (
    <main className="page">
      <Card>
        <h1 className="page-title">Pilih Tingkat Kesulitan</h1>
        <p className="page-subtitle">Seberapa hebat kemampuan komputer?</p>
        <div className="options">
          {DIFFICULTIES.map((item) => (
            <Button
              key={item.value}
              className="btn--large btn--block"
              aria-label={`Tingkat kesulitan ${item.label}. ${item.description}`}
              onClick={() => onSelectDifficulty(item.value)}
            >
              <span className="btn__title">{item.label}</span>
              <span className="btn__description">{item.description}</span>
            </Button>
          ))}
        </div>
        <div className="page-footer">
          <Button variant="ghost" aria-label="Kembali ke pemilihan mode" onClick={onBack}>
            ← Kembali
          </Button>
        </div>
      </Card>
    </main>
  )
}
