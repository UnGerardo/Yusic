import React, { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";

import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";

const PlayingTrack = React.memo(({ inFocus }: { inFocus: boolean }): JSX.Element => {
  const { playingTrack } = useContext(PlayingTrackContext);

  return playingTrack ?
    <PlayingTrackSection inFocus={inFocus}>
      <ModTrackImage inFocus={inFocus} src={`data:${playingTrack.imgFormat};base64,${playingTrack.imgData}`}/>
      <ModTrackInfo inFocus={inFocus}>
        <TrackTitle>{playingTrack.title}</TrackTitle>
        <TrackArtist>{playingTrack.artists}</TrackArtist>
      </ModTrackInfo>
    </PlayingTrackSection> : <></>
});

export default PlayingTrack;

const PlayingTrackSection = styled.section<{ inFocus: boolean }>`
  display: grid;
  grid-template-columns: ${({inFocus}) => inFocus ? '150px 1fr' : '60px 1fr'};
  gap: 15px;
  width: ${({inFocus}) => inFocus ? '90%' : '30%'};
  position: absolute;
  bottom: 20px;
  left: 20px;
  transition: 500ms;
  user-select: none;

  & * {
    transition: 500ms;
  }
`;

const ModTrackImage = styled(TrackImage)<{ inFocus: boolean }>`
  border-radius: ${({inFocus}) => inFocus ? '10%' : '5px'};
`;

const ModTrackInfo = styled(TrackInfo)<{ inFocus: boolean }>`
  align-self: flex-end;
  padding-bottom: ${({inFocus}) => inFocus ? '10px' : '6.805px'};

  ${TrackTitle} {
    font-size: ${({inFocus}) => inFocus ? '20px' : '15px'};
  }
  ${TrackArtist} {
    font-size: ${({inFocus}) => inFocus ? '19px' : '14px'};
  }
`;