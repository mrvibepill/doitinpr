"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Region = "Metro Area" | "East";
type ServiceCategory = "Beaches" | "VIP Tours" | "Culinary" | "Ocean Charters";
type FilterTab = "All Curation" | ServiceCategory;

interface Service {
  id: string;
  name: string;
  region: Region;
  subLocation: string;
  category: ServiceCategory;
  price?: string;
  priceLabel?: string;
  hours?: string;
  description: string;
  inclusions?: string[];
  gradient: string;
  topAccent: string;
  isFeatured?: boolean;
  image?: string;
}

// ─── Dataset ──────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  // ── Metro Area · Beaches ────────────────────────────────────────────────────
  {
    id: "hobie-beach",
    name: "Fun in the Sun Package",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Beaches",
    price: "$49.99",
    priceLabel: "All Day Access",
    hours: "9:00 AM – 6:00 PM",
    description:
      "Your fully coordinated private slice of paradise on Hobie Beach. Skip the logistics and step directly onto your reserved beachfront setup — everything waiting, nothing to arrange.",
    inclusions: [
      "Premium Umbrella & Chairs",
      "Stocked Cooler with Cold Water",
      "Fresh Local Fruit Basket",
      "Complimentary Tropical Photo Session",
    ],
    gradient: "from-[#062030] via-[#0a3550] to-[#041825]",
    topAccent: "border-t-[#1a6fa0]",
    isFeatured: true,
    image: "https://justforthebeach.com/wp-content/uploads/2016/04/Beach2520Chairs_2.jpeg",
  },

  // ── Metro Area · Ocean Charters / Water Sports ───────────────────────────────
  {
    id: "metro-jetski",
    name: "Jet Ski Rental",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Ocean Charters",
    description: "High-performance jet ski rental along the Isla Verde coast. Feel the Caribbean spray at full throttle with our premium fleet.",
    gradient: "from-[#051828] via-[#0a2a45] to-[#030f1a]",
    topAccent: "border-t-[#1a5a8a]",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/65/8d/ad.jpg",
  },
  {
    id: "metro-banana",
    name: "Banana Boat",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Ocean Charters",
    description: "Group thrills on the water. Hold on tight as you're pulled across the turquoise bay — pure Caribbean fun for all.",
    gradient: "from-[#0a1e10] via-[#0d3018] to-[#060f0a]",
    topAccent: "border-t-[#1a6a30]",
    image: "https://images.squarespace-cdn.com/content/v1/67d108c93c81c847d2543a12/3b231579-c97e-4711-89ed-a81d8593959e/Banana+Boat+Watersports+4U.JPG",
  },
  {
    id: "metro-parasailing",
    name: "Parasailing",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Ocean Charters",
    description: "Ascend above the coastline and take in panoramic views of San Juan from 400 feet. A breathtaking aerial escape over the Caribbean.",
    gradient: "from-[#080820] via-[#101035] to-[#050510]",
    topAccent: "border-t-[#3a3a9a]",
    image: "https://images.squarespace-cdn.com/content/v1/67d108c93c81c847d2543a12/397f95b7-57fc-47c3-a1a7-f26685cf931c/Parasail+Puerto+Rico.JPG",
  },
  {
    id: "metro-atv",
    name: "ATV Rentals",
    region: "Metro Area",
    subLocation: "Condado",
    category: "Ocean Charters",
    description: "Off-road adventures at Hacienda Campo Rico. Navigate rugged trails through Puerto Rico's lush interior on premium ATVs.",
    gradient: "from-[#1a0e04] via-[#2a1808] to-[#0f0a03]",
    topAccent: "border-t-[#8a4a10]",
    image: "https://camporicotrailrides.com/wp-content/uploads/sites/8143/2025/11/DSC08413.jpg?resize=360%2C240&zoom=2",
  },
  {
    id: "metro-horse",
    name: "Horse Riding",
    region: "Metro Area",
    subLocation: "Condado",
    category: "Ocean Charters",
    description: "A serene horseback journey through the grounds of Hacienda Campo Rico. Bespoke trails for all experience levels.",
    gradient: "from-[#0f1508] via-[#182010] to-[#090e05]",
    topAccent: "border-t-[#4a6a20]",
    image: "https://queensland.com/content/dam/teq/consumer/global/images/destinations/tropical-north-queensland/blog-images/hero-banner/2021_TNQ_CapeTribulationHorseRides_Beaches_JackHarlem_142342.jpg",
  },
  {
    id: "metro-laguna",
    name: "Laguna Tours",
    region: "Metro Area",
    subLocation: "Condado",
    category: "Ocean Charters",
    description: "Glide through the mangrove lagoons of Condado with an expert guide. Discover hidden ecosystems steps from the city's skyline.",
    gradient: "from-[#041510] via-[#072218] to-[#020d0a]",
    topAccent: "border-t-[#1a7050]",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/c4/8d/c1.jpg",
  },
  {
    id: "metro-paddleboard",
    name: "Paddle Board",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Ocean Charters",
    description: "Stand-up paddle boarding on calm Caribbean waters. Perfect for sunrise sessions or golden-hour glides along the shore.",
    gradient: "from-[#061828] via-[#0a2840] to-[#030f18]",
    topAccent: "border-t-[#1a5a80]",
    image: "https://www.pinegrovesurfclub.com/wp-content/uploads/sites/8158/2025/11/AdobeStock_381194412-e1763575455379.jpeg?resize=360%2C240&zoom=2",
  },

  // ── Metro Area · Culinary ────────────────────────────────────────────────────
  {
    id: "metro-dine-iv",
    name: "Top 5 Do It Restaurant",
    region: "Metro Area",
    subLocation: "Isla Verde",
    category: "Culinary",
    description: "The definitive Isla Verde dining edit — five curated tables where flavor, atmosphere, and service converge into something unforgettable.",
    gradient: "from-[#1a0808] via-[#2a1010] to-[#0f0505]",
    topAccent: "border-t-[#9a2020]",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/c7/ae/4a/caption.jpg?w=900&h=500&s=1",
  },
  {
    id: "metro-dine-cond",
    name: "Top 3 Do It Restaurant",
    region: "Metro Area",
    subLocation: "Condado",
    category: "Culinary",
    description: "Condado's finest tables, personally vetted by our concierge team. From coastal seafood to elevated modern cuisine.",
    gradient: "from-[#1a0e04] via-[#281608] to-[#0f0a03]",
    topAccent: "border-t-[#9a5010]",
    image: "https://www.elsanjuanhotel.com/content/uploads/2023/04/MM_022-scaled.jpeg",
  },
  {
    id: "metro-dinner-beach",
    name: "Romantic Beach Dinner",
    region: "Metro Area",
    subLocation: "Condado",
    category: "Culinary",
    description: "An intimate candlelit dinner set directly on the sand — private table, curated menu, and the sound of Caribbean waves as your backdrop.",
    gradient: "from-[#1a0d05] via-[#2a1808] to-[#0f0a04]",
    topAccent: "border-t-[#c9a96e]",
    isFeatured: true,
    image: "https://www.sanjuaninsider.com/wp-content/uploads/2025/02/valentines-sj-featured.webp",
  },
  {
    id: "metro-dine-osj",
    name: "Top 3 Do It Restaurant",
    region: "Metro Area",
    subLocation: "Old San Juan",
    category: "Culinary",
    description: "Dine inside UNESCO-listed cobblestone streets. Old San Juan's three standout venues, each with centuries of history beneath their ceilings.",
    gradient: "from-[#0d0818] via-[#180d28] to-[#080510]",
    topAccent: "border-t-[#5a3090]",
    image: "https://shesavesshetravels.com/wp-content/uploads/2024/12/best-restaurants-old-san-juan.jpg",
  },

  // ── Metro Area · VIP Tours ────────────────────────────────────────────────────
  {
    id: "metro-morro",
    name: "El Morro Tour",
    region: "Metro Area",
    subLocation: "Old San Juan",
    category: "VIP Tours",
    description: "A private guided experience inside the 16th-century fortress overlooking the Atlantic. History brought to life with exclusive access and expert narration.",
    gradient: "from-[#0a1018] via-[#101825] to-[#060a10]",
    topAccent: "border-t-[#2a4a6a]",
    image: "https://sanjuantourspr.com/wp-content/uploads/sites/3917/2023/02/El-Morro-Castle.jpeg?resize=360%2C240&zoom=2",
  },
  {
    id: "metro-cristobal",
    name: "San Cristóbal Tour",
    region: "Metro Area",
    subLocation: "Old San Juan",
    category: "VIP Tours",
    description: "Explore the Americas' largest Spanish colonial fortress at your own pace with a private concierge guide. Tunnels, ramparts, and panoramic bay views included.",
    gradient: "from-[#0a0e18] via-[#121828] to-[#060810]",
    topAccent: "border-t-[#2a3a7a]",
    image: "https://sanjuantourspr.com/wp-content/uploads/sites/3917/2025/10/000_36f687.jpg?resize=1200%2C900&zoom=2",
  },

  // ── East · Beaches ────────────────────────────────────────────────────────────
  {
    id: "luquillo-beach",
    name: "Fun in the Sun Package",
    region: "East",
    subLocation: "Luquillo",
    category: "Beaches",
    price: "$49.99",
    priceLabel: "All Day Access",
    hours: "9:00 AM – 6:00 PM",
    description:
      "The same premium coordinated beach experience — now on Luquillo's legendary crescent shore, framed by El Yunque rainforest and the clearest waters in Puerto Rico.",
    inclusions: [
      "Premium Umbrella & Chairs",
      "Stocked Cooler with Cold Water",
      "Fresh Local Fruit Basket",
      "Complimentary Tropical Photo Session",
    ],
    gradient: "from-[#052520] via-[#083d32] to-[#031510]",
    topAccent: "border-t-[#1a8060]",
    isFeatured: true,
  },

  // ── East · Ocean Charters ──────────────────────────────────────────────────────
  {
    id: "east-yacht",
    name: "Private Yacht Charter",
    region: "East",
    subLocation: "Fajardo",
    category: "Ocean Charters",
    description: "Set sail from Fajardo aboard a fully crewed private yacht. Anchor at Cayo Icacos, snorkel pristine reefs, and watch the sun set over the Spanish Virgin Islands.",
    gradient: "from-[#040e22] via-[#071830] to-[#020810]",
    topAccent: "border-t-[#1a3a8a]",
    isFeatured: true,
  },
  {
    id: "east-catamaran",
    name: "Private Catamaran",
    region: "East",
    subLocation: "Fajardo",
    category: "Ocean Charters",
    description: "A spacious private catamaran departure from Fajardo Marina. Ideal for groups — enjoy open decks, snorkeling gear, and a curated on-board experience.",
    gradient: "from-[#041820] via-[#072830] to-[#020f18]",
    topAccent: "border-t-[#1a6a80]",
  },
  {
    id: "east-boat",
    name: "Private Boat Charter",
    region: "East",
    subLocation: "Fajardo",
    category: "Ocean Charters",
    description: "A nimble private boat for intimate island-hopping. Navigate to secluded coves and uninhabited keys only accessible by water.",
    gradient: "from-[#040f20] via-[#071828] to-[#020a10]",
    topAccent: "border-t-[#1a4a70]",
  },
  {
    id: "east-jetski",
    name: "Jet Ski Rentals",
    region: "East",
    subLocation: "Luquillo",
    category: "Ocean Charters",
    description: "Blaze across the protected bay of Luquillo on a premium jet ski, with El Yunque's peaks rising behind you. Pure island exhilaration.",
    gradient: "from-[#062018] via-[#0a3025] to-[#031008]",
    topAccent: "border-t-[#1a7050]",
  },

  // ── East · VIP Tours ────────────────────────────────────────────────────────
  {
    id: "east-yunque",
    name: "El Yunque Rainforest Tour",
    region: "East",
    subLocation: "Rio Grande",
    category: "VIP Tours",
    description: "A private naturalist-guided expedition into the only tropical rainforest in the US National Forest System. Hidden waterfalls, rare flora, and the song of the coquí.",
    gradient: "from-[#051508] via-[#092010] to-[#030c05]",
    topAccent: "border-t-[#2a7a30]",
    isFeatured: true,
  },
  {
    id: "east-carabali",
    name: "Hacienda Carabalí Adventure",
    region: "East",
    subLocation: "Rio Grande",
    category: "VIP Tours",
    description: "Horse riding and ATV rentals at the iconic Hacienda Carabalí, set against the dramatic El Yunque foothills. The ultimate East coast outdoor experience.",
    gradient: "from-[#150e04] via-[#201508] to-[#0a0803]",
    topAccent: "border-t-[#7a5010]",
  },

  // ── East · Culinary ─────────────────────────────────────────────────────────
  {
    id: "east-dine-luq",
    name: "Top 3 Do It Restaurant",
    region: "East",
    subLocation: "Luquillo",
    category: "Culinary",
    description: "Luquillo's most beloved dining destinations — from the famous kiosk strip to elevated beachfront tables with fresh-caught Caribbean seafood.",
    gradient: "from-[#180804] via-[#280e06] to-[#0f0503]",
    topAccent: "border-t-[#9a3010]",
  },
  {
    id: "east-dine-rg",
    name: "Top 3 Do It Restaurant",
    region: "East",
    subLocation: "Rio Grande",
    category: "Culinary",
    description: "Intimate farm-to-table experiences and upscale casual dining on the edge of El Yunque. Locally sourced, expertly prepared.",
    gradient: "from-[#0d1508] via-[#182010] to-[#080c05]",
    topAccent: "border-t-[#4a7020]",
  },
  {
    id: "east-dine-faj",
    name: "Top 3 Do It Restaurant",
    region: "East",
    subLocation: "Fajardo",
    category: "Culinary",
    description: "Fajardo's waterfront dining edit — catch-of-the-day menus, sunset views over the cays, and the freshest mofongo on the island.",
    gradient: "from-[#04100e] via-[#071a18] to-[#020a08]",
    topAccent: "border-t-[#1a7060]",
  },
];

