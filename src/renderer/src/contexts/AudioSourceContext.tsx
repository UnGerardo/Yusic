import { createContext, useState } from "react";

interface AudioSourceState {
  audioSource: string,
  setAudioSource: React.Dispatch<React.SetStateAction<string>> | (() => null)
}

export const AudioSourceContext = createContext<AudioSourceState>({
  audioSource: '',
  setAudioSource: () => null
});

export const AudioSourceProvider = ({ children }) => {
  const [audioSource, setAudioSource] = useState<string>('');
  const value = { audioSource, setAudioSource };

  return <AudioSourceContext.Provider value={value}>{children}</AudioSourceContext.Provider>;
}