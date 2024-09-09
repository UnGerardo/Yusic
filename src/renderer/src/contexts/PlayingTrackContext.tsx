import { createContext, useState } from 'react';
import Track from '@classes/Track';

interface PlayingTrackContextState {
  playingTrack: Track | null,
  setPlayingTrack: React.Dispatch<React.SetStateAction<Track | null>> | (() => null)
}

export const PlayingTrackContext = createContext<PlayingTrackContextState>({
  playingTrack: null,
  setPlayingTrack: () => null,
});

export const PlayingTrackProvider = ({ children }) => {
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const value = { playingTrack, setPlayingTrack };

  return <PlayingTrackContext.Provider value={value}>{children}</PlayingTrackContext.Provider>;
}