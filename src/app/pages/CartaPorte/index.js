import React, { Fragment, useEffect } from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import Fab from 'app/components/ui/Fab';
import Icon from 'app/components/ui/Icon';
import StepNavigator from 'app/components/app/StepNavigator';
import Modal from 'app/components/containers/Modal';
import Checkbox from 'app/components/form/Checkbox';
import Row from 'app/components/ui/Row';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import Typography from 'app/components/ui/Typography';
import { CenteredPaddedContainer } from './elements';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useLoadingContext } from 'app/contexts/Loading';
import { getDCS } from 'app/utils/dcs';
import { OBSERVACIONES, TIPOS_RECOGIDAS } from 'app/constants/values';

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const [modal, setModal] = React.useState(false);
  const [obs, setObs] = React.useState(OBSERVACIONES);

  const moveTo = (route) => () => history.push(route);
  const { selected } = rutas;

  useEffect( () => {
    selected && setObs(selected.observaciones || OBSERVACIONES)
  }, [selected]);

  if(!selected){
    history.push('/');
    return null;
  }

  const openDCS = async () => {
    setLoadingState(true);
    try {
      await getDCS(rutas.selected.filePath);
      setLoadingState(false);
    } catch (error) {
      const message = error.response && error.response.status && error.response.status === 404
        ? 'No se encontro DCS'
        : 'Hubo un error en el servidor';

      setLoadingState(false);
      setSnackbarContext({
        message,
        variant: 'error',
        open: true
      });
    }
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

  const handleCloseModal = () => setModal(false);

  return (
    <Fragment>
      <TopBar
        title={`Carta de porte: ${selected.serviceOrderId}`}
        actionIcon="descarga-dcs"
        action={openDCS}
        secondaryActionIcon="observaciones"
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <List>
        {!!selected.data ? selected.data.map( (reco,index) => (
          <TextListElement
            key={index}
            button
            iconColor="primary"
            icon={TIPOS_RECOGIDAS[reco.projCategoryId]}
            title={reco.itemName}
            subtitle={reco.itemId}
            actionIcon={reco.done ? "editar" : "arrow_right"}
            disabled={reco.done}
            onClick={onSelectedRecogida(reco)}
            action={onSelectedRecogida(reco)}
          />
        ))
        :
        <CenteredPaddedContainer>
          <Typography variant="caption" color="error" display="block">
            Error al cargar las recogidas. Contactar oficina.
          </Typography>
        </CenteredPaddedContainer>
      }
      </List>
      <Fab
        color="primary"
        aria-label="Nuevo"
        onClick={() => history.push("/recogida-add")}
      >
        <Icon />
      </Fab>
      <Modal
        open={modal}
        onClose={handleCloseModal}
      >
        <CenteredPaddedContainer>
          <BorderedContainer padded>
            <Typography variant="h5" component="h3">
              Observaciones
            </Typography>
            {obs.map( ({ label, on }, ind) => (
              <Row key={ind}>
                <Checkbox
                  color="primary"
                  label={label}
                  input={{
                    value: on,
                    onChange:
                      () => {
                        var temp = obs;
                        temp[ind].on = !temp[ind].on;
                        selected.observaciones = temp;
                        setObs(temp);
                        setModal(false);
                        setRutasState({
                          ...rutas,
                          selected:{
                            ...selected
                          }
                        });
                      }
                  }}
                />
              </Row>
            ))}
          </BorderedContainer>
        </CenteredPaddedContainer>
      </Modal>
      <StepNavigator
        moveToPreviousText="Ruta"
        moveToPreviousAction={moveTo('')}
        moveToNextText="Resumen de Recogida"
        moveToNextAction={moveTo('cartaporte-summary')}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorte);
