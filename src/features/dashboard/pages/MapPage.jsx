import { useState } from 'react'

const MAP_SRC = `${import.meta.env.BASE_URL}maps/MojaveMap.webp`
const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.2

export function MapPage() {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 })
  const [hasMapError, setHasMapError] = useState(false)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(MAX_ZOOM, Number((prev + ZOOM_STEP).toFixed(2))))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(MIN_ZOOM, Number((prev - ZOOM_STEP).toFixed(2))))
  }

  const handleResetView = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const handlePointerDown = (event) => {
    setIsDragging(true)
    setDragOrigin({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    })
  }

  const handlePointerMove = (event) => {
    if (!isDragging || zoom <= 1) return
    setOffset({
      x: event.clientX - dragOrigin.x,
      y: event.clientY - dragOrigin.y,
    })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    setZoom((prev) => {
      const next = prev + delta
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(next.toFixed(2))))
    })
  }

  return (
    <section>
      <h2>MAP</h2>
      <article className="panel map-panel">
        <header className="map-toolbar">
          <p className="map-meta">Zone: Mojave Wasteland</p>
          <div className="map-actions">
            <button type="button" className="radio-btn" onClick={handleZoomOut}>
              -
            </button>
            <button type="button" className="radio-btn" onClick={handleZoomIn}>
              +
            </button>
            <button type="button" className="radio-btn" onClick={handleResetView}>
              Reset
            </button>
          </div>
        </header>

        <div
          className="map-viewer"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        >
          {hasMapError ? (
            <p className="map-help">
              No se encontro el mapa. Copia el archivo en: `/public/maps/MojaveMap.webp`
            </p>
          ) : (
            <img
              src={MAP_SRC}
              alt="Mapa del Mojave Wasteland"
              className={`map-image ${isDragging ? 'is-dragging' : ''}`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              }}
              onError={() => setHasMapError(true)}
            />
          )}
        </div>
      </article>
    </section>
  )
}
