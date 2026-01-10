import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../styles/contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Animate FAQ items on load
    const faqItems = document.querySelectorAll('.faq-item')
    faqItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, 100 + index * 100)
    })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('Please fill in all required fields', 'error')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error')
      return
    }

    // Create contact object
    const contactData = {
      ...formData,
      timestamp: new Date().toISOString()
    }

    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('jamifyContacts') || '[]')
    contacts.push(contactData)
    localStorage.setItem('jamifyContacts', JSON.stringify(contacts))

    // Show success message
    showNotification('Thank you for contacting us! We will get back to you soon.', 'success')

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })

    console.log('Contact form submitted:', contactData)
  }

  return (
    <>
      <Navbar />

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="contact-container">
        <div className="contact-header">
          <h1><i className="fas fa-envelope"></i> Get In Touch</h1>
          <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    maxLength="10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <i className="fas fa-tag"></i>
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <i className="fas fa-comment"></i>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write your message here..."
                    maxLength="500"
                    required
                  ></textarea>
                  <div className="character-counter">
                    {formData.message.length} / 500 characters
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="info-card">
              <h2>Contact Information</h2>
              <p className="info-description">Feel free to reach out to us through any of these channels</p>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-details">
                  <h3>Address</h3>
                  <p>123 Music Street, Delhi<br />India - 110001</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="info-details">
                  <h3>Phone</h3>
                  <p>+91 9936503035</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p>support@musicvibe.com<br />info@musicvibe.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-details">
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook" onClick={(e) => e.preventDefault()}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon twitter" onClick={(e) => e.preventDefault()}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/__sachin_soni__?igsh=MXZ6aHRxdzhhcHhqMw%3D%3D" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon youtube" onClick={(e) => e.preventDefault()}>
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-question-circle"></i>
                <h3>How do I create an account?</h3>
              </div>
              <p>Click on the "Sign Up" button in the navigation bar and fill in your details to create a free account.</p>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-question-circle"></i>
                <h3>Is Music Vibe free to use?</h3>
              </div>
              <p>Yes! Music Vibe offers a free tier with access to thousands of songs. Premium features are also available.</p>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-question-circle"></i>
                <h3>How can I report a technical issue?</h3>
              </div>
              <p>Use the contact form above and select "Technical Support" as the subject. Our team will assist you promptly.</p>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-question-circle"></i>
                <h3>Can I suggest new features?</h3>
              </div>
              <p>Absolutely! We love hearing from our users. Select "Feedback" in the contact form to share your ideas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section social">
            <h3>FOLLOW US</h3>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/__sachin_soni__" target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/__sachin_soni__?igsh=MXZ6aHRxdzhhcHhqMw%3D%3D" target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/sachin-soni-82539036a/" target="_blank" rel="noopener noreferrer" className="linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/@Fineartclass12" target="_blank" rel="noopener noreferrer" className="youtube" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://discord.com/users/859862454192701450" target="_blank" rel="noopener noreferrer" className="discord" aria-label="Discord"><i className="fab fa-discord"></i></a>
          </div>

          <div className="footer-section company">
            <h3>Music Vibe</h3>
            <p>Bringing you the best music experience worldwide.</p>
            <p><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a> | <a href="#" onClick={(e) => e.preventDefault()}>Terms & Conditions</a></p>
          </div>

          <div className="footer-section links">
            <h3>USEFUL LINKS</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/trending">Trending</a></li>
              <li><a href="/feedback">Feedback</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section-contact">
            <h3 id="contact">CONTACT US</h3>
            <p><i className="fas fa-map-marker-alt"></i> 123 Music Street, Delhi</p>
              <p><i className="fas fa-phone"></i> +91 9936503035</p>
            <p><i className="fas fa-envelope"></i> support@musicvibe.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Music Vibe. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Contact

