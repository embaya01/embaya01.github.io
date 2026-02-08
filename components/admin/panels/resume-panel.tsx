"use client"

import { useState } from "react"
import useSWR from "swr"
import { getResumeUrl, updateResumeUrl } from "@/lib/firestore"
import { Save, Loader2, FileText } from "lucide-react"

export function ResumePanel() {
  const { data: resumeUrl, mutate } = useSWR("resumeUrl", getResumeUrl)
  const [url, setUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const currentUrl = url || resumeUrl || ""

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      await updateResumeUrl(url)
      await mutate()
      setUrl("")
      setMessage("Resume URL updated!")
    } catch {
      setMessage("Failed to update.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground">Resume</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update the URL for your downloadable resume PDF
      </p>

      {message && (
        <div className={`mt-4 rounded-md px-4 py-3 text-sm ${message.includes("updated") ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
          {message}
        </div>
      )}

      <div className="mt-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            Current: <span className="text-foreground">{resumeUrl || "/Elisee_Mbaya_Resume.pdf"}</span>
          </span>
        </div>
        <label className="mb-1 block text-sm font-medium text-foreground">New Resume URL</label>
        <input
          value={url || currentUrl}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/path/to/resume.pdf or https://..."
          className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          You can use a relative path (e.g., /Elisee_Mbaya_Resume.pdf) or an external URL.
        </p>
        <button
          onClick={handleSave}
          disabled={saving || !url}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </div>
    </div>
  )
}
