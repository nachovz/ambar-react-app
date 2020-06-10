import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { getAccessToken } from 'app/utils/auth/userSession';
import Typography from 'app/components/ui/Typography';
import AuthenticationForm from 'app/components/auth/AuthenticationForm';
import CompanyInformationForm from 'app/components/auth/CompanyInformationForm';
import { Main, FormWrapper, Logo, Footer } from './elements';
import { APP_VERSION } from 'app/constants/values';

import ambar from 'app/images/ambar.png';

const Login = () => {
  const [step, setStep] = useState(0);

  const changeStep = () => {
    setStep(step + 1);
  };

  if (getAccessToken() && step === 0) {
    changeStep();
  }

  if (step === 2) {
    return <Redirect to="/" />
  }

  return (
    <Main>
      <Logo src={ambar} alt="ambar" />
      <FormWrapper>
        {step === 0 && (
          <AuthenticationForm onAuthorized={changeStep} />
        )}
        {step === 1 && (
          <CompanyInformationForm onVerified={changeStep} />
        )}
      </FormWrapper>
      <Footer>
        <Typography variant="caption" color="textSecondary">
          Ambar Plus S.A. |  Versión {APP_VERSION}
        </Typography>
      </Footer>
    </Main>
  );
};

export default Login;
