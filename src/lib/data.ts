import { hasSupabase } from './utils';
import { publicClient } from './supabase/public';
import type { Product } from './types';

export type ListOpts = { q?: string; category?: string; sort?: string; page?: number; pageSize?: number; featured?: boolean; bestseller?: boolean; limit?: number };

export async function listProducts(o: ListOpts = {}): Promise<{ items: Product[]; total: number }> {
  if (!hasSupabase()) return { items: [], total: 0 };
  try {
    const sb = publicClient();
    let q = sb.from('products').select('*, categories(name,slug)', { count: 'exact' }).eq('status', 'published');
    if (o.q) {
      const t = o.q.replace(/[%,()*]/g, ' ').trim().slice(0, 60);
      if (t) q = q.or(`title.ilike.%${t}%,author.ilike.%${t}%,short_description.ilike.%${t}%`);
    }
    if (o.category) {
      const { data: c } = await sb.from('categories').select('id').eq('slug', o.category).maybeSingle();
      if (!c) return { items: [], total: 0 };
      q = q.eq('category_id', c.id);
    }
    if (o.featured) q = q.eq('is_featured', true);
    if (o.bestseller) q = q.eq('is_bestseller', true);
    if (o.sort === 'price_asc') q = q.order('price_inr', { ascending: true });
    else if (o.sort === 'price_desc') q = q.order('price_inr', { ascending: false });
    else if (o.sort === 'title') q = q.order('title', { ascending: true });
    else q = q.order('created_at', { ascending: false });
    const size = o.limit ?? o.pageSize ?? 12;
    const from = o.limit ? 0 : ((o.page ?? 1) - 1) * size;
    const { data, count } = await q.range(from, from + size - 1);
    return { items: (data ?? []) as Product[], total: count ?? 0 };
  } catch { return { items: [], total: 0 }; }
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!hasSupabase()) return null;
  try {
    const { data } = await publicClient().from('products').select('*, categories(name,slug)').eq('slug', slug).eq('status', 'published').maybeSingle();
    return (data as Product) ?? null;
  } catch { return null; }
}

export async function listCategories() {
  if (!hasSupabase()) return [] as { id: string; name: string; slug: string }[];
  try {
    const { data } = await publicClient().from('categories').select('id,name,slug').order('sort_order').order('name');
    return data ?? [];
  } catch { return []; }
}

export async function getPage(slug: string) {
  if (!hasSupabase()) return null;
  try {
    const { data } = await publicClient().from('pages').select('*').eq('slug', slug).maybeSingle();
    return data as { slug: string; title: string; content: string; is_draft_template: boolean } | null;
  } catch { return null; }
}
