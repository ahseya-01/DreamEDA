import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import SignOut from '@/components/admin/SignOut';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

const nav = [
  ['/admin', 'Overview'], ['/admin/ebooks', 'Ebooks'], ['/admin/branding', 'Logo & Branding'], ['/admin/content', 'Website Content'],
  ['/admin/store', 'Store Settings'], ['/admin/orders', 'Orders'], ['/admin/payments', 'Payments & Payouts'], ['/admin/email', 'Email'],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[14rem_1fr]">
      <aside className="border-b border-ink/10 bg-white p-4 md:border-b-0 md:border-r">
        <p className="font-display text-xl font-semibold tracking-[0.2em]">DreamEDA</p>
        <p className="text-xs text-ink/70">Admin dashboard</p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium md:block md:space-y-2" aria-label="Admin">
          {nav.map(([h, l]) => <Link key={h} href={h} className="block hover:underline">{l}</Link>)}
          <Link href="/" className="block text-ink/70 hover:underline" target="_blank">View website</Link>
        </nav>
        <div className="mt-6 text-xs text-ink/70">{user.email}<SignOut /></div>
      </aside>
      <main className="p-4 sm:p-8">{children}</main>
    </div>
  );
}
