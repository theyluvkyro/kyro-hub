import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { MediaCard } from "../components/MediaCard";
import { useSearch } from "../hooks/use-media";
import { Search as SearchIcon } from "lucide-react";
import { useDebounce } from "../lib/utils";

// Simple debounce hook for search
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 500);
  
  const { data, isLoading } = useSearch(debouncedQuery);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <Navbar />
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative mb-12 max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl text-white text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search for movies, TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {isLoading && query.length > 2 && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && data?.results && data.results.length > 0 && (
          <div>
            <h2 className="text-xl text-gray-400 mb-6">
              Results for <span className="text-white">"{debouncedQuery}"</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6">
              {data.results.map((item) => (
                <div key={item.id} className="w-full">
                   <MediaCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && debouncedQuery.length > 2 && (!data?.results || data.results.length === 0) && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-white font-display mb-2">No results found</h2>
            <p className="text-muted-foreground">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
