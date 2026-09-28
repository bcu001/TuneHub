import CategorySection from "@/components/CategorySection";
import SongFeaturedSection from "@/components/SongFeaturedSection";

const HomePage = () => {
  return (
    <main className="w-full min-w-0 space-y-2">
      <CategorySection />
      <SongFeaturedSection />
    </main>
  );
};

export default HomePage;
