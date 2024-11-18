import { useContext } from "react";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactTrack from "@renderer/react-classes/ReactTrack";

const QueuedTrack = ({ index, track, style, activeTrack }:
  {
    index: number,
    track: ReactTrack,
    style: React.CSSProperties,
    activeTrack: ReactTrack | null
  }): JSX.Element => {
  const { queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext)
  const { setAudioSource } = useContext(AudioSourceContext);

  const componentOpacity = activeTrack?.getUniqueId() === track.getUniqueId() ? 0 : 1;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: track.getUniqueId() });
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
    <StyledQueuedTrack
      isCurrentTrack={index === queueIndex}
      onClick={jumpToTrack}
      style={{ ...itemStyle, opacity: componentOpacity }}
      ref={setNodeRef}
    >
      <DragHandler {...attributes} {...listeners}>
        <DragLines />
      </DragHandler>
      <TrackImage src={`data:${track.imgFormat};base64,${track.imgData}`} />
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
    </StyledQueuedTrack>
  );
};

export default QueuedTrack;

const StyledQueuedTrack = styled.section<{ isCurrentTrack: boolean }>`
  background-color: ${(props) => props.isCurrentTrack ? 'rgba(61, 61, 61, 0.5)' : 'none'};
  display: grid;
  grid-template-columns: 18px 50px 1fr ;
  align-items: center;
  gap: 10px;
  padding: 5px 5px 5px 10px;
  user-select: none;

  &:hover {
    background-color: rgba(61, 61, 61, 0.5);
    cursor: pointer;
  }
`;

const DragLines = styled.div`
  background-color: #AAA;
  height: 1px;
  width: 18px;
  position: relative;

  &::before, &::after {
    background-color: #AAA;
    content: '';
    height: 1px;
    width: 18px;
    position: absolute;
    left: 0;
  }

  &::before { top: -5px; }
  &::after { top: 5px; }
`;

const DragHandler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 18px;
  position: relative;

  &:hover ${DragLines} { background-color: white; }
  &:hover ${DragLines}::after { background-color: white; }
  &:hover ${DragLines}::before { background-color: white; }
`;