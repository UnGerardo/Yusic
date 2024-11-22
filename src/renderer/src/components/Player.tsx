import styled from "styled-components";
import PlayingTrack from "./PlayingTrack";
import PlayerControls from "./PlayerControls";
import { useContext } from "react";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";

const Player = ({ inFocus, openFocusMode }: { inFocus: boolean, openFocusMode: () => void }): JSX.Element => {
  const { setIsHovering } = useContext(FocusModeHoverContext);

  return (
    <StyledPlayer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      inFocus={inFocus}>
      <div id="place-holder-to-take-up-space"></div>
      <PlayingTrack inFocus={inFocus} />
      <PlayerControls inFocus={inFocus} openFocusMode={openFocusMode} />
    </StyledPlayer>
  );
}

export default Player;

const StyledPlayer = styled.section<{ inFocus: boolean }>`
  background-color: ${({inFocus}) => inFocus ? 'transparent' : 'black'};
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  padding: 15px;
  z-index: 1;
`;