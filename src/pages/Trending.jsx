import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import MusicPlayer from '../components/MusicPlayer'
import Footer from '../components/Footer'
import JamendoTracks from '../components/JamendoTracks'
import { useMusic } from '../context/MusicContext'
import '../styles/index.css'
import '../styles/trending.css'

// Artist images
import darshanImg from '../Artist/darshan.jpeg'
import arijitImg from '../Artist/arijit singh.jpeg'
import jubinImg from '../Artist/jubin nautiyal.jpeg'
import gajendraImg from '../Artist/gajendra verma.jpeg'
import anuvImg from '../Artist/Anuv Jain.jpg'

// Song images
import arzKiyaHaiImg from '../songs/arz kiya hai.jpg'
import mahiyeJinnaImg from '../songs/mahiye jinna sohna.jpg'
import aabaadBarbadImg from '../songs/aabad barbad.jpg'

const Trending = () => {
  const { setPlaylistAndPlay, currentSong, isPlaying } = useMusic()
  const [activeFilter, setActiveFilter] = useState('all')

  // -------------------- TRENDING SONGS --------------------
  const [trendingSongs] = useState([
    {
      id: 1,
      title: 'Arz Kiya Hai',
      artist: 'Coke Studio',
      image: arzKiyaHaiImg,
      audio: 'Arz Kiya Hai _ Coke Studio Bharat - (Raag.Fm) (1).mp3',
      plays: '2.5M',
      duration: '4:32',
      trend: 'up',
      genre: 'Classical'
    },
    {
      id: 2,
      title: 'Jhol',
      artist: 'Diljit Dosanjh',
      image: darshanImg,
      audio: 'Jhol(KoshalWorld.Com).mp3',
      plays: '3.2M',
      duration: '3:45',
      trend: 'up',
      genre: 'Punjabi'
    },
    {
      id: 3,
      title: 'Mahiye Jinna Sohna',
      artist: 'Diljit Dosanjh',
      image: mahiyeJinnaImg,
      audio: 'Mahiye Jinna Sohna_320(PagalWorld.com.sb).mp3',
      plays: '4.1M',
      duration: '3:58',
      trend: 'up',
      genre: 'Punjabi'
    },
    {
      id: 4,
      title: 'Barbaad',
      artist: 'Jubin Nautiyal',
      image: jubinImg,
      audio: 'Barbaad Saiyaara 320 Kbps.mp3',
      plays: '1.8M',
      duration: '4:15',
      trend: 'same',
      genre: 'Romantic'
    },
    {
      id: 5,
      title: 'Aabaad Barbaad',
      artist: 'Arijit Singh',
      image: aabaadBarbadImg,
      audio: 'Aabaad Barbaad - Arijit Singh.mp3',
      plays: '5.6M',
      duration: '4:20',
      trend: 'up',
      genre: 'Romantic'
    },
    {
      id: 6,
      title: 'Saiyaara',
      artist: 'Mohit Chauhan',
      image: arijitImg,
      audio: 'Title Track Saiyaara 320 Kbps.mp3',
      plays: '2.9M',
      duration: '5:10',
      trend: 'down',
      genre: 'Romantic'
    },
    {
      id: 7,
      title: 'Baarishon Mein',
      artist: 'Darshan Raval',
      image: darshanImg,
      audio: 'Baarishon Mein Darshan Raval 320 Kbps.mp3',
      plays: '3.7M',
      duration: '3:22',
      trend: 'up',
      genre: 'Pop'
    },
    {
      id: 8,
      title: 'Hawa Banke',
      artist: 'Darshan Raval',
      image: darshanImg,
      audio: 'Hawa Banke - Darshan Raval-(PagalWorld.Ink).mp3',
      plays: '4.5M',
      duration: '3:50',
      trend: 'up',
      genre: 'Pop'
    },
    {
      id: 9,
      title: 'Tera Ho Gaya',
      artist: 'Atif Aslam',
      image: arijitImg,
      audio: 'Tera Ho Gaya_320(PagalWorld.com.sb).mp3',
      plays: '2.1M',
      duration: '4:05',
      trend: 'same',
      genre: 'Romantic'
    },
    {
      id: 10,
      title: 'Asal Mein',
      artist: 'Darshan Raval',
      image: darshanImg,
      audio: 'Asal Mein Asal Mein Single 320 Kbps.mp3',
      plays: '3.3M',
      duration: '3:40',
      trend: 'up',
      genre: 'Pop'
    }
  ])

  // -------------------- TRENDING ARTISTS --------------------
  const [trendingArtists] = useState([
    { id: 1, name: 'Darshan Raval', image: darshanImg, songs: 25, followers: '5.2M', verified: true, rank: 1 },
    { id: 2, name: 'Arijit Singh', image: arijitImg, songs: 150, followers: '12.8M', verified: true, rank: 2 },
    { id: 3, name: 'Jubin Nautiyal', image: jubinImg, songs: 45, followers: '3.9M', verified: true, rank: 3 },
    { id: 4, name: 'Gajendra Verma', image: gajendraImg, songs: 30, followers: '2.1M', verified: true, rank: 4 },
    { id: 5, name: 'Anuv Jain', image: anuvImg, songs: 20, followers: '1.5M', verified: true, rank: 5 }
  ])

  const handleSongClick = (song, index) => {
    setPlaylistAndPlay(trendingSongs, index)
  }

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('animate-in')),
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <i className="fas fa-arrow-up trend-up"></i>
    if (trend === 'down') return <i className="fas fa-arrow-down trend-down"></i>
    return <i className="fas fa-minus trend-same"></i>
  }

  return (
    <div className="trending-page">
      <Navbar />

      {/* HERO */}
      <div className="trending-hero">
        <div className="trending-hero-overlay" />
        <div className="trending-hero-content">
          <div className="trending-badge">
            <i className="fas fa-fire"></i> HOT THIS WEEK
          </div>
          <h1 className="trending-hero-title">
            <span className="gradient-text">Trending Now</span>
          </h1>
          <p className="trending-hero-subtitle">
            Discover the hottest tracks and artists dominating the charts
          </p>
        </div>
      </div>

      {/* ARTISTS */}
      <div className="section-container animate-on-scroll">
        <h3 className="section-title"><i className="fas fa-star"></i> Popular Artists</h3>
        <div className="artist-sec">
          {trendingArtists.map((artist) => (
            <div key={artist.id} className="artist-contain">
              <div className="artist-card1" style={{ backgroundImage: `url(${artist.image})` }} />
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>{artist.followers} followers</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SONGS */}
      <div className="section-container animate-on-scroll">
        <h3 className="section-title"><i className="fas fa-music"></i> Trending Songs</h3>

        <div className="filter-buttons">
          {['all', 'Romantic', 'Pop', 'Punjabi', 'Classical'].map((g) => (
            <button
              key={g}
              className={`filter-btn ${activeFilter === g ? 'active' : ''}`}
              onClick={() => setActiveFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="songs-sec">
          {trendingSongs
            .filter((s) => activeFilter === 'all' || s.genre === activeFilter)
            .map((song, index) => (
              <div key={song.id} className="songs-contain" onClick={() => handleSongClick(song, index)}>
                <div className="song-rank-badge">
                  #{index + 1} {getTrendIcon(song.trend)}
                </div>
                <div
                  className={`songs-card1 ${currentSong?.id === song.id ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${song.image})` }}
                >
                  <div className="play-overlay">
                    <i className={`fas fa-${currentSong?.id === song.id && isPlaying ? 'pause' : 'play'}-circle`} />
                  </div>
                </div>
                <div className="song-card-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* JAMENDO SEARCH (ISOLATED) */}
      <JamendoTracks />

      <Footer />
      <MusicPlayer />
    </div>
  )
}

export default Trending
