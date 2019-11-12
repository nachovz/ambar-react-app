import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxClear = ({ label, ...props }) => {
  return(
    <FormControlLabel
      control={
        <Checkbox 
          {...props} 
        />
      }
      label={label}
    />
  )
};

export default CheckboxClear;