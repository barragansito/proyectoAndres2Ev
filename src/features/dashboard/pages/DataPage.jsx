import { useState } from 'react'

export function DataPage() {
  const quests = [
    {
      id: 1,
      nombre: 'Ring-a-Ding-Ding',
      descripcion: 'Sigue la pista de Benny en The Strip y recupera el Chip de Platino.',
      estado: 'ACTIVA',
    },
    {
      id: 2,
      nombre: 'For the Republic, Part 2',
      descripcion: 'Coordina operaciones con la NCR para reforzar posiciones estrategicas.',
      estado: 'EN CURSO',
    },
    {
      id: 3,
      nombre: 'Render Unto Caesar',
      descripcion: 'Contacta con la Legion para decidir el rumbo del conflicto en Hoover Dam.',
      estado: 'PENDIENTE',
    },
  ]
  const [activeQuestId, setActiveQuestId] = useState(quests[0].id)
  const activeQuest = quests.find((quest) => quest.id === activeQuestId) ?? quests[0]

  return (
    <section className="panel terminal-panel">
      <h2>DATA</h2>
      <div className="terminal-layout">
        <ul className="terminal-list" role="listbox" aria-label="Lista de misiones">
          {quests.map((quest) => (
            <li key={quest.id}>
              <button
                type="button"
                className={`terminal-row ${activeQuestId === quest.id ? 'active' : ''}`}
                onClick={() => setActiveQuestId(quest.id)}
              >
                {quest.nombre}
              </button>
            </li>
          ))}
        </ul>

        <article className="terminal-detail">
          <h3>{activeQuest.nombre}</h3>
          <p className="terminal-detail-meta">ESTADO: {activeQuest.estado}</p>
          <p>{activeQuest.descripcion}</p>
        </article>
      </div>
    </section>
  )
}
