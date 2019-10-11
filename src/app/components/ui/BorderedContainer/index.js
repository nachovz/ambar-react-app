import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from 'app/components/ui/Paper';
import getColor from 'app/styles/palette';
import clsx from 'clsx';

const useStyles = makeStyles( theme => ({
  root: {
    border: `1px ${getColor('LIGHTGREY')} solid`,
    width: '100%',
    textAlign: 'center',
    padding: `${theme.spacing(2)}px 0`
  },
  padded: {
    padding: theme.spacing(3, 2)
  }
}));

const BorderedContainer = ({ padded = false, ...props }) => {
  const classes = useStyles();
  return (
    <Paper {...props} className={clsx(classes.root,padded && classes.padded)}>
    </Paper>
  );
}

export default BorderedContainer;