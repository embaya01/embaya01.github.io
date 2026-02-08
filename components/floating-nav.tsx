"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

export function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // Show/hide navbar based on scroll past hero
    const heroEl = document.getElementById("home")
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(heroEl)

    // Track active section
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1))
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="#home"
            className="font-display text-lg font-bold text-foreground transition-colors hover:text-primary"
          >
            EM
          </Link>
          <ul className="flex items-center gap-3 md:gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs uppercase tracking-wider transition-colors md:text-sm ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
