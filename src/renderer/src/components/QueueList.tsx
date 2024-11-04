import { useContext, useEffect, useRef } from "react";
import { WindowList } from "@renderer/assets/Misc.styled";
import { QueueContext } from "@contexts/QueueContext";
import QueuedTrack from "./QueuedTrack";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

const QueueList = ({ height, width }: { height: number, width: number }): JSX.Element => {
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
          style={style}
        />
      )}
    </WindowList>
  )
}

export default QueueList;