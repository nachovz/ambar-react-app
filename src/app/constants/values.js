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

export const TIPOS_RECOGIDAS = {
  "Res_Peligr": "recogida",
  "Servicios": "servicio",
  "Entrega": "entrega"
}
