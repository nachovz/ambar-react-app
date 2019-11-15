import moment from 'moment';
import { getVehicleSession } from 'app/utils/vehicle';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

export const buildCartaporte = (selected, signature) => {
  const { vehicleId } = getVehicleSession();

  const items = selected.data.reduce((result, current) => {
    if (!current.done) return result;

    return [
      ...result,
      {
        "waste_id": current.itemId || "",
        "type": TIPOS_RECOGIDAS[current.projCategoryId],
        "container_id": current.res_InventPackingMaterialCode || "",
        "container_quantity": current.unidadesReal || "",
        ...TIPOS_RECOGIDAS[current.projCategoryId] === "recogida" &&
          { "percentage": `${current.kgReal || ""}` },
        images: (current.imagenes || []).map(({ dataUri }) => dataUri),
        notes: (current.observaciones || []).map(({ label }) => label),
        manual: !!current.manual
      }
    ];
  }, []);

  return {
    data: {
      "order_id": selected.serviceOrderId,
      "vehicle_id": vehicleId,
      notes: (selected.observaciones || []).map(({ label }) => label),
      signature,
      items
    }
  };
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
  const filtered = completed.filter((item) => moment().isSame(moment(item.date), 'day'));
  localStorage.removeItem('COMPLETED_CARTAS_DE_PORTE');
  localStorage.setItem('COMPLETED_CARTAS_DE_PORTE', JSON.stringify(filtered));
};
