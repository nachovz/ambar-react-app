import React from 'react';
import SwitchUI from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Switch = ({ label , ...props }) => {

  return (
    <FormControlLabel
      control={
        <SwitchUI
          {...props}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      }
    label={label}
    />
  );
}

export default Switch;