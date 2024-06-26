import React from 'react';
import TextField from '@material-ui/core/TextField';


const inputComponent = ({ inputRef, ...props }) => {
  return (
    <div ref={inputRef} {...props} />
  );
};

const Control = (props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

export default Control;