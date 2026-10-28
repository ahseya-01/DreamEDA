import { requireAdmin } from '@/lib/auth';
import { getSettings, SECTION_LABELS } from '@/lib/settings';
import { saveStore, saveSections, addCategory, deleteCategory } from '@/app/admin/actions';
import { Field, Notice } from '@/components/admin/Field';
import { SubmitButton, ConfirmButton } from '@/components/admin/ui';

export default async function Store({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  const { sb } = await requireAdmin();
  const s = await getSettings();
  const { data: cats } = await sb.from('categories').select('id,name').order('sort_order').order('name');
  const so = s.store.socials as Record<string, string>;
  return (
    <div className="max-w-3xl space-y-10">
      <div><h1 className="text-3xl">Store Settings</h1><div className="mt-4"><Notice searchParams={searchParams} /></div></div>

      <form action={saveStore} className="space-y-4"><h2 className="text-xl font-semibold">Contact, footer and social links</h2>
        <Field label="Contact email" hint="Shown on the website. Not a real address until you enter yours."><input name="contact_email" type="email" className="input" defaultValue={s.store.contact_email} /></Field>
        <Field label="Footer text"><textarea name="footer_text" rows={2} className="input" defaultValue={s.store.footer_text} /></Field>
        {(['instagram', 'facebook', 'x', 'youtube'] as const).map((k) => <Field key={k} label={`${k[0].toUpperCase() + k.slice(1)} link`} hint="Full address starting with https://"><input name={k} type="url" className="input" defaultValue={so[k]} /></Field>)}
        <SubmitButton>Save changes</SubmitButton>
      </form>

      <form action={saveSections} className="space-y-3"><h2 className="text-xl font-semibold">Homepage sections</h2>
        <p className="text-sm text-ink/80">Tick a section to show it. The number sets the order (1 is first).</p>
        <ul className="card divide-y divide-ink/10">
          {s.home.sections.map((x: any, i: number) => (
            <li key={x.id} className="flex items-center gap-4 p-3">
              <input type="number" name={`pos_${x.id}`} defaultValue={i + 1} min={1} max={20} className="input !w-16" aria-label={`Order of ${SECTION_LABELS[x.id]}`} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name={`on_${x.id}`} defaultChecked={x.enabled} /> {SECTION_LABELS[x.id]}</label>
            </li>
          ))}
        </ul>
        <SubmitButton>Save sections</SubmitButton>
      </form>

      <section className="space-y-3"><h2 className="text-xl font-semibold">Categories</h2>
        <ul className="card divide-y divide-ink/10">
          {(cats ?? []).map((c) => (<li key={c.id} className="flex items-center justify-between p-3"><span>{c.name}</span>
            <form action={deleteCategory}><input type="hidden" name="id" value={c.id} /><ConfirmButton message={`Delete category “${c.name}”? Ebooks in it become uncategorized.`} className="text-sm underline">Delete</ConfirmButton></form></li>))}
        </ul>
        <form action={addCategory} className="flex gap-2"><input name="name" className="input" placeholder="New category name" aria-label="New category name" required /><SubmitButton>Add</SubmitButton></form>
      </section>
    </div>
  );
}
