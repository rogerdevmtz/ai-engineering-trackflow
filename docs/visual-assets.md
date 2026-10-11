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
| `service-packing-v1.webp` | 960×1200 | Preparación y empaquetado |
| `service-shipping-v1.webp` | 960×1200 | Expedición de pedidos |
| `service-returns-v1.webp` | 960×1200 | Revisión humana de devoluciones |

Hero WebP sin pérdida; servicios/cierre calidad 94. Originales de servicios
1122×1402. La versión manchada del camión se descartó; se recrearon las
escenas limpias. El símbolo del cierre se ajustó sobre la nueva fotografía.

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
