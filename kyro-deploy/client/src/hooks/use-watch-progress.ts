import { useState, useEffect } from "react";
import type { WatchProgress } from "@shared/schema";

const PROGRESS_KEY = "vidking_progress";

export function useWatchProgress() {
  const [progressData, setProgressData] = useState<Record<string, WatchProgress>>({});

  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        setProgressData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse progress data", e);
      }
    }
  }, []);

  const saveProgress = (progress: WatchProgress) => {
    setProgressData((prev) => {
      const updated = { ...prev, [progress.id]: progress };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getProgress = (id: string) => progressData[id];

  return { progressData, saveProgress, getProgress };
}
