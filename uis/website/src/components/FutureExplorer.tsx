import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

const subscribeToHydration = () => () => {}
const clientReady = () => true
const serverReady = () => false

const capabilities = [
  {
    title: 'Recomendación de transportistas',
    hint: 'Elegir con más contexto',
    headline: 'Cada envío. Una decisión con contexto.',
    description: 'Una propuesta explicable basada en destino, peso, urgencia y rendimiento.',
    purpose: 'Entender qué criterios apoyarían la elección de un transportista para cada envío.',
    inputs: ['Destino', 'Peso', 'Urgencia', 'Rendimiento'],
    notes: ['El lugar de entrega aportaría contexto a la elección.', 'El peso del paquete sería uno de los criterios de comparación.', 'La prioridad de entrega ayudaría a valorar las alternativas.', 'El historial de entregas permitiría fundamentar la recomendación.'],
    output: 'Elección explicada',
  },
  {
    title: 'Seguimiento unificado',
    hint: 'Reunir estados e incidencias',
    headline: 'Distintos transportistas. Una misma visión.',
    description: 'Una vista común de los estados de envío de distintos transportistas.',
    purpose: 'Consultar estados e incidencias desde un mismo lugar, sin recorrer varios portales.',
    inputs: ['Transportista A', 'Transportista B', 'Transportista C'],
    notes: ['Los estados de cada transportista se reunirían en una vista común.', 'Una misma estructura facilitaría comparar estados de distintos portales.', 'Las incidencias podrían consultarse junto al resto de los envíos.'],
    output: 'Vista unificada',
  },
  {
    title: 'Asistencia para envíos y devoluciones',
    hint: 'Orientar cada consulta',
    headline: 'Una consulta. El siguiente paso claro.',
    description: 'Un agente que consulte estados y políticas, y derive los casos necesarios.',
    purpose: 'Resolver consultas habituales y trasladar al equipo humano los casos que necesiten atención.',
    inputs: ['Estado del envío', 'Políticas', 'Devoluciones'],
    notes: ['El estado del envío aportaría contexto a cada consulta.', 'Las políticas servirían como referencia para orientar la respuesta.', 'Los casos que lo requiriesen se trasladarían al equipo humano.'],
    output: 'Respuesta contextual',
  },
]

