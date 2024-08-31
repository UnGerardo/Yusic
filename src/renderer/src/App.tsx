import { IAudioMetadata } from "music-metadata";
import Track from "../../classes/Track";
import TrackComponent from "./components/TrackComponent";
import { useEffect, useState } from "react";
import playIcon from '@resources/icons/play-solid.svg'
import PlayerControls from "./components/PlayerControls";
import CurrentSong from "./components/CurrentSong";
import Queue from "./components/Queue";
import shuffleArray from "./utils/shuffleArray";

function App(): JSX.Element {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [updateProgressInterval, setUpdateProgressInterval] = useState<NodeJS.Timeout | undefined>(undefined);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const $queue = document.getElementById('queue') as HTMLElement;
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

  const shuffle = (): void => {
    $queue.style.display = 'flex';

    clearInterval(updateProgressInterval);
    $audioPlayer.pause();
    $playPauseIcon.src = playIcon;

    const newQueue: Track[] = shuffleArray([...tracks]);
    setQueue(newQueue);
    setQueueIndex(0);
    setCurrentTrack(newQueue[0]);

    $audioPlayer.src = newQueue[0].path;
  }

  const displayQueue = () => {
    const $queue = document.getElementById('queue') as HTMLElement;
    $queue.style.display = 'flex';
  }

  const playTrackInQueue = (index: number) => {
    setQueueIndex(index);
    const thisTrack: Track = queue[index];
    setCurrentTrack(thisTrack);
    $audioPlayer.src = thisTrack!.path;
  }

  const playStartingAtTrack = (track: Track, i: number) => {
    const $player = document.getElementById('player') as HTMLAudioElement;
    const $playPauseIcon = document.getElementById('play-pause-icon') as HTMLImageElement;

    $player.src = track.path;
    clearInterval(updateProgressInterval);
    $player.pause();
    $playPauseIcon.src = playIcon;

    displayQueue();

    setCurrentTrack(track);
    setQueueIndex(i);
    setQueue(tracks);
  }

  return (
    <>
      <section id="options">
        <button onClick={readdir}>Select Music Folder</button>
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
            <input type="text" id="search" onChange={(event) => setSearchQuery(event.target.value)} />
          </section>
          <section className="track-component">
            <p>Image</p>
            <p>Title & Artist</p>
            <p className="track-album">Album</p>
            <p className="track-duration">Time</p>
          </section>
          {tracks
            .filter((track) => track.title?.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((track, i) =>
              <TrackComponent
                key={track.id}
                track={track}
                onClick={() => playStartingAtTrack(track, i)}
              />
          )}
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
