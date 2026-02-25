import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'STAT', to: '/stat' },
  { label: 'INV', to: '/inv' },
  { label: 'DATA', to: '/data' },
  { label: 'MAP', to: '/map' },
  { label: 'RADIO', to: '/radio' },
]

export function NavTabs() {
  return (
    <nav className="main-nav">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
