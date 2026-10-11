# TrackFlow — Contexto técnico

Actualizado el 11/10/2026. Negocio y alcance: [projectbrief.md](projectbrief.md).

## Stack y organización

React 19, TypeScript 6, Vite 8, Tailwind CSS 4 y pnpm.
Las dependencias y scripts están en el package.json de cada aplicación;
las versiones resueltas, en su pnpm-lock.yaml.

- `uis/website`: web corporativa con entrada en `/`.
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
En Codespaces, mantener privados los puertos del proyecto.
No versionar node_modules, dist, archivos .local, logs ni secretos.
No crear copias de respaldo, según la instrucción del estudiante.

## Decisiones de implementación

Las aplicaciones tienen layouts separados y comparten identidad.
El backoffice importa recursos de `website/public` con `?url`;
Vite los empaqueta, sin necesitar el servidor del website.

El dashboard usa pedidos ficticios definidos en `src/data.ts`, con aviso
visible de demostración. Filtros, búsqueda y gráficas trabajan sobre esos
mismos ejemplos. No hay persistencia, autenticación ni conexión a sistemas reales.

El website distingue servicios del briefing y capacidades futuras.
Su build prerenderiza HTML; los metadatos usan `src/siteContent.ts`.
Por defecto lleva noindex, sin dominio público inventado. Las variables
SITE_URL y SITE_INDEXABLE están documentadas en `.env.example`.
Fuentes de Google Fonts requieren conexión; imágenes y geografía son locales.

Paleta, medidas, estados, iconos y movimiento están en
[STYLE_GUIDE.md](../uis/STYLE_GUIDE.md); no duplicarlos en la memoria.
Resultados de comprobaciones y pendientes: [progress.md](progress.md).
