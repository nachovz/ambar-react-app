import React from 'react';
import UITextField from '@material-ui/core/TextField';
import MenuItem from 'app/components/ui/MenuItem';

const SelectField = ({
  options,
  ...props
}) => (
  <UITextField select {...props}>
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </UITextField>
);

export default SelectField;
