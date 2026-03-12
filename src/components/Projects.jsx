import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title"><span className="hash">#</span> Projects_&amp;_Exploits</h2>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className="project-card" key={i}>
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
              <div className="project-status">
                <span className="status-dot active" /> Completed
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
