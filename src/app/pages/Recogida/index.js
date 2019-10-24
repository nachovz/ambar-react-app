import React from 'react';
import { withRouter } from "react-router";
import { useRutasContext } from 'app/contexts/Rutas';
import useForm from 'react-hook-form';
import List from 'app/components/ui/List';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import FieldListElement from 'app/components/ui/ListElement/FieldListElement';
import DateBar from 'app/components/ui/DateBar';
import TopBar from 'app/components/ui/TopBar';
import TextField from 'app/components/form/TextField';
import BoxedInput from 'app/components/form/BoxedInput';
import StepNavigator from 'app/components/app/StepNavigator';
import Camera from 'app/components/app/Camera';
import Modal from 'app/components/containers/Modal';
import Icon from 'app/components/ui/Icon';
import AlertDialog from 'app/components/ui/AlertDialog';
import SelectField from 'app/components/form/SelectField';
import { CloseContainer } from './elements';
import { PESO_OPTIONS } from 'app/constants/values';

const Recogida = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [kgValue, setKgValue] = React.useState(100);
  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    register({ name: "kgReal" });
  }, [register])

  React.useEffect( () => {
    if(!!selected && !!selectedRecogida && !!selectedRecogida.kgReal){
      setKgValue(selectedRecogida.kgReal)
    }
  }, []);

  const { selected } = rutas;
  if(!selected){
    history.push('/');
    return null;
  }

  const { selectedRecogida } = selected;
  if(!selectedRecogida){
    history.push('/cartaporte');
    return null;
  }
  console.log(rutas);

  const { envase } = selectedRecogida;

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

  const handleClickOpenAlert = ({ unidadesReal, kgReal, observaciones="" }) => {
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:{
          ...selectedRecogida,
          unidadesReal,
          kgReal,
          observaciones
        }
      }
    });
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const onTakePhoto = (dataUri) => {
    const imagenes = selectedRecogida.imagenes.concat([{
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

  const handleSave = () => {
    selectedRecogida.done = true;
    selected.recogidas[selected.recogidas.findIndex(
      (ele) => ele.id === selectedRecogida.id
    )] = selectedRecogida;
    setRutasState({
      ...rutas,
      selected:{
        ...selected,
        selectedRecogida:null
      }
    });
  };

  const handleMultiChange = ({ target: { value } }) => {
    setValue("kgReal", value);
    setKgValue(value);
  }

  return(
    <React.Fragment>
      <List>
        <TopBar
          title="RECOGIDA"
          actionIcon="camara"
          action={() => setOpenCamera(true)}
        />
        <DateBar title="FECHA RECOGIDA: 29 Agosto 2019" />
        <TextListElement
          noDivider
          iconColor="primary"
          icon="mantenimiento"
          title={selectedRecogida.id}
          subtitle={selectedRecogida.desc}
        />
        <TextListElement
          noDivider
          iconColor="primary"
          icon="envase"
          title={envase.id}
          subtitle={envase.desc}
          quantities={[envase.numero]}
        />
        <BoxedInput
          topLabel="Und."
          topValue={selectedRecogida.unidades}
          bottomLabel="UND. REAL"
          icon="unidades"
          input={
            <TextField
              register={register}
              defaultValue={selectedRecogida.unidadesReal}
              name="unidadesReal"
              type="number"
              placeholder="22"
            />
          }
        />
        <BoxedInput
          topLabel="Kg"
          topValue={selectedRecogida.kg}
          bottomLabel="KG. REAL"
          icon="peso"
          input={
            <SelectField
              name="kgReal"
              value={kgValue}
              defaultValue={selectedRecogida.kgReal}
              options={PESO_OPTIONS}
              onChange={handleMultiChange}
              helperText="Seleccionar %"
            />
          }
        />
        <FieldListElement
          title="Observaciones"
          field={
            <TextField
              name="observaciones"
              register={register({ required: false })}
              fullWidth
              multiline
              placeholder="Aquí las observaciones"
            />
          }
        />
        {selectedRecogida.imagenes.length > 0 && (
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
        <div style={{height: '100px'}} />
      </List>
      <Modal
        open={openCamera}
        onClose={handleCloseCamera}
      >
        <div>
          <CloseContainer>
            <Icon icon="cerrar" onClick={handleCloseCamera} />
          </CloseContainer>
          <Camera
            onTakePhoto={onTakePhoto}
            isFullscreen={true}
          />
        </div>
      </Modal>
      <AlertDialog
        open={openAlert}
        title="Desea guardar la línea?"
        handleClose={handleCloseAlert}
        agreedText="Si, guardar"
        handleAgree={handleSave}
        cancelText="No, seguir editando"
      />
      <StepNavigator
        moveToPreviousText="Atrás"
        moveToPreviousAction={moveBack}
        moveToNextText="Confirmación"
        moveToNextAction={handleSubmit(handleClickOpenAlert)}
      />
    </React.Fragment>
  );
}

export default withRouter(Recogida);
