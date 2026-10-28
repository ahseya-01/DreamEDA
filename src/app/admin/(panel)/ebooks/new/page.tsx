import { requireAdmin } from '@/lib/auth';
import EbookForm from '@/components/admin/EbookForm';

export default async function NewEbook() {
  const { sb } = await requireAdmin();
  const { data: cats } = await sb.from('categories').select('id,name').order('name');
  return <div className="max-w-3xl"><h1 className="text-3xl">Add new ebook</h1><EbookForm product={null} categories={cats ?? []} /></div>;
}
