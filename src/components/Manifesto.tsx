const badges = [
  {
    index: "01",
    label: "Uncompromising Luxury",
    detail: "Every experience is vetted, private, and built around you.",
  },
  {
    index: "02",
    label: "Instant AI Curation",
    detail: "Your preferences become a living itinerary — in seconds.",
  },
  {
    index: "03",
    label: "Local Access Only",
    detail: "Hidden gems no tourist guide will ever publish.",
  },
];

export default function Manifesto() {
  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden py-16 px-6 lg:py-32 lg:px-24">

      {/* Ghost "DO IT" watermark — decorative depth layer */}
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-cormorant)] font-[600] text-[#F5F0EB]/[0.03] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: "clamp(10rem, 30vw, 28rem)" }}
        aria-hidden="true"
      >
        DO IT.
      </span>

      {/* Top rule */}
      <div className="w-full h-px bg-[#C9A96E]/15 mb-14 lg:mb-20" />

      {/* Main manifesto block */}
      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-end">

        {/* ── Left: massive headline ── */}
        <div>
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-6"
            style={{ letterSpacing: "0.15em" }}
          >
            The Manifesto
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-[600] text-[#F5F0EB] leading-[0.9] tracking-tight text-6xl lg:text-9xl"
          >
            Don&rsquo;t just
            <br />
            visit.
            <br />
            <span className="italic text-[#C9A96E]">Do&nbsp;It.</span>
          </h2>
        </div>

        {/* ── Right: manifesto copy ── */}
        <div className="flex flex-col gap-6 lg:pb-3">
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/70 text-sm leading-8 lg:text-base"
            style={{ letterSpacing: "0.03em" }}
          >
            Don&rsquo;t just visit Puerto Rico.{" "}
            <span className="text-[#F5F0EB]">Do it</span> with an AI-powered
            luxury concierge in your pocket — one that knows the island as well
            as you know yourself.
          </p>

          <div className="w-8 h-px bg-[#C9A96E]/40" />

          <div className="flex flex-col gap-3">
            {[
              "Do it seamlessly.",
              "Do it exclusively.",
              "Do it in style.",
            ].map((line, i) => (
              <p
                key={i}
                className="font-[family-name:var(--font-cormorant)] font-[400] italic text-[#F5F0EB]/50 text-xl lg:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/40 text-sm leading-8 lg:text-base mt-2"
            style={{ letterSpacing: "0.03em" }}
          >
            Puerto Rico is not a destination. It&rsquo;s a standard.
            And we&rsquo;re raising it.
          </p>
        </div>
      </div>

      {/* ── Performance badges ── */}
      <div className="relative z-10 grid grid-cols-1 gap-4 mt-14 lg:grid-cols-3 lg:gap-6 lg:mt-20">
        {badges.map((badge) => (
          <div
            key={badge.index}
            className="group flex flex-col gap-4 border border-[#C9A96E]/15 bg-[#111]/60 p-6 lg:p-8 lg:hover:border-[#C9A96E]/50 lg:transition-colors lg:duration-500"
            style={{ borderRadius: 0 }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-[family-name:var(--font-cormorant)] font-[300] text-[#C9A96E] text-3xl leading-none"
              >
                {badge.index}
              </span>
              {/* Arrow — slides in on hover */}
              <span
                className="font-[family-name:var(--font-montserrat)] text-[#C9A96E]/0 text-sm lg:group-hover:text-[#C9A96E]/60 lg:transition-colors lg:duration-500"
                aria-hidden="true"
              >
                →
              </span>
            </div>

            <div className="w-6 h-px bg-[#C9A96E]/30" />

            <div>
              <p
                className="font-[family-name:var(--font-montserrat)] font-[400] text-[#F5F0EB] text-xs uppercase mb-2"
                style={{ letterSpacing: "0.15em" }}
              >
                {badge.label}
              </p>
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/45 text-xs leading-6"
                style={{ letterSpacing: "0.03em" }}
              >
                {badge.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="relative z-10 w-full h-px bg-[#C9A96E]/15 mt-14 lg:mt-20" />
    </section>
  );
}
