// Simple in-memory rate limiter. It resets when the server restarts and is per server instance,
// so it is a basic safety net, not a complete defence. For heavier traffic, use a shared store.
const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(key, arr); return false; }
  arr.push(now); hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}
export const clientIp = (req: Request) =>
  (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
