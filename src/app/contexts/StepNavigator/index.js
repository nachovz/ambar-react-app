import React, { useContext, useState, useMemo } from 'react';

const StepNavigatorContext = React.createContext();

export const StepNavigatorProvider = ({ children }) => {
  const [stepNavigatorState, setStepNavigatorState] = useState(false);
  const contextValue = useMemo(
    () => [stepNavigatorState, setStepNavigatorState],
    [stepNavigatorState]
  );

  return (
    <StepNavigatorContext.Provider value={contextValue}>
      { children }
    </StepNavigatorContext.Provider>
  );
};

export const useStepNavigatorContext = () => useContext(StepNavigatorContext);
