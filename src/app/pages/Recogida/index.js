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
import ServicioForm from 'app/components/recogida/ServicioForm';
import ConsignaForm from 'app/components/recogida/ConsignaForm';
import NotesModal from 'app/components/form/NotesModal';
import { findRecogidaType } from 'app/constants/values';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';

const Recogida = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [kgValue, setKgValue] = React.useState(100);
  const { 
    register, 
    handleSubmit, 
    setValue, 
    errors, 
    getValues, 
    watch 
  } = useForm();
  let { notes } = getCompanySession();
  const { selected } = rutas;
  const [obs, setObs] = React.useState(
    (selected && selected.selectedRecogida && selected.selectedRecogida.observaciones) 
    || 
    formatCompanyNotes(notes, 0)
  );
  const [modal, setModal] = React.useState(false);
  
  React.useEffect( () => {
    if(!!selected){
      const { selectedRecogida } = selected;
      if(!!selectedRecogida){
        const {
          kgreal,
          unidadesreal
        } = selectedRecogida;
        if(!!kgreal){
          setKgValue(kgreal);
        }
        unidadesreal && setValue("unidadesreal", unidadesreal); 
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

  const handleSave = ({ unidadesreal, observaciones="", ...props }) => {
    selectedRecogida.unidadesreal = unidadesreal;
    selectedRecogida.kgreal = kgValue;
    selectedRecogida.observaciones = obs;
    if(selectedRecogida.done){
      selectedRecogida.done = (props.servicioRealizado || (!!unidadesreal && unidadesreal !== '0'));
    }else{
      selectedRecogida.done =  ( (!!unidadesreal && unidadesreal !== '0') || !!props.servicioRealizado);
    }
    selected.data[selected.data.findIndex(
      (ele) => ele.itemid === selectedRecogida.itemid
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

  const handleCloseModal = (newObs) => () => {
    setObs(newObs);
    setModal(false);
  }
  
  const propsToForm = {
    selectedRecogida:selectedRecogida,
    register:register,
    handleMultiChange:handleMultiChange,
    kgValue:kgValue,
    errors:errors,
    setValue:setValue,
    getValues:getValues,
    watch: watch
  }
  const renderForm = () => {
    switch(findRecogidaType(selectedRecogida.projcategoryid)){
      case "recogida":
        return <RecogidaForm {...propsToForm}/>;
      case "entrega":
        return <RecogidaForm {...propsToForm}/>;
      case "servicio":
        return <ServicioForm {...propsToForm}/>;
      case "consigna":
        return <ConsignaForm selectedRecogida={selectedRecogida}/>;
			case "devconsig":
        return <ConsignaForm selectedRecogida={selectedRecogida}/>;
      default:
        break;
    }
  };
  return(
    <React.Fragment>
      <TopBar
        title="RECOGIDA"
        actionIcon={(!selectedRecogida.imagenes || selectedRecogida.imagenes.length < 1) && "camara"}
        action={() => setOpenCamera(true)}
        secondaryActionIcon="observaciones"
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.servicedatetime}`} />
      <List>
        <TextListElement
          noDivider
          iconColor="primary"
          icon={findRecogidaType(selectedRecogida.projcategoryid)}
          title={selectedRecogida.itemname}
          subtitle={selectedRecogida.itemid}
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
        moveToNextText={findRecogidaType(selectedRecogida.projcategoryid) !== "consigna" && "Confirmación"}
        moveToNextAction={handleSubmit(handleSave)}
      />
    </React.Fragment>
  );
}

export default withRouter(Recogida);
