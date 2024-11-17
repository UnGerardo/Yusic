import { useContext, useEffect, useRef } from "react";
import { WindowList } from "@renderer/assets/Misc.styled";
import { QueueContext } from "@contexts/QueueContext";
import QueuedTrack from "./QueuedTrack";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { DragOverlay } from "@dnd-kit/core";
import AutoSizer from "react-virtualized-auto-sizer";
import ReactTrack from "@renderer/react-classes/ReactTrack";

const QueueList = ({ activeTrack }: { activeTrack: ReactTrack | null }): JSX.Element => {
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
      {/* Scroll to track clicked from main tracks no longer scrolls, might need to
      extract AutoSizer */}
      <AutoSizer>
        {({ height, width }) => (
          <WindowList
            height={height}
            width={width}
            itemCount={queue.length}
            itemSize={60}
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
        )}
      </AutoSizer>
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