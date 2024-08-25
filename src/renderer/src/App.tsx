import { IAudioMetadata } from "music-metadata";
import Track from "../../classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useEffect, useState } from "react";
import playIcon from '@resources/icons/play-solid.svg'
import PlayerControls from "./components/PlayerControls";
import CurrentSong from "./components/CurrentSong";

function App(): JSX.Element {
  // const [componentType, setComponentType] = useState('track');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [currentTrack, setCurrentTrack] = useState<Track>();

  const $audioPlayer = document.getElementById('player') as HTMLAudioElement;
  const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;

  useEffect(() => {
    window.databaseApi.getAllMusicFiles().then((musicFiles: Track[]) => {
      setTracks([...musicFiles]);
    });
  }, []);

  const readdir = async (): Promise<void> => {
    const filePaths: Array<string> = await window.dirApi.readDir();
    let tracks: Track[] = [];

    for (const filePath of filePaths) {
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(filePath);
      let pictureData = metadata.common.picture?.at(0)?.data || new Uint8Array();
      const track = new Track(metadata, filePath, await window.trackTagsApi.uint8ToBase64(pictureData));
      tracks.push(track);
    }
    setTracks([
      ...tracks
    ]);
    await window.databaseApi.writeMusicFiles(tracks);
  }

  return (
    <>
      <section id="options">
        <button onClick={readdir}>Select Music Folder</button>
      </section>
      <main>
        <section id="groups">
          <span className="group">Tracks</span>
          <span className="group">Artists</span>
          <span className="group">Albums</span>
        </section>
        <section id="tracks" className="scrollbar">
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p>Album</p>
            <p className="track-duration">Time</p>
          </section>
          {tracks.map(item => (<TrackComponent track={item} onClick={() => {
            const s = document.getElementById('player') as HTMLSourceElement;
            s.src = item.path;
            clearInterval(updateProgressInterval);
            $audioPlayer.pause();
            $playPauseIcon.src = playIcon;
            setCurrentTrack(item);
          }} />))}
        </section>
      </main>
      <section id="bottom-panel">
        {currentTrack ? <CurrentSong track={currentTrack} /> : <div></div>}
        <PlayerControls updateProgressInterval={updateProgressInterval} setUpdateProgressInterval={setUpdateProgressInterval} />
      </section>
    </>
  )
}

export default App
