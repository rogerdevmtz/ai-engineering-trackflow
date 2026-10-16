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
| Nav | Marca, Inicio/Servicios/Cobertura/Contacto y CTA; fijo, cristal oscuro | Marca, CTA compacto y menú; hasta 360px CTA disponible en hero |
| Hero | Imagen panorámica; H1 en el espacio oscuro | Imagen vertical hasta 520px; dos CTA juntos |
| Transportistas | Cinco logos monocromos | Carrusel continuo hasta 760px; estático con movimiento reducido |
| Servicios | Encabezado/foto fijos y lista de tres servicios que avanza | Foto arriba, etapa debajo; flujo normal si no cabe |
| Cobertura | Globo y dos columnas: Los Ángeles/EE. UU. y Zaragoza/España | Sedes apiladas, composición centrada |
| Beneficios | Cuatro pestañas y panel con texto/visual en dos columnas | Pestañas en cuadrícula 2×2, texto y visual apilados |
| Contacto | Parte superior del footer: titular/CTA juntos y tres filas de datos a la derecha | Titular/CTA, email y teléfonos compactos debajo |
| Footer | Contacto integrado, servicios y firma sobre foto nocturna; derechos y LinkedIn | Composición a la izquierda, foto vertical y cierre apilado |

Contenedor máximo 1440px, ancho `calc(100% - 112px)`; hasta 1100px,
`calc(100% - 64px)`; hasta 760px, 20px por lado. H2 de servicios,
operación y beneficios comparten escala 44–76px, 44–60px en móvil.
Conservar un H1, destinos de las anclas y servicios reutilizables.
Hero sin filtros globales ni sombras de texto; fundir solo los bordes.
Titular del módulo en tres líneas: «Logística que / escala con tu / e-commerce»,
con la última naranja. Subtítulo completo y CTA «Solicitar información» al
formulario; secundaria «Ver cobertura» conserva el ancla `#operacion`.
Contacto enlaza a `#contacto`, sección al inicio de `SiteFooter`, con correo,
teléfonos de ambas sedes y CTA al formulario separado. El pie conserva servicios,
foto y firma; se retira la lista de sedes repetida y el enlace a sí mismo.
Escala móvil del hero ajustada para evitar una cuarta línea.
Servicios: Gestión de almacenes (incluye picking y packing), Entregas de última
milla y Logística inversa. Tres escenas existentes, numeración 01–03 y enlaces
del footer coherentes. El enlace histórico `#preparacion` selecciona almacenes.
Se conserva el recorrido visual aprobado; no se cambia a tres columnas estáticas.
El estudiante ratificó el 16/10/2026 recuperar exactamente este recorrido,
descartando también la variante de tres columnas con énfasis por scroll.
Su composición se expresa con utilidades Tailwind en ServiceJourney;
la medición y amortiguación originales siguen en JavaScript.
Cobertura mantiene globo, anclas y sedes. Los Ángeles muestra cobertura nacional
y UPS/FedEx/DHL; Zaragoza, cobertura peninsular e islas y MRW/SEUR/DHL.
Texto de transportistas destacado dentro de cada sede, sin nuevos logos ni tarjetas.
Beneficios entre cobertura y contacto: equipo (unos 130 profesionales), operación
binacional, tecnología propia y especialización e-commerce. `BenefitsShowcase`
adapta el patrón de pestañas/panel de la referencia Automora, conservando la
identidad TrackFlow. Primer panel humano para continuar la cobertura geográfica.
Visuales tipográficos y SVG propios: equipo, US/ES, desarrollo y sectores; sin
fotografías nuevas ni métricas inventadas. Tecnología propia describe el equipo
y sus herramientas, sin prometer visibilidad total. Todo el estilo nuevo usa
utilidades Tailwind en JSX, sin CSS personalizado ni estilos inline.
Cuatro pestañas desde 768px, dos columnas por debajo; panel dividido desde
1024px y apilado antes. Altura compartida para evitar saltos entre paneles.
Flechas/Home/End, foco visible y un solo panel accesible; fundido de opacidad
200ms con la curva existente, inmediato por teclado o movimiento reducido.
Sin autoplay, scroll fijado ni nuevas dependencias.
Refinamiento posterior: pestañas abiertas sobre una línea divisoria, una única
superficie de panel y visuales sin tarjeta interior. Sin contador ni frases de
cierre repetidas: un titular, un párrafo y un visual por ventaja. La cifra
aproximada aparece solo en el visual humano; los sectores, solo junto a sus
iconos. Visuales informativos accesibles y circuito tecnológico decorativo.
Panel de 350px en escritorio y composición móvil más compacta; ajustar cifra
y puntos bajo 360px sin desbordamiento. Conservar solo detalles que aporten
información o jerarquía, evitando acumular etiquetas, marcos y separadores.
Contacto usa mailto/tel y áreas de al menos 44px. Titular Phudu de 44px en móvil
y 56px desde sm, con CTA justo debajo. Desde 1024px, bloque de titular a la
izquierda y address a la derecha; antes se apilan. Tres filas abiertas con
numeración naranja 01–03, títulos Phudu y datos en Archivo, siguiendo el
lenguaje del recorrido de servicios. Cada fila completa enlaza al correo o
al teléfono de la sede; flecha horizontal con el mismo trazado de ActionLink.
Línea naranja y círculo de acción responden a hover/foco; movimiento reducido
anula transiciones. Sin tarjetas de sedes ni un bloque independiente de email.
Se conservan 80px tras beneficios en móvil / 112px en escritorio, 48px
verticales de contacto / 64px desde lg y 48px antes del bloque fotográfico.
El cierre muestra «© 2026 TrackFlow. Todos los derechos reservados.» y LinkedIn
en pestaña nueva con nombre accesible explícito. Foto responsive, oscurecimiento
y firma grande conservados en un bloque visual propio bajo contacto.
Todo SiteFooter usa utilidades Tailwind; no quedan sus selectores CSS antiguos.

