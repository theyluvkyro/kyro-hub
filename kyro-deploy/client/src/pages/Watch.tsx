import { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Watch() {
  const params = useParams();
  const [location] = useLocation();
  
  // Extract query params for TV shows
  const searchParams = new URLSearchParams(window.location.search);
  const season = searchParams.get('s') || '1';
  const episode = searchParams.get('e') || '1';

  const type = params.type; // 'movie' or 'tv'
  const id = params.id;

  // VidKing URLs based on implementation notes
  const color = "e50914"; // Netflix red
  const getEmbedUrl = () => {
    if (type === 'movie') {
      return `https://www.vidking.net/embed/movie/${id}?color=${color}&autoPlay=true`;
    } else {
      return `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=${color}&autoPlay=true&nextEpisode=true&episodeSelector=true`;
    }
  };

  // Listen for postMessage events from the player (if we want to track progress)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check (ideally verify origin)
      if (event.data?.type === 'PLAYER_EVENT') {
        // Handle watch progress here
        // console.log('Player event:', event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!type || !id) return null;

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex flex-col">
      {/* Absolute back button overlay */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 bg-gradient-to-b from-black/80 to-transparent flex items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Link href={`/${type}/${id}`}>
          <button className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-8 h-8" />
            <span className="text-lg font-medium">Back to Details</span>
          </button>
        </Link>
      </div>

      <div className="flex-1 w-full h-full">
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full border-none"
          allowFullScreen
          allow="autoplay; fullscreen"
          title="Video Player"
        />
      </div>
    </div>
  );
}
