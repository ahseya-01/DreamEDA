import Link from 'next/link';
import type { Metadata } from 'next';
import { serviceClient } from '@/lib/supabase/service';
import { issueDownloadToken, keyMatches } from '@/lib/orders';

export const metadata: Metadata = { title: 'Thank you', robots: { index: false } };

// Download buttons appear ONLY if the server has confirmed payment for this order AND the secret key in the link matches.
export default async function ThankYou({ searchParams }: { searchParams: { order?: string; key?: string } }) {
  const { order: num, key } = searchParams;
  let order: any = null;
  if (num && key && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data } = await serviceClient().from('orders').select('id, order_number, payment_status, is_demo, access_key_hash, order_items(id, title_snapshot)').eq('order_number', num).maybeSingle();
    if (data && keyMatches(key, data.access_key_hash)) order = data;
  }
  if (!order) return (<div className="container max-w-xl py-20 text-center"><h1 className="text-3xl">Order not found</h1><p className="mt-2 text-ink/70">This link is not valid. If you paid, check your email or contact us with your order number.</p><Link href="/" className="btn btn-primary mt-6">Back to DreamEDA</Link></div>);
  if (order.payment_status !== 'paid' || order.is_demo) return (<div className="container max-w-xl py-20 text-center"><h1 className="text-3xl">Payment not confirmed yet</h1><p className="mt-2 text-ink/70">Order {order.order_number} has not been confirmed as paid. Confirmation can take a minute. Refresh this page shortly. No download is available until payment is confirmed.</p></div>);

  const links = await Promise.all(order.order_items.map(async (i: any) => ({ title: i.title_snapshot, token: await issueDownloadToken(i.id, 24) })));
  return (
    <div className="container max-w-xl py-16">
      <h1 className="text-4xl">Thank you for your order</h1>
      <p className="mt-2">Order number: <strong>{order.order_number}</strong></p>
      <ul className="mt-6 space-y-3">
        {links.map((l) => (<li key={l.token} className="card flex items-center justify-between gap-3 p-4"><span className="font-semibold">{l.title}</span><a className="btn btn-primary" href={`/api/download/${l.token}`}>Download ebook</a></li>))}
      </ul>
      <p className="mt-4 text-sm text-ink/70">Keep this page link private. Download links last 24 hours; reopen this page to get fresh ones.</p>
    </div>
  );
}
