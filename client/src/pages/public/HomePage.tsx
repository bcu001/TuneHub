import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/HeroSection";
import SongFeaturedSection from "@/components/SongFeaturedSection";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Home | TuneHub")
  return (
    <main className="w-full min-w-0 space-y-2">
      <HeroSection />
      <CategorySection />
      <SongFeaturedSection />
    </main>
  );
};

export default HomePage;
