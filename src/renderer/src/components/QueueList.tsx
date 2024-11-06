import { useContext, useEffect, useRef } from "react";
import { WindowList } from "@renderer/assets/Misc.styled";
import { QueueContext } from "@contexts/QueueContext";
import QueuedTrack from "./QueuedTrack";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { DragOverlay } from "@dnd-kit/core";
import Track from "@classes/Track";

const QueueList = ({ height, width, activeTrack }: { height: number, width: number, activeTrack: Track | null }): JSX.Element => {
  const { queue, queueIndex } = useContext(QueueContext);
  const { playingTrack } = useContext(PlayingTrackContext);
  const $listRef = useRef(null);

  useEffect(() => {
    if ($listRef.current) {
      ($listRef.current as HTMLElement).scrollTo({
        top: queueIndex * 60,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [playingTrack]);

  return (
    <>
      <WindowList
        height={height}
        itemCount={queue.length}
        itemSize={60}
        width={width}
        outerRef={$listRef}
      >
        {({ index, style }) => (
          <QueuedTrack
            key={queue[index].id}
            index={index}
            track={queue[index]}
            activeTrack={activeTrack}
            style={style}
          />
        )}
      </WindowList>
      <DragOverlay>
        {activeTrack ? (
          <QueuedTrack
            key={activeTrack.id}
            index={-1}
            track={activeTrack}
            activeTrack={null}
            style={{ cursor: "grabbing" }}
          />
        ) : <></>}
      </DragOverlay>
    </>
  )
}

export default QueueList;