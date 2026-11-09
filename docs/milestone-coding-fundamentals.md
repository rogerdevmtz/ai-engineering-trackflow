# TrackFlow — Fundamentos de programación

Revisión: 09/11/2026. Implementación y comprobaciones locales completadas.
Estudiante autoriza commit, subida de feature/domain-models y PR hacia main.
La entrega de la URL en el campus queda pendiente.

## Fuentes y alcance

- [Enunciado, trabajo, evaluación y entrega](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/ai-eng-milestone-coding-fundamentals/README.es.md).
- [Contrato específico de TrackFlow](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/contexts/02-coding-fundamentals/trackflow-BRIEFING.es.md).
- [Contexto general protegido](../CONTEXT.md).

El campus denomina este módulo Hito 2. La documentación anterior
milestone-2.md corresponde a la web pública y se conserva.
Los 37 checks del enunciado son 10 de lógica, 6 de calidad, 18 de evaluación
y 3 opcionales de interfaz. No representan 37 funciones diferentes.

Entregable: utilidades TypeScript reutilizables para inventario, envíos y
transportistas, con demostración ejecutable y comprobaciones reproducibles.
La página HTML con Tailwind es opcional. Si se incorpora, debe ofrecer
controles de operaciones, resultados claros y un comando de servidor.
La compatibilidad de la biblioteca con navegador sí debe comprobarse,
aunque no se construya esa página. No necesita React, DOM ni APIs de Node
en sus módulos de lógica.

## Situación del proyecto

PR #2 integrada en main, base c6046e6; rama local feature/domain-models creada.
El backoffice contiene seis Order ficticios y lógica de filtros/recuentos
dentro de componentes. Ese modelo no equivale a Shipment. Las validaciones
del formulario comercial tampoco cubren las entidades de este módulo.
packages/shared contiene tipos de plantilla, sin el contrato logístico.

Implementado en [packages/logistics](../packages/logistics/README.md), separado
del paquete de tipos genéricos de plantilla. src/types y src/utils siguen la
estructura solicitada; demo, pruebas y laboratorio consumen la misma lógica.
El [laboratorio](../uis/backoffice/logistics.html) es una entrada adicional
de Vite en el backoffice existente. Sin nuevas dependencias de ejecución.

## Modelos

Copiar el contrato de tipos del BRIEFING sin traducir identificadores ni
valores de las uniones. Definir cuatro interfaces principales: Product,
Shipment, Carrier e InventoryMovement; las auxiliares Dimensions y
Destination; y ProductCategory, WarehouseLocation, ProductStatus, Country,
ShipmentPriority, ShipmentStatus y MovementType.

Verificar todos los campos contra la fuente, incluidas dimensiones anidadas,
arrays de países/prioridades, carrier: string | null y fechas Date.
Los importes son USD y la ubicación técnica es Los Angeles; una presentación
localizada puede traducir etiquetas sin alterar el modelo.
Usar objetos literales tipados para los ejemplos y un movimiento de inventario
de demostración. No se exige implementar un motor de movimientos.

## Contrato funcional y comprobaciones

Las 19 funciones están implementadas y cubiertas por
[33 pruebas](../packages/logistics/tests/logistics.test.mjs). Se conservan
las firmas publicadas, incluidos retornos objeto/null, number, Record y
objetos de resultado. El paquete pasa comprobación estricta de TypeScript.

