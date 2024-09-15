import { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";

export default function PlayingTrack(): JSX.Element {
  const { playingTrack } = useContext(PlayingTrackContext);

  return playingTrack ?
    <PlayingTrackSection>
      <TrackImage src={`data:${playingTrack.imgFormat};base64,${playingTrack.imgData}`}/>
      <TrackInfo>
        <TrackTitle>{playingTrack.title}</TrackTitle>
        <TrackArtist>{playingTrack.artists}</TrackArtist>
      </TrackInfo>
    </PlayingTrackSection> : <div></div>
}

const PlayingTrackSection = styled.section`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 15px;
  align-items: center;
  user-select: none;
`;