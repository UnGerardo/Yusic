import React, { useContext, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { QueueContext } from "@contexts/QueueContext";
import QueuedTrack from "./QueuedTrack";
import styled from "styled-components";
import { WindowList } from "@renderer/assets/Misc.styled";

const Queue = React.memo((): JSX.Element => {
  const $listRef = useRef(null);
  const { queue, queueIndex } = useContext(QueueContext);

  useEffect(() => {
    if ($listRef.current) {
      ($listRef.current as HTMLElement).scrollTo({
        top: queueIndex * 60,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [queueIndex]);

  return (
    <QueueSection style={{ display: queue.length > 0 ? 'flex' : 'none' }}>
      <AutoSizer>
        {({ height, width }) => (
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
        )}
      </AutoSizer>
    </QueueSection>
  )
});

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