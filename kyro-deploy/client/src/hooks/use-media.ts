import { useQuery } from "@tanstack/react-query";
import type { MediaItem, TmdbMovie, TvShowDetails } from "@shared/schema";

// ─── TMDB Direct API Setup ─────────────────────────────────────────────────
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M2MTg2NDBlOTQ1ZTNiNDIwNGIxMzgyN2ZmZWNmMSIsIm5iZiI6MTc3MTU3MzgzNC41MDU5OTk4LCJzdWIiOiI2OTk4MTI0YTMwYThhZjIwYWRhYjkwMzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-u-Iyr8pb8JUEdzjaoP4dLDEhEVWvcwshR0qEhm3qGw";

const tmdbHeaders = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  "Content-Type": "application/json",
};

async function tmdbGet<T>(path: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE}${path}`, { headers: tmdbHeaders });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

// Map raw TMDB list items → app's MediaItem shape (camelCase)
function mapToMediaItem(raw: any): MediaItem {
  const isMovie = raw.media_type === "movie" || (raw.title && !raw.name);
  return {
    id: raw.id,
    title: raw.title || raw.name || "",
    overview: raw.overview || "",
    posterPath: raw.poster_path ?? null,
    backdropPath: raw.backdrop_path ?? null,
    releaseDate: raw.release_date || raw.first_air_date,
    voteAverage: raw.vote_average ?? 0,
    voteCount: raw.vote_count ?? 0,
    mediaType: isMovie ? "movie" : "tv",
    popularity: raw.popularity,
  };
}

function mapResultsList(data: { results: any[] }) {
  return { results: data.results.map(mapToMediaItem) };
}

// ─── TRENDING ─────────────────────────────────────────────────────────────
export function useTrendingAll() {
  return useQuery({
    queryKey: ["tmdb-trending-all"],
    queryFn: async () => mapResultsList(await tmdbGet("/trending/all/week?language=en-US")),
  });
}

// ─── MOVIES ───────────────────────────────────────────────────────────────
export function useMoviesPopular() {
  return useQuery({
    queryKey: ["tmdb-movies-popular"],
    queryFn: async () => mapResultsList(await tmdbGet("/movie/popular?language=en-US")),
  });
}

export function useMoviesTopRated() {
  return useQuery({
    queryKey: ["tmdb-movies-top-rated"],
    queryFn: async () => mapResultsList(await tmdbGet("/movie/top_rated?language=en-US")),
  });
}

export function useMovieDetails(id: number | null) {
  return useQuery({
    queryKey: ["tmdb-movie-details", id],
    queryFn: async () => {
      if (!id) return null;
      return tmdbGet<TmdbMovie>(`/movie/${id}?language=en-US`);
    },
    enabled: !!id,
  });
}

// ─── TV SHOWS ─────────────────────────────────────────────────────────────
export function useTvPopular() {
  return useQuery({
    queryKey: ["tmdb-tv-popular"],
    queryFn: async () => mapResultsList(await tmdbGet("/tv/popular?language=en-US")),
  });
}

export function useTvTopRated() {
  return useQuery({
    queryKey: ["tmdb-tv-top-rated"],
    queryFn: async () => mapResultsList(await tmdbGet("/tv/top_rated?language=en-US")),
  });
}

export function useTvDetails(id: number | null) {
  return useQuery({
    queryKey: ["tmdb-tv-details", id],
    queryFn: async () => {
      if (!id) return null;
      return tmdbGet<TvShowDetails>(`/tv/${id}?language=en-US`);
    },
    enabled: !!id,
  });
}

// ─── SEARCH ───────────────────────────────────────────────────────────────
export function useSearch(query: string) {
  return useQuery({
    queryKey: ["tmdb-search", query],
    queryFn: async () => {
      if (!query) return null;
      return mapResultsList(
        await tmdbGet(`/search/multi?query=${encodeURIComponent(query)}&language=en-US`)
      );
    },
    enabled: query.length > 2,
  });
}
