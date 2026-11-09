import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as f from '../src/index.ts'
import {
  sampleProducts as products,
  sampleCarriers as carriers,
  sampleShipment as shipment,
  sampleShipments,
  sampleMovement,
} from '../src/samples.ts'

const product = products[1]
function freeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze)
    Object.freeze(value)
  }
  return value
}
test('official examples satisfy the three validators and the movement model is exercised', () => {
  products.forEach((p) => assert.deepEqual(f.validateProduct(p), { valid: true, errors: [] }))
  carriers.forEach((c) => assert.deepEqual(f.validateCarrier(c), { valid: true, errors: [] }))
  assert.equal(f.validateShipment(shipment).valid, true)
  assert.equal(sampleMovement.sku, product.sku)
})
test('warehouse/category filters compose and handle absent categories', () => {
  assert.deepEqual(f.filterProductsByWarehouse(products, 'Zaragoza'), [product])
  assert.deepEqual(
    f.filterProductsByCategory(f.filterProductsByWarehouse(products, 'Zaragoza'), 'Electronics'),
    [product],
  )
  assert.deepEqual(f.filterProductsByCategory(products, 'Home'), [])
  assert.deepEqual(
    f.filterProductsByCategory(f.filterProductsByWarehouse(products, 'Zaragoza'), 'Fashion'),
    [],
  )
})
test('low stock includes equality and zero', () => {
  assert.deepEqual(f.filterLowStockProducts(products), [product])
  assert.equal(
    f.filterLowStockProducts([
      { ...product, stockQuantity: 10 },
      { ...product, stockQuantity: 0, minStockThreshold: 0 },
    ]).length,
    2,
  )
})
test('stock and reliability sort both directions without mutating frozen inputs', () => {
  const source = freeze(structuredClone(products))
  assert.deepEqual(
    f.sortProductsByStock(source, 'asc').map((p) => p.stockQuantity),
    [8, 45, 120],
  )
  assert.deepEqual(
    f.sortProductsByStock(source, 'desc').map((p) => p.stockQuantity),
    [120, 45, 8],
  )
  assert.deepEqual(
    f.sortCarriersByReliability(freeze(structuredClone(carriers)), 'desc').map((c) => c.onTimeRate),
    [95, 92, 88],
  )
  assert.deepEqual(
    f.sortCarriersByReliability(carriers, 'asc').map((c) => c.onTimeRate),
    [88, 92, 95],
  )
})
test('multiple field sorting uses stock inside each warehouse, stable on ties', () => {
  const source = [product, { ...product, sku: 'SECOND', stockQuantity: 2 }, ...products.slice(0, 1)]
  assert.deepEqual(
    f.sortProductsByWarehouseAndStock(source, 'asc').map((p) => p.sku),
    ['SHOE-BLK-42', 'SECOND', product.sku],
  )
  assert.deepEqual(
    f.sortProductsByWarehouseAndStock(source, 'desc').map((p) => p.sku),
    [product.sku, 'SECOND', 'SHOE-BLK-42'],
  )
  assert.deepEqual(
    f.sortProductsByStock([product, { ...product, sku: 'SECOND' }], 'asc').map((p) => p.sku),
    [product.sku, 'SECOND'],
  )
})
test('linear searches handle unsorted input, SKU casing, empty and absent records', () => {
  assert.equal(f.findProductBySKU(products, 'laptop-dell-15'), product)
  assert.equal(f.findShipmentById([shipment], shipment.id), shipment)
  assert.equal(f.findShipmentById([shipment], shipment.id.toLowerCase()), null)
  assert.equal(f.findProductBySKU([], 'missing'), null)
  assert.equal(f.findProductBySKU(products, 'missing'), null)
  assert.equal(f.findShipmentById([], 'missing'), null)
})
test('binary search returns a correct index across edges, duplicates and missing weights', () => {
  const source = freeze([...products, product].sort((a, b) => a.weightKg - b.weightKg))
  for (const weight of [0.3, 0.8, 2.3])
    assert.equal(source[f.binarySearchProductByWeight(source, weight)].weightKg, weight)
  for (const weight of [0, 0.4, 999])
    assert.equal(f.binarySearchProductByWeight(source, weight), -1)
  assert.equal(f.binarySearchProductByWeight([], 1), -1)
  assert.equal(f.binarySearchProductByWeight([product], 2.3), 0)
})
test('shipping formula uses quantity, distance, every priority and decimal rounding', () => {
  assert.deepEqual(
    carriers.map((c) => f.calculateShippingCost(shipment, product, c)),
    [30.89, 46.22, 63.18],
  )
  const c = { ...carriers[0], baseRateUSD: 1, ratePerKgUSD: 2, ratePerKmUSD: 0.1 }
  assert.equal(
    f.calculateShippingCost(
      {
        ...shipment,
        quantity: 2,
        priority: 'Standard',
        destination: { ...shipment.destination, distanceKm: 10 },
      },
      { ...product, weightKg: 3 },
      c,
    ),
    14,
  )
  assert.equal(
    f.calculateShippingCost({ ...shipment, priority: 'Same-day' }, product, carriers[0]),
    38.02,
  )
  assert.equal(
    f.calculateShippingCost(
      {
        ...shipment,
        priority: 'Standard',
        destination: { ...shipment.destination, distanceKm: 0 },
      },
      product,
      { ...carriers[0], baseRateUSD: 1.005, ratePerKgUSD: 0, ratePerKmUSD: 0 },
    ),
    1.01,
  )
})
test('score components and weight boundary implement the specified formula', () => {
  assert.deepEqual(
    carriers.map((c) => f.scoreCarrierForShipment(c, shipment, product)),
    [76.4, 97.6, 98.5],
  )
  const c = { ...carriers[1], onTimeRate: 100, maxWeightKg: 2.3 }
  assert.equal(f.scoreCarrierForShipment(c, shipment, product), 100)
  assert.equal(f.scoreCarrierForShipment({ ...c, maxWeightKg: 2 }, shipment, product), 80)
  assert.equal(f.scoreCarrierForShipment({ ...c, handlesFragile: false }, shipment, product), 85)
  assert.equal(f.scoreCarrierForShipment({ ...c, acceptsPriority: [] }, shipment, product), 85)
  assert.equal(
    f.scoreCarrierForShipment({ ...c, handlesFragile: false }, shipment, {
      ...product,
      isFragile: false,
    }),
    100,
  )
})
test('best carrier is cheapest at >=50, preserves ties and follows literal country scoring', () => {
  assert.equal(f.selectBestCarrier(carriers, shipment, product).carrier.id, 'CAR-UPS')
  const threshold = { ...carriers[0], handlesFragile: false, acceptsPriority: [], onTimeRate: 100 }
  assert.equal(f.scoreCarrierForShipment(threshold, shipment, product), 50)
  assert.equal(f.selectBestCarrier([threshold], shipment, product).score, 50)
  assert.equal(f.selectBestCarrier([{ ...threshold, onTimeRate: 99 }], shipment, product), null)
  assert.equal(f.selectBestCarrier([], shipment, product), null)
  assert.equal(
    f.selectBestCarrier([carriers[0], { ...carriers[0], id: 'tie' }], shipment, product).carrier.id,
    'CAR-UPS',
  )
})
test('reports contain all category/status keys, correct totals, mean and extremes', () => {
  assert.deepEqual(f.countProductsByCategory(products), {
    Fashion: 1,
    Electronics: 1,
    Cosmetics: 1,
    Home: 0,
    Other: 0,
  })
  assert.equal(f.calculateTotalInventoryValue(products), 16975)
  assert.equal(f.calculateAverageShipmentDistance(sampleShipments), 230)
  assert.deepEqual(f.calculateStockExtremes(products), { min: 8, max: 120 })
  const grouped = f.groupShipmentsByStatus(sampleShipments)
  assert.deepEqual(
    Object.values(grouped).map((a) => a.length),
    [1, 1, 0, 1, 1],
  )
  assert.notEqual(grouped.Pending, grouped.Assigned)
  assert.equal(grouped.Pending[0], shipment)
})
test('top carriers ignore null, use counts and retain insertion order on ties', () => {
  assert.deepEqual(f.findTopCarriers(sampleShipments, 1), [{ carrier: 'SEUR', count: 2 }])
  assert.deepEqual(f.findTopCarriers(sampleShipments, 10), [
    { carrier: 'SEUR', count: 2 },
    { carrier: 'UPS', count: 1 },
  ])
  assert.deepEqual(f.findTopCarriers([shipment], 3), [])
  assert.deepEqual(f.findTopCarriers(sampleShipments, 0), [])
  assert.deepEqual(f.findTopCarriers(sampleShipments, -1), [])
  for (const n of [1.2, NaN, Infinity]) assert.throws(() => f.findTopCarriers([], n), RangeError)
  assert.deepEqual(
    f.findTopCarriers(
      [
        { ...shipment, carrier: '__proto__' },
        { ...shipment, carrier: 'UPS' },
      ],
      2,
    ),
    [
      { carrier: '__proto__', count: 1 },
      { carrier: 'UPS', count: 1 },
    ],
  )
})
test('empty collections have documented outcomes', () => {
  for (const operation of [
    f.filterLowStockProducts,
    f.sortProductsByStock,
    f.sortCarriersByReliability,
    f.sortProductsByWarehouseAndStock,
  ])
    assert.deepEqual(operation([], 'asc'), [])
  assert.deepEqual(f.filterProductsByWarehouse([], 'Zaragoza'), [])
  assert.deepEqual(f.filterProductsByCategory([], 'Fashion'), [])
  assert.equal(f.calculateTotalInventoryValue([]), 0)
  assert.equal(f.calculateAverageShipmentDistance([]), 0)
  assert.equal(f.calculateStockExtremes([]), null)
  assert.deepEqual(Object.values(f.countProductsByCategory([])), [0, 0, 0, 0, 0])
  assert.deepEqual(Object.values(f.groupShipmentsByStatus([])), [[], [], [], [], []])
})
for (const [field, bad, good] of [
  ['weightKg', [0, -1, 100.01, NaN, Infinity], [0.1, 100]],
  ['stockQuantity', [-1, NaN, Infinity], [0, 1]],
  ['minStockThreshold', [-1, NaN, Infinity], [0, 1]],
  ['unitCostUSD', [0, -1, NaN, Infinity], [0.01, 1]],
  ['sku', ['', '   ', null], ['X']],
])
  test(`product validation: ${field}`, () => {
    bad.forEach((value) =>
      assert.equal(f.validateProduct({ ...product, [field]: value }).valid, false),
    )
    good.forEach((value) =>
      assert.equal(f.validateProduct({ ...product, [field]: value }).valid, true),
    )
  })
