import React, { createContext, useContext, useState } from 'react';
//import * as rutas from 'app/constants/mock.json';

const RutasContext = createContext();

export const RutasProvider = ({ children }) => {
  return (
    <RutasContext.Provider value={useState({ data: null, selected: null })}>
      {children}
    </RutasContext.Provider>
  );
};

export const useRutasContext = () => useContext(RutasContext);
