"use client"

import { useEffect, useRef } from "react"
import { recordPageView } from "@/lib/firestore"

export function PageViewTracker() {
  const tracked = useRef(false)

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true
      recordPageView().catch(() => {})
    }
  }, [])

  return null
}
