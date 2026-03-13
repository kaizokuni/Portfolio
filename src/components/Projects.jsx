import { projects } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Projects() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> Projects_&amp;_Exploits
        </h2>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className={`project-card ${isVisible ? 'fade-up delay-' + ((i % 3) + 1) : 'fade-hidden'}`} key={i}>
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag, j) => (
                  <span className="tag" key={j}>{tag}</span>
                ))}
              </div>
              <div className={`project-status ${project.current ? 'status-current' : ''}`}>
                <span className={`status-dot ${project.current ? 'in-progress' : 'active'}`} />
                {project.current ? 'In Progress' : 'Completed'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
