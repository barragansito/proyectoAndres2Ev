export function ProgressBar({ value = 0 }) {
  return (
    <div className="bar-container" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className="bar" style={{ width: `${value}%` }} />
    </div>
  )
}
