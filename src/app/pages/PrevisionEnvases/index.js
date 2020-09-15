import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import client from 'app/client';
import { useRutasContext } from 'app/contexts/Rutas';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
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
import { findRecogidaType, SERVICIO, SERVFACT } from 'app/constants/values';
import { getCompanyId } from 'app/utils/company';

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
        rutaFuture = await client.get(`${ENDPOINTS.ROUTE(getCompanyId())}/${vehicleId}/route?date=${queryDate}`);
        setFuture({
          data: rutaFuture.data,
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
    const clientArray = Object.keys(data).reduce((result, key) => ([
      ...result,
      ...[{ 
        "client": data[key].serviceaddressname, 
        "data": data[key].data.filter((reco) => 
          (findRecogidaType(reco.projcategoryid) !== SERVICIO && findRecogidaType(reco.projcategoryid) !== SERVFACT ))
      }]
    ]), []);
    return clientArray.map(({client, data}, ind) =>{
      return {
      client,
      data: dictionaryGenerator(
        data, 
        ["packingmaterialname", "itemname"], 
        "res_qty_env"
      )
      }
    });
  }

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
              {keyDataGenerator(future.data).map(({client, data}, index) =>(
                <React.Fragment key={index}>
                <TextListElement
                  icon="usuario"
                  title={client}
                />
                {data.map((container, ind) =>(
                  <DataListElement
                    key={`${index}-${ind}`}
                    icon="envase"
                    title={container.name}
                    quantities={[container.Qty]}
                  />
                ))}
                
                </React.Fragment>
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
              {keyDataGenerator(rutas.data).map(({client, data}, index) =>(
                <React.Fragment key={index}>
                <TextListElement
                  icon="usuario"
                  title={client}
                />
                {data.map((container, ind) =>(
                  <DataListElement
                    key={`${index}-${ind}`}
                    icon="envase"
                    title={container.name}
                    quantities={[container.Qty]}
                  />
                ))}
                
                </React.Fragment>
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
