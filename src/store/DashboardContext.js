import React, { useState } from "react";
import { createContext } from "react";
import { initialState } from '../App';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { status, error, data } = children;
  return (
    <DashboardContext.Provider
      value={{
        data: data || [],
        status: status || initialState.status,
        error: error || initialState.error,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
