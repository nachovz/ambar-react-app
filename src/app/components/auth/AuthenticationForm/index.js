import React from 'react';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import useForm from 'react-hook-form';
import saveUser from 'app/utils/auth/saveUser';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useUserContext } from 'app/contexts/User';
//import client from 'app/client';
//import ENDPOINTS from 'app/constants/endpoints';

const AuthenticationForm = ({ onAuthorized }) => {
  const [{ token, ...user }, setUserState] = useUserContext();
  const [,setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const { register, handleSubmit, errors } = useForm();

  const login = async ({ username, password }) => {
    //const userData = `${username}:${password}`;
    //const auth = `Basic ${btoa(userData)}`;
    setLoadingState(true);
    try {
      // const result = await client.post(ENDPOINTS.LOGIN, {
      //   headers: { Authorization: auth }
      // });
      const result = { access_token: "dummy" };
      setLoadingState(false);
      saveUser(result);
      setUserState({ ...user, token: result.access_token });
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
        name="username"
        register={register}
        label="usuario"
        placeholder="usuario"
        type="text"
        error={errors.username}
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
