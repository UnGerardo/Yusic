import Versions from './components/Versions'

function App(): JSX.Element {
  const readdir = async (): Promise<void> => {
    const files: Array<string> = await window.dirApi.readDir()

    console.log(files)
    const s = document.getElementById('player') as HTMLSourceElement
    s.src = files[0].replaceAll('\\', '/')
  }

  return (
    <>
      <section id="options">
        <span>Select Music Folder</span>
      </section>
      <main>
        <section id="groups">
          <span className="group">Tracks</span>
          <span className="group">Artists</span>
          <span className="group">Albums</span>
        </section>
        <section id="items">
          <img src="" alt="" />
          <span>Track Name</span>
          <span>Artist</span>
          <span>Album</span>
          <span>Time</span>
          <audio id="player" src="" controls />
        </section>
      </main>
      <button onClick={readdir}>Readdir</button>
      <Versions></Versions>
    </>
  )
}

export default App
