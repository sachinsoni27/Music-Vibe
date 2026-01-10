import React, { useEffect, useState } from 'react'
import '../styles/index.css'
import '../styles/jamendo.css' 
import { useMusic } from '../context/MusicContext'
import AddToPlaylistModal from './AddToPlaylistModal'
const JamendoTracks = () => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [addedMsg, setAddedMsg] = useState(null)

  const { userPlaylists, addSongToPlaylist, playSong, togglePlay, isPlaying, currentSong } = useMusic()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)

  const isSameTrack = (track) => {
    if (!currentSong) return false
    return (currentSong.id && `${currentSong.id}` === `${track.id}`) || (currentSong.audio && currentSong.audio === track.audio)
  }

  const handlePlayToggle = (track) => {
    if (isSameTrack(track)) {
      togglePlay()
    } else {
      const songObj = {
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        audio: track.audio,
        image: track.album_image || track.album?.image || track.artist_image || track.image || ''
      }
      playSong(songObj)
    }
  }

  // Fetch helper that supports an optional search query
  const fetchTracks = async (search = '') => {
    const controller = new AbortController()
    try {
      setLoading(true)
      setError(null)
      const q = search ? `&search=${encodeURIComponent(search)}` : ''
      const res = await fetch(
        `https://api.jamendo.com/v3.0/tracks?client_id=364ed607&format=json&limit=10${q}`,
        { signal: controller.signal }
      )
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      // Jamendo returns results array
      setTracks(data.results || [])
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message)
    } finally {
      setLoading(false)
    }
    return () => controller.abort()
  }

  useEffect(() => {
    // initial load: recent tracks
    fetchTracks()
    // no cleanup needed for top-level initial load
  }, [])

  if (loading) return <div className="jamendo-section">Loading Jamendo tracks...</div>
  if (error) return <div className="jamendo-section">Error loading Jamendo tracks: {error}</div>

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) fetchTracks(q)
    else fetchTracks()
  }

  return (
    <div className="jamendo-section">
      <div className="section-header">
        <h3 className="section-title"><i className="fas fa-compact-disc"></i> Jamendo Picks</h3>
        {query && <p className="section-subtitle">{`Results for "${query}"`}</p>}
      </div>

      <form className="jamendo-search" onSubmit={handleSubmit} aria-label="Jamendo search">
        <input
          type="search"
          placeholder="Search songs or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="jamendo-search-input"
          aria-label="Search Jamendo tracks"
        />
        <button type="submit" className="jamendo-search-btn">Search</button>
        {query && (
          <button
            type="button"
            className="jamendo-clear-btn"
            onClick={() => { setQuery(''); fetchTracks(); }}
          >
            Clear
          </button>
        )}
      </form>

      {tracks.length === 0 ? (
        <div className="jamendo-no-results">No tracks found{query ? ` for "${query}"` : ''}.</div>
      ) : (
        <div className="jamendo-tracks">
          {tracks.map((track) => {
            const image = track.album_image || track.album?.image || track.artist_image || track.image || ''
            return (
              <div key={track.id} className="jamendo-track">
                <div className="jamendo-track-left">
                  <img
                    src={image || '/placeholder-track.png'}
                    alt={track.name}
                    className="jamendo-artwork"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-track.png' }}
                  />
                  <div className="jamendo-track-info">
                    <h4 className="jamendo-track-name">{track.name}</h4>
                    <p className="jamendo-artist">{track.artist_name}</p>
                  </div>
                </div>

                <div className="jamendo-track-right">
                  <div className="jamendo-play-action">
                    <button
                      className={`jamendo-play-btn ${isSameTrack(track) && isPlaying ? 'playing' : ''}`}
                      onClick={() => handlePlayToggle(track)}
                      aria-pressed={isSameTrack(track) && isPlaying}
                      aria-label={isSameTrack(track) && isPlaying ? 'Pause track' : 'Play track'}
                    >
                      <i className={`fa-solid fa-${isSameTrack(track) && isPlaying ? 'pause' : 'play'}`}></i>
                    </button>
                    {isSameTrack(track) && isPlaying && (
                      <div className="jamendo-now-playing">Playing</div>
                    )}
                  </div>

                  <div className="jamendo-add">
                    <button
                      className="jamendo-add-btn"
                      onClick={() => {
                        if (!userPlaylists || userPlaylists.length === 0) {
                          // open modal where user can create playlist
                          setSelectedTrack({
                            title: track.name,
                            artist: track.artist_name,
                            audio: track.audio,
                            image: image
                          })
                          setModalOpen(true)
                          return
                        }

                        if (userPlaylists.length === 1) {
                          addSongToPlaylist(userPlaylists[0].id, {
                            title: track.name,
                            artist: track.artist_name,
                            audio: track.audio,
                            image: image
                          })
                          setAddedMsg(`Added to ${userPlaylists[0].name}`)
                          setTimeout(() => setAddedMsg(null), 2000)
                          return
                        }

                        // Multiple playlists available — open modal to choose
                        setSelectedTrack({
                          title: track.name,
                          artist: track.artist_name,
                          audio: track.audio,
                          image: image
                        })
                        setModalOpen(true)
                      }}
                      title="Add to playlist"
                    >
                      <i className="fas fa-plus"></i> Add
                    </button>
                    {addedMsg && <div className="jamendo-added-msg">{addedMsg}</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <AddToPlaylistModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedTrack(null) }}
        song={selectedTrack}
        onAdded={(plId, plName) => {
          if (!selectedTrack) return
          setAddedMsg(plName ? `Added to ${plName}` : `Added to playlist`)
          setTimeout(() => setAddedMsg(null), 1800)
          setModalOpen(false)
          setSelectedTrack(null)
        }}
      />

    </div>
  )
}

export default JamendoTracks
