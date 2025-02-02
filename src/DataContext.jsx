import React, { createContext, useState, useEffect } from "react";
import jsonData from '../public/Output'
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputJson, setOutputJson] = useState(null);
  const [searchResults, setSearchResults] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      // fetch("./output.json")
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
			// console.log(data)
          setOutputJson(jsonData);
        // })
        // .catch((error) => console.error("Error fetching JSON:", error));


        import('../public/output.js')
            .then((module) => {
              setOutputJson(module.default);
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    };

    fetchData();
  }, []); // empty dependency array to run the fetch only once on mount

  return (
    <DataContext.Provider value={{ outputJson ,searchResults, setSearchResults}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
