import { createContext, useState } from "react";
import ReactTrack from "@renderer/react-classes/ReactTrack";

interface QueueContextState {
  queue: ReactTrack[],
  setQueue: React.Dispatch<React.SetStateAction<ReactTrack[]>> | (() => null),
  queueIndex: number,
  setQueueIndex: React.Dispatch<React.SetStateAction<number>> | (() => null),
}

export const QueueContext = createContext<QueueContextState>({
  queue: [],
  setQueue: () => null,
  queueIndex: 0,
  setQueueIndex: () => null,
});

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState<ReactTrack[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const value = { queue, setQueue, queueIndex, setQueueIndex };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}