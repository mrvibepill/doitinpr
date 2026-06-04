import Hero from "@/components/Hero";
import CuratedExperiences from "@/components/CuratedExperiences";
import ElevateStay from "@/components/ElevateStay";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <CuratedExperiences />
      <ElevateStay />
    </main>
  );
}
