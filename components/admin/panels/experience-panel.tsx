"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  type ExperienceItem,
} from "@/lib/firestore"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"

export function ExperiencePanel() {
  const { data: items, mutate } = useSWR("experience", getExperience)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    years: "",
    company: "",
    detailsText: "",
  })

  async function handleAdd() {
    setSaving(true)
    await addExperience({
      title: newItem.title,
      years: newItem.years,
      company: newItem.company,
      details: newItem.detailsText.split("\n").filter(Boolean),
      order: items?.length || 0,
    })
    setNewItem({ title: "", years: "", company: "", detailsText: "" })
    setAdding(false)
    setSaving(false)
    mutate()
  }

  async function handleDelete(id: string) {
    await deleteExperience(id)
    mutate()
  }

  async function handleUpdate(id: string, data: Partial<ExperienceItem>) {
    setSaving(true)
    await updateExperience(id, data)
    setEditing(null)
    setSaving(false)
    mutate()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your work experience</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {adding && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Add Experience</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Job Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Years"
              value={newItem.years}
              onChange={(e) => setNewItem({ ...newItem, years: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Company"
              value={newItem.company}
              onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
              className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <textarea
              placeholder="Details (one per line)"
              value={newItem.detailsText}
              onChange={(e) => setNewItem({ ...newItem, detailsText: e.target.value })}
              rows={4}
              className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving || !newItem.title}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
            <button onClick={() => setAdding(false)} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {items?.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-6">
            {editing === item.id ? (
              <EditExpForm
                item={item}
                onSave={(data) => handleUpdate(item.id!, data)}
                onCancel={() => setEditing(null)}
                saving={saving}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-primary">{item.years}</p>
                  {item.company && <p className="mt-1 text-sm italic text-muted-foreground">{item.company}</p>}
                  <ul className="mt-2 space-y-1">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(item.id!)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EditExpForm({
  item,
  onSave,
  onCancel,
  saving,
}: {
  item: ExperienceItem
  onSave: (data: Partial<ExperienceItem>) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState({
    title: item.title,
    years: item.years,
    company: item.company,
    detailsText: item.details.join("\n"),
  })

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <input
        value={form.years}
        onChange={(e) => setForm({ ...form, years: e.target.value })}
        className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <input
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <textarea
        value={form.detailsText}
        onChange={(e) => setForm({ ...form, detailsText: e.target.value })}
        rows={4}
        className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <div className="flex gap-2 sm:col-span-2">
        <button
          onClick={() =>
            onSave({
              title: form.title,
              years: form.years,
              company: form.company,
              details: form.detailsText.split("\n").filter(Boolean),
            })
          }
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
        <button onClick={onCancel} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
          Cancel
        </button>
      </div>
    </div>
  )
}
