import Track from "../classes/Track"

function TrackComponent(track: Track): JSX.Element {

  return (
    <>
      <img src="${track.picture}" />
      <span>{track.name}</span>
      <span>{track.artists}</span>
      <span>{track.album}</span>
      <span>{track.duration}</span>
    </>
  );
}

export default TrackComponent;