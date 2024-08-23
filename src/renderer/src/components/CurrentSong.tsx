import Track from "src/classes/Track";

export default function CurrentSong({ track }: { track: Track }): JSX.Element {

  return (
    <section id="current-song">
      <img className="track-img" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow">
        <p className="current-song-track ellip-overflow">{track.title}</p>
        <p className="current-song-artist ellip-overflow">{track.artists}</p>
      </section>
    </section>
  );
}