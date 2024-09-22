import { createContext, useState } from "react";

interface BackgroundColorState {
  backgroundColor: string,
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>> | (() => null)
}

export const BackgroundColorContext = createContext<BackgroundColorState>({
  backgroundColor: '',
  setBackgroundColor: () => null
});

export const BackgroundColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const value = { backgroundColor, setBackgroundColor };

  return <BackgroundColorContext.Provider value={value}>{children}</BackgroundColorContext.Provider>;
}