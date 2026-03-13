import { useState } from 'react'
import { personalInfo } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [ref, isVisible] = useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="container" ref={ref}>
        <h2 className={`section-title ${isVisible ? 'fade-up' : 'fade-hidden'}`}>
          <span className="hash">#</span> Contact_&amp;_Connect
        </h2>
        <div className={`contact-grid ${isVisible ? 'fade-up delay-1' : 'fade-hidden'}`}>
          <div className="terminal-window glow-border">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green-dot" />
              <span className="terminal-title">contact.sh</span>
            </div>
            <div className="terminal-body">
              <p><span className="prompt-symbol">$</span> cat contact_info.txt</p>
              <br />
              <p><span className="var">EMAIL</span>: <a href={`mailto:${personalInfo.email}`} className="link">{personalInfo.email}</a></p>
              <p><span className="var">PHONE</span>: <span className="string">{personalInfo.phone}</span></p>
              <p><span className="var">LOCATION</span>: <span className="string">{personalInfo.location}</span></p>
              <p><span className="var">LINKEDIN</span>: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="link">ouhannou-yassine</a></p>
              <br />
              <p><span className="prompt-symbol">$</span> echo <span className="string">"Open to opportunities in cybersecurity"</span></p>
              <p className="green">&gt; Open to opportunities in cybersecurity</p>
              <p className="cmd-line"><span className="prompt-symbol">$</span> <span className="blink">_</span></p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label><span className="prompt-symbol">$</span> enter_name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label><span className="prompt-symbol">$</span> enter_email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label><span className="prompt-symbol">$</span> enter_message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="5"
                placeholder="Your message here..."
                required
              />
            </div>
            <button type="submit" className={`btn btn-primary glow-hover ${sent ? 'btn-success' : ''}`}>
              {sent ? '[+] Message Sent!' : <><span className="btn-icon">&gt;_</span> Send_Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
