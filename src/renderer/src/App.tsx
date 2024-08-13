import { IAudioMetadata } from "music-metadata";
import Track from "./classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useState } from "react";
import playIcon from '../../../resources/icons/play-solid.svg'
import pauseIcon from '../../../resources/icons/pause-solid.svg'
import backwardStepIcon from '../../../resources/icons/backward-step-solid.svg'
import forwardStepIcon from '../../../resources/icons/forward-step-solid.svg'

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

  const playPauseTrack = () => {
    const $audioPlayer = document.getElementById('player') as HTMLAudioElement;
    const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;

    if ($playPauseIcon.src === playIcon) {
      $audioPlayer.play();
      $playPauseIcon.src = pauseIcon;
    } else {
      $audioPlayer.pause();
      $playPauseIcon.src = playIcon;
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
          }} />))}
        </section>
      </main>
      <section id="player-controls">
        <audio id="player" src="" controls />
        <section id="controls">
          <img src={backwardStepIcon} alt="Previous" id="previous-song-icon" height={15} />
          <section id="play-pause-icon-bg" onClick={playPauseTrack} >
            <img src={playIcon} alt="Play" id="play-pause-icon" />
          </section>
          <img src={forwardStepIcon} alt="Next" id="next-song-icon" height={15} />
        </section>
        <input type="range" value={0} id="track-progress" />
      </section>
    </>
  )
}

export default App
