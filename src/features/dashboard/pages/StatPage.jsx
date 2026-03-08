import { specialStats } from '../data/specialStats'

export function StatPage() {
  return (
    <>
      <nav className="stat-subtabs" aria-label="Subsecciones de estadisticas">
        <button type="button" className="active">
          Status
        </button>
        <button type="button">S.P.E.C.I.A.L.</button>
        <button type="button">Skills</button>
        <button type="button">Perks</button>
        <button type="button">General</button>
      </nav>

      <article className="welcome-msg">
        <h2>BIENVENIDO A NEW VEGAS</h2>
        <p>
          La Republica de Nueva California y la Legion de Cesar siguen en conflicto por la Presa
          Hoover. Revisa tus atributos antes de salir al yermo.
        </p>
      </article>

      <div className="stats-grid">
        {specialStats.map((atributo) => (
          <article className="stat-attribute" key={atributo.id}>
            <img
              src={atributo.imagen}
              alt={`Icono de ${atributo.titulo}`}
              className="stat-attribute-image"
            />
            <div className="stat-attribute-content">
              <h3>{atributo.titulo}</h3>
              <p>{atributo.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
