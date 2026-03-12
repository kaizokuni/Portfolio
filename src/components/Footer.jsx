import { personalInfo } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            <span className="comment">/* Designed & Built by Yassine Ouhannou | 2025 */</span>
          </p>
          <div className="footer-links">
            <a href={`mailto:${personalInfo.email}`} className="footer-link">[Email]</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="footer-link">[LinkedIn]</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
