import { createContext, useState } from "react";

interface BackgroundImageState {
  backgroundImage: string,
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>> | (() => null)
}

export const BackgroundImageContext = createContext<BackgroundImageState>({
  backgroundImage: '',
  setBackgroundImage: () => null
});

export const BackgroundImageProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const value = { backgroundImage, setBackgroundImage };

  return <BackgroundImageContext.Provider value={value}>{children}</BackgroundImageContext.Provider>;
}