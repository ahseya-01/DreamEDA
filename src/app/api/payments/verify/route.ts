import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyHmac } from '@/lib/payments';
import { markPaid } from '@/lib/orders';
import { rateLimit, clientIp } from '@/lib/ratelimit';

const schema = z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string(), orderNumber: z.string(), accessKey: z.string() });

// Called by the browser after the customer pays. Access is only granted if Razorpay's signature checks out.
export async function POST(req: Request) {
  if (!rateLimit(`verify:${clientIp(req)}`, 20, 60_000)) return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!secret || !p.success) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const d = p.data;
  if (!verifyHmac(`${d.razorpay_order_id}|${d.razorpay_payment_id}`, d.razorpay_signature, secret)) return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 });
  const r = await markPaid(d.razorpay_order_id, d.razorpay_payment_id);
  if (!r.ok) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  return NextResponse.json({ redirect: `/thank-you?order=${encodeURIComponent(d.orderNumber)}&key=${encodeURIComponent(d.accessKey)}` });
}
