import React, { useContext } from "react";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import defaultTrackImage from "../../assets/defaultTrackImage.svg";

import styled from "styled-components";
import { TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import { PlayerTimeContext } from "@renderer/contexts/PlayerTimeContext";

const PlayingTrack = React.memo(({ inFocus }: { inFocus: boolean }): JSX.Element => {
  const { playingTrack } = useContext(PlayingTrackContext);
  const { currentTime, maxTime } = useContext(PlayerTimeContext);

  return playingTrack ?
    <PlayingTrackSection inFocus={inFocus} trackProgress={currentTime/maxTime}>
      <ModTrackImage src={playingTrack.imgData !== '' ? `data:${playingTrack.imgFormat};base64,${playingTrack.imgData}` : defaultTrackImage}/>
      <ModTrackInfo inFocus={inFocus}>
        <TrackTitle>{playingTrack.title}</TrackTitle>
        <TrackArtist>{playingTrack.artists}</TrackArtist>
      </ModTrackInfo>
    </PlayingTrackSection> : <></>
});

export default PlayingTrack;

const PlayingTrackSection = styled.section<{ inFocus: boolean, trackProgress: number }>`
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

  &::after {
    background: ${({inFocus, trackProgress}) => inFocus ?
      `linear-gradient(
        to right,
        transparent 0%,
        transparent ${trackProgress * 100}%,
        rgba(0, 0, 0, 0.5) ${trackProgress * 100}%,
        rgba(0, 0, 0, 0.5) 100%
      );` :
      'none'
    };
    border-radius: 10%;
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: ${({inFocus}) => inFocus ? 'calc(100% - 150px)' : 'calc(100% - 60px)'};
    transition: 500ms;
  }
`;

const ModTrackImage = styled(TrackImage)`
  border-radius: 10%;
`;

const ModTrackInfo = styled(TrackInfo)<{ inFocus: boolean }>`
  align-self: flex-end;
  padding-bottom: ${({inFocus}) => inFocus ? '10px' : '6.805px'};
  width: fit-content;

  :hover {
    background-color: black;
    padding: 0 10px;
    border-radius: 5px;
  }

  ${TrackTitle} {
    font-size: ${({inFocus}) => inFocus ? '20px' : '15px'};
  }
  ${TrackArtist} {
    font-size: ${({inFocus}) => inFocus ? '19px' : '14px'};
  }
`;