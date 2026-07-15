/**
 * Immersive animated water-splash background.
 * Dark mode: deep oceanic navy/teal blobs.
 * Light mode: bright aqua-blue crystalline pool vibes.
 * All motion is pure CSS, no JS overhead.
 */
export default function WaterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Base gradient layer */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-950 dark:via-blue-950/40 dark:to-cyan-950/30 bg-gradient-to-br from-sky-50 via-cyan-50/60 to-blue-100/80" />

      {/* Blob 1 — large deep teal splash, top-left */}
      <div
        className="water-blob-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full
          dark:bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,rgba(14,116,144,0.12)_45%,transparent_70%)]
          bg-[radial-gradient(circle,rgba(56,189,248,0.30)_0%,rgba(125,211,252,0.15)_45%,transparent_70%)]"
      />

      {/* Blob 2 — mid-size navy, bottom-right */}
      <div
        className="water-blob-2 absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full
          dark:bg-[radial-gradient(circle,rgba(30,58,138,0.35)_0%,rgba(8,47,73,0.18)_50%,transparent_70%)]
          bg-[radial-gradient(circle,rgba(186,230,253,0.45)_0%,rgba(147,197,253,0.20)_50%,transparent_70%)]"
      />

      {/* Blob 3 — glowing cyan accent, center-right */}
      <div
        className="water-blob-3 absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full
          dark:bg-[radial-gradient(circle,rgba(20,184,166,0.18)_0%,rgba(6,148,162,0.08)_50%,transparent_70%)]
          bg-[radial-gradient(circle,rgba(103,232,249,0.22)_0%,rgba(34,211,238,0.10)_50%,transparent_70%)]"
      />

      {/* Blob 4 — deep blue, upper-right */}
      <div
        className="water-blob-1 absolute -top-16 right-1/4 w-[350px] h-[350px] rounded-full
          dark:bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_65%)]
          bg-[radial-gradient(circle,rgba(99,179,237,0.18)_0%,transparent_65%)]"
        style={{ animationDelay: "6s" }}
      />

      {/* Shimmer ripple lines — horizontal wave effect */}
      <div className="water-shimmer absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 60px,
            rgba(103,232,249,0.04) 60px,
            rgba(103,232,249,0.04) 61px
          )`,
        }}
      />

      {/* Frosted glass vignette to keep content readable */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-transparent dark:to-background/60 bg-gradient-to-b from-transparent via-transparent to-background/40" />
    </div>
  )
}
