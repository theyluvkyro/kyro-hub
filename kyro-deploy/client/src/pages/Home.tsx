import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MediaRow } from "../components/MediaRow";
import { useTrendingAll, useMoviesPopular, useTvPopular } from "../hooks/use-media";

export default function Home() {
  const { data: trending, isLoading: trendingLoading } = useTrendingAll();
  const { data: popularMovies, isLoading: moviesLoading } = useMoviesPopular();
  const { data: popularTv, isLoading: tvLoading } = useTvPopular();

  // Use the first trending item for the hero
  const heroItem = trending?.results?.[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main>
        <Hero item={heroItem} isLoading={trendingLoading} />
        
        <div className="mt-[-4rem] md:mt-[-8rem] relative z-10 flex flex-col gap-2 md:gap-6">
          <MediaRow 
            title="Trending Now" 
            items={trending?.results.slice(1)} 
            isLoading={trendingLoading} 
          />
          
          <MediaRow 
            title="Popular Movies" 
            items={popularMovies?.results} 
            isLoading={moviesLoading} 
          />
          
          <MediaRow 
            title="Binge-Worthy TV Shows" 
            items={popularTv?.results} 
            isLoading={tvLoading} 
          />
        </div>
      </main>
    </div>
  );
}
