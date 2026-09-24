import CategorySection from "@/components/CategorySection";
import SongFeaturedSection from "@/components/SongFeaturedSection";

const HomePage = () => {
  // const {data} = useSongById('6ab4b82c5a75e2a7a667889f')
  // const {data} = useSong(1,'');
  return (
    <main className="w-full min-w-0 space-y-2">
      <CategorySection />
      <SongFeaturedSection/>
      {/* <div className="flex flex-col gap-2">
        <SongHorizontalCard song={data}/>
        <SongHorizontalCard song={data}/>
        <SongHorizontalCard song={data}/>
        <SongHorizontalCard song={data}/>
      </div> */}
    </main>
  );
};

export default HomePage;
