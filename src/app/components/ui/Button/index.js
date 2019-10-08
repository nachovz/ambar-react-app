import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UIButton from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: `${theme.spacing(2)}px 0`,
  }
}));

const Button = (props) => {
  const classes = useStyles();
  return(
    <UIButton {...props} className={classes.button}/>
  )
};

export default Button;
