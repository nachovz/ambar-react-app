import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { Redirect } from 'react-router';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { getVehicleSession, isVehicleIdExpired } from 'app/utils/vehicle';
import { setCompletedCarteporte, getCompletedCartaporte } from 'app/utils/cartaporte';
import List from 'app/components/ui/List';
import TopBar from 'app/components/ui/TopBar';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import Row from 'app/components/ui/Row';
import Icon from 'app/components/ui/Icon';
import AlertDialog from 'app/components/ui/AlertDialog';
import getGeoPosition from 'app/utils/getGeoPosition';
import { getCompanyId } from 'app/utils/company';
import Button from 'app/components/ui/Button';
import { formatDate } from 'app/utils/esIntlFormatter';

const Ruta = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [orders, setOrders] = useState([]);
  const { vehicleId } = getVehicleSession();
  const [openAlert, setOpenAlert] = React.useState({ 
    open: false
  });
	const [currentDate, setCurrentDate] = useState(new Date().getTime());
  const refreshRuta = async function() {
    setLoadingState(true);
    try {
      const rutas = await client.get(`${ENDPOINTS.ROUTE(getCompanyId())}/${vehicleId}/route?date=${formatDate(currentDate)}`, { ignoreThrow: true });
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

  useEffect(() => {
    if (rutas && rutas.data) {
      setCompletedCarteporte(rutas.data);
    }
    setOrders(rutas.data || []);
  }, [rutas, setOrders]);

  useEffect(() => {
    if (!rutas || !rutas.data) {
      refreshRuta();
    }
  }, [rutas]);// eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
    refreshRuta();
  }, [currentDate]);

  if (!vehicleId || isVehicleIdExpired()) {
    return (
      <Redirect to="/login" />
    );
  }

  const showInfo = async (selectedCartaPorte) => {
    setLoadingState(true);
    const { lat, lng } = await getGeoPosition();
    setRutasState({
      ...rutas,
      selected:{
        ...openAlert.selected || selectedCartaPorte,
        latitude_start: parseFloat(lat),
        longitude_start: parseFloat(lng),
				...(formatDate(currentDate) !== formatDate(new Date().getTime())) && {notCurrent: true}
      }
    });
    setLoadingState(false);
    history.push("/cartaporte");
  };

  const handleCloseAlert = () => setOpenAlert({ open: false });
  const handleOpenCartaPorte = (selected, route, done=false) => () => {
		const current = getCompletedCartaporte().find( (cp) => cp.id === selected.serviceorderid);
		if(route === "/quickview" || done){
			setRutasState({
				...rutas,
				selected:{
					...((current && current.data) || selected),
					...(formatDate(currentDate) !== formatDate(new Date().getTime())) && {notCurrent: true}
				}
			});
			history.push(!!done ? '/resumen-dia' : route);
			return;
		}
		if(formatDate(currentDate) !== formatDate(new Date().getTime())){
			showInfo(selected);
		}else{
			setOpenAlert({
				open: true,
				selected
			});
		}
  };

  const ordersKeys = Object.keys(orders);
  return (
    <React.Fragment>
      <TopBar
        title={`Total avisos: ${ordersKeys.length}`}
        actionIcon={"refresh"}
        action={refreshRuta}
      >
				<Row>
					<Button 
						style={{margin: 0, padding: 0, minWidth: 30, lineHeight: '30px'}}
						onClick={() => setCurrentDate(currentDate - ( 86400000 ))}	
					>
						<Icon fontSize="tiny" icon="arrow_left"/>
					</Button>
					{formatDate(currentDate)}
					<Button 
						style={{margin: 0, padding: 0, minWidth: 30, lineHeight: '30px'}}
						onClick={() => setCurrentDate(currentDate + ( 86400000 ))}
					>
						<Icon fontSize="tiny" icon="arrow_right"/>
					</Button>
				</Row>
			</TopBar>
      <List>
        {ordersKeys.map((order, index) => (
          <TextListElement
            key={index}
            button
            disabled={orders[order].done}
            icon="mantenimiento"
            title={orders[order].serviceaddressname}
            subtitle={orders[order].serviceaddress}
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
