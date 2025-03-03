import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AudioSourceContext } from "@contexts/AudioSourceContext";
import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import ReactTrack from "@renderer/react-classes/ReactTrack";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";
import { BackwardStepIcon, ForwardStepIcon, OpenFocusMode, PlayerIcon } from "./PlayerIcons";
import PlayerSlider from "./PlayerSlider";
import PlayerVolume from "./PlayerVolume";
import PlayerSpeed from "./PlayerSpeed";
import RepeatSVG from "./RepeatSVG";
import { PlayerTimeContext } from "@renderer/contexts/PlayerTimeContext";
import InfiniPlaySVG from "./InfiniPlaySVG";
import getRandomInt from "@renderer/utils/getRandomInt";
import { TracksContext } from "@renderer/contexts/TracksContext";

const PlayerControls = ({ inFocus, openFocusMode }: { inFocus: boolean, openFocusMode: () => void }): JSX.Element => {
  const $audioRef = useRef<HTMLAudioElement>(null);
  const { tracks } = useContext(TracksContext);
  const { audioSource, setAudioSource } = useContext(AudioSourceContext);
  const { queue, queueIndex, setQueueIndex } = useContext(QueueContext);
  const { playingTrack, setPlayingTrack } = useContext(PlayingTrackContext);
  const { isHovering } = useContext(FocusModeHoverContext);
  const {currentTime, setCurrentTime, maxTime, setMaxTime } = useContext(PlayerTimeContext);

  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [repeatStatus, setRepeatStatus] = useState<RepeatStatus>('off');
  const [infiniPlay, setInfiniPlay] = useState<boolean>(false);

  useEffect(() => {
    if (audioSource === '') return setIsPaused(true);

    if ('mediaSession' in navigator) {
      const image = `data:${playingTrack!.imgFormat};base64,${playingTrack!.imgData}`;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: playingTrack?.title,
        artist: playingTrack?.artists,
        album: playingTrack?.album,
        artwork: [
          { src: image, sizes: '96x96', type: playingTrack?.imgFormat },
          { src: image, sizes: '512x512', type: playingTrack?.imgFormat },
        ]
      });

      navigator.mediaSession.setActionHandler('play', playPauseTrack);
      navigator.mediaSession.setActionHandler('pause', playPauseTrack);
      navigator.mediaSession.setActionHandler('previoustrack', backwardStep);
      navigator.mediaSession.setActionHandler('nexttrack', forwardStep);
    }
  }, [audioSource, queue]);

  useEffect(() => {
    const { current: audio } = $audioRef;
    audio!.currentTime = 0;
    setCurrentTime(0);
  }, [playingTrack]);

  const playPauseTrack = () => {
    const { current: audio } = $audioRef;
    if (!audio || audio.readyState !== 4) return;

    if (audio.paused) {
      audio.play();
      setIsPaused(false);

      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime(audio.currentTime), 499);
      });
    } else {
      audio.pause();
      setIsPaused(true);
      clearInterval(updateProgressInterval);
    }
  }

  const resetTrackProgress = () => {
    const { current: audio } = $audioRef;
    setCurrentTime(0);
    setMaxTime(audio!.duration);
    setIsPaused(false);
    setUpdateProgressInterval((oldInterval) => {
      clearInterval(oldInterval);
      return setInterval(() => setCurrentTime(audio!.currentTime), 499);
    });
    audio!.currentTime = 0;
    audio!.playbackRate = speed;
    audio!.play();
  }

  const seeking = (event) => {
    const { current: audio } = $audioRef;

    if (!audio || audio.readyState !== 4) return;

    const seekingTime = event.target.value as number;

    clearInterval(updateProgressInterval);
    setCurrentTime(seekingTime);
  }

  const seekTo = (event) => {
    const { current: audio } = $audioRef;
    const input = event.target as HTMLInputElement;

    if (!audio || audio.readyState !== 4) return;

    const seekToTime: number = parseFloat(input.value);

    audio.currentTime = seekToTime;
    if (!audio.paused) {
      setUpdateProgressInterval((oldInterval) => {
        clearInterval(oldInterval);
        return setInterval(() => setCurrentTime(audio.currentTime), 499);
      });
    }
  }

  const onAudioEnd = () => {
    if (repeatStatus === 'single') {
      const { current: audio } = $audioRef;
      setCurrentTime(0);
      audio!.currentTime = 0;
      audio!.play();
      return;
    }

    if (infiniPlay) {
      playRandomSong();
      return;
    }

    if (!queue.length) {
      setIsPaused(true);
      setCurrentTime(0);
      clearInterval(updateProgressInterval);
      return;
    }

    if (queueIndex === queue.length - 1) {
      if (repeatStatus === 'queue') {
        const queueIndex = 0;
        setQueueIndex(queueIndex);
        const nextTrack: ReactTrack = queue[queueIndex];
        setPlayingTrack(nextTrack);

        if (nextTrack!.path === playingTrack!.path) {
          resetTrackProgress();
        } else {
          setAudioSource(nextTrack!.path);
        }
        return;
      }

      setIsPaused(true);
      setCurrentTime(0);
      clearInterval(updateProgressInterval);
      return;
    }

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: ReactTrack = queue[queueIndexInc];
    setPlayingTrack(nextTrack);

    if (nextTrack!.path === playingTrack!.path) {
      resetTrackProgress();
    } else {
      setAudioSource(nextTrack!.path);
    }
  }

  const backwardStep = () => {
    if (currentTime > 20 || queueIndex === 0 || infiniPlay) {
      setCurrentTime(0);
      const { current: audio } = $audioRef;
      audio!.currentTime = 0;
      return;
    }

    const queueIndexDec = queueIndex - 1;
    setQueueIndex(queueIndexDec);
    const previousTrack: ReactTrack = queue[queueIndexDec];
    setPlayingTrack(previousTrack);
    if (previousTrack!.path === playingTrack!.path) {
      resetTrackProgress();
    } else {
      setAudioSource(previousTrack!.path);
    }
  }

  const forwardStep = () => {
    if (infiniPlay) {
      playRandomSong();
      return;
    }

    if (!queue.length || queueIndex === queue.length - 1) return;

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: ReactTrack = queue[queueIndexInc];
    setPlayingTrack(nextTrack);
    if (nextTrack!.path === playingTrack!.path) {
      resetTrackProgress();
    } else {
      setAudioSource(nextTrack!.path);
    }
  }

  const adjustVolume = (event) => {
    const { current: audio } = $audioRef;
    setVolume(event.target.value);
    audio!.volume = event.target.value;
  }

  const muteAudio = () => {
    const { current: audio } = $audioRef;

    if (audio!.volume > 0) {
      setPrevVolume(audio!.volume);
      setVolume(0);
      audio!.volume = 0;
    } else {
      setVolume(prevVolume);
      audio!.volume = prevVolume;
    }
  }

  const changeRepeatStatus = (): void => {
    switch (repeatStatus) {
      case "off":
        setRepeatStatus('queue');
        break;
      case "queue":
        setRepeatStatus('single');
        break;
      case "single":
        setRepeatStatus('off');
        break;
    }
  }

  const toggleInfiniPlay = (): void => {
    setInfiniPlay(status => {
      // setting to 'on' (true)
      if (!status && !playingTrack) {
        playRandomSong();
      }
      return !status;
    });
  }

  const changeSpeed = (e): void => {
    const { current: audio } = $audioRef;
    const element = e.target as HTMLElement
    const speed = parseFloat(element.getAttribute('data-speed') || '');
    setSpeed(speed);
    audio!.playbackRate = speed;
  }

  const playRandomSong = (): void => {
    const randomSongIndex = getRandomInt(0, tracks!.length);
    setPlayingTrack(tracks![randomSongIndex]);
    if (playingTrack && tracks![randomSongIndex].path === playingTrack.path) {
      resetTrackProgress();
    } else {
      setAudioSource(tracks![randomSongIndex]!.path);
    }
  }

  return (
    <>
      <PlayerSection inFocus={inFocus} isHovering={isHovering}>
        <audio src={audioSource} ref={$audioRef} onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd}/>
        <Controls>
          <OpenFocusMode inFocus={inFocus} action={openFocusMode} />
          <BackwardStepIcon action={backwardStep} />
          <PlayerIcon action={playPauseTrack} isPaused={isPaused} />
          <ForwardStepIcon action={forwardStep} />
          <RepeatSVG action={changeRepeatStatus} status={repeatStatus} />
        </Controls>
        <PlayerSlider currentTime={currentTime} maxTime={maxTime} changeHandler={seeking} mouseUpHandler={seekTo} />
      </PlayerSection>
      <ExtraControls inFocus={inFocus} isHovering={isHovering}>
        <InfiniPlaySVG action={toggleInfiniPlay} on={infiniPlay} />
        <PlayerSpeed speed={speed} optionClickHandler={changeSpeed} />
        <PlayerVolume volume={volume} iconClickHandler={muteAudio} sliderChangeHandler={adjustVolume} />
      </ExtraControls>
    </>
  );
};

export default PlayerControls;

const PlayerSection = styled.section<{ inFocus: boolean, isHovering: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({inFocus}) => inFocus ? '35.5%' : 'auto'};
  position: ${({inFocus}) => inFocus ? 'absolute' : 'initial'};
  bottom: ${({isHovering}) => isHovering ? '17px' : '-70px'};
  left: ${({inFocus}) => inFocus ? '32.25%' : 'unset'};
  transition: 0.5s;
`;

const Controls = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 5px 10px;
  width: 100%;
  max-width: 300px;
  user-select: none;
`;

const ExtraControls = styled.section<{ inFocus: boolean, isHovering: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  width: ${({inFocus}) => inFocus ? '33%' : 'initial'};
  position: ${({inFocus}) => inFocus ? 'absolute' : 'initial'};
  bottom: ${({isHovering}) => isHovering ? '38px' : '-52px'};
  right: ${({inFocus}) => inFocus ? '14px' : 'unset'};
  transition: 0.5s;
`;