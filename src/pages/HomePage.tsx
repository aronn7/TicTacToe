import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useGameStore } from '../store/gameStore'

interface HomePageProps {
  onSoundToggle: () => void
  soundEnabled: boolean
}

export function HomePage({ onSoundToggle, soundEnabled }: HomePageProps) {
  const setPage = useGameStore((s) => s.setPage)

  return (
    <main className="page page--home">
      <Card className="home-card">
        <div className="home-card__logo" aria-hidden="true">
          <span className="logo-x">X</span>
          <span className="logo-o">O</span>
        </div>
        <h1 className="home-card__title">Tic-Tac-Toe</h1>
        <p className="home-card__subtitle">
          Permainan klasik tiga baris. Kalahkan lawanmu atau taklukkan komputer!
        </p>
        <div className="home-card__actions">
          <Button className="btn--large" aria-label="Mulai bermain Tic-Tac-Toe" onClick={() => setPage('mode')}>
            Mulai Bermain
          </Button>
          <Button
            variant="ghost"
            aria-label={soundEnabled ? 'Nonaktifkan suara' : 'Aktifkan suara'}
            onClick={onSoundToggle}
          >
            {soundEnabled ? '🔊 Suara Aktif' : '🔇 Suara Mati'}
          </Button>
        </div>
      </Card>
    </main>
  )
}
