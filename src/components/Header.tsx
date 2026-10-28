import Logo from './Logo';
import CartLink from './CartLink';
import Link from 'next/link';
import { getSettings } from '@/lib/settings';

const links = [{ href: '/ebooks', label: 'All ebooks' }, { href: '/p/about', label: 'About' }, { href: '/p/contact', label: 'Contact' }];

export default async function Header() {
  const { brand } = await getSettings();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Logo brand={brand} />
        <nav className="ml-6 hidden gap-6 text-sm font-medium md:flex" aria-label="Main">
          {links.map((l) => <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>)}
        </nav>
        <form action="/ebooks" role="search" className="ml-auto hidden max-w-xs flex-1 sm:block">
          <input name="q" type="search" className="input" placeholder="Search ebooks" aria-label="Search ebooks" />
        </form>
        <div className="ml-auto sm:ml-0"><CartLink /></div>
        <details className="relative md:hidden">
          <summary className="btn btn-ghost cursor-pointer list-none !px-3 !py-1.5">Menu</summary>
          <div className="card absolute right-0 mt-2 w-60 space-y-3 p-4 shadow-lg">
            <form action="/ebooks" role="search"><input name="q" type="search" className="input" placeholder="Search ebooks" aria-label="Search ebooks" /></form>
            {links.map((l) => <Link key={l.href} href={l.href} className="block text-sm font-medium">{l.label}</Link>)}
          </div>
        </details>
      </div>
    </header>
  );
}
