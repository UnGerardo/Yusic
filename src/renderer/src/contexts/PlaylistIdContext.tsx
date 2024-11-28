import { createContext, useState } from "react";

interface PlaylistIdContextState {
  playlistId: number,
  setPlaylistId: React.Dispatch<React.SetStateAction<number>> | (() => null),
}

export const PlaylistIdContext = createContext<PlaylistIdContextState>({
  playlistId: 0,
  setPlaylistId: () => null,
});

export const PlaylistIdProvider = ({ children }) => {
  const [playlistId, setPlaylistId] = useState<number>(0);
  const value = { playlistId, setPlaylistId };

  return <PlaylistIdContext.Provider value={value}>{children}</PlaylistIdContext.Provider>
}