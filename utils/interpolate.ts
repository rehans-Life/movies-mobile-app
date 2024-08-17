export default function interpolate(min: number, max: number, perc: number) {
  return (max - min) * perc + min;
}
