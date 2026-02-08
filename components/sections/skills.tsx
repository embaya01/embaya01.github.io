"use client"

import Image from "next/image"
import type { SkillItem } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

interface SkillsProps {
  skills: SkillItem[]
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Skills" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="relative h-10 w-10">
                <Image
                  src={skill.iconUrl}
                  alt={skill.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-center text-sm font-medium text-foreground">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
