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
  font-size: 12px;
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