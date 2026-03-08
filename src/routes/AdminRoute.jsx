import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="auth-shell">
        <article className="panel auth-panel">
          <h2>VERIFICANDO PERMISOS</h2>
          <p>Comprobando rango de administrador...</p>
        </article>
      </section>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/stat" replace />
  return children
}
