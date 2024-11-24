import { useRouteLoaderData } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import Playlist from "@classes/Playlist";
import { LibraryCollection, TrackImage, WindowList } from "@renderer/assets/Misc.styled";
import { useEffect, useState } from "react";
import combineImages from "@renderer/utils/combineImages";

const PlaylistList = (): JSX.Element => {
  const { playlists }: { playlists: Playlist[] } = useRouteLoaderData('root') as any;
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
              // on click set route id to 'playlist' for loaderdata
              <LibraryCollection
                key={playlists[index]?.id}
                to={`/playlist/${playlists[index]?.id}`}
                style={style}
                draggable={false}
              >
                <TrackImage src={playlistImages[index]} />
                {playlists[index]?.name}
              </LibraryCollection>
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
