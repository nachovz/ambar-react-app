import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUserSession } from 'app/utils/auth/userSession';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from 'app/components/ui/Icon';
import MenuHeader from 'app/components/app/MenuHeader';
import { MENU_WIDTH } from 'app/styles/constants';

const useStyles = makeStyles ({
  list: {
    width: MENU_WIDTH
  }
});

const SwipeableMenu = ({ history }) => {
  const [swipeableMenuState, setSwipeableMenuState] = useState(false);
  const classes = useStyles();

  const toggleMenu = (state) => () => setSwipeableMenuState(state);
  const goTo = (route) => () => history.push(route);
  const signOut = () => {
    deleteUserSession();
    history.push('/login');
  }

  return (
    <SwipeableDrawer
      open={swipeableMenuState}
      anchor="left"
      variant="temporary"
      onOpen={toggleMenu(true)}
      onClose={toggleMenu(false)}
    >
      <div className={classes.list}>
        <MenuHeader />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Icon icon="listado" />
            </ListItemIcon>
            <ListItemText primary="Ruta / Cartas de Porte" />
          </ListItem>
          <ListItem
            button
            onClick={goTo('prevision-envases')}
          >
            <ListItemIcon>
              <Icon icon="envase" />
            </ListItemIcon>
            <ListItemText primary="Prevision de Envases" />
          </ListItem>
          <ListItem button onClick={goTo('resumen-dia')}>
            <ListItemIcon>
              <Icon icon="filtro" />
            </ListItemIcon>
            <ListItemText primary="Resumen del dia" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={signOut}>
            <ListItemIcon>
              <Icon icon="salir" />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesion" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default withRouter(SwipeableMenu);
