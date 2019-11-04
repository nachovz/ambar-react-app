import React from 'react';
import { MenuProvider } from 'app/contexts/Menu';
import Navbar from 'app/components/app/Navbar';
import { Wrapper } from './elements';

const Dashboard = ({ children }) => {
  React.useEffect( () => {
    window.scrollTo(0, 0);
  })

  return (
    <MenuProvider>
      <Navbar />
      <Wrapper>
        { children }
      </Wrapper>
    </MenuProvider>
  );
};


export default Dashboard;
