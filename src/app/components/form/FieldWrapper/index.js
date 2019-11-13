import { styled } from 'styletron-react';


const FieldWrapper = styled('div', ({ $noMargin=false }) => ({
  margin: `0 0 ${$noMargin ? '0' : '40px'} 0`
}));

export default FieldWrapper;
