const features = [
  {
    title: "24/7 AI-Powered Planning",
    description:
      "Our concierge learns your preferences and builds a living itinerary — updated in real time, available any hour.",
  },
  {
    title: "Instant Live Operator Support",
    description:
      "A human expert is one tap away for reservations, last-minute changes, or bespoke requests that demand a personal touch.",
  },
  {
    title: "Seamless In-App Booking",
    description:
      "Reserve yachts, tours, and fine dining directly from your phone — no calls, no redirects, no friction.",
  },
];

function PhoneQR() {
  /* Stylized phone frame with a minimal QR-style screen */
  return (
    <div className="relative mx-auto w-44 lg:w-52" aria-hidden="true">
      {/* Outer glow ring */}
      <div className="absolute inset-0 scale-110 rounded-none border border-[#C9A96E]/10" />

      {/* Phone shell */}
      <div className="relative border border-[#C9A96E]/40 bg-[#0a0a0a] px-5 pt-8 pb-6 flex flex-col items-center gap-5">
        {/* Speaker bar */}
        <div className="absolute top-3 w-10 h-0.5 bg-[#C9A96E]/30" />

        {/* Screen: QR visual */}
        <div className="w-full border border-[#C9A96E]/20 bg-[#111] p-3">
          {/* QR finder corners + module grid */}
          <svg
            viewBox="0 0 64 64"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top-left finder */}
            <rect x="4"  y="4"  width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" opacity="0.7"/>
            <rect x="7"  y="7"  width="10" height="10" fill="#C9A96E" opacity="0.6"/>

            {/* Top-right finder */}
            <rect x="44" y="4"  width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" opacity="0.7"/>
            <rect x="47" y="7"  width="10" height="10" fill="#C9A96E" opacity="0.6"/>

            {/* Bottom-left finder */}
            <rect x="4"  y="44" width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" opacity="0.7"/>
            <rect x="7"  y="47" width="10" height="10" fill="#C9A96E" opacity="0.6"/>

            {/* Data modules (decorative pattern) */}
            {[
              [26,4],[30,4],[34,4],[38,4],
              [26,8],[34,8],[38,8],
              [26,12],[28,12],[32,12],[36,12],
              [26,16],[30,16],[36,16],
              [4,26],[8,26],[12,26],[16,26],
              [26,26],[28,26],[32,26],[36,26],[40,26],[44,26],[48,26],[52,26],[56,26],
              [4,30],[12,30],[28,30],[34,30],[40,30],[48,30],[56,30],
              [4,34],[8,34],[16,34],[26,34],[32,34],[38,34],[44,34],[52,34],[56,34],
              [4,38],[10,38],[14,38],[28,38],[32,38],[40,38],[46,38],[54,38],
              [4,42],[8,42],[12,42],[16,42],[26,42],[34,42],[38,42],[44,42],[48,42],[52,42],[56,42],
              [26,46],[32,46],[36,46],[44,46],[52,46],
              [26,50],[30,50],[34,50],[40,50],[46,50],[56,50],
              [26,54],[28,54],[34,54],[38,54],[44,54],[48,54],[54,54],
              [26,58],[32,58],[36,58],[42,58],[50,58],[56,58],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="3" height="3" fill="#C9A96E" opacity="0.5" />
            ))}
          </svg>
        </div>

        {/* Scan prompt */}
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E]/70 text-[9px] uppercase text-center"
          style={{ letterSpacing: "0.18em" }}
        >
          Scan to Unlock VIP Access
        </p>

        {/* Home indicator */}
        <div className="w-8 h-0.5 bg-[#C9A96E]/25" />
      </div>

      {/* Reflection line */}
      <div className="absolute -bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
    </div>
  );
}

export default function ElevateStay() {
  return (
    <section className="bg-[#0D0D0D] px-4 py-12 lg:px-20 lg:py-24">
      {/* Top rule */}
      <div className="w-full h-px bg-[#C9A96E]/15 mb-12 lg:mb-20" />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">

        {/* ── Left col: copy + phone visual ── */}
        <div className="flex flex-col gap-8">
          <div>
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              Digital Concierge
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-4xl leading-tight lg:text-5xl">
              Elevate Your Stay.
              <br />
              <span className="italic">Instantly.</span>
            </h2>
            <div className="w-12 h-px bg-[#C9A96E] mt-6" />
          </div>

          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/60 text-sm leading-7 max-w-sm lg:text-base"
            style={{ letterSpacing: "0.02em" }}
          >
            Every partner villa comes equipped with a single QR code. One scan
            from a guest's phone unlocks a fully personalized VIP island
            experience — no app download, no account required.
          </p>

          <PhoneQR />
        </div>

        {/* ── Right col: feature list ── */}
        <div className="flex flex-col divide-y divide-[#C9A96E]/15">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-5 py-8 first:pt-0 last:pb-0 lg:gap-7">
              {/* Index / icon */}
              <div className="flex-shrink-0 flex flex-col items-center pt-1">
                <span
                  className="font-[family-name:var(--font-cormorant)] font-[300] text-[#C9A96E]/50 text-xl leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < features.length - 1 && (
                  <div className="flex-1 w-px bg-[#C9A96E]/10 mt-3" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-xl leading-snug lg:text-2xl">
                  {feature.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/55 text-sm leading-7"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
