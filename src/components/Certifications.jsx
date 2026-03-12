import { certifications } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Certifications() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="certifications" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> Certifications_&amp;_Badges
        </h2>
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div className={`cert-card ${isVisible ? 'fade-up delay-' + ((i % 3) + 1) : 'fade-hidden'}`} key={i}>
              <div className="cert-badge">{cert.badge}</div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
              {cert.tags && (
                <div className="cert-tags">
                  {cert.tags.map((tag, j) => (
                    <span className="tag" key={j}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
