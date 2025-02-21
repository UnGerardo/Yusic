import { useContext } from "react";
import formatSeconds from "@renderer/utils/formatSeconds";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import styled from "styled-components";
import { ellipsisOverflow, TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import createReactTracks from "@renderer/utils/createReactTracks";
import ReactTrack from "@renderer/react-classes/ReactTrack";
import updateTrackIndicies from "@renderer/utils/updateTrackIndicies";
import defaultTrackImage from "../assets/defaultTrackImage.svg";
import PlaylistButton from "./PlaylistButton";

const TrackComponent = ({ tracks, track, index, style } : { tracks: ReactTrack[], track: ReactTrack, index: number, style: React.CSSProperties }): JSX.Element => {
  const { setQueue, queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext);
  const { setAudioSource } = useContext(AudioSourceContext);

  const playAtTrack = () => {
    // Use createReactTracks() when creating a new queue
    const newQueue = createReactTracks(tracks);
    setAudioSource(track.path);
    // Use index to get track, because the newQueue creates new instances of tracks
    setPlayingTrack(newQueue[index]);
    setQueueIndex(index);
    setQueue(newQueue);
  }

  const addToQueue = (e) => {
    e.stopPropagation();
    setQueue((queue) => {
      queue.splice(queueIndex + 1, 0, track.newCopy());
      // Use updateTrackIndicies() to prevent unnecessary re-creation of tracks
      updateTrackIndicies(queue);
      return [...queue];
    });
  }

  return (
    <TrackSection onClick={playAtTrack} style={style}>
      <TrackImage src={track.imgData !== '' ? `data:${track.imgFormat};base64,${track.imgData}` : defaultTrackImage}/>
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
      <TrackAlbum>{track.album}</TrackAlbum>
      <TrackDuration>{formatSeconds(track.duration!)}</TrackDuration>
      <PlaylistButton width={18} height={18} trackId={track.id} />
      <PlayNextButton onClick={addToQueue}>
        <PlayNext2nd />
        <PlayNext3rd />
      </PlayNextButton>
    </TrackSection>
  );
};

export default TrackComponent;

const TrackSection = styled.section`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 40px 18px 18px;
  align-items: center;
  gap: 20px;
  padding: 5px 28px 5px 5px;
  margin: 0 0 0 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
  }

  @media (max-width: 920px) {
    grid-template-columns: 80px 1fr 40px 18px 18px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 80px 1fr 18px 18px;
  }
`;

const TrackAlbum = styled.p`
  ${ellipsisOverflow};

  @media (max-width: 920px) {
    display: none;
  }
`;

const TrackDuration = styled.p`
  @media (max-width: 820px) {
    display: none;
  }
`;

/* top and bottom bar */
const PlayNextButton = styled.button`
  background: none;
  border: none;
  height: 20px;
  width: 18px;
  position: relative;

  &:before,
  &:after {
    background-color: gray;
    content: '';
    height: 2px;
    width: 15px;
    position: absolute;
  }

  &:before {
    top: 0px;
    left: 0px;
  }

  &:after {
    bottom: 0px;
    left: 0px;
  }

  &:hover {
    > * {
      background-color: white;
    }

    &::after,
    &::before,
    & ::after, /* Includes cross of second bar */
    & ::before { background-color: white; }
  }

  &:active {
    > * {
      background-color: #666;
    }

    &::after,
    &::before,
    & ::after, /* Includes cross of second bar */
    & ::before { background-color: #666; }
  }
`;

/*  second bar and cross */
const PlayNext2nd = styled.section`
  background-color: gray;
  height: 2px;
  width: 11px;
  position: absolute;
  top: 6px;
  left: 0px;

  /* horizontal cross */
  &:before {
    background-color: gray;
    content: '';
    height: 2px;
    width: 10px;
    position: absolute;
    top: 0px;
    right: -13px;
  }
  /* vertical cross */
  &:after {
    background-color: gray;
    content: '';
    height: 10px;
    width: 2px;
    position: absolute;
    top: -4px;
    right: -9px;
  }
`;

/* third bar */
const PlayNext3rd = styled.section`
  background-color: gray;
  height: 2px;
  width: 15px;
  position: absolute;
  top: 12px;
  left: 0px;
`;
