# TrackFlow — Website

Web corporativa del primer hito, construida con React, TypeScript,
Vite, Tailwind CSS y pnpm. La página principal se encuentra en `/`.

El formulario del siguiente hito está en `/application.html`, enlazado desde
los CTA del hero y la navegación. Su HTML semántico usa Tailwind y los tokens
de marca; `validation.js` implementa las reglas sin dependencias ni React
adicional en el navegador. Vite construye ambas entradas. El formulario termina
con un copyright discreto; el componente de footer visual se conserva en la landing.
`SiteFooter` integra el bloque de contacto antes de la foto y los enlaces del
pie: email comercial, ambos teléfonos y CTA a `application.html`, sin repetir
la lista de sedes. El ancla de navegación `#contacto` se conserva. Todo el
componente usa utilidades Tailwind, incluido el oscurecimiento de la fotografía.

## Diseño y recursos

Identidad vigente: [guía común](../STYLE_GUIDE.md). Base negra, naranja
#FD430B, Phudu para titulares y Archivo para lectura; cristal oscuro del nav
compartido con el backoffice. Conservar la composición y los comportamientos
aprobados al reorganizar la estructura.

Componentes reutilizables en `src/components`: navegación/pie, acciones,
servicios, globo, transportistas, titulares y beneficios interactivos.
Imágenes servidas en `public`; procedencia y limpieza en
[recursos visuales](../../docs/visual-assets.md). Son escenas ilustrativas
con IA, no fotografías de flota o instalaciones propias. Archivo y Phudu se
sirven como WOFF2 locales, con sus licencias OFL; no se consulta Google Fonts
durante la carga del website. El globo tiene fallback SVG local.

Servicios con scroll nativo reversible, adaptación a contenido ampliado y
flujo normal cuando no cabe. Se ha restaurado el recorrido original, con foto
fija, lista amortiguada y fundido entre imágenes; sus estilos son utilidades
Tailwind en ServiceJourney. Se conserva por petición expresa del estudiante;
la aceptación frente a las tres columnas del módulo sigue pendiente.
Es una decisión de diseño ratificada para mejorar el flujo; no sustituir el
recorrido sin una nueva indicación del estudiante.
La landing presenta servicios, cobertura,
beneficios y contacto; las capacidades futuras no forman parte de esta página.
`BenefitsShowcase` presenta cuatro ventajas mediante pestañas accesibles y
visuales tipográficos/SVG propios, con estilos solo en utilidades Tailwind.
Sin autoplay; cambio con flechas/Home/End, altura estable y movimiento reducido.
Movimiento reducido, foco visible, menú/Escape y salto al contenido.
El carrusel móvil continuo sin pausa conserva la limitación WCAG 2.2.2
por decisión expresa; no se certifica conformidad completa.

## Inicio y comprobaciones

### Tailwind y accesibilidad — revisión local

El formulario, beneficios y contacto usan utilidades en HTML/JSX. El resto de
estilos convencionales (acciones, tipografía, transportistas,
formulario y footer) reutiliza utilidades mediante `@apply`, conservando
medidas, colores, breakpoints y especificidad. Las variantes
min-width conservan los breakpoints aprobados y parten del layout móvil.
`App.css` usa `@reference "./index.css"` para acceder al tema sin duplicarlo.

CSS técnico conservado como excepción:

Revisión posterior mobile-first completada: hero, navegación y controles parten
de móvil y amplían mediante variantes min-width de Tailwind. También la
introducción y barra del formulario. Se conservan solo rangos técnicos de máscara,
movimiento del carrusel y poca altura; se retiraron las correcciones generales
max-width. Comprobados estilos calculados en siete anchos de landing y seis de
formulario, recorrido completo móvil/escritorio, teclado, ARIA, movimiento reducido
y colores forzados. La reducción del viewport al editar oculta/restaura la barra.
Esto no certifica un teclado físico ni anuncios en un lector de pantalla real.

- Keyframes, transformaciones y transiciones con tiempos/curvas propios,
  incluidos movimiento reducido y estados medidos por JavaScript.
- Gradientes y máscaras de fotografía, filtros de logos, backdrop-filter y
  chevron SVG; trazos y geometría animada del globo.
- Foco/outline, protección `[hidden]`, resets puntuales de borde y herencia de
  fuente, prefijos de renderizado y normalización del documento.

