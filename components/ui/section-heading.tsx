interface SectionHeadingProps {
  title: string
  subtitle?: string
  animated?: boolean
  isVisible?: boolean
}

export function SectionHeading({ title, subtitle, animated, isVisible }: SectionHeadingProps) {
  const shouldAnimate = animated && isVisible

  return (
    <div className={`text-center ${animated ? (isVisible ? "animate-fade-in-up" : "scroll-hidden") : ""}`}>
      <h2 className="font-heading text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
      <div
        className={`mx-auto mt-4 h-1 w-16 rounded bg-primary ${shouldAnimate ? "animate-bar-scale-x" : animated ? "scale-x-0" : ""}`}
      />
    </div>
  )
}
