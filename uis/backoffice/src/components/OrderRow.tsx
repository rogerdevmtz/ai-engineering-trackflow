import { useState } from 'react'
import type { Order } from '../data'
import { statusIcons } from '../status'
import Icon from './Icon'

export default function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  return <li className="order-row">
    <div className="order-reference"><strong>{order.id}</strong><span>{order.units} {order.units === 1 ? 'unidad' : 'unidades'}</span></div>
    <div className="order-location"><strong>{order.warehouse}</strong><span>{order.carrier}</span></div>
    <span className="order-status" data-stage={order.stage}><Icon name={statusIcons[order.stage]} />{order.stage}</span>
    <button className="order-detail" aria-label={`${open ? 'Cerrar' : 'Ver'} detalle de ${order.id}`} aria-expanded={open} aria-controls={`detail-${order.id}`} onClick={() => setOpen(value => !value)}>{open ? 'Cerrar detalle' : 'Ver detalle'}</button>
    <div className="order-note" id={`detail-${order.id}`} hidden={!open}><span>QUÉ REVISAR</span><p>{order.note}</p></div>
  </li>
}
