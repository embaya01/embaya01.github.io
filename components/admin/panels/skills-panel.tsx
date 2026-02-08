"use client"

import { useState } from "react"
import useSWR from "swr"
import { getSkills, addSkill, updateSkill, deleteSkill, type SkillItem } from "@/lib/firestore"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"
import Image from "next/image"

export function SkillsPanel() {
  const { data: items, mutate } = useSWR("skills", getSkills)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({ name: "", iconUrl: "" })

  async function handleAdd() {
    setSaving(true)
    await addSkill({ name: newItem.name, iconUrl: newItem.iconUrl, order: items?.length || 0 })
    setNewItem({ name: "", iconUrl: "" })
    setAdding(false)
    setSaving(false)
    mutate()
  }

  async function handleDelete(id: string) {
    await deleteSkill(id)
    mutate()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your technical skills</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {adding && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Add Skill</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Skill Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Icon URL"
              value={newItem.iconUrl}
              onChange={(e) => setNewItem({ ...newItem, iconUrl: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving || !newItem.name}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
            <button onClick={() => setAdding(false)} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image src={item.iconUrl} alt={item.name} fill className="object-contain" unoptimized />
              </div>
              <span className="text-sm font-medium text-foreground">{item.name}</span>
            </div>
            <button
              onClick={() => handleDelete(item.id!)}
              className="rounded-md border border-border p-1.5 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
