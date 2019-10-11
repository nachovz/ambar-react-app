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
    next: 'firma'
  },
  firma: {
    previous: 'residuos'
  },
}

const ResumenDia = ({ history }) => {
  const [step, setStep] = useState('resumen');
  const [rutas, setRutasState] = useRutasContext();

  const moveToStep = (step) => () => setStep(step);
  const moveToNextStep = () => setStep(STEPS[step].next);
  const moveToPreviousStep = () => setStep(STEPS[step].previous);

  const { selected } = rutas;

  if(!selected){
    history.push('/');
    return null;
  }

  console.log(selected)

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
          <DataListElement
            noIcon
            informative
            title="Residuos Recogidos"
            quantities={['Ud.', 'Kg.']}
          />
          {selected.recogidas.map( (rec, ind) =>{
            const {
            id,
            desc,
            kgReal,
            unidadesReal,
            manual
          } = rec;
            return(
              <DataListElement
                key={ind}
                icon={rec.done ? "toggle-on" : "toggle-off"}
                title={desc}
                subtitle={id}
                quantities={rec.done ? [unidadesReal, `-${kgReal}`] : ['-','-']}
              />
            )
          })}
        </List>
      )}
      {step === 'firma' && (
        <List>
          <TextListElement
            informative
            title="Firma Client"
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
        moveToNextAction={moveToNextStep}
        moveToPreviousText={STEPS[step].previous}
        moveToPreviousAction={moveToPreviousStep}
      />
    </div>
  );
};

export default ResumenDia;
