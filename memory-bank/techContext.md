# TrackFlow — Contexto técnico

Actualizado el 16/10/2026. Negocio y alcance: [projectbrief.md](projectbrief.md).

## Stack y organización

React 19, TypeScript 6, Vite 8, Tailwind CSS 4 y pnpm.
Las dependencias y scripts están en el package.json de cada aplicación;
las versiones resueltas, en su pnpm-lock.yaml.

- `uis/website`: web corporativa con entrada en `/`.
- `uis/website/application.html`: solicitud B2B con 12 campos y envío simulado;
  `validation.js` se utiliza en esa página y en las pruebas Node.
- `uis/backoffice`: dashboard con entrada en `/` y layout propio.
- `shared/brand/tokens.css`: tokens compartidos de identidad.
- `uis/STYLE_GUIDE.md`: diseño y comportamiento aprobados de ambas interfaces.
- `.agents/rules` y `.agents/skills`: configuración del agente de desarrollo.
- `agents` y `skills`: carpetas de producto de la plantilla, con otro propósito.
- `docs/milestone-1.md`: requisitos y evidencias del hito.
- `services`: ubicación prevista para backend; no hay backend implementado.

Conservar la estructura de la plantilla y consultar los README de cada carpeta.
No añadir dependencias sin una necesidad de la tarea.

## Ejecución

Instalar desde cada aplicación con `pnpm install --frozen-lockfile`.

| Aplicación | Desarrollo | Comprobaciones |
| --- | --- | --- |
| Website | `pnpm dev --host 0.0.0.0 --port 5173 --strictPort` | `pnpm lint`, `pnpm test`, `pnpm build` |
| Backoffice | `pnpm dev` (5174) | `pnpm lint`, `pnpm build` |

Los README de las apps documentan preview y sus puertos.
En Codespaces, mantener privados los puertos del proyecto salvo la preview
del website que el estudiante autorizó hacer pública para PageSpeed y entrega.
No versionar node_modules, dist, archivos .local, logs ni secretos.
No crear copias de respaldo, según la instrucción del estudiante.

## Decisiones de implementación

Las aplicaciones tienen layouts separados y comparten identidad.
Website reutiliza utilidades Tailwind con @apply para estructura, acciones,
tipografía y controles; App.css referencia index.css mediante @reference.
Estilos convencionales convertidos. Las excepciones de CSS técnico (gráficos,
movimiento, foco, normalización y compatibilidad) se detallan en README.
El backoffice importa recursos de `website/public` con `?url`;
Vite los empaqueta, sin necesitar el servidor del website.

El dashboard usa pedidos ficticios definidos en `src/data.ts`, con aviso
visible de demostración. Filtros, búsqueda y gráficas trabajan sobre esos
mismos ejemplos. No hay persistencia, autenticación ni conexión a sistemas reales.

El website distingue servicios del briefing y capacidades futuras.
Su build prerenderiza HTML; los metadatos usan `src/siteContent.ts`.
Por defecto lleva noindex, sin dominio público inventado. Las variables
SITE_URL y SITE_INDEXABLE están documentadas en `.env.example`.
El JSON-LD de build incluye los campos de Organization exigidos por el módulo
(fundación, direcciones/regiones, contacto, LinkedIn, URL y países). Su URL
empresarial del escenario no configura la canonical ni el dominio del despliegue.
Website sirve Archivo/Phudu como WOFF2 locales, con OFL en public/fonts;
fuentes, imágenes y geografía no requieren servicios externos en ejecución.

Vite construye `index.html` y `application.html` como entradas independientes;
el prerender de la landing continúa. El formulario es HTML con Tailwind
y JavaScript nativo, sin nuevas dependencias, persistencia ni transmisión.
`pnpm test` ejecuta catorce pruebas: cinco SEO y nueve de validación. Las reglas
del formulario proceden del contexto oficial del módulo enlazado en el README;
no se ha modificado el briefing general protegido.
El README del website documenta además un arranque npx desde la raíz,
comprobado en local con el Vite instalado; no requiere un runner ni app duplicada.

