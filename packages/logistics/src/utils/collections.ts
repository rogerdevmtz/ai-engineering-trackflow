import type { Product, Carrier, WarehouseLocation, ProductCategory } from '../types/models.ts'
import { requireCollection } from './validations.ts'

export function filterProductsByWarehouse(
  products: Product[],
  warehouse: WarehouseLocation,
): Product[] {
  requireCollection(products)
  return products.filter((product) => product.warehouse === warehouse)
}
export function filterProductsByCategory(
  products: Product[],
  category: ProductCategory,
): Product[] {
  requireCollection(products)
  return products.filter((product) => product.category === category)
}
export function filterLowStockProducts(products: Product[]): Product[] {
  requireCollection(products)
  return products.filter((product) => product.stockQuantity <= product.minStockThreshold)
}
export function sortProductsByStock(products: Product[], order: 'asc' | 'desc'): Product[] {
  requireCollection(products)
  return [...products].sort(
    (a, b) => (a.stockQuantity - b.stockQuantity) * (order === 'asc' ? 1 : -1),
  )
}
export function sortCarriersByReliability(carriers: Carrier[], order: 'asc' | 'desc'): Carrier[] {
  requireCollection(carriers)
  return [...carriers].sort((a, b) => (a.onTimeRate - b.onTimeRate) * (order === 'asc' ? 1 : -1))
}
export function sortProductsByWarehouseAndStock(
  products: Product[],
  order: 'asc' | 'desc',
): Product[] {
  requireCollection(products)
  return [...products].sort(
    (a, b) =>
      (a.warehouse.localeCompare(b.warehouse) || a.stockQuantity - b.stockQuantity) *
      (order === 'asc' ? 1 : -1),
  )
}
