import React, { useState } from 'react';
import { useRutasContext } from 'app/contexts/Rutas';
import StepNavigator from 'app/components/app/StepNavigator';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import ImageComponent from 'app/components/ui/ImageComponent';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import Checkbox from 'app/components/form/Checkbox';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';import Table from 'app/components/ui/Table';
import TableElement from 'app/components/ui/Table/TableElement';
import { getVehicleSession } from 'app/utils/vehicle';
import { TIPOS_RECOGIDAS } from 'app/constants/values';
import { esIntlFormatter } from 'app/utils/esIntlFormatter';
import COMPANY from 'app/constants/company_info.json';

const STEPS = {
  resumen: {
    next: 'conductor',
  },
  conductor: {
    previous: 'resumen',
    next: 'cargador'
  },
  cargador: {
    previous: 'conductor',
    next: 'transportista'
  },
  transportista: {
    previous: 'cargador',
    next: 'destinatario'
  },
  destinatario: {
    previous: 'transportista',
    next: 'residuos'
  },
  residuos: {
    previous: 'destinatario',
    next: 'observaciones'
  },
  observaciones: {
    previous: 'residuos',
    next: 'firma'
  },
  firma: {
    previous: 'observaciones',
    next: 'Volver a Ruta'
  },
}

const ResumenDia = ({ history }) => {
  const [step, setStep] = useState('resumen');
  const [{ selected }] = useRutasContext();

  React.useEffect( () => {
    window.scrollTo(0, 0);
  })

  const moveToStep = (step) => () => setStep(step);
  const moveToNextStep = () => setStep(STEPS[step].next);
  const moveToPreviousStep = () => setStep(STEPS[step].previous);

  if(!selected){
    history.push('/');
    return null;
  }

  const { vehicleId } = getVehicleSession();

  const {
    serviceOrderId,
    serviceDateTime,
    serviceAddressName,
    custAccount,
    serviceAddress,
    clientPhone,
    clientEmail,
    clientVat,
    clientContactPersonName,
    clientTimeTable,
    clientAccesible,
    responsible
  } = selected;

  return (
    <div>
      <TopBar
        title={`Carta de porte: ${serviceOrderId}`}
      />
      <DateBar title={`FECHA RECOGIDA: ${serviceDateTime}`} />
      {step === 'resumen' && (
        <List>
          <TextListElement
            title="Conductor"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('conductor')}
          />
          <TextListElement
            title="Cargador/Expedidor"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('cargador')}
          />
          <TextListElement
            title="Transportista"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('transportista')}
          />
          <TextListElement
            title="Destinatario"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('destinatario')}
          />
          <TextListElement
            title="Residuos Recogidos"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('residuos')}
          />
          <TextListElement
            title="Observaciones"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('observaciones')}
          />
          <TextListElement
            title="Firma Cliente"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('firma')}
          />
        </List>
      )}
      {step === 'conductor' && (
        <List>
          <TextListElement
            informative
            title="Conductor"
          />

          <TextListElement
            noDivider
            title="Matrícula Vehículo"
            subtitle={vehicleId}
          />
        </List>
      )}
      {step === 'cargador' && (
        <List>
          <TextListElement
            informative
            title="Cargador/Expedidor Contractual"
          />
          <TextListElement
            noDivider
            title="Cargador/Expedidor"
            subtitle={serviceAddressName}
          />
          <TextListElement
            noDivider
            title="Código"
            subtitle={custAccount}
          />
          <TextListElement
            noDivider
            informative
            title="Dirección"
            subtitle={serviceAddress}
          />
          <TextListElement
            noDivider
            title="Teléfono"
            subtitle={clientPhone}
          />
          <TextListElement
            noDivider
            title="Email"
            subtitle={clientEmail}
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle={clientVat}
          />
          <TextListElement
            noDivider
            title="Contacto"
            subtitle={clientContactPersonName}
          />
          <TextListElement
            noDivider
            title="Horario"
            subtitle={clientTimeTable}
          />
        </List>
      )}
      {step === 'transportista' && (
        <List>
          <TextListElement
            informative
            title="Transportista"
          />
          <TextListElement
            noDivider
            title="Transportista"
            subtitle={COMPANY.name}
          />
          <TextListElement
            noDivider
            title="Dirección"
            subtitle={COMPANY.address}
          />
          <TextListElement
            noDivider
            title="Accesible"
            subtitle={clientAccesible}
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle={COMPANY.cif}
          />
          <TextListElement
            noDivider
            title="Matrícula"
            subtitle={vehicleId}
          />
          <TextListElement
            noDivider
            title="Conductor"
            subtitle={responsible}
          />
        </List>
      )}
      {step === 'destinatario' && (
        <List>
          <TextListElement
            informative
            title="Destinatario"
          />
          <TextListElement
            noDivider
            title="Destinatario"
            subtitle={COMPANY.name}
          />
          <TextListElement
            noDivider
            title="Dirección"
            subtitle={COMPANY.address}
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle={COMPANY.cif}
          />
          <TextListElement
            noDivider
            title="Teléfono"
            subtitle={COMPANY.phone}
          />
        </List>
      )}
      {step === 'residuos' && (
        <List>
          <Table
            title={'Elemento/Código'}
            size="small"
            noScrolling
            headers={[
              'Cantidad', 
              'Kgs./Lts.'
            ]}
          >
            {selected.data.map( ({
              itemId,
              itemName,
              kgReal,
              unidadesReal,
              done,
              projCategoryId,
              qty,
              servicioRealizado,
              weight
            }, ind) =>{
              const typeEntrega = TIPOS_RECOGIDAS[projCategoryId] === "entrega";
              const typeServicio = TIPOS_RECOGIDAS[projCategoryId] === "servicio";
              let calc = '';
              switch(TIPOS_RECOGIDAS[projCategoryId]){
                case 'recogida':
                  calc = (esIntlFormatter.format(parseFloat((weight || "0").replace(',', '.')) * parseInt( unidadesReal ) * (kgReal/100)));
                  break;
                case 'entrega':
                  calc = (esIntlFormatter.format(parseFloat(qty) * parseInt( unidadesReal )));
                  break;
                case 'servicio':
                  calc = servicioRealizado ? 'REALIZADO' : 'NO REALIZADO';
                  break;
                default:
                  calc = 'N/A';
                  break;
              };
              const qts = (done || typeServicio) ? [
                typeEntrega ? unidadesReal : "",
                calc
              ] : ['-', '-'];
              return(
                <TableElement
                  key={ind}
                  title={itemName}
                  subtitle={itemId}
                  cells={qts}
                />
              )
            })}
          </Table>
        </List>
      )}
      {step === 'observaciones' && (
        <List>
          <TextListElement
            informative
            title="Observaciones"
          />
          {selected.observaciones ?
            selected.observaciones.map( ({ label, on }, ind) =>(
              <FieldListElement
                key={ind}
                field={
                  <Checkbox
                      color="primary"
                      disabled
                      label={label}
                      input={{
                        value: on,
                        onChange:
                          () => {
                          }
                      }}
                    />
                }
              />
            ))
            :
            (
              <TextListElement
                noDivider
                title="No hay observaciones"
              />
            )
          }
        </List>
      )}
      {step === 'firma' && (
        <List>
          <TextListElement
            informative
            title="Firma del cliente"
          />
          <PaddedContainer>
            <BorderedContainer>
              <ImageComponent
                src={selected.signature}
                alt=""
              />
            </BorderedContainer>
          </PaddedContainer>
        </List>
      )}
      <StepNavigator
        moveToNextText={STEPS[step].next}
        moveToNextAction={
          STEPS[step].next === 'Volver a Ruta' ?
            () => history.push('')
            :
            moveToNextStep
          }
        moveToPreviousText={STEPS[step].previous}
        moveToPreviousAction={moveToPreviousStep}
      />
    </div>
  );
};

export default ResumenDia;
