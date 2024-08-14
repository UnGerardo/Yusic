import { IAudioMetadata } from "music-metadata";
import Track from "./classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useEffect, useState } from "react";
import playIcon from '../../../resources/icons/play-solid.svg'
import pauseIcon from '../../../resources/icons/pause-solid.svg'
import backwardStepIcon from '../../../resources/icons/backward-step-solid.svg'
import forwardStepIcon from '../../../resources/icons/forward-step-solid.svg'
import formatSeconds from "./utils/formatSeconds";

function App(): JSX.Element {
  // const [componentType, setComponentType] = useState('track');
  const [items, setItems] = useState<Track[]>([]);

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;
  const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;
  const $trackProgress = document.getElementById('track-progress') as HTMLInputElement;
  const $currentTime = document.getElementById('current-time') as HTMLSpanElement;
  const $totalTime = document.getElementById('total-time') as HTMLSpanElement;

  useEffect(() => {
    const $trackProgress = document.getElementById('track-progress') as HTMLInputElement;
    $trackProgress.value = '0';
  });

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
  let trackProgressInterval: NodeJS.Timeout | undefined;
  const playPauseTrack = () => {
    if ($playPauseIcon.src === playIcon) {
      $audioPlayer.play();
      $playPauseIcon.src = pauseIcon;

      trackProgressInterval = setInterval(() => {
        $trackProgress.value = `${$audioPlayer.currentTime}`;
        $currentTime.innerText = formatSeconds($audioPlayer.currentTime);
      }, 500);
    } else {
      $audioPlayer.pause();
      $playPauseIcon.src = playIcon;
      clearInterval(trackProgressInterval);
    }
  }

  let timeToSeekTo: number = 0;
  const seeking = () => {
    clearInterval(trackProgressInterval);
    timeToSeekTo = parseInt($trackProgress.value);
    $currentTime.innerText = formatSeconds(parseInt($trackProgress.value));
  }
  const seekTo = () => {
    $audioPlayer.currentTime = timeToSeekTo;
    trackProgressInterval = setInterval(() => {
      $trackProgress.value = `${$audioPlayer.currentTime}`;
      $currentTime.innerText = formatSeconds($audioPlayer.currentTime);
    }, 500);
  }

  const resetTrackProgress = () => {
    $trackProgress.max = `${$audioPlayer.duration}`;
    $totalTime.innerText = formatSeconds($audioPlayer.duration);
    $trackProgress.value = `${$audioPlayer.currentTime}`;
    $currentTime.innerText = '0:00';
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
            clearInterval(trackProgressInterval);
            $audioPlayer.pause();
            $playPauseIcon.src = playIcon;
          }} />))}
        </section>
      </main>
      <section id="player-controls">
        <audio id="player" src="" onLoadedMetadata={resetTrackProgress} />
        <section id="controls" className="no-select">
          <img src={backwardStepIcon} alt="Previous" id="previous-song-icon" height={15} />
          <section id="play-pause-icon-bg" onClick={playPauseTrack} >
            <img src={playIcon} alt="Play" id="play-pause-icon" />
          </section>
          <img src={forwardStepIcon} alt="Next" id="next-song-icon" height={15} />
        </section>
        <section id="slider">
          <span id="current-time" className="no-select">0:00</span>
          <input type="range" id="track-progress" onChange={seeking} onMouseUp={seekTo} />
          <span id="total-time" className="no-select">0:00</span>
        </section>
      </section>
    </>
  )
}

export default App
