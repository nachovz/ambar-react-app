import React from 'react';
import UITextField from '@material-ui/core/TextField';
import MenuItem from 'app/components/ui/MenuItem';
import FieldError from '../FieldError';

const SelectField = ({
  options,
  error,
  ...props
}) => (
  <FieldError error={error}>
    <UITextField
      style={{width: '100%'}}
      select
      error={!!error}
      {...props}
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
