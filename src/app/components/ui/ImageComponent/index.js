import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles ={
  root:{
    maxHeight: '250px',
    maxWidth: '100%'
  }
}

const ImageComponent = ( props ) => (
  <img {...props} />
);

export default withStyles(styles)(ImageComponent);