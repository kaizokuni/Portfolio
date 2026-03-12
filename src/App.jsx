import { useState, useCallback } from 'react'
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
  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <>
      {!booted ? (
        <BootScreen onComplete={handleBootComplete} />
      ) : (
        <>
          <MatrixRain />
          <div className="app-container">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App
