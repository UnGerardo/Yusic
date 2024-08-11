import { IAudioMetadata } from "music-metadata";
import Track from "./classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useState } from "react";

function App(): JSX.Element {
  // const [componentType, setComponentType] = useState('track');
  const [items, setItems] = useState<Track[]>([]);

  const readdir = async (): Promise<void> => {
    const files: Array<string> = await window.dirApi.readDir();

    console.log(files);
    const s = document.getElementById('player') as HTMLSourceElement;
    s.src = files[0].replaceAll('\\', '/');

    for (const file of files) {
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(file);
      const track = new Track(metadata, await window.trackTagsApi.uint8ToBase64(metadata.common.picture?.at(0)?.data!))
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
            <img src="" alt="" />
            <span>Track Name</span>
            <span>Artist</span>
            <span>Album</span>
            <span>Time</span>
          </section>
          {items.map(item => (<TrackComponent track={item} />))}
        </section>
      </main>
      <audio id="player" src="" controls />
      <button onClick={readdir}>Readdir</button>
    </>
  )
}

export default App
