# TrackFlow — Backoffice

Entrada básica del primer hito en `/`, con layout operativo propio:
sidebar, resumen, pedidos de ejemplo y almacenes. React, TypeScript,
Vite, Tailwind CSS y pnpm, con las mismas versiones del website.

## Ejecutar

Desde esta carpeta:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

Desarrollo en 5174 y compilado en 4174. En Codespaces, reenviar como privados.
No modificar `.devcontainer`; no requiere credenciales ni variables.

## Contenido y límites

Sedes Los Ángeles/Zaragoza, países, preparación, envíos, revisión humana
de devoluciones y transportistas proceden de `../../CONTEXT.md`.
Pedidos `DEMO-*`, unidades y estados son ficticios; el aviso de demostración
permanece visible. El bloque Almacenes actualiza pedidos y recuentos derivados;
la búsqueda filtra referencias, transportistas y estados, con recuperación
del estado vacío. Detalles desplegables accesibles con teclado.
Los cuatro recuentos filtran por estado y llevan al listado, sincronizados
con sus botones de estado visibles. Se combinan con almacén y búsqueda;
los filtros aplicados se pueden quitar individualmente. «Restablecer vista»
limpia almacén, estado y búsqueda, devolviendo el foco al buscador.
La selección de sede actualiza la vista sin saltar al listado ni mover el foco.
El único grupo de selección de almacén reúne «Todos los almacenes», Los Ángeles
y Zaragoza en la barra de contexto, sobre los recuentos de la columna central.
La opción activa utiliza radios nativos con flechas de teclado; elegir otra limpia estado
y búsqueda. «Filtrar por almacén» y «Se aplica a todo el panel» aclaran su alcance;
Todos/Ambas sedes, ciudades y países tienen bordes e indicador circular visibles.
La navegación «Almacenes» permite acceder al grupo también en móvil.

El resumen visual deriva sus cifras del mismo conjunto de ejemplos: barras
por transportista con selector Pedidos/Unidades y distribución por estado.
Ambas gráficas responden al almacén seleccionado; pulsar una barra o un
estado filtra el listado y enfoca su título. No representan datos históricos.

Las barras incorporan los cinco logos locales del website, en monocromo,
con texto alternativo y nombres accesibles. Hover/foco destacan la barra y
muestran pedidos/unidades; Escape cierra el detalle. Tap/Enter consultan
el listado. La imagen del almacén cierra la columna de estados en escritorio,
con etiqueta ilustrativa y degradado continuo; 150px de imagen en escritorio,
110px en tablet y 96px en móvil. La altura del panel se ajusta a su contenido.

Sin persistencia, autenticación, conexión a SGA, tracking real, API ni
automatizaciones. No utilizar la demo para datos operativos reales.

## Estructura e identidad vigente

- `src/components/BackofficeLayout.tsx`: sidebar, cabecera y navegación móvil.
- `Metric.tsx`, `OrderRow.tsx`: recuentos y filas reutilizables.
- `OperationsOverview.tsx`: barras, anillo, leyenda e imagen ilustrativa.
- `src/data.ts`: tipos y seis pedidos ficticios; 13 unidades, tres por sede.
- `src/status.ts`: iconos compartidos de caja, camión y documento con lupa.
- `src/App.css`: layout y tokens operativos; importa los tokens comunes de
  `shared/brand/tokens.css`.

Identidad vigente y medidas: [guía común](../STYLE_GUIDE.md).
Negro #000, paneles #080808, controles #101010 y cristal del nav público:
#080808a8, blur16, borde #ffffff1c y reflejo tenue; alternativa sólida #101010.
Archivo para títulos de trabajo y lectura. Paneles22/20 móvil, padding20/16,
gap16, botones16 con mínimo44px, títulos de panel15, acciones12 y cifras30.

Escritorio: sidebar184 contraíble a76, centro flexible y estados250;
hasta1100px se apilan gráfica, estados y pedidos. Desde761px, sidebar
inmóvil y workspace con scroll: cabecera/búsqueda y contenido se desplazan
juntos; estados sticky16 y altura natural. Tres enlaces al mismo nivel,
activo con indicador/icono naranja; sin menús anidados ni tarjeta activa.

Móvil hasta760px: logo centrado arriba; título, aviso y buscador debajo.
Navegación inferior fija con112px reservados al final. Input16px evita zoom.
Sidebar sin blur para conservar la posición del nav fijo. No hay footer
académico; el aviso global de demo identifica todos los ejemplos.

Estados: texto neutro #DEDEDE, preparación gris cálido #B8B3AF, tránsito
naranja de marca #FD430B y revisión cobre #FFB078. Caja/camión/documento-lupa
en etiquetas y leyenda; el anillo comparte colores. Conservar nombres visibles
para no depender del color. Logos con escala óptica y proporciones intactas.

Assets de marca, transportistas y almacén importados con `?url` desde
`website/public`; Vite los empaqueta y el backoffice funciona sin el servidor
website. No duplicar recursos. Procedencia: [recursos visuales](../../docs/visual-assets.md).

Teclado nativo, foco visible, movimiento reducido y colores forzados.
Transiciones de control160ms sin animación de cifras o tablas. Consulta
[verificación y entrega](../../docs/milestone-1.md) para resultados y pendientes.
