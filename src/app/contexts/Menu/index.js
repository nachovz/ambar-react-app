import React, { useContext, useState, useMemo } from 'react';

const MenuContext = React.createContext();

export const MenuProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(false);
  const contextValue = useMemo(() => [menuState, setMenuState], [menuState]);
  return (
    <MenuContext.Provider value={contextValue}>
      { children }
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
