export type Color = {
  r: number,
  g: number,
  b: number
}
export function getSims(c1: Color, c2: Color, diff: number) {
  const diffs = [];
  const adiff = 1 / diff;
  let t = 1;
  while (t*adiff < 1) {
    diffs.push(t * adiff);
    t ++;
  }
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