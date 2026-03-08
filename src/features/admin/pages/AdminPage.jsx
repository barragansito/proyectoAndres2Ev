import { useAuth } from '../../auth/hooks/useAuth'

export function AdminPage() {
  const { displayName } = useAuth()

  return (
    <section className="panel">
      <h2>ADMIN CONSOLE</h2>
      <p>Operador autorizado: {displayName}</p>
      <p>
        Aqui ira el panel de gestion global (usuarios, misiones y configuracion). Esta ruta ya
        esta protegida por rol `admin`.
      </p>
    </section>
  )
}
