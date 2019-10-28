import React, { useState } from 'react';
import { useRutasContext } from 'app/contexts/Rutas';
import StepNavigator from 'app/components/app/StepNavigator';
import TopBar from 'app/components/ui/TopBar';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import DataListElement from 'app/components/ui/ListElement/DataListElement';
import BorderedContainer from 'app/components/ui/BorderedContainer';
import ImageComponent from 'app/components/ui/ImageComponent';
import PaddedContainer from 'app/components/ui/PaddedContainer';
import Checkbox from 'app/components/form/Checkbox';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';

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
  const [rutas] = useRutasContext();

  const moveToStep = (step) => () => setStep(step);
  const moveToNextStep = () => setStep(STEPS[step].next);
  const moveToPreviousStep = () => setStep(STEPS[step].previous);

  const { selected } = rutas;

  if(!selected){
    history.push('/');
    return null;
  }

  return (
    <div>
      <TopBar title="CARTA DE PORTE Nº12335453_amb" />
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
            title="Nombre Conductor"
            subtitle="Juan Martinez Gonzales"
          />
          <TextListElement
            noDivider
            title="DNI"
            subtitle="0900000H"
          />
          <TextListElement
            noDivider
            title="Matricula Vehiculo"
            subtitle="0ADE000"
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
            subtitle="Vehiculos Paz S.L"
          />
          <TextListElement
            noDivider
            title="Codigo"
            subtitle="090000"
          />
          <TextListElement
            noDivider
            title="Direccion"
            subtitle="CLLJ: de la Forja, s/n 28850 Torrejon Madrid"
          />
          <TextListElement
            noDivider
            title="Telefono"
            subtitle="91623993"
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle="8908234"
          />
          <TextListElement
            noDivider
            title="Contacto"
            subtitle="Enrrique B"
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
            subtitle="Ambar Plus, S.L."
          />
          <TextListElement
            noDivider
            title="Direccion"
            subtitle="CLLJ: de la Forja, s/n 28850 Torrejon Madrid"
          />
          <TextListElement
            noDivider
            title="Accesible"
            subtitle="Camion"
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle="8908234"
          />
          <TextListElement
            noDivider
            title="Matricula"
            subtitle="0ADE000"
          />
          <TextListElement
            noDivider
            title="Conductor"
            subtitle="nº P16"
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
            subtitle="Ambar Plus, S.L."
          />
          <TextListElement
            noDivider
            title="Direccion"
            subtitle="CLLJ: de la Forja, s/n 28850 Torrejon Madrid"
          />
          <TextListElement
            noDivider
            title="CIF"
            subtitle="8908234"
          />
          <TextListElement
            noDivider
            title="Telefono"
            subtitle="91623993"
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
                quantities={done ? [unidadesReal, `${kgReal}%`] : ['-','-']}
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
          {selected.observaciones && selected.observaciones.map( ({ label, on }, ind) =>(
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
          ))}
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
