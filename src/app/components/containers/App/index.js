import React from 'react';
import { CompanyProvider } from 'app/contexts/Company';
import { LoadingProvider } from "app/contexts/Loading";
import { SnackbarProvider } from "app/contexts/Snackbar";
import { RutasProvider } from "app/contexts/Rutas";
import { UserProvider } from 'app/contexts/User';
import Snackbar from 'app/components/app/Snackbar';

const AppWrapper = ({ children }) => {
  return (
    <UserProvider>
      <CompanyProvider>
        <SnackbarProvider>
          <LoadingProvider>
            <RutasProvider>
              {children}
              <Snackbar />
            </RutasProvider>
          </LoadingProvider>
        </SnackbarProvider>
      </CompanyProvider>
    </UserProvider>
  );
};

export default AppWrapper;
