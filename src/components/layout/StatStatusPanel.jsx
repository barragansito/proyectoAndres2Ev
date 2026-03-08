import { useState } from 'react'

const statusModes = [
  {
    id: 'cnd',
    label: 'CND',
    title: 'CONDICION',
    value: '85%',
    detail: 'SALUD 185/210',
    bar: 85,
  },
  {
    id: 'rad',
    label: 'RAD',
    title: 'RADIACION',
    value: '0',
    detail: 'SIN CONTAMINACION ACTIVA',
    bar: 0,
  },
  {
    id: 'eff',
    label: 'EFF',
    title: 'EFECTOS',
    value: '2',
    detail: 'BONUS: +5% RESISTENCIA / -2 AGILIDAD',
    bar: 45,
  },
]

export function StatStatusPanel() {
  const [activeModeId, setActiveModeId] = useState('cnd')
  const activeMode = statusModes.find((mode) => mode.id === activeModeId) ?? statusModes[0]

  return (
    <section className="panel stat-status-panel">
      <div className="stat-status-tabs" role="tablist" aria-label="Estado del personaje">
        {statusModes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={activeMode.id === mode.id}
            className={activeMode.id === mode.id ? 'active' : ''}
            onClick={() => setActiveModeId(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <article className="stat-status-content">
        <h3>{activeMode.title}</h3>
        <p className="stat-status-value">{activeMode.value}</p>
        <div className="bar-container">
          <div className="bar" style={{ width: `${activeMode.bar}%` }} />
        </div>
        <p className="stat-status-detail">{activeMode.detail}</p>
      </article>
    </section>
  )
}