Acciones `ActionLink`/`RollingLabel`: principal naranja, secundaria con
borde. Áreas de interacción de al menos 44px; CTA visual del nav móvil
38px dentro de un enlace de 44px. Nav con marca de 128px en escritorio
y 96–108px en móvil. Firma grande del footer al 92% de opacidad.

Movimiento: hero por líneas 850ms con desfase de 80ms; titulares por
opacidad ligada al scroll; botones/letras 240ms. Servicios con scroll
nativo reversible, amortiguación 88ms escritorio / 64ms móvil y fundido
520ms; teclado inmediato. Si el contenido no cabe, poca altura o movimiento
reducido, usar flujo normal. La sección de capacidades futuras fue retirada
por decisión del estudiante; no mostrar el explorador conceptual en la landing.

Globo: recorrido ilustrativo único de 4.5s, máximo 24fps, pausa fuera de
pantalla/pestaña oculta. Carrusel móvil: 62s continuo, sin botón de pausa
por decisión expresa; se suspende fuera de vista y queda estático con
movimiento reducido. Este comportamiento conserva una limitación WCAG 2.2.2;
no afirmar conformidad completa.

## Formulario del website — propuesta local del 16/10/2026

En `/application.html`, conservar negro/naranja, Archivo/Phudu, marca SVG y
cabecera de cristal oscuro. Escena de asesoría logística con tablet y paquete,
identificada como ilustración en alt: horizontal bajo la introducción en escritorio,
junto al texto en tablet y como fondo del titular y su párrafo en móvil.
Dos columnas desde 1024px: introducción fija a la
izquierda y formulario a la derecha; flujo único en móvil y tablet.
Tres pasos: contacto, operación y necesidades, con progreso, validación antes
de avanzar, regreso sin pérdida de datos y resumen compacto antes de enviar,
con accesos a editar contacto y operación.
Un único indicador de progreso en una superficie oscura compartida; el paso
actual tiene fondo elevado y número naranja. Sin contador «Paso X de 3»
ni separador repetido debajo. En móvil, números sobre etiquetas para evitar cortes.
Cabecera del formulario alineada con el ancho interior del contenido, máximo
1440px. Ayuda de campos obligatorios bajo el título del paso. Introducción más
breve e imagen con texto superpuesto en móvil, en un bloque de altura mínima
300px y radio 22px. Degradado oscuro de arriba abajo para leer el título y párrafo
en la parte inferior sin ocultar las caras arriba. El texto sigue siendo HTML,
con un único h1; el bloque crece si el contenido lo necesita.
El formulario termina con un copyright
discreto «© 2026 TrackFlow», sin foto ni firma grande al pie. La landing conserva
su footer visual completo.
Dos imágenes propias del formulario, sin caption visible; mantener su
identificación como ilustración en alt y documentación. Sin eyebrow genérico
«Solicitud de información» sobre el titular. Desplazamiento inmediato al cambiar
el foco entre pasos o errores; el scroll suave de la landing se conserva.
Columnas en proporción 40/60 con un espacio de 56–80px, alineadas arriba.
Titular limitado a 60px e imagen horizontal en marco 8:5 para equilibrar la
altura del bloque izquierdo con los controles del primer paso.
«Volver al inicio», «Anterior» y «Continuar/Enviar» usan el mismo sistema de
acciones de la landing; sus estilos comunes residen ahora en `src/index.css`.
Controles con utilidades Tailwind, altura mínima 48px, radio 16px y texto 16px;
el borde de entradas/selects es #626262 sobre #101010 para mejorar su identificación
(3,12:1). El foco naranja y los estados de error permanecen. La confirmación
utiliza h1; solo un encabezado principal está visible en cada estado.
Selects nativos con chevron SVG decorativo de 16px, centrado verticalmente y a
16px del borde derecho, con 48px reservados para evitar solaparlo con el texto.
En colores forzados se restaura la flecha nativa del sistema.
Etiquetas persistentes y ejemplos de formato dentro de los campos como placeholder.
Nombre y apellido, teléfono internacional, email y URL no repiten ayuda debajo;
los errores y el contador de comentarios conservan su espacio cuando corresponde.
opciones seleccionadas con borde naranja. Errores en el tono de foco `#FF9A73`,
con mensaje y `aria-invalid`, sin depender solo del color. Resumen de errores con
contador y acceso al primer campo pendiente; foco directo al campo en móvil.
Cada error se muestra y anuncia junto a su campo, sin copiarlo al pie de las
acciones. El aviso de volumen y su botón concentran su advertencia y confirmación.
Acción principal a todo el ancho disponible en móvil, junto a «Anterior» cuando
corresponde. Bajo 640px, las acciones se fijan al borde inferior en una barra
oscura con separador y padding que incluye safe-area-inset-bottom. La limpieza
queda fuera de la barra, al final del contenido. Reservar la altura real de las
acciones más 16px al final de la página y en el desplazamiento de foco para
mantener campos, errores, privacidad y footer accesibles. Ocultar la barra al
reducirse el viewport por el teclado y recuperarla al cerrarse. Éxito y aviso de
volumen usan la misma paleta. En revisión local; pendiente aprobación del estudiante.

