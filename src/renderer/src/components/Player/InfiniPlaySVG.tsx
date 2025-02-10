import styled from "styled-components"


const InfiniPlaySVG = ({ action, on }: { action: () => void, on: boolean }): JSX.Element => {
  return (
    <IconWrapper>
      <StyledInfiniPlaySVG
        onClick={action}
        on={on}
        height={13}
        width={27}
        viewBox="0 0 83 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M63,7c3.47,0,6.74,1.35,9.19,3.81,2.46,2.46,3.81,5.72,3.81,9.19s-1.35,6.74-3.81,9.19c-2.46,2.46-5.72,3.81-9.19,3.81s-6.74-1.35-9.19-3.81l-7.36-7.36-1.83-1.83,1.83-1.83,7.36-7.36c2.46-2.46,5.72-3.81,9.19-3.81M20,7c3.47,0,6.74,1.35,9.19,3.81l7.36,7.36,1.83,1.83-1.83,1.83-7.36,7.36c-2.46,2.46-5.72,3.81-9.19,3.81s-6.74-1.35-9.19-3.81c-2.46-2.46-3.81-5.72-3.81-9.19s1.35-6.74,3.81-9.19c2.46-2.46,5.72-3.81,9.19-3.81M63,0c-5.12,0-10.24,1.95-14.14,5.86l-7.36,7.36-7.36-7.36C30.24,1.95,25.12,0,20,0S9.76,1.95,5.86,5.86c-7.81,7.81-7.81,20.47,0,28.28h0c3.91,3.91,9.02,5.86,14.14,5.86s10.24-1.95,14.14-5.86l7.36-7.36,7.36,7.36c3.91,3.91,9.02,5.86,14.14,5.86s10.24-1.95,14.14-5.86h0c7.81-7.81,7.81-20.47,0-28.28-3.91-3.91-9.02-5.86-14.14-5.86h0Z"/>
      </StyledInfiniPlaySVG>
    </IconWrapper>
  );
}

export default InfiniPlaySVG;

const IconWrapper = styled.div`
  position: relative;
  line-height: 1;
  height: 13px;

  &::before {
    content: "InfiniPlay";
    background-color: #333;
    border-radius: 5px;
    color: #ddd;
    font-size: medium;
    padding: 5px;
    position: absolute;
    top: -30px;
    left: -20px;
    opacity: 0;
    transition: 250ms;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

const StyledInfiniPlaySVG = styled.svg<{on: boolean}>`
  --base-color: ${({on}) => !on ? 'gray' : '#0d0'};
  --brighter-color: ${({on}) => !on ? 'white' : '#0f0'};
  --darker-color: ${({on}) => !on ? '#666' : '#0a0'};
  fill: var(--base-color);

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;