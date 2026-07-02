export const TTL_SECONDS = 1800; // 30 min

export function getFreshness(publishedAt, now = Date.now(), ttl = TTL_SECONDS) {
  const elapsedS = Math.max(0, Math.floor((now - publishedAt) / 1000));
  const remainingS = Math.max(0, ttl - elapsedS);
  let state = "fresco";
  let color = "var(--fresh)";
  if (remainingS < 480) {
    state = "ultimo";
    color = "#FF7A45";
  } else if (remainingS <= 1080) {
    state = "tibio";
    color = "var(--accent)";
  }
  return { state, color, elapsedS, remainingS, expired: remainingS <= 0 };
}

export function formatElapsed(elapsedS) {
  if (elapsedS < 60) return "recién";
  const m = Math.floor(elapsedS / 60);
  return `${m} min`;
}

export function formatCountdown(remainingS) {
  const m = Math.floor(remainingS / 60);
  const s = remainingS % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters / 10) * 10} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function walkMinutes(meters) {
  // ~80 m/min caminando
  return Math.max(1, Math.round(meters / 80));
}