| Archivo | Función exacta | Comprobación de aceptación |
| --- | --- | --- |
| collections.ts | filterProductsByWarehouse | Solo almacén solicitado; vacío y sin coincidencias |
| collections.ts | filterProductsByCategory | Solo categoría solicitada; categorías sin productos |
| collections.ts | filterLowStockProducts | stockQuantity <= minStockThreshold, incluida igualdad y cero |
| collections.ts | sortProductsByStock | asc/desc, empates, copia sin mutar entrada |
| collections.ts | sortCarriersByReliability | onTimeRate asc/desc; entrada intacta |
| search.ts | findProductBySKU | Búsqueda lineal sin distinguir mayúsculas; objeto/null |
| search.ts | findShipmentById | Búsqueda lineal por ID; objeto/null |
| search.ts | binarySearchProductByWeight | Peso ascendente; índice válido/-1; primero, último, único y ausente |
| transformations.ts | calculateShippingCost | Base + peso × cantidad × tarifa/kg + distancia × tarifa/km; recargos 0/30/60 % sobre subtotal; 2 decimales |
| transformations.ts | scoreCarrierForShipment | País 20, peso total 20, prioridad 15, fragilidad 15, fiabilidad × 0.3; 2 decimales |
| transformations.ts | selectBestCarrier | Admitir score >= 50; menor coste; devolver carrier/score/cost o null |
| transformations.ts | countProductsByCategory | Conteo de las cinco categorías, también las ausentes |
| transformations.ts | calculateTotalInventoryValue | Suma de stock × coste unitario; 2 decimales |
| transformations.ts | calculateAverageShipmentDistance | Media de distancias; 2 decimales; vacío documentado |
| transformations.ts | groupShipmentsByStatus | Los cinco estados con arrays independientes; conservar envíos |
| transformations.ts | findTopCarriers | Contar asignaciones, ignorar null, ordenar por uso descendente y limitar a topN |
| validations.ts | validateProduct | Todas las reglas de producto; varios errores; válido con errors vacío |
| validations.ts | validateShipment | Cantidad/valor positivos y distancia no negativa |
| validations.ts | validateCarrier | Tarifas no negativas, días/peso positivos, fiabilidad 0–100, países no vacíos |

Validación de producto: SKU no vacío; 0 < weightKg <= 100;
0 < cada dimensión <= 200; stockQuantity/minStockThreshold >= 0;
unitCostUSD > 0. Probar límites exactos y valores justo fuera de ellos.
En transportistas, probar cero en las tres tarifas y extremos 0/100 de
fiabilidad. Comprobar NaN/Infinity y datos anidados inválidos en validadores.
No inventar restricciones de enteros, formatos de SKU/ID o fechas futuras.

La binaria presupone orden ascendente por peso: la demo prepara una copia
ordenada. No ordenar dentro de la búsqueda ni sustituirla por una búsqueda
lineal. Cubrir pesos repetidos sin exigir la primera coincidencia, que la
fuente no especifica. Para SKU solo se exige ignorar mayúsculas; no aplicar
esa normalización al ID de envío por suposición.

## Cobertura adicional del enunciado general

Estas necesidades son obligatorias aunque no tengan función propia en el
BRIEFING. Los nombres de las funciones auxiliares son de implementación.

| Necesidad | Cobertura implementada y probada |
| --- | --- |
| Filtrar con varios criterios | Composición almacén/categoría/stock en UI y pruebas de intersección/vacío |
| Ordenar por múltiples campos | sortProductsByWarehouseAndStock: almacén y stock, asc/desc |
| Máximos y mínimos | calculateStockExtremes: min/max o null en vacío; demo, UI y pruebas |
| Transformaciones funcionales | map/filter/reduce en colecciones/reportes; algoritmos explícitos de búsqueda |

## Matriz de los 18 criterios de evaluación

Los 18 criterios tienen evidencia local según la tabla y el registro inferior.
La aprobación docente no se presupone. Las pruebas usan node:test, sin añadir
una librería. Los comandos reproducibles están en el README del paquete.

Reauditoría del enunciado completo: 34 checks obligatorios y los 3 opcionales
cubiertos en local. La entrega Git/campus se controla por separado y sigue
pendiente; cumplir los checks técnicos no equivale a haber entregado.

| Bloque del enunciado | Checks | Evidencia de cobertura |
| --- | --- | --- |
| Lógica | 10 | Modelos (E01), filtros (E02), orden (E03), lineal (E04), binaria (E05), agregados (E06), validación (E07), tipos (E08/E18), responsabilidad (E11), comando (E09) |
| Calidad | 6 | Nombres (E12), pureza (E16), comentarios necesarios, vacíos/nulos (E17), const/let (E18), formato consistente comprobado |
| Evaluación | 18 | E01–E18, detallados a continuación |
| Interfaz opcional | 3 | HTML/Tailwind, controles que ejecutan operaciones y resultados visibles; Generar reporte ejecuta los agregados de la selección actual |

