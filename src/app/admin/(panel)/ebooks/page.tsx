import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { inr } from '@/lib/utils';
import { Notice } from '@/components/admin/Field';

export default async function Ebooks({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from('products').select('id,title,slug,status,price_inr,updated_at').order('created_at', { ascending: false });
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between"><h1 className="text-3xl">Ebooks</h1><Link href="/admin/ebooks/new" className="btn btn-primary">Add new ebook</Link></div>
      <div className="mt-4"><Notice searchParams={searchParams} /></div>
      {!data?.length ? (
        <div className="card mt-6 p-10 text-center"><p>No ebooks yet.</p><Link href="/admin/ebooks/new" className="btn btn-primary mt-4">Add your first ebook</Link></div>
      ) : (
        <ul className="card mt-6 divide-y divide-ink/10">
          {data.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><p className="font-semibold">{p.title}</p><p className="text-sm text-ink/70">{inr(p.price_inr)} · <span className="font-medium capitalize">{p.status}</span></p></div>
              <div className="flex gap-3 text-sm">
                {p.status === 'published' && <Link href={`/ebooks/${p.slug}`} target="_blank" className="underline">View</Link>}
                <Link href={`/admin/ebooks/${p.id}`} className="btn btn-ghost !py-1.5">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
