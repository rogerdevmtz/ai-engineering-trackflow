import type { Product, Shipment } from '../types/models.ts'
import { requireCollection } from './validations.ts'

export function findProductBySKU(products: Product[], sku: string): Product | null {
  requireCollection(products)
  for (const product of products) {
    if (product.sku.toLowerCase() === sku.toLowerCase()) return product
  }
  return null
}
export function findShipmentById(shipments: Shipment[], id: string): Shipment | null {
  requireCollection(shipments)
  for (const shipment of shipments) {
    if (shipment.id === id) return shipment
  }
  return null
}
export function binarySearchProductByWeight(
  sortedProducts: Product[],
  targetWeight: number,
): number {
  if (!Array.isArray(sortedProducts)) throw new TypeError('Se requiere un array ordenado por peso')
  let left = 0
  let right = sortedProducts.length - 1
  while (left <= right) {
    const middle = Math.floor((left + right) / 2)
    const product = sortedProducts[middle]
    if (!product) throw new TypeError('Producto no válido')
    if (product.weightKg === targetWeight) return middle
    if (product.weightKg < targetWeight) left = middle + 1
    else right = middle - 1
  }
  return -1
}
