import React, { useContext, useState } from 'react';

const LoadingContext = React.createContext();

export const LoadingProvider = ({ children }) => {
  return (
    <LoadingContext.Provider value={useState(false)}>
      { children }
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
