import React from 'react';
import UIPaper from '@material-ui/core/Paper';

// types
/*type Props = {
  elevation: 2,//0-24
  children: any,
  square: false
    | true
};*/

const Paper = ({ children, ...props }) => (
  <UIPaper {...props}>
    {children}
  </UIPaper>
);

export default Paper;
