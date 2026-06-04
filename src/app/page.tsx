import Hero from "@/components/Hero";
import CuratedExperiences from "@/components/CuratedExperiences";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <CuratedExperiences />
    </main>
  );
}
