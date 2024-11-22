import { FocusModeHoverContext } from "@renderer/contexts/FocusModeHoverContext";
import { useContext } from "react";
import styled from "styled-components";

const FocusMode = ({ isFocusModeActive, closeFocusMode }: { isFocusModeActive: boolean, closeFocusMode: () => void }): JSX.Element => {
  const { setIsHovering } = useContext(FocusModeHoverContext);

  const activeZIndex = 3;

  return (
    <StyledFocusMode
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      opacity={isFocusModeActive ? 1 : 0}
      zIndex={isFocusModeActive ? activeZIndex : -1}
    >
      <CloseFocusMode onClick={closeFocusMode} />
    </StyledFocusMode>
  );
}

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