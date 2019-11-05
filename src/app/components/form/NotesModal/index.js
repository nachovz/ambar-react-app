import React from 'react';
import Modal from 'app/components/containers/Modal';
import Checkbox from 'app/components/form/Checkbox';
import Row from 'app/components/ui/Row';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import Typography from 'app/components/ui/Typography';
import { CenteredPaddedContainer } from './elements';

const NotesModal = ({
  modal,
  handleCloseModal,
  title,
  list,
  handleList
}) => {
  return(
    <Modal
        open={modal}
        onClose={handleCloseModal}
      >
        <CenteredPaddedContainer>
          <BorderedContainer padded>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
            {list.map( ({ label, on }, ind) => (
              <Row key={ind}>
                <Checkbox
                  color="primary"
                  label={label}
                  input={{
                    value: on,
                    onChange:handleList(ind)
                  }}
                />
              </Row>
            ))}
          </BorderedContainer>
        </CenteredPaddedContainer>
      </Modal>
  )
};

export default NotesModal;