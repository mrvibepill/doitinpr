import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0D0D0D] flex flex-col justify-center px-6 py-24 lg:px-20 lg:py-40">
      {/* Background image */}
      <Image
        src="/images/hobiebeach-02-doitinpr.png.png"
        alt="Hobie Beach, Puerto Rico"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Black gradient overlay — fades to solid at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0D0D0D]" />
      {/* All content sits above the image/gradient */}
      <div className="relative z-10 flex flex-col">
        {/* Eyebrow */}
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-6 lg:mb-8"
          style={{ letterSpacing: "0.15em" }}
        >
          Puerto Rico Luxury Concierge
        </p>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-cormorant)] font-semibold tracking-tight text-[#F5F0EB] text-6xl leading-none lg:text-[88px] lg:max-w-4xl">
          Experience Puerto&nbsp;Rico
          <br />
          <span className="italic">Like Never Before.</span>
        </h1>

        {/* Gold separator */}
        <div className="w-16 h-px bg-[#C9A96E] my-8 lg:my-10" />

        {/* Subheading */}
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/70 text-sm max-w-md leading-7 lg:text-base lg:max-w-lg"
          style={{ letterSpacing: "0.15em" }}
        >
          Your AI-powered guide to the island's finest experiences — curated
          dining, private excursions, and hidden gems, all in one place.
        </p>

        {/* CTA row */}
        <div className="flex flex-col gap-4 mt-10 lg:flex-row lg:items-center lg:mt-14">
          <Link
            href="/explore"
            className="cta-gold inline-flex items-center justify-center bg-[#C9A96E] text-[#0D0D0D] px-10 py-4 text-xs font-[500] uppercase hover:bg-[#F5F0EB] hover:tracking-[0.2em]"
            style={{ letterSpacing: "0.15em", borderRadius: 0 }}
          >
            Start Exploring
          </Link>
          <a
            href="#learn-more"
            className="cta-gold inline-flex items-center justify-center border border-[#C9A96E] text-[#C9A96E] px-10 py-4 text-xs font-[300] uppercase hover:bg-[#C9A96E] hover:text-[#0D0D0D]"
            style={{ letterSpacing: "0.15em", borderRadius: 0 }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Full-width bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E]/30 z-10" />
    </section>
  );
}
