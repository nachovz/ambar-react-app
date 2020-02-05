import React from 'react';
import Modal from 'app/components/containers/Modal';
import CheckboxClear from 'app/components/form/CheckboxClear';
import Row from 'app/components/ui/Row';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import Typography from 'app/components/ui/Typography';
import Button from 'app/components/ui/Button';
import TextField from 'app/components/form/TextField';
import { CenteredPaddedContainer } from './elements';

const styles = {
  container: {
    overflow: 'scroll',
    maxHeight: '70vh'
  }
};

const NotesModal = ({
  modal,
  handleCloseModal,
  title,
  obs=[],
  setObs,
  withComments=false
}) => {

  const handleNotes = (ind) => (event) => {
    let temp = obs[ind];
    if(event.target.type === 'checkbox') temp.on = event.target.checked;
    if(event.target.type === 'textarea') temp.comment = event.target.value;
    obs[ind] = temp;

    setObs([...obs]);
  };

  return(
    <Modal
        open={modal}
        onClose={handleCloseModal}
      >
        <CenteredPaddedContainer>
          <BorderedContainer style={styles.container} padded>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
            {obs.map( ({ label, on, comment }, ind) => (
              <div key={label}>
                <Row >
                  <CheckboxClear
                    color="primary"
                    label={label}
                    value={ind}
                    checked={on}
                    onChange={handleNotes(ind)}
                  />
                </Row>
                {withComments && on &&
                  <TextField 
                    id={`${label}-comment`} 
                    label="Comentario" 
                    variant="outlined" 
                    multiline
                    rowsMax="2"
                    value={comment}
                    onChange={handleNotes(ind)}
                  />
                }
              </div>
            ))}
          </BorderedContainer>
          <Button variant="contained" onClick={handleCloseModal} color="primary">Guardar</Button>
        </CenteredPaddedContainer>
      </Modal>
  )
};

export default NotesModal;