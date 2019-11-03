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
import SelectField from 'app/components/form/SelectField';
import { PESO_OPTIONS, TIPOS_RECOGIDAS } from 'app/constants/values';

const Recogida = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [kgValue, setKgValue] = React.useState(100);
  const { register, handleSubmit, setValue, errors } = useForm();

  React.useEffect(() => {
    register({ name: "kgReal" });
  }, [register])

  React.useEffect( () => {
    const { selected } = rutas;
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
          setValue("kgReal", kgReal);
        }
        unidadesReal && setValue("unidadesReal", unidadesReal);
        observaciones && setValue("observaciones", observaciones);
      }
    }
  }, [rutas, setValue]);

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

  const handleSave = ({ unidadesReal, kgReal, observaciones="" }) => {
    selectedRecogida.unidadesReal = unidadesReal;
    selectedRecogida.kgReal = kgReal;
    selectedRecogida.observaciones = observaciones;
    selectedRecogida.done = true;
    selected.data[selected.data.findIndex(
      (ele) => ele.itemId === selectedRecogida.itemId
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
      <TopBar
        title="RECOGIDA"
        actionIcon="camara"
        action={() => setOpenCamera(true)}
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
        <TextListElement
          noDivider
          iconColor="primary"
          icon="envase"
          title={selectedRecogida.packingMaterialName}
          subtitle={selectedRecogida.res_InventPackingMaterialCode}
          quantities={[selectedRecogida.res_Qty_Env]}
        />
        <BoxedInput
          topLabel="Und"
          topValue={selectedRecogida.res_Qty_Env}
          bottomLabel="REAL"
          icon="unidades"
          input={
            <TextField
              register={register}
              name="unidadesReal"
              type="number"
              placeholder="-"
              error={errors.unidadesReal}
            />
          }
        />
        <BoxedInput
          topLabel={selectedRecogida.unit}
          topValue={selectedRecogida.qty}
          bottomLabel="REAL"
          icon="peso"
          input={
            <SelectField
              name="kgReal"
              value={kgValue}
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
              register={register}
              required={false}
              fullWidth
              multiline
              placeholder="Aquí las observaciones"
            />
          }
        />
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
      <Modal
        open={openCamera}
        onClose={handleCloseCamera}
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
