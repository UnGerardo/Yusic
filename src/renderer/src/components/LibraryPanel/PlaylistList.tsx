import { useRouteLoaderData } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import Playlist from "@classes/Playlist";
import { LibraryCollection, WindowList } from "@renderer/assets/Misc.styled";

const PlaylistList = (): JSX.Element => {
  const { playlists }: { playlists: Playlist[] } = useRouteLoaderData('root') as any;

  return (
    <StyledPlaylistList>
      <AutoSizer>
        {({ height, width }) => (
          <WindowList
            height={height}
            itemCount={playlists.length}
            itemSize={30}
            width={width}
            style={{ overflowX: 'hidden' }}
          >
            {({ index, style }) => (
              <LibraryCollection
                key={playlists[index]?.id}
                to={`/playlist/${playlists[index]?.id}`}
                style={style}
              >
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
  width: 100%;
`;
