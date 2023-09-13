import { Color } from "./getSims";

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

export function luminance({r, g, b}: Color) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export function getContrastScore(rgb1: Color, rgb2: Color) {
  const lum1 = luminance({...rgb1});
  const lum2 = luminance({...rgb2});
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// note: minimal recommended contrast ratio is 4.5, or 3 for larger font-sizes