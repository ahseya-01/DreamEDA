import { requireAdmin } from '@/lib/auth';
import { emailConfigured } from '@/lib/orders';

export default async function EmailPage() {
  await requireAdmin();
  const ok = emailConfigured();
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl">Email</h1>
      <section className="card p-5"><p className="text-sm text-ink/70">Email delivery status</p><p className="text-2xl font-semibold">{ok ? 'Configured (not yet tested by this dashboard)' : 'Not configured'}</p>
        <p className="mt-2 text-sm">{ok ? 'Order emails with download links will be sent after a verified payment.' : 'No emails are sent. Customers can still download from the Thank You page after a verified payment.'}</p></section>
      <section className="space-y-2 text-sm leading-relaxed"><h2 className="text-xl font-semibold">Setting up email later (Resend)</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Create an account at resend.com and verify a sending domain (you need a domain you own; without one you can only use Resend’s limited test sender). Free and paid plans exist; check Resend’s current pricing.</li>
          <li>Create an API key and add it to your hosting settings as <code>RESEND_API_KEY</code>.</li>
          <li>Set <code>EMAIL_FROM</code> to an address on your verified domain, for example <code>INKDIA &lt;orders@yourdomain.com&gt;</code>.</li>
          <li>Redeploy, then make a test purchase and check the email arrives.</li>
        </ol></section>
    </div>
  );
}
