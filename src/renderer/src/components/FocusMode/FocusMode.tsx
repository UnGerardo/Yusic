import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { useContext } from "react";
import styled from "styled-components";

const FocusMode = ({ opacity, zIndex, closeFocusMode }: { opacity: number, zIndex: number, closeFocusMode: () => void }): JSX.Element => {
  const { playingTrack } = useContext(PlayingTrackContext);
  const { setIsHovering } = useContext(FocusModeHoverContext);

  return (
    <StyledFocusMode
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      opacity={opacity}
      zIndex={zIndex}
    >
      { playingTrack ?
        <TrackContainer>
          <FocusTrackImage src={`data:${playingTrack?.imgFormat};base64,${playingTrack?.imgData}`} />
          <FocusTrackInfo>
            <TrackTitle>{playingTrack?.title}</TrackTitle>
            <TrackArtist>{playingTrack?.artists}</TrackArtist>
          </FocusTrackInfo>
        </TrackContainer>
        : <></> }
      <CloseFocusMode onClick={closeFocusMode} />
    </StyledFocusMode>
  );
}

const TrackContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
  position: absolute;
  left: 20px;
  bottom: -80px;
`;

const FocusTrackImage = styled(TrackImage)`
  border-radius: 10%;
  height: 150px;
  width: 150px;
`;

const FocusTrackInfo = styled(TrackInfo)`
  padding-bottom: 10px;

  ${TrackTitle} {
    font-size: 20px;
  }
  ${TrackArtist} {
    font-size: 19px;
  }
`;

const CloseFocusMode = styled.button`
  background: none;
  border: 2px solid gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  position: absolute;
  top: -40px;
  left: calc(50% - 20px);
  transform: rotate(45deg);
  transition: 0.5s;

  &:before {
    background-color: gray;
    content: '';
    height: 1px;
    width: 15px;
    position: absolute;
  }

  &:after {
    background-color: gray;
    content: '';
    height: 15px;
    width: 1px;
    position: absolute;
  }

  &:hover {
    border-color: white;
    transform: scale(1.05) rotate(45deg);
  }
  &:hover::after,
  &:hover::before { background-color: white; }

  &:active {
    border-color: #666;
    transform: scale(.95) rotate(45deg);
  }
  &:active::after,
  &:active::before { background-color: #666; }
`;

const StyledFocusMode = styled.section<{ opacity: number, zIndex: number }>`
  height: 100%;
  width: 100%;
  opacity: ${(props) => props.opacity};
  position: absolute;
  transition: 0.3s;
  z-index: ${props => props.zIndex};
  user-select: none;

  &:hover {
    > ${CloseFocusMode} {
      top: 40px;
    }
  }
`;

export default FocusMode;