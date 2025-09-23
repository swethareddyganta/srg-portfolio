"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, ExternalLink } from "lucide-react"

type ProjectCardProps = {
  title: string
  subtitle?: string
  description?: string
  image?: string
  tags?: string[]
  year?: string | number
  githubLink: string
  paperLink?: string
  appLink?: string
}

export default function ProjectCard({ title, subtitle, description, image, tags, year, githubLink, paperLink, appLink }: ProjectCardProps) {
  const primaryHref = githubLink || "#"

  return (
    <div className="card group h-full flex flex-col">
      {primaryHref !== "#" ? (
        <Link href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} className="relative aspect-[4/3] overflow-hidden block">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <span className="sr-only">View {title} on GitHub</span>
        </Link>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-auto">
          <div className="flex items-center gap-2 mb-3">
            {year && <span className="text-xs px-2 py-1 bg-gray-800 rounded-md">{year}</span>}
            {tags?.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-medium mb-1">{title}</h3>
          {subtitle && <p className="text-purple-400 text-sm mb-3">{subtitle}</p>}
          {description && <p className="text-gray-400 text-sm mb-4">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {githubLink && (
            <Link href={githubLink} className="inline-flex items-center text-sm text-white/90 hover:text-purple-400 transition-colors" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
          )}
          {appLink && (
            <Link href={appLink} className="inline-flex items-center text-sm text-white/90 hover:text-purple-400 transition-colors" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit App
            </Link>
          )}
          {paperLink && (
            <Link href={paperLink} className="inline-flex items-center text-sm text-white/90 hover:text-purple-400 transition-colors" target="_blank">
              {paperLink.includes("ieeexplore") ? (
                <ExternalLink className="mr-2 h-4 w-4" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              Research Paper
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

