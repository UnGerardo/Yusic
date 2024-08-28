import Track from "src/classes/Track";
import QueuedTrack from "./QueuedTrack";

function Queue(
  { queue, queueIndex, playTrackInQueue }:
  {
    queue: Track[],
    queueIndex: number,
    playTrackInQueue: (index: number) => void
  }) {

  return (
    <section id="queue" className="scrollbar">
      {queue.map((track, i) =>
        <QueuedTrack
          key={i}
          i={i}
          track={track}
          queueIndex={queueIndex}
          playTrackInQueue={playTrackInQueue}
        />)}
    </section>
  )
}

export default Queue;