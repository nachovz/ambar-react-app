import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { getVehicleSession, isVehicleIdExpired } from 'app/utils/vehicle';
import { getCompanySession } from 'app/utils/company';
import { setCompletedCarteporte, getCompletedCartaporte } from 'app/utils/cartaporte';
import List from 'app/components/ui/List';
import TopBar from 'app/components/ui/TopBar';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import AlertDialog from 'app/components/ui/AlertDialog';
import getGeoPosition from 'app/utils/getGeoPosition';

const Ruta = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [orders, setOrders] = useState([]);
  const { vehicleId } = getVehicleSession();
  const { companyId } = getCompanySession();
  const [openAlert, setOpenAlert] = React.useState({ 
    open: false
  });

  useEffect(() => {
    if (rutas && rutas.data) {
      setCompletedCarteporte(rutas.data);
    }
    setOrders(rutas.data || []);
  }, [rutas, setOrders]);

  useEffect(() => {
    if (!rutas || !rutas.data) {
      async function fetchData() {
        setLoadingState(true);
        try {
          const rutas = await client.get(`${ENDPOINTS.GET_ROUTE(companyId)}/${vehicleId}/route`);
          setRutasState({ ...rutas, selected: null });
          setLoadingState(false);
        } catch (error) {
          setLoadingState(false);
          setSnackbarContext({
            message: error.message,
            variant: 'error',
            open: true,
          });
        }
      }
      fetchData();
    }
  }, [rutas, setLoadingState, setRutasState, vehicleId, setSnackbarContext, companyId]);

  if (!vehicleId || isVehicleIdExpired()) {
    return (
      <Redirect to="/login" />
    );
  }
    
  const showInfo = async () => {
    setLoadingState(true);
    const { lat, lng } = await getGeoPosition();
    setRutasState({
      ...rutas,
      selected:{
        ...openAlert.selected,
        latitude_start: parseFloat(lat),
        longitude_start: parseFloat(lng)
      }
    });
    setLoadingState(false);
    history.push("/cartaporte");
  };

  const handleCloseAlert = () => setOpenAlert({ open: false });
  const handleOpenCartaPorte = (selected, route, done=false) => () => {

    const current = getCompletedCartaporte().find( (cp) => cp.id === selected.ServiceOrderId);
    if(route === "/quickview" || done){
      setRutasState({
        ...rutas,
        selected:{
          ...((current && current.data) || selected)
        }
      });
      history.push(!!done ? '/resumen-dia' : route);
      return;
    }

    setOpenAlert({
      open: true,
      selected
    });
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
            title={orders[order].ServiceAddressName}
            subtitle={orders[order].ServiceAddress}
            subtitle2=""
            actionIcon={orders[order].done ? "ver" : "estado-aviso"}
            action={
              handleOpenCartaPorte(
                orders[order], 
                "/quickview",
                orders[order].done
              )
            }
            onClick={
              handleOpenCartaPorte(
                orders[order],
                "/cartaporte",
                orders[order].done
              )
            }
          />
        ))}
      </List>
      <AlertDialog
        open={openAlert.open}
        title="¿Deseas iniciar la recolección de datos?"
        content="Se registrará la ubicación actual."
        handleClose={handleCloseAlert}
        agreedText="Si"
        handleAgree={showInfo}
        cancelText="No"
      />
    </React.Fragment>
  );
};

export default withRouter(Ruta);
