import { useContext, useState } from "react";
import { QueueContext } from "@contexts/QueueContext";
import styled from "styled-components";
import QueueList from "./QueueList";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import QueueHeader from "./QueueHeader";
import ReactTrack from "@renderer/react-classes/ReactTrack";
import updateTrackIndicies from "@renderer/utils/updateTrackIndicies";

const QueueDnd = (): JSX.Element => {
  const [activeTrack, setActiveTrack] = useState<ReactTrack | null>(null);
  const { queue, setQueue, setQueueIndex } = useContext(QueueContext);
  const { playingTrack } = useContext(PlayingTrackContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    const { active } = event;
    const activeIndex = parseInt(active.id.split('-')[0]);
    setActiveTrack(queue[activeIndex]);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTrack(null);
    if (active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-')[0]);
      const newIndex = parseInt(over.id.split('-')[0]);
      const playingTrackUniqueId = playingTrack?.getUniqueId();
      setQueue((prevQueue) => {
        const newQueue = arrayMove(prevQueue, oldIndex, newIndex);
        // Use updateTrackIndicies() to prevent unnecessary re-creation of tracks
        updateTrackIndicies(newQueue);
        return newQueue;
      });
      setQueueIndex(oldQueueIndex => {
        if (active.id === playingTrackUniqueId) {
          return newIndex;
        }
        // if track moves up and passes playingTrack
        if (newIndex < oldIndex && (newIndex <= oldQueueIndex && oldIndex > oldQueueIndex)) {
          return oldQueueIndex + 1;
        }
        // if track moves down and passes playingTrack
        if (newIndex > oldIndex && (newIndex >= oldQueueIndex && oldIndex < oldQueueIndex)) {
          return oldQueueIndex - 1;
        }
        return oldQueueIndex;
      });
    }
  }

  return (
    <StyledQueueDnd display={ queue.length > 0 ? 'flex' : 'none' }>
      <QueueHeader />
      <DndContainer>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={queue.map(track => track.getUniqueId())}
            strategy={verticalListSortingStrategy}
          >
            <QueueList activeTrack={activeTrack} />
          </SortableContext>
        </DndContext>
      </DndContainer>
    </StyledQueueDnd>
  );
};

export default QueueDnd;

const StyledQueueDnd = styled.section<{ display: string }>`
  /* border-left: 1px white solid; */
  display: ${props => props.display};
  flex-direction: column;
  overflow: hidden;
  min-width: 300px;
  max-width: 300px;
  z-index: 3;
`;

const DndContainer = styled.section`
  flex-grow: 1;
`;