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
import AlertDialog from 'app/components/ui/AlertDialog';
import Autocomplete from 'app/components/form/Autocomplete';
import NotesModal from 'app/components/form/NotesModal';
import { PrimaryCenteredText } from 'app/components/ui/PrimaryCenteredText';
import { getCompanySession, formatCompanyNotes } from 'app/utils/company';
import { PESO_OPTIONS } from 'app/constants/values';
import { esIntlFormatter } from 'app/utils/esIntlFormatter';

const RecogidaAdd = ({ history }) => {
  const [rutas, setRutasState] = useRutasContext();
  const [waste, setWaste] = React.useState();
  const [container, setContainer] = React.useState();
  const [kgValue, setKgValue] = React.useState({
    label: "100% del peso",
    value: 100
  });
  const [images, setImages] = React.useState([]);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm();
  const { wastes, containers, notes } = getCompanySession();
  const [obs, setObs] = React.useState(formatCompanyNotes(notes, 1));
  const [modal, setModal] = React.useState(false);

  const moveBack = () => history.goBack();
  const moveNext = () => history.push('cartaporte');
  const { selected } = rutas;

  React.useEffect(() => {
    register({ name: "waste" });
    register({ name: "container" });
    register({ name: "kgReal" });
  }, [register]);

  React.useEffect(() => {
    if (!!selected) {
      setValue("kgReal", kgValue);
    }
  }, [selected, setValue, kgValue]);

  if (!selected) {
    history.push('/');
    return null;
  }


  const handleCloseCamera = () => setOpenCamera(false);

  const onTakePhoto = (dataUri) => {
    setImages(
      (images || [])
        .concat([{
          dataUri,
          title: Date.now().toString()
        }])
    );
    handleCloseCamera();
  };

  const removeImage = (index) => () => {
    setImages(images.filter((a, ind) => index !== ind));
  }

  const handleChange = (type) => (value) => {
    switch (type) {
      case 'WASTE':
        setWaste(value);
        setValue("waste", value);
        break;
      case 'CONTAINER':
        setContainer(value);
        setValue("container", value);
        break;
      case 'WEIGHT':
        setKgValue(value);
        setValue("kgReal", value);
        break;
      default: break;
    }
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSave = ({
    waste,
    container,
    kgReal,
    unidadesReal
  }) => {
    selected.data.push({
      done: true,
      ...waste && {
        ItemName: waste.label,
        ItemId: waste.id,
      },
      PackingMaterialName: container.description,
      Res_InventPackingMaterialCode: container.id,
      kgReal: kgReal.value,
      unidadesReal,
      observaciones: obs,
      images,
      ProjCategoryId: "Res_Peligr",
      manual: true
    });
    setRutasState({
      ...rutas,
      selected: {
        ...selected
      }
    });
    moveNext();
  };

  const handleCloseModal = () => setModal(false);

  return (
    <React.Fragment>
      <TopBar
        title={`Carta de porte: ${selected.ServiceOrderId}`}
        actionIcon={!!waste && !!container && "camara"}
        action={() => setOpenCamera(true)}
        secondaryActionIcon="observaciones"
        secondaryAction={() => setModal(true)}
      />
      <DateBar title={`FECHA RECOGIDA: ${selected.serviceDateTime}`} />
      <List>
        <TextListElement
          informative
          title="Añadir recogida manual"
        />
        {!!waste ?
          <TextListElement
            noDivider
            informative
            iconColor="primary"
            icon="mantenimiento"
            title={waste.description}
            subtitle={waste.lerDesc}
            subtitle2={waste.id}
            actionIcon="papelera"
            action={() => setWaste(undefined)}
          />
          :
          <FieldListElement
            icon="empty"
            title="Residuo"
            field={
              <Autocomplete
                value={waste}
                onChange={handleChange("WASTE")}
                fakeAsync
                suggestions={wastes.data.map((wa) => (
                  {
                    label: wa.description,
                    ...wa
                  }
                ))}
              />
            }
          />
        }
        {!!container ?
          <BoxedInput
            topLabel={
              <React.Fragment>
                <strong>{container.Weight || 'NULL'}</strong> Kgs./Lts.*
                <br/>
                por <strong>(1)</strong> unidad
              </React.Fragment>
            }
            icon="envase"
            iconColor="primary"
            input={
              <TextListElement
                disableGutters
                noDivider
                noIcon
                title={container.description}
                subtitle={container.id}
                actionIcon="papelera"
                action={() => setContainer(undefined)}
              />
            }
          />
          :
          <FieldListElement
            icon="empty"
            title="Envase"
            field={
              <Autocomplete
                value={container}
                onChange={handleChange("CONTAINER")}
                suggestions={containers.data.map((co) => (
                  {
                    label: co.description,
                    ...co
                  }
                ))}
              />
            }
          />
        }
        {!!waste && !!container &&
          <React.Fragment>
            <BoxedInput
              topLabel="Und"
              icon="unidades"
              input={
                <TextField
                  register={register}
                  noMargin
                  name="unidadesReal"
                  type="number"
                  placeholder="CANTIDAD"
                  error={errors.unidadesReal}
                />
              }
            />
            <BoxedInput
              topLabel="% de llenado"
              icon="peso"
              input={
                <Autocomplete
                  value={kgValue}
                  onChange={handleChange("WEIGHT")}
                  suggestions={PESO_OPTIONS}
                  placeholder={"100% del peso"}
                />
              }
            />
            {!!images && images.length > 0 && (
              <React.Fragment>
                <FieldListElement title="Imágenes" />
                {images.map((im, ind) => (
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
          </React.Fragment>
        }
        {getValues().unidadesReal &&
          <PrimaryCenteredText>
            La <strong>MEDIDA TOTAL</strong> sería de: <strong>{esIntlFormatter.format(parseFloat((container.Weight || "0").replace(',', '.')) * parseInt( getValues().unidadesReal) * (kgValue/100))}</strong> Kgs./Lts.*
          </PrimaryCenteredText>
        }
      </List>
      <Modal
        open={openCamera}
        onClose={handleCloseCamera}
      >
        <Camera
          onTakePhoto={onTakePhoto}
        />
      </Modal>
      <AlertDialog
        open={openAlert}
        title="Desea guardar la Recogida Manual?"
        handleClose={handleCloseAlert}
        agreedText="Si, guardar"
        handleAgree={handleSubmit(handleSave)}
        cancelText="No, seguir editando"
      />
      <NotesModal
        modal={modal}
        handleCloseModal={handleCloseModal}
        title="Observaciones"
        obs={obs}
        setObs={setObs}
      />
      <StepNavigator
          moveToPreviousText="Atrás"
          moveToPreviousAction={moveBack}
          moveToNextText="Agregar"
          moveToNextAction={() => setOpenAlert(true)}
        />
    </React.Fragment>
  );
}

export default withRouter(RecogidaAdd);
