import React from 'react';
import { storiesOf } from '@storybook/react';
import MainListElement from '../';

import List from '@material-ui/core/List';

storiesOf('MainListElement', module)
  .add('Interactive', () => (
    <List>
      <MainListElement
        button
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        button
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
      <MainListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="info"
      />
    </List>

  ))
  .add( 'Informative', () => (
    <List>
      <MainListElement
        icon="usuario"
        title="Nombre de la empresa"
        subtitle="(VM) Talleres Mariscal Automotriz Nombre Largo"
        informative
      />
      <MainListElement
        icon="direccion"
        title="Dirección"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="place"
        informative
      />
      <MainListElement
        title="Teléfono fijo"
        subtitle="888 888 8888"
        actionIcon="phone"
        informative
      />
      <MainListElement
        title="Teléfono Móvil"
        subtitle="009 992 0098"
        actionIcon="movil"
        informative
      />
      <MainListElement
        title="Email"
        subtitle="correo_electrónico@email.com"
        actionIcon="mail"
        informative
      />
      <MainListElement
        icon="cif"
        title="CIF"
        subtitle="45543212V"
        informative
      />
      <MainListElement
        icon="observaciones"
        title="Observaciones Oficina"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque neque. Cras nec eleifend odio. Proin neque mi, elementum eu neque nec, consectetur mattis enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. In vel odio ut ipsum blandit finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam pulvinar dui eu tempus rhoncus. Nam efficitur lacinia est id lobortis.
          Praesent ac lectus varius odio commodo aliquam in ac nisl."
        informative
      />
    </List>
  ));