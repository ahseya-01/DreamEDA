'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart, setCart } from '@/components/cart-store';
import { inr } from '@/lib/utils';

declare global { interface Window { Razorpay?: any } }

export default function CheckoutClient({ accepting, mode }: { accepting: boolean; mode: string }) {
  const [items, setItems] = useState<{ id: string; title: string; price: number }[] | null>(null);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ids = getCart();
    if (!ids.length) { setItems([]); return; }
    fetch(`/api/cart?ids=${ids.join(',')}`).then((r) => r.json()).then((r) => { setItems(r.items); setTotal(r.total); }).catch(() => setItems([]));
  }, []);

  async function pay(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: items!.map((i) => i.id), email }) });
      const o = await res.json();
      if (!res.ok) throw new Error(o.error || 'Checkout failed.');
      await new Promise<void>((ok, bad) => {
        if (window.Razorpay) return ok();
        const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = () => ok(); s.onerror = () => bad(new Error('Could not load the payment window.')); document.body.appendChild(s);
      });
      const rz = new window.Razorpay({
        key: o.keyId, amount: o.amount, currency: 'INR', name: 'INKDIA', order_id: o.razorpayOrderId, prefill: { email },
        handler: async (r: any) => {
          const v = await fetch('/api/payments/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...r, orderNumber: o.orderNumber, accessKey: o.accessKey }) });
          const j = await v.json();
          if (v.ok) { setCart([]); window.location.href = j.redirect; } else { setErr(j.error || 'We could not verify your payment. If money was deducted, contact us with order ' + o.orderNumber); setBusy(false); }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.open();
    } catch (x: any) { setErr(x.message || 'Something went wrong.'); setBusy(false); }
  }

  if (items === null) return <div className="container py-16" role="status">Loading…</div>;
  if (items.length === 0) return <div className="container py-16 text-center"><p>Your cart is empty.</p><Link href="/ebooks" className="btn btn-primary mt-4">Browse ebooks</Link></div>;
  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-4xl">Checkout</h1>
      <ul className="mt-6 divide-y divide-ink/10 card px-4">
        {items.map((i) => <li key={i.id} className="flex justify-between py-3"><span>{i.title}</span><span className="font-semibold">{inr(i.price)}</span></li>)}
        <li className="flex justify-between py-3 text-lg font-semibold"><span>Total</span><span>{inr(total)}</span></li>
      </ul>
      {!accepting ? (
        <div className="mt-6 rounded-md border border-ink/20 bg-white p-5" role="alert">
          <p className="font-semibold">Checkout is not available yet.</p>
          <p className="mt-1 text-sm text-ink/80">Payments have not been switched on for this store{mode === 'disabled' ? ' (temporarily disabled)' : ''}. No order has been placed and nothing has been charged. Please check back soon.</p>
          <Link href="/cart" className="mt-4 inline-block text-sm font-semibold underline">Back to cart</Link>
        </div>
      ) : (
        <form onSubmit={pay} className="mt-6 space-y-4">
          <div><label htmlFor="email" className="label">Email address</label><input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /><p className="hint">Your ebook link is sent here. No shipping address is needed.</p></div>
          {mode === 'test' && <p className="rounded bg-accent/15 p-2 text-sm">Test mode: no real money is charged.</p>}
          {err && <p className="text-sm font-semibold text-red-700" role="alert">{err}</p>}
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Please wait…' : `Pay ${inr(total)}`}</button>
        </form>
      )}
    </div>
  );
}
