import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPaymentState, createRazorpayOrder } from '@/lib/payments';
import { serviceClient } from '@/lib/supabase/service';
import { effectivePrice } from '@/lib/utils';
import { makeOrderNumber, randomToken, sha256 } from '@/lib/orders';
import { rateLimit, clientIp } from '@/lib/ratelimit';

const schema = z.object({ ids: z.array(z.string().uuid()).min(1).max(20), email: z.string().email().max(200) });

export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 10, 60_000)) return NextResponse.json({ error: 'Too many attempts. Please wait a minute.' }, { status: 429 });
  const pay = await getPaymentState();
  if (!pay.accepting) return NextResponse.json({ error: 'Checkout is not available yet.' }, { status: 503 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  const ids = [...new Set(parsed.data.ids)];

  const sb = serviceClient();
  const { data: products } = await sb.from('products').select('id,title,price_inr,discount_price_inr,pdf_path').in('id', ids).eq('status', 'published');
  if (!products || products.length !== ids.length) return NextResponse.json({ error: 'One or more ebooks are no longer available.' }, { status: 400 });
  if (products.some((p) => !p.pdf_path)) return NextResponse.json({ error: 'An ebook in your cart is not ready for sale.' }, { status: 400 });

  const total = products.reduce((a, p) => a + effectivePrice(p), 0);   // server-side price, never from the browser
  if (total < 1) return NextResponse.json({ error: 'Free ebooks are not supported yet.' }, { status: 400 });

  const accessKey = randomToken();
  const orderNumber = makeOrderNumber();
  const { data: order, error } = await sb.from('orders').insert({
    order_number: orderNumber, email: parsed.data.email.toLowerCase(), total_inr: total, provider: 'razorpay', access_key_hash: sha256(accessKey),
  }).select('id').single();
  if (error || !order) return NextResponse.json({ error: 'Could not create your order. Please try again.' }, { status: 500 });
  await sb.from('order_items').insert(products.map((p) => ({ order_id: order.id, product_id: p.id, title_snapshot: p.title, price_inr: effectivePrice(p) })));

  try {
    const rp = await createRazorpayOrder(total, orderNumber);
    await sb.from('orders').update({ provider_order_id: rp.id }).eq('id', order.id);
    return NextResponse.json({ orderNumber, accessKey, razorpayOrderId: rp.id, amount: rp.amount, keyId: pay.keyId });
  } catch {
    await sb.from('orders').update({ status: 'failed', payment_status: 'failed' }).eq('id', order.id);
    return NextResponse.json({ error: 'The payment service is not reachable right now. Please try again later.' }, { status: 502 });
  }
}
