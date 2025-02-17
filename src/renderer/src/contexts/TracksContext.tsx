import ReactTrack from '@renderer/react-classes/ReactTrack';
import { createContext, useState } from 'react';

interface TracksContextState {
  tracks: ReactTrack[] | null,
  setTracks: React.Dispatch<React.SetStateAction<ReactTrack[] | null>> | (() => null)
}

export const TracksContext = createContext<TracksContextState>({
  tracks: null,
  setTracks: () => null,
});

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState<ReactTrack[] | null>(null);
  const value = { tracks, setTracks };

  return <TracksContext.Provider value={value}>{children}</TracksContext.Provider>;
}