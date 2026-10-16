# Recursos visuales de TrackFlow

Los SVG aprobados están en `uis/website/public/brand`; los logos externos
mantienen su procedencia en `uis/website/public/carriers/README.md`.
Los tokens comunes viven en `shared/brand/tokens.css`. Ambas aplicaciones
reutilizan estos recursos; Vite empaqueta los imports del backoffice.

## Fotografías utilizadas

Escenas ilustrativas generadas/editadas con imagegen. No documentan flota,
personas ni instalaciones propias de TrackFlow. Fotografías en color, luz
nocturna y acentos naranja, sin filtros globales ni ampliación artificial.

| Archivo en `uis/website/public` | Dimensiones | Dirección de la imagen |
| --- | --- | --- |
| `hero-logistics-clean-v2.webp` | 1672×941 | Camión nocturno, T naranja y rotulación de ambos mercados |
| `hero-logistics-clean-mobile-v2.webp` | 941×1672 | Composición vertical propia del hero |
| `footer-logistics-v1.webp` | 1672×941 | Camión saliendo del almacén; símbolo discreto |
| `footer-logistics-mobile-v1.webp` | 941×1672 | Composición vertical propia del cierre |
| `service-storage-v1.webp` | 960×1200 | Pasillo y estanterías; también imagen del dashboard |
| `service-shipping-v1.webp` | 960×1200 | Expedición de pedidos |
| `service-returns-v1.webp` | 960×1200 | Revisión humana de devoluciones |
| `application-consultation-desktop-v1.webp` | 1200×800 | Conversación de asesoría logística, tablet y paquete; formulario en escritorio/tablet |
| `application-consultation-mobile-v1.webp` | 840×420 | Misma escena recompuesta como panorámica para móvil |

Hero y servicios WebP calidad 85, optimizados el 16/10/2026 tras Lighthouse;
se conservan dimensiones, escenas y encuadres. Hero escritorio 103046 bytes
y móvil 118556 bytes (antes 1279752 y 1313126); servicios almacén 163086,
envíos 139824 y devoluciones 93366 bytes. No se añaden variantes ni originales
al repositorio. Cierre calidad 94. Originales de servicios
1122×1402. La versión manchada del camión se descartó; se recrearon las
escenas limpias. El símbolo del cierre se ajustó sobre la nueva fotografía.

## Imágenes del formulario — 16/10/2026

Generadas con la herramienta integrada imagegen: escena horizontal y nueva
composición panorámica móvil usando la primera como referencia de continuidad.
La versión vertical inicial fue reemplazada tras la revisión del estudiante.
WebP calidad 88, aproximadamente 93 y 54 KiB; `<picture>` selecciona la panorámica
por debajo de 640px. PNG originales y capturas permanecen fuera del repositorio.
La foto de empaquetado anterior sigue usada en la sección de servicios de la landing.
Las escenas representan una consulta, sin acreditar personas, instalaciones
propias ni seguimiento operativo de TrackFlow. Sin texto ni marcas dentro de la imagen.

<details>
<summary>Prompt final de escritorio</summary>

Create one photorealistic editorial photograph for TrackFlow's logistics consultation / information-request form. Landscape 3:2 composition. A genuine collaborative moment between an e-commerce business owner and a logistics advisor at a dark charcoal desk beside a warehouse: two adult professionals, one woman in charcoal workwear and one man in a dark overshirt, natural engaged expressions, leaning slightly toward each other as the advisor points to an unbranded tablet showing an abstract simple orange and white delivery planning interface (no legible text). A small neat kraft parcel and an orange tape dispenser sit in the foreground. Their faces, natural hands, tablet and parcel form a compact clear focal group in the central 70 percent; medium shot, intimate eye-level three-quarter viewpoint, enough space around subjects for responsive framing. Background: softly blurred warehouse shelves with kraft boxes, subtle warm orange practical lights. Visual language: cinematic dark photography, rich true blacks, neutral charcoal, warm cardboard browns, restrained vivid orange #FD430B accents, realistic skin and tactile materials, premium service conversation, calm and approachable rather than posed stock-photo handshake. Illuminate faces and hands with soft warm directional light, keep detail readable without a black overlay. No text, no logos, no watermark, no UI frame, no collages. This is an illustrative generated scene, not real TrackFlow premises. Image itself only, ready for a 570px wide landscape panel beside a form.

