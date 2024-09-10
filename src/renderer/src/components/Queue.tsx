import { useContext } from "react";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { QueueContext } from "@contexts/QueueContext";
import QueuedTrack from "./QueuedTrack";

function Queue() {
  const { queue } = useContext(QueueContext);

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
                  index={index}
                  track={queue[index]}
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