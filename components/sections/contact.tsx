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
  type LucideIcon,
} from "lucide-react"
import type { ProfileData } from "@/lib/firestore"
import { SectionHeading } from "@/components/ui/section-heading"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

/* -- Sub-components -- */

/** Reusable contact info card */
function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-stretch rounded-lg border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Icon className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Shared form input styles */
const inputClasses =
  "rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"

/** Social icon link */
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}

/* -- Main component -- */

interface ContactProps {
  profile: ProfileData | null
}

export function Contact({ profile }: ContactProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  if (!profile) return null

  const socialLinks = [
    { href: profile.twitter, icon: Twitter, label: "Twitter" },
    { href: profile.facebook, icon: Facebook, label: "Facebook" },
    { href: profile.instagram, icon: Instagram, label: "Instagram" },
    { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
  ].filter((link) => link.href)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const mailto = `mailto:${profile?.email || "eliseembaya1@gmail.com"}?cc=junimbaya9@gmail.com&subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailto
  }

  function updateField(field: keyof typeof formData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const infoCards = [
    {
      icon: MapPin,
      title: "My Address",
      content: <p className="mt-1 text-sm text-muted-foreground">{profile.address}</p>,
    },
    {
      icon: Share2,
      title: "Social Profiles",
      content: (
        <div className="mt-2 flex items-center gap-3">
          {socialLinks.map((link) => (
            <SocialIcon key={link.label} {...link} />
          ))}
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Email Me",
      content: (
        <a href={`mailto:${profile.email}`} className="mt-1 text-sm text-primary hover:underline">
          {profile.email}
        </a>
      ),
    },
    {
      icon: Phone,
      title: "Call Me",
      content: (
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
      ),
    },
  ]

  return (
    <section id="contact" className="bg-background py-20">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Contact" subtitle="Contact Me" animated isVisible={isVisible} />

        {/* Info cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {infoCards.map((card, index) => (
            <div
              key={card.title}
              className={`transition-all ${
                isVisible
                  ? "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              <InfoCard icon={card.icon} title={card.title}>
                {card.content}
              </InfoCard>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className={`mt-10 space-y-4 transition-all ${
            isVisible
              ? "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both"
              : "opacity-0"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={updateField("name")}
              className={inputClasses}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={updateField("email")}
              className={inputClasses}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={updateField("subject")}
            className={`w-full ${inputClasses}`}
          />
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={formData.message}
            onChange={updateField("message")}
            className={`w-full ${inputClasses}`}
          />
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
