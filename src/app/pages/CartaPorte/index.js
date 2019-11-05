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
import { getDCS } from 'app/utils/dcs';
import { TIPOS_RECOGIDAS } from 'app/constants/values';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const [modal, setModal] = React.useState(false);
  let { notes } = getCompanySession();
  const [obs, setObs] = React.useState(formatCompanyNotes(notes, 1));


  const moveTo = (route) => () => history.push(route);
  const { selected } = rutas;

  useEffect( () => {
    selected && setObs(selected.observaciones || formatCompanyNotes(notes, 1))
  }, [selected, notes]);

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
  const handleNotes = (ind) => () => {
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
        <TextListElement
          subtitle="Error al cargar las recogidas. Contactar oficina."
        />
      }
      </List>
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
        list={obs}
        handleList={handleNotes}
      />
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
