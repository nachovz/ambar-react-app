import React, { useState } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import useForm from 'react-hook-form';
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
import TextField from 'app/components/form/TextField';
import { buildCartaporte, addCompletedCartaporte } from 'app/utils/cartaporte';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';
import {
  ErrorContainer,
  FullWidthForm
} from './elements';
import getGeoPosition from 'app/utils/getGeoPosition';

const CartaPorteSignature = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setLoadingState] = useLoadingContext();
  const [signature, setSignature] = useState();
  const [approvals, setApprovals] = useState({
    conform: false
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();
  let sigPad = React.createRef();
  const moveBack = () => history.goBack();
  const moveNext = () => setOpenAlert(true);

  const { selected } = rutas;
  if(!selected){
    history.push('/');
    return null;
  }

  const handleSave = async ({ clientDNI, clientName }) => {
    setLoadingState(true);
    selected.done = true;
    selected.signature = signature;
    selected.client_name = clientName;
    selected.client_dni = clientDNI;
    const { lat, lng } = await getGeoPosition();
    selected.latitude_end = lat;
    selected.longitude_end = lng;
    rutas.data[selected.serviceOrderId] = selected;
    
    try {
      const body = buildCartaporte(selected, signature, clientDNI, clientName);
      await client.post(ENDPOINTS.ROUTE, { body });
      addCompletedCartaporte(selected.serviceOrderId);
      setLoadingState(false);
      setRutasState({
        ...rutas,
        selected: null
      });
    } catch (error) {
      setLoadingState(false);
    }
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
        <Typography variant="h6" gutterBottom>
          Confirmación de cliente
        </Typography>
        <FullWidthForm>
          <TextField
            register={register}
            name="clientDNI"
            type="text"
            placeholder="DNI"
            error={errors.clientDNI}
          />
          <TextField
            register={register}
            name="clientName"
            type="text"
            placeholder="Nombre"
            error={errors.clientName}
          />
        </FullWidthForm>
        <Checkbox
          color="primary"
          label="Conformidad con la recogida"
          input={{
            value: approvals.conform,
            onChange:
              () => setApprovals({...approvals, conform: !approvals.conform})
          }}
        />
        {approvals.conform && !signature &&
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
            approvals.conform && (
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
        {approvals.conform && !signature &&
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
        title="¿Desea guardar la línea?"
        content="La información será enviada a la oficina. Se registrará la ubicación actual."
        handleClose={handleCloseAlert}
        agreedText="Si, guardar"
        handleAgree={handleSubmit(handleSave)}
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
