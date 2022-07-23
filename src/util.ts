export const asStr = (x: number | string) =>
  typeof x === "string" ? x : x.toString();

export const limit = (x: number, min: number, max: number) => {
  if (x < min) return min;
  if (x > max) return max;
  return Math.floor(x);
};

export const round = (x: number, f: number = 1000) => Math.floor(x * f) / f;
