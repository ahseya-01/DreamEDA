import Link from 'next/link';
import Logo from './Logo';
import { getSettings } from '@/lib/settings';

export default async function Footer() {
  const { brand, store } = await getSettings();
  const socials = Object.entries(store.socials || {}).filter(([, v]) => v);
  return (
    <footer className="mt-20 bg-brand text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo brand={brand} dark />
          <p className="text-sm text-white/80">{brand.description}</p>
          {store.footer_text && <p className="text-sm text-white/80">{store.footer_text}</p>}
        </div>
        <nav aria-label="Legal and support" className="space-y-2 text-sm">
          <p className="font-semibold">Support</p>
          <Link className="block hover:underline" href="/p/contact">Contact us</Link>
          <Link className="block hover:underline" href="/p/privacy">Privacy Policy</Link>
          <Link className="block hover:underline" href="/p/terms">Terms and Conditions</Link>
          <Link className="block hover:underline" href="/p/refund">Digital Product Refund Policy</Link>
        </nav>
        <div className="space-y-2 text-sm">
          {store.contact_email && <p><span className="font-semibold">Email: </span><a className="underline" href={`mailto:${store.contact_email}`}>{store.contact_email}</a></p>}
          {socials.length > 0 && (
            <p className="flex flex-wrap gap-x-4">{socials.map(([k, v]) => <a key={k} href={v as string} className="capitalize underline" rel="noopener noreferrer" target="_blank">{k}</a>)}</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/70">© {new Date().getFullYear()} {brand.name}</div>
    </footer>
  );
}
