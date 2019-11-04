import moment from 'moment';

export const setVehicleSession = (vehicleId, date) => {
  sessionStorage.setItem('VEHICLE_ID', vehicleId);
  sessionStorage.setItem('VEHICLE_STORAGE_DATE', date);
};

export const getVehicleSession = () => ({
  vehicleId: sessionStorage.getItem('VEHICLE_ID'),
  date: sessionStorage.getItem('VEHICLE_STORAGE_DATE')
});

export const deleteVehicleSession = () => {
  if (sessionStorage.getItem('VEHICLE_ID')) {
    sessionStorage.removeItem('VEHICLE_ID');
  }
  if (sessionStorage.getItem('VEHICLE_STORAGE_DATE')) {
    sessionStorage.removeItem('VEHICLE_STORAGE_DATE');
  }
};

export const isVehicleIdExpired = () => {
  const { date } = getVehicleSession();
  return !moment().isSame(moment(date), 'day');
}
