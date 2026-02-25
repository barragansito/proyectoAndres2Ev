import { useEffect, useRef, useState } from 'react'
import { radioPlayerContext as RadioPlayerContext } from './radioPlayerContext'

const STATIONS = [
  {
    id: 'radio-new-vegas',
    stationName: 'Radio New Vegas',
    title: 'Radio New Vegas Theme',
    path: 'audio/radio-new-vegas/radio-new-vegas-theme.mp3',
  },
  {
    id: 'radio-mojave',
    stationName: 'Radio Mojave',
    title: 'Radio Mojave Theme',
    path: 'audio/radio-mojave/radio-mojave-theme.mp3',
  },
]

export function RadioPlayerProvider({ children }) {
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const [currentStationIndex, setCurrentStationIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [audioError, setAudioError] = useState('')
  const track = STATIONS[currentStationIndex]
  const trackSrc = `${import.meta.env.BASE_URL}${track.path}`

  const ensureAudioGraph = () => {
    if (typeof window === 'undefined') return null
    const audio = audioRef.current
    if (!audio) return null

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext()
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 2048
      analyserRef.current.smoothingTimeConstant = 0.8
    }

    if (!sourceNodeRef.current) {
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audio)
      sourceNodeRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
    }

    return analyserRef.current
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)
    const onError = () => {
      setIsPlaying(false)
      setAudioError(`No se pudo cargar el audio en: ${trackSrc}`)
    }

    audio.volume = volume
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [trackSrc, volume])

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) sourceNodeRef.current.disconnect()
      if (analyserRef.current) analyserRef.current.disconnect()
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
        setAudioError('No se pudo continuar la reproduccion al cambiar de emisora.')
      })
    }
  }, [isPlaying, trackSrc])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    ensureAudioGraph()

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      await audio.play()
      setIsPlaying(true)
      setAudioError('')
    } catch {
      setIsPlaying(false)
      setAudioError('El navegador bloqueo la reproduccion o el archivo no es valido.')
    }
  }

  const seekTo = (nextTime) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const setPlayerVolume = (nextVolume) => {
    const audio = audioRef.current
    setVolume(nextVolume)
    if (audio) audio.volume = nextVolume
  }

  const switchStation = (nextIndexUpdater) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
    }
    setCurrentTime(0)
    setDuration(0)
    setAudioError('')
    setCurrentStationIndex(nextIndexUpdater)
  }

  const nextStation = () => {
    switchStation((prev) => (prev + 1) % STATIONS.length)
  }

  const previousStation = () => {
    switchStation((prev) => (prev - 1 + STATIONS.length) % STATIONS.length)
  }

  const value = {
    audioRef,
    analyserRef,
    ensureAudioGraph,
    track,
    trackSrc,
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
  }

  return (
    <RadioPlayerContext.Provider value={value}>
      <audio ref={audioRef} src={trackSrc} preload="metadata" />
      {children}
    </RadioPlayerContext.Provider>
  )
}
