'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cover from '@/components/Cover';
import { getCart, setCart } from '@/components/cart-store';
import { inr } from '@/lib/utils';

type Item = { id: string; slug: string; title: string; author: string; price: number; cover_path: string | null };

export default function CartPage() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [total, setTotal] = useState(0);
  const load = async () => {
    const ids = getCart();
    if (!ids.length) { setItems([]); setTotal(0); return; }
    const r = await fetch(`/api/cart?ids=${ids.join(',')}`).then((x) => x.json()).catch(() => ({ items: [], total: 0 }));
    setItems(r.items); setTotal(r.total);
  };
  useEffect(() => { load(); }, []);
  const remove = (id: string) => { setCart(getCart().filter((x) => x !== id)); load(); };

  if (items === null) return <div className="container py-16" role="status">Loading your cart…</div>;
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-4xl">Your cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-ink/30 p-10 text-center"><p>Your cart is empty.</p><Link href="/ebooks" className="btn btn-primary mt-4">Browse ebooks</Link></div>
      ) : (
        <>
          <ul className="mt-6 divide-y divide-ink/10">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 py-4">
                <div className="w-16 shrink-0"><Cover path={i.cover_path} title={i.title} /></div>
                <div className="flex-1"><Link href={`/ebooks/${i.slug}`} className="font-semibold hover:underline">{i.title}</Link><p className="text-sm text-ink/70">{i.author}</p></div>
                <p className="font-semibold">{inr(i.price)}</p>
                <button className="text-sm underline" onClick={() => remove(i.id)} aria-label={`Remove ${i.title}`}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-xl font-semibold">Total: {inr(total)}</p>
          <div className="mt-6 text-right"><Link href="/checkout" className="btn btn-primary">Continue to checkout</Link></div>
        </>
      )}
    </div>
  );
}
