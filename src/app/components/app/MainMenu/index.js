import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUserSession } from 'app/utils/auth/userSession';
import { deleteVehicleSession } from 'app/utils/vehicle';
import { deleteCompanySession } from 'app/utils/company';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from 'app/components/ui/Icon';
import MenuHeader from 'app/components/app/MenuHeader';
import { useMenuContext } from 'app/contexts/Menu';
import { MENU_WIDTH } from 'app/styles/constants';

const useStyles = makeStyles ({
  list: {
    width: MENU_WIDTH
  }
});

const MainMenu = ({ history }) => {
  const [menuState, setMenuState] = useMenuContext();
  const classes = useStyles();

  const closeMenu = () => setMenuState({ ...menuState, main: false });
  const goTo = (route) => () => history.push(route);
  const signOut = () => {
    deleteUserSession();
    deleteVehicleSession();
    deleteCompanySession();
    history.push('/login');
  }

  return (
    <Drawer
      open={menuState.main}
      anchor="left"
      variant="temporary"
      onClose={closeMenu}
    >
      <div className={classes.list}>
        <MenuHeader />
        <List>
          <ListItem
            button
            onClick={goTo('/')}
          >
            <ListItemIcon>
              <Icon icon="listado" />
            </ListItemIcon>
            <ListItemText primary="Ruta" />
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
    </Drawer>
  );
};

export default withRouter(MainMenu);
