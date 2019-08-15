import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from 'app/components/form/TextField';
import SelectField from 'app/components/form/SelectField';
import Button from 'app/components/ui/Button';
import Typography from 'app/components/ui/Typography';
import { Main, Logo, FieldWrapper, ButtonWrapper, Footer } from './elements';

import ambar from 'app/images/ambar.png';

const Login = ({ history }) => {
  const [step, setStep] = useState(0);

  const changeStep = () => {
    if (step === 2) {
      history.push('/');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Main>
      <Logo src={ambar} alt="ambar" />
      {step === 0 && (
        <Fragment>
          <FieldWrapper>
            <TextField placeholder="email" type="email" />
          </FieldWrapper>
          <FieldWrapper>
            <TextField placeholder="password" type="password" />
          </FieldWrapper>
        </Fragment>
      )}
      {step === 1 && (
        <Typography variant="h6">
          Read QR
        </Typography>
      )}
      {step === 2 && (
        <Fragment>
          <FieldWrapper>
            <SelectField
              fullWidth
              label="Seleccionar ID de Empresa"
              options={[{
                label: 'Some id',
                value: 'Some value'
              }]}
            />
          </FieldWrapper>
          <FieldWrapper>
            <SelectField
              fullWidth
              label="Seleccionar ID de Tecnico"
              options={[{
                label: 'Some id',
                value: 'Some value'
              }]}
            />
          </FieldWrapper>
          <FieldWrapper>
            <SelectField
              fullWidth
              label="Seleccionar ID de Matricula"
              options={[{
                label: 'Some id',
                value: 'Some value'
              }]}
            />
          </FieldWrapper>
        </Fragment>
      )}
      <ButtonWrapper>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={changeStep}
        >
          Entrar
        </Button>
      </ButtonWrapper>
      <Footer>
        <Typography variant="caption" color="textSecondary">
          Ambar Plus S.A.
        </Typography>
      </Footer>
    </Main>
  );
};

export default withRouter(Login);