No quedan bloques convencionales pendientes de conversión. Se conservan
selectores de componente y queries específicas para no alterar la cascada de
los estados aprobados. La comparación antes/después revisó 3672 propiedades
calculadas de 44 selectores de landing y 10 de formulario en dos tamaños:
solo difieren las capas transparentes auxiliares de las sombras de Tailwind;
las medidas, colores y tipografías muestreadas coinciden. No es una certificación
de todos los estados ni sustituye la revisión visual.

Etiquetas/IDs/ARIA revisados en DOM, salto al contenido, menú/Escape,
selección por teclado, errores y confirmación comprobados. Al confirmar hay
un único h1 visible. Borde de campos #626262 sobre #101010: contraste 3,12:1;
placeholder #888: 5,37:1. Movimiento reducido y colores forzados verificados
con emulación, restaurada al finalizar. El carrusel sin pausa se mantiene por
decisión expresa renovada del estudiante y conserva la limitación WCAG 2.2.2.
No se certifican lector de pantalla, contraste completo sobre imágenes,
otros motores, zoom físico ni teclado/áreas seguras en un móvil real.

Desde `uis/website`:

```bash
pnpm install --frozen-lockfile
pnpm dev --host 0.0.0.0 --port 5173 --strictPort
```

En otro terminal, desde la misma carpeta:

```bash
pnpm test
pnpm lint
pnpm build
pnpm preview --host 0.0.0.0 --port 4173 --strictPort
```

En Codespaces, abrir los puertos 5173/4173 con visibilidad privada.
Para ejecución local se puede usar `--host 127.0.0.1`.
Build comprueba TypeScript, compila Vite y prerenderiza la landing. Las catorce
pruebas nativas Node revisan SEO/metadatos y validaciones; lint usa Oxlint.
No subir `node_modules`, `dist`, `.local`, logs o capturas temporales.

También se puede arrancar **desde la raíz del monorepositorio**, con las
dependencias del website ya instaladas, sin descargar otro Vite:

```bash
npx --no-install --prefix ./uis/website vite ./uis/website --host 127.0.0.1 --port 5176 --strictPort
```

Comprobado en local. En Codespaces, cambiar el host a `0.0.0.0`; la ejecución y
URL pública de ese entorno siguen pendientes de autorización para la entrega.
No se necesita copiar aplicaciones ni archivos a la raíz del monorepositorio.

## Formulario de solicitud — revisión local

Fuente: [contexto oficial del módulo](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/contexts/01-web-fundamentals/CONTEXT-trackflow.es.md).
`CONTEXT.md` general permanece intacto. Los 12 campos, opciones y mensajes
siguen ese contexto, sin integrar servicios reales ni modificar el resto del
contenido corporativo. La regla de volumen bajo se aplica a 0-100 con cualquier
tipo de producto seleccionado, incluido Otro; no se inventan categorías excluidas.

- Validación al perder foco y al editar campos ya revisados; selecciones inmediatas.
- Errores y anuncios junto a cada campo, sin repetirlos debajo de las acciones.
  La advertencia y confirmación de volumen se concentran en su bloque y botón.
- Tres pasos (contacto, operación y necesidades) con validación antes de avanzar,
  progreso visible y regreso a pasos visitados sin perder datos. El envío final
  vuelve a validar todo; las secciones ocultas quedan fuera de la navegación.
- Resumen compacto en el paso final con botones para editar contacto y operación. Botones compartidos con
  la landing mediante los estilos de acciones en `src/index.css`. Dos imágenes
  de asesoría logística, horizontal de escritorio y panorámica móvil, seleccionadas mediante `<picture>`;
  procedencia, dimensiones y prompts en [recursos visuales](../../docs/visual-assets.md).
- Cabecera alineada al contenido (máximo 1440px), ayuda de obligatorios bajo
  el título del paso y cierre discreto «© 2026 TrackFlow». El foco cambia de inmediato
  entre pasos y errores, sin desplazamiento suave en el formulario.
- Validación completa al enviar, contador de campos pendientes y enlace al primero.
  En móvil el foco va directamente al primer campo inválido; en escritorio, al resumen.
