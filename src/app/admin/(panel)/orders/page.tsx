import { requireAdmin } from '@/lib/auth';
import { inr } from '@/lib/utils';

export default async function Orders() {
  const { sb } = await requireAdmin();
  const { data } = await sb.from('orders').select('id, order_number, email, status, payment_status, total_inr, created_at, order_items(title_snapshot)').order('created_at', { ascending: false }).limit(200);
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl">Orders</h1>
      {!data?.length ? <div className="card mt-6 p-10 text-center">No orders yet. Orders appear here once payments are configured and customers buy.</div> : (
        <div className="mt-6 overflow-x-auto"><table className="card w-full text-left text-sm">
          <thead className="border-b border-ink/10"><tr>{['Order', 'Date', 'Ebook(s)', 'Email', 'Total', 'Order status', 'Payment'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{data.map((o: any) => (
            <tr key={o.id} className="border-b border-ink/5"><td className="p-3 font-mono">{o.order_number}</td><td className="p-3">{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
              <td className="p-3">{o.order_items?.map((i: any) => i.title_snapshot).join(', ')}</td><td className="p-3">{o.email}</td><td className="p-3">{inr(o.total_inr)}</td>
              <td className="p-3 capitalize">{o.status}</td><td className="p-3 capitalize">{o.payment_status}</td></tr>))}</tbody>
        </table></div>)}
    </div>
  );
}
