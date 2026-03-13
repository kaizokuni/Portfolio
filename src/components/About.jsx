import { useEffect, useRef, useState } from 'react'
import { personalInfo, stats } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

function Counter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          let start = 0
          const duration = 1500
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div className="stat-number" ref={ref}>{count}</div>
}

export default function About() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> About_Me
        </h2>
        <div className={`about-grid ${isVisible ? 'fade-up delay-1' : 'fade-hidden'}`}>
          <div className="terminal-window glow-border">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green-dot" />
              <span className="terminal-title">about.sh</span>
            </div>
            <div className="terminal-body">
              <p><span className="comment">#!/bin/bash</span></p>
              <p><span className="comment"># Personal Information</span></p>
              <p><span className="var">NAME</span>=<span className="string">"{personalInfo.name}"</span></p>
              <p><span className="var">AGE</span>=<span className="number">{personalInfo.age}</span></p>
              <p><span className="var">LOCATION</span>=<span className="string">"{personalInfo.location}"</span></p>
              <p><span className="var">EDUCATION</span>=<span className="string">"{personalInfo.education}"</span></p>
              <p><span className="var">SPECIALIZATION</span>=<span className="string">"{personalInfo.specialization}"</span></p>
              <p><span className="var">YEAR</span>=<span className="string">"{personalInfo.year}"</span></p>
              <br />
              <p><span className="comment"># Languages</span></p>
              <p><span className="var">LANGUAGES</span>=(</p>
              {personalInfo.languages.map((lang, i) => (
                <p key={i}>&nbsp;&nbsp;<span className="string">"{lang}"</span></p>
              ))}
              <p>)</p>
              <br />
              <p><span className="keyword">echo</span> <span className="string">"{personalInfo.bio}"</span></p>
            </div>
          </div>
          <div className="about-stats">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{stat.icon}</div>
                <Counter target={stat.number} />
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
