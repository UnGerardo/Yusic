import { useState } from "react";

import PlayerControls from "./components/PlayerControls";
import Queue from "./components/Queue";
import ReadMusicFolder from "./components/ReadMusicFolder/ReadMusicFolder";
import TrackList from "./components/TrackList/TrackList";
import PlayingTrack from "./components/PlayingTrack/PlayingTrack";

function App(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // const shuffle = (): void => {
  //   const newQueue: Track[] = shuffleArray([...tracks]);
  //   setQueue(newQueue);
  //   setQueueIndex(0);
  //   setCurrentTrack(newQueue[0]);

  //   setAudioSource(newQueue[0].path);
  // }

  return (
    <>
      <section id="options">
        {/* <button onClick={shuffle}>Shuffle Tracks</button> */}
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
          <TrackList />
        </section>
        <Queue />
      </main>
      <section id="bottom-panel">
        <PlayingTrack />
        <PlayerControls />
      </section>
    </>
  )
}

export default App;
