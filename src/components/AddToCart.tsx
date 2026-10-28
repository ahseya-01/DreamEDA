'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getCart, setCart } from './cart-store';

export default function AddToCart({ id, demo }: { id: string; demo?: boolean }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  if (demo) return <p className="rounded-md border border-ink/20 p-3 text-sm">This is a demo product and cannot be purchased.</p>;
  return (
    <div className="flex flex-wrap gap-3">
      <button className="btn btn-primary" onClick={() => { setCart([...getCart(), id]); router.push('/checkout'); }}>Buy now</button>
      <button className="btn btn-ghost" onClick={() => { setCart([...getCart(), id]); setAdded(true); }}>{added ? 'Added to cart' : 'Add to cart'}</button>
    </div>
  );
}
