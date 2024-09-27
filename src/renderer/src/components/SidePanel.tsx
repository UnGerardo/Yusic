import styled from "styled-components";

export const SidePanel = (): JSX.Element => (
  <Panel>
    <Group>Tracks</Group>
    <Group>Artists</Group>
    <Group>Ablum</Group>
  </Panel>
);

const Panel = styled.section`
  border-right: 1px white solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 10%;
  max-width: 200px;
  z-index: 3;
`;

const Group = styled.section`
  border-bottom: 1px white solid;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  width: 100%;
`;