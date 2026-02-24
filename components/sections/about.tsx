"use client"

import Image from "next/image"
import { ChevronRight, Download } from "lucide-react"
import type { ProfileData } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

interface AboutProps {
  profile: ProfileData | null
  resumeUrl: string
}

export function About({ profile, resumeUrl }: AboutProps) {
  if (!profile) return null

  const leftDetails = [
    { label: "Birthday", value: profile.birthday },
    { label: "Website", value: profile.website, link: `https://${profile.website}` },
    { label: "Phone", value: profile.phone },
    { label: "City", value: profile.city },
  ]

  const rightDetails = [
    { label: "Degree", value: profile.degree },
    { label: "Email", value: profile.email, link: `mailto:${profile.email}` },
    { label: "Freelance", value: profile.freelance },
  ]

  return (
    <section id="about" className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="About" subtitle="Learn more about me" />

        <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row">
          <div className="w-full flex-shrink-0 lg:w-1/3">
            <Image
              src={profile.photoUrl || "/images/me.jpg"}
              alt={profile.name}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              {profile.title}
            </h3>
            <p className="mt-3 italic text-muted-foreground">{profile.bio}</p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <ul className="space-y-2">
                {leftDetails.map((d) => (
                  <li key={d.label} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">{d.label}:</strong>{" "}
                      {d.link ? (
                        <a
                          href={d.link}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {rightDetails.map((d) => (
                  <li key={d.label} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">{d.label}:</strong>{" "}
                      {d.link ? (
                        <a
                          href={d.link}
                          className="text-primary hover:underline"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              I am a quick learner, hard working, motivated and flexible
              individual equipped with the necessary skills to bring your project
              ideas (Web, mobile or desktop app) to life.
            </p>

            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
