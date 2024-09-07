import Track from "src/classes/Track";
import QueuedTrack from "./QueuedTrack";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

function Queue(
  { queue, queueIndex, playTrackInQueue }:
  {
    queue: Track[],
    queueIndex: number,
    playTrackInQueue: (index: number) => void
  }) {

  return (
    <section id="queue" className="scrollbar" style={{ display: queue.length > 0 ? 'flex' : 'none' }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={queue.length}
            itemSize={60}
            width={width}
          >
            {({ index, style }) => (
              <div style={style}>
                <QueuedTrack
                  key={queue[index].id}
                  i={index}
                  track={queue[index]}
                  queueIndex={queueIndex}
                  playTrackInQueue={playTrackInQueue}
                />
              </div>
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    </section>
  )
}

export default Queue;