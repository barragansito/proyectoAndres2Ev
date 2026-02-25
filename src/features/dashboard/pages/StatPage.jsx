import { Card } from '../../../components/ui/Card'
import { specialStats } from '../data/specialStats'

export function StatPage() {
  return (
    <>
      <article className="welcome-msg">
        <h2>WELCOME TO NEW VEGAS</h2>
        <p>
          La Republica de Nueva California y la Legion de Cesar siguen en conflicto por la
          Presa Hoover. Mantente alerta, mensajero.
        </p>
      </article>

      <div className="gallery-grid">
        {specialStats.map((stat) => (
          <Card key={stat}>{stat}</Card>
        ))}
      </div>
    </>
  )
}
