import React, { useContext, useRef, useState } from "react";

import formatSeconds from "@renderer/utils/formatSeconds";
import playIcon from '@resources/icons/play-solid.svg';
import pauseIcon from '@resources/icons/pause-solid.svg';
import backwardStepIcon from '@resources/icons/backward-step-solid.svg';
import forwardStepIcon from '@resources/icons/forward-step-solid.svg';
import { AudioSourceContext } from "@contexts/AudioSourceContext/AudioSourceContext";

import Track from "src/classes/Track";

const PlayerControls = React.memo((
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
  : JSX.Element => {
  const { audioSource, setAudioSource } = useContext(AudioSourceContext);

  const $audioRef = useRef<HTMLAudioElement>(null);
  const [playerIcon, setPlayerIcon] = useState<string>(playIcon);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const playPauseTrack = () => {
    const audio = $audioRef.current as HTMLAudioElement;

    if (!audio || audio.readyState !== 4) return;

    if (playerIcon === playIcon) {
      audio.play();
      setPlayerIcon(pauseIcon);

      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime(audio.currentTime), 499);
      });
    } else {
      audio.pause();
      setPlayerIcon(playIcon);
      clearInterval(updateProgressInterval);
    }
  }

  const resetTrackProgress = () => {
    const audio = $audioRef.current as HTMLAudioElement;

    setMaxTime(audio.duration);
    setCurrentTime(0);

    if (playerIcon === pauseIcon) {
      audio.play();
    }
  }

  const seeking = (event) => {
    const audio = $audioRef.current as HTMLAudioElement;

    if (!audio || audio.readyState !== 4) return;

    const seekingTime = event.target.value as number;

    clearInterval(updateProgressInterval);
    setCurrentTime(seekingTime);
  }

  const seekTo = (event) => {
    const audio = $audioRef.current as HTMLAudioElement;

    if (!audio || audio.readyState !== 4) return;

    const seekToTime = event.target.value as number;

    audio.currentTime = seekToTime;
    if (!audio.paused) {
      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime(audio.currentTime), 499);
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
    setAudioSource(nextTrack!.path);
  }

  const backwardStep = () => {
    if (queueIndex === 0) return;

    const queueIndexDec = queueIndex - 1;
    setQueueIndex(queueIndexDec);
    const previousTrack: Track = queue[queueIndexDec];
    setCurrentTrack(previousTrack);
    setAudioSource(previousTrack!.path);
  }

  const forwardStep = () => {
    if (queueIndex === queue.length - 1) return;

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: Track = queue[queueIndexInc];
    setCurrentTrack(nextTrack);
    setAudioSource(nextTrack!.path);
  }

  return (
    <section id="player-controls">
      <audio id="player" src={audioSource} ref={$audioRef} onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd} />
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
});

export default PlayerControls;