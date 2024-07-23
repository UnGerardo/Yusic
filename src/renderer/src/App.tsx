import Versions from './components/Versions'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

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
        </section>
      </main>
      {/* <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
        Send IPC
      </a>
      <Versions></Versions> */}
    </>
  )
}

export default App
