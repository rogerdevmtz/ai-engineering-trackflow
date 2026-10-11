import Icon, { type IconName } from './Icon'
export default function Metric({ label, value, icon, active, onSelect }: { label: string; value: number; icon: IconName; active: boolean; onSelect: () => void }) {
  return <div className="metric"><button aria-label={`Ver pedidos: ${label} (${value})`} aria-pressed={active} onClick={onSelect}><span className="metric-top"><Icon name={icon} /><span>{label}</span></span><strong>{String(value).padStart(2, '0')}</strong></button></div>
}
