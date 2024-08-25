import formatSeconds from "@renderer/utils/formatSeconds";
import playIcon from '@resources/icons/play-solid.svg';
import pauseIcon from '@resources/icons/pause-solid.svg';
import backwardStepIcon from '@resources/icons/backward-step-solid.svg';
import forwardStepIcon from '@resources/icons/forward-step-solid.svg';
import { useState } from "react";
import Track from "src/classes/Track";

export default function PlayerControls(
  { queue, queueIndex, setQueueIndex, currentTrack, setCurrentTrack, updateProgressInterval, setUpdateProgressInterval }
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
  const [trackProgress, setTrackProgress] = useState(0);
  const [timeToSeekTo, setTimeToSeekTo] = useState(0);

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;
  const $trackProgress = document.getElementById('track-progress') as HTMLInputElement;
  const $currentTime = document.getElementById('current-time') as HTMLSpanElement;
  const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;
  const $totalTime = document.getElementById('total-time') as HTMLSpanElement;

  const playPauseTrack = () => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) {
      return;
    }

    if ($playPauseIcon.src === playIcon) {
      $audioPlayer.play();
      $playPauseIcon.src = pauseIcon;

      clearInterval(updateProgressInterval);
      setUpdateProgressInterval(setInterval(() => {
        $trackProgress.value = `${$audioPlayer.currentTime}`;
        $currentTime.innerText = formatSeconds($audioPlayer.currentTime);
        setTrackProgress((parseFloat($trackProgress.value)/parseFloat($trackProgress.max)) * 100);
      }, 500));
    } else {
      $audioPlayer.pause();
      $playPauseIcon.src = playIcon;
      clearInterval(updateProgressInterval);
    }
  }

  const resetTrackProgress = () => {
    $trackProgress.max = `${$audioPlayer.duration}`;
    $totalTime.innerText = formatSeconds($audioPlayer.duration);
    $trackProgress.value = `${$audioPlayer.currentTime}`;
    $currentTime.innerText = '0:00';
    setTrackProgress(0);

    if ($playPauseIcon.src === pauseIcon) {
      $audioPlayer.play();
    }
  }

  const seeking = () => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) {
      return;
    }

    clearInterval(updateProgressInterval);
    setTimeToSeekTo(parseFloat($trackProgress.value));
    setTrackProgress((parseFloat($trackProgress.value)/parseFloat($trackProgress.max)) * 100);
    $currentTime.innerText = formatSeconds(parseInt($trackProgress.value));
  }
  const seekTo = () => {
    if (!$audioPlayer || $audioPlayer.readyState !== 4) {
      return;
    }

    $audioPlayer.currentTime = timeToSeekTo;
    if (!$audioPlayer.paused) {
      clearInterval(updateProgressInterval);
      setUpdateProgressInterval(setInterval(() => {
        $trackProgress.value = `${$audioPlayer.currentTime}`;
        $currentTime.innerText = formatSeconds($audioPlayer.currentTime);
        setTrackProgress((parseFloat($trackProgress.value)/parseFloat($trackProgress.max)) * 100);
      }, 500));
    }
  }

  const onAudioEnd = () => {
    if (queueIndex === queue.length - 1) {
      $playPauseIcon.src = playIcon;
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
          <img src={playIcon} alt="Play" id="play-pause-icon" />
        </section>
        <img src={forwardStepIcon} onClick={forwardStep} alt="Next" id="next-song-icon" height={15} />
      </section>
      <section id="slider">
        <span id="current-time" className="no-select slider-times">0:00</span>
        <input type="range" id="track-progress" onChange={seeking} onMouseUp={seekTo} style={{
          background: `linear-gradient(to right, white 0%, white ${trackProgress}%, #555 ${trackProgress}%, #555 100%)`
        }} />
        <span id="total-time" className="no-select slider-times">0:00</span>
      </section>
    </section>
  );
}