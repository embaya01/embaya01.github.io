"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  type EducationItem,
} from "@/lib/firestore"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"

export function EducationPanel() {
  const { data: items, mutate } = useSWR("education", getEducation)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    years: "",
    institution: "",
    details: "",
    order: 0,
  })

  async function handleAdd() {
    setSaving(true)
    await addEducation({ ...newItem, order: (items?.length || 0) })
    setNewItem({ title: "", years: "", institution: "", details: "", order: 0 })
    setAdding(false)
    setSaving(false)
    mutate()
  }

  async function handleDelete(id: string) {
    await deleteEducation(id)
    mutate()
  }

  async function handleUpdate(id: string, data: Partial<EducationItem>) {
    setSaving(true)
    await updateEducation(id, data)
    setEditing(null)
    setSaving(false)
    mutate()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Education</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your education history</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Add Education</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Title (e.g., Bachelor of Science)"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Years (e.g., 2017 - 2020)"
              value={newItem.years}
              onChange={(e) => setNewItem({ ...newItem, years: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Institution"
              value={newItem.institution}
              onChange={(e) => setNewItem({ ...newItem, institution: e.target.value })}
              className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <textarea
              placeholder="Details"
              value={newItem.details}
              onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
              rows={2}
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
            <button
              onClick={() => setAdding(false)}
              className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="mt-6 space-y-4">
        {items?.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-6">
            {editing === item.id ? (
              <EditForm
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
                  <p className="mt-1 text-sm italic text-muted-foreground">{item.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.details}</p>
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

function EditForm({
  item,
  onSave,
  onCancel,
  saving,
}: {
  item: EducationItem
  onSave: (data: Partial<EducationItem>) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState({ ...item })

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
        value={form.institution}
        onChange={(e) => setForm({ ...form, institution: e.target.value })}
        className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <textarea
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
        rows={2}
        className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <div className="flex gap-2 sm:col-span-2">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
        <button
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