El comando de desarrollo del backoffice sirve la página opcional; el build
la incluye como entrada real. No se requiere adoptar el ejemplo http-server
del enunciado: Vite transpila los imports TypeScript que utiliza esta página.

| ID | Criterio | Evidencia local |
| --- | --- | --- |
| E01 | Interfaces completas | Contraste de campos/uniones con fuente y comprobación de tipos |
| E02 | Filtrado correcto | Casos por criterio y combinación |
| E03 | Orden asc/desc | Resultados y no mutación; incluir múltiples campos |
| E04 | Lineal en desordenados | Casos encontrados/ausentes y revisión del algoritmo |
| E05 | Binaria índice/-1 | Casos de bordes/duplicados y revisión del algoritmo |
| E06 | Totales, medias, conteos y extremos | Resultados numéricos independientes y colecciones vacías |
| E07 | Rechazo de datos inválidos | Matriz de reglas y fronteras de validación |
| E08 | Sin errores TypeScript | Comando sobre todos los archivos nuevos y comprobaciones de apps pertinentes |
| E09 | Comando documentado | README con directorio, instalación y ejecución reproducibles |
| E10 | Archivos por responsabilidad | Árbol types/utils; imports y exports usados |
| E11 | Responsabilidad única | Revisión de funciones pequeñas con propósito concreto |
| E12 | Nombres y convenciones | camelCase/PascalCase; comentarios solo de lógica no evidente |
| E13 | Coincidencia con BRIEFING | API, campos, uniones y unidades exactos |
| E14 | Validaciones de TrackFlow | Correspondencia de cada regla con prueba |
| E15 | Reportes de TrackFlow | Ejemplos de inventario, distancias, estados y uso de transportistas |
| E16 | Pureza | Parámetros como entradas; sin estado global mutable, DOM, red o reloj implícito |
| E17 | Casos límite | Vacíos, ausencias, null válido, entradas inválidas y errores controlados |
| E18 | Buen uso de TypeScript | Parámetros/retornos explícitos; evitar any; const por defecto, let necesario, formato consistente |

La revisión de pureza incluye conservar arrays y objetos anidados de entrada.
Probar repetibilidad y entradas congeladas; los resultados no deben reutilizar
un único array mutable para todos los grupos. Las constantes inmutables de
dominio no son estado global mutable.

## Decisiones y discrepancias que deben quedar explícitas

1. Selección: aplicar literalmente score >= 50 y menor coste. El algoritmo
   permite superar el umbral sin país/peso/prioridad compatibles. Consultar
   al mentor si se desean exclusiones; no introducirlas sin aclaración ni
   presentar el resultado como recomendación operativa verificada.
2. La introducción menciona velocidad, pero avgDeliveryDays no participa en
   la fórmula concreta. No añadir pesos de velocidad ni coste al scoring.
3. Comportamientos para extremos no definidos: media vacía 0, extremos vacíos null,
   topN no positivo devuelve []; empate de coste/uso conserva orden de entrada;
   topN fraccionario o no finito se rechaza con RangeError. Estos comportamientos
   están documentados y probados; son decisiones de implementación, no reglas
   atribuidas a la fuente.
4. Record exige todas sus claves: categorías ausentes a 0 y estados ausentes
   a []. El carrier null es válido; no confundirlo con un registro roto.
5. Mantener las firmas tipadas. Los validadores deben gestionar datos de
   ejecución inválidos sin accesos inseguros, comprobar estructura/tipos y
   Date válida, sin ampliar reglas de negocio. No convertir silenciosamente
   null en una colección vacía. Definir el error controlado para entradas
   fuera de contrato; no prometer aceptación de null donde la firma lo excluye.
6. Redondear los resultados indicados a dos decimales, manteniendo retorno
   number. Fijar pruebas de decimales para evitar errores de coma flotante.

Como referencia calculada desde los ejemplos oficiales: inventario total
16975 USD; stock bajo: LAPTOP-DELL-15. Para el envío Express a Madrid:
UPS 76.4 puntos/30.89 USD, SEUR 97.6/46.22 y DHL Express 98.5/63.18.
La regla literal selecciona UPS. Estos resultados se han comprobado en pruebas
y navegador; son valores de demostración, no tarifas reales.

