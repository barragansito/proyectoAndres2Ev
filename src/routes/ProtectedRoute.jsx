import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="auth-shell">
        <article className="panel auth-panel">
          <h2>INICIALIZANDO PIP-BOY</h2>
          <p>Cargando sesion de usuario...</p>
        </article>
      </section>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
