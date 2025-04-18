import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  saveSearchValues: (
    destination: string,
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({children}: {children: React.ReactNode}) => {

  const [destination, setDestination] = useState<string>("");

  const saveSearchValues = (dest: string) => {
    setDestination(dest);
  };


  return (
    <SearchContext.Provider
      value={{
        destination,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};