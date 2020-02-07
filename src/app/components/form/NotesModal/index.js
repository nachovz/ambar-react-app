import React, { useState } from 'react';
import Modal from 'app/components/containers/Modal';
import CheckboxClear from 'app/components/form/CheckboxClear';
import Row from 'app/components/ui/Row';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import Typography from 'app/components/ui/Typography';
import Button from 'app/components/ui/Button';
import TextField from 'app/components/form/TextField';
import { CenteredPaddedContainer } from './elements';
import theme from 'app/styles/material';

const styles = {
  container: {
    overflow: 'scroll',
    maxHeight: '70vh'
  },
  paddedInput:{
    paddingLeft: theme.spacing(4)
  },
  navigationContainer:{
    textAlign: 'right',
    borderTop: '1px solid rgba(0, 0, 0, 0.42)'
  }
};

const NotesModal = ({
  modal,
  handleCloseModal,
  title,
  obs,
  withComments=false
}) => {
  const [ localObs, setLocalObs ] = useState(obs);
  
  const handleNotes = (ind) => (event) => {
    let temp = [...localObs];
    if(event.target.type === 'checkbox') temp[ind].on = event.target.checked;
    if(event.target.type === 'textarea') temp[ind].comment = event.target.value;
    setLocalObs(temp);
  };

  return(
    <Modal
        open={modal}
        onClose={handleCloseModal(localObs)}
      >
        <CenteredPaddedContainer>
          <BorderedContainer  padded>
            <Typography variant="h5" component="h3">
              {title.toUpperCase()}
            </Typography>
            <div style={styles.container}>
            {localObs.map( ({ label, on, comment }, ind) => (
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
                  <div style={styles.paddedInput}>
                    <TextField 
                      id={`${label}-comment`} 
                      label="Comentario"
                      multiline
                      rowsMax="2"
                      value={comment}
                      onChange={handleNotes(ind)}
                    />
                  </div>
                }
              </div>
            ))}
            </div>
            <div style={styles.navigationContainer}>
              <Button variant="outlined" onClick={handleCloseModal(localObs)} color="primary">Guardar</Button>
            </div>
          </BorderedContainer>
        </CenteredPaddedContainer>
      </Modal>
  )
};

export default NotesModal;