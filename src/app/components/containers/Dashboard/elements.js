import { styled } from 'styletron-react';
import { NAVBAR_HEIGHT, STEPNAV_HEIGHT } from 'app/styles/constants';

export const Wrapper = styled('div', {
  padding: `${NAVBAR_HEIGHT} 0 ${STEPNAV_HEIGHT} 0`
});
