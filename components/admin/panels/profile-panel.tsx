"use client"

import { useState } from "react"
import useSWR from "swr"
import { getProfile, updateProfile, type ProfileData } from "@/lib/firestore"
import { Save, Loader2 } from "lucide-react"

export function ProfilePanel() {
  const { data: profile, mutate } = useSWR("profile", getProfile)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState<Partial<ProfileData>>({})

  // Initialize form when profile loads
  const currentProfile = { ...profile, ...form }

  function updateField(key: keyof ProfileData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      await updateProfile(form)
      await mutate()
      setForm({})
      setMessage("Profile updated successfully!")
    } catch {
      setMessage("Failed to update profile.")
    } finally {
      setSaving(false)
    }
  }

  const fields: { key: keyof ProfileData; label: string; type?: string }[] = [
    { key: "name", label: "Full Name" },
    { key: "tagline", label: "Tagline" },
    { key: "title", label: "Professional Title" },
    { key: "bio", label: "Bio" },
    { key: "summary", label: "Resume Summary" },
    { key: "birthday", label: "Birthday" },
    { key: "website", label: "Website" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "degree", label: "Degree" },
    { key: "email", label: "Email", type: "email" },
    { key: "freelance", label: "Freelance Status" },
    { key: "address", label: "Full Address" },
    { key: "photoUrl", label: "Photo URL" },
    { key: "twitter", label: "Twitter URL" },
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "whatsappLink", label: "WhatsApp Link" },
  ]

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground">Profile</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your personal information displayed on the website
      </p>

      {message && (
        <div
          className={`mt-4 rounded-md px-4 py-3 text-sm ${
            message.includes("success")
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.key === "bio" || field.key === "summary" || field.key === "address" ? "sm:col-span-2" : ""}>
            <label className="mb-1 block text-sm font-medium text-foreground">
              {field.label}
            </label>
            {(field.key === "bio" || field.key === "summary") ? (
              <textarea
                value={(currentProfile as Record<string, string>)[field.key] || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                rows={3}
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            ) : (
              <input
                type={field.type || "text"}
                value={(currentProfile as Record<string, string>)[field.key] || ""}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving || Object.keys(form).length === 0}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Changes
      </button>
    </div>
  )
}
