import { NextResponse } from 'next/server';
import { hasSupabase, effectivePrice } from '@/lib/utils';
import { publicClient } from '@/lib/supabase/public';

// Prices always come from the database, never from the browser.
export async function GET(req: Request) {
  const ids = (new URL(req.url).searchParams.get('ids') || '').split(',').filter((x) => /^[0-9a-f-]{36}$/i.test(x)).slice(0, 20);
  if (!ids.length || !hasSupabase()) return NextResponse.json({ items: [], total: 0 });
  const { data } = await publicClient().from('products').select('id,slug,title,author,price_inr,discount_price_inr,cover_path').in('id', ids).eq('status', 'published');
  const items = (data ?? []).map((p) => ({ ...p, price: effectivePrice(p) }));
  return NextResponse.json({ items, total: items.reduce((a, b) => a + b.price, 0) });
}
