"use client"

import useSWR from "swr"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"


import { Portfolio } from "@/components/sections/portfolio"
import { Contact } from "@/components/sections/contact"
import { PageViewTracker } from "@/components/page-view-tracker"
import { FloatingNav } from "@/components/floating-nav"
import {
  getProfile,
  getSkills,

  getProjects,
  getResumeUrl,
} from "@/lib/firestore"

async function fetchPortfolioData() {
  const [profile, skills, projects, resumeUrl] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getResumeUrl(),
    ])
  return { profile, skills, projects, resumeUrl }
}

export default function HomePage() {
  const { data, isLoading } = useSWR("portfolio-data", fetchPortfolioData)

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
      <FloatingNav />
      <Hero profile={data.profile} />
      <About profile={data.profile} resumeUrl={data.resumeUrl} />
      <Skills skills={data.skills} />
      <Portfolio projects={data.projects} />
      <Contact profile={data.profile} />
    </main>
  )
}
