import styled from "styled-components";


const FocusModeSVG = styled.svg<{ inFocus: boolean }>`
  fill: ${({inFocus}) => inFocus ? '#0d0' : '#808080'};
  transition: 1s;

  &:hover { fill: ${({inFocus}) => inFocus ? '#0d0' : '#fff'}; }
  &:active { fill: ${({inFocus}) => inFocus ? '#0d0' : '#666'}; }
`;

export const OpenFocusMode = ({ inFocus, action }: { inFocus: boolean, action: () => void }): JSX.Element => (
  <FocusModeSVG
    onClick={action}
    inFocus={inFocus}
    height={20}
    width={20}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    {
      inFocus ?
      <>
        <polygon points="0 0 0 1.5 0 6 1.5 6 1.5 1.5 6 1.5 6 0 1.5 0 0 0"/>
        <polygon points="1.5 14 0 14 0 18.5 0 20 1.5 20 6 20 6 18.5 1.5 18.5 1.5 14"/>
        <polygon points="18.5 18.5 14 18.5 14 20 18.5 20 20 20 20 18.5 20 14 18.5 14 18.5 18.5"/>
        <polygon points="14 0 14 1.5 18.5 1.5 18.5 6 20 6 20 1.5 20 0 18.5 0 14 0"/>
      </> :
      <>
        <polygon points="4.5 0 4.5 4.5 0 4.5 0 6 4.5 6 6 6 6 4.5 6 0 4.5 0"/>
        <polygon points="15.5 4.5 15.5 0 14 0 14 4.5 14 6 15.5 6 20 6 20 4.5 15.5 4.5"/>
        <polygon points="0 14 0 15.5 4.5 15.5 4.5 20 6 20 6 15.5 6 14 4.5 14 0 14"/>
        <polygon points="15.5 14 14 14 14 15.5 14 20 15.5 20 15.5 15.5 20 15.5 20 14 15.5 14"/>
      </>
    }
  </FocusModeSVG>
);

export const StepIcon = styled.button<{ facingRight: boolean }>`
  background: none;
  border: none;
  width: 15px;
  height: 15px;
  position: relative;
  transform: ${({facingRight}) => facingRight ? 'scale(-1)' : 'scale(1)'};

  &::before {
    background-color: gray;
    content: '';
    width: 3px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:after {
    border-top: 7.8px solid transparent;
    border-right: 12px solid gray;
    border-bottom: 7.8px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &:hover {
    transform: ${({facingRight}) => facingRight ? 'scale(-1.05)' : 'rotate(1.05)'};
  }
  &:hover::before { background-color: white; }
  &:hover::after { border-right-color: white; }

  &:active {
    transform: ${({facingRight}) => facingRight ? 'scale(-1)' : 'rotate(1)'}
  }
  &:active::before { background-color: #666; }
  &:active::after { border-right-color: #666; }
`;

export const PauseIcon = styled.button`
  background: none;
  border: none;
  width: 15px;
  height: 15px;
  position: relative;

  &::before, &::after {
    background-color: black;
    content: '';
    width: 5px;
    height: 15px;
    position: absolute;
    top: 0;
  }
  &::before { left: 0; }
  &::after { right: 0; }
`;

export const PlayIcon = styled.button`
  background: none;
  border: none;
  width: 15px;
  height: 15px;
  position: relative;

  &::before {
    border-top: 8px solid transparent;
    border-left: 15px solid black;
    border-bottom: 8px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    left: 1px;
    bottom: -0.5px;
  }
`;

const PlayerIconBackground = styled.section`
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background-color: #ccc;
    transform: scale(1);
  }
`;

export const PlayerIcon = ({ action, isPaused }: { action: () => void, isPaused: boolean }): JSX.Element => (
  <PlayerIconBackground onClick={action}>
    { isPaused ? <PlayIcon /> : <PauseIcon /> }
  </PlayerIconBackground>
);
