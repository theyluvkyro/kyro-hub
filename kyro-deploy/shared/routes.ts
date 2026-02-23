import { z } from 'zod';
import {
  mediaItemSchema,
  searchQuerySchema,
  searchResponseSchema,
  trendingResponseSchema,
  tmdbMovieSchema,
  tvShowDetailsSchema,
  tvEpisodeSchema,
  mediaTypeSchema,
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  search: {
    multi: {
      method: 'GET' as const,
      path: '/api/search' as const,
      input: searchQuerySchema,
      responses: {
        200: searchResponseSchema,
        400: errorSchemas.validation,
      },
    },
  },
  trending: {
    all: {
      method: 'GET' as const,
      path: '/api/trending' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
  },
  movies: {
    trending: {
      method: 'GET' as const,
      path: '/api/movies/trending' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    popular: {
      method: 'GET' as const,
      path: '/api/movies/popular' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    topRated: {
      method: 'GET' as const,
      path: '/api/movies/top-rated' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    details: {
      method: 'GET' as const,
      path: '/api/movies/:id' as const,
      responses: {
        200: tmdbMovieSchema,
        404: errorSchemas.notFound,
      },
    },
  },
  tv: {
    trending: {
      method: 'GET' as const,
      path: '/api/tv/trending' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    popular: {
      method: 'GET' as const,
      path: '/api/tv/popular' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    topRated: {
      method: 'GET' as const,
      path: '/api/tv/top-rated' as const,
      responses: {
        200: trendingResponseSchema,
      },
    },
    details: {
      method: 'GET' as const,
      path: '/api/tv/:id' as const,
      responses: {
        200: tvShowDetailsSchema,
        404: errorSchemas.notFound,
      },
    },
    season: {
      method: 'GET' as const,
      path: '/api/tv/:id/season/:seasonNumber' as const,
      responses: {
        200: z.object({
          episodes: z.array(tvEpisodeSchema),
        }),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// Type exports
export type SearchInput = z.infer<typeof searchQuerySchema>;
export type SearchResult = z.infer<typeof searchResponseSchema>;
export type TrendingResult = z.infer<typeof trendingResponseSchema>;
export type MovieDetails = z.infer<typeof tmdbMovieSchema>;
export type TvDetails = z.infer<typeof tvShowDetailsSchema>;
export type EpisodeList = z.infer<typeof api.tv.season.responses[200]>;
