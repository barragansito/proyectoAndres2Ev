const quests = [
  'Ring-a-Ding-Ding',
  'For the Republic, Part 2',
  'Render Unto Caesar',
]

export function DataPage() {
  return (
    <section>
      <h2>DATA</h2>
      <div className="list-grid">
        {quests.map((quest) => (
          <article key={quest} className="panel">
            <p>{quest}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
