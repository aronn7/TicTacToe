import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  labelledById?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, labelledById, onClose, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-labelledby={labelledById}
    >
      <div className="modal-content">
        <h2 id={labelledById} className="modal-title">
          {title}
        </h2>
        {children}
        <button
          ref={closeRef}
          type="button"
          className="btn btn--ghost modal-close"
          aria-label="Tutup modal hasil permainan"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