- Al menos un servicio, opción 3PL obligatoria, teléfono internacional y URL http/https opcional.
- Comentarios con límite de 500 caracteres y contador visible.
- Aviso de volumen bajo con confirmación explícita, reiniciada si cambia producto o volumen.
- Acciones fijas abajo en móvil, anterior separado y limpieza fuera de la barra.
  Espacio inferior según su altura, protección de zona segura y ocultación al abrir
  teclado (VisualViewport y fallback táctil). Escritorio conserva acciones en flujo.
  La confirmación oculta la introducción en todos los tamaños y centra una tarjeta
  compacta; nueva solicitud restaura el formulario y su introducción.
- Edición desde el resumen con «Guardar» y retorno directo, validando los pasos previos.
- Entrada breve por ratón/táctil usando WAAPI nativa; teclado y movimiento reducido
  avanzan inmediatamente. Foco y progreso visibles bajo la cabecera, sin demoras.
- Limpieza de valores, selección, errores, aviso, contador y éxito; foco en empresa.
- Confirmación de éxito del escenario. Por petición expresa del estudiante se
  retiraron los avisos visibles de demostración, incluido el desplegable de privacidad.
  Sigue siendo un envío simulado sin almacenamiento, email ni política legal de producción.
  Sin JS se desactiva el envío.

Revisar con el servidor de desarrollo o con build/preview de los comandos anteriores.
Las pruebas `scripts/validation.test.mjs` importan las mismas reglas utilizadas
por la página mediante `pnpm test`. Las capturas exploratorias se guardan fuera
del repositorio según [repository-hygiene.md](../../.agents/rules/repository-hygiene.md).
No hacer commit, push ni sincronizar con Codespaces hasta aprobación del estudiante.

## SEO, GEO y publicación

El build genera HTML estático a partir de los mismos componentes React;
el contenido principal y los tres servicios se pueden leer sin ejecutar
JavaScript. Después, React hidrata esa página para activar las interacciones.
No requiere un servidor de React en producción ni nuevas dependencias.
`siteContent.ts` comparte textos de servicios y metadatos para evitar
contradicciones. Se incluyen título, descripción, Open Graph, tarjetas
sociales y JSON-LD de `Organization` y los tres `Service` actuales;
`WebSite` se añade cuando existe dominio. Sedes limitadas a Los Ángeles
y Zaragoza con sus regiones. `Organization` incluye fundación en 2009,
direcciones, contacto comercial (teléfono, email e idiomas), LinkedIn y áreas
servidas del contexto oficial del módulo. Sin calles, códigos postales,
reseñas o métricas inventadas. El JSON-LD se genera con build/prerender y
se revisa con preview; el servidor dev conserva el head base de index.html.
Las capacidades futuras no se incluyen como servicios disponibles.

El dominio está pendiente de decisión del estudiante. Por defecto, el build
y el desarrollo llevan `noindex, nofollow`, sin canonical ni sitemap ficticios.
`robots.txt` permite leer esa directiva; no bloquea el rastreo con `Disallow`.
Esto controla indexación, no sustituye la autenticación de un entorno privado.

`Organization.url` es `https://trackflow.com`, la URL empresarial del escenario
exigida por 4Geeks; no representa un dominio de despliegue comprobado. No se usa
para rellenar `SITE_URL`, canonical, Open Graph, sitemap ni `WebSite.url`.
Estos últimos dependen exclusivamente del dominio definitivo aprobado.
Las cinco pruebas SEO incluyen el contrato de la organización en tres
configuraciones (local, dominio no indexable y publicación), las referencias
entre entidades y la separación entre URL empresarial y URL del despliegue.

Variables de build documentadas en `.env.example`:

| Variable | Uso |
| --- | --- |
| `SITE_URL` | Origen HTTPS definitivo aprobado, sin ruta, credenciales, consulta ni fragmento. Vacío mientras no se decida. |
| `SITE_INDEXABLE` | `false` para previews académicas y Codespaces. `true` solo para la publicación aprobada con dominio configurado. |

Configurar mediante variables del hosting o `.env.production.local`, que
queda ignorado por Git. Con `SITE_URL`, canonical, URLs sociales y logo
en fondo claro usan ese origen; con indexación habilitada se genera
`dist/sitemap.xml` con una sola URL y se declara en `robots.txt`.
Las anclas son secciones de la misma página, no páginas diferentes.
El build rechaza indexación sin dominio, URLs locales y hosts de Codespaces.
La imagen social reutiliza la portada limpia y se identifica como ilustrativa.
Validar sus vistas previas con el dominio definitivo antes de publicar.

