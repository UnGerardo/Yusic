import { useContext } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { QueueContext } from "@contexts/QueueContext";
import styled from "styled-components";
import QueueList from "./QueueList";

const Queue = (): JSX.Element => {
  const { queue } = useContext(QueueContext);

  return (
    <QueueSection style={{ display: queue.length > 0 ? 'flex' : 'none' }}>
      <AutoSizer>
        {({ height, width }) => (
          <QueueList height={height} width={width} />
        )}
      </AutoSizer>
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