function ConnectionVisual({ index, mobile = false }: { index: number | null; mobile?: boolean }) {
  const [input, setInput] = useState(0)
  const [instant, setInstant] = useState(false)
  const inputRefs = useRef<(HTMLButtonElement | null)[]>([])
  const diagramRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState({ width: 1, height: 1, inputs: [] as string[], output: '' })
  const capability = index === null ? null : capabilities[index]

  useLayoutEffect(() => {
    const diagram = diagramRef.current
    const hub = hubRef.current
    const output = outputRef.current
    if (!diagram || !hub || !output) return
    const measure = () => {
      const bounds = diagram.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const node = hub.getBoundingClientRect()
      const result = output.getBoundingClientRect()
      const narrow = matchMedia('(max-width: 760px)').matches
      const x = (value: number) => Math.round((value - bounds.left) * 10) / 10
      const y = (value: number) => Math.round((value - bounds.top) * 10) / 10
      const hubX = x(node.left)
      const hubY = y(node.top + node.height / 2)
      const inputs = inputRefs.current.map(button => {
        const control = button!.getBoundingClientRect()
        const startX = x(control.right)
        const startY = y(control.top + control.height / 2)
        if (narrow) {
          const lane = (startX + Math.min(hubX, x(result.left))) / 2
          const radius = Math.min(6, Math.abs(hubY - startY) / 2, (lane - startX) / 2, (hubX - lane) / 2)
          const direction = hubY > startY ? 1 : -1
          if (radius < .5) return `M${startX} ${startY} H${hubX}`
          return `M${startX} ${startY} H${lane - radius} Q${lane} ${startY} ${lane} ${startY + direction * radius} V${hubY - direction * radius} Q${lane} ${hubY} ${lane + radius} ${hubY} H${hubX}`
        }
        const middle = (startX + hubX) / 2
        return `M${startX} ${startY} C${middle} ${startY} ${middle} ${hubY} ${hubX} ${hubY}`
      })
      const startX = x(node.left + (narrow ? node.width / 2 : node.width))
      const startY = y(node.top + (narrow ? node.height : node.height / 2))
      const endX = x(result.left + (narrow ? result.width / 2 : 0))
      const endY = y(result.top + (narrow ? 0 : result.height / 2))
      const middle = narrow ? (startY + endY) / 2 : (startX + endX) / 2
      const path = narrow ? `M${startX} ${startY} C${startX} ${middle} ${endX} ${middle} ${endX} ${endY}` : `M${startX} ${startY} C${middle} ${startY} ${middle} ${endY} ${endX} ${endY}`
      const next = { width: bounds.width, height: bounds.height, inputs, output: path }
      setGeometry(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    const nodes = [diagram, hub, output, ...inputRefs.current]
    nodes.forEach(node => { if (node) observer.observe(node) })
    return () => observer.disconnect()
  }, [index])

  return (
    <figure className={`future-visual${mobile ? ' future-visual-mobile' : ''}`} data-instant={instant}>
      <figcaption><span className="eyebrow-mark" aria-hidden="true" />ESQUEMA CONCEPTUAL <span>PREVISTO</span></figcaption>
      <div className="future-visual-content">
        <p className="future-visual-heading">{capability?.headline ?? 'Explora la próxima conexión.'}</p>
        {capability && <p className="future-diagram-hint">Selecciona un criterio y explora su conexión</p>}
        {capability ? (
          <div className="future-diagram" role="group" ref={diagramRef} aria-label={`Esquema conceptual: ${capability.inputs.join(', ')} se conectarían con ${capability.output.toLowerCase()}`}>
            <svg className="future-wires" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
              {geometry.inputs.map((path, i) => <path key={i} d={path} />)}
              {geometry.inputs.map((path, i) => <path key={i} className="future-wire-selection" data-active={i === input} pathLength="1" d={path} />)}
              <path className="future-wire-active" d={geometry.output} />
            </svg>
            <ul className="future-inputs">{capability.inputs.map((label, i) => (
              <li key={label}>
                <button type="button" ref={node => { inputRefs.current[i] = node }} aria-pressed={input === i}
                  onClick={event => { setInstant(event.detail === 0); setInput(i) }}
                  onKeyDown={event => {
                    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
                    event.preventDefault()
                    const next = event.key === 'Home' ? 0 : event.key === 'End' ? capability.inputs.length - 1 : (i + (event.key === 'ArrowDown' ? 1 : -1) + capability.inputs.length) % capability.inputs.length
                    setInstant(true)
                    setInput(next)
                    inputRefs.current[next]?.focus()
                  }}>
                  <span className="future-input-dot" aria-hidden="true" />{label}
                </button>
              </li>
            ))}</ul>
            <div className="future-destination">
              <div className="future-hub" ref={hubRef} aria-hidden="true"><img src="/brand/trackflow-mark.svg" alt="" width="154" height="154" /><span>TrackFlow</span></div>
              <div className="future-outputs" ref={outputRef}>
                <span className="future-output-label">Resultado previsto</span><strong>{capability.output}</strong>
                <div className="future-visual-note" aria-live="polite" aria-atomic="true">
                  <div className="future-feedback-stack">{capability.notes.map((note, i) => <div className="future-feedback" data-active={input === i} aria-hidden={input !== i} key={note}><span>{capability.inputs[i]}</span><p>{note}</p></div>)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : <p className="future-visual-empty">Selecciona una capacidad para explorar cómo se conectaría la operación.</p>}
        {!capability && <p className="future-visual-note">Una visión de lo que estamos planteando.</p>}
      </div>
    </figure>
  )
}

function FutureExplorer() {
  const enhanced = useSyncExternalStore(subscribeToHydration, clientReady, serverReady)
  const [selected, setSelected] = useState<number | null>(0)
  const [instant, setInstant] = useState(false)
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([])
  const anchorRequest = useRef<{ summary: HTMLElement; top: number; height: number } | null>(null)

  useLayoutEffect(() => {
    const measure = (body: Element) => body.parentElement?.style.setProperty('--future-panel-height', `${body.getBoundingClientRect().height}px`)
    const observer = new ResizeObserver(entries => entries.forEach(entry => measure(entry.target)))
    bodyRefs.current.forEach(body => { if (body) { measure(body); observer.observe(body) } })
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const anchor = anchorRequest.current
    anchorRequest.current = null
    if (!anchor || selected === null) return
    const details = anchor.summary.parentElement!
    let frame = 0
    let cancelled = false
    const cancel = () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchmove', cancel)
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('resize', cancel)
    }
    const follow = () => {
      if (cancelled) return
      const target = parseFloat(details.style.getPropertyValue('--future-panel-height'))
      const height = parseFloat(getComputedStyle(details, '::details-content').blockSize)
      const progress = !Number.isFinite(height) || !target || target === anchor.height ? 1 : Math.max(0, Math.min(1, (height - anchor.height) / (target - anchor.height)))
      const top = anchor.top + (96 - anchor.top) * progress
      scrollTo({ top: scrollY + anchor.summary.getBoundingClientRect().top - top, behavior: 'instant' })
      if (progress < .999) frame = requestAnimationFrame(follow)
      else cancel()
    }
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchmove', cancel, { passive: true })
    window.addEventListener('keydown', cancel)
    window.addEventListener('resize', cancel)
    follow()
    return cancel
  }, [selected])

  const select = (index: number | null, keyboard: boolean, summary: HTMLElement) => {
    if (index !== null && selected !== null && index > selected && matchMedia('(max-width: 980px)').matches) {
      anchorRequest.current = { summary, top: summary.getBoundingClientRect().top, height: parseFloat(getComputedStyle(summary.parentElement!, '::details-content').blockSize) || 0 }
    }
    setInstant(keyboard)
    setSelected(index)
  }
  return (
    <div className="future-explorer" data-instant={instant}>
      <div className="future-desktop-visual">{[0, 1, 2, null].map(index => <div className="future-scene" data-active={selected === index} inert={selected !== index} aria-hidden={selected !== index} key={index ?? 'empty'}><ConnectionVisual index={index} /></div>)}</div>
      <div className="future-options">
        <p className="future-explore-label">EXPLORA LA EVOLUCIÓN <span>Selecciona una capacidad</span></p>
        {capabilities.map((capability, index) => (
          <details className="future-option" key={capability.title} open={selected === index}>
            <summary onClick={event => {
              event.preventDefault()
              select(selected === index ? null : index, event.detail === 0, event.currentTarget)
            }}>
              <span className="future-number" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <span className="future-option-title"><h3>{capability.title}</h3><span>{capability.hint}</span></span>
              <span className="future-toggle" aria-hidden="true"><i /><i /></span>
            </summary>
            <div className="future-option-body" ref={node => { bodyRefs.current[index] = node }} inert={enhanced && selected !== index} aria-hidden={enhanced ? selected !== index : undefined}>
              <p>{capability.description}</p>
              <p className="future-purpose">{capability.purpose}</p>
              <ConnectionVisual index={index} mobile />
              <span className="future-planned">Capacidad prevista · No disponible todavía</span>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

export default FutureExplorer
