"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  User,
  Code,
  FolderOpen,
  FileText,
  LogOut,
  Database,
} from "lucide-react"
import { TrafficPanel } from "./panels/traffic-panel"
import { ProfilePanel } from "./panels/profile-panel"
import { SkillsPanel } from "./panels/skills-panel"
import { ProjectsPanel } from "./panels/projects-panel"
import { ResumePanel } from "./panels/resume-panel"
import { SeedPanel } from "./panels/seed-panel"

interface DashboardProps {
  onLogout: () => void
}

const TABS = [
  { id: "traffic", label: "Traffic", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "seed", label: "Seed Data", icon: Database },
] as const

type TabId = (typeof TABS)[number]["id"]

export function AdminDashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("traffic")

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <LayoutDashboard className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-heading text-lg font-bold text-foreground">Admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === "traffic" && <TrafficPanel />}
        {activeTab === "profile" && <ProfilePanel />}
        {activeTab === "skills" && <SkillsPanel />}
        {activeTab === "projects" && <ProjectsPanel />}
        {activeTab === "resume" && <ResumePanel />}
        {activeTab === "seed" && <SeedPanel />}
      </main>
    </div>
  )
}
