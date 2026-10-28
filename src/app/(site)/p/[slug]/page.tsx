import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPage } from '@/lib/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPage(params.slug);
  return { title: p?.title ?? 'Page' };
}

export default async function InfoPage({ params }: { params: { slug: string } }) {
  const p = await getPage(params.slug);
  if (!p) notFound();
  return (
    <article className="container max-w-3xl py-12">
      <h1 className="text-4xl">{p.title}</h1>
      {p.is_draft_template && <p className="mt-4 rounded-md border border-ink/20 bg-white p-3 text-sm" role="note">Draft template: this page has not been reviewed or completed by the store owner yet.</p>}
      <div className="mt-6 whitespace-pre-line text-lg leading-relaxed">{p.content}</div>
    </article>
  );
}
