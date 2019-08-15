import React from 'react';
import TextField from 'app/components/form/TextField';
import Typography from 'app/components/ui/Typography';
import { BorderedContainer, CenteredDiv } from './elements';

const BoxedInput = ({
  topLabel,
  topValue,
  bottomLabel,
  label,
  type,
  ...props
}) => (
  <CenteredDiv>
    <CenteredDiv>
      <Typography>
        { topLabel }
      </Typography>
      <Typography variant="caption">
        { topValue }
      </Typography>
    </CenteredDiv>
    <BorderedContainer>
      {!!bottomLabel &&
        <Typography>
          { bottomLabel }
        </Typography>
      }
      <TextField
        label={label}
        type={type}
        margin="normal"
        {...props}
      />
    </BorderedContainer>
  </CenteredDiv>
);

export default BoxedInput;