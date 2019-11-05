import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  return (
    <CompanyContext.Provider value={useState({ company: null, wastes: null, containers: null, notes: null })}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
