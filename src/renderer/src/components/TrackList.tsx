import React, { useContext } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";

import { SearchQueryContext } from '@contexts/SearchQueryContext';
import TrackComponent from "./TrackComponent";
import { WindowList } from '@renderer/assets/Misc.styled';
import isSubstrIgnoreCase from '@renderer/utils/isSubStrIgnoreCase';
import { PlaylistIdContext } from '@renderer/contexts/PlaylistIdContext';
import { TracksContext } from '@renderer/contexts/TracksContext';
import { PlaylistsContext } from '@renderer/contexts/PlaylistsContext';

const TrackList = React.memo(() => {
  const { tracks } = useContext(TracksContext);
  const { playlists } = useContext(PlaylistsContext);
  const { searchQuery } = useContext(SearchQueryContext);
  const { playlistId } = useContext(PlaylistIdContext);

  let filteredTracks = !tracks ? [] :
    tracks.filter(track => {
      return (
        // if playlistId is 0 (meaning no playlist selected), skip the id check
        (playlistId === 0 ||
          (playlists && playlists[playlistId].trackIds.includes(track.id)))
          && (
          isSubstrIgnoreCase(track.title!, searchQuery) ||
          isSubstrIgnoreCase(track.album!, searchQuery) ||
          isSubstrIgnoreCase(track.artists!, searchQuery)
        )
      );
    });

  return (
    <>
      {
        tracks ?
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
        </div> :
        <p>loading</p>
      }
    </>
  );
});

export default TrackList;