import { experiences } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title"><span className="hash">#</span> Experience_Log</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className="timeline-item" key={i}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
