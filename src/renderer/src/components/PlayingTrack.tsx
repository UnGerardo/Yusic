import { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import styled from "styled-components";
import { EllipsisOverflow } from "@renderer/assets/Misc.styled";

export default function PlayingTrack(): JSX.Element {
  const { playingTrack } = useContext(PlayingTrackContext);

  return playingTrack ?
    <PlayingTrackSection>
      <PlayingTrackImage
        src={playingTrack.imgData ? `data:${playingTrack.imgFormat};base64,${playingTrack.imgData}` : ''}
      />
      <TitleAndArtistSection>
        <PlayingTrackTitle>{playingTrack.title}</PlayingTrackTitle>
        <PlayingTrackArtist>{playingTrack.artists}</PlayingTrackArtist>
      </TitleAndArtistSection>
    </PlayingTrackSection> : <div></div>
}

export const PlayingTrackSection = styled.section`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 15px;
  align-items: center;
`;

export const PlayingTrackImage = styled.img`
  border-radius: 5px;
  width: 100%;
`;

export const TitleAndArtistSection = styled(EllipsisOverflow)``;

export const PlayingTrackTitle = styled(EllipsisOverflow)`
  font-size: 15px;
`;

export const PlayingTrackArtist = styled(EllipsisOverflow)`
  color: #a5a5a5;
  font-size: 12px;
`;
