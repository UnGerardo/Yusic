import { createContext, useState } from "react";

interface BackgroundImageOpacityState {
  backgroundImageOpacity: number,
  setBackgroundImageOpacity: React.Dispatch<React.SetStateAction<number>> | (() => null)
}

export const BackgroundImageOpacityContext = createContext<BackgroundImageOpacityState>({
  backgroundImageOpacity: 1,
  setBackgroundImageOpacity: () => null
});

export const BackgroundImageOpacityProvider = ({ children }) => {
  const [backgroundImageOpacity, setBackgroundImageOpacity] = useState<number>(1);
  const value = { backgroundImageOpacity, setBackgroundImageOpacity };

  return <BackgroundImageOpacityContext.Provider value={value}>{children}</BackgroundImageOpacityContext.Provider>;
}