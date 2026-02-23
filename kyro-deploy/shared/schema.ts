import { z } from "zod";

// TMDB Media Types
export const mediaTypeSchema = z.enum(["movie", "tv"]);
export type MediaType = z.infer<typeof mediaTypeSchema>;

// TMDB Movie Response
export const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string().optional(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()).optional(),
  adult: z.boolean().optional(),
  popularity: z.number().optional(),
});

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>;

// TMDB TV Show Response
export const tmdbTvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  original_name: z.string().optional(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  first_air_date: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()).optional(),
  popularity: z.number().optional(),
});

export type TmdbTvShow = z.infer<typeof tmdbTvShowSchema>;

// Unified Media Item (can be movie or TV show)
export const mediaItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  posterPath: z.string().nullable(),
  backdropPath: z.string().nullable(),
  releaseDate: z.string().optional(),
  voteAverage: z.number(),
  voteCount: z.number(),
  mediaType: mediaTypeSchema,
  popularity: z.number().optional(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;

// TV Show Details with Seasons
export const tvSeasonSchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  overview: z.string().nullable(),
  poster_path: z.string().nullable(),
  air_date: z.string().nullable(),
});

export const tvShowDetailsSchema = tmdbTvShowSchema.extend({
  seasons: z.array(tvSeasonSchema).optional(),
  number_of_seasons: z.number().optional(),
  number_of_episodes: z.number().optional(),
  episode_run_time: z.array(z.number()).optional(),
});

export type TvShowDetails = z.infer<typeof tvShowDetailsSchema>;

// TV Episode
export const tvEpisodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable(),
  episode_number: z.number(),
  season_number: z.number(),
  still_path: z.string().nullable(),
  air_date: z.string().nullable(),
  vote_average: z.number().optional(),
});

export type TvEpisode = z.infer<typeof tvEpisodeSchema>;

// Watch Progress (stored in localStorage)
export const watchProgressSchema = z.object({
  id: z.string(), // tmdbId
  mediaType: mediaTypeSchema,
  progress: z.number(), // percentage
  timestamp: z.number(), // current time in seconds
  duration: z.number(), // total duration in seconds
  season: z.number().optional(),
  episode: z.number().optional(),
  lastWatched: z.number(), // unix timestamp
});

export type WatchProgress = z.infer<typeof watchProgressSchema>;

// Player Event from VidKing
export const playerEventSchema = z.object({
  type: z.literal("PLAYER_EVENT"),
  data: z.object({
    event: z.enum(["timeupdate", "play", "pause", "ended", "seeked"]),
    currentTime: z.number(),
    duration: z.number(),
    progress: z.number(),
    id: z.string(),
    mediaType: z.enum(["movie", "tv"]),
    season: z.number().optional(),
    episode: z.number().optional(),
    timestamp: z.number(),
  }),
});

export type PlayerEvent = z.infer<typeof playerEventSchema>;

// Search Query
export const searchQuerySchema = z.object({
  query: z.string().min(1),
  page: z.number().optional().default(1),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// API Responses
export const searchResponseSchema = z.object({
  results: z.array(mediaItemSchema),
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type SearchResponse = z.infer<typeof searchResponseSchema>;

export const trendingResponseSchema = z.object({
  results: z.array(mediaItemSchema),
});

export type TrendingResponse = z.infer<typeof trendingResponseSchema>;
