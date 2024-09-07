import { createContext, useState } from "react";
import playIcon from '@resources/icons/play-solid.svg';

interface PlayerIconContextState {
  playerIcon: string,
  setPlayerIcon: React.Dispatch<React.SetStateAction<string>> | (() => null)
}

export const PlayerIconContext = createContext<PlayerIconContextState>({
  playerIcon: '',
  setPlayerIcon: () => null
});

export const PlayerIconProvider = ({ children }) => {
  const [playerIcon, setPlayerIcon] = useState<string>(playIcon);
  const value = { playerIcon, setPlayerIcon };

  return <PlayerIconContext.Provider value={value}>{children}</PlayerIconContext.Provider>
}