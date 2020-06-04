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
    ServiceOrderId,
    observaciones
  }) => {
  const { vehicleId } = getVehicleSession();

  const items = data.reduce((result, current) => {
    const typeServicio = TIPOS_RECOGIDAS[current.ProjCategoryId] === "servicio";
    if (!current.done && !typeServicio) return result;

    return [
      ...result,
      {
        "waste_id": current.ItemId || "",
        "category_id": current.ProjCategoryId,
        "line_number": current.ServiceOrderLineNum,
        "container_id": current.Res_InventPackingMaterialCode || "",
        "container_quantity": current.unidadesReal || "",
        image: ((current.imagenes && current.imagenes[0].dataUri) || ""),
        notes: (current.observaciones || []).filter(({ on }) => on ).map(({ label }) => label),
        manual: !!current.manual,
        ...!typeServicio && { "percentage": `${current.kgReal || ""}` },
        ...typeServicio && { "delivered": !!current.servicioRealizado ? 1 : 0 }
      }
    ];
  }, []);

  return {
    data: {
      "order_id": ServiceOrderId,
      "vehicle_id": vehicleId,
      notes: (observaciones || []).filter(({ on }) => on ).map(({ label, comment }) => `${label}${!!comment ? '##'+comment : ''}`),
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

export const addCompletedCartaporte = (ServiceOrderId) => {
  const current = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  localStorage.setItem(
    'COMPLETED_CARTAS_DE_PORTE',
    JSON.stringify([
      ...current,
      { id: ServiceOrderId, date: moment() }
    ])
  );
};

export const setCompletedCarteporte = (data) => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  completed.forEach(({ id }) => {
    if(data[id]) data[id].done = true;
  });
};

export const filterCompletedCartaPorteByDate = () => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  const filtered = completed.filter((item) => moment().isSame(moment(item.date), 'day'));
  localStorage.removeItem('COMPLETED_CARTAS_DE_PORTE');
  localStorage.setItem('COMPLETED_CARTAS_DE_PORTE', JSON.stringify(filtered));
};
