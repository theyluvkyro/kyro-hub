import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MediaRow } from "../components/MediaRow";
import { useMoviesPopular, useMoviesTopRated, useTrendingAll } from "../hooks/use-media";
import type { MediaItem } from "@shared/schema";

export default function Movies() {
  const { data: trending, isLoading: trendingLoading } = useTrendingAll();
  const { data: popularMovies, isLoading: moviesLoading } = useMoviesPopular();
  const { data: topRatedMovies, isLoading: topRatedLoading } = useMoviesTopRated();

  // Filter trending to only show movies for hero
  const trendingMovies = trending?.results.filter(item => item.mediaType === 'movie') || [];
  const heroItem = trendingMovies[0];

  // Add mediaType manually if the endpoints don't return it
  const formatItems = (items: MediaItem[] | undefined) => 
    items?.map(item => ({ ...item, mediaType: 'movie' as const }));

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main>
        <Hero item={heroItem} isLoading={trendingLoading} />
        
        <div className="mt-[-4rem] md:mt-[-8rem] relative z-10 flex flex-col gap-2 md:gap-6">
          <MediaRow 
            title="Popular Movies" 
            items={formatItems(popularMovies?.results)} 
            isLoading={moviesLoading} 
          />
          
          <MediaRow 
            title="Top Rated Movies" 
            items={formatItems(topRatedMovies?.results)} 
            isLoading={topRatedLoading} 
          />
          
          <MediaRow 
            title="Trending Movies" 
            items={trendingMovies.slice(1)} 
            isLoading={trendingLoading} 
          />
        </div>
      </main>
    </div>
  );
}
