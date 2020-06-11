import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TextField from 'app/components/form/TextField';
import Button from 'app/components/ui/Button';
import QRReader from 'app/components/app/QRReader';
import useForm from 'react-hook-form';
import SelectField from 'app/components/form/SelectField';
import { useLoadingContext } from 'app/contexts/Loading';
import { useSnackbarContext } from 'app/contexts/Snackbar';
import { useRutasContext } from 'app/contexts/Rutas';
import { setVehicleSession } from 'app/utils/vehicle';
import { setCompanySession } from 'app/utils/company';
import { filterCompletedCartaPorteByDate } from 'app/utils/cartaporte';
import { getCompanySession } from 'app/utils/company';
import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

const CompanyInformationForm = ({ onVerified, history }) => {
  const [showQr, setShowQr] = useState(false);
  const [companies , setCompanies] = useState([]);
  const [, setLoadingState] = useLoadingContext();
  const [, setSnackbarContext] = useSnackbarContext();
  const [, setRutasState] = useRutasContext();
  const { register, handleSubmit, watch, setValue, errors } = useForm({
    defaultValues: { companyId: getCompanySession().companyId }
  });

  useEffect(() => {
    filterCompletedCartaPorteByDate();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoadingState(true);
      try {
        const companies = await client.get(`${ENDPOINTS.COMPANY}`);
        setCompanies(companies.data);
        setLoadingState(false);
      } catch (error) {
        setLoadingState(false);
        setSnackbarContext({
          message: error.message,
          variant: 'error',
          open: true,
          ...error.response.status === 401 && {
          forever: true,
          action: [(
            <React.Fragment key="extra">
              <Button color="secondary" variant="contained" size="small" onClick={() => window.location.replace("/")}>
                Iniciar sesión
              </Button>  
            </React.Fragment>
          )]
        }
        });
      }
    }
    fetchData();
  }, [setLoadingState,setSnackbarContext]);

  const setQrState = (state) => () => setShowQr(state);

  const onScan = (data) => {
    setValue('vehicleId', data);
  };

  const vehicleId = watch('vehicleId');
  const companyId = watch('companyId');

  const verifyInformation = async ({ companyId, vehicleId }) => {
    setLoadingState(true);
    try {
      const rutas = await client.get(`${ENDPOINTS.GET_ROUTE(companyId)}/${vehicleId}/route`);
      const containers = await client.get(ENDPOINTS.GET_CONTAINERS_BY_COMPANY(companyId));
      const wastes = await client.get(ENDPOINTS.GET_WASTES_BY_COMPANY(companyId));
      const notes = await client.get(ENDPOINTS.GET_NOTES);
      setRutasState({ ...rutas, selected: null });
      setCompanySession(companyId, wastes, containers, notes);
      setVehicleSession(vehicleId, moment());
      setLoadingState(false);
      onVerified();
    } catch (error) {
      setLoadingState(false);
      setSnackbarContext({
        message: error.message,
        variant: 'error',
        open: true,
        ...error.response.status === 401 && {
          forever: true,
          action: [(
            <React.Fragment key="extra">
              <Button color="secondary" variant="contained" size="small" onClick={() => window.location.replace("/")}>
                Iniciar sesión
              </Button>  
            </React.Fragment>
          )]
        }
      });
    }
  }
  return (
    <form>
      <SelectField
        ref={register({ name: 'companyId'})}
        value={companyId}
        options={companies.map((comp) => ({ label: comp.name, value: comp.id }))}
        onChange={({ target: { value } }) => setValue('companyId', value)}
        helperText="Seleccionar empresa"
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
