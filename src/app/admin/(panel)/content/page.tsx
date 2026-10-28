import { requireAdmin } from '@/lib/auth';
import { getSettings } from '@/lib/settings';
import { saveHomeContent, savePage } from '@/app/admin/actions';
import { Field, Notice } from '@/components/admin/Field';
import { SubmitButton } from '@/components/admin/ui';

export default async function Content({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  const { sb } = await requireAdmin();
  const h = (await getSettings()).home;
  const { data: pages } = await sb.from('pages').select('*').order('slug');
  return (
    <div className="max-w-3xl space-y-10">
      <div><h1 className="text-3xl">Website Content</h1><div className="mt-4"><Notice searchParams={searchParams} /></div></div>
      <form action={saveHomeContent} className="space-y-4"><h2 className="text-xl font-semibold">Homepage text</h2>
        <Field label="Hero headline"><input name="hero_title" className="input" defaultValue={h.hero_title} /></Field>
        <Field label="Hero subtitle"><textarea name="hero_subtitle" rows={2} className="input" defaultValue={h.hero_subtitle} /></Field>
        <Field label="Promotional banner title"><input name="promo_title" className="input" defaultValue={h.promo_title} /></Field>
        <Field label="Promotional banner text"><input name="promo_text" className="input" defaultValue={h.promo_text} /></Field>
        <Field label="About text (homepage)"><textarea name="about_text" rows={4} className="input" defaultValue={h.about_text} /></Field>
        <Field label="Contact text (homepage)"><input name="contact_text" className="input" defaultValue={h.contact_text} /></Field>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="show_demo" defaultChecked={h.show_demo} /> Show clearly labelled demo ebooks while the store has no published ebooks</label>
        <SubmitButton>Save homepage text</SubmitButton>
      </form>
      <section className="space-y-6"><h2 className="text-xl font-semibold">Pages</h2>
        <p className="rounded-md border border-ink/20 bg-white p-3 text-sm">The legal pages are draft templates and are not legal advice. Review them, add your real business details, and untick “Draft template” when you are happy with them, before you launch the store.</p>
        {(pages ?? []).map((p) => (
          <form key={p.slug} action={savePage} className="card space-y-3 p-4"><input type="hidden" name="slug" value={p.slug} />
            <Field label="Page title"><input name="title" className="input" defaultValue={p.title} /></Field>
            <Field label="Text"><textarea name="content" rows={8} className="input" defaultValue={p.content} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_draft_template" defaultChecked={p.is_draft_template} /> Draft template (shows a notice to visitors)</label>
            <SubmitButton>Save “{p.title}”</SubmitButton>
          </form>))}
      </section>
    </div>
  );
}
