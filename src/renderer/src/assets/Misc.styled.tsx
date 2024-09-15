import styled from "styled-components";

export const EllipsisOverflow = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TrackImage = styled.img`
  border-radius: 5px;
  width: 100%;
`;

export const TrackInfo = styled(EllipsisOverflow)``;

export const TrackTitle = styled(EllipsisOverflow)`
  font-size: 15px;
`;

export const TrackArtist = styled(EllipsisOverflow)`
  color: #a5a5a5;
  font-size: 12px;
`;
