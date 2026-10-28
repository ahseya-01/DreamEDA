import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import EbookForm from '@/components/admin/EbookForm';
import { deleteEbook } from '@/app/admin/actions';
import { ConfirmButton } from '@/components/admin/ui';

export default async function EditEbook({ params }: { params: { id: string } }) {
  const { sb } = await requireAdmin();
  const [{ data: p }, { data: cats }] = await Promise.all([sb.from('products').select('*').eq('id', params.id).maybeSingle(), sb.from('categories').select('id,name').order('name')]);
  if (!p) notFound();
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl">Edit ebook</h1>
      <EbookForm product={p} categories={cats ?? []} />
      <form action={deleteEbook} className="mt-10 border-t border-ink/10 pt-6">
        <input type="hidden" name="id" value={p.id} />
        <p className="mb-2 text-sm text-ink/80">Delete permanently removes this ebook. If it has orders it cannot be deleted; use Archive instead.</p>
        <ConfirmButton message="Delete this ebook permanently?">Delete ebook</ConfirmButton>
      </form>
    </div>
  );
}
