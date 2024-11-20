import { createContext, useState } from "react";

interface FocusModeHoverState {
  isHovering: boolean,
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>> | (() => null)
}

export const FocusModeHoverContext = createContext<FocusModeHoverState>({
  isHovering: false,
  setIsHovering: () => null
});

export const FocusModeHoverProvider = ({ children }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const value = { isHovering, setIsHovering };

  return <FocusModeHoverContext.Provider value={value}>
    {children}
  </FocusModeHoverContext.Provider>
}