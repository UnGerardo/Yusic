import { useContext } from "react";
import formatSeconds from "@renderer/utils/formatSeconds";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import Track from "@classes/Track";
import styled from "styled-components";
import { ellipsisOverflow, TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";

const TrackComponent = ({ tracks, track, index, style } : { tracks: Track[], track: Track, index: number, style: React.CSSProperties }): JSX.Element => {
  const { setQueue, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext);
  const { setAudioSource } = useContext(AudioSourceContext);

  const playAtTrack = () => {
    setAudioSource(track.path);
    setPlayingTrack(track);
    setQueueIndex(index);
    setQueue(tracks);
  }

  return (
    <TrackSection onClick={playAtTrack} style={style}>
      <TrackImage src={`data:${track.imgFormat};base64,${track.imgData}`}/>
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
      <TrackAlbum>{track.album}</TrackAlbum>
      <TrackDuration>{formatSeconds(track.duration!)}</TrackDuration>
    </TrackSection>
  );
};

export default TrackComponent;

const TrackSection = styled.section`
  display: grid;
  grid-template-columns: 80px 2fr 2fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 5px;
  margin: 0 10px 0;
  border-bottom: 1px gray solid;

  &:hover {
    background-color: #3d3d3f;
    cursor: pointer;
  }

  @media (max-width: 920px) {
    grid-template-columns: 60px 2fr 1fr;
  }

  @media (max-width: 820px) {
    grid-template-columns: 50px 1fr;
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