for (const field of ['lengthCm', 'widthCm', 'heightCm'])
  test(`dimension boundaries: ${field}`, () => {
    for (const value of [0, -1, 200.1, NaN, Infinity])
      assert.equal(
        f.validateProduct({ ...product, dimensions: { ...product.dimensions, [field]: value } })
          .valid,
        false,
      )
    assert.equal(
      f.validateProduct({ ...product, dimensions: { ...product.dimensions, [field]: 200 } }).valid,
      true,
    )
  })
test('shipment validation rejects invalid quantities, values, distances and dates', () => {
  for (const field of ['quantity', 'declaredValueUSD']) {
    for (const value of [0, -1, NaN, Infinity])
      assert.equal(f.validateShipment({ ...shipment, [field]: value }).valid, false)
  }
  for (const distanceKm of [-1, NaN, Infinity])
    assert.equal(
      f.validateShipment({ ...shipment, destination: { ...shipment.destination, distanceKm } })
        .valid,
      false,
    )
  assert.equal(
    f.validateShipment({ ...shipment, destination: { ...shipment.destination, distanceKm: 0 } })
      .valid,
    true,
  )
  assert.equal(f.validateShipment({ ...shipment, createdAt: new Date('invalid') }).valid, false)
  assert.equal(f.validateShipment({ ...shipment, carrier: null }).valid, true)
})
for (const field of [
  'baseRateUSD',
  'ratePerKgUSD',
  'ratePerKmUSD',
  'avgDeliveryDays',
  'maxWeightKg',
  'onTimeRate',
])
  test(`carrier validation: ${field}`, () => {
    for (const value of [-1, NaN, Infinity])
      assert.equal(f.validateCarrier({ ...carriers[0], [field]: value }).valid, false)
    const zeroAllowed = !['avgDeliveryDays', 'maxWeightKg'].includes(field)
    assert.equal(f.validateCarrier({ ...carriers[0], [field]: 0 }).valid, zeroAllowed)
    if (field === 'onTimeRate') {
      assert.equal(f.validateCarrier({ ...carriers[0], onTimeRate: 100 }).valid, true)
      assert.equal(f.validateCarrier({ ...carriers[0], onTimeRate: 100.1 }).valid, false)
    }
  })
