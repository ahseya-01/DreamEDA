export const inr = (n: number | string) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(Number(n));

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export const hasSupabase = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** URL of a file in the public "public-assets" bucket. */
export const publicUrl = (path?: string | null) =>
  path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/${path}` : '';

export const hexToRgb = (hex: string, fallback = '0 0 0') => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

export const effectivePrice = (p: { price_inr: number | string; discount_price_inr?: number | string | null }) =>
  p.discount_price_inr != null && Number(p.discount_price_inr) < Number(p.price_inr)
    ? Number(p.discount_price_inr)
    : Number(p.price_inr);

export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
