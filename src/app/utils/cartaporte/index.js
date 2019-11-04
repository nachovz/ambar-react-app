import moment from 'moment';
import { getVehicleSession } from 'app/utils/vehicle';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

export const buildCartaporte = (selected) => {
  const { vehicleId } = getVehicleSession();

  selected.data.reduce((result, current) => {
    if (!current.done) return result;

    return [
      ...result,
      {
        "order_id": selected.serviceOrderId,
        "waste_id": current.itemId || "",
        "container_id": current.res_InventPackingMaterialCode || "",
        "vehicle_id": vehicleId,
        "container_quantity": current.unidadesReal || "",
        ...TIPOS_RECOGIDAS[current.projCategoryId] === "recogida" &&
          { "percentage": `${current.kgReal || ""}` },
        "notes": ""
      }
    ];
  }, []);
};

export const addCompletedCartaporte = (serviceOrderId) => {
  const current = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  localStorage.setItem(
    'COMPLETED_CARTAS_DE_PORTE',
    JSON.stringify([
      ...current,
      { id: serviceOrderId, date: moment() }
    ])
  );
};

export const setCompletedCarteporte = (data) => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  completed.forEach(({ id }) => {
    data[id].done = true;
  });
};

export const filterCompletedCartaPorteByDate = () => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  const filtered = completed.filter((item) => !moment().isSame(moment(item.date), 'day'));
  localStorage.removeItem('COMPLETED_CARTAS_DE_PORTE');
  localStorage.setItem('COMPLETED_CARTAS_DE_PORTE', JSON.stringify(filtered));
};
