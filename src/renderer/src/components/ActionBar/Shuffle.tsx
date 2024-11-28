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

const Shuffle = () => {
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
    <ShuffleBody onClick={shuffle}>
      <ArrowHeads />
    </ShuffleBody>
  )
}

export default Shuffle;

const ShuffleBody = styled.button`
  background: none;
  border: none;
  position: relative;
  width: 50px;
  height: 50px;
  transform: scale(0.7);

  &::before,
  &::after {
    content: "";
    box-sizing: content-box;
    position: absolute;
    top: 5px;
    left: 0;
    width: 25px;
    height: 25px;
    border: 8px solid gray;
    border-radius: 50px 50px 0 50px;
    transform: rotate(-45deg);
  }
  &::before {
    border-top-color: transparent;
    border-left-color: transparent;
    left: -21px;
  }
  &::after {
    border-top-color: transparent;
    border-right-color: transparent;
    left: 26px;
    border-radius: 50px 50px 50px 0;
    transform: rotate(45deg);
  }

  &:hover {
    &::before {
      border-bottom-color: white;
      border-right-color: white;
    }
    &::after {
      border-bottom-color: white;
      border-left-color: white;
    }
    & ::after,
    & ::before { border-left-color: white; }
  }

  &:active {
    &::before {
      border-bottom-color: #666;
      border-right-color: #666;
    }
    &::after {
      border-bottom-color: #666;
      border-left-color: #666;
    }
    & ::after,
    & ::before { border-left-color: #666; }
  }
`;

const ArrowHeads = styled.div`
  &::before {
    border-top: 8px solid transparent;
    border-left: 12px solid gray;
    border-bottom: 8px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    right: -8px;
    top: 0.8px;
  }
  &::after {
    border-top: 8px solid transparent;
    border-left: 12px solid gray;
    border-bottom: 8px solid transparent;
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    right: -8px;
    bottom: 0.2px;
  }
`;