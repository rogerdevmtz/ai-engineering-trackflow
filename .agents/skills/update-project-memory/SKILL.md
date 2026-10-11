---
name: update-project-memory
description: Actualizar la memoria de TrackFlow con decisiones y resultados verificados al cerrar una tarea.
---

# Actualizar la memoria del proyecto

## Objetivo

Mantener memory-bank coherente con el estado comprobado de TrackFlow.

## Entradas

- Solicitud y decisiones expresas del estudiante.
- Cambios de la tarea, revisados mediante diff y archivos nuevos.
- Resultados de las comprobaciones realizadas y sus limitaciones.
- Contenido actual de los tres archivos de memory-bank.

## Procedimiento

1. Leer projectbrief.md, techContext.md y progress.md.
2. Contrastar datos de negocio con CONTEXT.md; no resolver contradicciones
   mediante suposiciones.
3. Actualizar solo la memoria afectada: objetivos y alcance en projectbrief.md,
   arquitectura y comandos en techContext.md, avances y pendientes en progress.md.
4. Separar hechos comprobados, propuestas y asuntos pendientes. No atribuir
   preferencias al estudiante que no haya expresado ni repetir la guía visual.
5. Revisar coherencia, rutas y ausencia de tareas marcadas a la vez como
   completadas y pendientes.
6. Explicar los cambios y el próximo paso. Si no hay novedades, no modificar
   los archivos solo para registrar que se leyeron.

## Salida esperada

Memoria afectada actualizada y una explicación breve de los cambios,
comprobaciones y pendientes.

## Criterios de aceptación

- Todo avance indicado tiene evidencia o una comprobación identificada.
- No se presentan pruebas anteriores como ejecutadas en la tarea actual.
- Las comprobaciones no realizadas y contradicciones permanecen explícitas.
- Los tres archivos no se contradicen y progress.md indica un próximo paso.
- Los enlaces relativos modificados apuntan a archivos existentes.
- No se cambian archivos fuera de memory-bank como parte de esta skill.

## Límites

No crear respaldos, realizar commits ni publicar cambios.
Respetar AGENTS.md y explicar qué se está haciendo.
