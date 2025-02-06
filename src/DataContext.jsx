import React, { createContext, useState, useEffect } from "react";
import jsonData from "./Output";
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputJson, setOutputJson] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
   
    setOutputJson(jsonData);
  }, []); // empty dependency array to run the fetch only once on mount

  return (
    <DataContext.Provider
      value={{ outputJson, searchResults, setSearchResults }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
