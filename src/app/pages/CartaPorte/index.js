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
import { findRecogidaType, getRecogidaTypes } from 'app/constants/values';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';
import ExpansionPanel from 'app/components/ui/ExpansionPanel';
import getColor from 'app/styles/palette';
import Typography from 'app/components/ui/Typography';
import { is_debug } from 'app/constants/values';
import { formatDate } from 'app/utils/esIntlFormatter';

const CartaPorte = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  let { notes } = getCompanySession();
  const { selected } = rutas;
  const [obs, setObs] = React.useState((selected && selected.observaciones) || formatCompanyNotes(notes, 1));
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

  const openFile = (filepath) => async () => {
    setLoadingState(true);
    try {
      await getPDF(filepath);
      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
      setSnackbarContext({
        message: error.message,
        variant: 'error',
        open: true
      });
    }
  }

  const onSelectedRecogida = (selectedRecogida) => () => {
    if(!rutas.selected.notCurrent) {
			setRutasState({
				...rutas,
				selected:{
					...selected,
					selectedRecogida
				}
			});
			history.push("/recogida");
		}
  };

  const filterRecogidasByType = (type, recogidas) => {
    const grouped = recogidas.filter( 
      reco => findRecogidaType(reco.projcategoryid) === type 
    );
    if(grouped.length < 1) return null;

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
                {grouped.map( (reco,index) => (
                  <TextListElement
                    key={index}
                    button
                    iconColor="primary"
                    icon={findRecogidaType(reco.projcategoryid)}
                    title={reco.itemname}
                    subtitle={reco.itemid}
                    actionIcon={reco.done ? "editar" : "arrow_right"}
                    disabled={reco.done || rutas.selected.notCurrent}
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

  const handleCloseModal = (newObs) => () => {
    setObs(newObs);
    setModal(false);
  }
	is_debug() && console.log(selected)
  return (
    <Fragment>
      <TopBar
        title={`Carta de porte: ${selected.serviceorderid}`}
        actionIcon={selected.filepath && "descarga-dcs"}
        action={openFile(rutas.selected.filepath)}
        extraActionIcon={selected.cpfilepath && "descarga-cp"}
        extraAction={openFile(rutas.selected.cpfilepath)}
        secondaryActionIcon={!rutas.selected.notCurrent && "observaciones"}
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${formatDate(new Date(selected.servicedatetime))}`} />
      {!!selected.officenotes &&
        <ExpansionPanel 
          content={{
            title: 'Observaciones Oficina',
            icon: 'observaciones',
            content:(
              <Typography>
                {selected.officenotes}
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
			{ !rutas.selected.notCurrent && (
				<Fab
					color="primary"
					aria-label="Nuevo"
					onClick={() => history.push("/recogida-add")}
				>	
					<Icon />
				</Fab>
			)}
      <NotesModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        title="Observaciones"
        obs={obs}
        setObs={setObs}
        withComments
      />
      <StepNavigator
        moveToPreviousText="Ruta"
        moveToPreviousAction={moveTo('')}
        moveToNextText={!rutas.selected.notCurrent && "Resumen"}
        moveToNextAction={moveTo('cartaporte-summary')}
      />
    </Fragment>
  );
};

export default withRouter(CartaPorte);
