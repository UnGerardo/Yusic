import { FixedSizeList } from "react-window";
import styled, { css } from "styled-components";

export const ellipsisOverflow = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const scrollbar = css`
  scrollbar-color: gray rgb(43, 43, 43);
  scrollbar-width: thin;
`;

export const WindowList = styled(FixedSizeList)`
  ${scrollbar};
`;

export const TrackImage = styled.img`
  border-radius: 5px;
  width: 100%;
`;

export const TrackInfo = styled.section`
  ${ellipsisOverflow};
`;

export const TrackTitle = styled.p`
  ${ellipsisOverflow};
  font-size: 15px;
`;

export const TrackArtist = styled.p`
  ${ellipsisOverflow};
  color: #a5a5a5;
  font-size: 14px;
`;

export const BigIcon = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 8px;
  height: 50px;
  width: 50px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Slider = styled.input<{ value: number, max: number }>`
  appearance: none;
  background: linear-gradient(
    to right,
    white 0%,
    white ${(props) => (props.value/props.max) * 100}%,
    #555 ${(props) => (props.value/props.max) * 100}%,
    #555 100%
  );
  border-radius: 5px;
  margin: 0 5px;
  outline: none;
  height: 4px;
  width: 100%;
  max-width: 600px;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      to right,
      #AAA 0%,
      #AAA ${(props) => (props.value/props.max) * 100}%,
      #555 ${(props) => (props.value/props.max) * 100}%,
      #555 100%
    );

    &::-webkit-slider-thumb {
      appearance: initial;
      background-color: white;
      border-radius: 100%;
      width: 10px;
      height: 10px;
    }
  }

  &::-webkit-slider-thumb {
    appearance: none;
  }
`;

export const StyledSetting = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;