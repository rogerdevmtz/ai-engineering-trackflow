# TrackFlow — Website

Web corporativa del primer hito, construida con React, TypeScript,
Vite, Tailwind CSS y pnpm. La página principal se encuentra en `/`.

## Diseño y recursos

Identidad vigente: [guía común](../STYLE_GUIDE.md). Base negra, naranja
#FD430B, Phudu para titulares y Archivo para lectura; cristal oscuro del nav
compartido con el backoffice. Conservar la composición y los comportamientos
aprobados al reorganizar la estructura.

Componentes reutilizables en `src/components`: navegación/pie, acciones,
servicios, globo, transportistas, titulares y explorador de capacidades.
Imágenes servidas en `public`; procedencia y limpieza en
[recursos visuales](../../docs/visual-assets.md). Son escenas ilustrativas
con IA, no fotografías de flota o instalaciones propias. Fuentes de Google
Fonts requieren conexión. El globo tiene fallback SVG local.

Servicios con scroll nativo reversible, adaptación a contenido ampliado y
flujo normal cuando no cabe. Capacidades futuras identificadas, desplegables
y criterios explicativos: no implementan IA, tracking ni integraciones reales.
Movimiento reducido, foco visible, menú/Escape y salto al contenido.
El carrusel móvil continuo sin pausa conserva la limitación WCAG 2.2.2
por decisión expresa; no se certifica conformidad completa.

## Inicio y comprobaciones

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
Build comprueba TypeScript, compila Vite y prerenderiza HTML. Las cuatro
pruebas nativas Node revisan SEO/metadatos; lint usa Oxlint.
No subir `node_modules`, `dist`, `.local`, logs o capturas temporales.

## SEO, GEO y publicación

El build genera HTML estático a partir de los mismos componentes React;
el contenido principal y los cuatro servicios se pueden leer sin ejecutar
JavaScript. Después, React hidrata esa página para activar las interacciones.
No requiere un servidor de React en producción ni nuevas dependencias.
`siteContent.ts` comparte textos de servicios y metadatos para evitar
contradicciones. Se incluyen título, descripción, Open Graph, tarjetas
sociales y JSON-LD de `Organization` y los cuatro `Service` actuales;
`WebSite` se añade cuando existe dominio. Sedes limitadas a Los Ángeles
y Zaragoza, sin teléfonos, direcciones completas, reseñas o métricas inventadas.
Las capacidades futuras no se incluyen como servicios disponibles.

El dominio está pendiente de decisión del estudiante. Por defecto, el build
y el desarrollo llevan `noindex, nofollow`, sin canonical ni sitemap ficticios.
`robots.txt` permite leer esa directiva; no bloquea el rastreo con `Disallow`.
Esto controla indexación, no sustituye la autenticación de un entorno privado.

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

## Codespaces y entrega

Organización y verificación: [hito 1](../../docs/milestone-1.md).
Website y backoffice tienen layouts propios, en las rutas `/`, y comparten
identidad sin duplicar la landing. Sin backend en este hito.

Sincronizar fuentes, recursos usados, scripts, configuración, lockfiles,
reglas, skill, guía y memoria. No incluir dependencias instaladas, builds,
secretos o archivos temporales. Conservar CONTEXT, company-choice y
.devcontainer; no cambiarlos para una sincronización de UI.

Rama de entrega `feature/agent-memory-bank`; PR hacia `main` del fork,
capturas de ambas aplicaciones y enlace directo a AGENTS. El destino
requiere verificar el fork del estudiante; no confundir sincronizar el
Codespace con publicar la rama o entregar en el campus.
