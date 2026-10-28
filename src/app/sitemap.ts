import type { MetadataRoute } from 'next';
import { listProducts } from '@/lib/data';
import { siteUrl } from '@/lib/utils';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const { items } = await listProducts({ limit: 1000 });
  return [
    { url: base }, { url: `${base}/ebooks` },
    ...['about', 'contact', 'privacy', 'terms', 'refund'].map((s) => ({ url: `${base}/p/${s}` })),
    ...items.map((p) => ({ url: `${base}/ebooks/${p.slug}`, lastModified: p.updated_at })),
  ];
}
