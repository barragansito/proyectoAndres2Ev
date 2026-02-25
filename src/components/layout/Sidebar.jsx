import { StatCard } from '../ui/StatCard'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <StatCard title="CONDITION" barValue={85} footerText="HP 185/210" />
      <StatCard title="RADIATION" footerText="RADS: 0" />
    </aside>
  )
}
