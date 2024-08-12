import { IAudioMetadata } from "music-metadata";
import Track from "./classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useState } from "react";

function App(): JSX.Element {
  // const [componentType, setComponentType] = useState('track');
  const [items, setItems] = useState<Track[]>([]);

  const readdir = async (): Promise<void> => {
    const filePaths: Array<string> = await window.dirApi.readDir();

    for (const filePath of filePaths) {
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(filePath);
      const track = new Track(metadata, filePath, await window.trackTagsApi.uint8ToBase64(metadata.common.picture?.at(0)?.data!))
      setItems(prevItems => [
        ...prevItems,
        track
      ]);
    }
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
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p>Album</p>
            <p className="track-duration">Time</p>
          </section>
          {items.map(item => (<TrackComponent track={item} onClick={() => {
            const s = document.getElementById('player') as HTMLSourceElement;
            s.src = item.filePath;
          }} />))}
        </section>
      </main>
      <audio id="player" src="" controls />
      <button onClick={readdir}>Readdir</button>
    </>
  )
}

export default App
