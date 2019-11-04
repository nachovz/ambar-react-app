import React from 'react';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import useForm from 'react-hook-form';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

const AuthenticationForm = ({ onAuthorized }) => {
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const { register, handleSubmit, errors } = useForm();

  const login = async ({ email, password }) => {
    setLoadingState(true);
    try {
      const result = await client.post(ENDPOINTS.LOGIN, {
        body: { email, password }
      });
      setLoadingState(false);
      onAuthorized();
    } catch (error) {
      setLoadingState(false);
      setSnackbarContext({
        message: 'Hubo un error en el servidor',
        variant: 'error',
        open: true
      });
    }
  }

  return (
    <form>
      <TextField
        name="email"
        register={register}
        label="usuario"
        placeholder="usuario"
        type="text"
        error={errors.email}
      />
      <TextField
        name="password"
        register={register}
        label="password"
        placeholder="password"
        type="password"
        error={errors.password}
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSubmit(login)}
      >
        Continue
      </Button>
    </form>
  );
};

export default AuthenticationForm;
