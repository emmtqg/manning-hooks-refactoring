import React, { useState } from "react";
import { createContext } from "react";
import useFetch from "../common/hooks/useFetch";

export const DashboardContext = createContext();
const initialState = {
  status: 'idle',
  error: '',
  data: []
};

export const DashboardProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const { status, error, data } = useFetch(url, initialState);

  const fetchDataset = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <DashboardContext.Provider
      value={{
        salesTotal: 1234,
        subscriptionsTotal: 2345,
        data: data || [],
        fetchDataset,
        status: status || initialState.status,
        error: error || initialState.error,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
