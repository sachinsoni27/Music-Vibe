import '../styles/auth.css'
import { SignUp } from '@clerk/clerk-react'

const Signup = () => {

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <div className="auth-logo"></div>
          <h1>Create Account</h1>
          <p>Join Music Vibe and start your music journey</p>
        </div>

        <div className="auth-form">
          {/* Clerk SignUp component (keeps the same layout & CSS) */}
          <SignUp />
        </div>


      </div>
    </div>
  )
}

export default Signup

