import React from 'react';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import useForm from 'react-hook-form';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useUserContext } from 'app/contexts/User';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

const AuthenticationForm = ({ onAuthorized }) => {
  const [, setUserState] = useUserContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const { register, handleSubmit, errors } = useForm();

  const login = async ({ email, password }) => {
    setLoadingState(true);
    try {
      await client.post(ENDPOINTS.LOGIN, {
        body: { email, password }
      });
      setUserState(true);
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
        type="email"
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
