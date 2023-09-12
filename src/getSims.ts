export type Color = {
  r: number,
  g: number,
  b: number
}
export function getSims(c1: Color, c2: Color) {
  const diffs = [0.2, 0.4, 0.6, 0.8];
  const result: Color[] = [];

  diffs.forEach(d => {
    result.push({
      r: Math.round(d * (c2.r - c1.r) + c1.r),
      g: Math.round(d * (c2.g - c1.g) + c1.g),
      b: Math.round(d * (c2.b - c1.b) + c1.b)
    })
  })

  return result
}