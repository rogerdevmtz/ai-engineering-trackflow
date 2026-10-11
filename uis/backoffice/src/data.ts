export type Warehouse = 'Los Ángeles' | 'Zaragoza'
export type Stage = 'Preparación' | 'En tránsito' | 'Revisión de devolución'
export type Order = { id: string; warehouse: Warehouse; carrier: string; stage: Stage; units: number; note: string }

// Ejemplos ficticios. Las sedes, los procesos y los transportistas proceden de CONTEXT.md.
export const orders: Order[] = [
  { id: 'DEMO-1048', warehouse: 'Zaragoza', carrier: 'SEUR', stage: 'Preparación', units: 3, note: 'Comprobar el picking y el embalaje antes de la expedición.' },
  { id: 'DEMO-1047', warehouse: 'Los Ángeles', carrier: 'UPS', stage: 'En tránsito', units: 2, note: 'Ejemplo de envío expedido. No se consulta el portal del transportista.' },
  { id: 'DEMO-1046', warehouse: 'Zaragoza', carrier: 'MRW', stage: 'Revisión de devolución', units: 1, note: 'La inspección y la decisión corresponden al equipo de logística inversa.' },
  { id: 'DEMO-1045', warehouse: 'Los Ángeles', carrier: 'FedEx', stage: 'Preparación', units: 4, note: 'Verificar las unidades y preparar el pedido para su expedición.' },
  { id: 'DEMO-1044', warehouse: 'Zaragoza', carrier: 'DHL', stage: 'En tránsito', units: 2, note: 'Estado ficticio para ilustrar el seguimiento manual de la operación.' },
  { id: 'DEMO-1043', warehouse: 'Los Ángeles', carrier: 'UPS', stage: 'Revisión de devolución', units: 1, note: 'Revisar el estado del producto devuelto antes de decidir su destino.' },
]

export const warehouses = [
  { city: 'Los Ángeles', country: 'Estados Unidos', description: 'Almacén y operaciones en Estados Unidos.' },
  { city: 'Zaragoza', country: 'España', description: 'Almacén y oficina tecnológica en España.' },
]
