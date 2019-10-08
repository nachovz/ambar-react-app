import React, { useState } from 'react';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import List from 'app/components/ui/List';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import StepNavigator from 'app/components/app/StepNavigator';
import Row from 'app/components/ui/Row';
import Button from 'app/components/ui/Button';
import Icon from 'app/components/ui/Icon';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import TextField from 'app/components/form/TextField';

const useStyles = makeStyles(theme => ({
  mBottom: {
    marginBottom: theme.spacing(6),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  }
}));

const AddPhoto = ({ history }) => {
  const [photo, setPhoto] = useState();
  const classes = useStyles();
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('recogida');

  return(
    <React.Fragment>
      <List>
        <TopBar
          title="RECOGIDA"
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        {!photo ?
          <Camera
            onTakePhoto = { (dataUri) => { setPhoto(dataUri); } }
            idealFacingMode = {FACING_MODES.ENVIRONMENT}
          />
        :
          <React.Fragment>
            <img alt="report" src={photo} style={{maxWidth: "100%"}} />
            <Row centered>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setPhoto(null)}>
                <Icon icon="borrar" className={classes.leftIcon}/>
                Tomar de nuevo
              </Button>
            </Row>
            <FieldListElement
              className={classes.mBottom}
              icon="empty"
              title="Título de imagen"
              field={
                <TextField
                  fullWidth
                  multiline
                  placeholder="Opcional"
                />
              }
            />
          </React.Fragment>
        }
      </List>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText={photo ? "Guardar" : false}
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(AddPhoto);
