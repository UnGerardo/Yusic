import React, { useContext } from "react";
import formatSeconds from "@renderer/utils/formatSeconds";
import { QueueContext } from "@contexts/QueueContext";
import { PlayingTrackContext } from "@contexts/PlayingTrackContext";
import { AudioSourceContext } from "@contexts/AudioSourceContext";
import { TracksContext } from "@contexts/TracksContext";
import Track from "@classes/Track";

const TrackComponent = React.memo(({ track, index } : { track: Track, index: number }): JSX.Element => {
  const { tracks } = useContext(TracksContext);
  const { setQueue, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext);
  const { setAudioSource } = useContext(AudioSourceContext);

  const playAtTrack = () => {
    setAudioSource(track.path);

    setPlayingTrack(track);
    setQueueIndex(index);
    setQueue(tracks);
  }

  return (
    <section className="track-component track-hover" onClick={playAtTrack}>
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