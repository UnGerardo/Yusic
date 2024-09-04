import Track from "@classes/Track";
import { createContext, useState } from "react";

interface TracksContextState {
  tracks: Track[],
  setTracks: React.Dispatch<React.SetStateAction<Track[]>> | (() => null)
}

export const TracksContext = createContext<TracksContextState>({
  tracks: [],
  setTracks: () => null
});

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const value = { tracks, setTracks };

  return <TracksContext.Provider value={value}>{children}</TracksContext.Provider>;
}