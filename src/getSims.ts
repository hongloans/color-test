export type Color = [number, number, number]
export function getSims(c1: Color, c2: Color) {
  const [r1, g1, b1] = c1;
  const [r2, g2, b2] = c2;
  const diffs = [0.2, 0.4, 0.6, 0.8];
  const result: Color[] = [];

  diffs.forEach(d => {
    result.push([d * (r2 - r1) + r1, d * (g2 - g1) + g1, d * (b2 - b1) + b1])
  })

  return result
}