export const RUTA = [
  {
    "OrdenServicio": "string",
    "Vehiculo": "string",
    "Fecha": "Datetime",
    "Conductor": "string",
    "Cliente": "string",
    "Descripcion": "string",
    "Etapa": "string",
    "Progreso": "int",
    "Aprobar": "int",
    "Calle": "string",
    "Ciudad": "string",
    "Provincia": "string",
    "NumeroCalle": "string",
    "ComplementoDireccion": "string",
    "CodigoPostal": "string",
    "ServiceDetails": [
      {
        "NumLinea": "double",
        "TipoTransaccion": "int",
        "Cantidad": "double",
        "CodUnidad": "string",
        "ReferenciaResiduo": "string",
        "CategoriaResiduo": "string",
        "DimensionInventario": "string",
        "DescripcionResiduo": "string",
        "DCSConsejeria": "string",
        "ReferenciaEnvase": "string",
        "CodUnidadEnvase": "string",
        "CantidadEnvase": "string",
        "NumAceptacion": "string",
        "NumDCS": "string",
        "Gestor": "string",
        "Transportista": "string",
        "NumNotificacion": "string",
        "NumAdmision": "string",
        "Observaciones": "string"
      },
    ]
  }, {
    "OrdenServicio": "string",
    "Vehiculo": "string",
    "Fecha": "Datetime",
    "Conductor": "string",
    "Cliente": "string",
    "Descripcion": "string",
    "Etapa": "string",
    "Progreso": "int",
    "Aprobar": "int",
    "Calle": "string",
    "Ciudad": "string",
    "Provincia": "string",
    "NumeroCalle": "string",
    "ComplementoDireccion": "string",
    "CodigoPostal": "string",
    "ServiceDetails": [
      {
        "NumLinea": "double",
        "TipoTransaccion": "int",
        "Cantidad": "double",
        "CodUnidad": "string",
        "ReferenciaResiduo": "string",
        "CategoriaResiduo": "string",
        "DimensionInventario": "string",
        "DescripcionResiduo": "string",
        "DCSConsejeria": "string",
        "ReferenciaEnvase": "string",
        "CodUnidadEnvase": "string",
        "CantidadEnvase": "string",
        "NumAceptacion": "string",
        "NumDCS": "string",
        "Gestor": "string",
        "Transportista": "string",
        "NumNotificacion": "string",
        "NumAdmision": "string",
        "Observaciones": "string"
      },
    ]
  }
];

export const PESO_OPTIONS = [
  {
    label: "100% del peso",
    value: 100
  },{
    label: "90% del peso",
    value: 90
  },{
    label: "80% del peso",
    value: 80
  },{
    label: "70% del peso",
    value: 70
  },{
    label: "60% del peso",
    value: 60
  },{
    label: "50% del peso",
    value: 50
  },{
    label: "40% del peso",
    value: 40
  },{
    label: "30% del peso",
    value: 30
  },{
    label: "20% del peso",
    value: 20
  },{
    label: "10% del peso",
    value: 10
  }
]

export const OBSERVACIONES = [
  {
    label: "Observación #1",
    on: false
  },{
    label: "Observación #2",
    on: false
  },{
    label: "Otra observación",
    on: false
  },{
    label: "Observación #3",
    on: false
  },{
    label: "Observaciones",
    on: false
  }
];

export const RECOGIDA = 'recogida';
export const SERVICIO = 'servicio';
export const ENTREGA = 'entrega';
export const CONSIGNA = 'consigna';
export const SERVFACT = 'servfact';

export const TIPOS_RECOGIDAS = {
  "Res_Peligr": RECOGIDA,
  "Servicios": SERVICIO,
  "Entrega": ENTREGA,
  "Res_NoPel": RECOGIDA,
  "Consigna": CONSIGNA,
  "Serv Fact": SERVFACT
};

export const getRecogidaTypes = () => [RECOGIDA, SERVICIO, ENTREGA, CONSIGNA];

export const LINK_TYPE_MAP = "map";
export const LINK_TYPE_EMAIL = "email";
export const LINK_TYPE_PHONE = "phone";

export const LINK_VALUES = {
  [LINK_TYPE_PHONE]: "tel:",
  [LINK_TYPE_EMAIL]: "mailto:",
  [LINK_TYPE_MAP]: "http://maps.google.com/?q="
};

export const NAMES = {
  "AMB": "Ambar Plus",
  "MRE": "Reciclauto"
}

export const getName = () => NAMES[process.env.REACT_APP_COMPANY_CODE] || "Gestión de residuos";

export const COMPANY_CODE_FILTER = {
  "AMB": ["AMB", "AEC", "AHK"],
  "MRE": ["MRE"]
}

export const COMPANY_CODES = {
  "AMB": [
      //{ "id": "ABI", "name": "Ambar Bio" },
      { "id": "AMB", "name": "Ambar Plus" },
      { "id": "AEC", "name": "Ambar Eco" },
      { "id": "AHK", "name": "Ambar Hondakin" },
      { "id": "RMS", "name": "Remasur" }
  ],
  "MRE": [
      { "id": "MRE", "name": "Manufacturas Reciclauto" }
  ],
  "RMS" : [
      { "id": "RMS", "name": "Remasur" }
  ]
}

export const COMPANIES = COMPANY_CODES[process.env.REACT_APP_COMPANY_CODE || "AMB"]; 

export const APP_VERSION = 'v1.9.10a';
