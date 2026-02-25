import { useEffect, useRef } from 'react'
import { useRadioPlayer } from '../context/useRadioPlayer'

export function RadioVisualizer() {
  const { analyserRef, ensureAudioGraph, isPlaying } = useRadioPlayer()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const dataArrayRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const analyser = analyserRef.current ?? ensureAudioGraph()
    if (!analyser) return undefined

    if (
      !dataArrayRef.current ||
      dataArrayRef.current.length !== analyser.fftSize
    ) {
      dataArrayRef.current = new Uint8Array(analyser.fftSize)
    }
    const dataArray = dataArrayRef.current

    const context = canvas.getContext('2d')
    if (!context) return undefined

    if (isPlaying && analyser.context.state === 'suspended') {
      analyser.context.resume().catch(() => {})
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = width
      canvas.height = height

      context.fillStyle = '#120c02'
      context.fillRect(0, 0, width, height)

      context.strokeStyle = 'rgba(255, 180, 80, 0.2)'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(0, Math.floor(height / 2))
      context.lineTo(width, Math.floor(height / 2))
      context.stroke()

      analyser.getByteTimeDomainData(dataArray)
      context.lineWidth = 2
      context.strokeStyle = '#ffb450'
      context.shadowColor = '#ffb450'
      context.shadowBlur = 10
      context.beginPath()

      const sliceWidth = width / dataArray.length
      let x = 0

      for (let i = 0; i < dataArray.length; i += 1) {
        const v = dataArray[i] / 128
        const y = (v * height) / 2
        if (i === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
        x += sliceWidth
      }

      context.lineTo(width, height / 2)
      context.stroke()
      context.shadowBlur = 0
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [analyserRef, ensureAudioGraph, isPlaying])

  return (
    <div className="radio-visualizer-frame" aria-hidden="true">
      <canvas ref={canvasRef} className="radio-visualizer" />
    </div>
  )
}