El formulario muestra tres pasos, valida cada uno antes de avanzar y todos
al enviar. Conserva datos al retroceder sin persistencia; el paso final permite
revisarlos y volver a editar contacto u operación. Usa dos WebP de asesoría
logística, seleccionados con picture (panorámica bajo 640px). Los estilos de acciones
se comparten desde `src/index.css`, sin duplicar su definición en `App.css`.
La edición desde el resumen vuelve directamente a él tras validar. Entradas de
paso con WAAPI nativa, cancelables y desactivadas para teclado/movimiento reducido;
sin librerías nuevas. El reinicio restablece también required del grupo de servicios.
Las acciones móviles se fijan al pie: ResizeObserver reserva su altura real y
VisualViewport detecta la reducción por teclado, con fallback de foco táctil si
esa API no existe. La confirmación oculta la introducción en todos los tamaños
y centra una tarjeta de altura natural mediante CSS, sin popup ni librerías.

`SiteFooter.tsx` se utiliza en la landing e integra la sección #contacto como
primer bloque, con tres enlaces mailto/tel y CTA a application.html. Cada fila
completa contiene título, dato y flecha, con numeración decorativa; las sedes
del contacto enlazan a sus teléfonos. Cobertura conserva sus anclas propias.
Su layout, foto/oscurecimiento y firma usan utilidades Tailwind en JSX; retirados
los selectores CSS anteriores del footer. El formulario lleva solo un copyright
discreto en HTML; no usa footer visual, hook de Vite ni render de React para
su cierre. Se retiraron las variantes y el código de render del footer que
habían quedado sin uso. Los estilos comunes permanecen en `src/index.css`.

Trabajar en local hasta aprobación del estudiante. Antes de subir, justificar
el uso de cada archivo nuevo y preparar solo rutas explícitas según
[repository-hygiene.md](../.agents/rules/repository-hygiene.md).

Paleta, medidas, estados, iconos y movimiento están en
[STYLE_GUIDE.md](../uis/STYLE_GUIDE.md); no duplicarlos en la memoria.
Resultados de comprobaciones y pendientes: [progress.md](progress.md).

Lighthouse local: ejecutar CLI 13.5.0 sobre el build servido en 4173, con perfiles
estándar mobile/desktop y caché reiniciada; comandos en README de website.
Herramienta temporal vía npm, sin dependencia del proyecto. Informes fuera del
repositorio. Hero y tres fotos de servicios usan WebP calidad 85 con las mismas
dimensiones y rutas; procedencia y pesos en docs/visual-assets.md.

`BenefitsShowcase.tsx` implementa los cuatro beneficios mediante pestañas React,
roving tabindex, paneles con altura compartida y visuales tipográficos/SVG propios.
Todos sus estilos son utilidades Tailwind en JSX, sin CSS nuevo ni estilos inline.
No añade dependencias, imágenes, autoplay ni capacidades operativas nuevas.

`ServiceJourney.tsx` conserva la lógica original de scroll nativo, medición,
amortiguación y selección por clic/teclado. Sus estilos se expresan ahora con
utilidades Tailwind en JSX, sin selectores CSS del recorrido en App.css.
Se retiró la variante temporal ServiceCards; no hay componentes o recursos
adicionales para las versiones descartadas. El estudiante pidió recuperar
exactamente la composición original, dejando pendiente el criterio de tres
columnas del módulo. No se han cambiado los textos de siteContent en esta tarea.

Revisión mobile-first completada: App.css e index.css usan base móvil y variantes
min-width Tailwind para hero/nav/controles e introducción/barra del formulario.
Quedan queries/rangos técnicos de máscara, movimiento del carrusel y poca altura.
Recorrido de servicios conservado como decisión de diseño expresa para mejorar
el flujo, sin tarea local de sustituirlo. Confirmación del formulario enlaza su
correo con mailto. Verificaciones y limitaciones actuales: progress.md y
 docs/milestone-2.md. Sin nuevas dependencias ni cambios de negocio.

Optimización de carga para objetivo 95: mismos WOFF2 Archivo/Phudu locales con
preload en index.html/application.html y @font-face en index.css. OFL incluidas,
sin nuevas dependencias. PresenceGlobe importa renderer y geografía en paralelo
cuando está a 600px del viewport; su SVG de fallback y animación se conservan.
ServiceJourney prepara fotos originales a 400px, prioriza la activa, conserva
la última cargada y trata imágenes en caché; fallback de primera foto sin JS.
No se editan fotos, resoluciones, encuadres, estilos ni tiempos de animación.
Lighthouse final estándar: landing 95/100 y formulario 100/100; móvil de landing
repetido tres veces a 95. Informes CLI completos fuera del repositorio. Evidencia de entrega actual:
dos capturas Chrome DevTools de la landing pública, 99 móvil / 100 escritorio,
en docs/evidence y PR #2. Sustituyen los PNG CLI; SEO 66 por noindex de preview.
