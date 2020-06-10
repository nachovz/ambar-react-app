import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import client from 'app/client';
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import StepNavigator from 'app/components/app/StepNavigator';
import dictionaryGenerator from 'app/utils/dictionaryGenerator';
import ExpansionPanel from 'app/components/ui/ExpansionPanel';
import Button from 'app/components/ui/Button';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import { esIntlDate } from 'app/utils/esIntlFormatter';
import getColor from 'app/styles/palette';
import ENDPOINTS from 'app/constants/endpoints';
import { getVehicleSession } from 'app/utils/vehicle';
import Typography from 'app/components/ui/Typography';
import { TIPOS_RECOGIDAS, SERVICIO, SERVFACT } from 'app/constants/values';

const PrevisionEnvases = ({ history }) => {
  const [rutas] = useRutasContext();
  const [future, setFuture] = useState();
  const [noFuture, setNoFuture] = useState();
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const { vehicleId } = getVehicleSession();
  let currentDate = new Date();

  if (!rutas || ! rutas.data) {
    history.push('/');
    return null;
  }

  const moveBack = () => {
    history.push("/");
  }

  const loadFuturePrevision = async () => {
    setLoadingState(true);
    let counter = 1;
    let rutaFuture = null;
    while(!rutaFuture && counter < 4 ){
      try {
        let queryDate = esIntlDate.format(currentDate.getTime() + ( 86400000 * counter));
        rutaFuture = await client.get(`${ENDPOINTS.GET_ROUTE}/${vehicleId}/route?date=${queryDate}`);
        setFuture({
          data: keyDataGenerator(rutaFuture.data),
          date: queryDate
        });
        setLoadingState(false);
      } catch (error) {
        if(!error.response.data.data){
          setSnackbarContext({
            message: error.message,
            variant: 'error',
            open: true
          });
          break;
        }  
        counter++;
      }
    }
    setNoFuture(!rutaFuture);
    setLoadingState(false);
  }

  const keyDataGenerator = (data) => {
    return dictionaryGenerator(
      Object.keys(data).reduce((result, key) => ([
          ...result,
          ...data[key].data.filter((reco) => (TIPOS_RECOGIDAS[reco.ProjCategoryId] !== SERVICIO && TIPOS_RECOGIDAS[reco.ProjCategoryId] !== SERVFACT ))
        ]), []), 
      ["PackingMaterialName", "ItemName"], 
      "Res_Qty_Env", 
      "PackingMaterialName"
    );
  }
  const containersDictionary = keyDataGenerator(rutas.data);

  return (
    <Fragment>
      <TopBar
        title="Prevision de envases:"
      />
      
      {!future &&
        <React.Fragment>
          <PaddedContainer $simpleCentered $noHorizontal $noVertical>
            <Button 
              variant="contained" 
              color="primary"
              onClick={loadFuturePrevision}
            >
              Cargar Previsión de Envase futura
            </Button>
          </PaddedContainer>
          <React.Fragment>
            {!!noFuture &&
              <PaddedContainer $simpleCentered >
                <Typography>
                  No hay rutas disponibles para los próximos 3 días.
                </Typography>
              </PaddedContainer>
            }
          </React.Fragment>
        </React.Fragment>
      }
      {!!future &&
        <ExpansionPanel
          noPadding
          expanded={false} 
          content={{
            title: `${future.date}`,
            background: getColor("PRIMARY"),
            content:(
              <List>
                {Object.keys(future.data).map((container, index) =>(
                  <DataListElement
                    key={index}
                    icon="envase"
                    title={future.data[container].name}
                    subtitle={container}
                    quantities={[future.data[container].Qty]}
                  />
                ))}
              </List>
            )
          }}
        />
      }
      <ExpansionPanel
        noPadding 
        content={{
          title: `${esIntlDate.format(currentDate)} - (Hoy)`,
          background: getColor("PRIMARY"),
          content:(
            <List>
              {Object.keys(containersDictionary).map((container, index) =>(
                <DataListElement
                  key={index}
                  icon="envase"
                  title={containersDictionary[container].name}
                  subtitle={container}
                  quantities={[containersDictionary[container].Qty]}
                />
              ))}
            </List>
          )
        }}
      />
      
      <StepNavigator
        moveToPreviousText="Ruta"
        moveToPreviousAction={moveBack}
        moveToNextText=""
      />
    </Fragment>
  );
};

export default withRouter(PrevisionEnvases);
