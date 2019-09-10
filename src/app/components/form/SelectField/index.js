import React from 'react';
import UITextField from '@material-ui/core/TextField';
import MenuItem from 'app/components/ui/MenuItem';
import FieldError from '../FieldError';

const SelectField = ({
  options,
  register = () => {},
  error,
  ...props
}) => (
  <FieldError error={error}>
    <UITextField
      select
      {...props}
      SelectProps={{ ref: register({ required: 'Este campo es requerido' })}}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </UITextField>
  </FieldError>
);

export default SelectField;
