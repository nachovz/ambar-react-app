import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMenuContext } from 'app/contexts/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from 'app/components/ui/Icon';
import MenuHeader from 'app/components/app/MenuHeader';
import { MENU_WIDTH } from 'app/styles/constants';

const useStyles = makeStyles({
  list: {
    width: MENU_WIDTH
  }
});

const Menu = ({ history }) => {
  const [open, setOpen] = useMenuContext();
  const classes = useStyles();

  const closeMenu = () => setOpen(false);
  const goTo = (route) => () => history.push(route);

  return (
    <Drawer
      open={open}
      anchor="left"
      variant="temporary"
      onClose={closeMenu}
    >
      <div className={classes.list}>
        <MenuHeader />
        <List>
          <ListItem
            button
            onClick={goTo('/cartaporte-client')}
          >
            <ListItemIcon>
              <Icon icon="usuario" />
            </ListItemIcon>
            <ListItemText primary="Datos Usuario" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon icon="mantenimiento" />
            </ListItemIcon>
            <ListItemText primary="Carta de Porte" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon icon="firma" />
            </ListItemIcon>
            <ListItemText primary="Firma" />
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
          <ListItem button>
            <ListItemIcon>
              <Icon icon="alerta" />
            </ListItemIcon>
            <ListItemText primary="DCS" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Icon icon="estado-aviso" />
            </ListItemIcon>
            <ListItemText primary="Anular recogida" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default withRouter(Menu);
