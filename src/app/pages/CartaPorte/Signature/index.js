import React, { useState } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Typography from 'app/components/ui/Typography';
import SignatureCanvas from 'react-signature-canvas';
import StepNavigator from 'app/components/app/StepNavigator';
import Button from 'app/components/ui/Button';
import Checkbox from 'app/components/form/Checkbox';
import Spacer from 'app/components/ui/Spacer';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import {
  BorderedContainer,
  ImageComponent,
  ErrorContainer
} from './elements';

const CartaPorteSignature = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [expanded, setExpanded] = useState(false);
  const [signature, setSignature] = useState();
  const [approvals, setApprovals] = useState({
    conform: false,
    terms: false
  })
  let sigPad = React.createRef();
  const moveBack = () => history.goBack();
  const moveNext = () => history.push('cartaporte');

  const { selected } = rutas;
  if(!selected){
    history.push('/');
    return null;
  }

  const onSelectedRecogida = (selectedRecogida) => () => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida
      }
    });
    history.push("/recogida");
  };

  return(
    <React.Fragment>
      <List>
        <TopBar title="CARTA DE PORTE No 198044_amb" />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
      </List>
      <PaddedContainer
        $noVertical
      >

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
        <BorderedContainer>
          {
            signature ?
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
                    height: 300
                  }}
                />
              )
          }
        </BorderedContainer>
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
        {!signature &&
          <ErrorContainer>
            <Typography variant="caption" color="error">
              * Falta firma
            </Typography>
          </ErrorContainer>
        }
      </PaddedContainer>
      <Spacer size="lg"/>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Firma cliente"
        moveToNextAction={moveNext}
      />
    </React.Fragment>
  );
}

export default withRouter(CartaPorteSignature);
