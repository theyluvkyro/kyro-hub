import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MediaRow } from "../components/MediaRow";
import { useTvPopular, useTvTopRated, useTrendingAll } from "../hooks/use-media";
import type { MediaItem } from "@shared/schema";

export default function TvShows() {
  const { data: trending, isLoading: trendingLoading } = useTrendingAll();
  const { data: popularTv, isLoading: tvLoading } = useTvPopular();
  const { data: topRatedTv, isLoading: topRatedLoading } = useTvTopRated();

  // Filter trending to only show TV for hero
  const trendingTv = trending?.results.filter(item => item.mediaType === 'tv') || [];
  const heroItem = trendingTv[0];

  const formatItems = (items: MediaItem[] | undefined) => 
    items?.map(item => ({ ...item, mediaType: 'tv' as const }));

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main>
        <Hero item={heroItem} isLoading={trendingLoading} />
        
        <div className="mt-[-4rem] md:mt-[-8rem] relative z-10 flex flex-col gap-2 md:gap-6">
          <MediaRow 
            title="Popular TV Shows" 
            items={formatItems(popularTv?.results)} 
            isLoading={tvLoading} 
          />
          
          <MediaRow 
            title="Top Rated TV Shows" 
            items={formatItems(topRatedTv?.results)} 
            isLoading={topRatedLoading} 
          />
          
          <MediaRow 
            title="Trending Series" 
            items={trendingTv.slice(1)} 
            isLoading={trendingLoading} 
          />
        </div>
      </main>
    </div>
  );
}
