import { useEffect, useRef } from 'react'
import { skills } from '../data'

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
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div className="skill-fill" ref={barRef} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title"><span className="hash">#</span> Skills_&amp;_Arsenal</h2>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div className="skill-category" key={i}>
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
