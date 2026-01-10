import Navbar from '../components/Navbar'
import PlaylistSection from '../components/PlaylistSection'
import Footer from '../components/Footer'

function Playlist() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '40px 20px', minHeight: '60vh' }}>
        <PlaylistSection />
      </main>
      <Footer />
    </>
  )
}

export default Playlist;
