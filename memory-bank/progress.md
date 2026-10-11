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

Próximo paso: el estudiante revisa la PR #1 y entrega su URL en el campus.
