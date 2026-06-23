/** Build a sized Unsplash URL from a verified photo id. */
export function unsplash(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/**
 * Generic warm-sand blur placeholder for next/image. Precomputed base64 (no
 * Buffer) so this module stays safe to import from client components too.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9IiNjMDhhNGQiLz48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIzIiBmaWxsPSIjN2U1NTJjIi8+PC9zdmc+";

/** Verified desert/adventure Unsplash photo ids (all return 200). */
export const PHOTOS = {
  dunesGolden: "1509316785289-025f5b846b35",
  dunesRipple: "1473580044384-7ba9967e16a0",
  dunesVast: "1547234935-80c7145ec969",
  desertDubai: "1518684079-3c830dcef090",
  desertCity: "1542401886-65d6c61db217",
  dunesShadow: "1451337516015-6b6e9a44a8a3",
  dunesAerial: "1682687220015-186f63b8850a",
  dunesWarm: "1469854523086-cc02fe5d8800",
  dunesMinimal: "1497436072909-60f360e1d4b1",
  dunesWide: "1444090542259-0af8fa96557e",
  offroad: "1532298229144-0ec0c57515c7",
  camel: "1490806843957-31f4c9a91c65",
  desertNight: "1502920917128-1aa500764cbd",
  campfire: "1536098561742-ca998e48cbcc",
  dunesSunset: "1518837695005-2083093ee35b",
  desertRoad: "1564507592333-c60657eea523",
  dunesPeople: "1454496522488-7a8e488e8606",
  desertSky: "1485470733090-0aae1788d5af",
  dunesTracks: "1504280390367-361c6d9f38f4",
} as const;
