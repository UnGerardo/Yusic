import Track from "@renderer/classes/Track";

export default function CurrentSong({ track }: { track: Track }): JSX.Element {

  return (
    <section id="currentSong">
      <img className="track-img" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow">
        <p className="ellip-overflow m-b-5">{track.name}</p>
        <p className="track-artist ellip-overflow">{track.artists}</p>
      </section>
    </section>
  );
}