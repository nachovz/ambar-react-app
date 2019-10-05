import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMenuContext } from 'app/contexts/Menu';
import Icon from 'app/components/ui/Icon';
import Menu from 'app/components/app/Menu';
import Typography from 'app/components/ui/Typography';
import { Nav, MenuAction } from './elements';

const Navbar = ({ history }) => {
  const [, setMenuState] = useMenuContext();
  const openMenu = () => setMenuState(true);
  const goHome = () => history.push('/');

  return (
    <Nav>
      <MenuAction onClick={openMenu}>
        <Icon icon="menu" fontSize="small" />
      </MenuAction>
      <Typography variant="subtitle1">
        Ruta
      </Typography>
      <MenuAction onClick={goHome}>
        <Icon icon="listado" fontSize="small" />
      </MenuAction>
      <Menu />
    </Nav>
  );
};

export default withRouter(Navbar);
