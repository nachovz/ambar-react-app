import React from 'react';
import { MenuProvider } from 'app/contexts/Menu';
import Navbar from 'app/components/app/Navbar';
import SwipableMenu from 'app/components/app/SwipeableMenu';

const Dashboard = ({ children }) => {
  return (
    <MenuProvider>
      <Navbar />
      <SwipableMenu />
      { children }
    </MenuProvider>
  );
};

export default Dashboard;
