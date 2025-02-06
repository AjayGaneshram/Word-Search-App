import React, { createContext, useState, useEffect } from "react";
import jsonData from "./Output";
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputJson, setOutputJson] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    fetch("./input.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
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
