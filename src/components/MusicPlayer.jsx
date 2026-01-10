import { useState, useRef, useEffect } from 'react'
import { useMusic } from '../context/MusicContext'

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, audioRef } = useMusic()
  const [currentTime, setCurrentTime] = useState('0:00')
  const [totalTime, setTotalTime] = useState('0:00')
  const [volume, setVolume] = useState(70)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  const progressRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      const current = formatTime(audio.currentTime)
      const total = formatTime(audio.duration)
      setCurrentTime(current)
      setTotalTime(total)

      if (progressRef.current) {
        const progress = (audio.currentTime / audio.duration) * 100
        progressRef.current.style.width = `${progress || 0}%`
      }
    }

    const handleEnded = () => {
      playNext()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [playNext])

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio) return
    const progressContainer = e.currentTarget
    const clickX = e.nativeEvent.offsetX
    const width = progressContainer.offsetWidth
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
  }

  const displaySong = currentSong || {
    title: 'No song playing',
    artist: 'Select a song to play',
    image: ''
  }

  const thumbnailUrl = displaySong.image ? (displaySong.image.startsWith('http') ? displaySong.image : `/${displaySong.image}`) : null

  return (
    <div className="musicplayer" id="musicPlayer">
      <div className="played-songs">
        <div className="player-thumbnail" id="playerThumbnail"
             style={{ backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : 'none' }}>
        </div>
        <div className="song-details">
          <p className="song-title" id="currentSongTitle">{displaySong.title}</p>
          <p className="song-artist" id="currentSongArtist">{displaySong.artist}</p>
        </div>
      </div>

      <div className="song-controls">
        <div className="liked">
          <i className={`fa-solid fa-heart ${isLiked ? 'liked-active' : ''}`}
             onClick={() => setIsLiked(!isLiked)}></i>
        </div>
        <div className="controls">
          <div className="player_controls">
            <button className="control-btn" id="prevBtn" onClick={playPrevious}>
              <i className="fa-solid fa-backward-step"></i>
            </button>
            <button className={`control-btn play-pause-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
              <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="control-btn" id="nextBtn" onClick={playNext}>
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>
          <div className="progress-section">
            <span className="time-current">{currentTime}</span>
            <div className="progress-container" onClick={handleProgressClick}>
              <div id="progress-bar" ref={progressRef}></div>
            </div>
            <span className="time-total">{totalTime}</span>
          </div>
        </div>
      </div>
      
      <div className="speaker">
        <div className="volume-icon">
          <i className={`fa-solid fa-volume-${volume > 50 ? 'high' : volume > 0 ? 'low' : 'mute'}`}></i>
        </div>
        <input 
          type="range" 
          name="volume" 
          id="volumeSlider" 
          min="0" 
          max="100" 
          value={volume}
          onChange={handleVolumeChange}
        />
        <div className="extra-controls">
          <button 
            className={`control-btn ${isShuffle ? 'active' : ''}`} 
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button 
            className={`control-btn ${isRepeat ? 'active' : ''}`} 
            onClick={() => setIsRepeat(!isRepeat)}
          >
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default MusicPlayer

