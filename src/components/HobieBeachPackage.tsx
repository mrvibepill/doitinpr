import Image from "next/image";

const highlights = [
  "Premium Umbrella & Chairs",
  "Stocked Cooler with Cold Water",
  "Fresh Local Fruit Basket",
  "Complimentary Tropical Photo Session",
];

function GoldCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="13" height="13" stroke="#C9A96E" strokeOpacity="0.5" />
      <path d="M3 7L5.8 10L11 4" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  );
}

export default function HobieBeachPackage() {
  return (
    <section className="bg-[#0D0D0D] px-6 py-16 lg:px-20 lg:py-28">

      {/* Section header */}
      <div className="mb-10 lg:mb-16">
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Isla Verde Exclusives
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-4xl leading-tight lg:text-5xl">
          Featured Beach Curation
        </h2>
        <div className="w-12 h-px bg-[#C9A96E] mt-6" />
      </div>

      {/* 2-column spotlight */}
      <div className="grid grid-cols-1 gap-0 border border-[#C9A96E]/20 lg:grid-cols-2">

        {/* ── Left: image panel ── */}
        <div className="relative min-h-72 overflow-hidden lg:min-h-full">
          <Image
            src="/images/hobiebeach-01-doitinpr.png"
            alt="Hobie Beach, Isla Verde — turquoise Caribbean waters and pristine white sand"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Bottom-left label badge */}
          <div className="absolute bottom-0 left-0 bg-[#0D0D0D]/80 px-4 py-3 backdrop-blur-sm">
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[10px] uppercase"
              style={{ letterSpacing: "0.18em" }}
            >
              Hobie Beach &nbsp;·&nbsp; Isla Verde, PR
            </p>
          </div>
        </div>

        {/* ── Right: copy panel ── */}
        <div className="flex flex-col justify-between bg-[#111] px-6 py-8 lg:px-10 lg:py-12">

          {/* Top content */}
          <div className="flex flex-col gap-6">

            {/* Tag */}
            <span
              className="self-start font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[10px] uppercase border border-[#C9A96E]/30 px-3 py-1.5"
              style={{ letterSpacing: "0.15em" }}
            >
              All-Day VIP Access
            </span>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-3xl leading-tight lg:text-4xl">
              The Hobie Beach
              <br />
              <span className="italic">All-Day VIP Setup</span>
            </h3>

            {/* Price + hours */}
            <div className="flex flex-col gap-1">
              <p
                className="font-[family-name:var(--font-montserrat)] font-[500] text-[#C9A96E] text-xl"
                style={{ letterSpacing: "0.05em" }}
              >
                $39.99
                <span className="font-[200] text-[#F5F0EB]/40 text-sm ml-2">
                  / All Day Access
                </span>
              </p>
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/40 text-xs"
                style={{ letterSpacing: "0.12em" }}
              >
                9:00 AM – 6:00 PM &nbsp;·&nbsp; Isla Verde
              </p>
            </div>

            {/* Gold rule */}
            <div className="w-10 h-px bg-[#C9A96E]/30" />

            {/* Luxury copy */}
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/60 text-sm leading-7"
              style={{ letterSpacing: "0.02em" }}
            >
              Your private slice of paradise, fully coordinated. Skip the
              logistics and step directly onto your reserved premium beach
              chairs and umbrella — fully stocked with local beach toys,
              refreshing cold water, and fresh seasonal tropical fruit waiting
              for you by the shore. Includes an exclusive Tropical Photo Session
              to immortalize your island escape.
            </p>

            {/* Highlights */}
            <ul className="flex flex-col gap-3 mt-1">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <GoldCheck />
                  <span
                    className="font-[family-name:var(--font-montserrat)] font-[300] text-[#F5F0EB]/75 text-sm"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-3">
            <a
              href="#"
              className="cta-gold inline-flex items-center justify-center bg-[#C9A96E] text-[#0D0D0D] px-8 py-4 text-xs font-[500] uppercase hover:bg-[#F5F0EB] w-full lg:w-auto lg:self-start"
              style={{ letterSpacing: "0.18em", borderRadius: 0 }}
            >
              Request Beach Setup
            </a>
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/25 text-[10px]"
              style={{ letterSpacing: "0.1em" }}
            >
              Pre-authorization only &nbsp;·&nbsp; No charge until confirmed
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
