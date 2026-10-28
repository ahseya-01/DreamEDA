import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Cover from '@/components/Cover';
import EbookCard from '@/components/EbookCard';
import AddToCart from '@/components/AddToCart';
import { getProduct, listProducts } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import { getPaymentState } from '@/lib/payments';
import { DEMO_PRODUCTS } from '@/lib/demo';
import { inr, publicUrl } from '@/lib/utils';
import type { Product } from '@/lib/types';

async function load(slug: string): Promise<Product | null> {
  const real = await getProduct(slug);
  if (real) return real;
  const s = await getSettings();
  return s.home.show_demo ? DEMO_PRODUCTS.find((d) => d.slug === slug) ?? null : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await load(params.slug);
  if (!p) return { title: 'Ebook not found' };
  const img = p.cover_path ? [publicUrl(p.cover_path)] : undefined;
  return {
    title: p.title, description: p.short_description || undefined,
    openGraph: { title: p.title, description: p.short_description || undefined, images: img, type: 'website' },
    robots: p.is_demo ? { index: false } : undefined,
  };
}

const Block = ({ title, text }: { title: string; text?: string }) =>
  text ? (<section className="mt-8"><h2 className="text-2xl">{title}</h2><p className="mt-2 whitespace-pre-line leading-relaxed text-ink/85">{text}</p></section>) : null;

export default async function EbookPage({ params }: { params: { slug: string } }) {
  const p = await load(params.slug);
  if (!p) notFound();
  const pay = await getPaymentState();
  const sale = p.discount_price_inr != null && Number(p.discount_price_inr) < Number(p.price_inr);
  const related = p.is_demo ? [] : (await listProducts({ category: p.categories?.slug, limit: 5 })).items.filter((x) => x.id !== p.id).slice(0, 4);
  const facts: [string, string | number | null][] = [['Language', p.language], ['Pages', p.page_count], ['Format', p.file_format]];

  return (
    <div className="container py-10">
      {p.is_demo && <p className="mb-6 rounded-md bg-accent/15 p-3 text-sm" role="note">Demo product: not a real ebook and not for sale.</p>}
      <div className="grid gap-10 md:grid-cols-[18rem_1fr]">
        <div className="mx-auto w-56 md:w-full"><Cover path={p.cover_path} title={p.title} author={p.author} /></div>
        <div>
          {p.categories && <p className="text-sm text-ink/70">{p.categories.name}</p>}
          <h1 className="text-4xl leading-tight">{p.title}</h1>
          {p.author && <p className="mt-1 text-lg text-ink/80">by {p.author}</p>}
          <p className="mt-4 text-3xl font-semibold">
            {sale ? (<>{inr(p.discount_price_inr!)} <span className="text-lg font-normal text-ink/60 line-through">{inr(p.price_inr)}</span></>) : inr(p.price_inr)}
          </p>
          {p.short_description && <p className="mt-4 max-w-xl text-lg">{p.short_description}</p>}
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {facts.filter(([, v]) => v).map(([k, v]) => (<div key={k}><dt className="text-ink/70">{k}</dt><dd className="font-semibold">{v}</dd></div>))}
          </dl>
          <div className="mt-6"><AddToCart id={p.id} demo={p.is_demo} /></div>
          {!p.is_demo && !pay.accepting && <p className="mt-3 text-sm text-ink/80" role="note">Checkout is not available yet. You can browse and add ebooks to your cart.</p>}
          {p.sample_pdf_path && <a className="mt-4 inline-block text-sm font-semibold underline" href={publicUrl(p.sample_pdf_path)} target="_blank" rel="noopener noreferrer">Read a free sample (PDF)</a>}
        </div>
      </div>

      {p.preview_paths?.length > 0 && (
        <section className="mt-12" aria-label="Preview pages">
          <h2 className="text-2xl">Look inside</h2>
          <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-3">
            {p.preview_paths.map((path, i) => (
              <a key={path} href={publicUrl(path)} target="_blank" rel="noopener noreferrer" className="shrink-0 snap-start">
                <img src={publicUrl(path)} alt={`Preview page ${i + 1} of ${p.title}`} loading="lazy" className="h-72 w-auto rounded-md border border-ink/10 shadow-sm sm:h-96" />
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-3xl">
        <Block title="About this ebook" text={p.full_description} />
        <Block title="What you will get from it" text={p.benefits} />
        <Block title="Who it is for" text={p.audience} />
        <Block title="Table of contents" text={p.table_of_contents} />
        {p.show_signature && p.signature_path && (
          <section className="mt-8"><h2 className="text-2xl">From the author</h2><img src={publicUrl(p.signature_path)} alt={`Signature of ${p.author}`} loading="lazy" className="mt-3 h-16 w-auto" /></section>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-16"><h2 className="mb-6 text-2xl">Related ebooks</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">{related.map((r) => <EbookCard key={r.id} p={r} />)}</div>
        </section>
      )}
      <p className="mt-12"><Link href="/ebooks" className="text-sm font-semibold underline">Back to all ebooks</Link></p>
    </div>
  );
}
