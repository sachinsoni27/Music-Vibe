function Playlist() {
  return (
    <div style={{ color: "white", padding: "40px" }}>
      <video
        src="/Music_Website_Intro_Video_Creation.mp4"
        controls
        style={{ maxWidth: '100%', display: 'block', marginBottom: 16 }}
        poster="/background.png"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      <div>Playlist component loaded successfully</div>
    </div>
  );
}

export default Playlist;
