import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { getPaymentState, MODE_LABEL } from '@/lib/payments';

export default async function Overview() {
  const { sb } = await requireAdmin();
  const count = async (q: any) => (await q).count ?? 0;
  const [total, pub, draft, orders, paid] = await Promise.all([
    count(sb.from('products').select('*', { count: 'exact', head: true })),
    count(sb.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published')),
    count(sb.from('products').select('*', { count: 'exact', head: true }).eq('status', 'draft')),
    count(sb.from('orders').select('*', { count: 'exact', head: true })),
    count(sb.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'paid')),
  ]);
  const pay = await getPaymentState();
  const { data: sales } = pay.accepting ? await sb.from('orders').select('total_inr').eq('payment_status', 'paid') : { data: [] as any[] };
  const stats: [string, number | string][] = [['Total ebooks', total], ['Published', pub], ['Drafts', draft], ['Total orders', orders], ['Successful payments', paid]];
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl">Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map(([k, v]) => <div key={k} className="card p-4"><p className="text-sm text-ink/70">{k}</p><p className="text-3xl font-semibold">{v}</p></div>)}
      </div>
      <div className="card mt-6 p-4">
        <p className="font-semibold">Payments: {MODE_LABEL[pay.mode] ?? pay.mode}{pay.mode !== 'not_configured' && !pay.accepting ? ' (selected, but setup incomplete, so payments are still off)' : ''}</p>
        {pay.accepting
          ? <p className="mt-1 text-sm">Sales so far: ₹{(sales ?? []).reduce((a: number, o: any) => a + Number(o.total_inr), 0).toLocaleString('en-IN')} from {paid} paid order(s).</p>
          : <p className="mt-1 text-sm text-ink/80">No sales figures are shown until payments are configured. <Link className="underline" href="/admin/payments">Payment setup</Link></p>}
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><Link className="btn btn-primary" href="/admin/ebooks/new">Add new ebook</Link><Link className="btn btn-ghost" href="/admin/branding">Logo & Branding</Link></div>
    </div>
  );
}
