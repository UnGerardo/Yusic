import { useState, useContext } from "react";

import Track from "@classes/Track";

import { TracksContext, TracksProvider } from "@contexts/TracksContext";
import { AudioSourceContext, AudioSourceProvider } from "@contexts/AudioSourceContext";

import CurrentSong from "./components/CurrentSong";
import PlayerControls from "./components/PlayerControls";
import Queue from "./components/Queue";
import ReadMusicFolder from "./components/ReadMusicFolder/ReadMusicFolder";
import TrackList from "./components/TrackList/TrackList";

import shuffleArray from "./utils/shuffleArray";

function App(): JSX.Element {
  const { tracks } = useContext(TracksContext);
  const { setAudioSource } = useContext(AudioSourceContext);

  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const shuffle = (): void => {
    const newQueue: Track[] = shuffleArray([...tracks]);
    setQueue(newQueue);
    setQueueIndex(0);
    setCurrentTrack(newQueue[0]);

    setAudioSource(newQueue[0].path);
  }

  const playTrackInQueue = (index: number) => {
    setQueueIndex(index);
    const thisTrack: Track = queue[index];
    setCurrentTrack(thisTrack);
    setAudioSource(thisTrack!.path);
  }

  const playStartingAtTrack = (tracks: Track[], track: Track, i: number) => {
    setAudioSource(track.path);

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
            <TracksProvider>
              <ReadMusicFolder />
            </TracksProvider>
            <input type="text" id="search" onChange={(event) => setSearchQuery(event.target.value)} />
          </section>
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p className="track-album">Album</p>
            <p className="track-duration">Time</p>
          </section>
          <TracksProvider>
            <TrackList handleOnClick={playStartingAtTrack} />
          </TracksProvider>
        </section>
        <Queue queue={queue} queueIndex={queueIndex} playTrackInQueue={playTrackInQueue} />
      </main>
      <section id="bottom-panel">
        {currentTrack ? <CurrentSong track={currentTrack} /> : <div></div>}
        <AudioSourceProvider>
          <PlayerControls
            queue={queue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            updateProgressInterval={updateProgressInterval}
            setUpdateProgressInterval={setUpdateProgressInterval}
          />
        </AudioSourceProvider>
      </section>
    </>
  )
}

export default App
