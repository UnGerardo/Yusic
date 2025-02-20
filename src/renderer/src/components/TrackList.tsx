import React, { useContext } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";

import { SearchQueryContext } from '@contexts/SearchQueryContext';
import TrackComponent from "./TrackComponent";
import { WindowList } from '@renderer/assets/Misc.styled';
import isSubstrIgnoreCase from '@renderer/utils/isSubStrIgnoreCase';
import { PlaylistIdContext } from '@renderer/contexts/PlaylistIdContext';
import { TracksContext } from '@renderer/contexts/TracksContext';
import { TrackMapContext } from '@renderer/contexts/TrackMapContext';
import { PlaylistsContext } from '@renderer/contexts/PlaylistsContext';
import Loader from './Loader';

const TrackList = React.memo(() => {
  const { tracks } = useContext(TracksContext);
  const { trackMap } = useContext(TrackMapContext);
  const { playlists } = useContext(PlaylistsContext);
  const { searchQuery } = useContext(SearchQueryContext);
  const { playlistId } = useContext(PlaylistIdContext);

  let filteredTracks = !tracks ? [] :
    playlistId === 0 || !playlists || !trackMap ? tracks.filter(track =>
      isSubstrIgnoreCase(track.title, searchQuery) ||
      isSubstrIgnoreCase(track.album, searchQuery) ||
      isSubstrIgnoreCase(track.artists, searchQuery)
    ) :
    playlists[playlistId].trackIds.map(id => trackMap[id]).filter(track =>
      isSubstrIgnoreCase(track.title, searchQuery) ||
      isSubstrIgnoreCase(track.album, searchQuery) ||
      isSubstrIgnoreCase(track.artists, searchQuery)
    );

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
        <Loader />
      }
    </>
  );
});

export default TrackList;
