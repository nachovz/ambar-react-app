import React from 'react';
import { CompanyProvider } from 'app/contexts/Company';
import { LoadingProvider } from "app/contexts/Loading";
import { SnackbarProvider } from "app/contexts/Snackbar";
import { RutasProvider } from "app/contexts/Rutas";
import Snackbar from 'app/components/app/Snackbar';

const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AppWrapper;