test('runtime guards reject missing structure, invalid unions and multiple errors without crashing', () => {
  for (const validate of [f.validateProduct, f.validateShipment, f.validateCarrier]) {
    for (const value of [null, undefined, {}, 'text']) assert.equal(validate(value).valid, false)
    assert.ok(validate({}).errors.length > 1)
  }
  assert.equal(f.validateProduct({ ...product, dimensions: null }).valid, false)
  assert.equal(f.validateShipment({ ...shipment, destination: null }).valid, false)
  assert.equal(f.validateProduct({ ...product, category: 'Unknown' }).valid, false)
  assert.equal(f.validateCarrier({ ...carriers[0], operatesIn: [] }).valid, false)
  assert.equal(f.validateCarrier({ ...carriers[0], operatesIn: ['Unknown'] }).valid, false)
  assert.equal(f.validateCarrier({ ...carriers[0], acceptsPriority: ['Unknown'] }).valid, false)
  assert.throws(() => f.calculateShippingCost(shipment, null, carriers[0]), TypeError)
  assert.throws(() => f.scoreCarrierForShipment(null, shipment, product), TypeError)
  assert.throws(() => f.filterLowStockProducts(null), TypeError)
  assert.throws(() => f.findProductBySKU([null], 'X'), TypeError)
})
test('public operations are repeatable and preserve nested frozen input', () => {
  const p = freeze(structuredClone(products))
  const s = freeze(structuredClone(sampleShipments))
  const c = freeze(structuredClone(carriers))
  const before = JSON.stringify({ p, s, c })
  for (const operation of [
    () => f.countProductsByCategory(p),
    () => f.groupShipmentsByStatus(s),
    () => f.findTopCarriers(s, 3),
    () => f.selectBestCarrier(c, s[0], p[1]),
    () => f.calculateTotalInventoryValue(p),
  ]) {
    assert.deepEqual(operation(), operation())
  }
  assert.equal(JSON.stringify({ p, s, c }), before)
})
test('report rounding and invalid records are controlled', () => {
  assert.equal(
    f.calculateTotalInventoryValue([{ ...product, stockQuantity: 1, unitCostUSD: 1.005 }]),
    1.01,
  )
  assert.equal(
    f.calculateAverageShipmentDistance([
      shipment,
      { ...shipment, destination: { ...shipment.destination, distanceKm: 0.01 } },
    ]),
    160.01,
  )
  assert.throws(() => f.groupShipmentsByStatus([{ ...shipment, status: '__proto__' }]), TypeError)
  assert.throws(() => f.countProductsByCategory([{ ...product, category: '__proto__' }]), TypeError)
})
test('remaining shipment/record structures are rejected without unsafe access', () => {
  for (const change of [
    { origin: 'Unknown' },
    { priority: 'Unknown' },
    { status: 'Unknown' },
    { carrier: 1 },
    { createdAt: '2024-03-15' },
  ])
    assert.equal(f.validateShipment({ ...shipment, ...change }).valid, false)
  for (const change of [
    { warehouse: 'Unknown' },
    { status: 'Unknown' },
    { isFragile: 'true' },
    { name: null },
  ])
    assert.equal(f.validateProduct({ ...product, ...change }).valid, false)
  assert.equal(f.validateCarrier({ ...carriers[0], handlesFragile: null }).valid, false)
})
test('sparse country/priority lists and collections cannot bypass runtime guards', () => {
  assert.equal(f.validateCarrier({ ...carriers[0], operatesIn: Array(1) }).valid, false)
  assert.equal(f.validateCarrier({ ...carriers[0], acceptsPriority: Array(1) }).valid, false)
  assert.throws(() => f.calculateTotalInventoryValue(Array(1)), TypeError)
})
