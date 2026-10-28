import Link from 'next/link';
import type { Metadata } from 'next';
import EbookCard from '@/components/EbookCard';
import { listProducts, listCategories } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { DEMO_PRODUCTS } from '@/lib/demo';

export const metadata: Metadata = { title: 'All ebooks' };
const PAGE = 12;

export default async function Catalog({ searchParams }: { searchParams: { q?: string; category?: string; sort?: string; page?: string } }) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [{ items, total }, cats, s] = await Promise.all([
    listProducts({ q: searchParams.q, category: searchParams.category, sort: searchParams.sort, page, pageSize: PAGE }),
    listCategories(), getSettings(),
  ]);
  const demo = total === 0 && !searchParams.q && !searchParams.category && s.home.show_demo;
  const shown = demo ? DEMO_PRODUCTS : items;
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const qs = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const m = { ...searchParams, ...o } as Record<string, string | undefined>;
    for (const [k, v] of Object.entries(m)) if (v) p.set(k, v);
    return `/ebooks?${p.toString()}`;
  };
  return (
    <div className="container py-10">
      <h1 className="text-4xl">All ebooks</h1>
      {demo && <p className="mt-3 rounded-md bg-accent/15 p-3 text-sm" role="note">Demo preview: these are placeholders, not real products.</p>}
      <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_12rem_12rem_auto]" role="search">
        <input name="q" defaultValue={searchParams.q} className="input" placeholder="Search by title or author" aria-label="Search" />
        <select name="category" defaultValue={searchParams.category || ''} className="input" aria-label="Category">
          <option value="">All categories</option>
          {cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
        <select name="sort" defaultValue={searchParams.sort || 'newest'} className="input" aria-label="Sort by">
          <option value="newest">Newest</option><option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option><option value="title">Title A to Z</option>
        </select>
        <button className="btn btn-primary">Apply</button>
      </form>
      {shown.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-ink/30 p-12 text-center">
          <p className="text-lg">No ebooks found.</p>
          <Link href="/ebooks" className="mt-3 inline-block underline">Clear search and filters</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{shown.map((p) => <EbookCard key={p.id} p={p} />)}</div>
      )}
      {pages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Pagination">
          {page > 1 && <Link className="btn btn-ghost" href={qs({ page: String(page - 1) })}>Previous</Link>}
          <span className="text-sm">Page {page} of {pages}</span>
          {page < pages && <Link className="btn btn-ghost" href={qs({ page: String(page + 1) })}>Next</Link>}
        </nav>
      )}
    </div>
  );
}
