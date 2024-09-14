import { useContext, useRef, useState } from "react";
import styled from "styled-components";

import formatSeconds from "@renderer/utils/formatSeconds";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import Track from "src/classes/Track";

const Player = (): JSX.Element => {
  const $audioRef = useRef<HTMLAudioElement>(null);
  const { audioSource, setAudioSource } = useContext(AudioSourceContext);
  const { queue, queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext);

  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

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

  const resetTrackProgress = (event) => {
    const audio = event.target as HTMLAudioElement;
    setMaxTime(audio.duration);
    setCurrentTime(0);
    if (!isPaused) audio.play();
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
    if (queueIndex === queue.length - 1) {
      setIsPaused(true);
      clearInterval(updateProgressInterval);
      return;
    }

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: Track = queue[queueIndexInc];
    setPlayingTrack(nextTrack);
    setAudioSource(nextTrack!.path);
  }

  const backwardStep = () => {
    if (queueIndex === 0) return;

    const queueIndexDec = queueIndex - 1;
    setQueueIndex(queueIndexDec);
    const previousTrack: Track = queue[queueIndexDec];
    setPlayingTrack(previousTrack);
    setAudioSource(previousTrack!.path);
  }

  const forwardStep = () => {
    if (queueIndex === queue.length - 1) return;

    const queueIndexInc = queueIndex + 1;
    setQueueIndex(queueIndexInc);
    const nextTrack: Track = queue[queueIndexInc];
    setPlayingTrack(nextTrack);
    setAudioSource(nextTrack!.path);
  }

  return (
    <PlayerSection>
      <audio src={audioSource} ref={$audioRef} onLoadedMetadata={resetTrackProgress} onEnded={onAudioEnd} />
      <Controls>
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
      </Controls>
      <SliderSection>
        <SliderTimes>{formatSeconds(currentTime)}</SliderTimes>
        <Slider type="range" onChange={seeking} onMouseUp={seekTo} currentTime={currentTime} max={maxTime} />
        <SliderTimes>{formatSeconds(maxTime)}</SliderTimes>
      </SliderSection>
    </PlayerSection>
  );
};

export default Player;

const PlayerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
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

const Icon = styled.svg`
  height: 15px;
  width: 15px;
`;

const MiscIcon = styled(Icon)`
  fill: gray;

  &:hover {
    fill: white;
    transform: scale(1.05);
  }
`;

const PlayerIconBackground = styled.section`
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;

  &:hover {
    transform: scale(1.05);
  }
`;

const SliderSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const SliderTimes = styled.span`
  color: #a5a5a5;
  font-size: 14px;
  user-select: none;
`;

const Slider = styled.input<{ currentTime: number, max: number }>`
  appearance: none;
  background: linear-gradient(
    to right,
    white 0%,
    white ${(props) => (props.currentTime/props.max) * 100}%,
    #555 ${(props) => (props.currentTime/props.max) * 100}%,
    #555 100%
  );
  border-radius: 5px;
  margin: 0 5px;
  outline: none;
  height: 4px;
  width: 100%;

  &:hover {
    background: linear-gradient(
      to right,
      #AAA 0%,
      #AAA ${(props) => (props.currentTime/props.max) * 100}%,
      #555 ${(props) => (props.currentTime/props.max) * 100}%,
      #555 100%
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    border-radius: 100%;
    width: 5px;
    height: 5px;
  }
`;