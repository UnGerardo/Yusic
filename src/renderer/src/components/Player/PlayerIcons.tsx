import styled from "styled-components";

const FocusModeSVG = styled.svg<{ inFocus: boolean }>`
  fill: ${({inFocus}) => inFocus ? '#0d0' : '#808080'};

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

const StepSVG = styled.svg`
  fill: #808080;

  &:hover { fill: #fff; }
  &:active { fill: #666; }
`;

export const ForwardStepIcon = ({ action }: { action: () => void }): JSX.Element => (
  <StepSVG onClick={action} height={15} width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
    <rect x="12.1" width="2.9" height="15"/>
    <path d="M11.77,7.02L.85.5C.47.28,0,.55,0,.98v13.03c0,.43.47.7.85.48l10.92-6.52c.36-.22.36-.74,0-.96Z"/>
  </StepSVG>
);

export const BackwardStepIcon = ({ action }: { action: () => void }): JSX.Element => (
  <StepSVG onClick={action} height={15} width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
    <rect x="0" y="0" width="2.9" height="15"/>
    <path d="M3.23,7.98l10.92,6.52c.37.22.85-.05.85-.48V.98c0-.43-.47-.7-.85-.48L3.23,7.02c-.36.22-.36.74,0,.96Z"/>
  </StepSVG>
);

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
    <svg height={15} width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
      {
        isPaused ?
        <path d="M14.67,6.98L.81.06C.44-.13,0,.14,0,.56v13.84c0,.42.44.69.81.5l13.86-6.92c.41-.21.41-.79,0-1Z"/> :
        <>
          <rect width="5" height="15"/>
          <rect x="10" width="5" height="15"/>
        </>
      }
    </svg>
  </PlayerIconBackground>
);
