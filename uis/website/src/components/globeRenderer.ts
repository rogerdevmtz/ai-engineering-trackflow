type Coordinate = [number, number]
type Vector = [number, number, number]

const radians = Math.PI / 180
const radius = 480
const cx = 600
const cy = 540
const latitude = 25 * radians
const sinLat = Math.sin(latitude)
const cosLat = Math.cos(latitude)

function vector([lon, lat]: Coordinate): Vector {
  return [Math.cos(lat * radians) * Math.sin(lon * radians), Math.sin(lat * radians), Math.cos(lat * radians) * Math.cos(lon * radians)]
}

/** Orthographic geography: coastlines, endpoints and route share one camera. */
export function createGlobeRenderer(canvas: HTMLCanvasElement, coordinates: Coordinate[][]) {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return null
  const rings = coordinates.map(ring => {
    const vertices = new Float64Array(ring.length * 3)
    for (let i = 0; i < ring.length; i++) vertices.set(vector(ring[i]), i * 3)
    return { vertices, projected: new Float64Array(vertices.length) }
  })
  const endpoints = [vector([-118.2437, 34.0522]), vector([-.8891, 41.6488])]
  const route = new Float64Array(101 * 3)
  const routeScreen = new Float64Array(route.length)
  const [a, b] = endpoints
  const omega = Math.acos(a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    const height = 1 + .12 * Math.sin(Math.PI * t)
    for (let j = 0; j < 3; j++) route[i * 3 + j] = height * (Math.sin((1 - t) * omega) * a[j] + Math.sin(t * omega) * b[j]) / Math.sin(omega)
  }

  let frame = 0
  let running = false
  let disposed = false
  let elapsed = 0
  let previous = 0
  let lastPaint = 0
  let longitude = -42 * radians
  const ocean = ctx.createRadialGradient(420, 210, 20, cx, cy, radius)
  ocean.addColorStop(0, '#161616')
  ocean.addColorStop(.75, '#080808')
  ocean.addColorStop(1, '#010101')
  const land = ctx.createLinearGradient(420, 80, 850, 850)
  land.addColorStop(0, '#565656')
  land.addColorStop(.5, '#303030')
  land.addColorStop(1, '#101010')
  const shading = ctx.createRadialGradient(430, 260, 80, 700, 600, 660)
  shading.addColorStop(0, '#0000')
  shading.addColorStop(.6, '#0002')
  shading.addColorStop(1, '#000d')

  function project(vertices: Float64Array, output: Float64Array) {
    const c = Math.cos(longitude)
    const s = Math.sin(longitude)
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i] * c - vertices[i + 2] * s
      const z = vertices[i] * s + vertices[i + 2] * c
      output[i] = cx + radius * x
      output[i + 1] = cy - radius * (cosLat * vertices[i + 1] - sinLat * z)
      output[i + 2] = sinLat * vertices[i + 1] + cosLat * z
    }
  }

  function paint() {
    if (!ctx || disposed) return
    longitude = (-42 + 3 * Math.sin(elapsed / 1000 * Math.PI / 90)) * radians
    ctx.setTransform(canvas.width / 1200, 0, 0, canvas.height / 1040, 0, 0)
    ctx.clearRect(0, 0, 1200, 1040)
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
    ctx.fillStyle = ocean
    ctx.fill()
    ctx.clip()
    ctx.fillStyle = land

    for (const ring of rings) {
      project(ring.vertices, ring.projected)
      const points = ring.projected
      let start = -1
      for (let i = 0; i < points.length; i += 3) {
        if (points[i + 2] >= 0) { start = i; break }
      }
      if (start < 0) continue
      ctx.beginPath()
      ctx.moveTo(points[start], points[start + 1])
      let exitAngle: number | null = null
      for (let step = 0; step < points.length; step += 3) {
        const i = (start + step) % points.length
        const j = (i + 3) % points.length
        const front = points[i + 2] >= 0
        const nextFront = points[j + 2] >= 0
        if (front !== nextFront) {
          const t = points[i + 2] / (points[i + 2] - points[j + 2])
          const x = points[i] + t * (points[j] - points[i]) - cx
          const y = points[i + 1] + t * (points[j + 1] - points[i + 1]) - cy
          const angle = Math.atan2(y, x)
          if (front) {
            ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
            exitAngle = angle
          } else if (exitAngle !== null) {
            const delta = ((angle - exitAngle + 3 * Math.PI) % (2 * Math.PI)) - Math.PI
            ctx.arc(cx, cy, radius, exitAngle, exitAngle + delta, delta < 0)
            exitAngle = null
          }
        }
        if (nextFront) ctx.lineTo(points[j], points[j + 1])
      }
      ctx.closePath()
      ctx.fill()
    }
    ctx.fillStyle = shading
    ctx.fillRect(0, 0, 1200, 1040)
    ctx.restore()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = '#ffffff18'
    ctx.lineWidth = 1
    ctx.stroke()

    project(route, routeScreen)
    ctx.beginPath()
    ctx.moveTo(routeScreen[0], routeScreen[1])
    for (let i = 3; i < routeScreen.length; i += 3) ctx.lineTo(routeScreen[i], routeScreen[i + 1])
    ctx.strokeStyle = '#FD430B70'
    ctx.lineWidth = 1.15
    ctx.stroke()
    // One short journey ends at Zaragoza; no automatic loop or pause control.
    const head = (1 - Math.cos(Math.min(elapsed / 4500, 1) * Math.PI)) / 2
    for (let i = 1; i <= 100; i++) {
      const distance = Math.abs(head - (i - .5) / 100)
      if (distance > .1) continue
      ctx.globalAlpha = (1 + Math.cos(Math.PI * distance / .1)) / 2 * .9
      ctx.beginPath()
      ctx.moveTo(routeScreen[(i - 1) * 3], routeScreen[(i - 1) * 3 + 1])
      ctx.lineTo(routeScreen[i * 3], routeScreen[i * 3 + 1])
      ctx.strokeStyle = '#ffb083'
      ctx.lineWidth = 2.3
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    for (let endpoint = 0; endpoint < 2; endpoint++) {
      const index = endpoint * 300
      const x = routeScreen[index]
      const y = routeScreen[index + 1]
      const arrival = Math.max(0, 1 - Math.abs(head - endpoint) / .1)
      ctx.beginPath()
      ctx.arc(x, y, 9 + arrival * 2, 0, 2 * Math.PI)
      ctx.strokeStyle = `rgba(253, 67, 11, ${.31 + arrival * .4})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, 2 * Math.PI)
      ctx.fillStyle = '#FD430B'
      ctx.fill()
    }
  }

  function tick(timestamp: number) {
    if (!running || disposed) return
    if (previous) elapsed = Math.min(4500, elapsed + timestamp - previous)
    previous = timestamp
    if (timestamp - lastPaint >= 1000 / 24 || elapsed === 4500) {
      paint()
      lastPaint = timestamp
    }
    if (elapsed < 4500) frame = requestAnimationFrame(tick)
    else running = false
  }
  const resize = new ResizeObserver(() => {
    const width = canvas.clientWidth
    const density = Math.min(devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * density)
    canvas.height = Math.round(width * 1040 / 1200 * density)
    paint()
  })
  resize.observe(canvas)

  return {
    setRunning(value: boolean) {
      if (running === value || disposed) return
      running = value && elapsed < 4500
      previous = 0
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(tick)
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resize.disconnect()
    },
  }
}
