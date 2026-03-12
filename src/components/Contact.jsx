import { useState } from 'react'
import { personalInfo } from '../data'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title"><span className="hash">#</span> Contact_&amp;_Connect</h2>
        <div className="contact-grid">
          <div className="terminal-window">
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
              <p><span className="prompt-symbol">$</span> echo <span className="string">"Open to internship &amp; collaboration opportunities"</span></p>
              <p className="green">&gt; Open to internship &amp; collaboration opportunities</p>
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
            <button type="submit" className="btn btn-primary">
              {sent ? '[+] Message Sent!' : <><span className="btn-icon">&gt;_</span> Send_Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
