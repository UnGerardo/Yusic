import { useContext } from "react";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactTrack from "@renderer/react-classes/ReactTrack";
import updateTrackIndicies from "@renderer/utils/updateTrackIndicies";
import defaultTrackImage from "../../assets/defaultTrackImage.svg";
import X_SVG from "../svgs/X_SVG";
import PlaylistButton from "../PlaylistButton";

const QueuedTrack = ({ index, track, style, activeTrack }:
  {
    index: number,
    track: ReactTrack,
    style: React.CSSProperties,
    activeTrack: ReactTrack | null
  }): JSX.Element => {
  const { setQueue, queueIndex, setQueueIndex } = useContext(QueueContext);
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

  const removeFromQueue = (e) => {
    e.stopPropagation();
    setQueue((queue) => {
      queue.splice(index, 1);
      if (index === queueIndex) {
        // if removed track was the last
        if (index === queue.length) {
          const previousIndex = queueIndex - 1;
          setQueueIndex(previousIndex)
          setPlayingTrack(queue[previousIndex]);
          setAudioSource(queue[previousIndex].path);
        } else {
          setPlayingTrack(queue[queueIndex]);
          setAudioSource(queue[queueIndex].path);
        }
      } else if (index < queueIndex) {
        setQueueIndex(queueIndex - 1);
      }
      // Use updateTrackIndicies() to prevent unnecessary re-creation of tracks
      updateTrackIndicies(queue);
      return [...queue];
    });
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
      <TrackImage src={track.imgData !== '' ? `data:${track.imgFormat};base64,${track.imgData}` : defaultTrackImage} />
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
      <StyledPlaylistButton width={18} height={18} trackId={track.id} />
      <Styled_X_SVG height={18} width={18} onClick={removeFromQueue} />
    </StyledQueuedTrack>
  );
};

export default QueuedTrack;

const StyledPlaylistButton = styled(PlaylistButton)` display: none; `;
const Styled_X_SVG = styled(X_SVG)` display: none; `;

const StyledQueuedTrack = styled.section<{ isCurrentTrack: boolean }>`
  background-color: ${(props) => props.isCurrentTrack ? 'rgba(255, 255, 255, 0.15)' : 'none'};
  display: grid;
  grid-template-columns: 18px 50px 1fr;
  align-items: center;
  gap: 10px;
  padding: 5px 5px 5px 10px;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    grid-template-columns: 18px 50px 1fr 18px 18px;
    cursor: pointer;

    ${Styled_X_SVG} { display: block; }
    ${StyledPlaylistButton} { display: flex; }
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