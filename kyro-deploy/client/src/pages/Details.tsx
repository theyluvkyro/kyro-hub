import { useParams, Link } from "wouter";
import { Navbar } from "../components/Navbar";
import { useMovieDetails, useTvDetails } from "../hooks/use-media";
import { getImageUrl } from "../lib/tmdb";
import { Play, Plus, ThumbsUp, Calendar, Clock, Star } from "lucide-react";
import { format } from "date-fns";

export default function Details({ type }: { type: 'movie' | 'tv' }) {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : null;

  const movieQuery = useMovieDetails(type === 'movie' ? id : null);
  const tvQuery = useTvDetails(type === 'tv' ? id : null);

  const isLoading = type === 'movie' ? movieQuery.isLoading : tvQuery.isLoading;
  const data = type === 'movie' ? movieQuery.data : tvQuery.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="w-full h-[70vh] bg-secondary/20 animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <h1 className="text-2xl text-white">Not found</h1>
      </div>
    );
  }

  const title = (data as any).title || (data as any).name;
  const releaseDate = (data as any).release_date || (data as any).first_air_date;
  const formattedDate = releaseDate ? format(new Date(releaseDate), "yyyy") : "";

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <div className="relative w-full h-[60vh] md:h-[80vh]">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(data.backdrop_path || data.poster_path, "original")}
            alt={title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 hero-vignette" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1920px] mx-auto w-full px-4 md:px-12 lg:px-20 pb-12 md:pb-24">
            <div className="max-w-3xl flex flex-col md:flex-row gap-8 items-end md:items-center">
              
              {/* Mobile hidden poster, visible on desktop */}
              <div className="hidden md:block w-48 lg:w-64 flex-none shadow-2xl rounded-lg overflow-hidden">
                 <img
                  src={getImageUrl(data.poster_path, "w500")}
                  alt={title}
                  className="w-full h-auto"
                />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 text-shadow-lg">
                  {title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                  {formattedDate && (
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {formattedDate}</span>
                  )}
                  <span className="flex items-center gap-1 text-yellow-500 font-medium">
                    <Star className="w-4 h-4" fill="currentColor"/> {data.vote_average.toFixed(1)}
                  </span>
                  {type === 'tv' && (data as any).number_of_seasons && (
                    <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">
                      {(data as any).number_of_seasons} Seasons
                    </span>
                  )}
                </div>

                <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl text-shadow">
                  {data.overview}
                </p>

                <div className="flex items-center gap-4">
                  <Link href={`/watch/${type}/${id}`}>
                    <button className="flex items-center gap-2 px-8 py-3 md:py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                      <Play className="w-6 h-6" fill="currentColor" />
                      <span className="text-lg">Play</span>
                    </button>
                  </Link>
                  <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TV Seasons Section */}
      {type === 'tv' && (data as any).seasons && (data as any).seasons.length > 0 && (
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 lg:px-20 mt-12">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-6">Seasons</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {(data as any).seasons.filter((s:any) => s.season_number > 0).map((season: any) => (
              <Link key={season.id} href={`/watch/tv/${id}?s=${season.season_number}&e=1`}>
                <div className="bg-secondary rounded-lg overflow-hidden cursor-pointer group hover:ring-2 ring-primary transition-all">
                  <img 
                    src={getImageUrl(season.poster_path, "w500")} 
                    alt={season.name}
                    className="w-full aspect-[2/3] object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-medium">{season.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{season.episode_count} Episodes</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
