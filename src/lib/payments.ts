import crypto from 'crypto';
import { getSettings } from './settings';

export type PayMode = 'not_configured' | 'test' | 'live' | 'disabled';
export const MODE_LABEL: Record<PayMode, string> = {
  not_configured: 'Not Configured', test: 'Test Mode', live: 'Live Mode', disabled: 'Temporarily Disabled',
};

/**
 * Payments are accepted ONLY when: the admin chose Test or Live mode, ALL Razorpay secrets exist on the server,
 * the secret key type matches the mode (rzp_test_ / rzp_live_), and the server can write orders.
 */
export async function getPaymentState() {
  const s = await getSettings();
  const mode = (s.payments.mode as PayMode) || 'not_configured';
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const hasKeys = !!(keyId && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_WEBHOOK_SECRET && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const keyMatches = mode === 'test' ? keyId.startsWith('rzp_test_') : mode === 'live' ? keyId.startsWith('rzp_live_') : false;
  const accepting = (mode === 'test' || mode === 'live') && hasKeys && keyMatches;
  return { mode, hasKeys, keyMatches, accepting, keyId: accepting ? keyId : undefined };
}

export function verifyHmac(payload: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(signature || '');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function createRazorpayOrder(amountInr: number, receipt: string) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: Math.round(amountInr * 100), currency: 'INR', receipt, payment_capture: 1 }),
  });
  if (!res.ok) throw new Error(`Razorpay order failed (${res.status})`);
  return (await res.json()) as { id: string; amount: number };
}
