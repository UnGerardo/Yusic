import { useContext, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { QueueContext } from "@contexts/QueueContext";
import styled from "styled-components";
import QueueList from "./QueueList";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import Track from "@classes/Track";
import { ClearQueue } from "./ClearQueue";

const Queue = (): JSX.Element => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const { queue, setQueue, setQueueIndex } = useContext(QueueContext);
  const { playingTrack } = useContext(PlayingTrackContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTrack(queue[queue.findIndex(track => track.id === active.id)]);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTrack(null);
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
      <Header>
        <p>Queue:</p>
        <ClearQueue />
      </Header>
      <Content>
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={queue.map(track => track.id)} strategy={verticalListSortingStrategy}>
            <AutoSizer>
              {({ height, width }) => (
                <QueueList height={height} width={width} activeTrack={activeTrack} />
              )}
            </AutoSizer>
          </SortableContext>
        </DndContext>
      </Content>
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

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;
`;

const Content = styled.section`
  flex-grow: 1;
`;