const testimonials = [
  {
    quote:
      "The private yacht charter via our villa's QR code was seamless. One scan and every detail was handled — a genuine 5-star experience.",
    author: "Alexandra M.",
    detail: "Condado Villa, February",
  },
  {
    quote:
      "I've traveled across the Caribbean for years. Nothing compares to the level of curation here. The helicopter sunrise tour was unforgettable.",
    author: "James R.",
    detail: "Dorado Estate, April",
  },
  {
    quote:
      "The AI concierge knew our preferences before we even asked. Every restaurant, every excursion — perfectly matched. We never once felt like tourists.",
    author: "Isabelle & Theo K.",
    detail: "Rincón Retreat, January",
  },
];

export default function GuestStoriesCTA() {
  return (
    <section className="bg-[#0D0D0D] px-4 py-16 space-y-12 lg:px-20 lg:py-28 lg:space-y-20">

      {/* ── Guest Stories ── */}
      <div>
        {/* Section header */}
        <div className="mb-10 lg:mb-14">
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-4"
            style={{ letterSpacing: "0.15em" }}
          >
            Guest Stories
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-4xl leading-tight lg:text-5xl">
            Told by Those Who Lived It.
          </h2>
          <div className="w-12 h-px bg-[#C9A96E] mt-6" />
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between border border-[#C9A96E]/15 bg-[#111] p-6 lg:p-8"
              style={{ borderRadius: 0 }}
            >
              {/* Opening mark */}
              <span
                className="font-[family-name:var(--font-cormorant)] text-[#C9A96E]/30 text-5xl leading-none mb-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="flex-1">
                <p
                  className="font-[family-name:var(--font-cormorant)] font-[400] text-[#F5F0EB]/85 text-lg leading-relaxed italic lg:text-xl"
                >
                  {t.quote}
                </p>
              </blockquote>

              <figcaption className="mt-8 pt-6 border-t border-[#C9A96E]/15">
                <p className="font-[family-name:var(--font-montserrat)] font-[500] text-[#F5F0EB] text-xs" style={{ letterSpacing: "0.1em" }}>
                  {t.author}
                </p>
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E]/60 text-xs mt-1"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ── Final CTA Banner ── */}
      <div className="relative overflow-hidden border border-[#C9A96E]/20 bg-[#0a0a0a] px-6 py-14 flex flex-col items-center text-center lg:px-16 lg:py-24">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#c9a96e08_0%,_transparent_70%)] pointer-events-none" />

        {/* Top + bottom gold rules */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

        <p
          className="relative font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-6"
          style={{ letterSpacing: "0.15em" }}
        >
          Begin Your Journey
        </p>

        <h2 className="relative font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-4xl leading-tight max-w-xl lg:text-6xl lg:max-w-3xl">
          Your Island Experience,{" "}
          <span className="italic text-[#C9A96E]">Perfected.</span>
        </h2>

        <p
          className="relative font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/55 text-sm leading-7 max-w-md mt-6 lg:text-base lg:max-w-lg"
          style={{ letterSpacing: "0.03em" }}
        >
          Scan the QR code in your villa or start planning now — your personal
          AI concierge is ready to craft the perfect Puerto Rico escape.
        </p>

        {/* CTA button with pulse ring */}
        <div className="relative mt-10 lg:mt-14">
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping bg-[#C9A96E]/15 pointer-events-none" />
          <a
            href="#"
            className="cta-gold relative inline-flex items-center justify-center bg-[#C9A96E] text-[#0D0D0D] px-12 py-5 text-xs font-[500] uppercase hover:bg-[#F5F0EB]"
            style={{ letterSpacing: "0.2em", borderRadius: 0 }}
          >
            Start Planning with AI
          </a>
        </div>

        {/* Supporting micro-copy */}
        <p
          className="relative font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/30 text-[10px] uppercase mt-5"
          style={{ letterSpacing: "0.15em" }}
        >
          No account required &nbsp;·&nbsp; Instant access
        </p>
      </div>

    </section>
  );
}
