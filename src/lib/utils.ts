import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Color from 'colorjs.io'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum WorkStyle {
  INDEPENDENT = 'INDEPENDENT',
  COLLABORATIVE = 'COLLABORATIVE',
}

// Helper to validate hex color format
const isValidHexFormat = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

// Determine text color (black or white) based on background color luminance
export const getTextColorByLuminance = (backgroundColor: string) => {
  if (!isValidHexFormat(backgroundColor)) {
    return '#000000'
  }

  try {
    const color = new Color(backgroundColor)
    const luminance = color.luminance

    return luminance > 0.5 ? '#000000' : '#ffffff'
  } catch {
    return '#000000'
  }
}
