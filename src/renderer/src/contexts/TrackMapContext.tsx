import ReactTrack from '@renderer/react-classes/ReactTrack';
import { createContext, useState } from 'react';

interface TrackMapContextState {
  trackMap: Record<number, ReactTrack> | null,
  setTrackMap: React.Dispatch<React.SetStateAction<Record<number, ReactTrack> | null>> | (() => null)
}

export const TrackMapContext = createContext<TrackMapContextState>({
  trackMap: null,
  setTrackMap: () => null,
});

export const TrackMapProvider = ({ children }) => {
  const [trackMap, setTrackMap] = useState<Record<number, ReactTrack> | null>(null);
  const value = { trackMap, setTrackMap };

  return <TrackMapContext.Provider value={value}>{children}</TrackMapContext.Provider>;
}