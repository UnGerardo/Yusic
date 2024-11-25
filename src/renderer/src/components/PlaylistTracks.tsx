import React, { useContext } from "react";
import TrackHeader from "./TrackHeader";
import AutoSizer from "react-virtualized-auto-sizer";
import { WindowList } from "@renderer/assets/Misc.styled";
import { useLoaderData } from "react-router-dom";
import TrackComponent from "./TrackComponent";
import { SearchQueryContext } from "@renderer/contexts/SearchQueryContext";
import isSubstrIgnoreCase from "@renderer/utils/isSubStrIgnoreCase";
import ReactTrack from "@renderer/react-classes/ReactTrack";

export async function loader({ params }) {
  const tracks = await window.databaseApi.getPlaylistTracks(params.playlistId) as ReactTrack[];
  const reactTracks = tracks.map(track => new ReactTrack(track));
  return { tracks: reactTracks };
}

const PlaylistTracks = React.memo(() => {
  const { tracks }: { tracks: ReactTrack[] } = useLoaderData() as any;
  const { searchQuery } = useContext(SearchQueryContext);

  let filteredTracks = tracks.filter(track => {
    return (
      isSubstrIgnoreCase(track.title!, searchQuery) ||
      isSubstrIgnoreCase(track.album!, searchQuery) ||
      isSubstrIgnoreCase(track.artists!, searchQuery)
    );
  });

  return (
    <>
      <TrackHeader />
      <div>
        <AutoSizer>
          {({ height, width }) => (
            <WindowList
              height={height}
              itemCount={filteredTracks.length}
              itemSize={91}
              width={width}
              style={{ overflowX: 'hidden' }}
            >
              {({ index, style }) => (
                <TrackComponent
                  key={filteredTracks[index].id}
                  index={index}
                  track={filteredTracks[index]}
                  tracks={filteredTracks}
                  style={style}
                />
              )}
            </WindowList>
          )}
        </AutoSizer>
      </div>
    </>
  );
});

export default PlaylistTracks;