import { useContext } from "react";

import Track from "@classes/Track";
import { QueueContext } from "@renderer/contexts/QueueContext";
import { PlayingTrackContext } from "@renderer/contexts/PlayingTrackContext";
import { AudioSourceContext } from "@renderer/contexts/AudioSourceContext";
import shuffleArray from "../utils/shuffleArray";
import { BigIcon } from "@renderer/assets/Misc.styled";
import styled from "styled-components";
import { useRouteLoaderData } from "react-router-dom";

const Shuffle = () => {
  const { tracks }: { tracks: Track[] } = useRouteLoaderData('root') as any;
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
    <BigIcon onClick={shuffle}>
      <ShuffleIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.1 448.13">
        <path d="M403.8,2.46c12-5,25.7-2.2,34.9,6.9l64,64c6,6,9.4,14.1,9.4,22.6s-3.4,16.6-9.4,22.6l-64,64c-9.2,9.2-22.9,11.9-34.9,6.9s-19.8-16.6-19.8-29.6v-32h-32c-10.1,0-19.6,4.7-25.6,12.8l-42.4,56.7-40-53.3,31.2-41.6c18.1-24.2,46.6-38.4,76.8-38.4h32v-32c0-12.9,7.8-24.6,19.8-29.6ZM164,250.76l40,53.3-31.2,41.6c-18.1,24.2-46.6,38.4-76.8,38.4H32c-17.7,0-32-14.3-32-32s14.3-32,32-32h64c10.1,0,19.6-4.7,25.6-12.8l42.4-56.5ZM438.6,438.76c-9.2,9.2-22.9,11.9-34.9,6.9s-19.8-16.6-19.8-29.6v-32h-32c-30.2,0-58.7-14.2-76.8-38.4L121.6,140.86c-6-8.1-15.5-12.8-25.6-12.8H32C14.3,128.06,0,113.76,0,96.06s14.3-32,32-32h64c30.2,0,58.7,14.2,76.8,38.4l153.6,204.8c6,8.1,15.5,12.8,25.6,12.8h32v-32c0-12.9,7.8-24.6,19.8-29.6s25.7-2.2,34.9,6.9l64,64c6,6,9.4,14.1,9.4,22.6s-3.4,16.6-9.4,22.6l-64,64-.1.2Z"/>
      </ShuffleIcon>
    </BigIcon>
  )
}

export default Shuffle;

const ShuffleIcon = styled.svg`
  fill: #fff;
`;