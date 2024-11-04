import { useContext } from "react";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import Track from "@classes/Track";
import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const QueuedTrack = ({ index, track, style } : { index: number, track: Track, style: React.CSSProperties }): JSX.Element => {
  const { queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext)
  const { setAudioSource } = useContext(AudioSourceContext);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: track.id });
  const itemStyle = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const jumpToTrack = () => {
    setQueueIndex(index);
    setPlayingTrack(track);
    setAudioSource(track.path);
  }

  return (
    <QueuedTrackSection
      isCurrentTrack={index === queueIndex}
      onClick={jumpToTrack}
      style={itemStyle}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <TrackImage src={`data:${track.imgFormat};base64,${track.imgData}`} />
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
    </QueuedTrackSection>
  );
};

export default QueuedTrack;

const QueuedTrackSection = styled.section<{ isCurrentTrack: boolean }>`
  background-color: ${(props) => props.isCurrentTrack ? '#3d3d3d' : 'none'};
  display: grid;
  grid-template-columns: 50px 1fr ;
  align-items: center;
  gap: 10px;
  padding: 5px 5px 5px 10px;
  user-select: none;

  &:hover {
    background-color: #3d3d3f;
    cursor: pointer;
  }
`;