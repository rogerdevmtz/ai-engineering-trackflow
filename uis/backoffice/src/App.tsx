import { useState } from 'react'
import BackofficeLayout from './components/BackofficeLayout'
import Metric from './components/Metric'
import Icon, { type IconName } from './components/Icon'
import OrderRow from './components/OrderRow'
import OperationsOverview from './components/OperationsOverview'

import { orders, warehouses, type Stage } from './data'

const filters: { label: string; short: string; stage: Stage | 'Todos'; icon: IconName }[] = [
  { label: 'Todos los pedidos', short: 'Todos', stage: 'Todos', icon: 'orders' },
  { label: 'En preparación', short: 'Preparación', stage: 'Preparación', icon: 'box' },
  { label: 'En tránsito', short: 'En tránsito', stage: 'En tránsito', icon: 'truck' },
  { label: 'Devoluciones', short: 'Devoluciones', stage: 'Revisión de devolución', icon: 'review' },
]
function focusOrders() {
  document.getElementById('pedidos-titulo')?.focus({ preventScroll: true })
  document.getElementById('pedidos')?.scrollIntoView({ block: 'start', behavior: 'instant' })
}
export default function App() {
  const [warehouse, setWarehouse] = useState('Todos')
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState<Stage | 'Todos'>('Todos')
  const scoped = orders.filter(order => warehouse === 'Todos' || order.warehouse === warehouse)
  const query = search.trim().toLocaleLowerCase('es')
  const filtered = scoped.filter(order => (stage === 'Todos' || order.stage === stage) && `${order.id} ${order.carrier} ${order.stage} ${order.warehouse}`.toLocaleLowerCase('es').includes(query))
  const count = (value: Stage | 'Todos') => value === 'Todos' ? scoped.length : scoped.filter(order => order.stage === value).length
  const hasFilters = warehouse !== 'Todos' || search !== '' || stage !== 'Todos'
  function reset() { setWarehouse('Todos'); setSearch(''); setStage('Todos'); document.getElementById('order-search')?.focus({ preventScroll: true }) }
  function selectStage(value: Stage | 'Todos') { setStage(value); setSearch(''); focusOrders() }
  function selectWarehouse(city: string) { setWarehouse(city); setStage('Todos'); setSearch('') }

  return <BackofficeLayout toolbar={<label className="global-search"><span className="sr-only">Buscar pedido o transportista</span><span className="search-control"><Icon name="search" /><input id="order-search" type="search" value={search} onChange={event => setSearch(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') focusOrders() }} placeholder="Buscar pedidos…" /></span></label>} heading={<>
    <section id="resumen" className="office-intro" aria-labelledby="resumen-titulo">
      <div><h1 id="resumen-titulo">Resumen de <span>operaciones.</span></h1></div>
    </section>
    <div className="demo-notice"><span aria-hidden="true">i</span><p><strong>Datos de demostración.</strong> Pedidos ficticios, sin conexión a sistemas reales.</p></div>
  </>}>
    <div className="dashboard-layout">
    <div className="operation-context"><section id="almacenes" className="warehouse-scope" aria-labelledby="almacenes-titulo">
      <div className="scope-context"><div><h2 id="almacenes-titulo"><Icon name="warehouse" />Filtrar por almacén</h2><p id="warehouse-help">Se aplica a todo el panel</p></div></div>
      <fieldset className="scope-options" aria-describedby="warehouse-help">
        <legend className="sr-only">Filtrar por almacén</legend>
        <label><input type="radio" name="warehouse" value="Todos" aria-label="Todos los almacenes" checked={warehouse === 'Todos'} onChange={() => selectWarehouse('Todos')} /><span className="scope-option-copy"><strong>Todos</strong><span>Ambas sedes</span></span></label>
        {warehouses.map(item => <label key={item.city}><input type="radio" name="warehouse" value={item.city} aria-label={item.city} checked={warehouse === item.city} onChange={() => selectWarehouse(item.city)} /><span className="scope-option-copy"><strong>{item.city}</strong><span>{item.country}</span></span></label>)}
      </fieldset>
    </section>
    <p className="sr-only" role="status">Vista de {warehouse === 'Todos' ? 'todos los almacenes' : warehouse}: {scoped.length} pedidos de demostración.</p>
    <div className="metrics" role="group" aria-label="Accesos a pedidos por estado">{filters.map(filter => <Metric key={filter.stage} label={filter.label} value={count(filter.stage)} icon={filter.icon} active={stage === filter.stage} onSelect={() => selectStage(filter.stage)} />)}</div></div>
    <div className="dashboard-body"><OperationsOverview orders={scoped} onStage={selectStage} onCarrier={carrier => { setSearch(carrier); setStage('Todos'); focusOrders() }} />
    <div className="operations-grid"><section id="pedidos" className="orders-panel" aria-labelledby="pedidos-titulo">
      <div className="panel-heading"><div><h2 id="pedidos-titulo" tabIndex={-1}>Pedidos</h2></div></div>
      <div className="status-filters" role="group" aria-label="Filtrar pedidos por estado">{filters.map(filter => <button key={filter.stage} aria-pressed={stage === filter.stage} onClick={() => setStage(filter.stage)}>{filter.short}</button>)}</div>
      <div className="orders-caption"><p role="status">{filtered.length} {filtered.length === 1 ? 'pedido' : 'pedidos'}<span> · {warehouse === 'Todos' ? 'Todos los almacenes' : warehouse}</span></p>{hasFilters && <button className="reset-filter" onClick={reset}>Restablecer vista</button>}</div>
      {hasFilters && <div className="active-filters" aria-label="Filtros aplicados">{warehouse !== 'Todos' && <button onClick={() => setWarehouse('Todos')} aria-label={`Quitar filtro de almacén ${warehouse}`}>{warehouse}<span aria-hidden="true">×</span></button>}{stage !== 'Todos' && <button onClick={() => setStage('Todos')} aria-label="Quitar filtro de estado">{filters.find(filter => filter.stage === stage)?.short}<span aria-hidden="true">×</span></button>}{search && <button onClick={() => setSearch('')} aria-label="Quitar búsqueda">Búsqueda: {search}<span aria-hidden="true">×</span></button>}</div>}
      <div className="table-heading" aria-hidden="true"><span>Pedido / unidades</span><span>Almacén / transportista</span><span>Estado del pedido</span><span>Detalle</span></div>
      {filtered.length > 0 ? <ul className="orders-list">{filtered.map(order => <OrderRow key={order.id} order={order} />)}</ul> : <div className="empty-state"><Icon name="search" /><h3>No hay pedidos con estos filtros</h3><p>Quita un filtro o restablece la vista para ver todos los ejemplos.</p><button className="office-button" onClick={reset}>Ver todos los pedidos</button></div>}
    </section>
    </div></div></div>
  </BackofficeLayout>
}
