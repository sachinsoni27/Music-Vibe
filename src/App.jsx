import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './context/MusicContext'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feedback from './pages/Feedback'
import Trending from './pages/Trending'
import Contact from './pages/Contact'
import AdminFeedback from './pages/AdminFeedback'
import TestDatabase from './pages/TestDatabase'
import './App.css'

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-feedback" element={<AdminFeedback />} />
          <Route path="/test-database" element={<TestDatabase />} />
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
