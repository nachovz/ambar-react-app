import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMenuContext } from 'app/contexts/Menu';
import { useRutasContext } from 'app/contexts/Rutas';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useLoadingContext } from 'app/contexts/Loading';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from 'app/components/ui/Icon';
import MenuHeader from 'app/components/app/MenuHeader';
import { getPDF } from 'app/utils/dcs';
import { MENU_WIDTH } from 'app/styles/constants';
import { buildCartaporte, addCompletedCartaporte } from 'app/utils/cartaporte';
import { getCompanyId } from 'app/utils/company';
import getGeoPosition from 'app/utils/getGeoPosition';
import AlertDialog from 'app/components/ui/AlertDialog';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

const useStyles = makeStyles({
  list: {
    width: MENU_WIDTH
  }
});

const ContextualMenu = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [menuState, setMenuState] = useMenuContext();
  const [{ selected }] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
  const [openAlert, setOpenAlert] = React.useState(false);
  const classes = useStyles();

  const closeMenu = () => setMenuState({ ...menuState, contextual: false });
  const goTo = (route) => () => history.push(route);

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

  const closeCartaPorte = async () => {
    setLoadingState(true);
    try {
      const { lat, lng } = await getGeoPosition();
      selected.latitude_end = lat;
      selected.longitude_end = lng;
      selected.notes = ["Cerrado", "No se recolectó"];
      selected.noitems = "true";
      rutas.data[selected.serviceorderid] = selected;
      const body = buildCartaporte(selected);
      //console.log(body);
      await client.post(ENDPOINTS.ROUTE_POST(getCompanyId()), { body });
      addCompletedCartaporte(selected.serviceorderid);
      setLoadingState(false);
      setRutasState({
        ...rutas,
        selected: null
      });
    } catch (error) {
      setLoadingState(false);
    }
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Drawer
      open={menuState.contextual}
      anchor="right"
      variant="temporary"
      onClose={closeMenu}
    >
      <div className={classes.list}>
        <MenuHeader />
        <List>
          {!selected.done &&
            <>
              <ListItem button onClick={goTo('/cartaporte')}>
                <ListItemIcon>
                  <Icon icon="mantenimiento" />
                </ListItemIcon>
                <ListItemText primary="Carta de Porte" />
              </ListItem>
							{!rutas.selected.notCurrent &&
								<ListItem button onClick={() => setOpenAlert(true)}>
									<ListItemIcon>
										<Icon icon="cerrar" />
									</ListItemIcon>
									<ListItemText primary="Cerrar esta carta de porte" />
								</ListItem>
							}
            </>
          }
          {!!selected.cpfilepath &&
            <ListItem button onClick={openFile(selected.cpfilepath)}>
              <ListItemIcon>
                <Icon icon="descarga-cp" />
              </ListItemIcon>
              <ListItemText primary="Carta de Porte PDF" />
            </ListItem>
          }
          {!!selected.Filepath &&
            <ListItem button onClick={openFile(selected.Filepath)}>
              <ListItemIcon>
                <Icon icon="descarga-dcs" />
              </ListItemIcon>
              <ListItemText primary="DCS PDF" />
            </ListItem>
          }
        </List>
        <Divider />
      </div>
      <AlertDialog
        open={openAlert}
        title="¿Desea cerrar la carta de porte?"
        content="La información será enviada a la oficina. Se registrará la ubicación actual."
        handleClose={handleCloseAlert}
        agreedText="Si, guardar"
        handleAgree={closeCartaPorte}
        cancelText="No, seguir editando"
      />
    </Drawer>
  );
};

export default withRouter(ContextualMenu);
