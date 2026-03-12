import { useState, useEffect } from 'react'
import { roles } from '../data'

export default function Hero() {
  const [roleText, setRoleText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    const speed = deleting ? 40 : 80

    if (!deleting && charIdx === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(pause)
    }

    if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIdx((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setRoleText(current.substring(0, deleting ? charIdx - 1 : charIdx + 1))
      setCharIdx((prev) => prev + (deleting ? -1 : 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx])

  return (
    <section id="home" className="section hero">
      <div className="hero-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green-dot" />
            <span className="terminal-title">yassine@kali:~</span>
          </div>
          <div className="terminal-body">
            <p><span className="prompt-symbol">$</span> whoami</p>
            <h1 className="glitch" data-text="Yassine Ouhannou">Yassine Ouhannou</h1>
            <p><span className="prompt-symbol">$</span> cat role.txt</p>
            <p className="typing-text">
              {roleText}<span className="blink">|</span>
            </p>
            <p><span className="prompt-symbol">$</span> cat mission.txt</p>
            <p className="subtitle">&gt; Cybersecurity Engineering Student at <span className="cyan">EMSI Rabat</span></p>
            <p className="subtitle">&gt; Specializing in network security, ethical hacking &amp; secure development</p>
            <p className="subtitle">&gt; Hardening systems. Breaking barriers. Building defenses.</p>
            <p className="cmd-line"><span className="prompt-symbol">$</span> <span className="blink">_</span></p>
          </div>
        </div>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            <span className="btn-icon">&gt;_</span> View Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            <span className="btn-icon">[~]</span> Contact Me
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>scroll_down</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
