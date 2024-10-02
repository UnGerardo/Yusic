import React, { useContext } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";

import { TracksContext } from "@contexts/TracksContext";
import { SearchQueryContext } from '@contexts/SearchQueryContext';
import TrackComponent from "./TrackComponent";
import { WindowList } from '@renderer/assets/Misc.styled';
import TrackHeader from './TrackHeader';

const isSubstrIgnoreCase = (string: string, substr: string): boolean => {
  return string.toLocaleLowerCase().includes(substr.toLocaleLowerCase());
}

const TrackList = React.memo(() => {
  const { tracks } = useContext(TracksContext);
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

export default TrackList;