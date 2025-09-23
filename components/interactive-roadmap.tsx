"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, GraduationCap, Briefcase, Code, ExternalLink, X } from "lucide-react"

type RoadmapItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  type: "education" | "experience" | "project" | "internship"
  description: string
  location?: string
  image?: string
  links?: Array<{ label: string; href: string; external?: boolean; type: "paper" | "certificate" | "github" }>
  tags?: string[]
  status?: "active" | "cancelled" | "completed"
  isCurrent?: boolean
}

export default function InteractiveRoadmap({ items }: { items: RoadmapItem[] }) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (itemId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setActiveItem(itemId)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveItem(null), 300)
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="h-7 w-7 md:h-8 md:w-8" />
      case "experience":
        return <Briefcase className="h-7 w-7 md:h-8 md:w-8" />
      case "project":
      case "internship":
        return <Code className="h-7 w-7 md:h-8 md:w-8" />
      default:
        return <Calendar className="h-7 w-7 md:h-8 md:w-8" />
    }
  }

  const getTypeColor = (type: string, status?: string, isCurrent?: boolean) => {
    if (status === "cancelled") return "border-red-500 bg-red-500/20"
    if (isCurrent) return "border-purple-500 bg-purple-500/20"
    switch (type) {
      case "education":
        return "border-blue-500 bg-blue-500/20"
      case "experience":
        return "border-purple-500 bg-purple-500/20"
      case "project":
        return "border-green-500 bg-green-500/20"
      case "internship":
        return "border-orange-500 bg-orange-500/20"
      default:
        return "border-gray-500 bg-gray-500/20"
    }
  }

  // Dotted line connectors positioned between items
  const HorizontalConnector = () => (
    <div className="hidden md:flex items-center justify-center mx-2 -mt-[32px] lg:-mt-[40px]">
      <div className="w-8 lg:w-12 h-px border-t-2 border-dotted border-gray-500"></div>
    </div>
  );

  const VerticalConnector = () => (
    <div className="md:hidden flex items-center justify-center my-4">
      <div className="w-px h-6 border-l-2 border-dotted border-gray-500"></div>
    </div>
  );

  return (
    <section className="section bg-black border-t border-gray-800">
      <div className="container-xl">
        <div className="text-center mb-10">
          <div className="inline-block text-sm font-medium text-purple-400 mb-3 px-3 py-1 bg-purple-400/10 rounded-full">
            Journey
          </div>
          <h2 className="headline">My Professional Roadmap</h2>
          <p className="subheadline mx-auto">The path that led me to where I am today</p>
        </div>

        {/* Legend (no green project dot) */}
        <div className="text-center mb-8 text-sm text-gray-400">
          <span className="inline-flex items-center gap-2 mr-5"><span className="w-3 h-3 rounded-full bg-blue-500" />Education</span>
          <span className="inline-flex items-center gap-2 mr-5"><span className="w-3 h-3 rounded-full bg-orange-500" />Internship</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500" />Experience</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Layout - Two specific rows */}
          <div className="hidden md:block">
            {/* First Row - First 5 items */}
            <div className="flex items-center justify-center gap-y-16 mb-16">
              {items.slice(0, 5).map((item, index) => {
                const shouldShowConnector = index < 4; // Show connector for first 4 items only
                
                return (
                  <React.Fragment key={item.id}>
                    {/* Timeline item */}
                    <div className="flex flex-col items-center relative">
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className={`w-[64px] h-[64px] md:w-[80px] md:h-[80px] ${getTypeColor(item.type, item.status, item.isCurrent)} rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 relative z-10`}
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.status === "cancelled" ? (
                            <X className="w-7 h-7 text-red-500" />
                          ) : (
                            <div className="text-white">{getIcon(item.type)}</div>
                          )}
                          {item.isCurrent && <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" />}
                        </div>
                      </div>

                      <div className="text-center max-w-[140px] md:max-w-[160px] px-2">
                        <h4 className="text-sm font-medium text-white leading-tight mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-400 leading-tight mb-1">{item.date}</p>
                        {item.location && <p className="text-xs text-gray-500 leading-tight">{item.location}</p>}
                      </div>

                      {/* Popover */}
                      {activeItem === item.id && item.links && item.status !== "cancelled" && (
                        <div
                          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-20 min-w-60 max-w-80"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="text-sm text-white mb-3">{item.description}</div>
                          <div className="space-y-2">
                            {item.links.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                className="block text-sm text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                <ExternalLink className="inline w-3.5 h-3.5 mr-2" />
                                {link.label}
                              </Link>
                            ))}
                          </div>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                        </div>
                      )}
                    </div>
                
                    {/* Connector between items */}
                    {shouldShowConnector && <HorizontalConnector />}
                  </React.Fragment>
                )
              })}
            </div>
            
            {/* Second Row - Last 3 items */}
            <div className="flex items-center justify-center">
              {items.slice(5).map((item, index) => {
                const shouldShowConnector = index < 2; // Show connector for first 2 of these 3 items
                
                return (
                  <React.Fragment key={item.id}>
                    {/* Timeline item */}
                    <div className="flex flex-col items-center relative">
                      <div className="flex items-center justify-center mb-3">
                        <div
                          className={`w-[64px] h-[64px] md:w-[80px] md:h-[80px] ${getTypeColor(item.type, item.status, item.isCurrent)} rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 relative z-10`}
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.status === "cancelled" ? (
                            <X className="w-7 h-7 text-red-500" />
                          ) : (
                            <div className="text-white">{getIcon(item.type)}</div>
                          )}
                          {item.isCurrent && <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" />}
                        </div>
                      </div>

                      <div className="text-center max-w-[140px] md:max-w-[160px] px-2">
                        <h4 className="text-sm font-medium text-white leading-tight mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-400 leading-tight mb-1">{item.date}</p>
                        {item.location && <p className="text-xs text-gray-500 leading-tight">{item.location}</p>}
                      </div>

                      {/* Popover */}
                      {activeItem === item.id && item.links && item.status !== "cancelled" && (
                        <div
                          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-20 min-w-60 max-w-80"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="text-sm text-white mb-3">{item.description}</div>
                          <div className="space-y-2">
                            {item.links.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                className="block text-sm text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                <ExternalLink className="inline w-3.5 h-3.5 mr-2" />
                                {link.label}
                              </Link>
                            ))}
                          </div>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                        </div>
                      )}
                    </div>
                    
                    {/* Connector between items */}
                    {shouldShowConnector && <HorizontalConnector />}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Mobile Layout - Vertical */}
          <div className="md:hidden flex flex-col items-center">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Timeline item */}
                <div className="flex flex-col items-center relative">
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={`w-[64px] h-[64px] ${getTypeColor(item.type, item.status, item.isCurrent)} rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 relative z-10`}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.status === "cancelled" ? (
                        <X className="w-7 h-7 text-red-500" />
                      ) : (
                        <div className="text-white">{getIcon(item.type)}</div>
                      )}
                      {item.isCurrent && <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" />}
                    </div>
                  </div>

                  <div className="text-center max-w-[200px] px-2">
                    <h4 className="text-sm font-medium text-white leading-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-tight mb-1">{item.date}</p>
                    {item.location && <p className="text-xs text-gray-500 leading-tight">{item.location}</p>}
                  </div>

                  {/* Popover - Mobile */}
                  {activeItem === item.id && item.links && item.status !== "cancelled" && (
                    <div
                      className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-20 min-w-60 max-w-80"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="text-sm text-white mb-3">{item.description}</div>
                      <div className="space-y-2">
                        {item.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            className="block text-sm text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink className="inline w-3.5 h-3.5 mr-2" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                    </div>
                  )}
                </div>
                
                {/* Vertical connector between items */}
                {index < items.length - 1 && <VerticalConnector />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center text-sm text-gray-400">
          <p className="mb-2"><strong>Interactive:</strong> Hover over circles to see details and links</p>
        </div>
      </div>
    </section>
  )
}
