import React from 'react';
import { styled } from 'styletron-react';
import getColor from 'app/styles/palette';

const FieldWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end'
});

const Field = styled('div', {
  width: '100%'
});

const Error = styled('p', {
  textAlign: 'right',
  color: getColor('RED').toHexString()
});

const FieldError = ({ error, children }) => {
  return (
    <FieldWrapper>
      <Field>
        {children}
      </Field>
      {error && error.message && (
        <Error>
          {error.message}
        </Error>
      )}
    </FieldWrapper>
  );
};

export default FieldError;
