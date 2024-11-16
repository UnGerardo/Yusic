import styled from "styled-components";
import { ClearQueue } from "./ClearQueue";

const QueueHeader = (): JSX.Element => {

  return (
    <StyledQueueHeader>
      <p>Queue:</p>
      <ClearQueue />
    </StyledQueueHeader>
  );
}

export default QueueHeader;

const StyledQueueHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;
  max-height: max-content;
`;