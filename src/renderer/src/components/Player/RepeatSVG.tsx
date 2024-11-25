import styled from "styled-components";

const RepeatSVG = ({ action, status }: { action: () => void, status: RepeatStatus }): JSX.Element => {
  return (
    <StyledRepeatSVG
      onClick={action}
      status={status}
      height={25.46}
      width={20}
      viewBox="0 0 20 25.46"
      xmlns="http://www.w3.org/2000/svg"
    >
      {
        status !== 'single' ?
          <path id="main" d={completePath}/> :
          <g>
            <path id="left" d={splitPathLeft} />
            <path id="right" d={splitPathRight} />
          </g>
      }
      { status === 'single' ? <path id="one" d={numberPath}/> : <></> }
      <path id="arrow" d={arrowPath}/>
      { status === 'off' ? <></> : <circle cx="10" cy='23.46' r="2"/> }
    </StyledRepeatSVG>
  );
}

export default RepeatSVG;

const numberPath = "M9.91,1.35h-.03l-1.86,1.01-.28-1.1,2.34-1.25h1.24v10.71h-1.4V1.35Z";
const completePath = "M17.75,2.96H2.25c-1.24,0-2.25.98-2.25,2.19v10.62c0,1.21,1.01,2.19,2.25,2.19h3.5v-1.76h-2.85c-.6,0-1.08-.47-1.08-1.05V5.77c0-.58.48-1.05,1.08-1.05h14.2c.6,0,1.08.47,1.08,1.05v9.37c0,.58-.48,1.05-1.08,1.05h-2.85v1.76h3.5c1.24,0,2.25-.98,2.25-2.19V5.14c0-1.21-1.01-2.19-2.25-2.19Z";
const splitPathLeft = "M1.82,15.14V5.77c0-.58.48-1.05,1.08-1.05h2.87v-1.76h-3.52c-1.24,0-2.25.98-2.25,2.19v10.62c0,1.21,1.01,2.19,2.25,2.19h3.5v-1.76h-2.85c-.6,0-1.08-.47-1.08-1.05Z";
const splitPathRight = "M17.75,2.96h-3.47v1.76h2.82c.6,0,1.08.47,1.08,1.05v9.37c0,.58-.48,1.05-1.08,1.05h-2.85v1.76h3.5c1.24,0,2.25-.98,2.25-2.19V5.14c0-1.21-1.01-2.19-2.25-2.19Z";
const arrowPath = "M9.04,17.3l4.77,3.27c.24.16.55,0,.55-.29v-6.54c0-.29-.32-.45-.55-.29l-4.77,3.27c-.21.14-.21.44,0,.58Z";

const StyledRepeatSVG = styled.svg<{ status: RepeatStatus }>`
  --base-color: ${({status}) => status === 'off' ? 'gray' : '#0d0'};
  --brighter-color: ${({status}) => status === 'off' ? 'white' : '#0f0'};
  --darker-color: ${({status}) => status === 'off' ? '#666' : '#0a0'};
  fill: var(--base-color);
  align-self: flex-start;
  margin-top: 6.25px;

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;