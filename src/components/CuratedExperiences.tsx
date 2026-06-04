const experiences = [
  {
    index: "01",
    category: "On the Water",
    title: "Luxury Yacht Charters",
    description:
      "Set sail on a private crewed yacht along Puerto Rico's unspoiled coastline. Snorkel hidden coves, anchor at Cayo Icacos, and watch the sun melt into the Caribbean.",
    gradient: "from-[#0a1628] via-[#0d2240] to-[#091520]",
    accent: "border-t-[#1a4a7a]",
  },
  {
    index: "02",
    category: "From Above",
    title: "Private Helicopter Tours",
    description:
      "Ascend above El Yunque's canopy and Old San Juan's pastel rooftops. A bespoke aerial journey tailored to your itinerary — no groups, no compromises.",
    gradient: "from-[#1a0e05] via-[#2a1a08] to-[#0f0a04]",
    accent: "border-t-[#7a4a10]",
  },
  {
    index: "03",
    category: "Into the Wild",
    title: "VIP Rainforest Expeditions",
    description:
      "Venture deep into El Yunque with a private naturalist guide. Discover rare flora, hidden waterfalls, and the chorus of the coquí — far from the tourist trail.",
    gradient: "from-[#071510] via-[#0d2018] to-[#050f0a]",
    accent: "border-t-[#1a5c35]",
  },
];

export default function CuratedExperiences() {
  return (
    <section className="bg-[#0D0D0D] px-6 py-16 lg:px-20 lg:py-32">
      {/* Section header */}
      <div className="mb-10 lg:mb-16">
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Handpicked for You
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-4xl leading-tight lg:text-6xl lg:max-w-xl">
          Curated Experiences
        </h2>
        <div className="w-12 h-px bg-[#C9A96E] mt-6" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {experiences.map((exp) => (
          <article
            key={exp.index}
            className="group flex flex-col border border-[#C9A96E]/15 bg-[#111111] overflow-hidden lg:transition-transform lg:duration-500 lg:ease-out lg:hover:-translate-y-2 lg:hover:border-[#C9A96E]/50"
            style={{ borderRadius: 0 }}
          >
            {/* Visual panel */}
            <div
              className={`relative h-52 bg-gradient-to-b ${exp.gradient} lg:h-64 border-t-2 ${exp.accent} overflow-hidden`}
            >
              {/* Index number — decorative */}
              <span
                className="absolute bottom-4 right-5 font-[family-name:var(--font-cormorant)] font-[300] text-[#F5F0EB]/10 text-8xl leading-none select-none lg:text-9xl"
                aria-hidden="true"
              >
                {exp.index}
              </span>
              {/* Category chip */}
              <span
                className="absolute top-5 left-5 font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[10px] uppercase"
                style={{ letterSpacing: "0.15em" }}
              >
                {exp.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 lg:p-8">
              <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-2xl leading-tight mb-4 lg:text-3xl">
                {exp.title}
              </h3>
              <p
                className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/60 text-sm leading-7 flex-1"
                style={{ letterSpacing: "0.02em" }}
              >
                {exp.description}
              </p>

              {/* Discover link */}
              <div className="mt-8 pt-6 border-t border-[#C9A96E]/15">
                <a
                  href="#"
                  className="cta-gold inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] font-[300] text-[#C9A96E] text-xs uppercase group-hover:gap-5"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Discover
                  <span className="text-base leading-none" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
