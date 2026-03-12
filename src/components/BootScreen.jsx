import { useState, useEffect } from 'react'
import { bootLines } from '../data'

function ColoredLine({ text }) {
  if (text.includes('UP')) {
    return <>{text.replace('UP', '')}<span className="green">UP</span></>
  }
  if (text.includes('ACTIVE')) {
    return <>{text.replace('ACTIVE', '')}<span className="green">ACTIVE</span></>
  }
  if (text.includes('[OK]')) {
    return <>[<span className="green">OK</span>]{text.replace('[OK]', '').slice(0)}</>
  }
  if (text.includes('yassine@ouhannou')) {
    const parts = text.split('yassine@ouhannou')
    return <>{parts[0]}<span className="cyan">yassine@ouhannou</span>{parts[1]}</>
  }
  return text
}

export default function BootScreen() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const timers = bootLines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 300)
    )
    const hideTimer = setTimeout(() => setHiding(true), 3000)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className={`boot-screen ${hiding ? 'hidden' : ''}`}>
      <div className="boot-text">
        {bootLines.map((line, i) => (
          <p key={i} className={`boot-line ${i < visibleLines ? 'visible' : ''}`}>
            <ColoredLine text={line} />
          </p>
        ))}
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${visibleLines > 0 ? 'active' : ''}`} />
      </div>
    </div>
  )
}
