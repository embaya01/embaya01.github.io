"use client"

import { useState } from "react"
import { Database, Loader2 } from "lucide-react"

export function SeedPanel() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSeed() {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch("/api/seed", { method: "POST" })
      const data = await res.json()
      setMessage(data.message || data.error || "Done!")
    } catch {
      setMessage("Failed to seed database.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground">Seed Database</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Populate the database with your initial portfolio data from the original website.
        This will only run if the database is empty.
      </p>

      {message && (
        <div className="mt-4 rounded-md bg-primary/10 px-4 py-3 text-sm text-primary">
          {message}
        </div>
      )}

      <div className="mt-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Initialize Database</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This will create all Firestore collections with your original portfolio
              data including profile info, education, experience, skills, and services.
            </p>
            <button
              onClick={handleSeed}
              disabled={loading}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              {loading ? "Seeding..." : "Seed Database"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
