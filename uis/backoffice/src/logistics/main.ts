import './style.css'
import logoUrl from '../../../website/public/brand/trackflow-logo.svg?url'
import iconUrl from '../../../website/public/favicon.svg?url'
import fontUrl from '../../../website/public/fonts/archivo-latin-variable.woff2?url'
import * as logistics from '../../../../packages/logistics/src/index.ts'
import {
  sampleProducts,
  sampleCarriers,
  sampleShipment,
  sampleShipments,
} from '../../../../packages/logistics/src/samples.ts'
import type {
  Product,
  Shipment,
  Carrier,
  WarehouseLocation,
  ProductCategory,
  ShipmentPriority,
} from '../../../../packages/logistics/src/index.ts'

function element<T extends HTMLElement>(id: string): T {
  const found = document.getElementById(id)
  if (!found) throw new Error(`Elemento ausente: ${id}`)
  return found as T
}
function value(id: string): string {
  return element<HTMLInputElement>(id).value
}
function text(id: string, content: string): void {
  element(id).textContent = content
}
const actionFeedback = new WeakMap<
  HTMLButtonElement,
  { timer: ReturnType<typeof setTimeout>; path: string }
>()
function confirmAction(button: HTMLButtonElement | null): void {
  if (!button) return
  const icon = button.querySelector<SVGPathElement>('.action-symbol path')
  if (!icon) return
  const previous = actionFeedback.get(button)
  if (previous) clearTimeout(previous.timer)
  const path = previous?.path ?? icon.getAttribute('d') ?? ''
  button.dataset.complete = 'true'
  icon.setAttribute(
    'd',
    icon.ownerSVGElement?.getAttribute('viewBox') === '0 0 24 24'
      ? 'm6 12 4 4 8-10'
      : 'm4 8 3 3 5-6',
  )
  const timer = setTimeout(() => {
    icon.setAttribute('d', path)
    delete button.dataset.complete
    actionFeedback.delete(button)
  }, 1600)
  actionFeedback.set(button, { timer, path })
}
function decorateActions(): void {
  document.querySelectorAll<HTMLButtonElement>('.primary, .secondary').forEach((button) => {
    const label = document.createElement('span')
    label.textContent = button.textContent?.trim() ?? ''
    const symbol = document.createElement('span')
    symbol.className = 'action-symbol'
    symbol.setAttribute('aria-hidden', 'true')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const isReset = button.type === 'reset' || button.id === 'valid-example'
    svg.setAttribute('viewBox', isReset ? '0 0 24 24' : '0 0 16 16')
    path.setAttribute(
      'd',
      isReset ? 'M9 4L4 9l5 5 M4 9h10a6 6 0 0 1 0 12h-3' : 'M3 8h9M8.5 3.5 13 8l-4.5 4.5',
    )
    svg.append(path)
    symbol.append(svg)
    button.replaceChildren(label, symbol)
  })
}
const usd = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' })
element<HTMLImageElement>('lab-logo').src = logoUrl
element<HTMLLinkElement>('lab-icon').href = iconUrl
const archivo = new FontFace('Archivo', `url("${fontUrl}")`, { weight: '400 700', display: 'swap' })
document.fonts.add(archivo)
void archivo.load().catch(() => {
  document.fonts.delete(archivo)
})
function card(title: string, lines: string[]): HTMLElement {
  const article = document.createElement('article')
  article.className = 'panel'
  const heading = document.createElement('h3')
  heading.className = 'break-words font-semibold'
  heading.textContent = title
  article.append(heading)
  for (const line of lines) {
    const p = document.createElement('p')
    p.className = 'mt-2 text-sm text-neutral-400'
    p.textContent = line
    article.append(p)
  }
  return article
}
function selectedProducts(): Product[] {
  let products = sampleProducts
  if (value('warehouse'))
    products = logistics.filterProductsByWarehouse(
      products,
      value('warehouse') as WarehouseLocation,
    )
  if (value('category'))
    products = logistics.filterProductsByCategory(products, value('category') as ProductCategory)
  if (element<HTMLInputElement>('low-stock').checked)
    products = logistics.filterLowStockProducts(products)
  products =
    value('sort') === 'warehouse'
      ? logistics.sortProductsByWarehouseAndStock(products, 'asc')
      : logistics.sortProductsByStock(products, value('sort') === 'stock-desc' ? 'desc' : 'asc')
  return products
}
function renderInventory(): void {
  const products = selectedProducts()
  element('products').replaceChildren(
    ...products.map((product) =>
      card(product.name, [
        product.sku,
        `${product.warehouse === 'Los Angeles' ? 'Los Ángeles' : product.warehouse} · ${product.weightKg} kg`,
        `${product.stockQuantity} unidades · mínimo ${product.minStockThreshold}`,
        product.stockQuantity <= product.minStockThreshold ? 'Stock bajo' : 'Stock disponible',
      ]),
    ),
  )
  if (!products.length)
    element('products').append(
      card('No hay productos con estos filtros', [
        'Restablece la selección para ver los ejemplos.',
      ]),
    )
  text('product-count', `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`)
  text('inventory-value', usd.format(logistics.calculateTotalInventoryValue(products)))
  const limits = logistics.calculateStockExtremes(products)
  text('stock-extremes', limits ? `${limits.min} / ${limits.max} uds.` : 'Sin datos')
  text('average-distance', `${logistics.calculateAverageShipmentDistance(sampleShipments)} km`)
  const top = logistics.findTopCarriers(sampleShipments, 1)[0]
  text('top-carrier', top ? `${top.carrier} · ${top.count} envíos` : 'Sin asignaciones')
  text('reports', 'Pulsa Generar reporte para consultar los datos de la selección actual.')
  text('report-feedback', '')
}
function renderReports(products: Product[]): void {
  const categoryNames = {
    Fashion: 'Moda',
    Electronics: 'Electrónica',
    Cosmetics: 'Cosmética',
    Home: 'Hogar',
    Other: 'Otros',
  }
  const statusNames = {
    Pending: 'Pendientes',
    Assigned: 'Asignados',
    'In transit': 'En tránsito',
    Delivered: 'Entregados',
    Failed: 'Fallidos',
  }
  const categoryRows = Object.entries(logistics.countProductsByCategory(products)).map(
    ([key, count]): [string, number] => [categoryNames[key as ProductCategory], count],
  )
  const statusRows = Object.entries(logistics.groupShipmentsByStatus(sampleShipments)).map(
    ([key, shipments]): [string, number] => [
      statusNames[key as keyof typeof statusNames],
      shipments.length,
    ],
  )
  element('reports').replaceChildren(
    reportGroup('Productos de la selección', categoryRows),
    reportGroup('Envíos de demostración', statusRows),
  )
  text(
    'report-feedback',
    `Reporte generado: ${products.length} productos y ${sampleShipments.length} envíos de demostración.`,
  )
}
function reportGroup(title: string, rows: [string, number][]): HTMLElement {
  const group = document.createElement('section')
  const heading = document.createElement('h3')
  heading.textContent = title
  const list = document.createElement('dl')
  for (const [label, count] of rows) {
    const row = document.createElement('div')
    const term = document.createElement('dt')
    term.textContent = label
    const description = document.createElement('dd')
    description.textContent = String(count)
    row.append(term, description)
    list.append(row)
  }
  group.append(heading, list)
  return group
}
function renderCarriers(): void {
  const product = logistics.findProductBySKU(sampleProducts, value('shipment-product'))!
  const shipment: Shipment = {
    ...sampleShipment,
    sku: product.sku,
    origin: product.warehouse,
    quantity: Number(value('quantity')),
    priority: value('priority') as ShipmentPriority,
    destination: { ...sampleShipment.destination, distanceKm: Number(value('distance')) },
  }
  const validation = logistics.validateShipment(shipment)
  if (!validation.valid) {
    text('carrier-choice', validation.errors.join('. '))
    element('carrier-results').replaceChildren()
    return
  }
  const best = logistics.selectBestCarrier(sampleCarriers, shipment, product)
  element('carrier-results').replaceChildren(
    ...logistics
      .sortCarriersByReliability(sampleCarriers, 'desc')
      .map((carrier) =>
        card(carrier.name, [
          `${logistics.scoreCarrierForShipment(carrier, shipment, product)} / 100 puntos`,
          usd.format(logistics.calculateShippingCost(shipment, product, carrier)),
          carrier.operatesIn.includes(shipment.destination.country)
            ? 'Opera en el país de destino'
            : 'No opera en el país de destino',
          `${carrier.onTimeRate}% de entregas a tiempo`,
        ]),
      ),
  )
  text(
    'carrier-choice',
    best
      ? `Selección del ejercicio: ${best.carrier.name} · ${usd.format(best.cost)}`
      : 'No hay transportistas con puntuación suficiente.',
  )
}
function loadValidation(invalid: boolean = false): void {
  const entity = value('entity')
  const example =
    entity === 'product'
      ? { ...sampleProducts[1], ...(invalid ? { weightKg: 0, stockQuantity: -1 } : {}) }
      : entity === 'shipment'
        ? { ...sampleShipment, ...(invalid ? { quantity: 0 } : {}) }
        : { ...sampleCarriers[0], ...(invalid ? { onTimeRate: 120, operatesIn: [] } : {}) }
  element<HTMLTextAreaElement>('json-input').value = JSON.stringify(example, null, 2)
  text(
    'validation-result',
    invalid
      ? 'Ejemplo inválido cargado. Pulsa Validar datos para revisar sus errores.'
      : 'Ejemplo cargado. Pulsa Validar datos para comprobarlo.',
  )
}
function validateJSON(): void {
  try {
    const data: unknown = JSON.parse(value('json-input'))
    let validation: logistics.ValidationResult
    if (value('entity') === 'product') validation = logistics.validateProduct(data as Product)
    else if (value('entity') === 'carrier') validation = logistics.validateCarrier(data as Carrier)
    else {
      const shipment =
        data && typeof data === 'object' ? ({ ...data } as Shipment) : (data as Shipment)
      if (shipment && typeof shipment.createdAt === 'string')
        shipment.createdAt = new Date(shipment.createdAt)
      validation = logistics.validateShipment(shipment)
    }
    text(
      'validation-result',
      validation.valid
        ? 'Datos válidos. No se han guardado ni enviado.'
        : `Datos no válidos: ${validation.errors.join('. ')}.`,
    )
  } catch {
    text('validation-result', 'JSON no válido. Revisa las comillas, las comas y la estructura.')
  }
}
document.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach((button) =>
  button.addEventListener('click', () => {
    for (const id of ['inventory', 'carriers', 'validation'])
      element(id).hidden = id !== button.dataset.panel
    document
      .querySelectorAll('[data-panel]')
      .forEach((tab) => tab.setAttribute('aria-pressed', String(tab === button)))
  }),
)
element('report-toggle').addEventListener('click', () => {
  const trigger = element<HTMLButtonElement>('report-toggle')
  const open = trigger.getAttribute('aria-expanded') !== 'true'
  trigger.setAttribute('aria-expanded', String(open))
  element('report-content').hidden = !open
})

