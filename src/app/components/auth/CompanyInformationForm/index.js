import React, { useEffect, useState } from 'react';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import QRReader from 'app/components/app/QRReader';
import useForm from 'react-hook-form';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useRutasContext } from 'app/contexts/Rutas';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';
import RUTAS from 'app/constants/mock_oct.json';

const CompanyInformationForm = ({ onVerified }) => {
  const [showQr, setShowQr] = useState(false);
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setRutasState] = useRutasContext();
  const { register, handleSubmit, watch, setValue, errors } = useForm({
    defaultValues: { companyId: 'AMB' }
  });

  useEffect(() => {
    setLoadingState(true);
    const getCompany = async() => await client.get(`${ENDPOINTS.COMPANY}`);
    const company = getCompany();
    setLoadingState(false);

  }, [])

  const setQrState = (state) => () => setShowQr(state);

  const onScan = (data) => {
    setValue('vehicleId', data);
  };

  const vehicleId = watch('vehicleId');

  const verifyInformation = async ({ companyId, userId, vehicleId }) => {
    setLoadingState(true);
    try {
      const rutas = RUTAS;//await client.get(`${ENDPOINTS.GET_ROUTE}/${vehicleId}/route`);
      setRutasState({ ...rutas, selected: null });
      setLoadingState(false);
      onVerified();
    } catch (error) {
      setLoadingState(false);
      setSnackbarContext({
        message: 'Hubo un error en el servidor',
        variant: 'error',
        open: true
      });
    }
  }

  return (
    <form>
      <TextField
        type="text"
        disabled
        name="companyId"
        register={register}
        label="Seleccionar ID de Empresa"
        placeholder="Seleccionar ID de Empresa"
        error={errors.companyId}
      />
      <TextField
        type="text"
        name="vehicleId"
        register={register}
        label="Seleccionar ID de Matricula"
        placeholder="Seleccionar ID de Matricula"
        error={errors.vehicleId}
      />
      {showQr && !vehicleId && (
        <React.Fragment>
          <QRReader onScan={onScan} />
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={setQrState(false)}
          >
            Cancelar
          </Button>
        </React.Fragment>
      )}
      {!showQr && !vehicleId && (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={setQrState(true)}
        >
          Escanear QR
        </Button>
      )}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSubmit(verifyInformation)}
      >
        Continue
      </Button>
    </form>
  );
};

export default CompanyInformationForm;
