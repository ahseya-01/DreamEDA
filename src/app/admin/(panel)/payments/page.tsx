import { requireAdmin } from '@/lib/auth';
import { getPaymentState, MODE_LABEL } from '@/lib/payments';
import { savePaymentMode } from '@/app/admin/actions';
import { Notice } from '@/components/admin/Field';
import { SubmitButton } from '@/components/admin/ui';
import { siteUrl } from '@/lib/utils';

export default async function Payments({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  await requireAdmin();
  const p = await getPaymentState();
  return (
    <div className="max-w-3xl space-y-8">
      <div><h1 className="text-3xl">Payments & Payouts</h1><div className="mt-4"><Notice searchParams={searchParams} /></div></div>
      <section className="card p-5">
        <p className="text-sm text-ink/70">Payment status</p>
        <p className="text-2xl font-semibold">{p.accepting ? MODE_LABEL[p.mode] : p.mode === 'disabled' ? 'Temporarily Disabled' : 'Not Configured'}</p>
        <p className="mt-2 text-sm">{p.accepting ? 'Checkout is switched on.' : 'Checkout is OFF. Visitors can browse, but nobody can buy, and no downloads are granted.'}</p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>Mode chosen below: {MODE_LABEL[p.mode]}</li>
          <li>Server has payment keys and webhook secret: {p.hasKeys ? 'Yes' : 'No'}</li>
          <li>Key type matches the mode: {p.keyMatches ? 'Yes' : 'No'}</li>
        </ul>
      </section>
      <form action={savePaymentMode} className="card space-y-3 p-5"><h2 className="text-xl font-semibold">Payment mode</h2>
        <select name="mode" defaultValue={p.mode} className="input" aria-label="Payment mode">
          <option value="not_configured">Not Configured</option><option value="test">Test Mode (no real money)</option>
          <option value="live">Live Mode (real money)</option><option value="disabled">Temporarily Disabled</option>
        </select>
        <p className="hint">Choosing Test or Live does nothing until the setup steps below are finished. The website only accepts payments when everything is in place. Do not choose Live until you have tested in Test Mode.</p>
        <SubmitButton>Save mode</SubmitButton>
      </form>
      <section className="space-y-3 text-sm leading-relaxed"><h2 className="text-xl font-semibold">Setting up payments later (Razorpay)</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Create a Razorpay account and complete its business verification (KYC) and bank-account linking <em>inside Razorpay’s own website</em>. Razorpay decides eligibility and approval. Timelines and fees are theirs, so check their current terms.</li>
          <li>In Razorpay’s dashboard, use Test Mode first and create test API keys. Add them to your hosting settings as <code>RAZORPAY_KEY_ID</code> and <code>RAZORPAY_KEY_SECRET</code>.</li>
          <li>In Razorpay, add a webhook pointing to <code>{siteUrl()}/api/webhooks/razorpay</code> with events payment.captured, order.paid, payment.failed and refund.processed. Copy its secret into <code>RAZORPAY_WEBHOOK_SECRET</code>.</li>
          <li>Redeploy, come back here, choose Test Mode, and make a test purchase end to end.</li>
          <li>Only when that works, switch to live keys (start with <code>rzp_live_</code>), update the three settings, redeploy, and choose Live Mode.</li>
        </ol>
      </section>
      <section className="card space-y-2 p-5 text-sm"><h2 className="text-xl font-semibold">Bank and payout setup</h2>
        <p><strong>Not completed.</strong> Your bank account is linked to the payment provider, not to this website. Complete it in Razorpay’s own onboarding. It will ask for business and bank details. You never enter them here.</p>
        <p>Never share bank passwords, card PINs or OTPs with anyone, including this website. DreamEDA never asks for them and does not store financial account details.</p>
      </section>
    </div>
  );
}
