import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import type { MediaItem } from "@shared/schema";
import { getImageUrl } from "../lib/tmdb";

interface HeroProps {
  item: MediaItem | undefined;
  isLoading: boolean;
}

export function Hero({ item, isLoading }: HeroProps) {
  if (isLoading || !item) {
    return (
      <div className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] bg-secondary/20 animate-pulse relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }

  const isMovie = item.mediaType === "movie" || item.title !== undefined;
  const title = item.title || (item as any).name;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-[95vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(item.backdropPath || item.posterPath, "original")}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-12 lg:px-20 pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl lg:max-w-3xl"
        >
          {item.mediaType && (
            <span className="inline-block px-2 py-1 bg-primary text-white text-xs font-bold rounded mb-4 uppercase tracking-wider">
              {item.mediaType === 'tv' ? 'Series' : 'Movie'}
            </span>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-4 leading-tight text-shadow-lg">
            {title}
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl text-shadow">
            {item.overview}
          </p>

          <div className="flex items-center gap-4">
            <Link href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}>
              <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/80 transition-colors">
                <Play className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                <span className="text-lg">Play</span>
              </button>
            </Link>
            
            <Link href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}>
              <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gray-500/50 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-gray-500/70 transition-colors">
                <Info className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-lg hidden sm:inline">More Info</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
