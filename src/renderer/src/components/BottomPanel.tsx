import styled from "styled-components";
import PlayingTrack from "./PlayingTrack";
import Player from "./Player";
import { useContext } from "react";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";

export const BottomPanel = ({ focusModeOn, openFocusMode }: { focusModeOn: boolean, openFocusMode: () => void }): JSX.Element => {
  const { setIsHovering } = useContext(FocusModeHoverContext);

  return (
    <Panel
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      focusModeOn={focusModeOn}>
      <PlayingTrack focusModeOn={focusModeOn} />
      <Player focusModeOn={focusModeOn} openFocusMode={openFocusMode} />
    </Panel>
  );
}

const Panel = styled.section<{ focusModeOn: boolean }>`
  background-color: ${({focusModeOn}) => focusModeOn ? 'transparent' : 'black'};
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  padding: 15px;
  z-index: 1;
`;