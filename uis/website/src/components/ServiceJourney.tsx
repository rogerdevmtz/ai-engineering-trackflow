import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { services } from '../siteContent'

function ServiceJourney({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLOListElement>(null)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const metrics = useRef({ pinned: false, top: 0, stride: 0, travel: 0 })
  const snapToScroll = useRef(false)
  const [active, setActive] = useState({ index: 0, previous: 0, instant: false })
  const [photosNearby, setPhotosNearby] = useState(false)
  const [loadedPhotos, setLoadedPhotos] = useState(() => services.map(() => false))

  useEffect(() => {
    // A cached first photo can finish before React attaches its load listener.
    const images = visual.current?.querySelectorAll('img')
    if (!images) return
    setLoadedPhotos(previous => {
      const next = previous.map((loaded, index) => loaded || (
        images[index].complete && images[index].naturalWidth > 0 && !images[index].currentSrc.startsWith('data:')
      ))
      return next.some((loaded, index) => loaded !== previous[index]) ? next : previous
    })
  }, [photosNearby])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setPhotosNearby(true)
      observer.disconnect()
    }, { rootMargin: '400px' })
    if (visual.current) observer.observe(visual.current)
    return () => observer.disconnect()
  }, [])

  function select(index: number, keyboard: boolean) {
    setPhotosNearby(true)
    const layout = metrics.current
    if (layout.pinned && container.current) {
      if (keyboard) {
        snapToScroll.current = true
        setActive(previous => ({ index, previous: previous.index, instant: true }))
      }
      window.scrollTo({ top: scrollY + container.current.getBoundingClientRect().top - layout.top + index * layout.travel / (services.length - 1),
        behavior: keyboard ? 'instant' : 'smooth' })
      return
    }
    setActive(previous => ({ index, previous: previous.index, instant: keyboard }))
    const row = rows.current[index]
    if (!row) return
    const line = innerWidth <= 760
      ? (80 + (visual.current?.offsetHeight ?? 0) + innerHeight) / 2
      : innerHeight * .55
    const rect = row.getBoundingClientRect()
    window.scrollTo({ top: scrollY + rect.top + rect.height / 2 - line,
      behavior: keyboard || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  useEffect(() => {
    let frame = 0
    let visible = false
    let displayedProgress = NaN
    let lastTime = 0
    const sync = (time: number) => {
      frame = 0
      if (!visible) return
      const layout = metrics.current
      if (layout.pinned && container.current && track.current) {
        const progress = Math.max(0, Math.min(1, (layout.top - container.current.getBoundingClientRect().top) / layout.travel))
        const elapsed = lastTime ? Math.min(time - lastTime, 64) : 1000 / 60
        lastTime = time
        // Smooth only the list, keeping native scroll and the pinned camera intact.
        const damping = innerWidth <= 760 ? 64 : 88
        if (!Number.isFinite(displayedProgress) || snapToScroll.current) displayedProgress = progress
        else displayedProgress += (progress - displayedProgress) * (1 - Math.exp(-elapsed / damping))
        snapToScroll.current = false
        const distance = Math.abs(progress - displayedProgress) * layout.stride * (services.length - 1)
        if (distance < .3) displayedProgress = progress
        track.current.style.transform = `translate3d(0, ${-displayedProgress * layout.stride * (services.length - 1)}px, 0)`
        const position = displayedProgress * (services.length - 1)
        const index = Math.round(position)
        // A small dead band prevents flicker when resting near a photo boundary.
        setActive(previous => previous.index === index || Math.abs(position - previous.index) < .56
          ? previous : { index, previous: previous.index, instant: false })
        if (distance >= .3) frame = requestAnimationFrame(sync)
        else lastTime = 0
        return
      }
      const line = innerWidth <= 760
        ? (80 + (visual.current?.offsetHeight ?? 0) + innerHeight) / 2
        : innerHeight * .55
      let index = 0
      let distance = Infinity
      for (let i = 0; i < rows.current.length; i++) {
        const rect = rows.current[i]?.getBoundingClientRect()
        if (!rect) continue
        const next = Math.abs(rect.top + rect.height / 2 - line)
        if (next < distance) { index = i; distance = next }
      }
      setActive(previous => previous.index === index ? previous : { index, previous: previous.index, instant: false })
    }
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(sync) }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    const measure = () => {
      if (!container.current || !stage.current || !track.current || !windowRef.current) return
      displayedProgress = NaN
      lastTime = 0
      let pinned = !reduce.matches && innerHeight >= (innerWidth <= 760 ? 560 : 650)
      container.current.dataset.pinned = String(pinned)
      if (pinned) {
        const top = parseFloat(getComputedStyle(stage.current).top)
        const stride = windowRef.current.clientHeight * (innerWidth <= 760 ? 1 : .6)
        const travel = Math.max(stride, innerHeight * .55) * (services.length - 1)
        metrics.current = { pinned, top, stride, travel }
        track.current.style.setProperty('--journey-step-height', `${stride}px`)
        container.current.style.height = `${stage.current.offsetHeight + travel}px`
        // Larger text or spacing can exceed a short viewport even above the height threshold.
        pinned = stage.current.scrollHeight <= stage.current.clientHeight + 1
          && rows.current.every(row => !row || row.scrollHeight <= row.clientHeight + 1)
      }
      if (!pinned) {
        container.current.dataset.pinned = 'false'
        metrics.current.pinned = false
        container.current.style.removeProperty('height')
        track.current.style.removeProperty('transform')
        track.current.style.removeProperty('--journey-step-height')
      }
      schedule()
    }
    const goToHash = () => {
      const index = services.findIndex(service => `#${service.id}` === location.hash)
      if (index >= 0) select(index, true)
    }
    const followAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a') : null
      const href = link?.getAttribute('href')
      const index = services.findIndex(service => `#${service.id}` === href)
      if (index < 0) return
      event.preventDefault()
      history.pushState(null, '', href)
      select(index, event.detail === 0)
      rows.current[index]?.focus({ preventScroll: true })
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) {
        cancelAnimationFrame(frame)
        frame = 0
        displayedProgress = NaN
        lastTime = 0
      }
      schedule()
    })
    if (container.current) observer.observe(container.current)
    const resize = new ResizeObserver(measure)
    if (stage.current) resize.observe(stage.current)
    const intro = stage.current?.querySelector('.section-intro')
    if (intro) resize.observe(intro)
    rows.current.forEach(row => { if (row?.lastElementChild) resize.observe(row.lastElementChild) })
    measure()
    goToHash()
    reduce.addEventListener('change', measure)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('hashchange', goToHash)
    document.addEventListener('click', followAnchor)
    return () => {
      observer.disconnect()
      resize.disconnect()
      cancelAnimationFrame(frame)
      reduce.removeEventListener('change', measure)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('hashchange', goToHash)
      document.removeEventListener('click', followAnchor)
    }
  }, [])

  return (
    <div className="service-story group/journey" ref={container} data-instant={active.instant}>
      <div className="group-data-[pinned=true]/journey:sticky group-data-[pinned=true]/journey:top-20 group-data-[pinned=true]/journey:flex group-data-[pinned=true]/journey:h-[calc(100svh-100px)] group-data-[pinned=true]/journey:flex-col min-[761px]:group-data-[pinned=true]/journey:top-24 min-[761px]:group-data-[pinned=true]/journey:h-[calc(100svh-120px)] max-[760px]:group-data-[pinned=true]/journey:[&_.section-intro]:gap-3 max-[760px]:group-data-[pinned=true]/journey:[&_.eyebrow]:mb-3 max-[760px]:group-data-[pinned=true]/journey:[&_.section-intro>p]:max-w-[400px] max-[760px]:group-data-[pinned=true]/journey:[&_.section-intro>p]:text-xs max-[760px]:group-data-[pinned=true]/journey:[&_.section-intro>p]:leading-[1.6]" ref={stage}>
      {children}
      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-6 min-[761px]:mt-[70px] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[761px]:gap-[clamp(48px,7vw,110px)] group-data-[pinned=true]/journey:mt-5 group-data-[pinned=true]/journey:min-h-0 group-data-[pinned=true]/journey:flex-1 group-data-[pinned=true]/journey:items-stretch max-[760px]:group-data-[pinned=true]/journey:grid-rows-[minmax(120px,1fr)_minmax(154px,.85fr)] max-[760px]:group-data-[pinned=true]/journey:gap-[14px] min-[761px]:group-data-[pinned=true]/journey:mt-10">
      <div className="sticky top-20 z-[2] bg-black py-2 min-[761px]:top-[110px] min-[761px]:z-auto min-[761px]:py-0 group-data-[pinned=true]/journey:relative group-data-[pinned=true]/journey:top-auto group-data-[pinned=true]/journey:min-h-0 group-data-[pinned=true]/journey:p-0" ref={visual}>
        <figure className="relative group-data-[pinned=true]/journey:h-full" id="service-visual">
          <div className="relative h-[clamp(180px,28svh,260px)] overflow-hidden rounded-[4px] bg-[var(--color-surface)] min-[761px]:h-[clamp(350px,58svh,600px)] group-data-[pinned=true]/journey:h-full">
            {services.map((service, index) => (
              <img key={service.id} src={photosNearby
                ? `/service-${service.image}-v1.webp`
                : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E'}
                data-src={`/service-${service.image}-v1.webp`}
                onLoad={event => {
                  if (event.currentTarget.currentSrc.startsWith('data:')) return
                  setLoadedPhotos(previous => previous[index] ? previous : previous.map((loaded, i) => i === index || loaded))
                }}
                alt={index === active.index ? `Imagen ilustrativa generada con IA: ${service.alt}` : ''}
                aria-hidden={index !== active.index} data-active={index === active.index && loadedPhotos[index]}
                data-previous={index === (loadedPhotos[active.previous] ? active.previous : loadedPhotos.findIndex(Boolean))}
                loading={photosNearby ? 'eager' : 'lazy'} fetchPriority={index === active.index ? 'high' : 'low'} decoding="async" width="960" height="1200" className="absolute inset-0 block size-full object-cover opacity-0 max-[760px]:object-[center_48%] data-[previous=true]:z-[1] data-[previous=true]:opacity-100 data-[active=true]:z-[2] data-[active=true]:opacity-100 data-[active=true]:transition-opacity data-[active=true]:duration-[520ms] data-[active=true]:ease-[var(--ease-in-out)] motion-reduce:transition-none group-data-[instant=true]/journey:transition-none" />
            ))}
            <noscript><img src={`/service-${services[0].image}-v1.webp`} alt="" loading="lazy" width="960" height="1200" className="absolute inset-0 block size-full object-cover max-[760px]:object-[center_48%]" /></noscript>
          </div>
        </figure>
      </div>
      <div className="group-data-[pinned=true]/journey:min-h-0 group-data-[pinned=true]/journey:overflow-clip group-data-[pinned=true]/journey:px-2 group-data-[pinned=true]/journey:-mx-2" ref={windowRef}>
      <ol className="m-0 list-none border-b border-[var(--color-border)] p-0 min-[761px]:pb-[100px] group-data-[pinned=true]/journey:border-0 group-data-[pinned=true]/journey:p-0" ref={track}>
        {services.map((service, index) => (
          <li id={service.id} tabIndex={-1} key={service.id} ref={element => { rows.current[index] = element }} data-active={active.index === index} className="group/step relative grid min-h-[280px] grid-cols-[38px_minmax(0,1fr)] content-center gap-4 border-t border-[var(--color-border)] py-9 scroll-mt-[calc(50svh+clamp(90px,14svh,130px)-192px)] before:absolute before:-top-px before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[var(--color-accent)] before:transition-transform before:duration-[240ms] before:ease-[var(--ease-out)] before:content-[''] data-[active=true]:before:scale-x-100 min-[761px]:min-h-[300px] min-[761px]:grid-cols-[50px_minmax(0,1fr)] min-[761px]:gap-5 min-[761px]:py-12 min-[761px]:scroll-mt-[max(0px,calc(55svh-250px))] group-data-[pinned=true]/journey:h-[var(--journey-step-height)] group-data-[pinned=true]/journey:min-h-[var(--journey-step-height)] group-data-[pinned=true]/journey:py-[18px] min-[761px]:group-data-[pinned=true]/journey:py-6 motion-reduce:before:transition-none group-data-[instant=true]/journey:before:transition-none">
            <span className="text-[var(--color-accent)] font-[family-name:var(--font-display)] text-xl leading-[1.6]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] leading-[1.25] font-medium [overflow-wrap:anywhere] min-[761px]:text-[clamp(24px,2vw,32px)] max-[760px]:group-data-[pinned=true]/journey:text-[clamp(24px,6vw,28px)]"><button className="block min-h-11 cursor-pointer border-0 bg-transparent p-0 text-left text-[#a8a8a8] [font:inherit] transition-colors duration-[240ms] group-data-[active=true]/step:text-white hover:text-white focus-visible:outline-2 focus-visible:outline-[#ff9a73] focus-visible:outline-offset-4" type="button" aria-pressed={active.index === index} aria-controls="service-visual"
                onFocus={event => { if (event.currentTarget.matches(':focus-visible') && active.index !== index) select(index, true) }}
                onClick={event => select(index, event.detail === 0)}>{service.title}</button></h3>
              <p className="mt-[10px] max-w-[385px] text-sm leading-[1.8] text-[var(--color-muted)] max-[760px]:group-data-[pinned=true]/journey:text-[13px] max-[760px]:group-data-[pinned=true]/journey:leading-[1.7]">{service.description}</p>
            </div>
          </li>
        ))}
      </ol>
      </div>
      </div>
      </div>
    </div>
  )
}

export default ServiceJourney
