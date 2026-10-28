'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart } from './cart-store';

export default function CartLink() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const u = () => setN(getCart().length);
    u(); window.addEventListener('cart-changed', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('cart-changed', u); window.removeEventListener('storage', u); };
  }, []);
  return <Link href="/cart" className="btn btn-ghost !px-3 !py-1.5">Cart{n > 0 ? ` (${n})` : ''}</Link>;
}
