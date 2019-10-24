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

const observaciones = [
  {
    label: "Observación #1",
    on: false
  },{
    label: "Observación #2",
    on: false
  },{
    label: "Otra observación",
    on: false
  },{
    label: "Observación #3",
    on: false
  },{
    label: "Observaciones",
    on: false
  }
]

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [modal, setModal] = React.useState(false);
  const [obs, setObs] = React.useState(observaciones);

  const moveTo = (route) => () => history.push(route);
  const { selected } = rutas;

  useEffect( () => {
    selected && setObs(selected.observaciones || observaciones)
  }, [selected]);

  if(!selected){
    history.push('/');
    return null;
  }

  //!modal && selected.observaciones && setObs(selected.observaciones);

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
      <List>
        <TopBar
          title={`Carta de porte: ${selected.pickup.customFields["Pedido de servicio"]}`}
          actionIcon="mantenimiento"
          action={() => console.log("Action: open PDF")}
          secondaryActionIcon="servicios"
          secondaryAction={() => setModal(true)}
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        {!!selected.recogidas && selected.recogidas.map( (reco,index) => (
          <TextListElement
            key={index}
            button
            iconColor="primary"
            icon="mantenimiento"
            title={reco.desc}
            subtitle={reco.id}
            actionIcon={reco.done ? "toggle-on" : "arrow_right"}
            disabled={reco.done}
            onClick={onSelectedRecogida(reco)}
            action={onSelectedRecogida(reco)}
          />
        ))}
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
        moveToPreviousText="Datos de Usuario"
        moveToPreviousAction={moveTo('cartaporte-client')}
        moveToNextText="Resumen de Recogida"
        moveToNextAction={moveTo('cartaporte-summary')}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorte);
