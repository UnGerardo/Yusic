import { useContext } from "react";

import Track from "@classes/Track";
import shuffleIcon from '@resources/icons/shuffle.svg';
import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { AudioSourceContext } from "@renderer/contexts/AudioSourceContext";
import { TracksContext } from "@renderer/contexts/TracksContext";
import shuffleArray from "../../utils/shuffleArray";

const Shuffle = () => {
  const { tracks } = useContext(TracksContext);
  const { setQueue, setQueueIndex } = useContext(QueueContext);
  const { setPlayingTrack } = useContext(PlayingTrackContext)
  const { setAudioSource } = useContext(AudioSourceContext);

  const shuffle = (): void => {
    const newQueue: Track[] = shuffleArray([...tracks]);

    setQueue(newQueue);
    setQueueIndex(0);
    setPlayingTrack(newQueue[0]);
    setAudioSource(newQueue[0].path);
  }

  return (
    <div className="icon-big">
      <img src={shuffleIcon} onClick={shuffle} alt="shuffle icon" />
    </div>
  )
}

export default Shuffle;