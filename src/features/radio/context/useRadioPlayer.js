import { useContext } from 'react'
import { radioPlayerContext } from './radioPlayerContext'

export function useRadioPlayer() {
  const context = useContext(radioPlayerContext)
  if (!context) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider')
  }
  return context
}
