# TrackFlow — Resumen del proyecto

## Contexto de negocio

TrackFlow es una empresa de logística de última milla y gestión
de almacenes. Opera en Estados Unidos y España, con almacenes
en Los Ángeles y Zaragoza.

Gestiona inventario, preparación de pedidos, envíos mediante
transportistas y devoluciones para marcas de comercio electrónico.

El briefing completo de la empresa se encuentra en CONTEXT.md.
La motivación de la elección se documenta en company-choice.md.

## Problemas principales

- Los almacenes utilizan sistemas distintos y no comparten
  una visión unificada del inventario.
- La asignación de transportistas y el seguimiento de envíos
  requieren trabajo manual en varios portales.
- Las devoluciones se revisan manualmente, con criterios
  poco consistentes.
- Atención al cliente responde numerosas consultas repetitivas
  sin una base de conocimiento ni un sistema unificado de tickets.
- Los informes se elaboran manualmente con datos dispersos.

## Dirección del proyecto

Según company-choice.md, el interés principal está en última milla,
gestión de transportistas y logística inversa.

Como evolución futura, se plantea un recomendador explicable
de transportistas, seguimiento unificado y un agente de atención
al cliente que consulte estados de envíos, devoluciones y políticas,
y derive los casos necesarios a una persona.

Estas capacidades son objetivos futuros y todavía no están
implementadas.

## Alcance del primer hito

- Preparar el entorno de desarrollo en GitHub Codespaces.
- Incorporar el contexto oficial de TrackFlow.
- Crear y mantener la memoria del proyecto.
- Documentar las instrucciones de trabajo en AGENTS.md.
- Añadir una regla con alcance explícito y una skill verificable.
- Crear una web corporativa en uis/website.
- Crear un backoffice en uis/backoffice con contenido visible
  relacionado con la empresa.
- Verificar que ambas aplicaciones arrancan sin errores.
- Entregar mediante un pull request con las evidencias solicitadas.

## Límites del primer hito

No se incluye todavía la integración con transportistas reales,
un recomendador operativo, un sistema RAG ni automatizaciones
de devoluciones.

Si se muestran datos de demostración, deben identificarse como tales.

## Forma de trabajo

Explicar con claridad qué vamos haciendo y el propósito de cada cambio.
No crear copias de respaldo.

Se respetará la estructura del monorepositorio y se consultarán
sus README antes de introducir nuevas carpetas o aplicaciones.
