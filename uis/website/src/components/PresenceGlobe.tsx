import { useEffect, useRef, useState } from 'react'
import type { createGlobeRenderer } from './globeRenderer'

function PresenceGlobe() {
  const container = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const renderer = useRef<ReturnType<typeof createGlobeRenderer>>(null)
  const running = useRef(false)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [nearby, setNearby] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setNearby(true)
      observer.disconnect()
    }, { rootMargin: '600px' })
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!nearby) return
    const controller = new AbortController()
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => renderer.current?.setRunning(running.current && !preference.matches)
    Promise.all([
      import('./globeRenderer'),
      fetch('/globe-land.json', { signal: controller.signal }).then(response => {
        if (!response.ok) throw new Error('Globe geography unavailable')
        return response.json()
      }),
    ]).then(([{ createGlobeRenderer }, coordinates]) => {
        if (!canvas.current || controller.signal.aborted) return
        renderer.current = createGlobeRenderer(canvas.current, coordinates)
        setReady(Boolean(renderer.current))
        sync()
      })
      .catch(() => { /* The local SVG remains visible if canvas or geography is unavailable. */ })
    preference.addEventListener('change', sync)
    return () => {
      controller.abort()
      renderer.current?.dispose()
      renderer.current = null
      preference.removeEventListener('change', sync)
    }
  }, [nearby])

  useEffect(() => {
    running.current = visible && pageVisible
    renderer.current?.setRunning(running.current && !matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [visible, pageVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (container.current) observer.observe(container.current)
    const syncVisibility = () => setPageVisible(!document.hidden)
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  return (
      <div className="presence-graphic" ref={container} data-running={visible && pageVisible} aria-hidden="true">
        <div className="globe-scene" data-ready={ready}>
          <img className="globe-fallback" src="/globe-atlantic.svg" alt="" width="1200" height="1040" loading="lazy" />
          <canvas ref={canvas} className="globe-canvas" width="1200" height="1040" />
        </div>
      </div>
  )
}

export default PresenceGlobe
