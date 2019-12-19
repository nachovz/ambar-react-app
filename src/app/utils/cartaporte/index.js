import moment from 'moment';
import { getVehicleSession } from 'app/utils/vehicle';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

export const buildCartaporte = ({ 
    latitude_start,
    longitude_start,
    latitude_end,
    longitude_end,
    client_name,
    client_dni, 
    signature,
    data,
    serviceOrderId,
    observaciones
  }) => {
  const { vehicleId } = getVehicleSession();

  const items = data.reduce((result, current) => {
    const typeServicio = TIPOS_RECOGIDAS[current.projCategoryId] === "servicio";
    if (!current.done && !typeServicio) return result;

    return [
      ...result,
      {
        "waste_id": current.itemId || "",
        "category_id": current.projCategoryId,
        "line_number": current.serviceOrderLineNum,
        "container_id": current.res_InventPackingMaterialCode || "",
        "container_quantity": current.unidadesReal || "",
        images: (current.imagenes || []).map(({ dataUri }) => dataUri),
        notes: (current.observaciones || []).filter(({ on }) => on ).map(({ label }) => label),
        manual: !!current.manual,
        ...TIPOS_RECOGIDAS[current.projCategoryId] === "recogida" &&
          { "percentage": `${current.kgReal || ""}` },
        ...typeServicio && { delivered: !!current.servicioRealizado }
      }
    ];
  }, []);

  return {
    data: {
      "order_id": serviceOrderId,
      "vehicle_id": vehicleId,
      notes: (observaciones || []).filter(({ on }) => on ).map(({ label }) => label),
      signature,
      items,
      latitude_start,
      longitude_start,
      latitude_end,
      longitude_end,
      client_name,
      client_dni
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
