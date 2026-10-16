# TrackFlow — Progreso del proyecto

## Estado comprobado — 11/10/2026

- Briefing en CONTEXT.md, memoria de negocio y técnica, AGENTS.md,
  dos reglas con alcance explícito y una skill de mantenimiento de memoria.
- Website corporativo y backoffice implementados en las carpetas de `uis`,
  con entrada en `/` y layouts propios. Versión sincronizada en Codespaces.
- Contenido relacionado con TrackFlow, sus sedes y procesos; pedidos ficticios
  identificados y capacidades futuras diferenciadas de las disponibles.
- Identidad común documentada en `uis/STYLE_GUIDE.md`; procedencia de recursos
  en `docs/visual-assets.md`. Capturas de entrega en `docs/evidence`.
- Documentación revisada para retirar historial de transferencias, duplicaciones
  de la guía visual y descripciones inferidas sobre la forma de colaboración.
  La instrucción expresa es explicar los cambios y no crear respaldos.

## Comprobaciones realizadas

En la revisión del 11/10/2026:

- Lint y build de ambas apps correctos en local y Codespaces.
- Las cuatro pruebas SEO del website pasan en ambos entornos.
- Vistas de Codespaces revisadas en escritorio (website 1440px, dashboard
  1920px) y móvil de 390px, sin overflow ni errores de consola observados.
- Menú del website y filtros de almacén, búsqueda y detalles del backoffice
  comprobados. No se presentan estas pruebas como una auditoría exhaustiva.
- Enlaces relativos de documentación comprobados sin destinos rotos.

Antes del commit del hito se repitieron lint y build de ambas aplicaciones
y las cuatro pruebas SEO, correctamente en local y Codespaces. Se volvió
a revisar Codespaces a 1920px y 390px: sin overflow ni errores de consola
observados; menú móvil, filtro Zaragoza, búsqueda SEUR y detalle DEMO-1048
comprobados. Las aplicaciones no se modificaron durante la preparación de entrega.

## Repositorio de entrega

Fork creado y comprobado: `https://github.com/rogerdevmtz/ai-engineering-trackflow`.
En local y Codespaces, origin apunta al fork y upstream conserva
`4GeeksAcademy/ai-engineering-trackflow`. Se mantuvieron la rama
`feature/agent-memory-bank` y los cambios de trabajo.

## Entrega

