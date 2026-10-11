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

  function select(index: number, keyboard: boolean) {
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
    <div className="service-story" ref={container} data-instant={active.instant}>
      <div className="service-stage" ref={stage}>
      {children}
      <div className="service-journey">
      <div className="journey-images" ref={visual}>
        <figure className="journey-visual" id="service-visual">
          <div className="journey-photo-stack">
            {services.map((service, index) => (
              <img key={service.id} src={`/service-${service.image}-v1.webp`}
                alt={index === active.index ? `Imagen ilustrativa generada con IA: ${service.alt}` : ''}
                aria-hidden={index !== active.index} data-active={index === active.index}
                data-previous={index === active.previous}
                loading="lazy" decoding="async" width="960" height="1200" />
            ))}
          </div>
        </figure>
      </div>
      <div className="journey-step-window" ref={windowRef}>
      <ol className="journey-steps" ref={track}>
        {services.map((service, index) => (
          <li id={service.id} tabIndex={-1} key={service.id} ref={element => { rows.current[index] = element }} data-active={active.index === index}>
            <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3><button type="button" aria-pressed={active.index === index} aria-controls="service-visual"
                onFocus={event => { if (event.currentTarget.matches(':focus-visible') && active.index !== index) select(index, true) }}
                onClick={event => select(index, event.detail === 0)}>{service.title}</button></h3>
              <p>{service.description}</p>
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
