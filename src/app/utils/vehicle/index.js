import moment from 'moment';

export const setVehicleSession = (vehicleId, date) => {
  localStorage.setItem('VEHICLE_ID', vehicleId);
  localStorage.setItem('VEHICLE_STORAGE_DATE', date);
};

export const getVehicleSession = () => ({
  vehicleId: localStorage.getItem('VEHICLE_ID'),
  date: localStorage.getItem('VEHICLE_STORAGE_DATE')
});

export const deleteVehicleSession = () => {
  if (localStorage.getItem('VEHICLE_ID')) {
    localStorage.removeItem('VEHICLE_ID');
  }
  if (localStorage.getItem('VEHICLE_STORAGE_DATE')) {
    localStorage.removeItem('VEHICLE_STORAGE_DATE');
  }
};

export const isVehicleIdExpired = () => {
  const { date } = getVehicleSession();
  return !moment().isSame(moment(date), 'day');
}
