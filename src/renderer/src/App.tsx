import Player from "./components/Player";
import Queue from "./components/Queue";
import ReadMusicFolder from "./components/ReadMusicFolder";
import TrackList from "./components/TrackList";
import PlayingTrack from "./components/PlayingTrack";
import Shuffle from "./components/Shuffle";
import SearchQuery from "./components/SearchQuery";
import styled from "styled-components";

function App(): JSX.Element {
  return (
    <>
      <Main>
        <section id="groups">
          <span className="group">Tracks</span>
          <span className="group">Artists</span>
          <span className="group">Albums</span>
        </section>
        <Tracks className="scrollbar">
          <section className="flex-cc">
            <ReadMusicFolder />
            <SearchQuery />
            <Shuffle />
          </section>
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p className="track-album">Album</p>
            <p className="track-duration">Time</p>
          </section>
          <TrackList />
        </Tracks>
        <Queue />
      </Main>
      <section id="bottom-panel">
        <PlayingTrack />
        <Player />
      </section>
    </>
  )
}

export default App;

const Main = styled.main`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const Tracks = styled.section`
  height: 100%;
  width: 100%;
`;