import type { Product, Shipment, Carrier } from '../types/models.ts'

export interface ValidationResult {
  valid: boolean
  errors: string[]
}
const categories = ['Fashion', 'Electronics', 'Cosmetics', 'Home', 'Other']
const warehouses = ['Los Angeles', 'Zaragoza']
const countries = ['United States', 'Spain']
const priorities = ['Standard', 'Express', 'Same-day']
const productStatuses = ['Active', 'Low stock', 'Out of stock', 'Discontinued']
const shipmentStatuses = ['Pending', 'Assigned', 'In transit', 'Delivered', 'Failed']
function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {}
}
function numeric(
  value: unknown,
  min: number,
  max: number = Infinity,
  exclusive: boolean = false,
): boolean {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    (exclusive ? value > min : value >= min) &&
    value <= max
  )
}
function result(checks: [boolean, string][]): ValidationResult {
  const errors = checks.filter(([valid]) => !valid).map(([, message]) => message)
  return { valid: errors.length === 0, errors }
}
function option(value: unknown, choices: string[]): boolean {
  return typeof value === 'string' && choices.includes(value)
}
function options(value: unknown, choices: string[]): boolean {
  return Array.isArray(value) && Array.from(value).every((item) => option(item, choices))
}
export function validateProduct(product: Product): ValidationResult {
  const productData = record(product)
  const dimensions = record(productData.dimensions)
  return result([
    [
      typeof productData.sku === 'string' && productData.sku.trim().length > 0,
      'sku es obligatorio',
    ],
    [typeof productData.name === 'string', 'name debe ser texto'],
    [option(productData.category, categories), 'category no válida'],
    [numeric(productData.weightKg, 0, 100, true), 'weightKg debe ser mayor que 0 y hasta 100'],
    ...['lengthCm', 'widthCm', 'heightCm'].map((key): [boolean, string] => [
      numeric(dimensions[key], 0, 200, true),
      `${key} debe ser mayor que 0 y hasta 200`,
    ]),
    [option(productData.warehouse, warehouses), 'warehouse no válido'],
    [numeric(productData.stockQuantity, 0), 'stockQuantity debe ser no negativo'],
    [numeric(productData.minStockThreshold, 0), 'minStockThreshold debe ser no negativo'],
    [numeric(productData.unitCostUSD, 0, Infinity, true), 'unitCostUSD debe ser positivo'],
    [typeof productData.isFragile === 'boolean', 'isFragile debe ser booleano'],
    [option(productData.status, productStatuses), 'status no válido'],
  ])
}
export function validateShipment(shipment: Shipment): ValidationResult {
  const shipmentData = record(shipment)
  const destination = record(shipmentData.destination)
  return result([
    [
      typeof shipmentData.id === 'string' && typeof shipmentData.sku === 'string',
      'id y sku deben ser texto',
    ],
    [numeric(shipmentData.quantity, 0, Infinity, true), 'quantity debe ser positiva'],
    [
      numeric(shipmentData.declaredValueUSD, 0, Infinity, true),
      'declaredValueUSD debe ser positivo',
    ],
    [numeric(destination.distanceKm, 0), 'distanceKm debe ser no negativa'],
    [option(shipmentData.origin, warehouses), 'origin no válido'],
    [option(destination.country, countries), 'country no válido'],
    [
      typeof destination.city === 'string' && typeof destination.postalCode === 'string',
      'city y postalCode deben ser texto',
    ],
    [option(shipmentData.priority, priorities), 'priority no válida'],
    [
      shipmentData.carrier === null || typeof shipmentData.carrier === 'string',
      'carrier debe ser texto o null',
    ],
    [option(shipmentData.status, shipmentStatuses), 'status no válido'],
    [
      shipmentData.createdAt instanceof Date && Number.isFinite(shipmentData.createdAt.getTime()),
      'createdAt debe ser una fecha válida',
    ],
  ])
}
export function validateCarrier(carrier: Carrier): ValidationResult {
  const carrierData = record(carrier)
  return result([
    [
      typeof carrierData.id === 'string' && typeof carrierData.name === 'string',
      'id y name deben ser texto',
    ],
    ...['baseRateUSD', 'ratePerKgUSD', 'ratePerKmUSD'].map((key): [boolean, string] => [
      numeric(carrierData[key], 0),
      `${key} debe ser no negativo`,
    ]),
    [numeric(carrierData.avgDeliveryDays, 0, Infinity, true), 'avgDeliveryDays debe ser positivo'],
    [numeric(carrierData.onTimeRate, 0, 100), 'onTimeRate debe estar entre 0 y 100'],
    [numeric(carrierData.maxWeightKg, 0, Infinity, true), 'maxWeightKg debe ser positivo'],
    [
      options(carrierData.operatesIn, countries) &&
        Array.isArray(carrierData.operatesIn) &&
        carrierData.operatesIn.length > 0,
      'operatesIn debe contener al menos un paíshipmentData válido',
    ],
    [typeof carrierData.handlesFragile === 'boolean', 'handlesFragile debe ser booleano'],
    [
      options(carrierData.acceptsPriority, priorities),
      'acceptsPriority debe contener prioridades válidas',
    ],
  ])
}

export function requireValid(validation: ValidationResult): void {
  if (!validation.valid) throw new TypeError(validation.errors.join('; '))
}
export function requireCollection<T>(items: T[]): void {
  if (!Array.isArray(items)) {
    throw new TypeError('Se requiere un array sin registros nulos')
  }
  for (const item of items) {
    if (item === null || item === undefined)
      throw new TypeError('Se requiere un array sin registros nulos')
  }
}
