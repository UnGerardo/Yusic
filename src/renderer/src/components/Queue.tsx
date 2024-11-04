import { useContext } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { QueueContext } from "@contexts/QueueContext";
import styled from "styled-components";
import QueueList from "./QueueList";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

const Queue = (): JSX.Element => {
  const { queue, setQueue, setQueueIndex } = useContext(QueueContext);
  const { playingTrack } = useContext(PlayingTrackContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = queue.findIndex(track => track.id === active.id);
      const newIndex = queue.findIndex(track => track.id === over.id);
      setQueue((prevQueue) => arrayMove(prevQueue, oldIndex, newIndex));
      setQueueIndex(oldQueueIndex => {
        if (active.id === playingTrack!.id) {
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
    <QueueSection style={{ display: queue.length > 0 ? 'flex' : 'none' }}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={queue.map(track => track.id)} strategy={verticalListSortingStrategy}>
          <AutoSizer>
            {({ height, width }) => (
              <QueueList height={height} width={width} />
            )}
          </AutoSizer>
        </SortableContext>
      </DndContext>
    </QueueSection>
  )
};

export default Queue;

const QueueSection = styled.section`
  border-left: 1px white solid;
  display: none;
  flex-direction: column;
  overflow: hidden;
  min-width: 300px;
  max-width: 300px;
  z-index: 3;
`;