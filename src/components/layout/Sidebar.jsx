import { useLocation } from 'react-router-dom'
import { StatStatusPanel } from './StatStatusPanel'
import { StatCard } from '../ui/StatCard'

export function Sidebar() {
  const { pathname } = useLocation()
  const isStatRoute = pathname === '/stat'

  return (
    <aside className="sidebar">
      {isStatRoute ? (
        <StatStatusPanel />
      ) : (
        <>
          <StatCard title="CONDITION" barValue={85} footerText="HP 185/210" />
          <StatCard title="RADIATION" footerText="RADS: 0" />
        </>
      )}
    </aside>
  )
}
