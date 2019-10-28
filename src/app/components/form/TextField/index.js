import React from 'react';
import TextFieldUI from '@material-ui/core/TextField';
import FieldError from '../FieldError';
import FieldWrapper from '../FieldWrapper';

const registerOptions = {
  required: 'Este campo es requerido'
};

const validations = {
  password: {
    minLength: {
      value: 5,
      message: 'La contrasena tiene que ser de 5 caracteres'
    }
  },
  email: {
    pattern: {
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email invalido'
    }
  }
};

const TextField = ({ type, register = () => {}, required=registerOptions.required, error, ...props }) => {
  return (
    <FieldWrapper>
      <FieldError error={error}>
        <TextFieldUI
          {...props}
          fullWidth
          error={!!error}
          inputRef={register({
            required,
            ...validations[type] && validations[type]
          })}
        />
      </FieldError>
    </FieldWrapper>
  );
};

export default TextField;
