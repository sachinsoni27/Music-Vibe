import React, { useState } from 'react'
import '../styles/playlist-modal.css'
import { useMusic } from '../context/MusicContext'

const AddToPlaylistModal = ({ open, onClose, song, onAdded }) => {
  const { userPlaylists, addSongToPlaylist, setUserPlaylists } = useMusic()
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [message, setMessage] = useState(null)

  if (!open) return null

  const handleAddTo = (playlistId) => {
    if (!song) return
    setAdding(true)
    addSongToPlaylist(playlistId, song)
    setMessage('Added!')
    // find playlist name for callback
    const pl = (userPlaylists || []).find(p => p.id === playlistId)
    setTimeout(() => {
      setMessage(null)
      setAdding(false)
      onAdded && onAdded(playlistId, pl ? pl.name : undefined)
      onClose()
    }, 900)
  }

  const handleCreate = () => {
    const name = newName.trim()
    if (!name) return
    const newPl = {
      id: `pl_${Date.now()}`,
      name,
      songs: []
    }

    // If there's a selected song to add, attach it to the new playlist immediately
    if (song) {
      const newSong = { ...song, id: `${Date.now()}-${Math.floor(Math.random() * 1000)}` }
      newPl.songs = [newSong]
    }

    setUserPlaylists((prev) => [...prev, newPl])
    setNewName('')

    // If we already added the song into the new playlist object, treat as added
    if (song) {
      setMessage('Created playlist and added song!')
      setTimeout(() => {
        setMessage(null)
        onAdded && onAdded(newPl.id)
        onClose()
      }, 900)
      return
    }

    // otherwise auto-add to newly created playlist when no song selected
    handleAddTo(newPl.id)
  }

  // close on escape
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="playlist-modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="playlist-modal" role="document">
        <header className="playlist-modal-header">
          <h3>Add to Playlist</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="playlist-modal-body">
          {song && (
            <div className="modal-song">
              <img src={song.image || '/placeholder-track.png'} alt={song.title} />
              <div>
                <strong>{song.title}</strong>
                <div className="muted">{song.artist}</div>
              </div>
            </div>
          )}

          <div className="playlist-list">
            {(!userPlaylists || userPlaylists.length === 0) && (
              <div className="empty">No playlists found. Create one below.</div>
            )}

            {(userPlaylists || []).map((pl) => (
              <div key={pl.id} className="playlist-item">
                <div className="playlist-meta">
                  <div className="playlist-name">{pl.name}</div>
                  <div className="playlist-count">{pl.songs?.length || 0} songs</div>
                </div>
                <button className="btn small" onClick={() => handleAddTo(pl.id)} disabled={adding}>
                  {adding ? 'Adding...' : 'Add'}
                </button>
              </div>
            ))}
          </div>

          <div className="playlist-create">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New playlist name"
              aria-label="New playlist name"
            />
            <button className="btn" onClick={handleCreate}>Create & Add</button>
          </div>

          {message && <div className="playlist-message">{message}</div>}
        </div>

      </div>
    </div>
  )
}

export default AddToPlaylistModal
