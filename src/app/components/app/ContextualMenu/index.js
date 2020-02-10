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

const useStyles = makeStyles({
  list: {
    width: MENU_WIDTH
  }
});

const ContextualMenu = ({ history }) => {
  const [menuState, setMenuState] = useMenuContext();
  const [{ selected }] = useRutasContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setLoadingState] = useLoadingContext();
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
      const message = error.response && error.response.status && error.response.status === 404
        ? 'No se encontro el archivo'
        : 'Hubo un error en el servidor';

      setSnackbarContext({
        message,
        variant: 'error',
        open: true
      });
    }
  }

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
            <ListItem button onClick={goTo('/cartaporte')}>
              <ListItemIcon>
                <Icon icon="mantenimiento" />
              </ListItemIcon>
              <ListItemText primary="Carta de Porte" />
            </ListItem>
          }
          {!!selected.CpFilepath &&
            <ListItem button onClick={openFile(selected.CpFilepath)}>
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
    </Drawer>
  );
};

export default withRouter(ContextualMenu);
