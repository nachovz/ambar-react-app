import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { getVehicleSession, isVehicleIdExpired } from 'app/utils/vehicle';
import { setCompletedCarteporte } from 'app/utils/cartaporte';
import List from 'app/components/ui/List';
import TopBar from 'app/components/ui/TopBar';
import TextListElement from 'app/components/ui/ListElement/TextListElement';

const Ruta = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const orders = rutas.data || [];
  const { vehicleId } = getVehicleSession();

  useEffect(() => {
    if (rutas && rutas.data) {
      setCompletedCarteporte(rutas.data);
    }
  }, [rutas]);

  useEffect(() => {
    if (!rutas || !rutas.data) {
      async function fetchData() {
        setLoadingState(true);
        try {
          const rutas = await client.get(`${ENDPOINTS.GET_ROUTE}/${vehicleId}/route`);
          setRutasState({ ...rutas, selected: null });
          setLoadingState(false);
        } catch (error) {
          setLoadingState(false);
          setSnackbarContext({
            message: 'Hubo un error en el servidor',
            variant: 'error',
            open: true
          });
        }
      }
      fetchData();
    }
  }, [rutas, setLoadingState, setRutasState, vehicleId, setSnackbarContext]);

  if (!vehicleId || isVehicleIdExpired()) {
    return (
      <Redirect to="/login" />
    );
  }

  const showInfo = (selected, route, done=false) => () => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected
      }
    });
    history.push(!!done ? '/resumen-dia' : route);
  };

  const ordersKeys = Object.keys(orders);

  return (
    <React.Fragment>
      <TopBar
          title={`Total avisos: ${ordersKeys.length}`}
          now
        />
      <List>
        {ordersKeys.map((order, index) => (
          <TextListElement
            key={index}
            button
            disabled={orders[order].done}
            icon="mantenimiento"
            title={orders[order].serviceAddressName}
            subtitle={orders[order].serviceAddress}
            subtitle2=""
            actionIcon={orders[order].done ? "ver" : "estado-aviso"}
            action={showInfo(orders[order], "/quickview",orders[order].done)}
            onClick={showInfo(orders[order],"/cartaporte",orders[order].done)}
          />
        ))}
      </List>
    </React.Fragment>
  );
};

export default withRouter(Ruta);
