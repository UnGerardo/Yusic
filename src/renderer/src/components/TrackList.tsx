import React, { useContext } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import { useRouteLoaderData } from 'react-router-dom';

import { SearchQueryContext } from '@contexts/SearchQueryContext';
import TrackComponent from "./TrackComponent";
import { WindowList } from '@renderer/assets/Misc.styled';
import ReactTrack from '@renderer/react-classes/ReactTrack';
import isSubstrIgnoreCase from '@renderer/utils/isSubStrIgnoreCase';
import { PlaylistIdContext } from '@renderer/contexts/PlaylistIdContext';

const TrackList = React.memo(() => {
  const { tracks, playlistTrackIds }: { tracks: ReactTrack[], playlistTrackIds: Record<number, number[]> } = useRouteLoaderData('root') as any;
  const { searchQuery } = useContext(SearchQueryContext);
  const { playlistId } = useContext(PlaylistIdContext);

  let filteredTracks = tracks.filter(track => {
    return (
      // if playlistId is 0 (meaning no playlist selected), skip the id check
      (playlistId === 0 || playlistTrackIds[playlistId].includes(track.id)) && (
        isSubstrIgnoreCase(track.title!, searchQuery) ||
        isSubstrIgnoreCase(track.album!, searchQuery) ||
        isSubstrIgnoreCase(track.artists!, searchQuery)
      )
    );
  });

  return (
    <>
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

export default TrackList;