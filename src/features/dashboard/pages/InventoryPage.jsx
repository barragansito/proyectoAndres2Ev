import { useState } from 'react'

export function InventoryPage() {
  const inventory = [
    {
      id: 1,
      nombre: 'Pistola 10mm',
      cantidad: 1,
      categoria: 'ARMA',
      descripcion: 'Arma secundaria fiable para distancias cortas y consumo de municion moderado.',
    },
    {
      id: 2,
      nombre: 'Stimpak',
      cantidad: 6,
      categoria: 'AYUDA',
      descripcion: 'Recupera vida de forma inmediata en combate o exploracion.',
    },
    {
      id: 3,
      nombre: 'RadAway',
      cantidad: 2,
      categoria: 'MEDICO',
      descripcion: 'Reduce acumulacion de radiacion y mejora estado fisiologico.',
    },
  ]
  const [activeItemId, setActiveItemId] = useState(inventory[0].id)
  const activeItem = inventory.find((item) => item.id === activeItemId) ?? inventory[0]

  return (
    <section className="panel terminal-panel">
      <h2>INV</h2>
      <div className="terminal-layout">
        <ul className="terminal-list" role="listbox" aria-label="Inventario">
          {inventory.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`terminal-row ${activeItemId === item.id ? 'active' : ''}`}
                onClick={() => setActiveItemId(item.id)}
              >
                {item.nombre} <span>x{item.cantidad}</span>
              </button>
            </li>
          ))}
        </ul>

        <article className="terminal-detail">
          <h3>{activeItem.nombre}</h3>
          <p className="terminal-detail-meta">TIPO: {activeItem.categoria}</p>
          <p className="terminal-detail-meta">CANTIDAD: {activeItem.cantidad}</p>
          <p>{activeItem.descripcion}</p>
        </article>
      </div>
    </section>
  )
}
