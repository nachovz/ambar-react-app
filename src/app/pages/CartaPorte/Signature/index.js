import React, { useState } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Typography from 'app/components/ui/Typography';
import SignatureCanvas from 'react-signature-canvas';
import StepNavigator from 'app/components/app/StepNavigator';
import Button from 'app/components/ui/Button';
import Checkbox from 'app/components/form/Checkbox';
import Spacer from 'app/components/ui/Spacer';
import AlertDialog from 'app/components/ui/AlertDialog';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import ImageComponent from 'app/components/ui/ImageComponent';
import {
  ErrorContainer
} from './elements';

const CartaPorteSignature = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [signature, setSignature] = useState();
  const [approvals, setApprovals] = useState({
    conform: false,
    terms: false
  })
  const [openAlert, setOpenAlert] = React.useState(false);
  let sigPad = React.createRef();
  const moveBack = () => history.goBack();
  const moveNext = () => setOpenAlert(true);

  const { selected } = rutas;
  if(!selected){
    history.push('/');
    return null;
  }

  const handleSave = () => {
    selected.done = true;
    selected.signature = signature;
    rutas.data[selected.serviceOrderId] = selected;
    setRutasState({
      ...rutas,
      selected:null
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return(
    <React.Fragment>
       <TopBar
        title={`Carta de porte: ${selected.serviceOrderId}`}
        actionIcon={!signature && "editar"}
        action={() => sigPad.clear()}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <PaddedContainer $noVertical>
        <Checkbox
          color="primary"
          label="Conformidad con la recogida"
          input={{
            value: approvals.conform,
            onChange:
              () => setApprovals({...approvals, conform: !approvals.conform})
          }}
        />
        <Checkbox
          color="primary"
          label="Acepto términos y condiciones"
          input={{
            value: approvals.terms,
            onChange:
              () => setApprovals({...approvals, terms: !approvals.terms})
          }}
        />
        {approvals.conform && approvals.terms && !signature &&
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={
              () => setSignature(sigPad.getTrimmedCanvas().toDataURL('image/png'))
            }
          >
            Guardar firma
          </Button>
        }
        <BorderedContainer>
          {signature ?
            <ImageComponent
              src={signature}
              alt=""
            />
            :
            approvals.conform && approvals.terms && (
              <SignatureCanvas
                penColor='green'
                ref={(ref) => { sigPad = ref }}
                canvasProps={{
                  className: 'sigCanvas',
                  width: 350,
                  height: 250
                }}
              />
            )
          }
        </BorderedContainer>
        {!signature &&
          <ErrorContainer>
            <Typography variant="caption" color="error">
              * Falta firma
            </Typography>
          </ErrorContainer>
        }
        {approvals.conform && approvals.terms && !signature &&
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={
              () => setSignature(sigPad.getTrimmedCanvas().toDataURL('image/png'))
            }
          >
            Guardar firma
          </Button>
        }
      </PaddedContainer>
      <Spacer size="lg"/>
      <Spacer size="lg"/>
      <AlertDialog
        open={openAlert}
        title="Desea guardar la línea?"
        handleClose={handleCloseAlert}
        agreedText="Si, guardar"
        handleAgree={handleSave}
        cancelText="No, seguir editando"
      />
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText={!!signature && "Aceptar y cerrar CP"}
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(CartaPorteSignature);
