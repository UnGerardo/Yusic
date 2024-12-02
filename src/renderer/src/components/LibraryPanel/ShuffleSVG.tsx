import { useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { AudioSourceContext } from "@renderer/contexts/AudioSourceContext";
import shuffleArray from "../../utils/shuffleArray";
import createReactTracks from "@renderer/utils/createReactTracks";
import ReactTrack from "@renderer/react-classes/ReactTrack";
import isSubstrIgnoreCase from "@renderer/utils/isSubStrIgnoreCase";
import { SearchQueryContext } from "@renderer/contexts/SearchQueryContext";
import { PlaylistIdContext } from "@renderer/contexts/PlaylistIdContext";

const ShuffleSVG = () => {
  const { tracks, playlistTrackIds }: { tracks: ReactTrack[], playlistTrackIds: Record<number, number[]> } = useRouteLoaderData('root') as any;
  const { setQueue, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext)
  const { setAudioSource } = useContext(AudioSourceContext);
  const { searchQuery } = useContext(SearchQueryContext);
  const { playlistId } = useContext(PlaylistIdContext);

  const shuffle = (): void => {
    let filteredTracks = tracks.filter(track => {
      return (
        // if playlistId is 0 (meaning no playlist selected), skip the id check
        (playlistId === 0 || playlistTrackIds[playlistId].includes(track.id)) && (
          isSubstrIgnoreCase(track.title!, searchQuery) ||
          isSubstrIgnoreCase(track.album!, searchQuery) ||
          isSubstrIgnoreCase(track.artists!, searchQuery)
        )
      );
    });
    // Use createReactTracks() when creating a new queue
    const newQueue: ReactTrack[] = createReactTracks(shuffleArray([...filteredTracks]));

    setQueue(newQueue);
    setQueueIndex(0);
    setPlayingTrack(newQueue[0]);
    setAudioSource(newQueue[0].path);
  }

  return (
    <StyledSVG
    onClick={shuffle}
      width={35}
      height={29}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 29"
    >
      <path d="M5.37,19.96c-.22.23-.49.35-.77.35H1.21c-.67,0-1.21.69-1.21,1.54v2.58c0,.85.54,1.54,1.21,1.54h4.62c.28,0,.55-.13.77-.35l5.49-5.8-3.28-3.49-3.44,3.64Z"/>
      <path d="M34.28,4.6L26.86.2c-.96-.57-2.17.14-2.17,1.28v1.69h-3c-.28,0-.55.13-.77.35l-5.5,5.81,3.28,3.49,3.45-3.65c.22-.23.49-.35.77-.35h1.77v1.45c0,1.14,1.2,1.86,2.17,1.28l7.41-4.4c.96-.57.96-2,0-2.57Z"/>
      <path d="M34.28,21.83l-7.41-4.4c-.96-.57-2.17.14-2.17,1.28v1.54h-1.77c-.28,0-.55-.13-.77-.35L6.6,3.47c-.22-.23-.49-.35-.77-.35H1.21c-.67,0-1.21.69-1.21,1.54v2.58c0,.85.54,1.54,1.21,1.54h3.39c.28,0,.55.13.77.35l15.56,16.44c.22.23.49.35.77.35h3v1.6c0,1.14,1.2,1.86,2.17,1.28l7.41-4.4c.96-.57.96-2,0-2.57Z"/>
    </StyledSVG>
  )
}

export default ShuffleSVG;


const StyledSVG = styled.svg`
  --base-color: gray;
  --brighter-color: white;
  --darker-color: #666;
  fill: var(--base-color);

  &:hover { fill: var(--brighter-color); }
  &:active { fill: var(--darker-color); }
`;