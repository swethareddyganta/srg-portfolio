"use client"

import * as React from "react"
import { type TimelineItem } from "@/components/roadmap-timeline"
import { cn } from "@/lib/utils"

type Vec2 = { x: number; y: number }

const TYPE_COLOR: Record<TimelineItem["type"], string> = {
  education: "#60a5fa", // blue-400
  experience: "#34d399", // emerald-400
  project: "#a78bfa", // violet-400
}

export function TimelineMap({ items }: { items: TimelineItem[] }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const miniRef = React.useRef<HTMLCanvasElement | null>(null)
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null)
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null)
  const [enabled, setEnabled] = React.useState<{ education: boolean; experience: boolean; project: boolean }>({ education: true, experience: true, project: true })

  // Pan/zoom state
  const scaleRef = React.useRef(1)
  const translateRef = React.useRef<Vec2>({ x: 0, y: 0 })
  const targetScaleRef = React.useRef<number | null>(null)
  const targetTranslateRef = React.useRef<Vec2 | null>(null)
  const isPanningRef = React.useRef(false)
  const panStartRef = React.useRef<Vec2>({ x: 0, y: 0 })
  const transStartRef = React.useRef<Vec2>({ x: 0, y: 0 })
  const velocityRef = React.useRef<Vec2>({ x: 0, y: 0 })
  const lastMoveRef = React.useRef<{ t: number; x: number; y: number } | null>(null)
  const animRafRef = React.useRef<number | null>(null)
  // Pinch-zoom support
  const activePointersRef = React.useRef<Map<number, Vec2>>(new Map())
  const pinchStartDistRef = React.useRef<number | null>(null)
  const pinchStartScaleRef = React.useRef<number | null>(null)
  const pinchAnchorWorldRef = React.useRef<Vec2 | null>(null)

  // Precompute layout positions in "world" coordinates
  const nodes = React.useMemo(() => {
    const parseYear = (d: string) => {
      const m = d.match(/\b(19|20)\d{2}\b/g)
      if (!m) return null
      return parseInt(m[0])
    }
    // Group by year, fallback to index buckets
    const withYear = items.map((it, i) => ({ i, it, year: parseYear(it.date) ?? (2000 + i) }))
    withYear.sort((a, b) => a.year - b.year)
    // Place on a map-like grid: x by chronological order, y by type lanes
    const laneY: Record<TimelineItem["type"], number> = {
      education: 0,
      experience: 120,
      project: 240,
    }
    const spacingX = 180
    return withYear.map(({ i, it, year }, idx) => ({
      idxOriginal: i,
      type: it.type,
      label: it.title,
      date: it.date,
      year,
      pos: { x: idx * spacingX, y: laneY[it.type] },
    }))
  }, [items])

  // Filtered nodes per legend
  const filteredNodes = React.useMemo(() => nodes.filter(n => enabled[n.type]), [nodes, enabled])

  // Resize + render
  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Locally narrowed, non-null references for nested callbacks
    const canvasEl = canvas as HTMLCanvasElement
    const containerEl = container as HTMLDivElement

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const { clientWidth, clientHeight } = containerEl
      canvasEl.width = Math.floor(clientWidth * dpr)
      canvasEl.height = Math.floor(clientHeight * dpr)
      canvasEl.style.width = clientWidth + "px"
      canvasEl.style.height = clientHeight + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // minimap
      if (miniRef.current) {
        const m = miniRef.current
        m.width = Math.floor(180 * dpr)
        m.height = Math.floor(120 * dpr)
        m.style.width = "180px"
        m.style.height = "120px"
      }
      render()
    }

    function worldToScreen(p: Vec2): Vec2 {
      const s = scaleRef.current
      const t = translateRef.current
      return { x: p.x * s + t.x, y: p.y * s + t.y }
    }

    function screenToWorld(p: Vec2): Vec2 {
      const s = scaleRef.current
      const t = translateRef.current
      return { x: (p.x - t.x) / s, y: (p.y - t.y) / s }
    }

    function drawGrid() {
      const { width, height } = canvasEl
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
      ctx.save()
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)
      ctx.restore()

      // subtle grid in screen space
      const s = scaleRef.current
      const step = 80 * s
      ctx.strokeStyle = "rgba(255,255,255,0.05)"
      ctx.lineWidth = 1
      for (let x = (translateRef.current.x % step); x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = (translateRef.current.y % step); y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }
    }

    function render() {
      drawGrid()
      ctx.save()
      // World transform
      const s = scaleRef.current
      const t = translateRef.current
      ctx.setTransform(s, 0, 0, s, t.x, t.y)

      // connectors - curved quadratic with subtle animated dash
      ctx.strokeStyle = "rgba(168,85,247,0.45)" // purple glow
      ctx.lineWidth = 2 / s
      ctx.setLineDash([8 / s, 8 / s])
      ctx.lineDashOffset = -(Date.now() / 25) / s
      ctx.beginPath()
      for (let i = 1; i < filteredNodes.length; i++) {
        const a = filteredNodes[i - 1].pos
        const b = filteredNodes[i].pos
        const cx = (a.x + b.x) / 2
        const cy = (a.y + b.y) / 2 + (a.y === b.y ? 0 : 40) // bow between lanes
        if (i === 1) ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(cx, cy, b.x, b.y)
      }
      ctx.stroke()

      // arrowheads along path
      for (let i = 1; i < filteredNodes.length; i++) {
        const a = filteredNodes[i - 1].pos, b = filteredNodes[i].pos
        const ang = Math.atan2(b.y - a.y, b.x - a.x)
        const len = 10 / s
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(ang)
        ctx.fillStyle = "rgba(168,85,247,0.5)"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-len, len * 0.5)
        ctx.lineTo(-len, -len * 0.5)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // nodes
      // Cluster or nodes based on zoom level
      const clusterMode = scaleRef.current < 0.7
      const clusters: { x: number; y: number; count: number; color: string; members: number[] }[] = []
      if (clusterMode) {
        const bucketSize = 300 // world units
        const buckets = new Map<string, { sumx: number; sumy: number; count: number; color: string; members: number[] }>()
        filteredNodes.forEach((n, idx) => {
          const bx = Math.floor(n.pos.x / bucketSize)
          const by = Math.floor(n.pos.y / bucketSize)
          const key = `${bx},${by},${n.type}`
          const cur = buckets.get(key) || { sumx: 0, sumy: 0, count: 0, color: TYPE_COLOR[n.type], members: [] }
          cur.sumx += n.pos.x; cur.sumy += n.pos.y; cur.count += 1; cur.members.push(idx)
          buckets.set(key, cur)
        })
        buckets.forEach(v => {
          clusters.push({ x: v.sumx / v.count, y: v.sumy / v.count, count: v.count, color: v.color, members: v.members })
        })
      }

      if (!clusterMode) {
        filteredNodes.forEach((n, i) => {
          const r = (hoverIdx === i || selectedIdx === i) ? 10 : 7
          ctx.beginPath()
          ctx.fillStyle = TYPE_COLOR[n.type]
          ctx.arc(n.pos.x, n.pos.y, r, 0, Math.PI * 2)
          ctx.fill()
          // outline
          ctx.strokeStyle = "rgba(255,255,255,0.25)"
          ctx.lineWidth = 1 / s
          ctx.stroke()
        })
      } else {
        clusters.forEach((c) => {
          const r = Math.min(22, 8 + c.count * 2) / s
          ctx.beginPath()
          ctx.fillStyle = c.color
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1 / s; ctx.stroke()
          // count label
          ctx.fillStyle = "#e5e7eb"; ctx.font = `${12 / s}px ui-sans-serif, system-ui, -apple-system`
          ctx.fillText(String(c.count), c.x + 6 / s, c.y - 6 / s)
        })
      }

      // year labels where year changes
      ctx.fillStyle = "rgba(255,255,255,0.5)"
      ctx.font = `${12 / s}px ui-sans-serif, system-ui, -apple-system`
      for (let i = 0; i < filteredNodes.length; i++) {
        const prevYear = i > 0 ? filteredNodes[i - 1].year : null
        if (filteredNodes[i].year && filteredNodes[i].year !== prevYear) {
          ctx.fillText(String(filteredNodes[i].year), filteredNodes[i].pos.x, filteredNodes[i].pos.y - 16 / s)
        }
      }

      // lane labels
      const minX = (clusterMode ? (clusters.length ? Math.min(...clusters.map(n => n.x)) : 0) : (filteredNodes.length ? Math.min(...filteredNodes.map(n => n.pos.x)) : 0))
      ctx.fillStyle = "rgba(255,255,255,0.35)"
      ctx.font = `${13 / s}px ui-sans-serif, system-ui, -apple-system`
      ;([
        { t: 'education', y: 0, label: 'Education' },
        { t: 'experience', y: 120, label: 'Experience' },
        { t: 'project', y: 240, label: 'Projects' },
      ] as const).forEach(row => {
        if (!enabled[row.t]) return
        ctx.fillText(row.label, minX - 100 / s, row.y)
      })

      // selection pulse
      if (!clusterMode && selectedIdx != null && filteredNodes[selectedIdx]) {
        const n = filteredNodes[selectedIdx]
        const pulse = 6 + 2 * Math.sin(Date.now() / 350)
        ctx.beginPath()
        ctx.strokeStyle = `${TYPE_COLOR[n.type]}AA`
        ctx.lineWidth = 2 / s
        ctx.arc(n.pos.x, n.pos.y, 12 + pulse, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()

      // tooltip in screen space
      if (!clusterMode && hoverIdx != null) {
        const node = filteredNodes[hoverIdx]
        const screen = worldToScreen(node.pos)
        const pad = 8
        const text = node.label
        ctx.save()
        ctx.font = `12px ui-sans-serif, system-ui, -apple-system`
        const w = Math.min(280, Math.max(80, ctx.measureText(text).width + pad * 2))
        const h = 28
        const x = Math.max(8, Math.min(canvasEl.width / (window.devicePixelRatio||1) - w - 8, screen.x + 12))
        const y = Math.max(8, screen.y - h - 12)
        // background
        ctx.fillStyle = "rgba(0,0,0,0.7)"
        roundRect(ctx, x, y, w, h, 8); ctx.fill()
        ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.stroke()
        // text
        ctx.fillStyle = "#e5e7eb"; ctx.fillText(text, x + pad, y + h/2 + 4)
        ctx.restore()
      }
    }

    function renderMini() {
      if (!miniRef.current) return
      const m = miniRef.current
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const mctx = m.getContext('2d')!
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = m.width / dpr, h = m.height / dpr
      mctx.clearRect(0, 0, w, h)
      // compute bounds
      const all = filteredNodes
      if (!all.length) return
      const minX = Math.min(...all.map(n => n.pos.x))
      const maxX = Math.max(...all.map(n => n.pos.x))
      const minY = Math.min(...all.map(n => n.pos.y))
      const maxY = Math.max(...all.map(n => n.pos.y))
      const pad = 20
      const sx = (w - pad * 2) / Math.max(1, (maxX - minX || 1))
      const sy = (h - pad * 2) / Math.max(1, (maxY - minY || 1))
      const s = Math.min(sx, sy)
      const ox = pad - minX * s
      const oy = pad - minY * s
      // path
      mctx.strokeStyle = 'rgba(168,85,247,0.5)'
      mctx.lineWidth = 1
      mctx.beginPath()
      all.forEach((n, i) => {
        const x = n.pos.x * s + ox
        const y = n.pos.y * s + oy
        if (i === 0) mctx.moveTo(x, y); else mctx.lineTo(x, y)
      })
      mctx.stroke()
      // nodes
      all.forEach((n) => {
        mctx.beginPath()
        mctx.fillStyle = TYPE_COLOR[n.type]
        mctx.arc(n.pos.x * s + ox, n.pos.y * s + oy, 2.5, 0, Math.PI * 2)
        mctx.fill()
      })
      // viewport rectangle
      const invS = 1 / scaleRef.current
      const t = translateRef.current
      const topLeft = screenToWorld({ x: 0, y: 0 })
      const bottomRight = screenToWorld({ x: canvasEl.width / (window.devicePixelRatio||1), y: canvasEl.height / (window.devicePixelRatio||1) })
      const rx = topLeft.x * s + ox
      const ry = topLeft.y * s + oy
      const rw = (bottomRight.x - topLeft.x) * s
      const rh = (bottomRight.y - topLeft.y) * s
      mctx.strokeStyle = '#e5e7eb'
      mctx.lineWidth = 1
      mctx.strokeRect(rx, ry, rw, rh)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(containerEl)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = canvasEl.getBoundingClientRect()
      const mouse: Vec2 = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const worldBefore = screenToWorld(mouse)
      const delta = -Math.sign(e.deltaY) * 0.1
      scaleRef.current = Math.max(0.4, Math.min(2.5, scaleRef.current * (1 + delta)))
      const worldAfter = worldToScreen(worldBefore)
      translateRef.current.x += (mouse.x - worldAfter.x)
      translateRef.current.y += (mouse.y - worldAfter.y)
      render()
      renderMini()
    }

    const onPointerDown = (e: PointerEvent) => {
      isPanningRef.current = true
      panStartRef.current = { x: e.clientX, y: e.clientY }
      transStartRef.current = { ...translateRef.current }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      lastMoveRef.current = { t: performance.now(), x: e.clientX, y: e.clientY }
      // track pointers for pinch
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (activePointersRef.current.size === 2) {
        const pts = Array.from(activePointersRef.current.values())
        const dx = pts[0].x - pts[1].x
        const dy = pts[0].y - pts[1].y
        pinchStartDistRef.current = Math.hypot(dx, dy)
        pinchStartScaleRef.current = scaleRef.current
        const centerScreen = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
        pinchAnchorWorldRef.current = screenToWorld({ x: centerScreen.x - (canvasEl.getBoundingClientRect().left), y: centerScreen.y - (canvasEl.getBoundingClientRect().top) })
        // during pinch, disable panning
        isPanningRef.current = false
      }
    }
    const onPointerMove = (e: PointerEvent) => {
      // update stored pointer
      if (activePointersRef.current.has(e.pointerId)) {
        activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      }
      // pinch zoom when two pointers
      if (activePointersRef.current.size === 2 && pinchStartDistRef.current && pinchStartScaleRef.current != null && pinchAnchorWorldRef.current) {
        const pts = Array.from(activePointersRef.current.values())
        const dx = pts[0].x - pts[1].x
        const dy = pts[0].y - pts[1].y
        const dist = Math.hypot(dx, dy)
        const factor = Math.max(0.5, Math.min(2.0, dist / pinchStartDistRef.current))
        const newScale = Math.max(0.4, Math.min(2.5, pinchStartScaleRef.current * factor))
        const centerScreen = { x: (pts[0].x + pts[1].x) / 2 - canvasEl.getBoundingClientRect().left, y: (pts[0].y + pts[1].y) / 2 - canvasEl.getBoundingClientRect().top }
        // keep anchor under centerScreen
        scaleRef.current = newScale
        const ws = worldToScreen(pinchAnchorWorldRef.current)
        translateRef.current.x += centerScreen.x - ws.x
        translateRef.current.y += centerScreen.y - ws.y
        render(); renderMini()
        return
      }

      if (isPanningRef.current) {
        const dx = e.clientX - panStartRef.current.x
        const dy = e.clientY - panStartRef.current.y
        translateRef.current = { x: transStartRef.current.x + dx, y: transStartRef.current.y + dy }
        render(); renderMini()
        const now = performance.now()
        const last = lastMoveRef.current
        if (last) {
          const dt = Math.max(16, now - last.t)
          velocityRef.current = { x: (e.clientX - last.x) / dt * 16, y: (e.clientY - last.y) / dt * 16 }
        }
        lastMoveRef.current = { t: now, x: e.clientX, y: e.clientY }
      } else {
        // hover
        const rect = canvasEl.getBoundingClientRect()
        const mouse: Vec2 = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        const w = screenToWorld(mouse)
        let closest: number | null = null
        let minD = 20 / scaleRef.current
        filteredNodes.forEach((n, i) => {
          const dx = n.pos.x - w.x
          const dy = n.pos.y - w.y
          const d = Math.hypot(dx, dy)
          if (d < minD) { minD = d; closest = i }
        })
        if (closest !== hoverIdx) { setHoverIdx(closest); render() }
      }
    }
    const onPointerUp = (e: PointerEvent) => {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
      // remove pointer from active set
      activePointersRef.current.delete(e.pointerId)
      if (activePointersRef.current.size < 2) {
        pinchStartDistRef.current = null
        pinchStartScaleRef.current = null
        pinchAnchorWorldRef.current = null
      }
      if (isPanningRef.current) {
        isPanningRef.current = false
        // inertia
        const friction = 0.92
        if (animRafRef.current) cancelAnimationFrame(animRafRef.current)
        const step = () => {
          velocityRef.current.x *= friction
          velocityRef.current.y *= friction
          translateRef.current = { x: translateRef.current.x + velocityRef.current.x, y: translateRef.current.y + velocityRef.current.y }
          render(); renderMini()
          if (Math.hypot(velocityRef.current.x, velocityRef.current.y) > 0.2) {
            animRafRef.current = requestAnimationFrame(step)
          }
        }
        animRafRef.current = requestAnimationFrame(step)
        return
      }
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouse: Vec2 = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const w = screenToWorld(mouse)
      const clusterMode = scaleRef.current < 0.7
      if (clusterMode) {
        // pick nearest cluster and zoom in to expand
        let best: { idx: number; d: number } | null = null
        let idx = -1
        // rebuild clusters similar to render
        const bucketSize = 300
        const buckets = new Map<string, { x: number; y: number; count: number }>()
        filteredNodes.forEach((n) => {
          const bx = Math.floor(n.pos.x / bucketSize)
          const by = Math.floor(n.pos.y / bucketSize)
          const key = `${bx},${by},${n.type}`
          const cur = buckets.get(key) || { x: 0, y: 0, count: 0 }
          cur.x += n.pos.x; cur.y += n.pos.y; cur.count += 1
          buckets.set(key, cur)
        })
        const cs: Vec2[] = []
        buckets.forEach((v) => cs.push({ x: v.x / v.count, y: v.y / v.count }))
        cs.forEach((c, i) => {
          const d = Math.hypot(c.x - w.x, c.y - w.y)
          if (!best || d < best.d) best = { idx: i, d }
        })
        if (best) {
          // zoom in towards clicked cluster center
          const el = containerRef.current
          if (!el) return
          const { clientWidth, clientHeight } = el
          targetScaleRef.current = Math.max(0.9, scaleRef.current * 1.4)
          targetTranslateRef.current = { x: clientWidth / 2 - w.x * (targetScaleRef.current || scaleRef.current), y: clientHeight / 2 - w.y * (targetScaleRef.current || scaleRef.current) }
          animateCamera()
        }
      } else {
        // pick node
        let picked: number | null = null
        let minD = 14 / scaleRef.current
        filteredNodes.forEach((n, i) => {
          const d = Math.hypot(n.pos.x - w.x, n.pos.y - w.y)
          if (d < minD) { minD = d; picked = i }
        })
        if (picked != null) {
          setSelectedIdx(picked)
          centerOn(picked)
        }
      }
    }

    function centerOn(idx: number) {
      const node = filteredNodes[idx]
      const el = containerRef.current
      if (!el) return
      const { clientWidth, clientHeight } = el
      const desiredScale = Math.min(1.4, Math.max(0.8, scaleRef.current))
      targetScaleRef.current = desiredScale
      const cx = clientWidth / 2
      const cy = clientHeight / 2
      targetTranslateRef.current = { x: cx - node.pos.x * desiredScale, y: cy - node.pos.y * desiredScale }
      animateCamera()
    }

    function animateCamera() {
      let raf = 0
      const step = () => {
        let done = true
        if (targetScaleRef.current != null) {
          const s = scaleRef.current
          const ts = targetScaleRef.current
          const ns = s + (ts - s) * 0.12
          if (Math.abs(ns - ts) > 0.001) { scaleRef.current = ns; done = false } else { scaleRef.current = ts; targetScaleRef.current = null }
        }
        if (targetTranslateRef.current != null) {
          const t = translateRef.current
          const tt = targetTranslateRef.current
          const nx = t.x + (tt.x - t.x) * 0.12
          const ny = t.y + (tt.y - t.y) * 0.12
          if (Math.hypot(nx - tt.x, ny - tt.y) > 0.5) { translateRef.current = { x: nx, y: ny }; done = false } else { translateRef.current = tt; targetTranslateRef.current = null }
        }
        render()
        if (!done) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    function roundRect(ctx2: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      ctx2.beginPath()
      ctx2.moveTo(x + r, y)
      ctx2.arcTo(x + w, y, x + w, y + h, r)
      ctx2.arcTo(x + w, y + h, x, y + h, r)
      ctx2.arcTo(x, y + h, x, y, r)
      ctx2.arcTo(x, y, x + w, y, r)
      ctx2.closePath()
    }

    let zoomTimer: number | null = null
    const onWheelDebounced = (e: WheelEvent) => {
      onWheel(e)
      if (zoomTimer) window.clearTimeout(zoomTimer)
      zoomTimer = window.setTimeout(() => {
        // snap to nearest node to center
        const el = containerRef.current
        if (!el) return
        const center = screenToWorld({ x: (el.clientWidth)/2, y: (el.clientHeight)/2 })
        let bestIdx = 0
        let bestD = Infinity
        filteredNodes.forEach((n, i) => {
          const d = Math.hypot(n.pos.x - center.x, n.pos.y - center.y)
          if (d < bestD) { bestD = d; bestIdx = i }
        })
        centerOn(bestIdx)
      }, 250)
    }

    canvasEl.addEventListener("wheel", onWheelDebounced as any, { passive: false })
    canvasEl.addEventListener("pointerdown", onPointerDown)
    canvasEl.addEventListener("pointermove", onPointerMove)
    canvasEl.addEventListener("pointerup", onPointerUp)
    canvasEl.addEventListener("click", onClick)

    return () => {
      ro.disconnect()
      if (zoomTimer) window.clearTimeout(zoomTimer)
      canvasEl.removeEventListener("wheel", onWheelDebounced as any)
      canvasEl.removeEventListener("pointerdown", onPointerDown)
      canvasEl.removeEventListener("pointermove", onPointerMove)
      canvasEl.removeEventListener("pointerup", onPointerUp)
      canvasEl.removeEventListener("click", onClick)
    }
  }, [nodes, hoverIdx, selectedIdx])

  const selected = selectedIdx != null ? filteredNodes[selectedIdx] : null
  const item = selected ? items[selected.idxOriginal] : null

  return (
    <section className="section bg-black border-t border-gray-800">
      <div className="container-xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
            Journey Map
          </div>
          <h2 className="headline">Interactive Map of My Work</h2>
          <p className="subheadline mx-auto">Pan, zoom, and explore milestones across education, experience, and projects.</p>
        </div>
        <div
          ref={containerRef}
          className="relative w-full h-[420px] sm:h-[480px] md:h-[640px] rounded-xl border border-gray-800 overflow-hidden touch-none"
          tabIndex={0}
          onKeyDown={(e) => {
            if (!items.length) return
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              const next = selectedIdx != null ? (selectedIdx + 1) % filteredNodes.length : 0
              setSelectedIdx(next)
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault()
              const prev = selectedIdx != null ? (selectedIdx - 1 + filteredNodes.length) % filteredNodes.length : 0
              setSelectedIdx(prev)
            } else if (e.key === '+') {
              scaleRef.current = Math.min(2.5, scaleRef.current * 1.1)
            } else if (e.key === '-') {
              scaleRef.current = Math.max(0.4, scaleRef.current / 1.1)
            }
          }}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
          {/* Minimap removed per feedback */}
          {/* Legend */}
          <div className="absolute left-4 top-4 flex gap-2">
            {(['education','experience','project'] as const).map(t => (
              <button key={t} onClick={() => setEnabled(prev => ({ ...prev, [t]: !prev[t] }))}
                className={cn("text-[11px] px-2 py-1 rounded-full border", enabled[t] ? "bg-white/10 border-gray-700" : "bg-white/5 border-gray-800 opacity-60")}
              >{t}</button>
            ))}
          </div>
          {selected && item && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-full max-w-xl px-4">
              <div className={cn("liquid-card rounded-2xl p-4")}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  const mx = ((e.clientX - rect.left) / rect.width) * 100
                  const my = ((e.clientY - rect.top) / rect.height) * 100
                  ;(e.currentTarget as HTMLElement).style.setProperty('--mx', `${mx}%`)
                  ;(e.currentTarget as HTMLElement).style.setProperty('--my', `${my}%`)
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-gray-400">{item.date}</div>
                    <div className="font-medium">{item.title}</div>
                    {item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-gray-800">{item.type}</span>
                </div>
                <p className="text-sm text-gray-300 mt-3">{item.description}</p>
                {item.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.slice(0, 5).map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wide bg-white/5 border border-gray-800 text-gray-300 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                ) : null}
                {item.cta?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.cta.slice(0, 2).map(c => (
                      <a key={c.label} href={c.href} target={c.external ? "_blank" : undefined} className="text-xs px-2 py-1 rounded border border-gray-800 bg-white/5 hover:bg-white/10 inline-flex items-center gap-1">
                        <span>↗</span>{c.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


