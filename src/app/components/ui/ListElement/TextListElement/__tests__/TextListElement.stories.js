import React from 'react';
import { storiesOf } from '@storybook/react';
import TextListElement from '../';
import List from 'app/components/ui/List';

storiesOf('List Elements', module)
  .add('TextListElement', () => (
    <List>
      <TextListElement informative title="Separator or Title" />
      <TextListElement
        button
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="estado-aviso"
      />
      <TextListElement
        icon="mantenimiento"
        title="(VM) Talleres Mariscal Automotriz Nombre Largo"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="estado-aviso"
      />
      <TextListElement
        informative
        icon="usuario"
        title="Nombre de la empresa"
        subtitle="(VM) Talleres Mariscal Automotriz Nombre Largo"
      />
      <TextListElement
        informative
        icon="direccion"
        title="Dirección"
        subtitle="C/ Joaquín Sorolla, 51"
        subtitle2="28522 Rivas Vacia Madrid"
        actionIcon="place"
      />
      <TextListElement
        informative
        title="Teléfono fijo"
        subtitle="888 888 8888"
        actionIcon="phone"
      />
      <TextListElement
        informative
        title="Teléfono Móvil"
        subtitle="009 992 0098"
        actionIcon="movil"
      />
      <TextListElement
        informative
        title="Email"
        subtitle="correo_electrónico@email.com"
        actionIcon="mail"
      />
      <TextListElement
        informative
        icon="cif"
        title="CIF"
        subtitle="45543212V"
      />
      <TextListElement
        informative
        icon="observaciones"
        title="Observaciones Oficina"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque neque. Cras nec eleifend odio. Proin neque mi, elementum eu neque nec, consectetur mattis enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. In vel odio ut ipsum blandit finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam pulvinar dui eu tempus rhoncus. Nam efficitur lacinia est id lobortis.
          Praesent ac lectus varius odio commodo aliquam in ac nisl."
      />
      <TextListElement
        coloredIcon
        icon="mantenimiento"
        title="16060100"
        subtitle="RP_Baterías de plomo"
      />
      <TextListElement
        button
        coloredIcon
        icon="mantenimiento"
        title="16060100"
        subtitle="RP_Baterías de plomo"
        actionIcon="arrow_right"
      />
      <TextListElement
        noDivider
        icon="clip"
        title="img_1.jpg"
        actionIcon="papelera"
      />
      <TextListElement
        button
        informative
        title="Navigation item"
        actionIcon="arrow_right"
      />
    </List>
  ));