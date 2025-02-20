import styled from "styled-components";

const X_SVG = ({ height, width, onClick, className }: { height: number, width: number, onClick: (e: any) => void, className?: string }) => {
  return (
    <StyledSVG
      className={className}
      onClick={onClick}
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44.55 44.55"
    >
      <rect x="-7.73" y="20.77" width="60" height="3" transform="translate(-9.23 22.27) rotate(-45)"/>
      <rect x="20.77" y="-7.73" width="3" height="60" transform="translate(-9.23 22.27) rotate(-45)"/>
    </StyledSVG>
  )
}

export default X_SVG;

const StyledSVG = styled.svg`
  --base-color: gray;
  --brighter-color: white;
  --darker-color: #666;
  fill: var(--base-color);

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;