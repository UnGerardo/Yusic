import React from "react";
import TrackHeader from "./TrackHeader";
import AutoSizer from "react-virtualized-auto-sizer";
import { WindowList } from "@renderer/assets/Misc.styled";
import { useLoaderData } from "react-router-dom";
import TrackComponent from "./TrackComponent";
import Track from "@classes/Track";

export async function loader({ params }) {
  const tracks = await window.databaseApi.getPlaylistTracks(params.playlistId);
  return tracks;
}

const PlaylistTracks = React.memo(() => {
  const tracks = useLoaderData() as Track[];

  return (
    <>
      <TrackHeader />
      <div>
        <AutoSizer>
          {({ height, width }) => (
            <WindowList
              height={height}
              itemCount={tracks.length}
              itemSize={91}
              width={width}
              style={{ overflowX: 'hidden' }}
            >
              {({ index, style }) => (
                <TrackComponent
                  key={tracks[index].id}
                  index={index}
                  track={tracks[index]}
                  tracks={tracks}
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