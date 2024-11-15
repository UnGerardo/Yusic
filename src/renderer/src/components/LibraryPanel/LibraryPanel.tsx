import React from "react";
import styled from "styled-components";
import NewPlaylistForm from "./NewPlaylistForm";
import PlaylistList from "./PlaylistList";
import { LibraryCollection } from "@renderer/assets/Misc.styled";

const LibraryPanel = React.memo(({ openSettings }: { openSettings: () => void }): JSX.Element => {

  return (
    <StyledLibraryPanel>
      <button onClick={openSettings}>Settings</button>
      <LibraryCollection to={'/'}>Tracks</LibraryCollection>
      <LibraryCollection to={'/artists'}>Artists</LibraryCollection>
      <LibraryCollection to={'/albums'}>Ablum</LibraryCollection>
      <NewPlaylistForm />
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
  min-width: 100px;
  max-width: 100px;
  z-index: 3;
`;
