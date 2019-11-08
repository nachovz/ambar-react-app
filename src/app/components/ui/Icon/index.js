// @flow
import * as React from 'react';
import UIIcon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import PlaceIcon from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';
import getColor from 'app/styles/palette';
import clsx from 'clsx';

import 'app/css/icons.css';

/* Types
type Props = {
  $white: true | false,
  $button: true | false,
  fontSize: "inherit" | "default" | "small" | "large" | "tiny",
  color: "inherit" | "primary" | "secondary" | "action" | "error" | "disabled",
  icon: "acciones"
  | "aire" // AAC
  | "alerta"
  | "arrow-drop-down"
  | "arrow-drop-up"
  | "arrow_left"
  | "arrow_less"
  | "arrow_more"
  | "arrow_right"
  | "atras"
  | "borrar"
  | "caldera" //JUN
  | "calendario"
  | "camara"
  | "cerrar"
  | "cif"
  | "clip"
  | "cuadre-de-caja"
  | "defectos"
  | "direccion"
  | "dto"
  | "editr"
  | "estado-aviso"
  | "factura"
  | "filtro"
  | "firma"
  | "historial"
  | "info"
  | "intervencion"
  | "listado"
  | "lupa"
  | "mail"
  | "mantenimiento"
  | "menu"
  | "movil"
  | "observaciones"
  | "papelera"
  | "perfil"
  | "phone"
  | "piezas"
  | "salir"
  | "servicios"
  | "sort"
  | "toggle-off"
  | "toggle-on"
  | "usuario"
  | "ver"
  | "add"
};*/

const styles = {
  root: {
    width: 'auto',
    height: 'auto',
  },
  recogida:{
    color: getColor('RECOGIDA')
  },
  entrega:{
    color: getColor('ENTREGA')
  },
  servicio:{
    color: getColor('SERVICIO')
  }
};

const Icon = ({
  color,
  classes,
  fontSize,
  icon,
  fab = false,
  className,
  ...props
}) => {
  const iconClass = clsx(`icon-${icon}`);
  const classesMerge = clsx(
    classes.root,
    className,
    icon === 'recogida' ? classes.recogida : {},
    icon === 'servicio' ? classes.servicio : {},
    icon === 'entrega' ? classes.entrega : {}
  );
  if (!icon) return (
    <AddIcon color={color} />
  );

  if (icon === 'place') return (
    <PlaceIcon color={color} />
  );

  return (
    <UIIcon
      color={color}
      fontSize={fontSize === "tiny" ? "inherit" : fontSize}
      className={classesMerge}
      {...props}
    >
      <span className={iconClass} />
    </UIIcon>
  )
};

export default withStyles(styles)(Icon);
