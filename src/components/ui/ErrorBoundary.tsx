import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Terjadi kesalahan pada aplikasi:', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Terjadi Kesalahan</h1>
          <p>Maaf, aplikasi mengalami masalah. Silakan muat ulang halaman.</p>
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            Muat Ulang
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