## Secuencia de trabajo y cierre

1. Acordar las decisiones abiertas; mantener las reglas explícitas del contrato.
2. Preparar modelos y ejemplos, luego colecciones/búsquedas, costes/scoring,
   reportes y validaciones. Cubrir también las exigencias generales adicionales.
3. Añadir pruebas significativas y demo; documentar comandos reales de tipos,
   pruebas y demo. Elegir herramientas mínimas compatibles con el entorno.
4. Verificar importación/ejecución de la lógica en navegador y desarrollo.
   Si se toca una app, comprobar arranque y pantallas móvil/escritorio.
5. Revisar esta matriz con evidencia concreta por criterio. Ejecutar checks
   relevantes y git diff --check; revisar archivos nuevos, rutas y dependencias.
6. Actualizar memoria y README, revisar diff final y subir solo tras aprobación.
   Preparar rutas explícitas; evitar git add . aunque aparezca en el ejemplo
   del campus, siguiendo la regla local de higiene.
7. PR feature/domain-models → main; entregar su URL en 4Geeks y fusionar tras
   aprobación. No dar por entregado hasta comprobar esas acciones.

## Comunicación de la entrega

Preferencia expresa del estudiante: commits y PR profesionales, breves y
precisos, sin repetir información ni narrar el historial de trabajo.

- Commit: describir el cambio concreto; separar solo bloques coherentes.
- PR: un párrafo de funcionalidades, un párrafo breve de desafíos/solución
  reales y validación con comandos/resultados. Una limitación material, si la
  hay, debe ser visible y concisa. Capturas solo si se añade la interfaz.
- Enlazar esta matriz para el detalle; no copiarla en la PR ni repetir sus
  listas. Evitar comentarios sucesivos que reformulen la descripción.
- Redactar el título y cuerpo desde la implementación final; no afirmar
  funcionalidades o checks que todavía estén pendientes.

## Comprobaciones locales realizadas

- Node 24.21.0, pnpm 11.25.0, TypeScript resuelto 6.0.3 en el paquete.
- Instalación frozen-lockfile del paquete, typecheck estricto, 33/33 pruebas
  y demo correctos. Oxlint del paquete y del backoffice correcto.
- Website: lint, 14/14 pruebas y build correctos. Backoffice: lint y build
  de ambas entradas correctos. No se midió Lighthouse en esta tarea.
- Chrome conectado por extensión: laboratorio servido desde preview 4174 y
  desarrollo 5174. Misma lógica ejecutada en navegador y Node.
- Capturas revisadas de inventario, transportistas y validaciones; escritorio
  1440, móvil 390 y transportistas a 768. Comprobado ancho 320 sin overflow;
  la captura inicial a ese ancho tuvo escala incorrecta, por lo que no se
  presenta como evidencia visual legible. Capturas nativas CDP resolvieron
  la escala del resto de vistas. Viewports restaurados al terminar.
- Filtros combinados/vacíos, reset, stock bajo, ordenación, búsquedas con
  coincidencia/ausencia, costes/scoring, validación de las tres entidades,
  JSON roto y cantidades 0/0.001 probados. Validación y cálculo con Enter.
- Corregidos reset que conservaba el listado anterior, scroll horizontal de
  navegación móvil y carga de marca/fuente compartidas en desarrollo.
- Marca y Archivo local cargadas en build y desarrollo, sin duplicar recursos.
  Sin errores/avisos de aplicación observados en consola; sin pantalla vacía
  ni overlay de error. Controles con etiquetas, foco visible y estados anunciados.
- Regresión: panel a escritorio/móvil, filtro Zaragoza (3 pedidos), búsqueda
  SEUR (1) y reset (6); landing carga y CTA abre formulario; formulario móvil
  bloquea avance vacío con errores por campo. No se repitió su envío completo.

