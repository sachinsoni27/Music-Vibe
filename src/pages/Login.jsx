import '../styles/auth.css'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <div className="auth-logo"></div>
          <h1>Welcome Back</h1>
          <p>Login to continue your music journey</p>
        </div>

        <div className="auth-form">
          {/* Clerk SignIn component (uses Clerk styling internally) */}
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Login