element('inventory-filters').addEventListener('change', () => {
  renderInventory()
  const count = selectedProducts().length
  text(
    'inventory-feedback',
    `Filtros aplicados: ${count} ${count === 1 ? 'producto' : 'productos'}. Recuentos actualizados.`,
  )
})
element('generate-report').addEventListener('click', () => renderReports(selectedProducts()))
element('inventory-filters').addEventListener('reset', (event) => {
  event.preventDefault()
  element<HTMLSelectElement>('warehouse').value = ''
  element<HTMLSelectElement>('category').value = ''
  element<HTMLSelectElement>('sort').value = 'stock-asc'
  element<HTMLInputElement>('low-stock').checked = false
  renderInventory()
  text('inventory-feedback', 'Filtros restablecidos. Mostrando todos los productos.')
})
element('sku-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const product = logistics.findProductBySKU(sampleProducts, value('sku-query'))
  text(
    'sku-result',
    product ? `${product.name} · ${product.stockQuantity} unidades` : 'Producto no encontrado.',
  )
})
element('weight-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const sorted = [...sampleProducts].sort((a, b) => a.weightKg - b.weightKg)
  const index = logistics.binarySearchProductByWeight(sorted, Number(value('weight-query')))
  text(
    'weight-result',
    index >= 0
      ? `${sorted[index].sku} · índice ${index} en la lista ordenada por peso`
      : 'No hay un producto con ese peso (índice -1).',
  )
})
element('shipment-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const shipment = logistics.findShipmentById(sampleShipments, value('shipment-query'))
  text(
    'shipment-result',
    shipment
      ? `${shipment.id} · ${shipment.status} · ${shipment.destination.city}`
      : 'Envío no encontrado.',
  )
})
for (const product of sampleProducts) {
  const option = new Option(product.name, product.sku)
  option.selected = product.sku === sampleShipment.sku
  element<HTMLSelectElement>('shipment-product').add(option)
}
element('carrier-form').addEventListener('submit', (event) => {
  event.preventDefault()
  renderCarriers()
  text('carrier-feedback', 'Cálculo completado. Consulta los resultados debajo.')
})

element('carrier-form').addEventListener('input', () => {
  text(
    'carrier-feedback',
    'Datos modificados. Pulsa Calcular opciones para actualizar los resultados.',
  )
})

element('json-input').addEventListener('input', () => {
  text('validation-result', 'Datos modificados. Pulsa Validar datos para comprobarlos.')
})
element('validation-form').addEventListener('submit', (event) => {
  event.preventDefault()
  validateJSON()
})
element('entity').addEventListener('change', () => loadValidation())
element('invalid-example').addEventListener('click', () => loadValidation(true))
element('valid-example').addEventListener('click', () => loadValidation())
decorateActions()
document.addEventListener('submit', (event) => {
  if (event.defaultPrevented)
    confirmAction((event as SubmitEvent).submitter as HTMLButtonElement | null)
})
document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('.secondary')
  if (button) confirmAction(button)
})
renderInventory()
renderCarriers()
loadValidation()
