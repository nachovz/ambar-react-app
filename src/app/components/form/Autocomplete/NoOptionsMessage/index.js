import React from 'react';
import Typography from '@material-ui/core/Typography';

const NoOptionsMessage = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      No hay opciones
    </Typography>
  );
};

export default NoOptionsMessage;