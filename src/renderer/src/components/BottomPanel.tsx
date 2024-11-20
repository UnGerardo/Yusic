import styled from "styled-components";
import PlayingTrack from "./PlayingTrack";
import Player from "./Player";

export const BottomPanel = ({ focusModeOn, openFocusMode }: { focusModeOn: boolean, openFocusMode: () => void }): JSX.Element => (
  <Panel focusModeOn={focusModeOn}>
    <PlayingTrack />
    <Player openFocusMode={openFocusMode} />
  </Panel>
);

const Panel = styled.section<{ focusModeOn: boolean }>`
  background-color: ${({focusModeOn}) => focusModeOn ? 'transparent' : 'black'};
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  padding: 15px;
  z-index: 1;
`;