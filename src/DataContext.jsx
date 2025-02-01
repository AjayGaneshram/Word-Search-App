import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputJson, setOutputJson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch("./output.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
			console.log(data)
          setOutputJson(data);
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    };

    fetchData();
  }, []); // empty dependency array to run the fetch only once on mount

  return (
    <DataContext.Provider value={{ outputJson }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
