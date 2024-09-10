import { useContext } from "react";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import Track from "@classes/Track";

const QueuedTrack = ({ index, track } : { index: number, track: Track }): JSX.Element => {
  const { queueIndex, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext)
  const { setAudioSource } = useContext(AudioSourceContext);

  const jumpToTrack = () => {
    setQueueIndex(index);
    setPlayingTrack(track);
    setAudioSource(track.path);
  }

  return (
    <section
      id={index === queueIndex ? 'current-track' : ''}
      className="queued-track"
      onClick={jumpToTrack}
    >
      <img className="track-img no-select" src={track.imgData ? `data:${track.imgFormat};base64,${track.imgData}` : ''} />
      <section className="track-title-artist ellip-overflow no-select">
        <p className="ellip-overflow no-select">{track.title}</p>
        <p className="track-artist ellip-overflow no-select">{track.artists}</p>
      </section>
    </section>
  );
};

export default QueuedTrack;