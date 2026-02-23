import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import type { MediaItem } from "@shared/schema";
import { getImageUrl } from "../lib/tmdb";

interface MediaCardProps {
  item: MediaItem;
  priority?: boolean;
}

export function MediaCard({ item, priority = false }: MediaCardProps) {
  const isMovie = item.mediaType === "movie" || item.title !== undefined;
  const title = item.title || (item as any).name;
  const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : 
               (item as any).first_air_date ? new Date((item as any).first_air_date).getFullYear() : "";

  return (
    <Link href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}>
      <motion.div 
        className="relative group cursor-pointer w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-none"
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="aspect-[2/3] rounded-md overflow-hidden bg-secondary relative shadow-lg">
          <img
            src={getImageUrl(item.posterPath, "w500")}
            alt={title}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
            </div>
            <h3 className="text-white font-medium text-sm md:text-base line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              {year && <span>{year}</span>}
              {item.voteAverage > 0 && (
                <span className="flex items-center text-yellow-500">
                  <Star className="w-3 h-3 mr-1" fill="currentColor" />
                  {item.voteAverage.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
