import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import Playlist from '../components/Playlist'

function PlaylistPage() {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <section className="section-container">
          <h1 style={{ color: 'white', marginBottom: 16 }}>Playlists</h1>
          <Playlist />
        </section>
      </main>

      <MusicPlayer />
      <Footer />
    </>
  )
}

export default PlaylistPage;
