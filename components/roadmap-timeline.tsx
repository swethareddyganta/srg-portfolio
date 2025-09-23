"use client"

import * as React from "react"
import Link from "next/link"
import { GraduationCap, Briefcase, FolderGit2, Rocket, Link2, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TimelineType = "education" | "experience" | "project"

export type TimelineItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  type: TimelineType
  description: string
  cta?: { label: string; href: string; external?: boolean }[]
  image?: string
  tags?: string[]
}

const typeStyles: Record<TimelineType, { dot: string; icon: string; accent: string }> = {
  education: {
    dot: "bg-blue-500/20 border-blue-400/40",
    icon: "text-blue-400",
    accent: "from-blue-600/20 to-cyan-600/20",
  },
  experience: {
    dot: "bg-emerald-500/20 border-emerald-400/40",
    icon: "text-emerald-400",
    accent: "from-emerald-600/20 to-teal-600/20",
  },
  project: {
    dot: "bg-purple-500/20 border-purple-400/40",
    icon: "text-purple-400",
    accent: "from-purple-600/20 to-fuchsia-600/20",
  },
}

function extractYear(date: string): string {
  const match = date.match(/\b(?:19|20)\d{2}\b/g)
  return match ? match[0] : ""
}

export function RoadmapTimeline({ items }: { items: TimelineItem[] }) {
  const [activeType, setActiveType] = React.useState<TimelineType | "all">("all")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const filtered = React.useMemo(
    () => (activeType === "all" ? items : items.filter((i) => i.type === activeType)),
    [activeType, items]
  )

  React.useEffect(() => {
    setActiveIndex(0)
  }, [activeType])

  // Scroll spy to highlight the closest item on viewport in the scroller
  React.useEffect(() => {
    if (!listRef.current) return
    const buttons = itemRefs.current.filter(Boolean) as HTMLButtonElement[]
    if (!buttons.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(0.5 - centerY(a)) - Math.abs(0.5 - centerY(b)))
        if (visible[0]) {
          const idx = buttons.findIndex((b) => b === visible[0].target)
          if (idx !== -1) setActiveIndex(idx)
        }
      },
      { root: listRef.current, threshold: [0.3, 0.6, 0.9] }
    )
    buttons.forEach((b) => observer.observe(b))
    return () => observer.disconnect()
  }, [filtered.length])

  function centerY(entry: IntersectionObserverEntry) {
    const rect = (entry.target as HTMLElement).getBoundingClientRect()
    const vh = window.innerHeight
    return (rect.top + rect.height / 2) / vh
  }

  const active = filtered[activeIndex]

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(filtered.length - 1, i + 1))

  // Progress across filtered items
  const progressPct = filtered.length > 1 ? Math.round((activeIndex / (filtered.length - 1)) * 100) : 0

  // Filters removed per feedback

  return (
    <section id="roadmap" className="section bg-black border-t border-gray-800">
      <div className="container-xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
            Journey
          </div>
          <h2 className="headline">My Journey in AI</h2>
          <p className="subheadline mx-auto max-w-2xl">Education, experience, and projects—highlighting my path as an AI Engineer.</p>
        </div>

        {/* Full-bleed marquee (no filters) */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-x-visible overflow-y-visible z-10">
          <InfiniteMarqueeTimeline items={items} onSelect={setActiveIndex} activeIndex={activeIndex} typeStyles={typeStyles} />
        </div>

        {/* Detail card with nav controls */}
        <div className="mt-8 md:mt-10">
          {active && (
            <DetailCard
              active={active}
              activeIndex={activeIndex}
              count={items.length}
              goPrev={goPrev}
              goNext={goNext}
              typeStyles={typeStyles}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function CreativePathTimeline({
  items,
  activeIndex,
  setActiveIndex,
  typeStyles,
}: {
  items: TimelineItem[]
  activeIndex: number
  setActiveIndex: (i: number) => void
  typeStyles: Record<TimelineType, { dot: string; icon: string; accent: string }>
}) {
  const svgRef = React.useRef<SVGSVGElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [dragX, setDragX] = React.useState(0)
  const [isDragging, setDragging] = React.useState(false)

  // Layout constants
  const width = 1100
  const height = 240
  const padding = 32
  const trackY = height / 2

  // Generate a smooth S-curve path with cubic beziers
  const segments = Math.max(2, items.length - 1)
  const spacing = (width - padding * 2) / (segments)
  const points = Array.from({ length: items.length }, (_, i) => ({
    x: padding + i * spacing,
    y: trackY + Math.sin((i / Math.max(1, items.length - 1)) * Math.PI * 1.2) * 60,
  }))

  const d = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`
    const prev = points[i - 1]
    const cx = (prev.x + p.x) / 2
    return acc + ` C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`
  }, "")

  // Map active index to handle x position
  const handleX = points[activeIndex]?.x ?? padding
  const handleY = points[activeIndex]?.y ?? trackY

  // When dragging, find closest point to the handle X and snap active index
  React.useEffect(() => {
    if (!isDragging) return
    const idx = points.reduce((best, p, i) => {
      const dist = Math.abs((p.x + dragX) - handleX)
      return dist < best.dist ? { dist, i } : best
    }, { dist: Infinity, i: activeIndex }).i
    setActiveIndex(idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragX, isDragging])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div className="min-w-[900px] md:min-w-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[260px] block"
          role="group"
          aria-label="Interactive timeline"
        >
          {/* Ambient ASCII/SVG background */}
          <defs>
            <pattern id="tiny-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#111827" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tiny-grid)" opacity="0.25" />
          {/* Path glow */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="colored" />
              <feMerge>
                <feMergeNode in="colored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d={d} fill="none" stroke="#1f2937" strokeWidth="2" className="path-anim" />
          <path d={d} fill="none" stroke="url(#grad)" strokeWidth="3" filter="url(#glow)" opacity="0.6" />

          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Nodes with year labels below */}
          {items.map((it, idx) => {
            const isActive = idx === activeIndex
            const r = isActive ? 8 : 6
            return (
              <g key={it.id} transform={`translate(${points[idx].x}, ${points[idx].y})`}>
                <circle r={r + 10} fill="black" opacity="0.6" />
                <circle r={r} className={cn("stroke-1", typeStyles[it.type].dot)} stroke="#111827" />
                {/* Year extracted from date string if available */}
                <text y={28} textAnchor="middle" className="fill-gray-400 text-[10px]">
                  {extractYear(it.date)}
                </text>
                <foreignObject x={-120} y={-72} width="240" height="64">
                  <button
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-full text-left rounded-md border px-3 py-2 bg-black/60 backdrop-blur-sm",
                      "transition-colors border-gray-800 hover:bg-black/70",
                      isActive && "border-purple-500/40 bg-purple-600/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full border",
                          typeStyles[it.type].dot
                        )}
                      >
                        {it.type === "education" && <GraduationCap className={cn("h-3.5 w-3.5", typeStyles[it.type].icon)} />}
                        {it.type === "experience" && <Briefcase className={cn("h-3.5 w-3.5", typeStyles[it.type].icon)} />}
                        {it.type === "project" && <FolderGit2 className={cn("h-3.5 w-3.5", typeStyles[it.type].icon)} />}
                      </span>
                      <span className="text-[11px] text-gray-400">{it.date}</span>
                    </div>
                    <div className="truncate text-sm font-medium leading-tight mt-1">{it.title}</div>
                    {it.subtitle ? <div className="truncate text-[11px] text-gray-500">{it.subtitle}</div> : null}
                  </button>
                </foreignObject>
              </g>
            )
          })}

          {/* Draggable handle */}
          <g transform={`translate(${handleX + dragX}, ${handleY})`}>
            <circle r={14} fill="#0b0f19" stroke="#4c1d95" strokeWidth="1.5" />
            <circle r={6} fill="#a855f7" />
            <cursor />
            <rect
              x={-16}
              y={-16}
              width={32}
              height={32}
              fill="transparent"
              style={{ cursor: "grab" }}
              onMouseDown={() => setDragging(true)}
            />
          </g>

          {/* Mouse move dragging */}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(e) => {
              if (!isDragging) return
              const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect()
              setDragX(e.clientX - rect.left - handleX)
            }}
            onMouseUp={() => {
              setDragging(false)
              setDragX(0)
            }}
            onMouseLeave={() => {
              setDragging(false)
              setDragX(0)
            }}
          />
        </svg>
      </div>
    </div>
  )
}

// Removed year extraction and years rail per feedback

function DetailCard({
  active,
  activeIndex,
  count,
  goPrev,
  goNext,
  typeStyles,
}: {
  active: TimelineItem
  activeIndex: number
  count: number
  goPrev: () => void
  goNext: () => void
  typeStyles: Record<TimelineType, { dot: string; icon: string; accent: string }>
}) {
  return (
    <div
      className={cn(
        "relative liquid-card p-6 overflow-hidden rounded-2xl"
      )}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const mx = ((e.clientX - rect.left) / rect.width) * 100
        const my = ((e.clientY - rect.top) / rect.height) * 100
        ;(e.currentTarget as HTMLElement).style.setProperty('--mx', `${mx}%`)
        ;(e.currentTarget as HTMLElement).style.setProperty('--my', `${my}%`)
      }}
    >
      <div className={cn("absolute inset-0 opacity-30", `bg-gradient-to-br ${typeStyles[active.type].accent}`)} />
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-sm text-gray-300 mb-1">{active.date}</div>
            <h3 className="text-xl font-medium mb-1">{active.title}</h3>
            {active.subtitle ? (
              <div className="text-sm text-gray-400 mb-3">{active.subtitle}</div>
            ) : null}
          </div>
          <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full border", typeStyles[active.type].dot)}>
            {active.type === "education" && <GraduationCap className={cn("h-5 w-5", typeStyles[active.type].icon)} />}
            {active.type === "experience" && <Briefcase className={cn("h-5 w-5", typeStyles[active.type].icon)} />}
            {active.type === "project" && <FolderGit2 className={cn("h-5 w-5", typeStyles[active.type].icon)} />}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
          <div className="md:col-span-2">
            <p className="text-gray-200 text-sm leading-6">{active.description}</p>
            {active.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide bg-white/5 border border-gray-800 text-gray-300 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            {active.cta?.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {active.cta.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "border-gray-800 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <Link2 className="h-4 w-4" />
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <div className="overflow-hidden rounded-xl">
              {active.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.image} alt="" className="w-full h-52 object-cover" />
              ) : (
                <div className="h-52 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded border",
              activeIndex === 0
                ? "opacity-40 cursor-not-allowed border-gray-800"
                : "bg-white/5 border-gray-800 hover:bg-white/10"
            )}
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>
          <div>
            {activeIndex + 1} / {count}
          </div>
          <button
            onClick={goNext}
            disabled={activeIndex === count - 1}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded border",
              activeIndex === count - 1
                ? "opacity-40 cursor-not-allowed border-gray-800"
                : "bg-white/5 border-gray-800 hover:bg-white/10"
            )}
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function InfiniteMarqueeTimeline({
  items,
  onSelect,
  activeIndex,
  typeStyles,
}: {
  items: TimelineItem[]
  onSelect: (i: number) => void
  activeIndex: number
  typeStyles: Record<TimelineType, { dot: string; icon: string; accent: string }>
}) {
  // Duplicate items to create seamless loop
  const loop = React.useMemo(() => {
    const base = items.map((it, i) => ({ ...it, __k: `a-${i}` }))
    const dup = base.map((it, i) => ({ ...it, __k: `b-${i}` }))
    return [...base, ...dup]
  }, [items])
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const offsetRef = React.useRef(0)
  const speedRef = React.useRef(-0.3)
  const pausedRef = React.useRef(false)
  const draggingRef = React.useRef(false)
  const dragStartXRef = React.useRef(0)
  const dragStartOffsetRef = React.useRef(0)
  const dragDeltaRef = React.useRef(0)
  // Wizard removed per feedback

  const CARD_W = 320
  const GAP = 24 // gap-6 spacing
  const PAD = 24 // px-6 padding
  const baseWidth = React.useMemo(
    () => PAD * 2 + Math.max(1, items.length) * (CARD_W + GAP) - GAP,
    [items.length]
  )

  // rAF-driven auto-scroll for smoothness and drag support
  React.useEffect(() => {
    let raf = 0
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current && trackRef.current) {
        offsetRef.current += speedRef.current
        if (offsetRef.current <= -baseWidth) offsetRef.current += baseWidth
        if (offsetRef.current > 0) offsetRef.current -= baseWidth
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [baseWidth])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden overflow-y-visible py-6"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => { pausedRef.current = false }}
    >
      {/* Years rail removed */}
      <div
        className="will-change-transform"
        ref={trackRef}
        style={{ transform: `translate3d(${offsetRef.current}px,0,0)`, position: 'relative', zIndex: 20, overflow: 'visible', cursor: 'grab' }}
        onPointerDown={(e) => {
          draggingRef.current = true
          pausedRef.current = true
          dragStartXRef.current = e.clientX
          dragStartOffsetRef.current = offsetRef.current
          dragDeltaRef.current = 0
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          ;(e.currentTarget as HTMLElement).style.cursor = 'grabbing'
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current || !trackRef.current) return
          const dx = e.clientX - dragStartXRef.current
          dragDeltaRef.current = dx
          offsetRef.current = dragStartOffsetRef.current + dx
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`
        }}
        onPointerUp={(e) => {
          const dx = Math.abs(dragDeltaRef.current)
          draggingRef.current = false
          pausedRef.current = false
          ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
          ;(e.currentTarget as HTMLElement).style.cursor = 'grab'
          // If movement was tiny, treat as click and select closest card
          if (dx < 6 && trackRef.current) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            const xInTrack = e.clientX - rect.left - offsetRef.current
            const CARD_W = 320
            const GAP = 24
            const PAD = 24
            const approxIndex = Math.round((xInTrack - PAD - CARD_W / 2) / (CARD_W + GAP))
            const total = Math.max(1, (items.length * 2))
            const clamped = Math.max(0, Math.min(approxIndex, total - 1))
            const logicalIndex = ((clamped % items.length) + items.length) % items.length
            onSelect(logicalIndex)
          }
        }}
      >
        {(() => {
          const CARD_W = 320
          const GAP = 24
          const PAD = 24
          const SVG_H = 1
          const BASE_Y = 0
          const totalWidth = PAD * 2 + loop.length * (CARD_W + GAP) - GAP
          return (
            <div className="relative" style={{ width: totalWidth }}>
              {/* Subtle static rail behind cards (no animation) */}
              <div className="pointer-events-none absolute left-0 right-0 top-24 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
              <div className="relative z-10 flex items-stretch gap-6" style={{ paddingLeft: PAD, paddingRight: PAD, width: totalWidth }}>
                {loop.map((it, idx) => {
                  const logicalIndex = idx % (items.length || 1)
                  const isActive = logicalIndex === activeIndex
                  return (
                    <div
                      key={`${(it as any).__k}-${idx}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelect(logicalIndex)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onSelect(logicalIndex)
                        }
                      }}
                      
                      className={cn(
                        "group relative shrink-0 w-[320px] rounded-2xl text-left p-4 transition-transform",
                        "liquid-card hover:-translate-y-0.5",
                        isActive && "shadow-[0_0_0_1px_rgba(168,85,247,0.25)]"
                      )}
                      style={{ marginRight: idx === loop.length - 1 ? 0 : GAP, zIndex: 10, overflow: 'visible' }}
                    >
                      {/* Index badge (bottom-right) */}
                      <div className="absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-gray-800 backdrop-blur-sm">
                        {String(logicalIndex + 1).padStart(2, '0')}
                      </div>
                      <div
                        className="flex items-center gap-3 mb-3"
                        onMouseMove={(e) => {
                          const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect()
                          const mx = ((e.clientX - rect.left) / rect.width) * 100
                          const my = ((e.clientY - rect.top) / rect.height) * 100
                          ;(e.currentTarget.parentElement as HTMLElement).style.setProperty('--mx', `${mx}%`)
                          ;(e.currentTarget.parentElement as HTMLElement).style.setProperty('--my', `${my}%`)
                        }}
                      >
                        <TypeBadge type={it.type} typeStyles={typeStyles} />
                        <div className="min-w-0">
                          <div className="text-xs text-gray-400">{it.date}</div>
                          <div className="truncate font-medium">{it.title}</div>
                          {it.subtitle ? <div className="truncate text-xs text-gray-500">{it.subtitle}</div> : null}
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-300 line-clamp-5 leading-5">{it.description}</p>
                      {it.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.slice(0, 4).map((t) => (
                            <span key={t} className="text-[10px] uppercase tracking-wide bg-white/5 border border-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {it.cta?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                          {it.cta.slice(0, 2).map((c) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              target={c.external ? "_blank" : undefined}
                              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 border-gray-800 bg-white/5 hover:bg-white/10")}
                            >
                              <Link2 className="h-3.5 w-3.5" />
                              <span className="text-xs">{c.label}</span>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                      <div className="pointer-events-none absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                      
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

// Wizard removed

function TypeBadge({ type, typeStyles }: { type: TimelineType; typeStyles: Record<TimelineType, { dot: string; icon: string; accent: string }> }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center border",
        type === 'education' && 'hexagon',
        type === 'experience' && 'rounded-full',
        type === 'project' && 'diamond',
        typeStyles[type].dot
      )}
      style={type === 'project' ? { transform: 'rotate(45deg)' } : undefined}
    >
      {type === "education" && <GraduationCap className={cn("h-4 w-4", typeStyles[type].icon)} />}
      {type === "experience" && <Briefcase className={cn("h-4 w-4", typeStyles[type].icon)} />}
      {type === "project" && <Rocket className={cn("h-4 w-4 -rotate-45", typeStyles[type].icon)} />}
    </span>
  )
}

// Wizard aura removed


