import type {
  Product,
  Shipment,
  Carrier,
  ProductCategory,
  ShipmentStatus,
} from '../types/models.ts'
import {
  requireCollection,
  requireValid,
  validateProduct,
  validateShipment,
  validateCarrier,
} from './validations.ts'

function round(value: number): number {
  return Math.round((value + Number.EPSILON * Math.abs(value)) * 100) / 100
}
export function calculateShippingCost(
  shipment: Shipment,
  product: Product,
  carrier: Carrier,
): number {
  requireValid(validateShipment(shipment))
  requireValid(validateProduct(product))
  requireValid(validateCarrier(carrier))
  const multiplier = { Standard: 1, Express: 1.3, 'Same-day': 1.6 }[shipment.priority]
  return round(
    (carrier.baseRateUSD +
      product.weightKg * carrier.ratePerKgUSD * shipment.quantity +
      shipment.destination.distanceKm * carrier.ratePerKmUSD) *
      multiplier,
  )
}
export function scoreCarrierForShipment(
  carrier: Carrier,
  shipment: Shipment,
  product: Product,
): number {
  requireValid(validateShipment(shipment))
  requireValid(validateProduct(product))
  requireValid(validateCarrier(carrier))
  return round(
    (carrier.operatesIn.includes(shipment.destination.country) ? 20 : 0) +
      (product.weightKg * shipment.quantity <= carrier.maxWeightKg ? 20 : 0) +
      (carrier.acceptsPriority.includes(shipment.priority) ? 15 : 0) +
      (!product.isFragile || carrier.handlesFragile ? 15 : 0) +
      carrier.onTimeRate * 0.3,
  )
}
export function selectBestCarrier(
  carriers: Carrier[],
  shipment: Shipment,
  product: Product,
): { carrier: Carrier; score: number; cost: number } | null {
  requireCollection(carriers)
  requireValid(validateShipment(shipment))
  requireValid(validateProduct(product))
  // El contrato usa el umbral de puntuación, sin exclusiones adicionales por país.
  return carriers
    .map((carrier) => ({
      carrier,
      score: scoreCarrierForShipment(carrier, shipment, product),
      cost: calculateShippingCost(shipment, product, carrier),
    }))
    .filter((candidate) => candidate.score >= 50)
    .reduce<{ carrier: Carrier; score: number; cost: number } | null>(
      (best, candidate) => (!best || candidate.cost < best.cost ? candidate : best),
      null,
    )
}
export function countProductsByCategory(products: Product[]): Record<ProductCategory, number> {
  requireCollection(products)
  products.forEach((product) => requireValid(validateProduct(product)))
  return products.reduce<Record<ProductCategory, number>>(
    (counts, product) => {
      counts[product.category] += 1
      return counts
    },
    { Fashion: 0, Electronics: 0, Cosmetics: 0, Home: 0, Other: 0 },
  )
}
export function calculateTotalInventoryValue(products: Product[]): number {
  requireCollection(products)
  products.forEach((product) => requireValid(validateProduct(product)))
  return round(
    products.reduce((total, product) => total + product.stockQuantity * product.unitCostUSD, 0),
  )
}
export function calculateAverageShipmentDistance(shipments: Shipment[]): number {
  requireCollection(shipments)
  shipments.forEach((shipment) => requireValid(validateShipment(shipment)))
  return shipments.length
    ? round(
        shipments.reduce((total, shipment) => total + shipment.destination.distanceKm, 0) /
          shipments.length,
      )
    : 0
}
export function groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]> {
  requireCollection(shipments)
  shipments.forEach((shipment) => requireValid(validateShipment(shipment)))
  return shipments.reduce<Record<ShipmentStatus, Shipment[]>>(
    (groups, shipment) => {
      groups[shipment.status].push(shipment)
      return groups
    },
    { Pending: [], Assigned: [], 'In transit': [], Delivered: [], Failed: [] },
  )
}
export function findTopCarriers(
  shipments: Shipment[],
  topN: number,
): Array<{ carrier: string; count: number }> {
  requireCollection(shipments)
  shipments.forEach((shipment) => requireValid(validateShipment(shipment)))
  if (!Number.isInteger(topN) || !Number.isFinite(topN))
    throw new RangeError('topN debe ser un entero finito')
  if (topN <= 0) return []
  const counts = shipments.reduce((totals, shipment) => {
    if (shipment.carrier !== null)
      totals.set(shipment.carrier, (totals.get(shipment.carrier) ?? 0) + 1)
    return totals
  }, new Map<string, number>())
  return [...counts]
    .map(([carrier, count]) => ({ carrier, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)
}
export function calculateStockExtremes(products: Product[]): { min: number; max: number } | null {
  requireCollection(products)
  products.forEach((product) => requireValid(validateProduct(product)))
  if (!products.length) return null
  return products.reduce(
    (limits, product) => ({
      min: Math.min(limits.min, product.stockQuantity),
      max: Math.max(limits.max, product.stockQuantity),
    }),
    { min: Infinity, max: -Infinity },
  )
}
