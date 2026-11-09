import * as logistics from './index.ts'
import {
  sampleProducts,
  sampleCarriers,
  sampleShipment,
  sampleShipments,
  sampleMovement,
} from './samples.ts'

console.log(
  JSON.stringify(
    {
      demonstration: true,
      inventoryValueUSD: logistics.calculateTotalInventoryValue(sampleProducts),
      categoryCounts: logistics.countProductsByCategory(sampleProducts),
      lowStock: logistics.filterLowStockProducts(sampleProducts).map((product) => product.sku),
      combinedFilter: logistics.filterProductsByCategory(
        logistics.filterProductsByWarehouse(sampleProducts, 'Zaragoza'),
        'Electronics',
      ),
      warehouseAndStock: logistics.sortProductsByWarehouseAndStock(sampleProducts, 'asc'),
      stockExtremes: logistics.calculateStockExtremes(sampleProducts),
      binaryIndex: logistics.binarySearchProductByWeight(
        [...sampleProducts].sort((a, b) => a.weightKg - b.weightKg),
        2.3,
      ),
      bestCarrier: logistics.selectBestCarrier(sampleCarriers, sampleShipment, sampleProducts[1]),
      averageDistanceKm: logistics.calculateAverageShipmentDistance(sampleShipments),
      shipmentsByStatus: logistics.groupShipmentsByStatus(sampleShipments),
      topCarriers: logistics.findTopCarriers(sampleShipments, 3),
      movement: sampleMovement,
    },
    null,
    2,
  ),
)
