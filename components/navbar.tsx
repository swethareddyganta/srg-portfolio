"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-lg font-medium text-white">
            SRG
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/projects" label="Projects" pathname={pathname} onClick={closeMenu} />
            <NavLink href="/experience" label="Experience" pathname={pathname} onClick={closeMenu} />
            <Link
              href="https://drive.google.com/file/d/1L2SDUCpDUFm6nXWXdorR5-Xq1GFMoaaV/view?usp=sharing"
              className="button-primary"
              target="_blank"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <NavLink href="/projects" label="Projects" pathname={pathname} onClick={closeMenu} mobile />
          <NavLink href="/experience" label="Experience" pathname={pathname} onClick={closeMenu} mobile />
          <Link
            href="https://drive.google.com/file/d/1L2SDUCpDUFm6nXWXdorR5-Xq1GFMoaaV/view?usp=sharing"
            className="button-primary px-8 py-3 text-base"
            target="_blank"
            onClick={closeMenu}
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}

function NavLink({
  href,
  label,
  pathname,
  onClick,
  mobile = false,
}: {
  href: string
  label: string
  pathname: string
  onClick: () => void
  mobile?: boolean
}) {
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200",
        mobile ? "text-base py-2" : "text-sm",
        isActive ? "text-white font-medium" : "text-gray-400 hover:text-white",
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

