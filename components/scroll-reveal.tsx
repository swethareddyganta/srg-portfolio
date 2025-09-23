"use client"

import { useEffect } from "react"

/**
 * Global scroll reveal: observes common content elements and animates them
 * into view by toggling the `is-visible` class on elements with the `reveal` class.
 * Add `data-reveal-exclude` to any element you want to skip.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const selectorList = [
      "section",
      ".card",
      ".headline",
      ".subheadline",
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "li",
      "img",
      'a.button-primary',
      'a.button-secondary',
    ]

    const candidates = Array.from(document.querySelectorAll(selectorList.join(", "))) as HTMLElement[]

    const elements = candidates.filter((el) => !el.hasAttribute("data-reveal-exclude"))

    // Initialize with `reveal` class if not already present
    for (const el of elements) {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal")
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            target.classList.add("is-visible")
          } else {
            target.classList.remove("is-visible")
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: [0, 0.12] }
    )

    elements.forEach((el, idx) => {
      // Stagger within the same section
      const section = el.closest("section")
      if (section) {
        const indexWithinSection = Array.from(section.querySelectorAll(selectorList.join(", "))).indexOf(el)
        el.style.setProperty("--reveal-delay", `${Math.min(indexWithinSection * 40, 240)}ms`)
      } else {
        el.style.setProperty("--reveal-delay", `${Math.min(idx * 30, 240)}ms`)
      }
      io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  return null
}


