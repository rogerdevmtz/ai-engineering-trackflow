# Identidad visual de TrackFlow

## Alcance

Aplicar al crear, modificar o revisar interfaces y documentación visual
relacionada con `uis/website` y `uis/backoffice`.

## Fuentes y aplicación

Leer [STYLE_GUIDE.md](../../uis/STYLE_GUIDE.md) antes de cambiar la UI.
Los componentes y tokens del código son la referencia de implementación;
las instrucciones expresas del estudiante prevalecen sobre la guía.

- Reutilizar la paleta y tipografías de `shared/brand/tokens.css`.
- Mantener el fondo negro, acento naranja y cristal oscuro definidos en la guía.
- Conservar proporciones de los SVG de marca y documentar la procedencia
  de imágenes y logos externos. Las escenas ilustrativas no son pruebas
  de instalaciones o flota propia de TrackFlow.
- Reutilizar componentes de acción y estilos existentes. Mantener los layouts
  propios de website y backoffice, evitando duplicar recursos o controles.
- Conservar los comportamientos aprobados, anclas, nombres accesibles,
  foco visible y adaptación a movimiento reducido.
- Identificar pedidos ficticios y capacidades futuras según
  [company-content.md](company-content.md).

## Verificación y mantenimiento

Comprobar las vistas afectadas en escritorio y móvil, teclado, desbordamiento,
imágenes y consola. Ejecutar las comprobaciones pertinentes del README.
Registrar qué se verificó y qué queda pendiente; compilar no valida por sí
solo el diseño ni acredita conformidad completa con accesibilidad.

Si cambia una decisión visual aprobada, actualizar STYLE_GUIDE.md y la memoria
afectada, evitando repetir medidas y reglas de movimiento en varios documentos.
