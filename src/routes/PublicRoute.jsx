import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

export function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="auth-shell">
        <article className="panel auth-panel">
          <h2>CONECTANDO TERMINAL</h2>
          <p>Sincronizando datos...</p>
        </article>
      </section>
    )
  }

  if (isAuthenticated) return <Navigate to="/stat" replace />
  return children
}
