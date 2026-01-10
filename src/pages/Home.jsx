import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MusicPlayer from '../components/MusicPlayer'
import PlaylistSection from '../components/PlaylistSection'
import Footer from '../components/Footer'
import '../styles/index.css'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize GSAP animations if needed
    if (window.gsap) {
      window.gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
      })
    }
  }, [])

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="bg-video">
          <video src="/Music_Website_Intro_Video_Creation.mp4" autoPlay muted loop></video>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <div className="jamify-logo"></div>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">Music Vibe</span>
          </h1>
          <p className="hero-subtitle">
            Your Ultimate Music Streaming Experience
          </p>

          <div className="hero-stats">
            <div className="stat-box">
              <i className="fas fa-music"></i>
              <h3>10,000+</h3>
              <p>Songs</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-users"></i>
              <h3>500+</h3>
              <p>Artists</p>
            </div>
            <div className="stat-box">
              <i className="fas fa-list"></i>
              <h3>100+</h3>
              <p>Playlists</p>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/trending')}>
              <i className="fas fa-play"></i> Start Listening
            </button>
            <button className="btn-secondary" onClick={() => {
              document.getElementById('playlists').scrollIntoView({ behavior: 'smooth' })
            }}>
              <i className="fas fa-compass"></i> Explore Playlists
            </button>
          </div>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />

      {/* Playlists Section */}
      <PlaylistSection />

      {/* Footer */}
      <Footer />

      {/* Load GSAP */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
    </div>
  )
}

export default Home

