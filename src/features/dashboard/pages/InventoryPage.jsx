const inventory = [
  { id: 1, name: '10mm Pistol', qty: 1 },
  { id: 2, name: 'Stimpak', qty: 6 },
  { id: 3, name: 'RadAway', qty: 2 },
]

export function InventoryPage() {
  return (
    <section>
      <h2>INVENTORY</h2>
      <div className="list-grid">
        {inventory.map((item) => (
          <article key={item.id} className="panel">
            <p>{item.name}</p>
            <p>QTY: {item.qty}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
