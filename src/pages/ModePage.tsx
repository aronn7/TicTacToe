import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import type { GameMode } from '../types/game'

interface ModePageProps {
  onSelectMode: (mode: GameMode) => void
  onBack: () => void
}

export function ModePage({ onSelectMode, onBack }: ModePageProps) {
  return (
    <main className="page">
      <Card>
        <h1 className="page-title">Pilih Mode Permainan</h1>
        <p className="page-subtitle">Dengan siapa kamu ingin bermain?</p>
        <div className="options">
          <Button
            className="btn--large btn--block"
            aria-label="Mode pemain melawan pemain"
            onClick={() => onSelectMode('pvp')}
          >
            👥 Pemain vs Pemain
          </Button>
          <Button
            className="btn--large btn--block"
            aria-label="Mode pemain melawan komputer"
            onClick={() => onSelectMode('pvc')}
          >
            🤖 Pemain vs Komputer
          </Button>
        </div>
        <div className="page-footer">
          <Button variant="ghost" aria-label="Kembali ke halaman utama" onClick={onBack}>
            ← Kembali
          </Button>
        </div>
      </Card>
    </main>
  )
}
