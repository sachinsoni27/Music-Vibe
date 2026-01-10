import { Link, useNavigate } from 'react-router-dom'
import { useUser, UserButton, SignInButton, SignUpButton, useClerk } from '@clerk/clerk-react' 

const Navbar = () => {
  const { user, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const isClerkAvailable = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
  const navigate = useNavigate()


  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Music Vibe" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link id="links" to="/">Home</Link>
        <Link id="links" to="/playlists">Playlists</Link>
        <Link id="links" to="/trending">Trending</Link>
        <Link id="links" to="/feedback">Feedback</Link>
        <Link id="links" to="/contact">Contact</Link>
        
        {isSignedIn ? (
          <span id="userSection">
            <UserButton />
          </span>
        ) : (
          <span id="userSection">
            <SignInButton mode="modal">
              <button type="button" className="nav-auth-btn">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button" className="nav-auth-btn secondary">Sign up</button>
            </SignUpButton>
          </span>
        )} 
      </div>
    </nav>
  )
}

export default Navbar

