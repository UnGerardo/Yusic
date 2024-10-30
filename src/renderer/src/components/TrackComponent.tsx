import { useContext, useState } from "react";
import formatSeconds from "@renderer/utils/formatSeconds";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import Track from "@classes/Track";
import styled from "styled-components";
import { ellipsisOverflow, TrackArtist, TrackImage, TrackInfo, TrackTitle } from "@renderer/assets/Misc.styled";
import Playlist from "@classes/Playlist";
import { useRouteLoaderData } from "react-router-dom";

const TrackComponent = ({ tracks, track, index, style } : { tracks: Track[], track: Track, index: number, style: React.CSSProperties }): JSX.Element => {
  const { setQueue, queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext);
  const { setAudioSource } = useContext(AudioSourceContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { playlists }: { playlists: Playlist[] } = useRouteLoaderData('root') as any;

  const playAtTrack = () => {
    setAudioSource(track.path);
    setPlayingTrack(track);
    setQueueIndex(index);
    setQueue(tracks);
  }

  const addToQueue = (e) => {
    e.stopPropagation();
    setQueue((oldQueue) => {
      oldQueue.splice(queueIndex + 1, 0, track);
      return [...oldQueue];
    });
  }

  return (
    <TrackSection onClick={playAtTrack} style={style}>
      <TrackImage src={`data:${track.imgFormat};base64,${track.imgData}`}/>
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
      <TrackAlbum>{track.album}</TrackAlbum>
      <TrackDuration>{formatSeconds(track.duration!)}</TrackDuration>
      <div style={{ position: 'relative' }}>
        <AddIcon style={{ zIndex: 10 }} onClick={(e) => {
          setIsOpen((prev) => !prev);
          e.stopPropagation();
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path d="M36.19,23.22h-9.33v-9.41c0-.45-.36-.81-.81-.81h-1.58c-.45,0-.81.36-.81.81v9.41h-9.85c-.45,0-.81.36-.81.81v1.58c0,.45.36.81.81.81h9.85v9.77c0,.45.36.81.81.81h1.58c.45,0,.81-.36.81-.81v-9.77h9.33c.45,0,.81-.36.81-.81v-1.58c0-.45-.36-.81-.81-.81Z"/>
          <path d="M25,0C11.19,0,0,11.19,0,25s11.19,25,25,25,25-11.19,25-25S38.81,0,25,0ZM25,45c-12.15,0-20-7.85-20-20S12.85,5,25,5s20,7.85,20,20-7.85,20-20,20Z"/>
        </AddIcon>
        {isOpen &&
          <PlaylistMenu>
            {
              playlists.map((playlist) =>
                <p onClick={(e) => {
                  window.databaseApi.addTrackToPlaylist(playlist.id!, track.id!);
                  e.stopPropagation();
                }}>{playlist.name}</p>
              )
            }
          </PlaylistMenu>
        }
      </div>
      <div style={{ position: 'relative' }}>
        <AddIcon style={{ zIndex: 10 }} onClick={addToQueue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43.6">
          <rect width="46.51" height="6.98"/>
          <rect y="12.21" width="35.47" height="6.98"/>
          <rect y="24.42" width="46.51" height="6.98"/>
          <rect y="36.63" width="46.51" height="6.98"/>
          <rect x="43.02" y="9.88" width="2.33" height="11.63"/>
          <rect x="43.02" y="9.88" width="2.33" height="11.63" transform="translate(59.88 -28.49) rotate(90)"/>
        </AddIcon>
      </div>

    </TrackSection>
  );
};

export default TrackComponent;

const TrackSection = styled.section`
  border-bottom: 1px gray solid;
  display: grid;
  grid-template-columns: 80px 2fr 2fr 1fr 20px 0.3fr;
  align-items: center;
  gap: 10px;
  padding: 5px;
  margin: 0 10px 0;

  &:hover {
    background-color: #3d3d3f;
    cursor: pointer;
  }

  @media (max-width: 920px) {
    grid-template-columns: 60px 2fr 1fr 20px 0.3fr;
  }

  @media (max-width: 820px) {
    grid-template-columns: 50px 1fr 20px 0.3fr;
  }
`;

const TrackAlbum = styled.p`
  ${ellipsisOverflow};

  @media (max-width: 920px) {
    display: none;
  }
`;

const TrackDuration = styled.p`
  @media (max-width: 820px) {
    display: none;
  }
`;

const AddIcon = styled.svg`
  fill: gray;
  height: 15px;
  width: 15px;

  &:hover {
    fill: #fff;
    transform: scale(1.05);
  }

  &:active {
    fill: rgb(100, 100, 100);
    transform: scale(1);
  }
`;

const PlaylistMenu = styled.ul`
  background-color: black;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 10px;
  margin: 0;
  position: absolute;
  top: 50px;
  left: -120px;
  width: 150px;
  z-index: 100;
`;
