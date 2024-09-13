import { useContext, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import Track from "@classes/Track";
import { TracksContext } from "@contexts/TracksContext";
import { SearchQueryContext } from '@contexts/SearchQueryContext';
import TrackComponent from "./TrackComponent";

const isSubstrIgnoreCase = (string: string, substr: string): boolean => {
  return string.toLocaleLowerCase().includes(substr.toLocaleLowerCase());
}

const TrackList = () => {
  const { tracks, setTracks } = useContext(TracksContext);
  const { searchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    window.databaseApi.getAllMusicFiles().then((musicFiles: Track[]) => {
      setTracks([...musicFiles]);
    });
  }, []);

  let filteredTracks = tracks.filter(track => {
    return (
      isSubstrIgnoreCase(track.title!, searchQuery) ||
      isSubstrIgnoreCase(track.album!, searchQuery) ||
      isSubstrIgnoreCase(track.artists!, searchQuery)
    );
  });
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={filteredTracks.length}
          itemSize={91}
          width={width}
        >
          {({ index, style }) => (
            <div style={style}>
              <TrackComponent
                key={filteredTracks[index].id}
                index={index}
                track={filteredTracks[index]}
                tracks={filteredTracks}
              />
            </div>
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

export default TrackList;