GEO se aplica como contenido explícito, accesible y consistente con los
datos estructurados, siguiendo [Google Search Central sobre las funciones
de IA](https://developers.google.com/search/docs/appearance/ai-features).
No requiere un archivo especial de IA ni un marcado adicional. No se
promete posicionamiento, indexación ni citación por asistentes.
Referencias: [JavaScript y prerenderizado](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
y [datos de organización](https://developers.google.com/search/docs/appearance/structured-data/organization).
Search Console, pruebas públicas de resultados enriquecidos y rastreo
real quedan pendientes de publicación y dominio.

## Lighthouse local

Auditar el build (`pnpm build` y `pnpm preview --host 127.0.0.1 --port 4173`),
no el servidor de desarrollo. Con Chrome instalado, desde PowerShell:

```powershell
$auditDir = Join-Path $env:TEMP 'trackflow-lighthouse'
New-Item -ItemType Directory -Force -Path $auditDir | Out-Null
npx --yes lighthouse@13.5.0 http://127.0.0.1:4173/ --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path="$auditDir/landing-mobile"
npx --yes lighthouse@13.5.0 http://127.0.0.1:4173/ --preset=desktop --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path="$auditDir/landing-desktop"
```

Repetir con `/application.html` y nombres propios para el formulario.
Lighthouse se ejecuta desde npm sin añadir dependencias al proyecto. Mantener
los perfiles estándar y el reinicio de caché; conservar informes y capturas
fuera del repositorio. Resultados finales del 16/10/2026: landing 95 móvil / 100
escritorio; formulario 100 / 100. Tres mediciones consecutivas de landing móvil
dan 95 con perfiles estándar y caché reiniciada. Accesibilidad automática 100
en los cuatro perfiles. No sustituyen la evidencia pública/formato DevTools de 4Geeks.
La preview conserva `noindex` deliberadamente, aunque reduzca la nota SEO.

Archivo y Phudu se sirven sin modificaciones como WOFF2 locales y se precargan
en ambas páginas; las licencias OFL acompañan los archivos en `public/fonts`.
El globo importa su renderer y geografía al acercarse a cobertura (600px).
Servicios prepara sus fotos originales 400px antes de entrar, prioriza la activa
y conserva una foto cargada durante el fundido. Fallback estático sin JS.
Sin recomprimir imágenes ni cambiar resolución, encuadre, estilos o animaciones.

## Codespaces y entrega

Organización y verificación: [hito 1](../../docs/milestone-1.md).
Website y backoffice tienen layouts propios, en las rutas `/`, y comparten
identidad sin duplicar la landing. Sin backend en este hito.

Sincronizar fuentes, recursos usados, scripts, configuración, lockfiles,
reglas, skill, guía y memoria. No incluir dependencias instaladas, builds,
secretos o archivos temporales. Conservar CONTEXT, company-choice y
.devcontainer; no cambiarlos para una sincronización de UI.

Entrega anterior: rama `feature/agent-memory-bank`; PR hacia `main` del fork,
capturas de ambas aplicaciones y enlace directo a AGENTS. El destino
requiere verificar el fork del estudiante; no confundir sincronizar el
Codespace con publicar la rama o entregar en el campus.

PR #1 integrada en main y confirmada fusionada/cerrada el 16/10/2026.
La rama `codex/hito-2-web-publica` parte de main actualizado (f0d6d9c).
Implementación subida en `755cf92`; Codespaces actualizado a `1ea867d`, con
instalación, lint, 14 pruebas y build correctos. Preview pública:
https://super-engine-6vvqp55594jx2r9gj-3000.app.github.dev/

PageSpeed auditó el aviso de GitHub en ambos perfiles; esas notas se descartan.
[PR #2](https://github.com/rogerdevmtz/ai-engineering-trackflow/pull/2) abierta
con URL y dos capturas de Lighthouse CLI, identificadas como tales. Pendiente
aceptación docente del formato CLI o evidencia DevTools válida.
La URL requiere que el Codespace y el servidor permanezcan encendidos.

Seguir el orden de evaluación del enunciado: subir el código revisado, ejecutar
la web en Codespaces con puerto público y usar primero PageSpeed Insights sobre
esa URL. Solo si PageSpeed no puede acceder, usar Lighthouse de Chrome DevTools
o su extensión. Incluir URL pública y captura en la descripción de la PR,
entregar la URL del repositorio y fusionar la PR del hito después de su aprobación.