</details>

<details>
<summary>Prompt final móvil (con la escena horizontal como referencia)</summary>

Create a new MOBILE wide-banner composition of the attached logistics consultation photograph, using it as a visual continuity reference. A photorealistic cinematic editorial photo in a panoramic 2:1 horizontal aspect ratio. Same man and woman in charcoal work clothes, same dark warehouse and restrained orange lighting. Show a clearly professional consultation: the advisor presenting a tablet with abstract orange-white delivery planning shapes to the client, both faces naturally engaged and separated, a small kraft parcel visible on the desk between them. Keep BOTH faces, the complete tablet and the parcel in a compact central group; compose them side by side, with generous safe space at the top and bottom so a wide 2:1 crop loses no essential content. Medium shot, upper bodies visible, natural hands, realistic tactile skin/fabric/cardboard. The tablet and parcel must read instantly at a 350px-wide mobile banner. Warm soft directional light, rich charcoal blacks, #FD430B accents, no dark overlay, no text, logos or watermark. Output one wide photograph only, not a portrait, not a collage.

</details>

`globe-land.json` y fallback `globe-atlantic.svg` derivan de Natural Earth,
[datos de dominio público](https://www.naturalearthdata.com/about/terms-of-use/).
El arco es ilustrativo, no una ruta comercial ni tracking real.

## Limpieza del 11/10/2026

Retirados del árbol de entrega: conceptos rasterizados del logo, espécimen
de fuente, másteres PNG, prompts de iteración, investigación histórica,
JPG antiguos del hero, recursos Vite/React de plantilla, `icons.svg` sin uso
y capturas temporales de `website/review`. Se conservan los recursos utilizados,
las variantes SVG aprobadas, fuentes/configuración/lockfiles y evidencias del hito.

El 11/10/2026 se retiraron a la Papelera el respaldo local de limpieza y
los dos ZIP locales de transferencia, por petición del estudiante.
El estudiante eliminó manualmente los dos respaldos temporales de Codespaces.
Se comprobó que ambas rutas ya no existen y que las dos aplicaciones permanecen.
Las copias temporales no sustituyen Git.
No mover recursos servidos sin actualizar sus referencias y comprobar build.

## Fuentes locales — optimización de carga del 16/10/2026

Se conservan exactamente las familias y binarios WOFF2 que Google Fonts servía
al website. Sin subsetting, cambios de contornos, pesos activos ni recompresión.
Ambos contienen áéíóúüñ/ÁÉÍÓÚÜÑ/¿¡ y admiten todos los pesos 400–700 usados.

| Archivo en uis/website/public/fonts | Bytes | Uso |
| --- | ---: | --- |
| archivo-latin-variable.woff2 | 34940 | Archivo en lectura/controles; @font-face compartido y preload en ambas páginas |
| phudu-latin-variable.woff2 | 26532 | Phudu en titulares; @font-face compartido y preload en ambas páginas |
| Archivo-OFL.txt | 4388 | Copyright y licencia requeridos para distribuir Archivo |
| Phudu-OFL.txt | 4386 | Copyright y licencia requeridos para distribuir Phudu |

Binarios originales:
- https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2
- https://fonts.gstatic.com/s/phudu/v6/0FlaVPSHk0ya-5mYUB4uZw8h.woff2

Licencias originales:
- https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/phudu/OFL.txt

Solo cambia la distribución de las fuentes. No se han editado fotografías,
resoluciones, logotipos, encuadres o calidad de imagen en esta optimización.
