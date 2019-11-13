import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import useForm from 'react-hook-form';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import StepNavigator from 'app/components/app/StepNavigator';
import Camera from 'app/components/app/Camera';
import Modal from 'app/components/containers/Modal';
import RecogidaForm from 'app/components/recogida/RecogidaForm';
import EntregaForm from 'app/components/recogida/EntregaForm';
import ServicioForm from 'app/components/recogida/ServicioForm';
import NotesModal from 'app/components/form/NotesModal';
import { TIPOS_RECOGIDAS } from 'app/constants/values';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';

const Recogida = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [kgValue, setKgValue] = React.useState(100);
  const { register, handleSubmit, setValue, errors, getValues } = useForm();
  let { notes } = getCompanySession();
  const [obs, setObs] = React.useState(formatCompanyNotes(notes, 0));
  const [modal, setModal] = React.useState(false);
  const { selected } = rutas;
  
  React.useEffect( () => {
    if(!!selected){
      const { selectedRecogida } = selected;
      if(!!selectedRecogida){
        const {
          kgReal,
          unidadesReal,
          observaciones
        } = selectedRecogida;
        if(!!kgReal){
          setKgValue(kgReal);
        }
        unidadesReal && setValue("unidadesReal", unidadesReal);
        observaciones && setObs(observaciones);
        
      }
    }
  }, [selected, setValue]);
  
  if(!selected){
    history.push('/');
    return null;
  }

  const { selectedRecogida } = selected;
  if(!selectedRecogida){
    history.push('/cartaporte');
    return null;
  }
  console.log(selectedRecogida);
  const moveBack = () => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:null
      }
    });
  }

  const handleCloseCamera = () => setOpenCamera(false);

  const onTakePhoto = (dataUri) => {
    const imagenes = (selectedRecogida.imagenes || []).concat([{
            dataUri,
            title: Date.now().toString()
          }]);
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:{
          ...selectedRecogida,
          imagenes
        }
      }
    });
    handleCloseCamera();
  };

  const removeImage = (index) => () => {
    const imagenes = selectedRecogida.imagenes.filter(
      (a,ind) => index !== ind
    );
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:{
          ...selectedRecogida,
          imagenes
        }
      }
    });
  }

  const handleSave = ({ unidadesReal, observaciones="", ...props }) => {
    selectedRecogida.unidadesReal = unidadesReal;
    selectedRecogida.kgReal = kgValue;
    selectedRecogida.observaciones = obs;//obs.reduce((tot, ob) => tot+(ob.on ? ', '+ob.label : ''));
    if(selectedRecogida.done){
      selectedRecogida.done = (!props.servicioRealizado && unidadesReal === '0') && false;
    }else{
      selectedRecogida.done =  (unidadesReal !== '0' && !!unidadesReal && true);
    }
    selected.data[selected.data.findIndex(
      (ele) => ele.itemId === selectedRecogida.itemId
    )] = {
      ...selectedRecogida,
      ...props
    };
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:null
      }
    });
  };

  const handleMultiChange = ({ target: { value } }) => {
    setKgValue(value);
  }

  const handleCloseModal = () => setModal(false);
  

  const propsToForm = {
    selectedRecogida:selectedRecogida,
    register:register,
    handleMultiChange:handleMultiChange,
    kgValue:kgValue,
    errors:errors,
    setValue:setValue,
    getValues:getValues
  }
  const renderForm = () => {
    switch(TIPOS_RECOGIDAS[selectedRecogida.projCategoryId]){
      case "recogida":
        return <RecogidaForm {...propsToForm}/>;
      case "entrega":
        return <EntregaForm {...propsToForm}/>;
      case "servicio":
        return <ServicioForm {...propsToForm}/>;
      default:
        break;
    }
  };
  return(
    <React.Fragment>
      <TopBar
        title="RECOGIDA"
        actionIcon="camara"
        action={() => setOpenCamera(true)}
        secondaryActionIcon="observaciones"
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <List>
        <TextListElement
          noDivider
          iconColor="primary"
          icon={TIPOS_RECOGIDAS[selectedRecogida.projCategoryId]}
          title={selectedRecogida.itemName}
          subtitle={selectedRecogida.itemId}
        />
        {renderForm()}
        {!!selectedRecogida.imagenes && selectedRecogida.imagenes.length > 0 && (
          <React.Fragment>
            <FieldListElement title="Imágenes" />
            {selectedRecogida.imagenes.map( (im,ind) =>(
              <TextListElement
                key={ind}
                noDivider
                icon={{
                  src: im.dataUri,
                  alt: im.title
                }}
                title={im.title}
                actionIcon="papelera"
                action={removeImage(ind)}
              />
            ))}
          </React.Fragment>
        )}
        <TextListElement
          noDivider
          informative
          noIcon
          subtitle="*La medida Kgs (kilogramos) es aplicada a los residuos sólidos, la medida Lts (litros) es aplicada a los residuos líquidos)"
        />
      </List>
      <NotesModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        title="Observaciones"
        obs={obs}
        setObs={setObs}
      />
      <Modal
        open={openCamera}
        handleCloseModal={handleCloseCamera}
      >
        <Camera
          onTakePhoto={onTakePhoto}
        />
      </Modal>
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Confirmación"
        moveToNextAction={handleSubmit(handleSave)}
      />
    </React.Fragment>
  );
}

export default withRouter(Recogida);
