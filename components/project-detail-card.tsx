"use client"

import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function ProjectDetailCard({ title, subtitle, description, image, tags, year, githubLink, paperLink }) {
  const [imgSrc, setImgSrc] = useState(image || "/placeholder.svg?height=200&width=300")

  const handleImageError = () => {
    setImgSrc("/placeholder.svg?height=200&width=300")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imgSrc || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-purple-400/20 text-purple-400 rounded-md">Research</span>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded-md">{year}</span>
          </div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-purple-400 text-sm mb-4">{subtitle}</p>
          <p className="text-gray-300 text-sm mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {githubLink && githubLink !== "#" && (
              <Link
                href={githubLink}
                className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors"
                target="_blank"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            )}
            {paperLink && (
              <Link
                href={paperLink}
                className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors"
                target="_blank"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Research Paper
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

