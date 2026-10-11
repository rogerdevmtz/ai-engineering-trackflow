import { useEffect, useState } from 'react'
import type { Order, Stage } from '../data'
import { statusIcons } from '../status'
import Icon from './Icon'
import brandMark from '../../../website/public/brand/trackflow-mark.svg?url'
import upsLogo from '../../../website/public/carriers/ups.svg?url'
import fedexLogo from '../../../website/public/carriers/fedex.png?url'
import dhlLogo from '../../../website/public/carriers/dhl.svg?url'
import mrwLogo from '../../../website/public/carriers/mrw.png?url'
import seurLogo from '../../../website/public/carriers/seur.png?url'
import warehouseImage from '../../../website/public/service-storage-v1.webp?url'

const carrierLogos: Record<string, string> = { UPS: upsLogo, FedEx: fedexLogo, DHL: dhlLogo, MRW: mrwLogo, SEUR: seurLogo }

const stageGroups: { stage: Stage; label: string; color: string }[] = [
  { stage: 'Preparación', label: 'Preparación', color: 'var(--status-preparation)' },
  { stage: 'En tránsito', label: 'En tránsito', color: 'var(--status-transit)' },
  { stage: 'Revisión de devolución', label: 'Devoluciones', color: 'var(--status-review)' },
]
export default function OperationsOverview({ orders, onCarrier, onStage }: { orders: Order[]; onCarrier: (carrier: string) => void; onStage: (stage: Stage) => void }) {
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => { if (event.key === 'Escape') setTooltipDismissed(true) }
    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [])
  const [measure, setMeasure] = useState<'Pedidos' | 'Unidades'>('Pedidos')
  const carriers = [...new Set(orders.map(order => order.carrier))].sort().map(carrier => ({
    carrier,
    value: orders.filter(order => order.carrier === carrier).reduce((total, order) => total + (measure === 'Unidades' ? order.units : 1), 0),
    count: orders.filter(order => order.carrier === carrier).length,
    units: orders.filter(order => order.carrier === carrier).reduce((total, order) => total + order.units, 0),
  }))
  const maximum = Math.max(1, ...carriers.map(item => item.value))
  const stages = stageGroups.map(group => ({ ...group, value: orders.filter(order => order.stage === group.stage).length }))
  let offset = 0
  const circumference = 2 * Math.PI * 58
  return <div className="overview-grid">
    <section className="analytics-panel carrier-panel" data-tooltip-dismissed={tooltipDismissed} aria-labelledby="carrier-title">
      <svg width="0" height="0" className="carrier-filter-definitions" aria-hidden="true"><defs><filter id="office-mrw-monochrome" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.55 1.02 -2.55 0 -.08" /></filter></defs></svg>
      <div className="analytics-heading"><h2 id="carrier-title">Por transportista</h2><div className="chart-toggle" role="group" aria-label="Medida de la gráfica">{(['Pedidos', 'Unidades'] as const).map(item => <button key={item} aria-pressed={measure === item} onClick={() => setMeasure(item)}>{item}</button>)}</div></div>
      <div className="bar-chart" role="group" aria-label={`${measure} de demostración por transportista`}>
        <div className="chart-grid" aria-hidden="true"><span>{maximum}</span><span>{maximum > 1 ? Math.floor(maximum / 2) : ''}</span><span>0</span></div>
        <div className="chart-bars">{carriers.map(item => <button key={item.carrier} className="carrier-bar" onPointerEnter={() => setTooltipDismissed(false)} onFocus={() => setTooltipDismissed(false)} data-carrier={item.carrier} aria-label={`Ver pedidos de ${item.carrier}: ${item.value} ${measure.toLowerCase()}`} aria-describedby={`carrier-detail-${item.carrier}`} onClick={() => onCarrier(item.carrier)}><span className="bar-track"><span className="bar-fill" style={{ height: `${item.value / maximum * 100}%` }}><span className="bar-value">{item.value}</span></span></span><span className="bar-label">{carrierLogos[item.carrier] ? <img src={carrierLogos[item.carrier]} alt={item.carrier} width="64" height="24" /> : item.carrier}</span><span className="carrier-detail" id={`carrier-detail-${item.carrier}`} role="tooltip"><strong>{item.carrier}</strong><span>{item.count} {item.count === 1 ? 'pedido' : 'pedidos'} · {item.units} {item.units === 1 ? 'unidad' : 'unidades'}</span></span></button>)}</div>
      </div>
    </section>
    <section className="analytics-panel distribution-panel" aria-labelledby="distribution-title">
      <div className="analytics-heading"><h2 id="distribution-title">Por estado</h2></div>
      <div className="distribution-body"><div className="donut-wrap"><svg viewBox="0 0 152 152" role="img" aria-label={stages.map(item => `${item.label}: ${item.value}`).join(', ')}><circle cx="76" cy="76" r="58" fill="none" stroke="#252525" strokeWidth="15" />{stages.map(item => {
        const segment = orders.length ? item.value / orders.length * circumference : 0
        const start = offset
        offset += segment
        return <circle key={item.stage} cx="76" cy="76" r="58" fill="none" stroke={item.color} strokeWidth="15" strokeDasharray={`${Math.max(0, segment - 5)} ${circumference}`} strokeDashoffset={-start} transform="rotate(-90 76 76)" />
      })}</svg><div className="donut-brand" aria-hidden="true"><img src={brandMark} alt="" width="36" height="34" /></div></div><div className="chart-legend">{stages.map(item => <button key={item.stage} onClick={() => onStage(item.stage)} aria-label={`Consultar ${item.label.toLowerCase()}: ${item.value} pedidos`}><span className="legend-status-icon" style={{ color: item.color }}><Icon name={statusIcons[item.stage]} /></span><span>{item.label}</span><strong>{item.value}</strong></button>)}</div></div>
      <figure className="operations-photo"><img src={warehouseImage} alt="" width="800" height="440" loading="lazy" /><figcaption>Imagen ilustrativa de almacén</figcaption></figure>
    </section>
  </div>
}
