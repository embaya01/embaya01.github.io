interface SectionHeadingProps {
  title: string
  subtitle?: string
  animated?: boolean
  isVisible?: boolean
}

export function SectionHeading({ title, subtitle, animated, isVisible }: SectionHeadingProps) {
  return (
    <div
      className={`text-center transition-all ${
        animated
          ? isVisible
            ? "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
            : "opacity-0"
          : ""
      }`}
    >
      <h2 className="font-heading text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
      <div
        className={`mx-auto mt-4 h-1 w-16 rounded bg-primary transition-transform origin-left ${
          animated
            ? isVisible
              ? "animate-in zoom-in-x duration-500 delay-300 fill-mode-both"
              : "scale-x-0"
            : ""
        }`}
      />
    </div>
  )
}
