"use client"

import Image from "next/image"
import { ChevronRight, Download } from "lucide-react"
import type { ProfileData } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

/* -- Sub-components -- */

/** Single contact detail row */
function ContactDetail({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <span>
        <strong className="text-foreground">{label}:</strong>{" "}
        {href ? (
          <a href={href} className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          <span className="text-muted-foreground">{value}</span>
        )}
      </span>
    </li>
  )
}

/* -- Main component -- */

interface AboutProps {
  profile: ProfileData | null
  resumeUrl: string
}

export function About({ profile, resumeUrl }: AboutProps) {
  if (!profile) return null

  return (
    <section id="about" className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="About Me" subtitle="Learn more about me" />

        <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row">
          {/* Profile photo */}
          <div className="w-full flex-shrink-0 lg:w-1/3">
            <Image
              src={profile.photoUrl || "/images/me.jpg"}
              alt={profile.name}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Bio, contact details, and resume */}
          <div className="flex-1">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              {profile.title}
            </h3>
            <p className="mt-3 italic text-muted-foreground">{profile.bio}</p>

            <ul className="mt-6 space-y-2">
              <ContactDetail label="Phone" value={profile.phone} />
              <ContactDetail
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
            </ul>

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
