import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import formatSeconds from "@renderer/utils/formatSeconds";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import { Slider } from "@renderer/assets/Misc.styled";
import ReactTrack from "@renderer/react-classes/ReactTrack";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";

const Player = ({ focusModeOn, openFocusMode }: { focusModeOn: boolean, openFocusMode: () => void }): JSX.Element => {
  const $audioRef = useRef<HTMLAudioElement>(null);
  const { audioSource, setAudioSource } = useContext(AudioSourceContext);
  const { queue, queueIndex, setQueueIndex } = useContext(QueueContext);
  const { playingTrack, setPlayingTrack } = useContext(PlayingTrackContext);
  const { isHovering } = useContext(FocusModeHoverContext);

  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [repeatStatus, setRepeatStatus] = useState<RepeatStatus>('off');

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
    setMaxTime(audio!.duration);
    setIsPaused(false);
    setUpdateProgressInterval((oldInterval) => {
      clearInterval(oldInterval);
      return setInterval(() => setCurrentTime(audio!.currentTime), 499);
    });
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
        return
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
    if (currentTime > 20 || queueIndex === 0) {
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
    if (queueIndex === queue.length - 1) return;

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

  return (
    <>
      <PlayerSection focusModeOn={focusModeOn} isHovering={isHovering}>
        <audio src={audioSource} ref={$audioRef} onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd}/>
        <Controls>
          <OpenFocusMode onClick={openFocusMode}>
            <OpenFocusModeBottom />
          </OpenFocusMode>
          <MiscIcon onClick={backwardStep} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.5 38">
            <rect width="8" height="38" rx="1.03" ry="1.03"/>
            <path d="M8.03,19.88l29.95,17.25c.68.39,1.52-.1,1.52-.88V1.75c0-.78-.84-1.27-1.52-.88L8.03,18.12c-.68.39-.68,1.37,0,1.76Z"/>
          </MiscIcon>
          <PlayerIconBackground onClick={playPauseTrack}>
            <Icon data-name="play" display={isPaused ? '' : 'none'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.07 47.45">
              <path d="M42.13,22.13L2.71.23C1.49-.44,0,.44,0,1.83v43.8c0,1.39,1.49,2.27,2.71,1.6l39.42-21.9c1.25-.7,1.25-2.5,0-3.19Z"/>
            </Icon>
            <Icon data-name="pause" display={isPaused ? 'none' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 50">
              <rect width="15" height="50"/>
              <rect x="31" y="0" width="15" height="50"/>
            </Icon>
          </PlayerIconBackground>
          <MiscIcon onClick={forwardStep} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.5 38">
            <rect x="31.5" width="8" height="38" rx="1.03" ry="1.03"/>
            <path d="M31.47,19.88L1.52,37.13c-.68.39-1.52-.1-1.52-.88V1.75C0,.97.84.49,1.52.87l29.95,17.25c.68.39.68,1.37,0,1.76Z"/>
          </MiscIcon>
          <Repeat onClick={changeRepeatStatus} status={repeatStatus}>
            <RepeatIndicator status={repeatStatus} />
            <RepeatSingleIndicator status={repeatStatus} />
          </Repeat>
        </Controls>
        <SliderSection>
          <SliderTimes>{formatSeconds(currentTime)}</SliderTimes>
          <Slider type="range" onChange={seeking} onMouseUp={seekTo} value={currentTime} max={maxTime}/>
          <SliderTimes>{formatSeconds(maxTime)}</SliderTimes>
        </SliderSection>
      </PlayerSection>
      <ExtraControls focusModeOn={focusModeOn} isHovering={isHovering}>
        <Volume>
          <VolumeIcon onClick={muteAudio} display={volume >= .5 ? 'initial' : 'none'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
          </VolumeIcon>
          <VolumeIcon onClick={muteAudio} display={(0 < volume && volume < .5) ? 'initial' : 'none'} viewBox="0 0 640 512">
            <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
          </VolumeIcon>
          <VolumeIcon onClick={muteAudio} display={volume < 0.01 ? 'initial' : 'none'} viewBox="0 0 640 512">
            <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
          </VolumeIcon>
          <VolumeSlider type="range" onChange={adjustVolume} value={volume} max={1} step={0.01} />
        </Volume>
      </ExtraControls>
    </>
  );
};

export default Player;

const PlayerSection = styled.section<{ focusModeOn: boolean, isHovering: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({focusModeOn}) => focusModeOn ? '35.5%' : 'auto'};
  position: ${({focusModeOn}) => focusModeOn ? 'absolute' : 'initial'};
  bottom: ${({isHovering}) => isHovering ? '17px' : '-70px'};
  left: ${({focusModeOn}) => focusModeOn ? '32.25%' : 'unset'};
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

const ExtraControls = styled.section<{ focusModeOn: boolean, isHovering: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  width: ${({focusModeOn}) => focusModeOn ? '33%' : 'initial'};
  position: ${({focusModeOn}) => focusModeOn ? 'absolute' : 'initial'};
  bottom: ${({isHovering}) => isHovering ? '38px' : '-52px'};
  right: ${({focusModeOn}) => focusModeOn ? '14px' : 'unset'};
  transition: 0.5s;
`;

const OpenFocusModeBottom = styled.div`
  &:before {
    border: 1.5px transparent solid;
    border-right-color: gray;
    border-top-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  &:after {
    border: 1.5px transparent solid;
    border-left-color: gray;
    border-top-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`;

const OpenFocusMode = styled.div`
  height: 20px;
  width: 20px;
  position: relative;

  &:before {
    border: 1.5px transparent solid;
    border-right-color: gray;
    border-bottom-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  &:after {
    border: 1.5px transparent solid;
    border-left-color: gray;
    border-bottom-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  &:hover {
    > ${OpenFocusModeBottom}::before {
      border-right-color: white;
      border-top-color: white;
    }
    > ${OpenFocusModeBottom}::after {
      border-left-color: white;
      border-top-color: white;
    }
  }
  &:hover::before {
    border-right-color: white;
    border-bottom-color: white;
  }
  &:hover::after {
    border-left-color: white;
    border-bottom-color: white;
  }

  &:active {
    > ${OpenFocusModeBottom}::before {
      border-right-color: #666;
      border-top-color: #666;
    }
    > ${OpenFocusModeBottom}::after {
      border-left-color: #666;
      border-top-color: #666;
    }
  }
  &:active::before {
    border-right-color: #666;
    border-bottom-color: #666;
  }
  &:active::after {
    border-left-color: #666;
    border-bottom-color: #666;
  }
`;

const RepeatIndicator = styled.div<{ status: RepeatStatus }>`
  background-color: #0d0;
  border-radius: 50%;
  height: 4px;
  width: 4px;
  opacity: ${props => props.status === 'off' ? 0 : 1};
  position: absolute;
  top: 18px;
`;

const RepeatSingleIndicator = styled.div<{ status: RepeatStatus }>`
  opacity: ${props => props.status === 'single' ? 1 : 0};
  position: relative;

  &::before {
    background-color: black;
    content: '';
    height: 12px;
    width: 10px;
    position: absolute;
    top: -13px;
    left: -5px;
  }

  &::after {
    color: #0d0;
    content: '1';
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    top: -14px;
    left: -4px;
  }
`;

const Repeat = styled.div<{ status: RepeatStatus }>`
  --base-color: ${props => props.status === 'off' ? 'gray' : '#0d0'};
  --brighter-color: ${props => props.status === 'off' ? 'white' : '#0f0'};
  --darker-color: ${props => props.status === 'off' ? '#666' : '#0a0'};
  background: transparent;
  border: 2px solid var(--base-color);
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  width: 20px;
  position: relative;

  &:before {
    background-color: black;
    content: '';
    height: 3px;
    width: 6px;
    position: absolute;
    left: 4px;
    bottom: -2px;
  }

  &:after {
    border-top: 5px solid transparent;
    border-right: 6px solid var(--base-color);
    border-bottom: 5px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    right: 4px;
    bottom: -5.8px;
  }

  &:hover {
    border-color: var(--brighter-color);
    > ${RepeatIndicator} { background-color: var(--brighter-color); }
    > ${RepeatSingleIndicator}::after { color: var(--brighter-color); }
  }
  &:hover::after {
    border-right-color: var(--brighter-color);
  }

  &:active {
    border-color: var(--darker-color);
    > ${RepeatIndicator} { background-color: var(--darker-color); }
    > ${RepeatSingleIndicator}::after { color: var(--darker-color); }
  }
  &:active::after {
    border-right-color: var(--darker-color);
  }
`;

const Icon = styled.svg`
  cursor: pointer;
  height: 15px;
  width: 15px;
`;

const MiscIcon = styled(Icon)`
  fill: gray;

  &:hover {
    fill: white;
    transform: scale(1.05);
  }

  &:active {
    fill: rgb(100, 100, 100);
    transform: scale(1);
  }
`;

const PlayerIconBackground = styled.section`
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background-color: #ccc;
    transform: scale(1);
  }
`;

const SliderSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SliderTimes = styled.span`
  color: #a5a5a5;
  font-size: 14px;
  margin: 0 5px;
  user-select: none;
`;

const Volume = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VolumeIcon = styled(MiscIcon)`
  fill: gray;
  height: 25px;
  width: 25px;
  padding: 0 5px 0 0;
`;

const VolumeSlider = styled(Slider)`
  width: 100px;
`;