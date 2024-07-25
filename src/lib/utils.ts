import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type DateInput = string | Date;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateString = (date: DateInput): string =>
  new Intl.DateTimeFormat('en-SE', {
    timeZone: 'CET',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));