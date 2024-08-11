import { IAudioMetadata } from "music-metadata";

function App(): JSX.Element {

  const readdir = async (): Promise<void> => {
    const files: Array<string> = await window.dirApi.readDir();

    console.log(files);
    const s = document.getElementById('player') as HTMLSourceElement;
    s.src = files[0].replaceAll('\\', '/');

    for (const file of files) {
      const $items = document.getElementById('items');
      const metadata: IAudioMetadata = await window.trackTagsApi.getTrackTags(file);

      const $item = document.createElement('section');
      const $picture = document.createElement('img');
      $picture.src = `data:${metadata.common.picture?.at(0)?.format};base64,${await window.trackTagsApi.uint8ToBase64(metadata.common.picture?.at(0)?.data!)}`;
      $picture.height = 100;
      const $name = document.createElement('span');
      $name.innerText = metadata.common.title || '';
      const $artists = document.createElement('span');
      $artists.innerText = metadata.common.artist || '';
      const $album = document.createElement('span');
      $album.innerText = metadata.common.album || '';
      const $duration = document.createElement('span');
      $duration.innerText = `${metadata.format.duration}` || '';

      $item.append($picture, $name, $artists, $album, $duration);
      $items?.appendChild($item);
    }
  }

  return (
    <>
      <section id="options">
        <span>Select Music Folder</span>
      </section>
      <main>
        <section id="groups">
          <span className="group">Tracks</span>
          <span className="group">Artists</span>
          <span className="group">Albums</span>
        </section>
        <section id="items">
          <img src="" alt="" />
          <span>Track Name</span>
          <span>Artist</span>
          <span>Album</span>
          <span>Time</span>
        </section>
      </main>
      <audio id="player" src="" controls />
      <button onClick={readdir}>Readdir</button>
    </>
  )
}

export default App
