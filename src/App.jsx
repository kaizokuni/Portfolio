import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MatrixRain from './components/MatrixRain'

function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <MatrixRain />
      <div className="scanline" />
      {!booted && <BootScreen />}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App
