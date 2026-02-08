"use client"

import {
  Globe,
  Smartphone,
  Monitor,
  Brain,
  Shield,
  Code,
} from "lucide-react"
import type { ServiceItem } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="h-8 w-8" />,
  smartphone: <Smartphone className="h-8 w-8" />,
  monitor: <Monitor className="h-8 w-8" />,
  brain: <Brain className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
  code: <Code className="h-8 w-8" />,
}

interface ServicesProps {
  services: ServiceItem[]
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Services" subtitle="My Services" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id || service.title}
              className="group rounded-lg border border-border bg-card p-8 transition-colors hover:border-primary"
            >
              <div className="text-primary transition-transform group-hover:scale-110">
                {iconMap[service.icon] || <Code className="h-8 w-8" />}
              </div>
              <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {service.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
