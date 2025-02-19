import { PlaylistsContext } from "@renderer/contexts/PlaylistsContext";
import { useContext, useState } from "react";
import styled from "styled-components";

const PlaylistMenu = ({ inputRef, trackId }: { inputRef: React.RefObject<HTMLElement>, trackId: number }): JSX.Element => {
  const { playlists, setPlaylists } = useContext(PlaylistsContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleTrack = async (playlistId: number, inPlaylist: boolean) => {
    if (!playlists || isUpdating) return;

    try {
      setIsUpdating(true);
      if (inPlaylist) {
        await window.databaseApi.removeTrackFromPlaylist(playlistId, trackId);
      } else {
        await window.databaseApi.addTrackToPlaylist(playlistId, trackId);
      }
      setPlaylists((playlists) => {
        if (!playlists) return null;

        const playlist = playlists[playlistId];
        const updatedTrackIds = inPlaylist ?
          playlist.trackIds.filter((id: number) => id !== trackId) :
          [...playlist.trackIds, trackId];

        return {
          ...playlists,
          [playlistId]: {
            ...playlist,
            trackIds: updatedTrackIds
          }
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    // stopPropagation() to prevent PlaylistButton handler from running
    <StyledPlaylistMenu ref={inputRef} onClick={e => e.stopPropagation()}>
      {
        playlists ?
        Object.keys(playlists).map((playlistId) => {
          const inPlaylist = playlists[playlistId].trackIds.includes(trackId);

          return (
            <Playlist isUpdating={isUpdating} onClick={() => toggleTrack(parseInt(playlistId), inPlaylist)}>
              <input type="checkbox" checked={inPlaylist} />
              <p>{playlists[playlistId].name}</p>
            </Playlist>
          );
        }) :
        <p>No Playlists</p>
      }
    </StyledPlaylistMenu>
  );
};

export default PlaylistMenu;

const StyledPlaylistMenu = styled.section`
  background-color: black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: medium;
  padding: 10px;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 11;
`;

const Playlist = styled.label<{ isUpdating: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  opacity: ${({isUpdating}) => isUpdating ? '.5' : '1'};

  :first-child {
    margin: 0 10px 0 0;
  }
`;