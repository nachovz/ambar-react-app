import React, { useState } from 'react';
import { useRutasContext } from 'app/contexts/Rutas';
import StepNavigator from 'app/components/app/StepNavigator';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import ImageComponent from 'app/components/ui/ImageComponent';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import Checkbox from 'app/components/form/Checkbox';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import { getVehicleSession } from 'app/utils/vehicle';
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
    next: 'gestor'
  },
  gestor: {
    previous: 'transportista',
    next: 'residuos'
  },
  residuos: {
    previous: 'gestor',
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
            title="Cargador"
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
            title="Gestor"
            actionIcon="arrow_right"
            actionIconSize="small"
            onClick={moveToStep('gestor')}
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
            title="Matricula Vehiculo"
            subtitle={vehicleId}
          />
        </List>
      )}
      {step === 'cargador' && (
        <List>
          <TextListElement
            informative
            title="Cargador Contractual"
          />
          <TextListElement
            noDivider
            title="Cargador"
            subtitle={serviceAddressName}
          />
          <TextListElement
            noDivider
            title="Codigo"
            subtitle={custAccount}
          />
          <TextListElement
            noDivider
            informative
            title="Direccion"
            subtitle={serviceAddress}
          />
          <TextListElement
            noDivider
            title="Telefono"
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
            title="Direccion"
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
            title="Matricula"
            subtitle={vehicleId}
          />
          <TextListElement
            noDivider
            title="Conductor"
            subtitle={responsible}
          />
        </List>
      )}
      {step === 'gestor' && (
        <List>
          <TextListElement
            informative
            title="Gestor"
          />
          <TextListElement
            noDivider
            title="Gestor"
            subtitle={COMPANY.name}
          />
          <TextListElement
            noDivider
            title="Direccion"
            subtitle={COMPANY.address}
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle={COMPANY.cif}
          />
          <TextListElement
            noDivider
            title="Telefono"
            subtitle={COMPANY.phone}
          />
        </List>
      )}
      {step === 'residuos' && (
        <List>
          <TextListElement
            informative
            title="Residuos recogidos"
          />
          <DataListElement
            noIcon
            informative
            title="Nombre"
            quantities={['Und', '%']}
          />
          {selected.data.map( ({
            itemId,
            itemName,
            kgReal,
            unidadesReal,
            done
          }, ind) =>{
            return(
              <DataListElement
                key={ind}
                title={itemName}
                subtitle={itemId}
                quantities={done ? [
                  (!!unidadesReal ? unidadesReal : '-'),
                  (!!kgReal ? `${kgReal}%` : '-')
                ] : ['-','-']}
                disabled={!done}
              />
            )
          })}
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
