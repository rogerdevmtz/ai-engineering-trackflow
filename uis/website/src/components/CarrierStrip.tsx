import { useEffect, useRef, useState } from 'react'
import ScrollWords from './ScrollWords'

const carriers = [
  { name: 'UPS', file: 'ups.svg' },
  { name: 'FedEx', file: 'fedex.png' },
  { name: 'DHL', file: 'dhl.svg' },
  { name: 'MRW', file: 'mrw.png' },
  { name: 'SEUR', file: 'seur.png' },
]

function CarrierStrip() {
  const section = useRef<HTMLElement>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let inView = false
    const sync = () => setRunning(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio > 0
      sync()
    }, { threshold: [0, 0.01] })
    if (section.current) observer.observe(section.current)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <section className="carrier-strip" ref={section} aria-labelledby="carrier-heading" data-running={running}>
      <svg className="carrier-filter-definitions" aria-hidden="true" width="0" height="0">
        <defs>
          {/* Preserve the original silhouettes while removing MRW's blue background. */}
          <filter id="carrier-mrw-monochrome" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.55 1.02 -2.55 0 -.08" />
          </filter>
        </defs>
      </svg>
      <div className="content-width">
        <h2 id="carrier-heading"><ScrollWords text="Nuestra red de transportistas." /></h2>
        <p className="sr-only">UPS, FedEx, DHL, MRW y SEUR.</p>
        <div className="carrier-window" aria-hidden="true">
          <div className="carrier-track">
            {[0, 1].map(copy => (
              <div className="carrier-group" key={copy}>
                {carriers.map(carrier => (
                  <div className={`carrier-logo carrier-${carrier.name.toLowerCase()}`} key={carrier.name}>
                    <img src={`/carriers/${carrier.file}`} alt="" width="150" height="56" decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarrierStrip
