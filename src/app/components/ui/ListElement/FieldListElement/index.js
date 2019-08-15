import React from 'react';
import ListElement from '../';

const FieldListElement = ({ field, ...props }) =>(
  <ListElement
    secondaryText={field}
    noIcon
    {...props}
  />
);

export default FieldListElement;