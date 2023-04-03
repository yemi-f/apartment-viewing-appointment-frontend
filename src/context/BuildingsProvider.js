import React, { createContext, useContext, useEffect, useState } from "react";

export const BuildingsContext = createContext();

export const useBuildings = () => useContext(BuildingsContext);
const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const BuildingsProvider = ({ children }) => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      fetch(`${apiServerUrl}/buildings`)
        .then((response) => response.json())
        .then((data) => setBuildings(data));
    };

    fetchBuildings();
  });

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
};
