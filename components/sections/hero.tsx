"use client"

import { useState, useEffect } from "react"
import { Twitter, Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react"
import type { ProfileData } from "@/lib/firestore"

/* -- Constants -- */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

/* -- Sub-components -- */
interface SocialLinkProps {
  href: string
  icon: LucideIcon
  label: string
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-110"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </a>
  )
}

/* -- Main component -- */
interface HeroProps {
  profile: ProfileData | null
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.name || "Elisee Mbaya"
  const tagline = profile?.tagline || "Software Developer & Web Designer"

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const socialLinks = [
    { href: profile?.twitter, icon: Twitter, label: "Twitter" },
    { href: profile?.facebook, icon: Facebook, label: "Facebook" },
    { href: profile?.instagram, icon: Instagram, label: "Instagram" },
    { href: profile?.linkedin, icon: Linkedin, label: "LinkedIn" },
  ].filter((link) => link.href) as SocialLinkProps[]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1
          className={`font-display text-4xl font-bold tracking-tight text-primary md:text-6xl ${mounted ? "animate-fade-in-up" : "scroll-hidden"}`}
          style={{ "--stagger-delay": "0ms" } as React.CSSProperties}
        >
          {name}
        </h1>
        <h2
          className={`max-w-xl text-lg text-muted-foreground md:text-xl ${mounted ? "animate-fade-in-up" : "scroll-hidden"}`}
          style={{ "--stagger-delay": "200ms" } as React.CSSProperties}
        >
          {"I design AI systems that automate real-world business workflows."}
        </h2>

        {/* Navigation */}
        <nav
          className={`mt-4 ${mounted ? "animate-fade-in-up" : "scroll-hidden"}`}
          style={{ "--stagger-delay": "400ms" } as React.CSSProperties}
          aria-label="Primary navigation"
        >
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div
            className={`mt-4 flex items-center gap-4 ${mounted ? "animate-fade-in-up" : "scroll-hidden"}`}
            style={{ "--stagger-delay": "600ms" } as React.CSSProperties}
          >
            {socialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
