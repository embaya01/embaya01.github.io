"use client"

import useSWR from "swr"
import { getAnalytics, type DailyView } from "@/lib/firestore"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Eye, TrendingUp, Calendar } from "lucide-react"

export function TrafficPanel() {
  const { data: analytics, isLoading } = useSWR("analytics", getAnalytics)

  const totalViews = analytics?.reduce((sum, d) => sum + d.views, 0) || 0
  const todayViews =
    analytics?.find((d) => d.date === new Date().toISOString().split("T")[0])?.views || 0
  const last7Days = analytics?.slice(-7) || []
  const avgDaily = last7Days.length > 0
    ? Math.round(last7Days.reduce((s, d) => s + d.views, 0) / last7Days.length)
    : 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground">Traffic Overview</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Monitor your portfolio website traffic
      </p>

      {/* Stats Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-foreground">{totalViews}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-2xl font-bold text-foreground">{todayViews}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Daily (7d)</p>
              <p className="text-2xl font-bold text-foreground">{avgDaily}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Daily Page Views
        </h3>
        {analytics && analytics.length > 0 ? (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => d.slice(5)}
                  stroke="hsl(0 0% 64%)"
                  fontSize={12}
                />
                <YAxis stroke="hsl(0 0% 64%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 5%)",
                    border: "1px solid hsl(0 0% 15%)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="views" fill="hsl(148 78% 46%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No traffic data yet. Views will appear once visitors come to your site.
          </p>
        )}
      </div>
    </div>
  )
}
