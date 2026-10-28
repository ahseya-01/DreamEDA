import Link from 'next/link';
import EbookCard from '@/components/EbookCard';
import { getSettings } from '@/lib/settings';
import { listProducts, listCategories } from '@/lib/data';
import { DEMO_PRODUCTS } from '@/lib/demo';
import { publicUrl } from '@/lib/utils';
import type { Product } from '@/lib/types';

function Grid({ title, items, href }: { title: string; items: Product[]; href?: string }) {
  if (!items.length) return null;
  return (
    <section className="container mt-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl">{title}</h2>
        {href && <Link href={href} className="text-sm font-semibold underline">View all</Link>}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{items.map((p) => <EbookCard key={p.id} p={p} />)}</div>
    </section>
  );
}

export default async function Home() {
  const s = await getSettings();
  const [all, featured, recent, best, cats] = await Promise.all([
    listProducts({ limit: 8 }), listProducts({ featured: true, limit: 4 }), listProducts({ limit: 4 }),
    listProducts({ bestseller: true, limit: 4 }), listCategories(),
  ]);
  const noReal = all.total === 0;
  const demo = noReal && s.home.show_demo;
  const h = s.home;

  const sections: Record<string, React.ReactNode> = {
    hero: (
      <section key="hero" className="bg-brand text-white">
        <div className="container grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
          <div className="hero-rise">
            <h1 className="text-4xl leading-tight sm:text-5xl">{h.hero_title}</h1>
            <p className="mt-4 max-w-lg text-lg text-white/85">Learn Smarter Live Better</p>
            <Link href="/ebooks" className="btn btn-accent mt-8">Browse ebooks</Link>
          </div>
          {s.brand.banner ? (
            <img src={publicUrl(s.brand.banner)} alt="" className="w-full rounded-lg object-cover" />
          ) : (
            <div className="hidden rounded-lg border border-white/20 p-8 text-white/80 md:block" aria-hidden="true">
              <p className="font-display text-2xl">{s.brand.tagline}</p>
              <p className="mt-2 text-sm">Banner image placeholder. Upload yours in Admin &gt; Logo &amp; Branding.</p>
            </div>
          )}
        </div>
      </section>
    ),
    categories: cats.length > 0 && (
      <section key="categories" className="container mt-12" aria-label="Categories">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => <Link key={c.id} href={`/ebooks?category=${c.slug}`} className="btn btn-ghost !py-1.5">{c.name}</Link>)}
        </div>
      </section>
    ),
    featured: <Grid key="featured" title="Featured ebooks" items={demo ? DEMO_PRODUCTS : featured.items} href="/ebooks" />,
    bestsellers: <Grid key="bestsellers" title="Bestsellers" items={best.items} href="/ebooks" />,
    all: (!demo && all.items.length > 0) ? <Grid key="all" title="All ebooks" items={all.items} href="/ebooks" /> : null,
    recent: (!demo && recent.items.length > 0) ? <Grid key="recent" title="Recently added" items={recent.items} href="/ebooks?sort=newest" /> : null,
    promo: (
      <section key="promo" className="container mt-16">
        <div className="rounded-lg bg-accent px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl">{h.promo_title}</h2>
          <p className="mt-2 max-w-xl">{h.promo_text}</p>
          <Link href="/ebooks" className="btn mt-5 bg-white text-ink hover:bg-white/90">See the catalog</Link>
        </div>
      </section>
    ),
    about: (
      <section key="about" className="container mt-16 max-w-3xl">
        <h2 className="text-3xl">About {s.brand.name}</h2>
        <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-ink/85">{h.about_text}</p>
        <Link href="/p/about" className="mt-3 inline-block text-sm font-semibold underline">Read more</Link>
      </section>
    ),
    contact: (
      <section key="contact" className="container mt-16 max-w-3xl">
        <h2 className="text-3xl">Contact</h2>
        <p className="mt-3 text-lg">{h.contact_text}</p>
        {s.store.contact_email
          ? <a className="btn btn-primary mt-4" href={`mailto:${s.store.contact_email}`}>{s.store.contact_email}</a>
          : <Link className="btn btn-ghost mt-4" href="/p/contact">Contact details</Link>}
      </section>
    ),
  };

  return (
    <>
      {demo && <div className="bg-accent/15 py-2 text-center text-sm" role="note">Demo preview: the ebooks below are placeholders, not real products. Publish your first ebook in the admin dashboard and they disappear.</div>}
      {h.sections.filter((x: any) => x.enabled).map((x: any) => sections[x.id])}
      {noReal && !demo && (
        <section className="container mt-16 rounded-lg border border-dashed border-ink/30 p-12 text-center">
          <h2 className="text-2xl">Our first ebooks are on the way</h2>
          <p className="mt-2 text-ink/70">Please check back soon.</p>
        </section>
      )}
    </>
  );
}
