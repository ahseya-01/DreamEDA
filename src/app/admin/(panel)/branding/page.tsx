import { requireAdmin } from '@/lib/auth';
import { getSettings } from '@/lib/settings';
import BrandingForm from '@/components/admin/BrandingForm';
import { Notice } from '@/components/admin/Field';

export default async function Branding({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  await requireAdmin();
  const s = await getSettings();
  return (<div className="max-w-5xl"><h1 className="text-3xl">Logo & Branding</h1><div className="mt-4"><Notice searchParams={searchParams} /></div><BrandingForm brand={s.brand} theme={s.theme} /></div>);
}
