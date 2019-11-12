import React from 'react';
import Modal from 'app/components/containers/Modal';
import CheckboxClear from 'app/components/form/CheckboxClear';
import Row from 'app/components/ui/Row';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import Typography from 'app/components/ui/Typography';
import { CenteredPaddedContainer } from './elements';

const NotesModal = ({
  modal,
  handleCloseModal,
  title,
  obs=[],
  setObs
}) => {

  const handleNotes = (ind) => (event) => {
    var temp = obs.map( (note, index) => {
      if(ind===index){
        note.on = event.target.checked;
      }
      return note;
    });
    setObs(temp);
  };

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
            {obs.map( ({ label, on }, ind) => (
              <Row key={label}>
                <CheckboxClear
                  color="primary"
                  label={label}
                  value={ind}
                  checked={on}
                  onChange={handleNotes(ind)}
                />
              </Row>
            ))}
          </BorderedContainer>
        </CenteredPaddedContainer>
      </Modal>
  )
};

export default NotesModal;