import { useCallback, useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

const SPARK_COLOR = '#f59e0b'
const SPARK_SIZE = 10
const SPARK_RADIUS = 15
const SPARK_COUNT = 8
const DURATION_MS = 400

function easeOutQuad(t: number): number {
  return t * (2 - t)
}

function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const rafRef = useRef<number | null>(null)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = performance.now() - spark.startTime
        if (elapsed >= DURATION_MS) return false

        const progress = elapsed / DURATION_MS
        const eased = easeOutQuad(progress)
        const distance = eased * SPARK_RADIUS
        const lineLength = SPARK_SIZE * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx!.strokeStyle = SPARK_COLOR
        ctx!.lineWidth = 2
        ctx!.beginPath()
        ctx!.moveTo(x1, y1)
        ctx!.lineTo(x2, y2)
        ctx!.stroke()

        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const now = performance.now()
      const newSparks: Spark[] = Array.from({ length: SPARK_COUNT }, (_, i) => ({
        x: event.clientX,
        y: event.clientY,
        angle: (2 * Math.PI * i) / SPARK_COUNT,
        startTime: now,
      }))
      sparksRef.current.push(...newSparks)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" />
}

export default ClickSpark
