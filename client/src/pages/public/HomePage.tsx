import CategorySection from '@/components/CategorySection';
import HeroSection from '@/components/HeroSection';
import SongFeaturedSection from '@/components/SongFeaturedSection';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const HomePage = () => {
  useDocumentTitle('Home | TuneHub');
  return (
    <div className="w-full min-w-0 space-y-10">
      <HeroSection />
      <CategorySection />
      <SongFeaturedSection />
    </div>
  );
};

export default HomePage;
