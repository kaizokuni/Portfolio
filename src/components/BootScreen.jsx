import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: '[*] Initializing system...', type: 'normal' },
  { text: '[*] Loading kernel modules...', type: 'normal' },
  { text: '[+] Network interface: ', highlight: 'UP', type: 'success' },
  { text: '[+] Firewall status: ', highlight: 'ACTIVE', type: 'success' },
  { text: '[*] Establishing secure connection...', type: 'normal' },
  { text: '[+] Connection established via TLS 1.3', type: 'normal' },
  { text: '[+] Identity verified: ', highlight: 'yassine@ouhannou', type: 'identity' },
  { text: '[*] Loading portfolio...', type: 'normal' },
  { text: '[', highlight: 'OK', suffix: '] System ready.', type: 'ok' },
]

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 280)
    )
    const fadeTimer = setTimeout(() => setFading(true), BOOT_LINES.length * 280 + 400)
    const doneTimer = setTimeout(onComplete, BOOT_LINES.length * 280 + 1200)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  const renderLine = (line, i) => {
    if (line.type === 'success') {
      return <>{line.text}<span className="green">{line.highlight}</span></>
    }
    if (line.type === 'identity') {
      return <>{line.text}<span className="cyan">{line.highlight}</span></>
    }
    if (line.type === 'ok') {
      return <>{line.text}<span className="green">{line.highlight}</span>{line.suffix}</>
    }
    return line.text
  }

  return (
    <div className={`boot-screen ${fading ? 'hidden' : ''}`}>
      <div className="boot-text">
        {BOOT_LINES.map((line, i) => (
          <p key={i} className={`boot-line ${i < visibleLines ? 'visible' : ''}`}>
            {renderLine(line, i)}
          </p>
        ))}
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${visibleLines > 0 ? 'active' : ''}`} />
      </div>
    </div>
  )
}
