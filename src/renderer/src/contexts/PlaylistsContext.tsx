import { createContext, useState } from "react"

interface PlaylistsContextState {
  playlists: object | null,
  setPlaylists: React.Dispatch<React.SetStateAction<object | null>> | (() => null)
}

export const PlaylistsContext = createContext<PlaylistsContextState>({
  playlists: null,
  setPlaylists: () => null
});

export const PlaylistsProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState<object | null>(null);
  const value = { playlists, setPlaylists };

  return <PlaylistsContext.Provider value={value}>{children}</PlaylistsContext.Provider>;
}