Reauditoría posterior: releídos ambos documentos oficiales y comparadas seis
interfaces y siete uniones con el BRIEFING, sin diferencias. Detectado y
corregido un bypass de validación con arrays dispersos (posiciones vacías);
la nueva prueba falló antes de la corrección y pasa después. Aplicado formato
consistente a los archivos nuevos de código/configuración y nombres más
descriptivos en validadores. Prettier 3.6.2 se utilizó temporalmente, sin
añadirlo a dependencias. No hay any, var, TODO ni FIXME en el TypeScript nuevo.
Botón Generar reporte comprobado con Enter, selección completa/vacía y después
de reset; capturas revisadas a 1440 y 390, sin overflow ni errores de consola.
Repetidos typecheck/demo/33 pruebas y lint del paquete, lint/build de ambas
apps y 14 pruebas del website, todos correctos.

Revisión visual final: resumen con icono y chevron propios, reportes agrupados
en filas, acciones y selectores alineados con la web. Comprobados teclado,
resultados completos/vacíos, reset y anchos 320/390/1440/1920 sin overflow.
Acciones de 50px con símbolos centrados; estilo limitado al laboratorio.
Repetidas las comprobaciones anteriores después de estos cambios, correctas.

Corrección posterior al aviso del estudiante: desplegable con botón accesible
aria-expanded/aria-controls y contenido en flujo normal, sin scroll interno.
Documento con desplazamiento vertical explícito y espacio estable para la barra.
Prueba en Chrome preview 4174: abrir con Espacio, generar reporte y rueda hasta
Buscar envío, ejecutar la búsqueda y comprobar su resultado. A 1440 × 900 el
último formulario termina en y=836; a 390 × 844, en y=780: ambos accesibles y
sin overflow horizontal. Sin avisos/errores de aplicación observados.

Feedback verificado: filtro Zaragoza (1 producto), restablecer, reporte generado,
edición y recálculo de transportistas, carga de ejemplo inválido y validación
inválida/válida. Mensajes junto al resultado, role=status y check temporal en
el botón, también al repetir acciones. Repetidos lint y build del backoffice,
correctos. Las pruebas del paquete y website conservan su validación anterior;
no se han modificado sus fuentes en esta corrección.

No se certifica accesibilidad completa, lector de pantalla, móvil físico ni
otros motores. Repetidos en la preparación del commit: tipos, 33 pruebas, demo
y lint del paquete; lint/build de ambas apps y 14 pruebas del website, correctos.
La revisión visual anterior corresponde a la misma versión de las aplicaciones.
Publicación de la rama y PR autorizadas; entrega en campus pendiente.
La observación del scoring sigue visible en README y en la página;
no impide comprobar el contrato literal.

## Evidencias seleccionadas

Capturas PNG nativas de Chrome de la compilación local, sin modificaciones de
imagen. Móvil emulado a 390 × 844 con DPR 3; no representa un dispositivo físico.

| Vista | Captura | Resolución |
| --- | --- | --- |
| Inventario y reporte abierto | [Escritorio](evidence/coding-inventory-desktop.png) | 1920 × 1695 |
| Comparación de transportistas | [Escritorio](evidence/coding-carriers-desktop.png) | 1920 × 1090 |
| Validación con errores visibles | [Escritorio](evidence/coding-validation-desktop.png) | 1920 × 1129 |
| Resumen operativo y reporte | [Móvil](evidence/coding-report-mobile.png) | 1170 × 2532 |
| Última búsqueda con resumen desplegado | [Móvil](evidence/coding-scroll-mobile.png) | 1170 × 2532 |

## Borrador de PR

Título: **Implementa la lógica logística de TrackFlow**

```markdown
Añade modelos y utilidades TypeScript para inventario, envíos y transportistas,
con demo ejecutable y laboratorio responsive integrado en el backoffice.
Incluye confirmaciones de acciones y resultados accesibles.

Resuelve casos vacíos, validaciones anidadas y operaciones sin mutar los datos.
La selección de transportista conserva la fórmula oficial; su limitación de
cobertura está documentada y visible en la interfaz.

Verificado: TypeScript estricto, lint, 33 pruebas del paquete, demo, 14 pruebas
del website y builds de ambas apps. Revisión visual en escritorio y móvil.
Requisitos y capturas: [matriz de cumplimiento](docs/milestone-coding-fundamentals.md).
```

Texto preparado para GitHub; la ruta del último enlace es relativa a la raíz
del repositorio. La PR todavía no se ha creado.
