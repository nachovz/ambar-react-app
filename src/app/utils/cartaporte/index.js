import moment from 'moment';
import { getVehicleSession } from 'app/utils/vehicle';
import { findRecogidaType } from 'app/constants/values';

export const buildCartaporte = ({ 
    latitude_start,
    longitude_start,
    latitude_end,
    longitude_end,
    client_name = "",
    client_dni = "", 
    signature = "",
    data,
    serviceorderid,
    observaciones,
    notes = [],
    noitems = false
  }) => {
  const { vehicleId } = getVehicleSession();

  const items = data.reduce((result, current) => {
    const typeServicio = findRecogidaType(current.projcategoryid) === "servicio";
    if (!current.done && !typeServicio) return result;

    return [
      ...result,
      {
        "waste_id": current.itemid || "",
        "category_id": current.projcategoryid,
        "line_number": current.serviceorderlinenum,
        "container_id": current.res_inventpackingmaterialcode || "",
        "container_quantity": current.unidadesreal || "",
        image: ((current.imagenes && current.imagenes[0].dataUri) || ""),
        notes: (current.observaciones || []).filter(({ on }) => on ).map(({ label }) => label),
        manual: !!current.manual,
        ...!typeServicio && { "percentage": `${current.kgreal || ""}` },
        ...typeServicio && { "delivered": !!current.servicioRealizado ? 1 : 0 }
      }
    ];
  }, []);

  return {
    data: {
      "order_id": serviceorderid,
      "vehicle_id": vehicleId,
      notes: (observaciones || [])
        .filter(({ on }) => on )
        .map(({ label, comment }) => `${label}${!!comment ? 
        '##'+comment : ''}`)
        .concat(notes),
      signature,
      items,
      latitude_start,
      longitude_start,
      latitude_end,
      longitude_end,
      client_name,
      client_dni,
      noitems
    }
  };
};

export const addCompletedCartaporte = (serviceorderid, data) => {
  const current = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  localStorage.setItem(
    'COMPLETED_CARTAS_DE_PORTE',
    JSON.stringify([
      ...current,
      { id: serviceorderid, date: moment(), data }
    ])
  );
};

export const setCompletedCarteporte = (data) => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  completed.forEach(({ id }) => {
    if(data[id]) data[id].done = true;
  });
};

export const getCompletedCartaporte = () => {
  return JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
}

export const filterCompletedCartaPorteByDate = () => {
  const completed = JSON.parse(localStorage.getItem('COMPLETED_CARTAS_DE_PORTE')) || [];
  const filtered = completed.filter((item) => moment().isSame(moment(item.date), 'day'));
  localStorage.removeItem('COMPLETED_CARTAS_DE_PORTE');
  localStorage.setItem('COMPLETED_CARTAS_DE_PORTE', JSON.stringify(filtered));
};
