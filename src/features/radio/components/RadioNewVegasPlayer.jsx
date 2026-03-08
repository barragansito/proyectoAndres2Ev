import { useRadioPlayer } from '../context/useRadioPlayer'
import { RadioVisualizer } from './RadioVisualizer'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function RadioNewVegasPlayer() {
  const {
    track,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioError,
    togglePlay,
    seekTo,
    setPlayerVolume,
    nextStation,
    previousStation,
  } = useRadioPlayer()

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value)
    seekTo(nextTime)
  }

  const handleVolume = (event) => {
    const nextVolume = Number(event.target.value)
    setPlayerVolume(nextVolume)
  }

  return (
    <article className="panel radio-player">
      <p className="radio-status">Station: {track.stationName}</p>
      <h3>{track.title}</h3>
      <RadioVisualizer />

      <div className="radio-controls">
        <button type="button" className="radio-btn radio-btn-nav" onClick={previousStation}>
          &lt; Prev
        </button>
        <button type="button" className="radio-btn radio-btn-play" onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="radio-btn radio-btn-nav" onClick={nextStation}>
          Next &gt;
        </button>
      </div>

      <label className="radio-label" htmlFor="track-progress">
        Progress
      </label>
      <input
        id="track-progress"
        type="range"
        min={0}
        max={duration || 1}
        value={currentTime}
        onChange={handleSeek}
        className="radio-range"
      />
      <p className="radio-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </p>

      <label className="radio-label" htmlFor="track-volume">
        Volume
      </label>
      <input
        id="track-volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        className="radio-range"
      />
      {audioError ? <p className="radio-error">{audioError}</p> : null}
    </article>
  )
}
