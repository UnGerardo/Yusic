import { IAudioMetadata } from "music-metadata";
import Track from "./classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useState } from "react";
import playIcon from '@resources/icons/play-solid.svg'
import PlayerControls from "./components/PlayerControls";

function App(): JSX.Element {
  // const [componentType, setComponentType] = useState('track');
  const [items, setItems] = useState<Track[]>([]);
  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;
  const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;

  const readdir = async (): Promise<void> => {
    const filePaths: Array<string> = await window.dirApi.readDir();

    for (const filePath of filePaths) {
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(filePath);
      let pictureData = metadata.common.picture?.at(0)?.data!;
      const track = new Track(metadata, filePath, pictureData ? await window.trackTagsApi.uint8ToBase64(pictureData) : pictureData);
      setItems(prevItems => [
        ...prevItems,
        track
      ]);
    }
  }

  return (
    <>
      <section id="options">
        <button onClick={readdir}>Select Music Folder</button>
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
            clearInterval(updateProgressInterval);
            $audioPlayer.pause();
            $playPauseIcon.src = playIcon;
          }} />))}
        </section>
      </main>
      <PlayerControls updateProgressInterval={updateProgressInterval} setUpdateProgressInterval={setUpdateProgressInterval} />
    </>
  )
}

export default App
