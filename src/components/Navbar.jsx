import { useState, useEffect } from 'react'
import { navLinks } from '../data'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHidden(current > lastScroll && current > 100)
      setLastScroll(current)
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
              className="nav-cmd"
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
