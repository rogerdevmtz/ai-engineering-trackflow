# TrackFlow — Identidad visual vigente

Estado aprobado: 11/10/2026. Fuente de negocio: [CONTEXT](../CONTEXT.md).
Esta guía describe el resultado actual de website y backoffice; sustituye
las medidas y variantes de revisiones anteriores. Aplicar la
[regla de identidad](../.agents/rules/visual-identity.md) antes de cambiar UI.

## Sistema común

Negro profundo, superficies casi negras, tipografía blanca/gris y naranja
para acciones y énfasis. Mantener la identidad al reorganizar componentes.
No introducir fondos marrones, degradados decorativos ni nuevos colores
semánticos sin una necesidad aprobada.

Fuente de tokens: [shared/brand/tokens.css](../shared/brand/tokens.css).

| Uso | Valor |
| --- | --- |
| Fondo | `#000000` |
| Superficie | `#080808` |
| Controles / superficie elevada | `#101010` |
| Borde base | `#252525` |
| Texto principal | `#FFFFFF` |
| Texto secundario | `#A8A8A8` |
| Texto de apoyo | `#BDBDBD` |
| Acento | `#FD430B` |
| Foco visible | `#FF9A73` |

Archivo para lectura y controles; Phudu para titulares de marketing.
El dashboard usa Archivo también en títulos operativos. El logotipo es
un SVG de trazados: no sustituirlo por texto de una fuente ni deformarlo.
Variantes aprobadas y proporciones: [marca vectorial](website/public/brand/README.md).

## Cristal oscuro

La referencia material es el nav de la web principal:

- Fondo sólido de alternativa `#101010`.
- Con soporte: `#080808a8`, `backdrop-filter: blur(16px)` y prefijo WebKit.
- Borde `1px solid #ffffff1c`; reflejo `inset 0 1px 0 #ffffff0a`.
- Radios website 22px / 18px móvil; paneles operativos 22px / 20px móvil.
- Una superficie compartida para filtro y recuentos; hijos transparentes
  sin duplicar desenfoque, marcos o sombras.
- Workspace transparente sobre negro. El contraste procede del borde,
  el reflejo y las superficies de control, sin aclarar todo el lienzo.

## Website

| Zona | Escritorio | Móvil |
| --- | --- | --- |
| Nav | Marca, tres enlaces y CTA; fijo, cristal oscuro | Marca, CTA compacto y menú; hasta 360px CTA disponible en hero/menú |
| Hero | Imagen panorámica; H1 en el espacio oscuro | Imagen vertical hasta 520px; dos CTA juntos |
| Transportistas | Cinco logos monocromos | Carrusel continuo hasta 760px; estático con movimiento reducido |
| Servicios | Encabezado/foto fijos y lista que avanza | Foto arriba, etapa debajo; flujo normal si no cabe |
| Operación | Globo y dos sedes | Composición centrada |
| Evolución | Esquema izquierdo y desplegables derechos | Esquema dentro del apartado hasta 980px |
| Footer | Enlaces y firma sobre foto nocturna | Grupos centrados; foto vertical hasta 760px |

Contenedor máximo 1440px, ancho `calc(100% - 112px)`; hasta 1100px,
`calc(100% - 64px)`; hasta 760px, 20px por lado. H2 de servicios,
operación y evolución comparten escala 44–76px, 44–60px en móvil.
Conservar un H1, destinos de las anclas y servicios reutilizables.
Hero sin filtros globales ni sombras de texto; fundir solo los bordes.

Acciones `ActionLink`/`RollingLabel`: principal naranja, secundaria con
borde. Áreas de interacción de al menos 44px; CTA visual del nav móvil
38px dentro de un enlace de 44px. Nav con marca de 128px en escritorio
y 96–108px en móvil. Firma grande del footer al 92% de opacidad.

Movimiento: hero por líneas 850ms con desfase de 80ms; titulares por
opacidad ligada al scroll; botones/letras 240ms. Servicios con scroll
nativo reversible, amortiguación 88ms escritorio / 64ms móvil y fundido
520ms; teclado inmediato. Si el contenido no cabe, poca altura o movimiento
reducido, usar flujo normal. Evolución: apertura/fundido 280ms y explicación
200ms; un apartado abierto como máximo, sin autoplay.

