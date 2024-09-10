import { useContext, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import Track from "@classes/Track";
import { TracksContext } from "@contexts/TracksContext";
import TrackComponent from "../TrackComponent";

const TrackList = () => {
  const { tracks, setTracks } = useContext(TracksContext);

  useEffect(() => {
    window.databaseApi.getAllMusicFiles().then((musicFiles: Track[]) => {
      setTracks([...musicFiles]);
    });
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={tracks.length}
          itemSize={91}
          width={width}
        >
          {({ index, style }) => (
            <div style={style}>
              <TrackComponent
                key={tracks[index].id}
                index={index}
                track={tracks[index]}
              />
            </div>
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

export default TrackList;