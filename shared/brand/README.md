# Marca compartida

`tokens.css` es la fuente de paleta, tipografías y valores de marca usada
por website y backoffice. Extraída de los tokens aprobados del website,
sin cambiar sus valores. Los layouts permanecen separados.

El backoffice importa el SVG aprobado desde
`uis/website/public/brand/trackflow-logo.svg` como recurso Vite; el build
lo incluye con hash, sin copiar ni reconstruir el dibujo en los fuentes.
La guía completa está en `uis/STYLE_GUIDE.md`.
