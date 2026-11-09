# TrackFlow — Lógica logística

Utilidades TypeScript para inventario, envíos y transportistas.
Datos y tarifas de demostración; sin integraciones externas.

## Ejecutar desde la raíz del repositorio

Requiere Node.js 24 y pnpm. No hay dependencias de ejecución. TypeScript es
la única dependencia de desarrollo; Node ejecuta los archivos TS nativamente.

```sh
pnpm --dir packages/logistics install --frozen-lockfile
pnpm --dir packages/logistics typecheck
pnpm --dir packages/logistics test
pnpm --dir packages/logistics demo
```

La demo muestra inventario, selección, reportes y un movimiento ficticio.
Pruebas con node:test, incluidas fronteras, redondeo, vacíos y no mutación.
Para revisar la interfaz, utilizar la aplicación existente:

```sh
pnpm --dir uis/backoffice install --frozen-lockfile
pnpm --dir uis/backoffice dev
```

Abrir http://localhost:5174/logistics.html. El build/preview del backoffice
también incluye esta página en el puerto 4174. Vite importa los mismos módulos
que las pruebas y la demo; no hay una segunda implementación de las reglas.

## Organización y uso

src/types/models.ts contiene el contrato de datos; src/utils separa
colecciones, búsqueda, transformaciones y validación. src/index.ts exporta
la API. src/samples.ts alimenta demo, pruebas y página de laboratorio.

```ts
import { filterLowStockProducts } from './src/index.ts'
import { sampleProducts } from './src/samples.ts'

const lowStock = filterLowStockProducts(sampleProducts)
```

Conservar unidades USD/kg/cm/km y valores técnicos del contrato. Fechas Date
en memoria; convertir texto ISO a Date al recibir JSON. Antes de procesar
entradas externas, usar validateProduct/validateShipment/validateCarrier.
Devuelven valid y todos los errores detectados sin lanzar por datos inválidos.
Las operaciones de costes y reportes validan sus registros y lanzan TypeError
cuando no satisfacen el contrato. Los filtros/búsquedas reciben registros ya
validados; las colecciones nulas están fuera de sus firmas. No se modifican
arrays ni objetos de entrada; los filtros pueden compartir sus referencias.

## Casos límite

- Búsquedas lineales: objeto/null; SKU ignora mayúsculas, ID es exacto.
- Binaria: índice/-1 sobre peso ascendente; duplicados admiten cualquier
  índice coincidente. No ordena internamente y conserva complejidad logarítmica.
- Vacíos: listas [], totales/media 0, extremos de stock null; categorías y
  estados incluyen todas las claves con 0/[].
- topN entero finito; si es <= 0 devuelve []. Fraccionarios/no finitos lanzan
  RangeError. Empates en uso o coste conservan el orden de entrada.
- Los números de negocio deben ser finitos; no se añaden restricciones de
  enteros, formatos de identificador o fechas futuras ausentes del contrato.
- Los validadores de países/prioridades y las comprobaciones de colecciones
  rechazan arrays con posiciones vacías, además de registros nulos.
- La selección aplica score >= 50 y menor coste. La cobertura geográfica,
  el peso y la prioridad puntúan; no son exclusiones adicionales. Con los
  ejemplos se selecciona UPS para Madrid (76.4, 30.89 USD), aunque su ficha
  solo cubre US. Es el resultado literal del ejercicio, pendiente de aclaración
  docente si se pretende una regla operativa distinta.

No se usan APIs de Node, React, DOM ni red en la biblioteca. Los ejemplos
incluyen fechas fijas; las funciones dependen de sus parámetros. La página
usa controles nativos y Tailwind del backoffice, sin librerías nuevas.
