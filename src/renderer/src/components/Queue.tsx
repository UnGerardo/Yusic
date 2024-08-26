import Track from "src/classes/Track";
import QueuedTrack from "./QueuedTrack";

function Queue({ queue }: { queue: Track[] }) {

  return (
    <section id="queue" className="scrollbar">
      {queue.map((track, i) => <QueuedTrack key={i} track={track} />)}
    </section>
  )
}

export default Queue;