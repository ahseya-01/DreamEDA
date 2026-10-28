import crypto from 'crypto';
import { serviceClient } from './supabase/service';
import { siteUrl } from './utils';

export const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');
export const randomToken = () => crypto.randomBytes(32).toString('base64url');
export const makeOrderNumber = () => 'INK-' + crypto.randomBytes(5).toString('hex').toUpperCase();

export function keyMatches(key: string, hash: string) {
  const a = Buffer.from(sha256(key)), b = Buffer.from(hash || '');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Creates a short-lived download link for one purchased item. Only call for orders already verified as paid. */
export async function issueDownloadToken(orderItemId: string, hours = 24) {
  const token = randomToken();
  const { error } = await serviceClient().from('download_authorizations').insert({
    order_item_id: orderItemId, token_hash: sha256(token),
    expires_at: new Date(Date.now() + hours * 3600_000).toISOString(),
  });
  if (error) throw new Error('Could not create download link');
  return token;
}

/** Idempotent: safe to call many times (verify route + webhook) for the same payment. */
export async function markPaid(providerOrderId: string, paymentId: string, amountPaise?: number, raw?: unknown) {
  const sb = serviceClient();
  const { data: order } = await sb.from('orders').select('*, order_items(id,title_snapshot)').eq('provider_order_id', providerOrderId).maybeSingle();
  if (!order || order.is_demo) return { ok: false as const, reason: 'order_not_found' };
  if (amountPaise !== undefined && amountPaise !== Math.round(Number(order.total_inr) * 100)) return { ok: false as const, reason: 'amount_mismatch' };

  await sb.from('payments').upsert(
    { order_id: order.id, provider: 'razorpay', provider_payment_id: paymentId, provider_ref: `captured:${paymentId}`, status: 'captured', amount_inr: Number(order.total_inr), raw: raw ?? null },
    { onConflict: 'provider_ref', ignoreDuplicates: true },
  );
  // Only moves pending/failed -> paid. A refunded or already-paid order is never changed here.
  const { data: changed } = await sb.from('orders')
    .update({ status: 'paid', payment_status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', order.id).in('payment_status', ['pending', 'failed']).select('id');
  if (changed && changed.length) {
    try { await sendOrderEmail(order); } catch (e) { console.error('Order email failed', e); }
  }
  return { ok: true as const, orderNumber: order.order_number };
}

export async function markFailed(providerOrderId: string, paymentId: string, raw?: unknown) {
  const sb = serviceClient();
  const { data: order } = await sb.from('orders').select('id').eq('provider_order_id', providerOrderId).maybeSingle();
  if (!order) return;
  await sb.from('payments').upsert({ order_id: order.id, provider: 'razorpay', provider_payment_id: paymentId, provider_ref: `failed:${paymentId}`, status: 'failed', raw: raw ?? null }, { onConflict: 'provider_ref', ignoreDuplicates: true });
  await sb.from('orders').update({ status: 'failed', payment_status: 'failed' }).eq('id', order.id).eq('payment_status', 'pending');
}

export async function markRefunded(paymentId: string, refundId: string, raw?: unknown) {
  const sb = serviceClient();
  const { data: pay } = await sb.from('payments').select('order_id').eq('provider_payment_id', paymentId).eq('status', 'captured').maybeSingle();
  if (!pay) return;
  await sb.from('payments').upsert({ order_id: pay.order_id, provider: 'razorpay', provider_payment_id: paymentId, provider_ref: `refund:${refundId}`, status: 'refunded', raw: raw ?? null }, { onConflict: 'provider_ref', ignoreDuplicates: true });
  await sb.from('orders').update({ status: 'refunded', payment_status: 'refunded' }).eq('id', pay.order_id);
}

export const emailConfigured = () => !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

async function sendOrderEmail(order: { email: string; order_number: string; order_items: { id: string; title_snapshot: string }[] }) {
  if (!emailConfigured()) return;
  const lines: string[] = [];
  for (const it of order.order_items) {
    const t = await issueDownloadToken(it.id, 24);
    lines.push(`<li><strong>${escapeHtml(it.title_snapshot)}</strong>: <a href="${siteUrl()}/api/download/${t}">Download</a></li>`);
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM, to: [order.email], subject: `Your INKDIA order ${order.order_number}`,
      html: `<p>Thank you for your order <strong>${order.order_number}</strong>.</p><ul>${lines.join('')}</ul><p>These download links expire in 24 hours. If a link expires, open your order confirmation page again or contact us.</p>`,
    }),
  });
}
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
