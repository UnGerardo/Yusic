import styled from "styled-components";
import PlayingTrack from "./PlayingTrack";
import Player from "./Player";
import { useContext } from "react";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";

export const BottomPanel = ({ isFocusModeActive, openFocusMode }: { isFocusModeActive: boolean, openFocusMode: () => void }): JSX.Element => {
  const { setIsHovering } = useContext(FocusModeHoverContext);

  return (
    <Panel
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      isFocusModeActive={isFocusModeActive}>
      <PlayingTrack isFocusModeActive={isFocusModeActive} />
      <Player isFocusModeActive={isFocusModeActive} openFocusMode={openFocusMode} />
    </Panel>
  );
}

const Panel = styled.section<{ isFocusModeActive: boolean }>`
  background-color: ${({isFocusModeActive}) => isFocusModeActive ? 'transparent' : 'black'};
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  padding: 15px;
  z-index: 1;
`;