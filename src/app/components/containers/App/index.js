import React from 'react';
import { LoadingProvider } from "app/contexts/Loading";
import { SnackbarProvider } from "app/contexts/Snackbar";
import { RutasProvider } from "app/contexts/Rutas";
import { UserProvider } from 'app/contexts/User';
import Snackbar from 'app/components/app/Snackbar';

const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <UserProvider>
        <SnackbarProvider>
          <LoadingProvider>
            <RutasProvider>
              {children}
              <Snackbar />
            </RutasProvider>
          </LoadingProvider>
        </SnackbarProvider>
      </UserProvider>
    </React.Fragment>
  );
};

export default AppWrapper;
