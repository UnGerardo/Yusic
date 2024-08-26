import Track from "src/classes/Track";

function QueuedTrack({ track }: { track: Track }): JSX.Element {

  return (
    <section className="queued-track">
      <img className="track-img" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow">
        <p className="ellip-overflow m-b-5">{track.title}</p>
        <p className="track-artist ellip-overflow">{track.artists}</p>
      </section>
    </section>
  );
}

export default QueuedTrack;