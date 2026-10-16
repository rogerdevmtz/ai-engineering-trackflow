import { useRef, useState, type KeyboardEvent } from 'react'

const benefits = [
  { id: 'equipo', label: 'Nuestro equipo', title: 'Personas detrás de cada pedido.', description: 'Almacén, envíos, devoluciones y atención al cliente: un equipo dedicado a tu logística.', kind: 'people' },
  { id: 'mercados', label: 'Dos mercados', title: 'Tu marca, a ambos lados.', description: 'Almacenes en dos mercados para acompañar la logística de tu e-commerce.', kind: 'markets' },
  { id: 'tecnologia', label: 'Tecnología propia', title: 'Creada desde la operación.', description: 'Nuestro equipo tecnológico en Zaragoza desarrolla y mantiene las herramientas que apoyan el trabajo diario.', kind: 'technology' },
  { id: 'ecommerce', label: 'E-commerce', title: 'Tu sector. Nuestro día a día.', description: 'Experiencia con las necesidades logísticas de estos sectores.', kind: 'commerce' },
] as const

function BenefitVisual({ kind }: { kind: typeof benefits[number]['kind'] }) {
  return (
    <figure aria-hidden={kind === 'technology' ? true : undefined} className="flex min-h-[220px] min-w-0 items-center justify-center px-5 py-7 sm:min-h-[280px] sm:px-9 lg:min-h-[350px] lg:px-12">
      {kind === 'people' && <div className="flex w-full max-w-[440px] items-center justify-between gap-3 min-[360px]:gap-5">
        <div><span className="block font-[family-name:var(--font-display)] text-[90px] leading-none tracking-[-.07em] text-[#FD430B] min-[360px]:text-[120px] sm:text-[170px] lg:text-[clamp(150px,13vw,190px)]"><span className="sr-only">Unos </span><span aria-hidden="true">~</span>130</span><p className="mt-3 text-sm text-[#bdbdbd]">profesionales</p></div>
        <div aria-hidden="true" className="grid shrink-0 grid-cols-10 gap-1 min-[360px]:gap-1.5 sm:gap-2">{Array.from({ length: 130 }, (_, i) => <span key={i} className={i === 64 ? 'size-[3px] rounded-full bg-[#FD430B] sm:size-1' : 'size-[3px] rounded-full bg-white/20 sm:size-1'} />)}</div>
      </div>}
      {kind === 'markets' && <div className="grid w-full max-w-[440px] grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div><span className="block font-[family-name:var(--font-display)] text-[76px] leading-none tracking-[-.04em] text-white sm:text-[112px]"><span className="sr-only">Estados Unidos</span><span aria-hidden="true">US</span></span><p className="mt-4 text-xs text-[#a8a8a8] sm:text-sm">Los Ángeles</p></div>
        <svg aria-hidden="true" className="h-16 w-10 text-[#FD430B] sm:w-20" viewBox="0 0 80 64" fill="none"><path d="M2 32h76M8 26l-6 6 6 6m64-12 6 6-6 6" stroke="currentColor" strokeWidth="1" /><circle cx="40" cy="32" r="13" className="fill-[#080808] stroke-current" /><path d="M35 32h10" stroke="currentColor" /></svg>
        <div className="text-right"><span className="block font-[family-name:var(--font-display)] text-[76px] leading-none tracking-[-.04em] text-[#FD430B] sm:text-[112px]"><span className="sr-only">España</span><span aria-hidden="true">ES</span></span><p className="mt-4 text-xs text-[#a8a8a8] sm:text-sm">Zaragoza</p></div>
      </div>}
      {kind === 'technology' && <svg aria-hidden="true" className="w-full max-w-[360px] text-[#FD430B]" viewBox="0 0 360 250" fill="none">
        <path d="M30 65h65l40 40m90 0 40-40h65M30 185h65l40-40m90 0 40 40h65M180 15v65m0 90v65" className="stroke-white/20" />
        <path d="M30 65h65l40 40m45 65v65" stroke="currentColor" />
        <rect x="130" y="75" width="100" height="100" rx="22" className="fill-[#101010] stroke-white/25" />
        <rect x="138" y="83" width="84" height="84" rx="16" className="stroke-white/10" />
        <path d="m166 109-16 16 16 16m28-32 16 16-16 16m-9-36-10 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <g className="fill-[#080808] stroke-white/30"><circle cx="30" cy="65" r="7" /><circle cx="330" cy="65" r="7" /><circle cx="30" cy="185" r="7" /><circle cx="330" cy="185" r="7" /><circle cx="180" cy="15" r="7" /><circle cx="180" cy="235" r="7" /></g>
        <circle cx="30" cy="65" r="3" className="fill-current" /><circle cx="180" cy="235" r="3" className="fill-current" />
      </svg>}
      {kind === 'commerce' && <div className="grid w-full max-w-[440px] grid-cols-3 gap-3 text-center sm:gap-6">
        {[
          { label: 'Moda', path: 'm18 12-8 5 6 12 5-3v24h22V26l5 3 6-12-8-5-7 6h-7z' },
          { label: 'Electrónica', path: 'M20 8h24v48H20zM28 49h8M27 14h10' },
          { label: 'Cosmética', path: 'M23 23h18v31H23zM27 10h10v13H27zM27 31h10' },
        ].map(item => <div key={item.label}><svg aria-hidden="true" className="mx-auto mb-6 size-14 text-[#FD430B] sm:mb-8 sm:size-24" viewBox="0 0 64 64" fill="none"><path d={item.path} stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /></svg><p className="text-[10px] text-[#bdbdbd] sm:text-xs">{item.label}</p></div>)}
      </div>}
    </figure>
  )
}

function BenefitsShowcase() {
  const [selected, setSelected] = useState(0)
  const [instant, setInstant] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const columns = matchMedia('(min-width: 768px)').matches ? 4 : 2
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns }
    let next: number
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = benefits.length - 1
    else if (event.key in offsets) next = (index + offsets[event.key] + benefits.length) % benefits.length
    else return
    event.preventDefault()
    setInstant(true)
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="mt-10 lg:mt-14">
      <div role="tablist" aria-label="Ventajas de TrackFlow" className="grid grid-cols-2 gap-2 border-b border-white/10 pb-4 md:grid-cols-4">
        {benefits.map((benefit, index) => <button key={benefit.id} type="button" role="tab" id={`benefit-tab-${benefit.id}`} aria-controls={`benefit-panel-${benefit.id}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} ref={node => { tabs.current[index] = node }} onKeyDown={event => onKeyDown(event, index)} onClick={() => { setInstant(false); setSelected(index) }} className="flex min-h-14 scroll-mt-24 cursor-pointer items-center gap-2 rounded-[12px] border border-transparent px-3 py-3 text-left text-xs font-medium text-[#bdbdbd] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#ff9a73] aria-selected:bg-[#141414] aria-selected:text-white [@media(hover:hover)]:hover:text-white sm:gap-3 sm:px-4 sm:text-sm">
          <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${selected === index ? 'bg-[#FD430B]' : 'bg-[#626262]'}`} />{benefit.label}
        </button>)}
      </div>
      <div className="mt-5 grid rounded-[24px] border border-white/10 bg-[#080808] shadow-[inset_0_1px_0_#ffffff08]">
        {benefits.map((benefit, index) => <div key={benefit.id} id={`benefit-panel-${benefit.id}`} role="tabpanel" aria-labelledby={`benefit-tab-${benefit.id}`} aria-hidden={selected !== index} inert={selected !== index} tabIndex={selected === index ? 0 : -1} className={`col-start-1 row-start-1 grid min-w-0 scroll-mt-24 items-stretch rounded-[16px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#ff9a73] lg:grid-cols-2 motion-reduce:transition-none ${instant ? 'transition-none' : 'transition-opacity duration-200 ease-[var(--ease-out)]'} ${selected === index ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="flex flex-col items-start justify-center px-6 pt-8 pb-2 sm:px-10 sm:pt-10 sm:pb-5 lg:py-12 lg:pl-12 lg:pr-6">
            <h3 className="max-w-[440px] text-balance font-[family-name:var(--font-display)] text-[32px] leading-[1.1] font-medium text-white sm:text-[42px] lg:text-[clamp(38px,3.8vw,56px)]">{benefit.title}</h3>
            <p className="mt-6 max-w-[360px] text-sm leading-[1.8] text-[#bdbdbd] sm:text-[15px]">{benefit.description}</p>
          </div>
          <BenefitVisual kind={benefit.kind} />
        </div>)}
      </div>
    </div>
  )
}

export default BenefitsShowcase
