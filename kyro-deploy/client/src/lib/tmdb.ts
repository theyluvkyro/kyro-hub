// Helper functions for TMDB images
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export function getImageUrl(path: string | null | undefined, size: "w500" | "original" | "w780" = "w500") {
  if (!path) return "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&h=750&fit=crop&q=80"; // Placeholder
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}
