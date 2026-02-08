"use client"

import useSWR from "swr"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Resume } from "@/components/sections/resume"
import { Services } from "@/components/sections/services"
import { Portfolio } from "@/components/sections/portfolio"
import { Contact } from "@/components/sections/contact"
import { PageViewTracker } from "@/components/page-view-tracker"
import {
  getProfile,
  getSkills,
  getEducation,
  getExperience,
  getServices,
  getProjects,
  getResumeUrl,
} from "@/lib/firestore"

async function fetchPortfolioData() {
  const [profile, skills, education, experience, services, projects, resumeUrl] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getEducation(),
      getExperience(),
      getServices(),
      getProjects(),
      getResumeUrl(),
    ])
  return { profile, skills, education, experience, services, projects, resumeUrl }
}

export default function HomePage() {
  const { data, isLoading, error } = useSWR("portfolio-data", fetchPortfolioData)
  console.log("[v0] HomePage render - isLoading:", isLoading, "error:", error, "data:", data)

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      <PageViewTracker />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Resume
        education={data.education}
        experience={data.experience}
        profile={data.profile}
        resumeUrl={data.resumeUrl}
      />
      <Services services={data.services} />
      <Portfolio projects={data.projects} />
      <Contact profile={data.profile} />
    </main>
  )
}
