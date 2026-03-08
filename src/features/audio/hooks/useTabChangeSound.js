import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const TAB_SOUND_SRC = `${import.meta.env.BASE_URL}audio/ui/tab-change.mp3`

export function useTabChangeSound(isEnabled) {
  const { pathname } = useLocation()
  const previousPathRef = useRef(pathname)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(TAB_SOUND_SRC)
    audio.preload = 'auto'
    audio.volume = 0.2
    audioRef.current = audio
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (!isEnabled) {
      previousPathRef.current = pathname
      return
    }
    if (previousPathRef.current === pathname) return

    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
    previousPathRef.current = pathname
  }, [isEnabled, pathname])
}
