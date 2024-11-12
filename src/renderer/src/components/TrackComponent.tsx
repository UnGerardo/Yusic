import { useContext, useEffect, useRef, useState } from "react";
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
  const $playlistBtnRef = useRef<HTMLButtonElement>(null);
  const $playlistMenuRef = useRef<HTMLUListElement>(null);
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

  const closePlaylistMenu = (event): void => {
    const $playlistBtn = $playlistBtnRef.current as unknown as HTMLElement
    const $playlistMenu = $playlistMenuRef.current as unknown as HTMLElement;
    if ($playlistMenu && !$playlistMenu.contains(event.target) && !$playlistBtn.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closePlaylistMenu);
    return () => {
      document.removeEventListener('mousedown', closePlaylistMenu);
    }
  }, []);

  return (
    <TrackSection onClick={playAtTrack} style={style}>
      <TrackImage src={`data:${track.imgFormat};base64,${track.imgData}`}/>
      <TrackInfo>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackArtist>{track.artists}</TrackArtist>
      </TrackInfo>
      <TrackAlbum>{track.album}</TrackAlbum>
      <TrackDuration>{formatSeconds(track.duration!)}</TrackDuration>
      <PlaylistButton ref={$playlistBtnRef} onClick={(e) => {
        setIsOpen((prev) => !prev);
        e.stopPropagation();
      }}>
        {isOpen &&
          <PlaylistMenu ref={$playlistMenuRef}>
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
      </PlaylistButton>
      <AddIcon onClick={addToQueue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 42">
        <rect width="34" height="6"/>
        <rect y="13" width="26" height="6"/>
        <rect y="26" width="34" height="6"/>
        <rect y="39" width="34" height="6"/>
        <polygon points="50 12.85 43.12 12.85 43.12 6 36.88 6 36.88 12.85 30 12.85 30 19.15 36.88 19.15 36.88 26 43.12 26 43.12 19.15 50 19.15 50 12.85"/>
      </AddIcon>

    </TrackSection>
  );
};

export default TrackComponent;

const TrackSection = styled.section`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 40px 18px 18px;
  align-items: center;
  gap: 20px;
  padding: 5px 28px 5px 5px;
  margin: 0 0 0 10px;

  &:hover {
    background-color: rgba(61, 61, 61, 0.5);
    cursor: pointer;
  }

  @media (max-width: 920px) {
    grid-template-columns: 60px 1fr 40px 18px 18px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 50px 1fr 18px 18px;
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

const PlaylistButton = styled.button`
  background: none;
  border: 2px solid gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  position: relative;

  &:before {
    background-color: gray;
    content: '';
    height: 2px;
    width: 8px;
    position: absolute;
  }

  &:after {
    background-color: gray;
    content: '';
    height: 8px;
    width: 2px;
    position: absolute;
  }

  &:hover { border-color: white; }
  &:hover::after { background-color: white; }
  &:hover::before { background-color: white; }

  &:active { border-color: #666; }
  &:active::after { background-color: #666; }
  &:active::before { background-color: #666; }
`;

const AddIcon = styled.svg`
  fill: gray;
  height: 18px;
  width: 18px;
  z-index: 10px;

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
  left: -64px;
  width: 150px;
  z-index: 11;
`;
