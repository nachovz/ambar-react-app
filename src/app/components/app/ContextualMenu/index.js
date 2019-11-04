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

const ContextualMenu = ({ history }) => {
  const [menuState, setMenuState] = useMenuContext();
  const classes = useStyles();

  const closeMenu = () => setMenuState({ ...menuState, contextual: false });
  const goTo = (route) => () => history.push(route);

  return (
    <Drawer
      open={menuState.contextual}
      anchor="left"
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
          <ListItem button>
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
