import Track from "src/classes/Track";
import QueuedTrack from "./QueuedTrack";

function Queue({ queue, queueIndex }: { queue: Track[], queueIndex: number }) {

  return (
    <section id="queue" className="scrollbar">
      {queue.map((track, i) => <QueuedTrack key={i} i={i} track={track} queueIndex={queueIndex} />)}
    </section>
  )
}

export default Queue;