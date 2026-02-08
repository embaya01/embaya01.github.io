"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  type ProjectItem,
} from "@/lib/firestore"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"
import Image from "next/image"

export function ProjectsPanel() {
  const { data: items, mutate } = useSWR("projects", getProjects)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    category: "Web",
    description: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
  })

  async function handleAdd() {
    setSaving(true)
    await addProject({ ...newItem, order: items?.length || 0 })
    setNewItem({ title: "", category: "Web", description: "", imageUrl: "", githubUrl: "", liveUrl: "" })
    setAdding(false)
    setSaving(false)
    mutate()
  }

  async function handleDelete(id: string) {
    await deleteProject(id)
    mutate()
  }

  async function handleUpdate(id: string, data: Partial<ProjectItem>) {
    setSaving(true)
    await updateProject(id, data)
    setEditing(null)
    setSaving(false)
    mutate()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {adding && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Add Project</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Project Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Desktop">Desktop</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Pentesting">Pentesting</option>
            </select>
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
              className="sm:col-span-2 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Image URL"
              value={newItem.imageUrl}
              onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="GitHub URL"
              value={newItem.githubUrl}
              onChange={(e) => setNewItem({ ...newItem, githubUrl: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              placeholder="Live URL"
              value={newItem.liveUrl}
              onChange={(e) => setNewItem({ ...newItem, liveUrl: e.target.value })}
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
            <button onClick={() => setAdding(false)} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items?.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card overflow-hidden">
            {item.imageUrl && (
              <div className="relative aspect-video">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium uppercase text-primary">{item.category}</span>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
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
            </div>
          </div>
        ))}
      </div>

      {(!items || items.length === 0) && (
        <p className="mt-6 text-center text-muted-foreground">
          No projects yet. Click "Add Project" to add your first one.
        </p>
      )}
    </div>
  )
}
