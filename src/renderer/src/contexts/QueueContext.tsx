import { createContext, useState } from "react";
import Track from "@classes/Track";

interface QueueContextState {
  queue: Track[],
  setQueue: React.Dispatch<React.SetStateAction<Track[]>> | (() => null),
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
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const value = { queue, setQueue, queueIndex, setQueueIndex };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}