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
import NotesModal from 'app/components/form/NotesModal';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useLoadingContext } from 'app/contexts/Loading';
import { getPDF } from 'app/utils/dcs';
import { TIPOS_RECOGIDAS, getRecogidaTypes } from 'app/constants/values';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';
import ExpansionPanel from 'app/components/ui/ExpansionPanel';
import getColor from 'app/styles/palette';
import Typography from 'app/components/ui/Typography';

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  let { notes } = getCompanySession();
  const { selected } = rutas;
  const [obs, setObs] = React.useState((selected && selected.observaciones) ||formatCompanyNotes(notes, 1));
  const [modal, setModal] = React.useState(false);
  const moveTo = (route) => () => history.push(route);

  useEffect( () => {
    obs && setRutasState( currentRuta => ({
      ...currentRuta,
      selected:{
        ...currentRuta.selected,
        observaciones: obs
      }
    }));
  }, [obs, setRutasState]);

  if(!selected){
    history.push('/');
    return null;
  }

  const openDCS = async () => {
    setLoadingState(true);
    try {
      await getPDF(rutas.selected.dcsFilePath);
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

  const filterRecogidasByType = (type, recogidas) => {
    return(
      <React.Fragment key={type}>
        <ExpansionPanel
          noPadding 
          content={{
            title: type.toUpperCase(),
            icon: type,
            background: getColor(type.toUpperCase()),
            content:(
              <List>
                {recogidas
                  .filter( reco => TIPOS_RECOGIDAS[reco.projCategoryId] === type )
                  .map( (reco,index) => (
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
              }
              </List>
            )
          }}
        />
      </React.Fragment>
    )
  };

  const handleCloseModal = () => setModal(false);
  return (
    <Fragment>
      <TopBar
        title={`Carta de porte: ${selected.serviceOrderId}`}
        actionIcon={selected.dcsFilePath && "descarga-dcs"}
        action={openDCS}
        secondaryActionIcon="observaciones"
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      {!!selected.officeNotes &&
        <ExpansionPanel 
          content={{
            title: 'Observaciones Oficina',
            icon: 'observaciones',
            content:(
              <Typography>
                {selected.officeNotes}
              </Typography>
            )
          }}
        />
      }
      {!!selected.data ? 
          getRecogidaTypes()
          .map( type => filterRecogidasByType(type, selected.data))
        :
          <TextListElement
            subtitle="Error al cargar las recogidas. Contactar oficina."
          />
      }
      <Fab
        color="primary"
        aria-label="Nuevo"
        onClick={() => history.push("/recogida-add")}
      >
        <Icon />
      </Fab>
      <NotesModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        title="Observaciones"
        obs={obs}
        setObs={setObs}
      />
      <StepNavigator
        moveToPreviousText="Ruta"
        moveToPreviousAction={moveTo('')}
        moveToNextText="Resumen"
        moveToNextAction={moveTo('cartaporte-summary')}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorte);
