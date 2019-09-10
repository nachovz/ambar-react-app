import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import QuickLinks from 'app/components/ui/QuickLinks';
import Typography from 'app/components/ui/Typography';

const CartaPorteQuickView = ({ history }) => {
  const [{ selected }] = useRutasContext();

  if (!selected) {
    history.push('/');
    return null;
  }

  console.log('Selected', selected);

  return (
    <React.Fragment>
      <QuickLinks
        phone="888 999 00 44"
        mobile="888 999 00 44"
        mainAction={() => history.push("/cartaporte")}
      />
      <List>
        <TextListElement
          noDivider
          title={selected.name}
          subtitle={selected.pickup.location.address}
          actionIcon="place"
          action={() => console.log("Action: open Maps")}
        />
        <TextListElement
          noDivider
          title="Carta de Porte"
          subtitle="Total 15 líneas"
        />
        <TextListElement
          noDivider
          title="Previsión de Envases"
          secondaryText={
            <React.Fragment>
              <Typography variant="body2" color="textSecondary">
                Bidón B200 8 x 15 unid.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Bidón 60 x 2 unid.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Bagst 200 x 5 unid.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Bidón 25 x 15 unid.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Jaula Tubo 2M3 DT x 2 unid
              </Typography>
              <Typography variant="body2" color="textSecondary">
                GRG 100 x 2 unid.
              </Typography>
            </React.Fragment>
          }
        />
        <TextListElement
          noDivider
          informative
          title="Observaciones de Oficina"
          subtitle="Nunc erat dolor, gravida vel tincidunt eu, accumsan sed magna. Proin sit amet lorem vitae tortor eleifend semper eu non turpis. Sed at orci ullamcorper, varius mi quis, auctor magna."
        />
        <TextListElement
          noDivider
          title="Recogida Anulada"
          subtitle="Vehículo lleno"
        />
      </List>
    </React.Fragment>
  );
};


export default withRouter(CartaPorteQuickView);
