import { useEffect, useState, useContext } from "react";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

import Track from "@classes/Track";

import { TracksContext } from "@contexts/TracksContext/TracksContext";

import CurrentSong from "./components/CurrentSong";
import PlayerControls from "./components/PlayerControls";
import Queue from "./components/Queue";
import ReadMusicFolder from "./components/ReadMusicFolder/ReadMusicFolder";
import TrackComponent from "./components/TrackComponent";

import shuffleArray from "./utils/shuffleArray";

function App(): JSX.Element {
  const { tracks, setTracks } = useContext(TracksContext);

  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;

  useEffect(() => {
    window.databaseApi.getAllMusicFiles().then((musicFiles: Track[]) => {
      setTracks([...musicFiles]);
    });
  }, []);

  const shuffle = (): void => {
    const newQueue: Track[] = shuffleArray([...tracks]);
    setQueue(newQueue);
    setQueueIndex(0);
    setCurrentTrack(newQueue[0]);

    $audioPlayer.src = newQueue[0].path;
  }

  const playTrackInQueue = (index: number) => {
    setQueueIndex(index);
    const thisTrack: Track = queue[index];
    setCurrentTrack(thisTrack);
    $audioPlayer.src = thisTrack!.path;
  }

  const playStartingAtTrack = (track: Track, i: number) => {
    $audioPlayer.src = track.path;

    setCurrentTrack(track);
    setQueueIndex(i);
    setQueue(tracks);
  }

  return (
    <>
      <section id="options">
        <button onClick={shuffle}>Shuffle Tracks</button>
      </section>
      <main>
        <section id="groups">
          <span className="group">Tracks</span>
          <span className="group">Artists</span>
          <span className="group">Albums</span>
        </section>
        <section id="tracks" className="scrollbar">
          <section>
            <ReadMusicFolder />
            <input type="text" id="search" onChange={(event) => setSearchQuery(event.target.value)} />
          </section>
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p className="track-album">Album</p>
            <p className="track-duration">Time</p>
          </section>
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
                      track={tracks[index]}
                      onClick={() => playStartingAtTrack(tracks[index], index)}
                    />
                  </div>
                )}
              </FixedSizeList>
            )}
          </AutoSizer>
        </section>
        <Queue queue={queue} queueIndex={queueIndex} playTrackInQueue={playTrackInQueue} />
      </main>
      <section id="bottom-panel">
        {currentTrack ? <CurrentSong track={currentTrack} /> : <div></div>}
        <PlayerControls
          queue={queue}
          queueIndex={queueIndex}
          setQueueIndex={setQueueIndex}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          updateProgressInterval={updateProgressInterval}
          setUpdateProgressInterval={setUpdateProgressInterval}
        />
      </section>
    </>
  )
}

export default App
