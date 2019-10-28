import React from 'react';
import ModalUI from '@material-ui/core/Modal';
import Icon from 'app/components/ui/Icon';
import { CloseContainer } from './elements';

const Modal = ({ handleCloseModal, children, ...props}) => {
  return(
    <ModalUI {...props}>
      <div>
        <CloseContainer>
          <Icon icon="cerrar" onClick={handleCloseModal} />
        </CloseContainer>
        {children}
      </div>
    </ModalUI>
  );
};

export default Modal;