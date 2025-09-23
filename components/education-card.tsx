"use client"

import Link from "next/link"
import { useState } from "react"

export default function EducationCard({ institution, degree, specialization, period, location, image, link }) {
  const [imgSrc, setImgSrc] = useState(image || "/placeholder.svg?height=200&width=300")

  const handleImageError = () => {
    setImgSrc("/placeholder.svg?height=200&width=300")
  }

  return (
    <div className="card group overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={institution}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />
      </div>
      <div className="p-6">
        <Link href={link} target="_blank" className="inline-block hover:text-purple-400 transition-colors">
          <h3 className="text-xl font-medium mb-2">{institution}</h3>
        </Link>
        <p className="text-purple-400 text-sm mb-1">{degree}</p>
        <p className="text-blue-400 text-sm mb-4">{specialization}</p>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{period}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}

