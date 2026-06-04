import Hero from "@/components/Hero";
import CuratedExperiences from "@/components/CuratedExperiences";
import ElevateStay from "@/components/ElevateStay";
import Manifesto from "@/components/Manifesto";
import GuestStoriesCTA from "@/components/GuestStoriesCTA";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <CuratedExperiences />
      <ElevateStay />
      <Manifesto />
      <GuestStoriesCTA />
    </main>
  );
}