Globo: recorrido ilustrativo único de 4.5s, máximo 24fps, pausa fuera de
pantalla/pestaña oculta. Carrusel móvil: 62s continuo, sin botón de pausa
por decisión expresa; se suspende fuera de vista y queda estático con
movimiento reducido. Este comportamiento conserva una limitación WCAG 2.2.2;
no afirmar conformidad completa.

## Backoffice

Tres zonas desde 1101px: sidebar 184px, centro flexible y distribución
por estado de 250px. Shell con margen/gap 16px, máximo 1600px.
Sidebar contraíble a 76px, con símbolo aprobado y nombres accesibles.
Tres enlaces al mismo nivel: Resumen, Pedidos y Almacenes; selección con
marca de 2px e icono naranja, sin árbol, tarjetas anidadas ni rótulo extra.

Desde 761px, shell de `100svh`: sidebar inmóvil, workspace con scroll propio.
Cabecera, buscador y contenido se desplazan juntos; distribución con sticky
16px y altura natural. Hasta 1100px se apilan gráfica, estados y pedidos.
Hasta 760px: margen 12px, nav superior solo con logo centrado, título/aviso
y búsqueda debajo, navegación inferior fija y 112px reservados al final.
El sidebar móvil no tiene blur para no capturar la navegación fija.

| Medida operativa | Valor |
| --- | --- |
| Padding de panel | 20px / 16px móvil |
| Separación | 16px |
| Controles | Mínimo 44px; radio 16px |
| H1 | 26px; 23px tablet; 24px móvil |
| H2 de panel | 15px |
| Acciones / datos de fila | 12px |
| Metadatos | 11px |
| Cifras | 30px, números tabulares |
| Input móvil | 16px para evitar zoom |
| Foto ilustrativa | 150px desktop / 110px tablet / 96px móvil |

Filtro único de almacén antes de recuentos, con radios Todos/Los Ángeles/
Zaragoza y ayuda de alcance. Seleccionar sede actualiza todo el panel y
limpia estado/búsqueda sin mover foco. Métricas, barras y leyenda filtran
y enfocan pedidos. Búsqueda única; filtros eliminables, recuperación del
vacío y reset que devuelve foco al buscador. No repetir datos o avisos.

### Estados e iconos

| Estado | Acento | Icono | Fondo / borde |
| --- | --- | --- | --- |
| Preparación | `#B8B3AF` gris cálido | Caja | `#B8B3AF0D` / `#B8B3AF33` |
| En tránsito | `#FD430B` naranja de marca | Camión | `#FD430B14` / `#FD430B45` |
| Revisión de devolución | `#FFB078` cobre claro | Documento con lupa | `#FFB07810` / `#FFB07840` |

Texto común `#DEDEDE`; acentos en iconos y segmentos del anillo.
Etiquetas, leyenda y gráfica comparten tokens de `src/App.css` y mapeo
`src/status.ts`. Nombres visibles conservan significado sin depender del
color. No usar azul/amarillo/coral de las variantes descartadas.
Iconos de etiqueta 14px; leyenda 16px. Sin colores de éxito para pedidos
que todavía no están entregados.

Logos de transportistas monocromos, proporciones intactas y franja común
44px. Escala óptica escritorio: DHL/SEUR 84px, FedEx 64px, MRW 68px
(alto 24px), UPS 27×32px. Móvil: 58/44/48px (alto 20px), UPS 22×27px.
Barras neutras con énfasis naranja en hover/foco; tooltip cerrable con Escape.
No animar cifras ni tablas. Transiciones de control 160ms; movimiento
reducido las anula. Conservar foco visible y colores forzados.

## Recursos y verificación

Solo recursos servidos y variantes vectoriales aprobadas en `website/public`;
backoffice los importa con `?url`, sin duplicarlos ni necesitar el servidor
website. Tokens en `shared/brand`; evidencias de entrega en `docs/evidence`.
Procedencia: [docs/visual-assets.md](../docs/visual-assets.md).
Másteres, conceptos descartados y capturas temporales quedan fuera del repo.

Verificar ambos layouts, teclado, filtros, detalles, menú, anclas, imágenes,
consola y desbordamiento. Ejecutar lint/build y pruebas disponibles.
No certificar WCAG completa, tracking real o IA implementada: pedidos demo
y capacidades futuras deben permanecer identificados.
