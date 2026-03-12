import { useState, useEffect } from 'react'
import { navLinks } from '../data'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScroll && current > 100)
      setLastScroll(current)

      // Track active section
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop - 200 <= current) {
          setActiveSection('#' + sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  return (
    <nav className={`navbar ${hidden ? 'nav-hidden' : ''}`}>
      <div className="nav-logo">
        <span className="cyan">root@yassine</span>
        <span className="blink">:~$</span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`nav-cmd ${activeSection === href ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </div>
    </nav>
  )
}
