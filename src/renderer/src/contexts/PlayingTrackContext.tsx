import ReactTrack from '@renderer/react-classes/ReactTrack';
import { createContext, useState } from 'react';

interface PlayingTrackContextState {
  playingTrack: ReactTrack | null,
  setPlayingTrack: React.Dispatch<React.SetStateAction<ReactTrack | null>> | (() => null)
}

export const PlayingTrackContext = createContext<PlayingTrackContextState>({
  playingTrack: null,
  setPlayingTrack: () => null,
});

export const PlayingTrackProvider = ({ children }) => {
  const [playingTrack, setPlayingTrack] = useState<ReactTrack | null>(null);
  const value = { playingTrack, setPlayingTrack };

  return <PlayingTrackContext.Provider value={value}>{children}</PlayingTrackContext.Provider>;
}