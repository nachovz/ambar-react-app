import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles ={
  root:{
    maxHeight: '250px',
    maxWidth: '100%'
  }
}

const ImageComponent = ( props ) => (
  <img {...props} alt={props.alt} />
);

export default withStyles(styles)(ImageComponent);