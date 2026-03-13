import { experiences } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Experience() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> Experience_Log
        </h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className={`timeline-item ${isVisible ? 'fade-up delay-' + (i + 1) : 'fade-hidden'}`} key={i}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-date">[{exp.date}]</span>
                </div>
                <p className="timeline-company">
                  <span className="cyan">{exp.company}</span> — {exp.location}
                </p>
                <ul className="timeline-details">
                  {exp.details.map((detail, j) => (
                    <li key={j}><span className="bullet">&gt;</span> {detail}</li>
                  ))}
                </ul>
                {exp.tags.length > 0 && (
                  <div className="timeline-tags">
                    {exp.tags.map((tag, j) => (
                      <span className="tag" key={j}>{tag}</span>
                    ))}
                  </div>
                )}
                {exp.current && <div className="current-badge">Currently Active</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
