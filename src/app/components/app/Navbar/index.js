import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMenuContext } from 'app/contexts/Menu';
import { useRutasContext } from 'app/contexts/Rutas';
import Icon from 'app/components/ui/Icon';
import ContextualMenu from 'app/components/app/ContextualMenu';
import MainMenu from 'app/components/app/MainMenu';
import Typography from 'app/components/ui/Typography';
import { Nav, Title, MenuAction } from './elements';

const Navbar = ({ history }) => {
  const [rutas] = useRutasContext();
  const [menuState, setMenuState] = useMenuContext();
  const openMainMenu = () => setMenuState({ ...menuState, main: true });
  const openContextualMenu = () => setMenuState({ ...menuState, contextual: true });

  return (
    <Nav>
      <MenuAction onClick={openMainMenu}>
        <Icon icon="menu" fontSize="small" />
      </MenuAction>

      <Title>
        <Typography variant="subtitle1">
          Ruta
        </Typography>
      </Title>
      {rutas.selected && !rutas.selected.done && (
        <MenuAction onClick={openContextualMenu}>
          <Icon icon="listado" fontSize="small" />
        </MenuAction>
      )}
      <MainMenu />
      {rutas.selected && !rutas.selected.done && <ContextualMenu />}
    </Nav>
  );
};

export default withRouter(Navbar);
