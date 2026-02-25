"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import type { ProjectItem } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface PortfolioProps {
  projects: ProjectItem[]
}

export function Portfolio({ projects }: PortfolioProps) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const [active, setActive] = useState("All")
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>()

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="bg-card py-20">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Portfolio" subtitle="My Projects" animated isVisible={isVisible} />

        {/* Filter buttons */}
        {categories.length > 1 && (
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-3 ${isVisible ? "animate-fade-in-up" : "scroll-hidden"}`}
            style={{ "--stagger-delay": "200ms" } as React.CSSProperties}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <div
              key={project.id || project.title}
              className={`group overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary hover:-translate-y-1 hover:shadow-lg ${isVisible ? "animate-fade-in-up" : "scroll-hidden"}`}
              style={{ "--stagger-delay": `${300 + index * 120}ms` } as React.CSSProperties}
            >
              {project.imageUrl && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {project.category}
                </span>
                <h4 className="mt-1 font-heading text-lg font-semibold text-foreground">
                  {project.title}
                </h4>
                {project.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No projects yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  )
}
