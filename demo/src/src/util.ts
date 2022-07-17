export const getRaf = (window: {
  requestAnimationFrame?: any;
  webkitRequestAnimationFrame?: any;
  mozRequestAnimationFrame?: any;
  msRequestAnimationFrame?: any;
  oRequestAnimationFrame?: any;
}) =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame;

export const asStr = (x: number | string) =>
  typeof x === "string" ? x : x.toString();
