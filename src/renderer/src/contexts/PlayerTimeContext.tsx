import { createContext, useState } from "react"

interface PlayerTimeContextState {
  currentTime: number,
  setCurrentTime: React.Dispatch<React.SetStateAction<number>> | (() => null),
  maxTime: number,
  setMaxTime: React.Dispatch<React.SetStateAction<number>> | (() => null)
}

export const PlayerTimeContext = createContext<PlayerTimeContextState>({
  currentTime: 0,
  setCurrentTime: () => null,
  maxTime: 0,
  setMaxTime: () => null
});

export const PlayerTimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const value = { currentTime, setCurrentTime, maxTime, setMaxTime };

  return <PlayerTimeContext.Provider value={value}>{children}</PlayerTimeContext.Provider>
}