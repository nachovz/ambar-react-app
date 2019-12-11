import React from 'react';
import ListUI from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const List = (props) => {
  const classes = useStyles();
  return (
    <ListUI {...props} 
    classes={{
      root: classes.root
    }} 
    disablePadding />
  );
}

export default List;