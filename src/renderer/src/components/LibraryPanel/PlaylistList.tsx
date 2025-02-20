import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import { TrackImage, WindowList } from "@renderer/assets/Misc.styled";
import { useContext, useEffect, useState } from "react";
import combineImages from "@renderer/utils/combineImages";
import { TrackMapContext } from "@renderer/contexts/TrackMapContext";
import { PlaylistIdContext } from "@renderer/contexts/PlaylistIdContext";
import { PlaylistsContext } from "@renderer/contexts/PlaylistsContext";
import Loader from "../Loader";

const PlaylistList = (): JSX.Element => {
  const { trackMap } = useContext(TrackMapContext);
  const { playlists } = useContext(PlaylistsContext);
  const { playlistId, setPlaylistId } = useContext(PlaylistIdContext);
  const [playlistImages, setPlaylistImages] = useState<string[]>([]);

  const playlistIds: number[] = playlists ? Object.keys(playlists).map(key => parseInt(key)) : [];

  useEffect(() => {
    async function getCompositeImages() {
      if (!trackMap || !playlists) return;

      const compositeImages: string[] = [];

      for (const playlistId in playlists) {
        const images = playlists[playlistId].trackIds
          .slice(0, 4)
          .map(id => trackMap[id])
          .map(track => `data:${track.imgFormat};base64,${track.imgData}`);
        compositeImages.push(await combineImages(images));
      }

      setPlaylistImages(compositeImages);
    }

    getCompositeImages();
  }, [playlists, trackMap]);

  return (
    playlists ?
    <StyledPlaylistList>
      <AutoSizer>
        {({ height, width }) => (
          <WindowList
            height={height}
            itemCount={playlistIds.length}
            itemSize={60}
            width={width}
            style={{ overflowX: 'hidden' }}
          >
            {({ index, style }) => (
              <StyledPlaylist
                key={playlistIds[index]}
                style={style}
                isSelected={playlistIds[index] === playlistId}
                onClick={() => setPlaylistId(playlistIds[index])}
                draggable={false}
              >
                <TrackImage src={playlistImages[index]} />
                {playlists ? playlists[playlistIds[index]].name : ''}
              </StyledPlaylist>
            )}
          </WindowList>
        )}
      </AutoSizer>
    </StyledPlaylistList> :
    <Loader />
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