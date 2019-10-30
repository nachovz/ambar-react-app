import React from 'react';
import ListUI from '@material-ui/core/List';

const List = (props) => {
  return (
    <ListUI {...props} disablePadding />
  );
}

export default List;