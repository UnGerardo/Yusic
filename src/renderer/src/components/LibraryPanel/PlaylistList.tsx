import { useRouteLoaderData } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import Playlist from "@classes/Playlist";
import { TrackImage, WindowList } from "@renderer/assets/Misc.styled";
import { useContext, useEffect, useState } from "react";
import combineImages from "@renderer/utils/combineImages";
import { PlaylistIdContext } from "@renderer/contexts/PlaylistIdContext";

const PlaylistList = (): JSX.Element => {
  const { playlists }: { playlists: Playlist[] } = useRouteLoaderData('root') as any;
  const { playlistId, setPlaylistId } = useContext(PlaylistIdContext);
  const [playlistImages, setPlaylistImages] = useState<string[]>([]);

  useEffect(() => {
    async function getCompositeImages() {
      const compositeImages: string[] = [];

      for (const playlist of playlists) {
        const tracks = await window.databaseApi.getFirstFourPlaylistTracks(playlist.id!);
        const images = tracks.map(track => `data:${track.imgFormat};base64,${track.imgData}`);
        compositeImages.push(await combineImages(images));
      }

      setPlaylistImages(compositeImages);
    }

    getCompositeImages();
  }, []);

  return (
    <StyledPlaylistList>
      <AutoSizer>
        {({ height, width }) => (
          <WindowList
            height={height}
            itemCount={playlists.length}
            itemSize={60}
            width={width}
            style={{ overflowX: 'hidden' }}
          >
            {({ index, style }) => (
              <StyledPlaylist
                key={playlists[index].id}
                style={style}
                isSelected={playlists[index].id === playlistId}
                onClick={() => setPlaylistId(playlists[index].id!)}
                draggable={false}
              >
                <TrackImage src={playlistImages[index]} />
                {playlists[index]?.name}
              </StyledPlaylist>
            )}
          </WindowList>
        )}
      </AutoSizer>
    </StyledPlaylistList>
  );
}

export default PlaylistList;

const StyledPlaylistList = styled.div`
  flex: 1;
  margin-top: 5px;
  width: 100%;
`;

const StyledPlaylist = styled.section<{ isSelected: boolean }>`
  background-color: ${({isSelected}) => isSelected ? 'rgba(255, 255, 255, 0.15)' : 'none'};
  color: white;
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0 0 0 10px;
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
  text-decoration: none;
  user-select: none;
`;