import { verifyHmac } from '@/lib/payments';
import { markPaid, markFailed, markRefunded } from '@/lib/orders';

// Razorpay calls this URL. Every request is signature-checked; repeats are harmless (idempotent).
export async function POST(req: Request) {
  const raw = await req.text();
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !verifyHmac(raw, req.headers.get('x-razorpay-signature') || '', secret)) return new Response('invalid signature', { status: 400 });
  let ev: any; try { ev = JSON.parse(raw); } catch { return new Response('bad json', { status: 400 }); }
  const pay = ev?.payload?.payment?.entity;
  try {
    if ((ev.event === 'payment.captured' || ev.event === 'order.paid') && pay) await markPaid(pay.order_id, pay.id, pay.amount, ev);
    else if (ev.event === 'payment.failed' && pay) await markFailed(pay.order_id, pay.id, ev);
    else if (ev.event === 'refund.processed') { const r = ev.payload?.refund?.entity; if (r) await markRefunded(r.payment_id, r.id, ev); }
  } catch (e) { console.error('webhook error', e); return new Response('error', { status: 500 }); }
  return new Response('ok');
}
