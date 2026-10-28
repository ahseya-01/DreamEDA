import Link from 'next/link';
import Cover from './Cover';
import { inr } from '@/lib/utils';
import type { Product } from '@/lib/types';

export default function EbookCard({ p }: { p: Product }) {
  const sale = p.discount_price_inr != null && Number(p.discount_price_inr) < Number(p.price_inr);
  return (
    <Link href={`/ebooks/${p.slug}`} className="group flex flex-col gap-3">
      <div className="relative">
        <Cover path={p.cover_path} title={p.title} author={p.author} className="transition-transform group-hover:-translate-y-1" />
        {p.is_demo && <span className="absolute left-2 top-2 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-white">Demo</span>}
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug group-hover:underline">{p.title}</h3>
        {p.author && <p className="text-sm text-ink/70">{p.author}</p>}
        <p className="mt-1 text-sm font-semibold">
          {sale ? (<><span>{inr(p.discount_price_inr!)}</span> <span className="font-normal text-ink/60 line-through">{inr(p.price_inr)}</span></>) : inr(p.price_inr)}
        </p>
      </div>
    </Link>
  );
}
