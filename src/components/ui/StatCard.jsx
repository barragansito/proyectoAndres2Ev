import { ProgressBar } from './ProgressBar'

export function StatCard({ title, barValue, footerText }) {
  return (
    <section className="stat-card">
      <h3>{title}</h3>
      {typeof barValue === 'number' ? <ProgressBar value={barValue} /> : null}
      {footerText ? <p>{footerText}</p> : null}
    </section>
  )
}
