import styled from "styled-components";

const OpenSettingsSVG = ({ action }: { action: () => void }): JSX.Element => (
  <StyledSVG
    onClick={action}
    width={30}
    height={29}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 6"
  >
    <circle cx="3" cy="3" r="3"/>
    <circle cx="15" cy="3" r="3"/>
    <circle cx="27" cy="3" r="3"/>
  </StyledSVG>
);

export default OpenSettingsSVG;

const StyledSVG = styled.svg`
  --base-color: gray;
  --brighter-color: white;
  --darker-color: #666;
  fill: var(--base-color);

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;