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
import { getDCS } from 'app/utils/dcs';
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

  const openDCS = () => {
    setLoadingState(true);
    try {
      getDCS(selected.filePath);
      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
      setSnackbarContext({
        message: 'Hubo un error en el servidor',
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
          <ListItem button onClick={goTo('/cartaporte')}>
            <ListItemIcon>
              <Icon icon="mantenimiento" />
            </ListItemIcon>
            <ListItemText primary="Carta de Porte" />
          </ListItem>
          <ListItem button onClick={openDCS}>
            <ListItemIcon>
              <Icon icon="alerta" />
            </ListItemIcon>
            <ListItemText primary="DCS" />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default withRouter(ContextualMenu);
