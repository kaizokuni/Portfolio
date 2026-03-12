import { useEffect, useRef } from 'react'

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationId
    let columns, drops

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const fontSize = 14
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = '01アイウエオカキクケコ{}[]<>/\\|ABCDEF'
    const fontSize = 14
    let lastTime = 0
    const interval = 50

    const draw = (timestamp) => {
      animationId = requestAnimationFrame(draw)
      if (timestamp - lastTime < interval) return
      lastTime = timestamp

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-bg" />
}
