import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  });
}

export function getTimeLeft(targetISO: string) {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export const ENTREE_LABELS: Record<string, string> = {
  FILET_MIGNON: "Filet Mignon",
  PAN_SEARED_SALMON: "Pan-Seared Salmon",
  MUSHROOM_RISOTTO: "Wild Mushroom Risotto (V)",
  HERB_ROASTED_CHICKEN: "Herb-Roasted Chicken",
};

export const GUEST_TYPE_LABELS: Record<string, string> = {
  COLOMBIA_ONLY: "Colombia Only",
  USA_ONLY: "USA Only",
  BOTH: "Both Weddings",
  CHOOSE_ONE: "Choose One",
  BRIDAL_PARTY: "Bridal Party",
};

export const WEDDING_DATES = {
  colombia: process.env.NEXT_PUBLIC_WEDDING_COLOMBIA_DATE ?? "2026-11-07T18:00:00",
  usa: process.env.NEXT_PUBLIC_WEDDING_USA_DATE ?? "2026-12-12T18:00:00",
};
