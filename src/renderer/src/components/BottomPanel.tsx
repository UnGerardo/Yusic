import styled from "styled-components";
import PlayingTrack from "./PlayingTrack";
import Player from "./Player";

export const BottomPanel = (): JSX.Element => (
  <Panel>
    <PlayingTrack />
    <Player />
  </Panel>
);

const Panel = styled.section`
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  padding: 15px;
`;