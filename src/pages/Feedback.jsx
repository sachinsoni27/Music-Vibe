import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { submitFeedback } from '../services/api'
import '../styles/auth.css'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 0
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    // Auto-fill if user is logged in
    if (user) {
      const userEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || ''
      setFormData(prev => ({
        ...prev,
        name: user.fullName || user.firstName || user.username || '',
        email: userEmail
      }))
    }
  }, [user])

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 5000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRating = (rating) => {
    setFormData({ ...formData, rating })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.rating === 0) {
      showMessage('❌ Please select a rating', 'error')
      setLoading(false)
      return
    }

    try {
      const feedbackData = {
        ...formData,
        userId: user?.id || null
      }

      const data = await submitFeedback(feedbackData)

      if (data.success) {
        showMessage('✅ Thank you for your feedback!', 'success')
        setFormData({
          name: user?.fullName || user?.username || '',
          email: user?.email || '',
          subject: '',
          message: '',
          rating: 0
        })
      } else {
        showMessage('❌ ' + (data.message || 'Failed to submit feedback'), 'error')
      }
    } catch (error) {
      showMessage('❌ ' + error.message, 'error')
    }

    setLoading(false)
  }

  return (
    <div className="auth-container" style={{ maxWidth: '600px' }}>
      <div className="auth-box">
        <div className="logo-section">
          <div className="auth-logo"></div>
          <h1>We Value Your Feedback</h1>
          <p>Help us improve your music experience</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
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
            <label htmlFor="subject">
              <i className="fas fa-tag"></i>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              required
            />
          </div>

          <div className="form-group rating-group">
            <label>
              <i className="fas fa-star"></i>
              Rate Your Experience
            </label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fas fa-star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => handleRating(star)}
                  style={{ cursor: 'pointer' }}
                ></i>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              <i className="fas fa-comment"></i>
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you think..."
              required
              style={{ minHeight: '120px', resize: 'vertical' }}
            ></textarea>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            <i className="fas fa-paper-plane"></i> 
            {loading ? ' Submitting...' : ' Submit Feedback'}
          </button>

          <div className="switch-auth">
            <p><Link to="/">← Back to Home</Link></p>
          </div>
        </form>

        {message.text && (
          <div className={`message-box ${message.type}`} style={{ display: 'block' }}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feedback

