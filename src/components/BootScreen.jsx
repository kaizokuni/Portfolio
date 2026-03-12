import { useState, useEffect } from 'react'
import { bootLines } from '../data'

export default function BootScreen() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const intervals = bootLines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 300)
    )
    const hideTimer = setTimeout(() => setHiding(true), 3000)
    return () => {
      intervals.forEach(clearTimeout)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className={`boot-screen ${hiding ? 'hidden' : ''}`}>
      <div className="boot-text">
        {bootLines.map((line, i) => (
          <p key={i} className={`boot-line ${i < visibleLines ? 'visible' : ''}`}>
            {line.includes('UP') || line.includes('ACTIVE') || line.includes('OK') ? (
              <span dangerouslySetInnerHTML={{
                __html: line
                  .replace('UP', '<span class="green">UP</span>')
                  .replace('ACTIVE', '<span class="green">ACTIVE</span>')
                  .replace('[OK]', '[<span class="green">OK</span>]')
                  .replace('yassine@ouhannou', '<span class="cyan">yassine@ouhannou</span>')
              }} />
            ) : line.includes('yassine@ouhannou') ? (
              <span dangerouslySetInnerHTML={{
                __html: line.replace('yassine@ouhannou', '<span class="cyan">yassine@ouhannou</span>')
              }} />
            ) : (
              line
            )}
          </p>
        ))}
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${visibleLines > 0 ? 'active' : ''}`} />
      </div>
    </div>
  )
}
