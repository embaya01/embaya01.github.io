"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  getServices,
  addService,
  updateService,
  deleteService,
  type ServiceItem,
} from "@/lib/firestore"
import { Plus, Trash2, Save, Loader2 } from "lucide-react"

const ICON_OPTIONS = ["globe", "smartphone", "monitor", "brain", "shield", "code"]

export function ServicesPanel() {
  const { data: items, mutate } = useSWR("services", getServices)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    icon: "globe",
  })

  async function handleAdd() {
    setSaving(true)
    await addService({ ...newItem, order: items?.length || 0 })
    setNewItem({ title: "", description: "", icon: "globe" })
    setAdding(false)
    setSaving(false)
    mutate()
  }

  async function handleDelete(id: string) {
    await deleteService(id)
    mutate()
  }

  async function handleUpdate(id: string, data: Partial<ServiceItem>) {
    setSaving(true)
    await updateService(id, data)
    setEditing(null)
    setSaving(false)
    mutate()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage the services you offer</p>
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
          <h3 className="text-lg font-semibold text-foreground">Add Service</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Service Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <select
              value={newItem.icon}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
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

      <div className="mt-6 space-y-4">
        {items?.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <span className="mt-2 inline-block rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  icon: {item.icon}
                </span>
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
        ))}
      </div>
    </div>
  )
}
