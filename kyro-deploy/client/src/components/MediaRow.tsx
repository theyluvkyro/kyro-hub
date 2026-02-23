import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaCard } from "./MediaCard";
import type { MediaItem } from "@shared/schema";

interface MediaRowProps {
  title: string;
  items: MediaItem[] | undefined;
  isLoading: boolean;
}

export function MediaRow({ title, items, isLoading }: MediaRowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <div className="py-6 px-4 md:px-8 lg:px-12">
        <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-white">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3] bg-secondary/50 rounded-md animate-pulse flex-none" />
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="py-6 relative group/row">
      <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 px-4 md:px-8 lg:px-12 text-white">
        {title}
      </h2>
      
      <div className="relative px-4 md:px-8 lg:px-12">
        {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
        <button
          className={`absolute left-0 top-0 bottom-0 w-12 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 disabled:opacity-0 ${!prevBtnEnabled && 'hidden'}`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4">
            {items.map((item, index) => (
              <MediaCard key={`${item.id}-${index}`} item={item} priority={index < 4} />
            ))}
          </div>
        </div>

        <button
          className={`absolute right-0 top-0 bottom-0 w-12 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 disabled:opacity-0 ${!nextBtnEnabled && 'hidden'}`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
