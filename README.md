This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important links

[API https://apisat.solusat.es/](https://apisat.solusat.es/)

[DEV https://visor.dev.ambarplus.com/](https://visor.dev.ambarplus.com/)

Changelog:
**v1.7.6:** CP y DCS (pdf) en ResumenDia (carta de porte cerrado) en MenuContextual

**v1.7.5:** Mejoras de rendimiento en inputs de comentarios

**v1.7.4:** Se pueden agregar comentarios a las observaciones
+ Update de package.json
+ Ajustes a modal estilos
+ TO-DO: optimizar input lag en modal
+ Ajustes a Recogida manual (cambios en backend: wastes y containers)

**v1.7.2:** Ajuste en POST (imagen por waste)
+ Se envía sólo una imagen por waste. Base64 string

**v1.7.1:** Validación de llamada a route en PrevisionEnvase (01/17/2020)
+ Alerta cuando hay error

**v1.7.0:** Previsión de envases futura (01/16/2020)
+ Se hace la llamada a la ruta con fecha día siguiente o futuro.

**v1.6.1:** Ocultar expandibles cuando no hay elementos de ese tipo (12/20/2019)

**v1.6.0:** Revamp vista Entregas (12/20/2019)
+ Tipo Entrega se muestra como Recogida.
+ Ajustes en POST para incorporar campos a elementos tipo Entrega.
+ Ajustes de validación para edit Recogida.

**v1.5.6:** Detalles pendientes en vista resumen de recogida (12/20/2019)

**v1.5.5:** Ajustes de keys en mayúsculas (12/19/2019)

**v1.5.4:** Actualizaciones (12/16/2019)
+ Ajuste de campos a snake_case.
+ ExpansionPanel abierto por defecto.
+ Actualizadas librerías por vulnerabilidades.

**v1.5.3:** Recogida review menu changes
- Eliminado el menú contextual para ResumenDia

**v1.5.2:** usa `officeNotes` para mostrar Observaciones oficina (12/11/2019)

**v1.5.1:** implementado descarga DCS/CP pdf (12/11/2019)
+ Renombrado getDCS a getPDF
+ Implementado descarga de DCS/CP

**v1.5.0:** revamp vista de cartaporte/Summary/ResumenDia (12/11/2019)
+ Ajustes en Expandable.
+ Creado componente funcional para mostrar lista de recogidas en desplegables.
+ Ajuste en reset.css para centrar icons.
- Eliminados imports innecesarios.

**v1.4.0:** Mostrar cálculo de peso en vista de lista/resumen
+ Nuevo componente Table
+ Ajustes en generación de body (POST)
