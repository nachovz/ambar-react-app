Changelog:
**v1.13.6** Mejoras en link de mapa & notificación de notas de oficina en ruta
- Rollback de error de cierre de carta cuando hay CONSIGNA

**v1.13.4** Fix de lógica de validación de cartaporte lista
+ Agregado tipo consigna a validación de cierre sin cambios
+ Ajuste de formato de datetime en Cartaporte y Summary

**v1.13.3** Revamp lógica previsión envases por tipo de recogida

**v1.13.2** Ajuste de sesión expirada luego de cierre
+ Ajustes de legibilidad

**v1.13.1** Envío de container_id en recogidas manuales
+ Ajuste en Ruta para evitar llamado doble
+ Más valores debug en dev

**v1.13.0** Feature: cargar ruta y cartaportes futuras y pasadas (no editables)

**v1.12.1a** Fix recogida manual container_id

**v1.12.1** Snackbar cuando ocurre response 500 en POST cartaporte

**v1.12.0a** Ajustes de refactor: Observaciones y documentos

**v1.12.0** Ajuste de URL del API por env
+ Cambio en formato de variables (all lowercase)

**v1.11.0** Cerrar cartaporte sin cambios

**v1.10.0** Permite entrar a Ruta aunque no haya datos
+ Ajustes a client para incluir flag que ignora error
- Limpieza de código 

**v1.9.10** Fixes en manifest & Cambio de formato de imagen a jpeg

**v1.9.9** Previsión de envases agrupar por Cliente

**v1.9.8a** Botón de refresh en Ruta

**v1.9.8** Reforzar validación de CompayId en login
+ Activo endpoint de información de Company
+ Agregado campo de COMPANY_INFO a localStorage
+ Validación de COMPANY_INFO en ResumenDía
+ Limpieza de json estáticos
+ Ajuste de estado de error para SelectField

**v1.9.7a** hotFix start_url en manifest
+ Agregadas imágenes para 100% PWA en LH

**v1.9.7** Fix en url de ruta & manifest
+ Ajuste de mensaje cuando user o passw no es correcto
+ Variables de entorno en SW
+ Fixed offline cache
+ Limpieza de comments
+ Cacheo de imágenes

**v1.9.6** Ajustes en generador de ENDPOINTS
+ Limpieza de "Ambar", dinamizado.
+ Opción para logout en selección de empresa.
+ Ajuste en endpoint de POST, llama a company correcto.

**v1.9.5** Companies estático (no requiere fetch)

**v1.9.4:** Habilitado selección de empresa
+ Se guarda la empresa seleccionada aún después de cerrar sesión.

**v1.9.3:** ResumenDia ahora muestra los datos raw de la cartaporte enviada.
+ Se agregó cartaporte raw al LocalStorage para uso en ResumenDia.
+ Signature en color negro
+ Limpieza de console.logs

**v1.9.2a:** HotFix DNI en POST.

**v1.9.2:** Ajustes en filtro para previsión de envases.

**v1.9.1:** Versión 5.0 workbox. Validando offline BackgroundSync.

**v1.9.0c:** Hotfix texto correcto en toaster cuando 403.

**v1.9.0a:** Hotfix regla de caché para Ruta.
+ Estrategia NetworkFirst.
+ Caché vence en 6h.

**v1.9.0:** Offline support.
+ Cacheo de Ruta (SWR)
+ BackgroundSync de POST /company/amb/route para cierre de cartaporte

**v1.8.2:** Sesión persiste después de cerrar la APP
+ Cambio de SessionStorage a LocalStorage

**v1.8.1a:** HotFix officenotes -> officenotes

**v1.8.1:** Recogida tipo servicio, cambio de valor para delivered: 1 | 0

**v1.8.0:** Agregado tipo Consigna
+ Consulta sólo lectura
+ DNI en firma opcional

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

**v1.5.2:** usa `officenotes` para mostrar Observaciones oficina (12/11/2019)

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