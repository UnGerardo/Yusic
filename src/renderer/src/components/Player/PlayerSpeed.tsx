import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import menuOutsideClick from "@renderer/utils/menuOutsideClick";

const PlayerSpeed = ({ speed, optionClickHandler }: { speed: number, optionClickHandler: (e) => void }): JSX.Element => {
  const speeds = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25];
  const [isListOpen, setIsListOpen] = useState(false);
  const $listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (e) => menuOutsideClick(e, $listRef, setIsListOpen);
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    }
  }, []);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  }

  return (
    <StyledPlayerSpeed onClick={toggleList} speed={speed}>
      {
        isListOpen &&
        <PlayerSpeedList ref={$listRef}>
          {
            speeds.map((speed) => <PlayerSpeedOption onClick={optionClickHandler} data-speed={speed}>{`${speed}x`}</PlayerSpeedOption>)
          }
        </PlayerSpeedList>
      }
    </StyledPlayerSpeed>
  );
}

export default PlayerSpeed;

const StyledPlayerSpeed = styled.div<{ speed: number }>`
  background: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 50px;
  position: relative;
  user-select: none;

  &::after {
    color: gray;
    content: "${({speed}) => `${speed}x`}";
    display: block;
  }

  &:hover::after { color: white; }
  &:active::after { color: #666; }
`;

const PlayerSpeedList = styled.ul`
  background-color: #333;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 2px;
  list-style: none;
  padding: 5px;
  height: fit-content;
  width: fit-content;
  position: absolute;
  bottom: 24px;
`;

const PlayerSpeedOption = styled.li`
  display: flex;
  justify-content: flex-end;
  padding: 1px 4px;
  width: 100%;

  &:hover {
    background-color: #666;
    border-radius: 3px;
  }
`;