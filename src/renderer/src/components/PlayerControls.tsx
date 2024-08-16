import formatSeconds from "@renderer/utils/formatSeconds";
import playIcon from '@resources/icons/play-solid.svg';
import pauseIcon from '@resources/icons/pause-solid.svg';
import backwardStepIcon from '@resources/icons/backward-step-solid.svg';
import forwardStepIcon from '@resources/icons/forward-step-solid.svg';
import { useState } from "react";

export default function PlayerControls(
  { updateProgressInterval, setUpdateProgressInterval }
  : { updateProgressInterval:
    NodeJS.Timeout | undefined,
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
  }

  const seeking = () => {
    clearInterval(updateProgressInterval);
    setTimeToSeekTo(parseFloat($trackProgress.value));
    setTrackProgress((parseFloat($trackProgress.value)/parseFloat($trackProgress.max)) * 100);
    $currentTime.innerText = formatSeconds(parseInt($trackProgress.value));
  }
  const seekTo = () => {
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
    $playPauseIcon.src = playIcon;
    clearInterval(updateProgressInterval);
  }

  return (
    <section id="player-controls">
      <audio id="player" src="" onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd} />
      <section id="controls" className="no-select">
        <img src={backwardStepIcon} alt="Previous" id="previous-song-icon" height={15} />
        <section id="play-pause-icon-bg" onClick={playPauseTrack} >
          <img src={playIcon} alt="Play" id="play-pause-icon" />
        </section>
        <img src={forwardStepIcon} alt="Next" id="next-song-icon" height={15} />
      </section>
      <section id="slider">
        <span id="current-time" className="no-select slider-times">0:00</span>
        <input type="range" id="track-progress" onChange={seeking} onMouseUp={seekTo} style={{
          background: `linear-gradient(to right, white 0%, white ${trackProgress}%, #888 ${trackProgress}%, #888 100%)`
        }} />
        <span id="total-time" className="no-select slider-times">0:00</span>
      </section>
    </section>
  );
}