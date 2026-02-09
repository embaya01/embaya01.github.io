"use client"

import { Download, GraduationCap, Briefcase } from "lucide-react"
import type { EducationItem, ExperienceItem, ProfileData } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

interface ResumeProps {
  education: EducationItem[]
  experience: ExperienceItem[]
  profile: ProfileData | null
  resumeUrl: string
}

export function Resume({ education, experience, profile, resumeUrl }: ResumeProps) {
  return (
    <section id="resume" className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Resume" />

        <div className="mt-6 flex justify-center">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left Column - Summary & Education */}
          <div>
            <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
              <GraduationCap className="h-5 w-5" />
              Summary
            </h3>
            <div className="mt-4 border-l-2 border-primary pl-6">
              <h4 className="text-lg font-semibold text-foreground">
                {profile?.name || "Elisee Mbaya"}
              </h4>
              <p className="mt-2 italic leading-relaxed text-muted-foreground">
                {profile?.summary || ""}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>{profile?.city}</li>
                <li>{profile?.phone}</li>
                <li>
                  <a href={`mailto:${profile?.email}`} className="text-primary hover:underline">
                    {profile?.email}
                  </a>
                </li>
              </ul>
            </div>

            <h3 className="mt-10 flex items-center gap-2 font-heading text-xl font-semibold text-primary">
              <GraduationCap className="h-5 w-5" />
              Education
            </h3>
            <div className="mt-4 space-y-6">
              {education.map((edu) => (
                <div key={edu.id || edu.title} className="border-l-2 border-primary pl-6">
                  <h4 className="text-lg font-semibold text-foreground">{edu.title}</h4>
                  <span className="mt-1 inline-block rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {edu.years}
                  </span>
                  <p className="mt-2 italic text-muted-foreground">{edu.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Experience */}
          <div>
            <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
              <Briefcase className="h-5 w-5" />
              Experience
            </h3>
            <div className="mt-4 space-y-6">
              {experience.map((exp) => (
                <div key={exp.id || exp.title} className="border-l-2 border-primary pl-6">
                  <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                  <span className="mt-1 inline-block rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {exp.years}
                  </span>
                  {exp.company && (
                    <p className="mt-2 italic text-muted-foreground">{exp.company}</p>
                  )}
                  <ul className="mt-2 space-y-1">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
