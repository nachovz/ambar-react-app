import React from 'react';
import TextField from 'app/components/form/TextField';
import Typography from 'app/components/ui/Typography';

import { BorderedContainer } from './elements';

const BoxedInput = ({
  customLabel,
  label,
  type,
  ...props
}) => (
  <BorderedContainer>
    {!!customLabel &&
      <Typography>
        {customLabel}
      </Typography>
    }

    <TextField
      label={label}
      type={type}
      margin="normal"
      {...props}
    />
  </BorderedContainer>
);

export default BoxedInput;