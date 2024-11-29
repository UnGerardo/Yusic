import React, { useContext } from "react";
import styled from "styled-components";
import NewPlaylistForm from "./NewPlaylistForm";
import PlaylistList from "./PlaylistList";
import { LibraryCollection } from "@renderer/assets/Misc.styled";
import { PlaylistIdContext } from "@renderer/contexts/PlaylistIdContext";

const LibraryPanel = React.memo(({ openSettings }: { openSettings: () => void }): JSX.Element => {
  const { setPlaylistId } = useContext(PlaylistIdContext);

  return (
    <StyledLibraryPanel>
      <OpenSettings onClick={openSettings}>
        <OpenSettingsLastDot />
      </OpenSettings>
      <NewPlaylistForm />
      <Collection onClick={() => setPlaylistId(0)} to={'/'} draggable={false}>
        <TracksIcon /> Tracks
      </Collection>
      <Collection to={'/artists'} draggable={false}>
        <ArtistIcon /> Artists
      </Collection>
      <Collection to={'/albums'} draggable={false}>
        <AlbumsIcon>
          <AlbumRows />
          <MusicIcon />
        </AlbumsIcon>
        Albums
      </Collection>
      <PlaylistList />
    </StyledLibraryPanel>
  );
});

export default LibraryPanel;

const StyledLibraryPanel = styled.section`
  border-right: 1px white solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 150px;
  max-width: 150px;
  z-index: 3;
`;

const Collection = styled(LibraryCollection)`
  grid-template-columns: 30px 1fr;
  padding: 0 0 0 10px;
  margin-bottom: 0;
  height: 35px;
`;

const OpenSettingsLastDot = styled.div`
  background-color: gray;
  border-radius: 5px;
  height: 5px;
  width: 5px;
  position: absolute;
  left: 20px;
`;

const OpenSettings = styled.button`
  background: none;
  border: none;
  height: 25px;
  width: 25px;
  position: relative;

  &::before, &::after {
    background-color: gray;
    border-radius: 5px;
    content: '';
    height: 5px;
    width: 5px;
    position: absolute;
  }

  &::before { left: 0; }
  &::after { left: 10px; }

  &:hover {
    ${OpenSettingsLastDot} {
      background-color: white;
    }
  }
  &:hover::before, &:hover::after { background-color: white; }

  &:active {
    ${OpenSettingsLastDot} {
      background-color: #666;
    }
  }
  &:active::before, &:active::after { background-color: #666; }
`;

const TracksIcon = styled.div`
  border: 2px solid gray;
  border-radius: 50%;
  justify-self: center;
  margin-right: 5px;
  height: 28px;
  width: 28px;
  position: relative;

  &::before {
    border: 2px solid gray;
    border-radius: 50%;
    content: '';
    height: 10px;
    width: 10px;
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
  }
  &::after {
    background-color: gray;
    border-radius: 50%;
    content: '';
    height: 2px;
    width: 2px;
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 1px);
  }

  &:hover, &:hover::before { border-color: white; }
  &:hover::after { background-color: white; }
  &:active, &:active::before { border-color: #666; }
  &:active::after { background-color: #666; }
`;

const ArtistIcon = styled.div`
  justify-self: center;
  height: 28px;
  width: 28px;
  margin-right: 5px;
  position: relative;

  &::before {
    background-color: gray;
    border-radius: 50%;
    content: '';
    height: 10px;
    width: 10px;
    position: absolute;
    top: 2pxpx;
    left: calc(50% - 5px);
  }
  &::after {
    content: '';
    background-color: gray;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom: 0;
    width: 24px;
    height: 12px;
    position: absolute;
    top: 14px;
    left: 2px;
  }

  &:hover::before,
  &:hover::after { background-color: white; }
  &:active::before,
  &:active::after { background-color: #666; }
`;

const AlbumRows = styled.div`
  &::before, &::after {
    content: '';
    background-color: gray;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom: 0;
    height: 2px;
    width: 20px;
    position: absolute;
    top: 6.25px;
    left: 4px;
  }

  &::before {
    height: 1.5px;
    width: 14px;
    top: 3.5px;
    left: 7px;
  }
`;

const AlbumsIcon = styled.div`
  justify-self: center;
  height: 28px;
  width: 28px;
  margin-right: 5px;
  position: relative;

  &::before {
    background-color: gray;
    border-radius: 10%;
    content: '';
    height: 16px;
    width: 24px;
    position: absolute;
    top: 10px;
    left: 2px;
  }

  &:hover {
    ${AlbumRows} {
      background-color: white;
    }
  }
  &:hover::before { background-color: white; }

  &:active {
    ${AlbumRows} {
      background-color: #666;
    }
  }
  &:active::before { background-color: #666; }
`;

const MusicIcon = styled.div`
  background-color: black;
  border-radius: 2px;
  height: 10px;
  width: 2px;
  position: absolute;
  top: 12px;
  left: calc(50% - 1px);

  &::before {
    background-color: black;
    border-radius: 2px;
    content: '';
    height: 5px;
    width: 2px;
    position: absolute;
    left: 2px;
    transform: rotate(-45deg);
  }

  &::after {
    background-color: black;
    border-radius: 50%;
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    left: -4px;
    bottom: -2px;
  }
`;