Al cambiar de paso, el foco va al título y el progreso queda bajo la cabecera
cuando estaba fuera de vista. Evitar sumar scroll-padding y scroll-margin.
Con ratón/táctil, entrada direccional de 8px y opacidad durante 180ms con
`--ease-out`, mediante WAAPI; cancelar la entrada anterior al navegar de nuevo.
Teclado y movimiento reducido cambian de paso inmediatamente. Controles con
transiciones de borde/fondo/color de 160ms; hover solo con puntero fino.
Respuesta de presión discreta en acciones, sin transformar el foco de teclado.
Por debajo de 360px, primario y anterior ocupan filas completas para evitar cortes.
Editar desde el resumen cambia el primario a «Guardar» y regresa directamente
al resumen tras validar ambos pasos y la confirmación de volumen.
Confirmación en una superficie oscura con check naranja y mensaje del hito.
En todos los tamaños se oculta la introducción y se muestra una única tarjeta
centrada, de ancho máximo 720px y altura determinada por el contenido.
Sin columnas, altura forzada ni espacio elástico entre mensaje y acción.
Botón «Nueva solicitud» del mismo sistema de acciones. Por petición expresa del
estudiante, el formulario y la confirmación no muestran textos de demostración.
En la confirmación, mostrar solo el cierre bajo la navegación; restaurar la
introducción y el formulario con «Nueva solicitud».
La barra fija y su espacio reservado desaparecen al confirmar.

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

## Revisión responsive y accesibilidad del 16/10/2026

Recorrido original ratificado como decisión de diseño para mejorar el flujo.
Se conserva su composición e interacción; no sustituirlo por columnas.
Hero, menú, marca, controles, cobertura e introducción/barra del formulario
parten ahora de móvil y amplían con variantes min-width Tailwind, manteniendo
medidas, tipografía, imágenes y colores aprobados. Rangos de máscara, movimiento
y poca altura son ajustes técnicos. Email de confirmación enlazado con mailto.
Comprobados foco, teclado, ARIA, tres pasos, movimiento reducido y colores
forzados en navegador. La limitación del carrusel sin pausa se mantiene;
no se certifican lector de pantalla real ni pruebas en móvil físico.

## Carga optimizada — objetivo de rendimiento 95

Las mismas fuentes Archivo y Phudu del website se sirven como WOFF2 locales
con preload; sus licencias OFL acompañan los archivos. No cambia la tipografía.
El recorrido prepara sus fotos originales 400px antes de entrar, prioriza la
activa y conserva una foto cargada mientras llega la siguiente. El globo se
prepara a 600px con su renderer/geografía y mantiene fallback, duración y pausa
fuera de vista. No cambian imágenes, dimensiones, calidad, encuadre, scroll,
amortiguación, fundidos ni tiempos de animación. Formulario conserva sus estados.
