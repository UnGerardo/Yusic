import React from "react";
import Track from "src/classes/Track";

const QueuedTrack = React.memo((
  { i, track, queueIndex, playTrackInQueue }:
  {
    i: number,
    track: Track,
    queueIndex: number,
    playTrackInQueue: (index: number) => void
  }): JSX.Element => {

  return (
    <section id={i === queueIndex ? 'current-track' : ''} className="queued-track" onClick={() => playTrackInQueue(i)}>
      <img className="track-img no-select" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow no-select">
        <p className="ellip-overflow no-select">{track.title}</p>
        <p className="track-artist ellip-overflow no-select">{track.artists}</p>
      </section>
    </section>
  );
});

export default QueuedTrack;