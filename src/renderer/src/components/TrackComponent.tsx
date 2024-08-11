import Track from "../classes/Track"

function TrackComponent({ track }: { track: Track }): JSX.Element {

  return (
    <section className="track-component">
      <img src={`data:${track.imgFormat};base64,${track.imgData}`} height="100px" />
      <span>{track.name}</span>
      <span>{track.artists}</span>
      <span>{track.album}</span>
      <span>{track.duration}</span>
    </section>
  );
}

export default TrackComponent;