// ─── Filter Config ─────────────────────────────────────────────────────────────

const REGIONS: Region[] = ["Metro Area", "East"];

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All Curation", value: "All Curation" },
  { label: "🏖️  Pristine Beaches", value: "Beaches" },
  { label: "🥾  VIP Tours & Hikes", value: "VIP Tours" },
  { label: "🍽️  Culinary", value: "Culinary" },
  { label: "⛵  Ocean Charters", value: "Ocean Charters" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function GoldCheck() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="12" height="12" stroke="#C9A96E" strokeOpacity="0.4" />
      <path d="M2.5 6.5L5 9.5L10.5 3.5" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}

function SubLocationBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[9px] uppercase border border-[#C9A96E]/25 px-2 py-1"
      style={{ letterSpacing: "0.14em" }}
    >
      {name}
    </span>
  );
}

function FeaturedCard({ service }: { service: Service }) {
  return (
    <article
      className="group col-span-1 md:col-span-2 xl:col-span-3 grid grid-cols-1 border border-[#C9A96E]/20 overflow-hidden bg-[#0f0f0f] md:grid-cols-5 transition-colors duration-500 hover:border-[#C9A96E]/40"
      style={{ borderRadius: 0 }}
    >
      {/* Visual panel */}
      <div
        className={`relative overflow-hidden min-h-56 md:col-span-2 md:min-h-full bg-gradient-to-b ${service.gradient} border-t-2 ${service.topAccent}`}
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 bg-inherit" />
        )}
        {/* Location badge */}
        <div className="absolute bottom-0 left-0 bg-[#0D0D0D]/75 px-4 py-3 backdrop-blur-sm">
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[9px] uppercase"
            style={{ letterSpacing: "0.18em" }}
          >
            {service.subLocation}&nbsp;·&nbsp;Puerto Rico
          </p>
        </div>
        {/* Featured index */}
        <span
          className="absolute -bottom-3 right-4 font-[family-name:var(--font-cormorant)] font-[300] text-[#F5F0EB]/5 text-[120px] leading-none select-none"
          aria-hidden="true"
        >
          ★
        </span>
      </div>

      {/* Copy panel */}
      <div className="flex flex-col justify-between px-7 py-8 md:col-span-3 md:px-10 md:py-12">
        <div className="flex flex-col gap-5">
          {/* Top meta row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-[9px] uppercase border border-[#C9A96E]/30 px-3 py-1.5"
              style={{ letterSpacing: "0.15em" }}
            >
              Featured Curation
            </span>
            <SubLocationBadge name={service.subLocation} />
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-3xl leading-tight md:text-4xl">
            {service.name}
            {service.hours && (
              <>
                <br />
                <span className="italic text-[#F5F0EB]/60">{service.subLocation}</span>
              </>
            )}
          </h3>

          {/* Price */}
          {service.price && (
            <div className="flex flex-col gap-1">
              <p
                className="font-[family-name:var(--font-montserrat)] font-[500] text-[#C9A96E] text-xl"
                style={{ letterSpacing: "0.04em" }}
              >
                {service.price}
                <span className="font-[200] text-[#F5F0EB]/40 text-sm ml-2">/ {service.priceLabel}</span>
              </p>
              {service.hours && (
                <p
                  className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/35 text-xs"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {service.hours}
                </p>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="w-8 h-px bg-[#C9A96E]/30" />

          {/* Description */}
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/55 text-sm leading-7"
            style={{ letterSpacing: "0.02em" }}
          >
            {service.description}
          </p>

          {/* Inclusions */}
          {service.inclusions && (
            <ul className="flex flex-col gap-2.5 mt-1">
              {service.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <GoldCheck />
                  <span
                    className="font-[family-name:var(--font-montserrat)] font-[300] text-[#F5F0EB]/70 text-sm"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="mt-9 flex flex-col gap-3">
          <button
            className="cta-gold inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#0D0D0D] px-7 py-4 text-[10px] font-[500] uppercase self-start hover:bg-[#F5F0EB] hover:gap-4 transition-all"
            style={{ letterSpacing: "0.18em", borderRadius: 0 }}
          >
            Inquire via Concierge
            <ArrowRight />
          </button>
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/20 text-[9px]"
            style={{ letterSpacing: "0.1em" }}
          >
            No charge until confirmed &nbsp;·&nbsp; Response within 2 hours
          </p>
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className="group flex flex-col border border-[#C9A96E]/15 bg-[#0f0f0f] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A96E]/40"
      style={{ borderRadius: 0 }}
    >
      {/* Visual panel */}
      <div
        className={`relative h-44 overflow-hidden bg-gradient-to-b ${service.gradient} border-t-2 ${service.topAccent}`}
      >
        {service.image && (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {!service.image && (
          <div className="absolute inset-0 bg-inherit transition-transform duration-700 ease-out group-hover:scale-110" />
        )}
        {/* Decorative index */}
        <span
          className="absolute bottom-1 right-4 font-[family-name:var(--font-cormorant)] font-[300] text-[#F5F0EB]/8 text-7xl leading-none select-none"
          aria-hidden="true"
        >
          ✦
        </span>
        {/* Sub-location badge in corner */}
        <div className="absolute top-4 left-4">
          <SubLocationBadge name={service.subLocation} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category chip */}
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E]/70 text-[9px] uppercase mb-3"
          style={{ letterSpacing: "0.14em" }}
        >
          {service.category === "Ocean Charters"
            ? "Ocean & Water"
            : service.category === "VIP Tours"
            ? "VIP Tours & Hikes"
            : service.category}
        </p>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-xl leading-snug mb-3">
          {service.name}
        </h3>

        {/* Price */}
        {service.price && (
          <p
            className="font-[family-name:var(--font-montserrat)] font-[400] text-[#C9A96E] text-base mb-3"
            style={{ letterSpacing: "0.04em" }}
          >
            {service.price}
            <span className="font-[200] text-[#F5F0EB]/35 text-xs ml-1.5">/ {service.priceLabel}</span>
          </p>
        )}

        {/* Description */}
        <p
          className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/50 text-xs leading-6 flex-1"
          style={{ letterSpacing: "0.02em" }}
        >
          {service.description}
        </p>

        {/* CTA */}
        <div className="mt-6 pt-5 border-t border-[#C9A96E]/10">
          <button
            className="cta-gold inline-flex items-center gap-2.5 font-[family-name:var(--font-montserrat)] font-[300] text-[#C9A96E] text-[10px] uppercase group-hover:gap-4 transition-all duration-300"
            style={{ letterSpacing: "0.14em" }}
          >
            Inquire via Concierge
            <ArrowRight />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [activeRegion, setActiveRegion] = useState<Region>("Metro Area");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All Curation");
  const filterBarRef = useRef<HTMLDivElement>(null);
  const [filterBarStuck, setFilterBarStuck] = useState(false);

  // Detect when filter bar becomes sticky
  useEffect(() => {
    const sentinel = document.getElementById("filter-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterBarStuck(!entry.isIntersecting),
      { threshold: 1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Reset filter when region changes
  const handleRegionChange = (region: Region) => {
    setActiveRegion(region);
    setActiveFilter("All Curation");
  };

  // Filtered services
  const regionServices = SERVICES.filter((s) => s.region === activeRegion);
  const filtered =
    activeFilter === "All Curation"
      ? regionServices
      : regionServices.filter((s) => s.category === activeFilter);

  const featured = filtered.filter((s) => s.isFeatured);
  const standard = filtered.filter((s) => !s.isFeatured);

  return (
    <main className="min-h-screen bg-[#0D0D0D]">

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden min-h-[500px] lg:min-h-[600px] px-6 pt-20 pb-14 lg:px-20 lg:pt-28 lg:pb-20">

        {/* Background image — quality 100, no blur */}
        <Image
          src="/images/hobiebeach-01-doitinpr.png"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-center z-0"
          sizes="100vw"
          aria-hidden="true"
        />

        {/* Light dark wash so text stays readable */}
        <div className="absolute inset-0 z-10 bg-zinc-950/25" />

        {/* Bottom fade to obsidian — keeps catalog below seamless */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#0D0D0D]/20 to-[#0D0D0D]" />

        {/* Text content */}
        <div className="relative z-30">
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase mb-5"
            style={{ letterSpacing: "0.18em" }}
          >
            Do It In PR &nbsp;·&nbsp; Concierge Collection
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-5xl leading-tight tracking-tight lg:text-7xl lg:max-w-3xl">
            Explore Puerto Rico
            <br />
            <span className="italic text-[#C9A96E]">as it was meant to be.</span>
          </h1>
          <div className="w-14 h-px bg-[#C9A96E] mt-8" />
          <p
            className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/50 text-sm leading-7 mt-6 max-w-lg"
            style={{ letterSpacing: "0.03em" }}
          >
            Our curated collection of premium experiences, handpicked by the
            Do&nbsp;It concierge team. Every selection is personally vetted,
            seamlessly arranged, and available on demand.
          </p>
        </div>

      </header>

      {/* ── Region Selector ──────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-20 mb-0">
        <div className="flex items-end gap-0 border-b border-[#C9A96E]/15">
          {REGIONS.map((region) => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className={`relative px-6 py-4 font-[family-name:var(--font-montserrat)] font-[300] text-xs uppercase transition-all duration-300 ${
                  isActive
                    ? "text-[#C9A96E]"
                    : "text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60"
                }`}
                style={{ letterSpacing: "0.15em", borderRadius: 0 }}
              >
                {region}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sticky Filter Bar ────────────────────────────────────────────────── */}
      {/* Sentinel element — used to detect when bar becomes sticky */}
      <div id="filter-sentinel" className="h-px" />

      <div
        ref={filterBarRef}
        className={`sticky top-0 z-20 bg-[#0D0D0D] px-6 lg:px-20 transition-shadow duration-300 ${
          filterBarStuck ? "shadow-[0_1px_0_0_rgba(201,169,110,0.15)]" : ""
        }`}
      >
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar py-4 border-b border-[#C9A96E]/10">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex-shrink-0 px-5 py-2.5 font-[family-name:var(--font-montserrat)] font-[300] text-[10px] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#C9A96E] text-[#0D0D0D]"
                    : "text-[#F5F0EB]/40 hover:text-[#F5F0EB]/70"
                }`}
                style={{ letterSpacing: "0.14em", borderRadius: 0 }}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Result count */}
          <div className="ml-auto pl-6 flex-shrink-0">
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/25 text-[9px] uppercase whitespace-nowrap"
              style={{ letterSpacing: "0.14em" }}
            >
              {filtered.length} {filtered.length === 1 ? "Experience" : "Experiences"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Results Grid ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-12 lg:px-20 lg:py-16">

        {/* Region sub-heading */}
        <div className="mb-10">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-2xl lg:text-3xl">
              {activeRegion}
            </h2>
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/30 text-xs uppercase"
              style={{ letterSpacing: "0.15em" }}
            >
              {activeRegion === "Metro Area"
                ? "Isla Verde · Condado · Old San Juan"
                : "Luquillo · Rio Grande · Fajardo"}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-px bg-[#C9A96E]/30" />
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/25 text-xs uppercase text-center"
              style={{ letterSpacing: "0.15em" }}
            >
              No experiences found in this category
            </p>
            <div className="w-10 h-px bg-[#C9A96E]/30" />
          </div>
        ) : (
          <div className="flex flex-col gap-8">

            {/* Featured / Spotlight cards */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {featured.map((service) => (
                  <FeaturedCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* Standard cards */}
            {standard.length > 0 && (
              <>
                {featured.length > 0 && (
                  <div className="flex items-center gap-6 my-2">
                    <div className="flex-1 h-px bg-[#C9A96E]/10" />
                    <p
                      className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/20 text-[9px] uppercase flex-shrink-0"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      More Experiences
                    </p>
                    <div className="flex-1 h-px bg-[#C9A96E]/10" />
                  </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {standard.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:px-20 lg:py-28 border-t border-[#C9A96E]/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 max-w-lg">
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#C9A96E] text-xs uppercase"
              style={{ letterSpacing: "0.15em" }}
            >
              Bespoke Planning
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[#F5F0EB] text-3xl leading-tight lg:text-4xl">
              Can&apos;t find what you&apos;re envisioning?
              <br />
              <span className="italic text-[#F5F0EB]/50">
                We curate the extraordinary.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="cta-gold inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#0D0D0D] px-10 py-4 text-[10px] font-[500] uppercase hover:bg-[#F5F0EB] transition-all"
              style={{ letterSpacing: "0.18em", borderRadius: 0 }}
            >
              Contact Your Concierge
              <ArrowRight />
            </button>
            <p
              className="font-[family-name:var(--font-montserrat)] font-[200] text-[#F5F0EB]/20 text-[9px]"
              style={{ letterSpacing: "0.1em" }}
            >
              Available 7 days &nbsp;·&nbsp; Response within 2 hours
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
