import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';
import { getPaymentState } from '@/lib/payments';

export const metadata: Metadata = { title: 'Checkout', robots: { index: false } };

export default async function Checkout() {
  const pay = await getPaymentState();
  return <CheckoutClient accepting={pay.accepting} mode={pay.mode} />;
}
