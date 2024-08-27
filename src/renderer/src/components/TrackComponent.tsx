import React from "react";
import formatSeconds from "@renderer/utils/formatSeconds";
import Track from "src/classes/Track";

const TrackComponent = React.memo((
  { track, onClick }:
  {
    track: Track,
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  }): JSX.Element => {

  return (
    <section className="track-component track-hover" onClick={onClick}>
      <img className="track-img" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow">
        <p className="ellip-overflow m-b-5">{track.title}</p>
        <p className="track-artist ellip-overflow">{track.artists}</p>
      </section>
      <p className="track-album ellip-overflow">{track.album}</p>
      <p className="track-duration">{formatSeconds(track.duration!)}</p>
    </section>
  );
});

export default TrackComponent;