import Track from "../classes/Track"

function TrackComponent({ track }: { track: Track }): JSX.Element {

  return (
    <section className="track-component">
      <img className="track-img" src={`data:${track.imgFormat};base64,${track.imgData}`} />
      <section className="track-title-artist ellip-overflow">
        <p className="ellip-overflow m-b-5">{track.name}</p>
        <p className="track-artist ellip-overflow">{track.artists}</p>
      </section>
      <p className="track-album">{track.album}</p>
      <p className="track-duration">{formatSeconds(track.duration)}</p>
    </section>
  );
}

function formatSeconds(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let minStr = hours ? `${String(minutes).padStart(2, '0')}:` : (minutes ? `${minutes}:` : '');
  let secStr = minutes ? String(seconds).padStart(2, '0') : `${seconds}`;

  return `${hours ? `${hours}:` : ''}${minStr}${secStr}`;
}

export default TrackComponent;