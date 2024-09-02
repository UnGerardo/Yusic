import formatSeconds from "@renderer/utils/formatSeconds";
import playIcon from '@resources/icons/play-solid.svg';
import pauseIcon from '@resources/icons/pause-solid.svg';
import backwardStepIcon from '@resources/icons/backward-step-solid.svg';
import forwardStepIcon from '@resources/icons/forward-step-solid.svg';
import { useState } from "react";
import Track from "src/classes/Track";

export default function PlayerControls(
  { queue, queueIndex, setQueueIndex, setCurrentTrack, updateProgressInterval, setUpdateProgressInterval }
  :
  {
    queue: Track[],
    queueIndex: number,
    setQueueIndex: React.Dispatch<React.SetStateAction<number>>,
    currentTrack: Track | undefined,
    setCurrentTrack: React.Dispatch<React.SetStateAction<Track | undefined>>,
    updateProgressInterval: NodeJS.Timeout | undefined,
    setUpdateProgressInterval: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
  })
  : JSX.Element {
  const [playerIcon, setPlayerIcon] = useState<string>(playIcon);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;

  const playPauseTrack = () => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) return;

    if (playerIcon === playIcon) {
      $audioPlayer.play();
      setPlayerIcon(pauseIcon);

      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime($audioPlayer.currentTime), 499);
      });
    } else {
      $audioPlayer.pause();
      setPlayerIcon(playIcon);
      clearInterval(updateProgressInterval);
    }
  }

  const resetTrackProgress = () => {
    setMaxTime($audioPlayer.duration);
    setCurrentTime(0);

    if (playerIcon === pauseIcon) {
      $audioPlayer.play();
    }
  }

  const seeking = (event) => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) return;

    const seekingTime = event.target.value as number;

    clearInterval(updateProgressInterval);
    setCurrentTime(seekingTime);
  }

  const seekTo = (event) => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) return;

    const seekToTime = event.target.value as number;

    $audioPlayer.currentTime = seekToTime;
    if (!$audioPlayer.paused) {
      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime($audioPlayer.currentTime), 499);
      });
    }
  }

  const onAudioEnd = () => {
    if (queueIndex === queue.length - 1) {
      setPlayerIcon(playIcon);
      clearInterval(updateProgressInterval);
      return;
    }

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: Track = queue[queueIndexInc];
    setCurrentTrack(nextTrack);
    $audioPlayer.src = nextTrack!.path;
  }

  const backwardStep = () => {
    if (queueIndex === 0) return;

    const queueIndexDec = queueIndex - 1;
    setQueueIndex(queueIndexDec);
    const previousTrack: Track = queue[queueIndexDec];
    setCurrentTrack(previousTrack);
    $audioPlayer.src = previousTrack!.path;
  }

  const forwardStep = () => {
    if (queueIndex === queue.length - 1) return;

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: Track = queue[queueIndexInc];
    setCurrentTrack(nextTrack);
    $audioPlayer.src = nextTrack!.path;
  }

  return (
    <section id="player-controls">
      <audio id="player" src="" onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd} />
      <section id="controls" className="no-select">
        <img src={backwardStepIcon} onClick={backwardStep} alt="Previous" id="previous-song-icon" height={15} />
        <section id="play-pause-icon-bg" onClick={playPauseTrack} >
          <img src={playerIcon} alt="Play" id="play-pause-icon" />
        </section>
        <img src={forwardStepIcon} onClick={forwardStep} alt="Next" id="next-song-icon" height={15} />
      </section>
      <section id="slider">
        <span id="current-time" className="no-select slider-times">{formatSeconds(currentTime)}</span>
        <input type="range" id="track-progress" onChange={seeking} onMouseUp={seekTo} style={{
          background: `linear-gradient(to right, white 0%, white ${(currentTime/maxTime) * 100}%, #555 ${(currentTime/maxTime) * 100}%, #555 100%)`
        }} max={maxTime} />
        <span id="total-time" className="no-select slider-times">{formatSeconds(maxTime)}</span>
      </section>
    </section>
  );
}