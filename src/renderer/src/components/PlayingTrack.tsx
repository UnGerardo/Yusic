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

const PlayingTrackSection = styled.section`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 15px;
  align-items: center;
`;

const PlayingTrackImage = styled.img`
  border-radius: 5px;
  width: 100%;
`;

const TitleAndArtistSection = styled(EllipsisOverflow)``;

const PlayingTrackTitle = styled(EllipsisOverflow)`
  font-size: 15px;
`;

const PlayingTrackArtist = styled(EllipsisOverflow)`
  color: #a5a5a5;
  font-size: 12px;
`;
