import { useEffect, useRef } from 'react'
import { skills } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

function SkillBar({ name, level }) {
  const barRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          barRef.current.style.width = `${level}%`
        }
      },
      { threshold: 0.3 }
    )
    if (barRef.current) observer.observe(barRef.current.parentElement)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" ref={barRef} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="skills" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> Skills_&amp;_Arsenal
        </h2>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div className={`skill-category ${isVisible ? 'fade-up delay-' + (i + 1) : 'fade-hidden'}`} key={i}>
              <h3 className="skill-cat-title">
                <span className="bracket">[</span> {cat.category} <span className="bracket">]</span>
              </h3>
              <div className="skill-items">
                {cat.items.map((skill, j) => (
                  <SkillBar key={j} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
