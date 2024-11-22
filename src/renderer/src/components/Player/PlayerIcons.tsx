import styled from "styled-components";

const OpenFocusModeBottom = styled.div`
  &:before {
    border: 1.5px transparent solid;
    border-right-color: gray;
    border-top-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  &:after {
    border: 1.5px transparent solid;
    border-left-color: gray;
    border-top-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`;
const StyledOpenFocusMode = styled.button`
  background: none;
  border: none;
  height: 20px;
  width: 20px;
  position: relative;

  &:before {
    border: 1.5px transparent solid;
    border-right-color: gray;
    border-bottom-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  &:after {
    border: 1.5px transparent solid;
    border-left-color: gray;
    border-bottom-color: gray;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  &:hover {
    > ${OpenFocusModeBottom}::before {
      border-right-color: white;
      border-top-color: white;
    }
    > ${OpenFocusModeBottom}::after {
      border-left-color: white;
      border-top-color: white;
    }
  }
  &:hover::before {
    border-right-color: white;
    border-bottom-color: white;
  }
  &:hover::after {
    border-left-color: white;
    border-bottom-color: white;
  }

  &:active {
    > ${OpenFocusModeBottom}::before {
      border-right-color: #666;
      border-top-color: #666;
    }
    > ${OpenFocusModeBottom}::after {
      border-left-color: #666;
      border-top-color: #666;
    }
  }
  &:active::before {
    border-right-color: #666;
    border-bottom-color: #666;
  }
  &:active::after {
    border-left-color: #666;
    border-bottom-color: #666;
  }
`;

export const OpenFocusMode = ({ action }: { action: () => void }): JSX.Element => (
  <StyledOpenFocusMode onClick={action}>
    <OpenFocusModeBottom />
  </StyledOpenFocusMode>
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

export const RepeatIndicator = styled.div`
  background-color: #0d0;
  border-radius: 50%;
  height: 4px;
  width: 4px;
  position: absolute;
  top: 18px;
`;

export const RepeatSingleIndicator = styled.div`
  position: relative;

  &::before {
    background-color: black;
    content: '';
    height: 12px;
    width: 10px;
    position: absolute;
    top: -13px;
    left: -5px;
  }

  &::after {
    color: #0d0;
    content: '1';
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    top: -14px;
    left: -4px;
  }
`;

export const StyledRepeat = styled.div<{ status: RepeatStatus }>`
  --base-color: ${props => props.status === 'off' ? 'gray' : '#0d0'};
  --brighter-color: ${props => props.status === 'off' ? 'white' : '#0f0'};
  --darker-color: ${props => props.status === 'off' ? '#666' : '#0a0'};
  background: transparent;
  border: 2px solid var(--base-color);
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  width: 20px;
  position: relative;

  &:before {
    background-color: black;
    content: '';
    height: 3px;
    width: 6px;
    position: absolute;
    left: 4px;
    bottom: -2px;
  }

  &:after {
    border-top: 5px solid transparent;
    border-right: 6px solid var(--base-color);
    border-bottom: 5px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    right: 4px;
    bottom: -5.8px;
  }

  &:hover {
    border-color: var(--brighter-color);
    > ${RepeatIndicator} { background-color: var(--brighter-color); }
    > ${RepeatSingleIndicator}::after { color: var(--brighter-color); }
  }
  &:hover::after {
    border-right-color: var(--brighter-color);
  }

  &:active {
    border-color: var(--darker-color);
    > ${RepeatIndicator} { background-color: var(--darker-color); }
    > ${RepeatSingleIndicator}::after { color: var(--darker-color); }
  }
  &:active::after {
    border-right-color: var(--darker-color);
  }
`;

export const Repeat = ({ action, status }: { action: () => void, status: RepeatStatus }): JSX.Element => (
  <StyledRepeat onClick={action} status={status}>
    { status === 'off' ? <></> : <RepeatIndicator /> }
    { status === 'single' ? <RepeatSingleIndicator /> : <></> }
  </StyledRepeat>
);