- Fork personal conectado en local y Codespaces.
- Commit del hito `bf015a8` subido en `feature/agent-memory-bank`.
- [PR #1](https://github.com/rogerdevmtz/ai-engineering-trackflow/pull/1)
  abierta hacia `main` del fork, con capturas de ambas apps y enlace directo
  a AGENTS.md. No se ha fusionado.
- Pendiente: el estudiante debe entregar la URL de la PR en el campus.
  No hay entrega registrada en esta revisión.

## Limitaciones conocidas

- Sin backend, integraciones reales, tracking operativo, RAG ni automatizaciones.
- El briefing contiene dos nombres distintos para el CEO; no usar ese dato
  como confirmado ni modificar CONTEXT.md sin autorización explícita.
- No hay certificación completa de accesibilidad. El carrusel móvil sin pausa
  conserva la limitación WCAG 2.2.2 documentada en la guía visual.
- Dispositivos físicos, lector de pantalla y otros motores no están verificados.
- El orden histórico de configuración antes del código no se acredita con
  el árbol actual; no afirmarlo como comprobado.

## Revisión del siguiente hito — 16/10/2026

Se leyó completo el hito de sitio web público en la pestaña del campus y el
contexto específico de TrackFlow enlazado por ese módulo. Se contrastaron
con el código local, los README y la PR #1, que continúa abierta con dos commits.
La entrega anterior en el campus no se ha comprobado en esta revisión.

Comparación y lista de trabajo en [milestone-2.md](../docs/milestone-2.md).
Faltan la página separada de solicitud y su validación (12 campos), CTA,
ajustes al contenido específico de la landing, contacto, completar Schema,
alinear el uso de Tailwind, un comando npx desde raíz y evidencia de
PageSpeed/Lighthouse ≥80 con URL de Codespaces en la PR.

El contexto del módulo contiene campos que no están en el briefing general
y presenta algunas capacidades futuras como actuales. Esas discrepancias
se registran en la comparación; no se ha modificado CONTEXT.md ni resuelto
su contenido por suposición. También queda pendiente reconciliar la exigencia
de puerto público con las instrucciones actuales de puertos privados.

Esta tarea solo revisó fuentes y código y añadió documentación. No se han
arrancado apps, repetido lint/test/build, medido rendimiento ni implementado
el nuevo hito. Las comprobaciones anteriores mantienen su fecha original.

## Formulario implementado en local — 16/10/2026

Por petición del estudiante, se implementó únicamente el formulario con los
campos y validaciones del hito y sus enlaces de acceso, conservando el diseño.
`CONTEXT.md` permanece intacto. Todo queda pendiente de revisión y aprobación
local; no se ha hecho commit, push ni sincronización con Codespaces.

- Página real `uis/website/application.html`, construida por Vite junto a la
  landing. Utiliza la marca existente, tokens, Tailwind y JavaScript nativo.
- `validation.js` valida los 12 campos/grupos, opciones oficiales, URLs http/https,
  email, teléfono internacional, contacto, privacidad y selección de servicios.
- Errores por campo y resumen enlazado con foco, avisos accesibles, contador de
  500 caracteres, confirmación de volumen bajo y limpieza completa.
- Éxito del contexto identificado como envío simulado; sin transmisión ni
  persistencia. La privacidad explica la demostración; no es política de producción.
- CTA del hero y nav llevan al formulario. Resto de landing y backoffice sin
  rediseño ni cambios funcionales. Sin nuevas dependencias ni recursos visuales.
- Nueva regla `.agents/rules/repository-hygiene.md`, enlazada desde AGENTS.md:
  comprobar el uso de cada archivo nuevo, excluir temporales y no usados,
  preparar rutas explícitas y revisar la lista aprobada antes de subir.
  Debe llegar a Codespaces con la futura sincronización aprobada; no está
  aplicada allí mediante una edición remota en esta tarea.

Comprobaciones realizadas sobre la versión local:

- `pnpm lint`, `pnpm test` (10/10: cuatro SEO y seis validación) y `pnpm build` correctos.
- Arranque de build/preview en `http://127.0.0.1:4173/`; formulario en `/application.html`.
- Navegador: formulario a 1440×1000, 768×1024 y 390×844, sin overflow horizontal
  observado; capturas revisadas y guardadas fuera del repositorio.
- Envío vacío bloqueado con resumen y enlaces que enfocan campos; corrección
  inmediata tras perder foco, URL inválida y contador/límite de 500 comprobados.
- Aviso de volumen bajo, confirmación e invalidación al cambiar producto;
  envío válido simulado, reinicio y limpieza de campos/errores/contador comprobados.
- Envío válido en móvil seleccionando solo logística inversa y privacidad con
  teclado; el grupo no obliga a elegir Almacenaje. Sin errores de consola observados.
- Landing revisada en escritorio y a 360px; CTA a la página correcta y sin
  overflow observado. No se repitió la revisión exhaustiva de todas sus secciones.

Pendientes: aprobación visual del estudiante, resto de requisitos del hito,
medición de rendimiento ≥80 y entrega. No se certifica accesibilidad completa
ni se han probado lectores de pantalla, dispositivos físicos u otros motores.
La presentación de la PR #1 en el campus sigue sin evidencia de entrega.

## Refinamiento del formulario — 16/10/2026

A petición del estudiante, la propuesta local incorpora una imagen logística
ya utilizada y un formulario de tres pasos. El botón «Volver al inicio» y los
controles de avance/regreso reutilizan el sistema visual de acciones de la landing.
Su CSS se ha movido a `src/index.css`, compartido por ambas páginas.

Se muestra solo un paso; el avance explícito valida sus campos. Se conservan
los valores al retroceder y se validan los pasos previos al navegar a uno ya
visitado. El paso final permite revisar los datos en un desplegable. La limpieza
restablece campos, errores, confirmación de volumen y progreso al primer paso.
El envío sigue siendo simulado y CONTEXT.md no se ha modificado.

Comprobaciones de esta iteración: lint, 11/11 pruebas Node (incluida validación
por paso) y build correctos. En navegador se verificaron bloqueo y mensajes por
paso, avance, regreso con datos, revisión, privacidad, éxito, reinicio y bloqueo
de salto a un paso visitado cuando un dato previo se vuelve inválido. Se comprobó
también que cambiar el producto invalida la confirmación de volumen bajo.
Sin errores de consola observados. Revisión visual en escritorio 1440px,
tablet 768px y móvil 390px; capturas fuera del repositorio. No se añadieron
imágenes, dependencias ni archivos nuevos en este refinamiento.

Se simplificó después el encabezado del formulario según la captura del
estudiante: indicador único de pasos con estado actual destacado, sin contador
«Paso X de 3» ni separador adicional. Se conserva la ayuda de campos obligatorios.
Lint, 11 pruebas y build correctos en esta corrección; revisión visual y avance
entre pasos comprobados en navegador, con adaptación de etiquetas en móvil.

## Revisión completa del formulario y footer — 16/10/2026

- Cabecera limitada a 1440px y alineada con el contenido; ayuda de campos
  obligatorios integrada en la misma fila del título, con ajuste en móvil.
- Footer corporativo reutilizado desde `SiteFooter.tsx`; render de servidor
  en desarrollo y build, sin duplicar HTML ni añadir React al cliente del formulario.
  Sus enlaces llevan a las anclas de la landing. Estilos compartidos en index.css.
- Se desactivó el scroll suave solo en el formulario: el foco en cambios de paso
  y errores se mueve inmediatamente. Se mantiene el comportamiento de la landing.

Comprobaciones de esta revisión en navegador local, escritorio 1920×1080 y
móvil 390×844:

- Paso 1: vacíos y datos inválidos en empresa, contacto, email, teléfono y URL;
  mensajes específicos, longitud mínima de empresa, nombre y apellido, email
  válido, teléfono internacional, URL https válida y URL opcional vacía.
- Paso 2: obligatoriedad y mensajes de país/producto/volumen/servicios/3PL;
  todas las opciones de los tres selectores, servicios múltiples, ninguna
  selección y selección única de logística inversa, las tres opciones 3PL.
- Volumen bajo: bloquea avance, acepta confirmación y la revoca al cambiar
  producto o volumen; también se comprobó el tipo Otro.
- Paso 3: revisión de valores, comentarios opcionales, contador y límite de
  500 mediante escritura; privacidad sin marcar bloquea envío, error enlazado
  enfoca el control, aceptación permite el éxito simulado y enfoca su título.
  La prueba Node verifica también el rechazo de 501 caracteres.
- Regreso sin pérdida de datos, revalidación al saltar a un paso visitado,
  limpieza, reinicio desde éxito y navegación de teclado comprobados.
- Sin overflow horizontal ni errores de consola observados en las vistas
  comprobadas. Footer visible con sus recursos locales; enlace a Zaragoza
  navega a `/#zaragoza` y el CTA devuelve al formulario. Render del footer
  también comprobado en servidor de desarrollo local (5175).
- Lint, 11/11 pruebas y build correctos; capturas y resultados de revisión
  fuera del repositorio. Sin nuevas dependencias ni recursos visuales.

No se certifica accesibilidad completa ni se han probado otros motores,
lector de pantalla o dispositivos físicos. CONTEXT.md intacto; todos los
cambios siguen locales, sin commit, push ni sincronización.

## Ajuste visual del formulario corto — 16/10/2026

Por petición del estudiante, `SiteFooter` incorpora una variante compacta
utilizada solo por el formulario: sin bloque superior de logo/servicios/sedes,
conservando la foto y la firma grande, en menos altura y con menor oscurecimiento.
La landing sigue usando la variante completa. Se amplió el encuadre de la foto
de preparación y se quitaron el eyebrow «Solicitud de información» y los textos
«De principio a fin.» / «Escena ilustrativa». Se conserva el alt que identifica
la imagen generada con IA y el aviso de demostración del formulario.

Lint y build correctos. Vistas revisadas a 1440px y 390px; sin overflow también
a 320px y sin errores de consola observados. La salida del build distingue
footer compacto del formulario y footer completo de la landing. Capturas fuera
del repositorio; sin nuevos recursos ni dependencias. No se repitió la matriz
de validaciones: sus reglas y controles no cambiaron en este ajuste visual.

## Cierre discreto del formulario — 16/10/2026

El estudiante aprobó retirar el footer visual del formulario y dejar solo
«© 2026 TrackFlow» tras un separador fino. Se conserva el aviso de envío
simulado junto a las acciones y la foto de preparación junto al titular.
La landing mantiene su footer completo. Se retiraron la variante compacta,
su CSS y el render específico en Vite/prerender/entry-server, ya sin uso.

Lint y build correctos. Formulario revisado a 1440px y 390px, sin overflow
ni errores de consola observados. Se comprobó el cierre de texto y la ausencia
de footer visual en la página; el build conserva el footer completo en la landing.
Capturas fuera del repositorio. Las validaciones no se modificaron ni se
repitió su matriz en esta tarea. Todo sigue local; CONTEXT.md intacto.

## Ajustes de experiencia en escritorio y móvil — 16/10/2026

Aplicados los ajustes aceptados por el estudiante: introducción móvil más breve,
foto más compacta, encuadre de preparación y separación del aviso de obligatorios
bajo el título. Acciones móviles con primario amplio, anterior separado y limpieza
discreta. El resumen de errores indica cuántos campos faltan y enlaza al primero,
sin repetir los mensajes de cada campo. En móvil se enfoca el primer inválido.
El paso final muestra un resumen compacto con «Editar contacto» y «Editar
operación», conservando los datos y comentarios al volver.

Lint, 11/11 pruebas y build correctos. Revisados los tres pasos a 1440px y 390px:
errores por paso, foco, edición desde el resumen, conservación de comentarios,
confirmación del volumen bajo, bloqueo por privacidad, éxito simulado y reinicio.
Sin desbordamiento horizontal también a 320px ni errores de consola observados.
La opción «No estoy seguro» se presenta como «Volumen por definir» en el resumen.
Capturas fuera del repositorio; sin nuevos recursos ni dependencias. La matriz
completa de formatos continúa cubierta por las pruebas existentes; en navegador
se probaron los flujos afectados. No se certifican otros motores ni dispositivos
físicos. Footer discreto conservado y CONTEXT.md intacto. Todo sigue local.

## Indicaciones dentro de los campos — 16/10/2026

Por petición del estudiante, «Nombre y apellido» pasa a placeholder. El teléfono
conserva su ejemplo internacional y se retira la ayuda repetida debajo. Se añade
una indicación de nombre comercial/razón social y un ejemplo en comentarios.
Se mantienen etiquetas, errores, contador y ayudas de selección del segundo paso.
Build correcto; primer paso revisado a 1920px y 390px, sin desbordamiento ni
referencias aria-describedby rotas. Comprobado el error de contacto incompleto.
No se repitió la matriz completa: las reglas no cambian. Captura fuera del repo;
sin archivos nuevos, commit ni subida. CONTEXT.md intacto.

## Mensajes sin duplicados — 16/10/2026

Eliminada la copia de los errores de campo bajo los botones. Cada error conserva
su mensaje local, aria-describedby y anuncio polite. El estado del volumen se
expresa en su advertencia y botón, sin repetir instrucciones ni confirmaciones
al pie. El estado vacío ya no ocupa espacio; el aviso único de reinicio se mantiene.

Lint, 11/11 pruebas y build correctos. En navegador se verificó email inválido
una sola vez en escritorio y móvil, sin copia inferior, resumen con contador al
continuar, foco móvil, confirmación de volumen y privacidad con un solo mensaje.
Sin overflow móvil. No se repitió la matriz completa de formatos, cuyas reglas
no cambian. Captura fuera del repo; sin recursos nuevos ni subida. CONTEXT.md intacto.

## Revisión completa y pulido del recorrido — 16/10/2026

Revisados los tres pasos en escritorio (1440px) y móvil (390px). Comprobados
obligatorios, formatos inválidos de empresa/contacto/email/teléfono/URL y su
corrección, URL vacía, selecciones obligatorias, cualquier servicio suficiente,
3PL, aviso 0-100 incluido Otro y reinicio de confirmación al cambiar producto o
volumen. Comentarios de 501 bloquean y 500 pasan; privacidad bloquea sin aceptar.
Cada error aparece una sola vez, sin copia al pie; la ayuda de servicios se oculta
cuando aparece su error. Revisión, edición de ambos grupos, valores/comentarios
conservados, retorno directo al resumen, envío simulado y limpieza comprobados.

Pulido de foco y desplazamiento para mantener el progreso bajo la cabecera;
corregido el doble espacio de scroll-padding/scroll-margin. Entrada breve de
pasos con puntero y respuesta de controles; teclado sigue inmediato. Confirmación
con check y superficie coherentes con la marca, sin duplicar el aviso académico.
Corregido required del grupo de servicios tras reset, comprobado en navegador.
Acciones completas en filas separadas a 320px; sin overflow a 320/390/1440px.

Lint, 11/11 pruebas y build correctos. Sin errores de consola observados.
La suite cubre además opciones ajenas y formatos extremos. Movimiento reducido
verificado en código; no se emuló esa preferencia ni se probaron lector de pantalla,
otros motores o dispositivos físicos. Capturas fuera del repo. Sin dependencias,
assets ni archivos nuevos para este pulido. CONTEXT.md intacto; sin commit ni subida.

## Retirada de textos de demostración — 16/10/2026

Por instrucción expresa del estudiante se quitan el aviso bajo acciones, el
desplegable de privacidad de la demostración, el rótulo de confirmación y la
nota académica. Esta petición prevalece para el formulario sobre la regla
general de identificar demostraciones; no se modifica la regla ni CONTEXT.md.
Se conserva el checkbox de privacidad y se retira su referencia ARIA al bloque
eliminado. Reinicio renombrado «Nueva solicitud». El envío continúa simulado,
sin transmisión ni almacenamiento; no se ha añadido una política legal real.

Build correcto. Recorrido hasta confirmación verificado en navegador, sin textos
de demostración ni referencias aria-describedby rotas; reinicio comprobado.
No se repite la matriz de validaciones porque las reglas no cambian. Captura fuera
del repo. Todo local, sin commit ni subida.

## Imágenes propias y alineación del formulario — 16/10/2026

Creadas con imagegen dos escenas de asesoría logística: conversación, tablet
y paquete, con continuidad entre la horizontal y la composición vertical móvil.
Solo los dos WebP finales se incorporan a public; procedencia, pesos, dimensiones
y prompts finales registrados en docs/visual-assets.md. La foto de empaquetado
anterior permanece usada por los servicios de la landing.

Picture selecciona la vertical bajo 640px. Titular/párrafo junto a la imagen en
móvil/tablet; dos columnas alineadas arriba en escritorio, con proporciones y
espaciado que equilibran el bloque izquierdo y el primer paso. Sin nuevos textos
visibles de demostración; alt mantiene la identificación de la escena generada.

Lint, 11/11 pruebas y build correctos. Revisados 320/390/768/1440/1920px, sin
overflow horizontal, con imágenes cargadas y selección responsive comprobada.
Recorrido móvil por los tres pasos hasta confirmación correcto, foco/progreso
visible bajo la cabecera y sin errores de consola observados. Las validaciones
no se modifican; no se repite su matriz manual completa. Capturas y PNG originales
fuera del repo, sin dependencias nuevas. CONTEXT.md intacto; sin commit ni subida.

## Revisión de la composición móvil — 16/10/2026

El estudiante rechazó la miniatura junto al texto. Se cambia solo móvil a título
y descripción a todo el ancho con imagen panorámica debajo. Se recompone la
escena con imagegen para un banner 2:1, sustituyendo el WebP móvil anterior
en la misma ruta; no quedan dos variantes móviles ni recursos nuevos sin uso.
Escritorio y tablet conservan su composición y su archivo de imagen.

Build correcto. Vistas móviles revisadas a 320 y 390px sin overflow ni cortes,
con el nuevo recurso cargado. Captura fuera del repo. Sin cambios en JavaScript
ni reglas de validación; no se repite la matriz de pruebas. Todo local, sin subida.

## Alineación de flechas de desplegables — 16/10/2026

Los tres selects del formulario conservan su control nativo y usan un chevron
decorativo común, centrado y separado 16px del borde. Padding derecho reservado
para que texto y flecha no se solapen; colores forzados recuperan la flecha nativa.
Build correcto. Revisados a 1440px y 390px; posiciones CSS iguales, sin overflow
y selección mediante teclado comprobada. No se modifican las validaciones ni se
repite su matriz. Captura fuera del repo; sin archivos nuevos ni subida.

## Texto integrado en la imagen móvil — 16/10/2026

Por petición del estudiante, título y párrafo se superponen sobre la imagen
solo bajo 640px. Bloque de altura mínima 300px, texto HTML en flujo y degradado
oscuro bajo las caras para mejorar la lectura. Se reutiliza el mismo WebP móvil;
no hay texto rasterizado, duplicación de h1 ni nuevos recursos.

Build correcto. Vistas revisadas a 320 y 390px sin cortes/overflow; comprobado
que a 1440px no se aplica la superposición. Captura fuera del repo. Sin cambios
de comportamiento ni reglas de validación; no se repite su matriz. Todo local.

## Barra fija y confirmación móvil — 16/10/2026

Acciones de los tres pasos fijas abajo bajo 640px; «Limpiar formulario» queda
fuera, en el flujo al final. Espacio reservado según altura observada, padding
de área segura y scroll-padding inferior. VisualViewport oculta la barra cuando
el área visible baja más de 120px al editar; fallback de foco táctil cuando esa
API no existe. Recupera la barra al cerrar el teclado. A 320px conserva las dos
filas sin cortar etiquetas. Al confirmar desaparecen barra y reserva inferior.
Por nueva petición del estudiante, la confirmación móvil oculta imagen/titular
de introducción; «Nueva solicitud» restaura ese bloque y el primer paso.

Lint, 11/11 pruebas y build correctos. Revisados los tres pasos a 390px y las
acciones a 320px; validación desde barra, regreso, envío y reinicio correctos.
Comprobado al final que privacidad/error, limpieza y footer quedan sobre la
barra, incluida su altura de 141px a 320px. Ocultación y recuperación verificadas
simulando viewport de 844 a 500px al editar empresa y comentarios. No se probó
el teclado virtual ni safe-area en un móvil físico. Escritorio a
1440px mantiene acciones en flujo, sin reserva extra. Sin overflow ni errores
de consola observados. Capturas fuera del repo; sin dependencias/archivos nuevos.
Reglas de validación y CONTEXT.md intactos. Todo local, sin commit ni subida.

## Alineación de la confirmación de escritorio — 16/10/2026

La tarjeta final llena la altura de la columna y alinea sus bordes superior e
inferior con la introducción e imagen. Desde 1024px, el bloque izquierdo puede
crecer con la confirmación y la imagen ocupa la altura restante, sin fijar una
altura que corte el texto. «Nueva solicitud» queda en la parte inferior interna.

Build correcto. Alineación medida y vista a 1920/1440/1024px, con bordes iguales
y sin overflow. Confirmación móvil a 390px sigue sin introducción y el reinicio
restaura formulario/imagen. Las reglas y JavaScript no cambian; no se repite la
matriz de validaciones. Captura fuera del repo. CONTEXT.md intacto; sin commit ni subida.

## Confirmación centrada y revisión del recorrido — 16/10/2026

Por decisión del estudiante, se sustituye la confirmación de dos columnas por
una tarjeta centrada de máximo 720px y altura natural. Introducción/imagen
ocultas en todos los tamaños, sin popup. Retirados el estiramiento de columnas,
el crecimiento de la imagen y las filas elásticas del cierre, ya sin uso.
«Nueva solicitud» recupera la introducción, los pasos y sus acciones.

Lint, 11/11 pruebas y build correctos. Recorrido de escritorio a 1440px: errores
obligatorios, bloqueo/confirmación de volumen bajo, edición conservando comentarios,
privacidad y éxito. Recorrido móvil a 390px: errores por paso, límite 501/500,
edición/retorno, privacidad, envío y reinicio. Barra oculta y recuperada con
simulación 844/500px; limpieza y footer accesibles por encima de la barra.
Confirmación comprobada a 320/390/1024/1440/1920px, sin overflow; centrado exacto
medido a 1024 y 1920px. Sin errores de consola observados. No se repite cada
formato extremo manualmente: los cubre la suite existente. Teclado virtual y
safe-area en móvil físico siguen pendientes. Capturas fuera del repo; sin nuevos
archivos ni dependencias. CONTEXT.md intacto y todo local, sin commit ni subida.

## Auditoría actual del segundo hito y contrato de 4Geeks — 16/10/2026

Releídos el enunciado completo y el contexto específicos en el repositorio
oficial; el campus falló con una excepción de cliente. docs/milestone-2.md
sustituye el diagnóstico inicial por la matriz actual de 60 criterios, contrato
de 12 campos, pendientes concretos de landing, límites de revisión y entrega.
El formulario satisface el contrato funcional comprobado; no se afirma aprobación
del docente ni conformidad completa de accesibilidad/Tailwind del sitio.
Confirmado que el hito exige simular envío, sin exigir avisos visibles de demo.

Añadidas dos pruebas al archivo existente para mensajes exactos y las 20
opciones de dominio. Lint, 13/13 pruebas y build correctos. DOM contrastado:
campos/tipos/labels/legend/required, opciones y ARIA sin referencias rotas.
Repetidos contacto vacío/inválido/corregido, operación incompleta, servicio
alternativo suficiente, volumen bajo y revocación, comentarios 501/500,
privacidad, éxito y limpieza completa. Recorrido móvil con edición conservada,
estados finales a 320/768px y formulario a 390/1440px, sin overflow ni errores
de consola observados. No se certifican lector de pantalla, contraste completo,
otros motores ni teclado/área segura en móvil físico.

Arranque npx desde raíz ejecutado en 5176 y formulario comprobado en navegador;
servidor temporal detenido. Comando documentado en README; Codespaces y su
visibilidad no cambiaron. Landing leída en navegador: CTA funcional, menú,
contenido y campos faltantes del JSON-LD confirmados. Sin medición Lighthouse
ni PageSpeed nueva, ni consulta de estado remoto de PR. Persisten pendientes
de contenido, Schema.org, Tailwind, carrusel sin pausa, rendimiento/evidencias
y entrega autorizada. Sin recursos nuevos; CONTEXT.md intacto y sin subida.

Próximo paso: completar servicios, cobertura, beneficios y contacto de la landing,
conservando diseño y resolviendo contradicciones con el briefing. Mantener
revisión local antes de preparar evidencias y publicación.

El estudiante revisa esta versión local; ajustar según su
feedback antes de autorizar cualquier subida o sincronización. No se ha hecho
commit, push ni edición remota; los demás pendientes del hito siguen abiertos.

## Navegación y hero del módulo — 16/10/2026

Por petición del estudiante, menú con Inicio, Servicios, Cobertura y Contacto;
se conserva el CTA al formulario. Cobertura utiliza el ancla existente #operacion
y Contacto enfoca un bloque con el correo comercial del escenario, bajo la marca
del footer. Se conservan servicios, sedes y recursos visuales del pie.
Hero con titular/subtítulo completos del contexto de 4Geeks; tres líneas, última
naranja, y acción secundaria «Ver cobertura». Se ajusta la escala móvil del
titular y el espacio entre navegación y CTA en tablet. Sin nuevas dependencias,
imágenes ni archivos de implementación. CONTEXT.md intacto.

Lint, 13/13 pruebas y build correctos; repetidos lint/build tras los ajustes.
Navegador local: vistas 320/390/768/1440px, sin overflow observado; titular en
tres líneas móvil y separación de 20px entre menú y CTA a 768px. Menú móvil,
foco al abrir, Escape y devolución de foco comprobados; Contacto/correo y
Cobertura llegan a sus destinos; CTA y «Volver al inicio» navegan correctamente.
Sin errores ni avisos de consola observados. Capturas fuera del repositorio.
No se repite la matriz manual de validaciones: formulario sin cambios.

Guía visual y comparación del hito actualizadas. Quedan servicios, detalle de
cobertura, beneficios, teléfonos/LinkedIn/copyright, Schema, Tailwind, rendimiento
y entrega. Todo sigue local: sin commit, push ni sincronización remota.

## Tres servicios de la landing — 16/10/2026

Agrupadas las cuatro etapas anteriores en Gestión de almacenes (incluye picking
y packing), Entregas de última milla y Logística inversa. Se mantienen las tres
escenas existentes, numeración, recorrido reversible, teclado y fallback cuando
el contenido no cabe. Footer actualizado con los mismos tres nombres/destinos;
el enlace histórico #preparacion selecciona almacenes. La fuente compartida de
contenido genera también los tres servicios del JSON-LD.

Se consultó el contexto oficial del módulo. Por petición de conservar diseño,
se mantiene el recorrido visual en lugar de tres columnas estáticas. No se
anuncian inventario en tiempo real, seguimiento unificado, certificación de
carriers o integración con ventas: las discrepancias con CONTEXT.md siguen
pendientes de aclaración. No se afirma conformidad completa de esta sección.

Lint, 13/13 pruebas y build correctos; build repetido tras retirar el WebP de
empaquetado, ya sin referencias de uso. Catálogo de recursos actualizado.
Navegador: tres etapas/imágenes cargadas a 1440×1000, selección con teclado;
scroll móvil a 390×844 avanza hasta logística inversa y retrocede a última milla.
320×740 y 1440×600 usan flujo normal sin overflow observado; texto largo visible.
Enlace del footer a logística inversa y alias #preparacion comprobados. JSON-LD
contiene los tres nombres nuevos. Sin errores/avisos de consola observados.
Capturas fuera del repositorio. No se repite validación manual del formulario,
sin cambios; movimiento reducido conserva su código y no se vuelve a simular.

Guía visual/comparación del hito actualizadas con sus límites. Próximo paso:
cobertura y después beneficios/contacto, con las aclaraciones de contenido
pendientes. CONTEXT.md intacto; sin commit, push ni sincronización remota.

## Cobertura por mercado — 16/10/2026

Completado el detalle del contexto del módulo dentro del diseño existente:
Los Ángeles muestra almacén con cobertura nacional y UPS, FedEx, DHL;
Zaragoza muestra almacén con cobertura peninsular e islas y MRW, SEUR, DHL.
Se mantienen el globo, las dos columnas de escritorio, el apilado móvil,
tipografía, colores y anclas. Sin recursos, dependencias ni archivos nuevos.
Guía visual y comparación del hito actualizadas.

Lint y build correctos. Navegador local a 1440×1000, 768×1024, 390×844 y
320×740: contenido legible, columnas alineadas en escritorio/tablet, sedes
apiladas en móvil y sin overflow observado. Menú móvil cierra y navega a
#operacion bajo cabecera; enlace del footer a Zaragoza llega a #zaragoza.
Globo conservado y visible, sin errores/avisos de consola observados. Capturas
fuera del repositorio. No se repiten pruebas de validación ni de movimiento:
solo se han cambiado textos de cobertura, no su lógica ni el formulario.

Próximo paso: beneficios y contacto, manteniendo pendientes las aclaraciones
de servicios, Schema, Tailwind, rendimiento y entrega. CONTEXT.md intacto;
todo sigue local, sin commit, push ni sincronización remota.

## Beneficios de la landing — 16/10/2026

Sección nueva entre cobertura y evolución: operación binacional, unos 130
profesionales, tecnología propia y especialización e-commerce. Reutiliza
SectionHeading, tipografías, bordes y numeración naranja; layout Tailwind con
cuatro columnas en escritorio, dos desde 640px y una en móvil. Altura mínima
de subtítulos desde tablet para alinear párrafos, sin cortar títulos largos.
No se añaden archivos, imágenes, dependencias ni controles sin función.

La cifra se mantiene aproximada y tecnología propia describe el equipo de
Zaragoza y sus herramientas. No se afirman exclusividad binacional ni visibilidad
total del inventario: el briefing no las acredita. Comparación del hito y guía
visual actualizadas; diferencia literal con 4Geeks pendiente de aclaración.

Lint y build correctos; build repetido tras ajustes de espaciado/alineación.
Navegador local: cuatro elementos semánticos, revisión visual de escritorio
1440×1000, tablet 768×1024, móvil 390×844 y 320×740, sin overflow observado.
Los cuatro párrafos comparten borde superior a 1440px; ambos bloques inferiores
recorridos en móvil. Transiciones espaciales con cobertura/evolución revisadas.
Sin errores ni avisos de consola observados; capturas fuera del repositorio.
No se repiten pruebas de formulario ni se certifica accesibilidad completa.

Próximo paso: contacto y footer, después Schema/Tailwind/rendimiento y entrega,
con discrepancias de contenido aún abiertas. CONTEXT.md intacto y cambios
exclusivamente locales: sin commit, push ni sincronización remota.

## Contacto y footer de landing — 16/10/2026

Sección propia #contacto con titular reutilizado, CTA al formulario, correo
comercial y teléfonos de Los Ángeles/Zaragoza del contexto del módulo.
Tres columnas desde 768px y canales apilados en móvil, enlaces mailto/tel
con área mínima 44px. Retirado el correo duplicado bajo la marca del footer.
El componente de pie conserva foto responsive, firma, servicios y sedes;
añade derechos, acceso a contacto y LinkedIn con aviso accesible de pestaña
nueva y rel seguro. Copyright 2026 por coherencia con fecha/formulario;
se registra la diferencia respecto al ejemplo 2025 del módulo.

Lint y build correctos, repetidos tras añadir el acceso a contacto del pie.
Navegador: contacto/footer a 1440×1000, 768×1024, 390×844 y 320×740,
sin overflow observado. Mailto/tel y destino/target/rel de LinkedIn contrastados
en DOM, sin abrir aplicaciones, iniciar llamadas ni visitar ese perfil.
Menú móvil cierra y llega a contacto bajo cabecera; CTA lleva al formulario y
«Volver al inicio» regresa a landing. Enlace del pie a contacto comprobado;
destinos internos del footer presentes. LinkedIn enfocable con teclado,
copyright legible y recurso móvil correcto. Sin errores/avisos de consola
observados. Capturas fuera del repositorio. No se repiten validaciones del
formulario ni se certifica accesibilidad completa.

Guía visual/comparación actualizadas mediante contenido verificado. Sin nuevos
archivos, recursos ni dependencias. Próximo paso: Schema, Tailwind, rendimiento
y entrega, con discrepancias de servicios/beneficios aún por aclarar.
CONTEXT.md intacto; sin commit, push ni sincronización remota.

## Schema.org del módulo — 16/10/2026

Releídos el contexto oficial de 4Geeks y la documentación de Organization de
Schema.org. Completado el generador existente: descripción de organización,
URL empresarial del escenario, foundingDate 2009, dos PostalAddress con regiones
California/Aragón, ContactPoint comercial con teléfono/email/idiomas y sameAs
de LinkedIn. Se conservan países, sedes y tres Service relacionados; las sedes
reutilizan las direcciones para evitar divergencias. España conserva el nombre
localizado del sitio, equivalente al país Spain del ejemplo del módulo.

Organization.url del escenario no configura SITE_URL ni canonical/og:url,
WebSite.url o sitemap. Preview mantiene noindex y no inventa dominio final.
JSON-LD generado en build/prerender, no en el head base del servidor dev;
README actualizado con este alcance, tres servicios y pruebas actuales.

Lint, 14/14 pruebas (cinco SEO, nueve validación) y build correctos; test/lint
repetidos tras fortalecer la prueba de escape JSON-LD. La nueva prueba cubre
contrato completo de organización, referencias y separación de URLs en tres
configuraciones: local, dominio no indexable y publicación. Prueba de escape
comprueba que un terminador de script no rompe la serialización de servicios.
Navegador de preview: un único JSON-LD parseable, campos completos y tres
servicios apuntando a #organizacion, sin canonical/WebSite ficticio y con
noindex/nofollow. Sin errores ni avisos de consola observados. Sin cambios
visuales ni repetición de revisión responsive/formulario. No se envió marcado
a validadores externos ni se acreditan resultados enriquecidos/indexación.

Comparación del hito, README y contexto técnico actualizados. Próximo paso:
Tailwind/accesibilidad y rendimiento, manteniendo las discrepancias de contenido
pendientes. Sin archivos/dependencias nuevos; CONTEXT.md intacto y todo local,
sin commit, push, despliegue ni sincronización remota.

## Revisión de Tailwind y accesibilidad — 16/10/2026

Consultados el enunciado, Web Interface Guidelines, Tailwind @apply/@reference
y W3C sobre contraste no textual. Migrada la estructura compartida, cabecera,
hero, encabezados, servicios, cobertura, evolución y rejilla de footer a
utilidades/@apply, con variantes min-width donde corresponde. Retiradas las
reglas anteriores duplicadas y media query vacía. App.css referencia index.css
sin duplicar tema. CSS de escenas, cristal, movimiento y estados medidos se
conserva. Quedan estilos convencionales de acciones/transportistas/explorador
por convertir: la revisión no da por cerrado el criterio literal de Tailwind.

Entradas/selects con borde #626262 sobre #101010 (3,12:1); placeholder #888
(5,37:1). Email/URL desactivan corrector ortográfico. Título de confirmación
cambiado a h1: se comprobó un único h1 visible al ocultarse la introducción.
El estudiante respondió expresamente «Mantener el comportamiento actual» a
la propuesta de pausa/reanudar; carrusel móvil sin pausa conserva WCAG 2.2.2.

Lint, 14/14 pruebas y build finales correctos. Primer build de @apply requirió
añadir @reference, corregido antes de validar. Navegador CUA/Playwright sobre
preview local, sin Browser plugin independiente ni herramientas nuevas:

- Landing sin IDs duplicados, referencias ARIA rotas ni imágenes sin alt;
  un main/h1 y lang es. Formulario sin controles sin etiqueta ni ARIA rota.
- Salto con teclado enfoca main; menú móvil abre enfocando Inicio, Escape
  devuelve foco, navegación a contacto enfoca su destino bajo cabecera.
- Servicios seleccionados con Enter, imágenes/estado sincronizados; evolución
  abre con Enter, paneles cerrados aria-hidden/inert y flechas cambian selección
  con foco/aria-pressed visibles. Desktop y móvil revisados.
- Movimiento reducido emulado: carrusel sin animación, titulares opacos,
  scroll inmediato y servicios en flujo normal. Colores forzados emulados:
  selects recuperan appearance auto/flecha nativa y foco usa color del sistema.
  Ambas emulaciones y viewport restablecidos al terminar.
- Formulario a 320px: errores obligatorios enfocan empresa; tres pasos con
  datos ficticios, privacidad obligatoria, éxito/reinicio. Privacidad enfocada
  queda sobre barra móvil. Escritorio: resumen de errores enfocado y su enlace
  devuelve a empresa; limpieza y foco correctos. Reglas de validación sin cambios.
- Vistas 320/390/768/1440px sin overflow observado; servicios con fallback a
  1440×600. Revisados hero/nav, servicios, cobertura, evolución, footer y
  formulario; capturas fuera del repo. Sin errores/avisos de consola observados.

Guía visual, README, comparación y contexto técnico actualizados. No se ejecutó
axe/Lighthouse ni lector de pantalla; contraste completo sobre fotografías,
otros motores, zoom y teclado/áreas seguras en dispositivos físicos pendientes.
No se certifica WCAG completa. Próximo paso: completar estilos convencionales
restantes y medición de rendimiento/evidencias, sin ignorar las discrepancias
de contenido registradas. Sin archivos/dependencias nuevos, CONTEXT.md intacto;
todo local, sin commit, push, despliegue ni sincronización remota.

## Conversión de estilos convencionales restantes — 16/10/2026

Convertidos a utilidades Tailwind/@apply los estilos convencionales pendientes
de App.css e index.css: acciones, transportistas, explorador, tipografía,
formulario y footer. Se conservan selectores, valores y orden de cascada.
CSS técnico restante revisado: keyframes/transformaciones/transiciones propias,
filtros/máscaras/gradientes/SVG, backdrop-filter, foco/hidden, normalización,
resets puntuales de borde/herencia y estados dinámicos. No quedan bloques
convencionales pendientes; README, contexto técnico y matriz actualizados.
Sin cambios en HTML/React/JavaScript funcional ni datos de empresa.

Conversión asistida con el PostCSS ya instalado como dependencia transitiva;
script temporal fuera del repositorio, retirado al finalizar. No se añadió
ningún archivo, recurso ni dependencia al proyecto ni se crearon respaldos.

Verificación antes/después de estilos calculados: 44 selectores de landing y
10 de formulario a 1440×1000 y 390×844, 3672 propiedades muestreadas. Solo cinco
diferencias de serialización box-shadow: Tailwind añade capas transparentes de
0px y conserva la sombra visible; tamaños, fuentes, colores y distribución
muestreados coinciden. No se presenta como comparación exhaustiva de cada
estado ni como certificación de accesibilidad/rendimiento.

Lint, 14/14 pruebas y build correctos. Navegador CUA/Playwright:

- Servicios seleccionados con Enter y foto sincronizada; explorador desktop y
  móvil con flechas, foco visible, criterio/note actualizados. Menú móvil abre y
  Escape devuelve foco. Carrusel conserva la decisión de no añadir pausa.
- Formulario móvil: error obligatorio, tres pasos con datos ficticios, aviso
  0-100/confirmación, privacidad, envío, h1 visible único y reinicio. Confirmación
  también revisada en escritorio. Barra oculta/recuperada simulando 844/500px;
  campo de privacidad enfocado queda sobre ella. No se probó teclado físico móvil.
- Movimiento reducido emulado: carrusel estático y servicios en flujo normal.
  Colores forzados: select nativo sin chevron y foco del sistema. Preferencias
  y viewport restaurados al finalizar.
- Vistas 320/390/768/1440px y fallback 1440×600, sin overflow observado; hero,
  controles, footer/firma y contenido revisados. Sin errores/avisos de consola
  observados. Capturas fuera del repositorio.

Pendientes: rendimiento/Lighthouse y evidencias, comprobaciones de accesibilidad
no cubiertas y discrepancias de contenido registradas. CONTEXT.md intacto;
todo local, sin commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Lighthouse local móvil y escritorio

Objetivo ≥80 comprobado en landing y formulario. Lighthouse CLI 13.5.0 con
Chrome headless 155 sobre build/preview en 127.0.0.1:4173; perfil móvil estándar
412×823, CPU ×4 y red simulada; preset desktop, caché reiniciada, sin bloquear
recursos ni cambiar animaciones para elevar las notas. Medidas secuenciales:

| Página | Antes móvil / escritorio | Final móvil / escritorio |
| --- | --- | --- |
| Landing | 66 / 91 | 83 / 99 |
| Formulario | 94 / 98 | 94 / 98 |

Repetición móvil landing: 83; sin advertencias de ejecución. LCP móvil landing
11,1 → 4,1 s, TBT final 40 ms y CLS 0; escritorio LCP 0,8 s y CLS 0.
Formulario LCP 2,5 s móvil / 0,7 s escritorio, TBT 0 en ambos; CLS escritorio
0,069, móvil 0. Las puntuaciones son de laboratorio local, no de tráfico real
ni de Codespaces público. No se certifica accesibilidad completa.

Solo se recomprimen los dos hero y tres imágenes de servicios existentes a
WebP calidad 85. Hero 1279752 → 103046 y 1313126 → 118556 bytes; servicios
292226 → 163086, 265716 → 139824 y 189664 → 93366 bytes. Se conservan escenas,
dimensiones, encuadres, rutas, fuentes y comportamiento. No se añaden recursos
ni dependencias; no se modifica JS/CSS de la aplicación en esta tarea.

Build, lint y 14/14 pruebas correctos. Revisión CUA en 390×844 y 1440×1000:
hero y tres fotos legibles, selección de servicios sincroniza imagen, sin
overflow observado; formulario conserva validación obligatoria y no se
observaron errores/avisos de consola. Capturas fuera del repositorio.
Informes HTML/JSON en C:/Users/roger/AppData/Local/Temp/trackflow-lighthouse-20261016;
comandos reproducibles en README y criterio E13 actualizado en docs/milestone-2.md.

Próximo paso: revisar discrepancias de contenido pendientes y preparar, tras
autorización del estudiante, URL/captura pública y entrega del hito. Permanecen
las limitaciones de accesibilidad y pruebas físicas documentadas. CONTEXT.md
intacto; todo local, sin commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Retirada de evolución de la landing

Por petición expresa del estudiante, retirada la sección «Una operación más
conectada» (#evolucion). Contacto sigue directamente a beneficios. Eliminado
FutureExplorer.tsx, incluido su ConnectionVisual, importación y 101 reglas CSS
exclusivas (desktop, responsive, movimiento reducido y colores forzados).
Retirados selectores future-* de reglas compartidas y contenedores CSS vacíos;
no quedan referencias en las fuentes ni estilos de la sección. El símbolo SVG
se conserva porque sigue usado por el backoffice. Sin nuevos recursos,
dependencias, scripts temporales ni copias. Guía, README y matriz actualizados;
los objetivos futuros de negocio permanecen en el briefing y memoria de alcance.

Build, lint y 14/14 pruebas correctos. CSS de landing 35,83 → 24,57 kB y JS
257,16 → 247,43 kB antes de gzip. Revisión CUA en 1440×1000, 390×844 y 320×844:
sección ausente, beneficios/contacto consecutivos, sin desbordamientos ni anclas
rotas observadas. CTA de contacto abre application.html en móvil y escritorio;
volver al inicio funciona. Sin errores/avisos de consola observados.
Capturas fuera del repositorio. Lighthouse CLI 13.5.0 repetido en landing sobre
build/preview, con perfiles estándar: 83 móvil / 99 escritorio, LCP 4,0 / 0,8 s
y CLS 0 en ambos. Informes without-evolution-mobile/desktop en la carpeta
temporal de auditorías ya registrada. El formulario no se volvió a auditar con
Lighthouse en esta tarea; se conserva su medición anterior y sus fuentes intactas.

Próximo paso: pendientes de contenido/accesibilidad y evidencia pública de
entrega tras autorización. CONTEXT.md intacto; todo local, sin commit, push,
despliegue ni sincronización remota.

## 16/10/2026 — Beneficios interactivos con Tailwind

Rediseñada la sección a petición del estudiante tomando como inspiración el
panel de pestañas de https://automora0.webflow.io/home-01 (revisado en navegador)
y sus capturas. Mantiene negro/naranja, Phudu/Archivo y cuatro ventajas comprobadas.
Tras cobertura, comienza por el equipo humano; siguen dos mercados, tecnología
propia y e-commerce. Contacto continúa después. No se recupera evolución.

Nuevo BenefitsShowcase.tsx importado y usado por App.tsx; sustituye la lista y
su array anterior. Estilos solo en utilidades Tailwind, sin CSS personalizado,
estilos inline, dependencias ni recursos raster nuevos. Visuales tipográficos y
SVG propios: unos 130 profesionales, US/ES, equipo tecnológico y tres sectores.
Sin métricas inventadas ni promesas de seguimiento unificado/IA. Referencia
adaptada a TrackFlow, sin copiar imágenes, marcas ni contenido de terceros.

Pestañas con roving tabindex, flechas/Home/End y asociación tab/tabpanel; solo
el panel activo es accesible. Paneles comparten altura para evitar saltos.
Fundido 200ms con curva existente; teclado y movimiento reducido inmediatos.
Sin autoplay. Cuatro columnas de pestañas desde 768px y cuadrícula 2×2 antes;
panel en dos columnas desde 1024px, apilado en móvil. Guía/README/matriz actualizados.

Build, lint y 14/14 pruebas correctos. CUA: cuatro selecciones en 1440×1000 y
390×844, todas con altura estable y un panel expuesto; cuatro visuales también
revisados en 320×844, sin overflow observado. Ajuste fino del visual humano bajo
360px verificado sin overflow interno; teclado desktop/móvil, Home/End, Tab al
contenido y movimiento reducido emulado comprobados. Sin errores/avisos de
consola observados; preferencias y viewport restaurados al cerrar. Capturas
fuera del repositorio. No se certifica accesibilidad completa.

Lighthouse CLI 13.5.0 sobre build/preview, perfiles estándar y caché reiniciada:
83 móvil / 99 escritorio; LCP 4,1 / 0,8 s, CLS 0 y auditoría automática de
accesibilidad 100 en ambos. Informes benefits-tabs-final-mobile/desktop en la
carpeta temporal de auditorías anterior. No se repitió Lighthouse del formulario.
Próximo paso: revisión visual del estudiante y pendientes de contenido,
accesibilidad/evidencia pública para entregar. CONTEXT.md intacto; todo local,
sin commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Refinamiento visual y eliminación de redundancias en beneficios

A petición del estudiante, simplificado BenefitsShowcase: retirados contador,
frases de cierre, cabeceras del visual y listados duplicados. Cada panel conserva
un titular, un párrafo breve y un visual. La cifra aproximada se expresa una sola
vez en el visual humano; sectores y sedes se concentran en sus visuales.
Eliminados tarjeta interior y marco exterior de la barra de pestañas; queda una
sola superficie con tipografía más expresiva, separadores discretos y selección
sencilla. Panel desktop de 350px (antes unos 453); móvil más compacto. Circuito
tecnológico propio y decorativo, sin simular interfaces ni capacidades nuevas.
Solo utilidades Tailwind; sin CSS personalizado, recursos o dependencias nuevos.
Guía visual actualizada. CONTEXT.md y formulario intactos.

Build final correcto; lint y 14/14 pruebas pasaron en esta tarea. Cuatro paneles
revisados en 1440×1000 y 320×844, altura estable, un único panel expuesto y sin
overflow de página. Refinado tamaño de cifra/espaciado bajo 360px y comprobado
sin overflow interno. Vista 390×844 revisada y capturada. Flechas/Home/End,
roving tabindex y cambio con movimiento reducido comprobados; preferencias y
viewport restaurados al cerrar. Sin errores/avisos de consola observados.
Capturas fuera del repositorio; no se certifica accesibilidad completa.

Auditoría Lighthouse 13.5.0 de esta composición antes del último ajuste limitado
a menos de 360px: 83 móvil / 99 escritorio, LCP 4,1 / 0,8 s, CLS 0 y accesibilidad
automática 100. Perfiles estándar móvil 412px y desktop; informes
benefits-refined-mobile/desktop en la carpeta temporal de auditorías anterior.
No se repitió Lighthouse tras ese ajuste estrecho ni sobre el formulario.
Próximo paso: revisión visual del estudiante y pendientes de contenido,
accesibilidad/evidencia pública. Todo local, sin commit, push ni despliegue.

## 16/10/2026 — Cierre de contacto integrado y compacto

A petición del estudiante, #contacto pasa de App.tsx al primer bloque semántico
de SiteFooter.tsx. Mantiene email comercial, teléfonos de Los Ángeles/Zaragoza
y CTA a application.html, que continúa como página separada conforme al hito.
El header sigue enlazando al mismo ID. El footer contiene ahora directamente
los datos de contacto requeridos, con derechos y LinkedIn. No se afirma que el
resto de pendientes del hito esté cerrado.

Titular y CTA juntos a la izquierda; address de tres filas a la derecha desde
1024px. Móvil apilado, ciudad/teléfono en una fila. Retiradas lista repetida de
sedes y enlace del pie a sí mismo; ciudades conservan accesos a cobertura.
Foto responsive, oscurecimiento y firma de marca conservados bajo contacto.
Todo SiteFooter usa utilidades Tailwind; retiradas 25 reglas CSS antiguas y
selectores footer de reglas compartidas, sin contenedores vacíos. Sin recursos,
dependencias ni archivos nuevos. Guía, README y matriz actualizados.

Build, lint y 14/14 pruebas correctos. CUA en 1440×1000, 768×1000, 390×844 y
320×844: sin overflow de página/interno observado, imágenes completas y
contenidos legibles. Contacto mide 304px desktop / 503,5px a 390px. Un único ID
contacto y una sola aparición de cada email/teléfono en footer; anclas sin
referencias rotas. Menú móvil cierra y lleva foco a contacto. Tab va del bloque
al CTA y después al email; acceso a cobertura comprobado. CTA abre formulario
en móvil y con Enter en escritorio; regreso al inicio y error de cuatro campos
obligatorios comprobados. LinkedIn inspeccionado sin abrir/enviar: nueva pestaña,
noopener noreferrer. Sin errores/avisos de consola observados. Capturas fuera
del repositorio; viewport restaurado al cerrar.

Lighthouse CLI 13.5.0 sobre build/preview, perfiles estándar, caché reiniciada:
83 móvil / 99 escritorio, LCP 4,1 / 0,9 s, CLS 0 y accesibilidad automática 100.
Informes contact-footer-mobile/desktop en la carpeta temporal de auditorías
anterior. Formulario sin nueva auditoría Lighthouse; no se certifica WCAG completa.
Próximo paso: revisión del estudiante, pendientes de contenido/accesibilidad y
evidencia pública de entrega tras autorización. CONTEXT.md intacto; todo local,
sin commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Aire en el cierre y auditoría de preparación de entrega

Ajustado solo el espaciado Tailwind de SiteFooter: separación tras beneficios
80px móvil / 112px desktop, contacto py-12/lg:py-16, filas py-4 y fotografía
pt-12. Conserva contacto integrado, datos, CTA, foto y firma. Contacto mide
360px a 1440×1000 y 543,5px a 390×844. CUA: ambos tamaños y 320×844 sin overflow
interno/de página observado; menú móvil/ancla contacto, CTA al formulario,
Schema servido (Organization y tres Service) y cero anclas rotas comprobados.
Sin errores/avisos de consola observados. Capturas fuera del repositorio;
viewport restaurado al cerrar. Build, lint y 14/14 pruebas correctos.

Enunciado y contexto oficiales completos reconsultados en su fuente GitHub.
Revisados fuente de servicios/beneficios, footer, entradas de Vite, referencia
real a validation.js, scripts y documentación. Actualizado docs/milestone-2.md
con pendientes accionables y corregido el recuento antiguo de 13 a 14 pruebas.
No se repitió el recorrido completo del formulario ni Lighthouse: última
medición de landing 83/99 y formulario 94/98 corresponde a tareas anteriores.

No afirmar hito al 100%: diferencias de capacidades/beneficios del módulo frente
al briefing local, servicios dinámicos frente a tres columnas, revisión estricta
mobile-first y accesibilidad pendiente. Carrusel sin pausa conserva decisión
expresa y su limitación; no se cambia. Backend/segundo idioma no son faltantes
obligatorios. CLI local no sustituye captura de PageSpeed/DevTools solicitada.
Faltan autorización de subida, revisión de archivos necesarios, commit/push,
URL pública Codespaces, PR con captura/URL y entrega; merge tras aprobación.
Estado remoto del PR anterior no consultado, sin atribuirle la entrega actual.

Próximo paso recomendado: aclarar diferencias del contexto y cerrar revisión
mobile-first/accesibilidad antes de preparar evidencias y entrega. CONTEXT.md,
company-choice.md y .devcontainer intactos; sin nuevos archivos/dependencias,
commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Comparación de contextos y propuesta de resolución veraz

Releídos CONTEXT.md completo, briefing/memoria, contenido actual de servicios y
beneficios, enunciado y contexto web oficiales de GitHub. Comparación y propuesta
incorporadas a docs/milestone-2.md; no se modifica la interfaz ni sus capacidades.

Distinción documentada: inventario global en tiempo real y seguimiento unificado
contradicen el estado actual descrito en el briefing. Certificaciones concretas,
integración comercial con plataformas de venta, exclusividad de mercado y régimen
de propiedad de los almacenes no están acreditados; no presentar su ausencia
como demostrada. Equipo tecnológico sí existe, sin acreditar visibilidad total.
Unos 130 coincide con el briefing y la introducción del módulo; +130 no es preciso.
La landing actual ya utiliza en esencia formulaciones prudentes para esos puntos.

Datos complementarios compatibles del módulo (sectores, contacto, cobertura,
Schema y contrato de formulario) se mantienen como fuente válida del escenario.
Tres columnas de servicios es una diferencia visual, no una capacidad: propuesta
de adaptar layout conservando marca o confirmar aceptación docente del recorrido
aprobado. Copyright vigente no implica capacidad nueva. Incoherencia interna del
CEO ya registrada; no usar nombres en página/Schema hasta aclaración.

Recomendación, no aprobación recibida: conservar contrato funcional y hechos
comunes, justificar sustituciones comerciales y consultar al docente cuál versión
rige en los puntos contradictorios. Nota de PR no garantiza aceptación literal.
Borrador de consulta local incluido; no se ha enviado ni contactado a terceros.
No hace falta backend de inventario/tracking para este hito. Propuestas todavía
sin aplicar; no se marcan las discrepancias como resueltas.

Revisión documental y git diff --check correctos; sin lint/test/build ni navegador
nuevos por no haber cambios de aplicación. CONTEXT.md, company-choice.md y
.devcontainer intactos. Próximo paso: revisar la propuesta con el estudiante y
aclarar criterios del docente; continuar pendientes técnicos de accesibilidad y
mobile-first dentro del alcance autorizado. Todo local, sin commit, push,
publicación, sincronización remota ni archivos nuevos.

## 16/10/2026 — Recuperación del recorrido original de servicios

El estudiante pidió recuperar exactamente el recorrido anterior y descartó
la variante de tres columnas, incluso con interacción de scroll. Restaurada
la lógica original de ServiceJourney: foto fija, lista amortiguada 88/64ms,
fundido 520ms, selección por clic/teclado y enlaces del footer. La composición
original se conserva con utilidades Tailwind en JSX; no se restaura CSS
convencional. Retirada ServiceCards, sin nuevas dependencias ni imágenes.
No se han cambiado los textos de servicios ni CONTEXT.md.

Comprobado en preview local mediante CUA: escritorio 1440×1000 y móvil
390×844, avance y retroceso por los tres servicios, selección por teclado,
clic y enlace del footer. Sin desbordamiento horizontal observado también
a 320×844. A 390×540 y con movimiento reducido se desactiva la fijación;
los servicios quedan en flujo normal. Sin avisos/errores de consola observados.
Build, lint y 14/14 pruebas correctos. Capturas fuera del repositorio.
No se ha repetido Lighthouse ni el recorrido completo del formulario.

Guía visual, README, contexto técnico y pendiente del hito actualizados.
La exigencia literal de tres columnas sigue pendiente de aceptación docente;
no afirmar cumplimiento completo. Próximo paso: revisar el recorrido restaurado
con el estudiante y resolver esa diferencia sin sustituir de nuevo la interacción.
Todo local, sin commit, push, despliegue ni sincronización remota.

## 16/10/2026 — Contacto integrado con la identidad de servicios

El estudiante rechazó la propuesta de correo destacado y dos bloques de sedes.
Sustituida por tres filas abiertas con tipografía Phudu/Archivo, numeración
naranja y el mismo trazado de flecha de ActionLink, siguiendo servicios.
Cada fila completa abre email/teléfono; se conservan datos, CTA y resto del
footer. Sin texto añadido, tarjetas, CSS personalizado, imágenes o dependencias.
Los nombres de sedes del contacto ahora forman parte de sus enlaces telefónicos;
las anclas de la sección de cobertura permanecen disponibles en la landing.

Preview local revisada en 1440×1000 y 390×844, también 320×844 sin overflow
horizontal de página ni enlaces observado. Foco visible por teclado y destinos
mailto/tel comprobados sin iniciar llamadas ni enviar correos. Build y lint
correctos. No se repiten tests de formulario ni Lighthouse por este cambio visual.
Guía visual/contexto técnico actualizados, capturas fuera del repositorio.
Próximo paso: revisión visual del estudiante; continúa pendiente la diferencia
entre recorrido original y tres columnas del módulo. CONTEXT.md intacto,
sin commit, push, publicación ni sincronización remota.

## 16/10/2026 — Auditoría de cierre del segundo hito actualizada

Reconsultados enunciado y contexto web oficiales completos en GitHub y
contrastados con fuentes actuales, documentación y resultados del build.
Landing y formulario separado, 12 grupos de campos, opciones/mensajes,
advertencia de bajo volumen, simulación de éxito, cobertura, cuatro beneficios,
contacto/footer y Schema implementados. Verificación de fuente HTML: controles
con ID asociados a label; archivos index.html, application.html y validation.js
presentes en uis/website. JSON-LD construido: Organization y tres Service.

Nuevos build, lint y 14/14 tests correctos. Lighthouse CLI 13.5.0 sobre el build
actual: landing móvil 83, escritorio 99; accesibilidad automática 100/100,
CLS 0, LCP 4,1s / 0,8s. Informes fuera del repositorio en carpeta temporal
trackflow-lighthouse-20261016/current-hito-mobile/desktop.report.*.
Formulario 94/98 es una medición anterior; no se repitieron su Lighthouse
ni su recorrido completo en navegador en esta auditoría documental/técnica.

Pendientes concretos: aceptación docente del recorrido frente a tres columnas;
resolver diferencias de capacidades/beneficios literales sin inventar hechos;
revisar cascada heredada del hero/controles para mobile-first estricto y cerrar
accesibilidad (lector de pantalla/contraste completo; carrusel sin pausa conserva
su limitación y decisión expresa). Captura PageSpeed o Lighthouse DevTools y URL
pública Codespaces siguen pendientes. Los informes CLI no sustituyen la evidencia
solicitada. Antes de subir: revisión final de archivos necesarios, rutas explícitas,
aprobación y autorización, commit/push, PR con URL/captura y entrega del repositorio;
merge después de aprobación. No se consultó estado remoto de PR anterior.

Actualizados docs/milestone-2.md y README con la fecha/alcance de las mediciones.
Próximo paso recomendado en local: cerrar mobile-first/accesibilidad y preparar
la evidencia; no cambiar de nuevo el recorrido sin una decisión del estudiante.
CONTEXT.md, company-choice.md y .devcontainer intactos; todo local, sin commit,
push, publicación ni sincronización remota. No hacen falta backend ni segundo idioma.

## 16/10/2026 — Mobile-first y accesibilidad local: revisión completada

Decisión expresa del estudiante: mantener exactamente el recorrido de servicios
como elección de diseño para mejorar el flujo. No queda una tarea local para
sustituirlo por columnas. La diferencia literal se documenta, sin atribuir
aprobación docente. No se cambian capacidades ni CONTEXT.md.

App.css reorganizado con base móvil y variantes min-width Tailwind: hero, menú,
marca, controles, transportistas y cobertura. Eliminadas queries generales
max-width; se conservan rangos técnicos de máscara, carrusel con movimiento
permitido y poca altura. index.css reorganiza introducción y acciones del
formulario con base móvil y sm/lg. Estilos convencionales no reintroducidos.
Correo de confirmación ahora enlazado con mailto, sin cambiar el texto.

CUA/Chromium local: estilos calculados comparados a 320/390/520/640/768/1024/1440
en landing y 320/390/640/768/1024/1440 en formulario. Medidas y tipografía de
componentes muestreados conservadas; solo diferencias no visibles de estilos
residuales del botón de menú oculto en escritorio y altura total de documento
entre capturas de formulario. Revisión visual móvil/escritorio sin desbordamientos
observados. No se afirma equivalencia pixel a pixel de todas las propiedades.

Verificados salto al contenido, menú con foco/Escape, selección de servicios,
pestañas Home/End (un único panel sin inert y aria-hidden=false), referencias ARIA
sin destinos rotos, imágenes con alt. En formulario: envío vacío, foco de errores,
3 pasos completos móvil y escritorio, bajo volumen y confirmación, privacidad,
éxito con único h1 visible/foco correcto, nueva solicitud y limpieza.
Barra oculta al reducir viewport 844→500 durante edición y restaurada al volver;
colores forzados conserva foco y select nativo. Movimiento reducido desactiva
fijación/carrusel. No se probaron móvil físico ni lector de pantalla real.

Build, lint y 14/14 pruebas finales correctos. Lighthouse CLI final de build:
landing 83/99, formulario 94/99 (móvil/escritorio); accesibilidad automática 100
en cuatro perfiles. Informes fuera del repositorio, nombres mobile-first-* en
carpeta temporal trackflow-lighthouse-20261016; salida JSON sin extensión.
Sin errores/avisos de consola observados. Capturas fuera del repositorio.

README, guía visual, diagnóstico del hito y contexto técnico actualizados.
Carrusel sin pausa mantiene decisión expresa y limitación WCAG 2.2.2;
no certificar WCAG completa, lector de pantalla ni contraste exhaustivo de fotos.
Próximo paso: resolver divergencias de contenido y preparar captura de rendimiento
DevTools/PageSpeed y entrega tras autorización. Todo local, sin commit, push,
sincronización remota ni publicación. Archivos protegidos intactos.

## 16/10/2026 — Rendimiento mínimo 95 sin cambiar diseño ni animaciones

El estudiante elevó el objetivo a mínimo 95 en móvil y escritorio. Identificado
bloqueo de Google Fonts y competencia de recursos bajo el primer viewport.
Archivo/Phudu se sirven como los mismos binarios WOFF2 locales, con preload,
@font-face y OFL originales. Comprobados ejes variables y glifos españoles.
No se han editado, recomprimido o redimensionado imágenes en esta tarea.

PresenceGlobe carga renderer/geografía al acercarse a cobertura (600px),
preservando el SVG y la animación. ServiceJourney prepara fotos originales
400px antes de entrar, prioriza la activa y conserva una foto disponible
mientras llega otra; soporta caché y primera foto estática sin JavaScript.
Scroll/damping/fundido originales y tiempos CSS conservados. No se retiene
código de las pruebas de alternativas que no mejoraban la carga.

Build, lint y 14/14 pruebas finales correctos. Lighthouse CLI 13.5.0, caché
reiniciada y perfiles estándar, sin modificar throttling ni bloquear recursos:
landing móvil 95/95/95 en tres mediciones consecutivas; escritorio 100;
formulario móvil 100 y escritorio 100. Accesibilidad automática 100 en todos.
Landing móvil FCP 1,5s, LCP 2,8s, CLS 0; escritorio FCP 0,4s, LCP 0,6s, CLS 0.
Informes JSON/HTML target95-final-*.report.* fuera del repo, en carpeta temporal
trackflow-lighthouse-20261016. Medición anterior 83/99 queda como histórico.

CUA: tipografía/medidas muestreadas antes/después coinciden a 390 y 1440px.
Comprobadas tres fotos originales completas, avance y retroceso, regreso por
teclado, carga del globo y animación en móvil/escritorio, movimiento reducido,
menú y errores del formulario. Sin overflow o errores/avisos de consola observados.
Capturas auténticas de informes Lighthouse CLI: lighthouse-cli-final-mobile-95.png
y lighthouse-cli-final-desktop-100.png en carpeta de visualizaciones de sesión.
No son capturas del panel DevTools, que no está expuesto al control disponible;
no se atribuye ese origen ni se marca cerrado el formato específico de entrega.

También revisada PR anterior #1 en GitHub (solo lectura): abierta hacia main,
dos commits, sin conflictos; no se observan reviews en GitHub. Esto no acredita
ni descarta una aprobación docente fuera de GitHub. El estudiante comunicó
que los profesores requieren integrarla antes de crear la rama del segundo hito.
Rama local actual feature/agent-memory-bank, trabajo del segundo hito sin commit.
No se realizó merge remoto, cambio de rama, commit/push ni sincronización.

Memoria, README, guía visual y diagnóstico actualizados. Próximo paso: preparar
formato de captura DevTools/PageSpeed y URL Codespaces cuando se autorice;
integrar la PR anterior en main y preservar el trabajo local antes de abrir
la nueva rama. Mantener textos veraces y recorrido como decisión de diseño;
limitación del carrusel sin pausa y pruebas de lector/móvil físico siguen
explícitas. CONTEXT.md, company-choice.md y .devcontainer intactos.

## 16/10/2026 — Entrega anterior integrada y rama del segundo hito preparada

El estudiante autorizó integrar primero la rama anterior en main y preparar
la del segundo hito. Tras fetch y comprobación de ascendencia, origin/main
avanzó de d43ae64 a f0d6d9c, incluyendo solo los dos commits anteriores.
GitHub API sin caché confirmó PR #1 closed, merged=true y commit f0d6d9c.
Main local coincide con origin/main. Creada codex/hito-2-web-publica desde main
actualizado, sin perder los cambios locales ni crear copias de respaldo.

Lint, 14/14 pruebas y build del website repetidos correctamente. Nuevos archivos
con referencias/uso comprobados: formulario, validación, pruebas, componente de
beneficios, dos imágenes, dos WOFF2 y sus licencias, regla y diagnóstico del hito.
Dist/node_modules ignorados; ningún informe temporal ni captura exploratoria
nuevo en la lista de archivos. No quedan referencias de código a los recursos
retirados FutureExplorer/service-packing. CONTEXT.md intacto.

Aplicada skill update-project-memory. No se realizó commit/push del segundo
hito ni sincronización de Codespaces. No se repitieron navegador/Lighthouse.
Próximo paso del enunciado: subir fuentes revisadas, abrir URL pública Codespaces
y ejecutar primero PageSpeed; Lighthouse DevTools/extensión solo si PageSpeed
no accede. Incluir URL/captura en PR y entregar URL del repositorio. Las
diferencias de contenido y límites de accesibilidad siguen documentados.

## 16/10/2026 — Subida del segundo hito autorizada

El estudiante autorizó preparar commit y subir codex/hito-2-web-publica,
actualizar Codespaces y medir primero PageSpeed móvil/escritorio. Revisión
de archivos nuevos y diff realizada; lint, 14 pruebas y build correctos en
la tarea anterior, sin cambios posteriores en código. Las pantallas afectadas
ya fueron comprobadas en navegador en las revisiones fechadas anteriores.
CONTEXT.md intacto; no incluir builds, dependencias ni informes temporales.
Pendientes de comprobar en esta fase: push, sincronización del Codespace
super-engine-6vvqp55594jx2r9gj, preview pública y PageSpeed.

## 16/10/2026 — Commit y rama del segundo hito subidos

Commit 755cf92 (feat: complete TrackFlow public website milestone) creado y
subido a origin/codex/hito-2-web-publica. HEAD local y remoto coinciden.
Incluye 39 rutas revisadas, con dos eliminaciones de recursos retirados;
no incluye CONTEXT.md, company-choice.md, .devcontainer, dist, node_modules
ni informes/capturas temporales. Diff staged revisado y diff --check correcto
tras retirar espacios finales en dos líneas de licencias OFL, sin alterar
su contenido legal. Comprobaciones de código válidas de la tarea anterior:
lint, 14 pruebas y build; código sin cambios posteriores.

Codespaces localizado en GitHub: super engine / super-engine-6vvqp55594jx2r9gj,
mostrado en feature/agent-memory-bank y sin cambios. API Codespaces devolvió
403 con la credencial disponible. Al abrirlo por UI se creó una pestaña sin
URL válida; la política del navegador impidió adquirirla y prohibió eludir
el bloqueo. Se pidió al estudiante abrir el Codespace manualmente y esperar
al editor. No se actualizó el remoto ni se abrió un puerto público. PageSpeed
y sus capturas siguen pendientes, sin resultados inventados. Próximo paso:
continuar desde el editor abierto, comprobar git status y sincronizar la rama,
levantar build/preview pública, PageSpeed móvil/escritorio y evidencias en PR.

## 16/10/2026 — Codespaces sincronizado; PageSpeed descartado

En la tarea anterior se abrió directamente la URL válida de super engine,
se comprobó Git limpio, se actualizó main y se cambió a codex/hito-2-web-publica
en 1ea867d. Instalación frozen-lockfile, lint, 14 pruebas y build correctos.
CONTEXT.md conserva hash 5fb916baf4dd5ce1ecb6849c3eb154b42ad4acd8 antes/después,
igual al local. Web pública en https://super-engine-6vvqp55594jx2r9gj-3000.app.github.dev/.
Solo 3000 público; 5678/8000 privados. CLI GitHub temporal en /tmp, fuera del
repo, ante fallo PendingMigrationError de la extensión de túneles.

Landing pública revisada a 1440 y 390px; sin overflow móvil observado. CTA
al formulario, vacíos bloqueados y tres pasos móviles hasta éxito simulado
comprobados con datos ficticios; sin errores/avisos de consola de la web.
PageSpeed móvil/escritorio auditó el aviso GitHub; 100/99 descartados y no
atribuidos a TrackFlow. Capturas de incidencia y QA fuera del repositorio.
Control de Windows se detuvo por no poder verificar URL al intentar DevTools.

En esta tarea se contrastó nuevamente el enunciado, se actualizó el diagnóstico
y se confirmó CONTEXT.md intacto, también en diff de rama respecto a main.
Se intentó F12 con el navegador; el panel no está expuesto al control de página.
Se pidió al estudiante abrir Lighthouse manualmente. Siguen pendientes las
capturas válidas, PR con URL/evidencia, entrega y merge posterior a aprobación.
Limitaciones de contenido/accesibilidad documentadas siguen vigentes.
