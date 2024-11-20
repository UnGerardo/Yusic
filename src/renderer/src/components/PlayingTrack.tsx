import React, { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";

const PlayingTrack = React.memo(({ focusModeOn }: { focusModeOn: boolean }): JSX.Element => {
  const { playingTrack } = useContext(PlayingTrackContext);

  return playingTrack && !focusModeOn ?
    <PlayingTrackSection>
      <TrackImage src={`data:${playingTrack.imgFormat};base64,${playingTrack.imgData}`}/>
      <TrackInfo>
        <TrackTitle>{playingTrack.title}</TrackTitle>
        <TrackArtist>{playingTrack.artists}</TrackArtist>
      </TrackInfo>
    </PlayingTrackSection> : <div></div>
});

export default PlayingTrack;

const PlayingTrackSection = styled.section`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 15px;
  align-items: center;
  user-select: none;
`;