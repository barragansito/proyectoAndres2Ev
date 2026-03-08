import { NavLink } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'

const baseTabs = [
  { label: 'STAT', to: '/stat' },
  { label: 'INV', to: '/inv' },
  { label: 'DATA', to: '/data' },
  { label: 'MAP', to: '/map' },
  { label: 'RADIO', to: '/radio' },
]

export function NavTabs() {
  const { isAdmin } = useAuth()
  const tabs = isAdmin ? [...baseTabs, { label: 'ADMIN', to: '/admin' }] : baseTabs

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
