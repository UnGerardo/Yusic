import { createContext, useState } from "react";

interface SearchQueryContextState {
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>> | (() => null)
}

export const SearchQueryContext = createContext<SearchQueryContextState>({
  searchQuery: '',
  setSearchQuery: () => null
});

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const value = { searchQuery, setSearchQuery };

  return <SearchQueryContext.Provider value={value}>{children}</SearchQueryContext.Provider>;
}