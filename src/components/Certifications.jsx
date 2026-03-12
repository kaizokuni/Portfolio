import { certifications } from '../data'

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <h2 className="section-title"><span className="hash">#</span> Certifications_&amp;_Badges</h2>
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div className="cert-card" key={i}>
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
