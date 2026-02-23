import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Ensure debounce is exported for Search component
export function useDebounce<T>(value: T, delay: number): T {
  // implemented directly in Search.tsx, but good to have stub if imported elsewhere
  return value; 
}
