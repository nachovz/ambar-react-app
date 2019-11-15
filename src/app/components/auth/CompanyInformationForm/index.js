import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import QRReader from 'app/components/app/QRReader';
import useForm from 'react-hook-form';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useRutasContext } from 'app/contexts/Rutas';
import { setVehicleSession } from 'app/utils/vehicle';
import { setCompanySession } from 'app/utils/company';
import { filterCompletedCartaPorteByDate } from 'app/utils/cartaporte';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

const CompanyInformationForm = ({ onVerified }) => {
  const [showQr, setShowQr] = useState(false);
  const [, setCompanies] = useState();
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setRutasState] = useRutasContext();
  const { register, handleSubmit, watch, setValue, errors } = useForm({
    defaultValues: { companyId: 'AMB' }
  });

  useEffect(() => {
    filterCompletedCartaPorteByDate();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoadingState(true);
      const companies = await client.get(`${ENDPOINTS.COMPANY}`);
      setCompanies(companies);
      setLoadingState(false);
    }
    fetchData();
  }, [setLoadingState]);

  const setQrState = (state) => () => setShowQr(state);

  const onScan = (data) => {
    setValue('vehicleId', data);
  };

  const vehicleId = watch('vehicleId');

  const verifyInformation = async ({ companyId, vehicleId }) => {
    setLoadingState(true);
    try {
      const rutas = await client.get(`${ENDPOINTS.GET_ROUTE}/${vehicleId}/route`);
      const containers = await client.get(ENDPOINTS.GET_CONTAINERS_BY_COMPANY);
      const wastes = await client.get(ENDPOINTS.GET_WASTES_BY_COMPANY);
      const notes = await client.get(ENDPOINTS.GET_NOTES);
      setRutasState({ ...rutas, selected: null });
      setCompanySession(companyId, wastes, containers, notes);
      setVehicleSession(vehicleId, moment());
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
