"use client"

import { useState } from "react"
import {
  MapPin,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Share2,
} from "lucide-react"
import type { ProfileData } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"

interface ContactProps {
  profile: ProfileData | null
}

export function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const mailto = `mailto:${profile?.email || "eliseembaya1@gmail.com"}?cc=junimbaya9@gmail.com&subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailto
  }

  if (!profile) return null

  return (
    <section id="contact" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Contact" subtitle="Contact Me" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Info boxes */}
          <div className="flex items-stretch rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  My Address
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{profile.address}</p>
              </div>
            </div>
          </div>

          <div className="flex items-stretch rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Share2 className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Social Profiles
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {profile.facebook && (
                    <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {profile.instagram && (
                    <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-stretch rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Email Me
                </h3>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 text-sm text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-stretch rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Call Me
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.phone}{" "}
                  {profile.whatsappLink && (
                    <a
                      href={profile.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      (WhatsApp)
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
