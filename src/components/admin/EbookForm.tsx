'use client';
import { useFormState } from 'react-dom';
import { saveEbook } from '@/app/admin/actions';
import FileUpload from './FileUpload';
import PreviewImages from './PreviewImages';
import { SubmitButton } from './ui';
import { Field } from './Field';

export default function EbookForm({ product: p, categories }: { product: any | null; categories: { id: string; name: string }[] }) {
  // @ts-ignore useFormState types differ between React versions
  const [state, action] = useFormState(saveEbook, null);
  return (
    <form action={action} className="mt-6 space-y-8">
      <input type="hidden" name="id" value={p?.id ?? ''} />
      {state?.error && <p className="rounded-md bg-red-100 p-3 text-sm font-semibold text-red-900" role="alert">{state.error}</p>}

      <fieldset className="space-y-4"><legend className="text-xl font-semibold">Details</legend>
        <Field label="Title"><input name="title" required className="input" defaultValue={p?.title} /></Field>
        <Field label="Author name"><input name="author" className="input" defaultValue={p?.author} /></Field>
        <Field label="Web address (slug)" hint="Optional. Leave empty to create it from the title. Example: my-first-ebook"><input name="slug" className="input" defaultValue={p?.slug} /></Field>
        <Field label="Short description" hint="One or two sentences shown on cards."><textarea name="short_description" rows={2} className="input" defaultValue={p?.short_description} /></Field>
        <Field label="Full description"><textarea name="full_description" rows={6} className="input" defaultValue={p?.full_description} /></Field>
        <Field label="Table of contents" hint="One chapter per line."><textarea name="table_of_contents" rows={6} className="input" defaultValue={p?.table_of_contents} /></Field>
        <Field label="Benefits of reading"><textarea name="benefits" rows={4} className="input" defaultValue={p?.benefits} /></Field>
        <Field label="Who it is for"><textarea name="audience" rows={3} className="input" defaultValue={p?.audience} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category"><select name="category_id" className="input" defaultValue={p?.category_id ?? ''}><option value="">No category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Language"><input name="language" className="input" defaultValue={p?.language ?? 'English'} /></Field>
          <Field label="Page count"><input name="page_count" type="number" min={1} className="input" defaultValue={p?.page_count ?? ''} /></Field>
          <Field label="File format"><input name="file_format" className="input" defaultValue={p?.file_format ?? 'PDF'} /></Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4"><legend className="text-xl font-semibold">Price (INR)</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price in ₹"><input name="price_inr" type="number" step="0.01" min={0} required className="input" defaultValue={p?.price_inr} /></Field>
          <Field label="Discounted price in ₹ (optional)" hint="Must be lower than the price. Leave empty for no discount."><input name="discount_price_inr" type="number" step="0.01" min={0} className="input" defaultValue={p?.discount_price_inr ?? ''} /></Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6"><legend className="text-xl font-semibold">Files</legend>
        <FileUpload label="Main ebook PDF (private, only paying customers can download it)" name="pdf_path" bucket="private-ebooks" folder="ebooks" accept="application/pdf" initial={p?.pdf_path} hint="Large files can take a while to upload. Wait for 'File uploaded' before saving." />
        <FileUpload label="Cover image" name="cover_path" bucket="public-assets" folder="covers" accept="image/*" initial={p?.cover_path} hint="Tall images work best (about 2:3). A plain placeholder cover shows until you upload one." />
        <PreviewImages initial={p?.preview_paths ?? []} />
        <FileUpload label="Free sample PDF (optional, public)" name="sample_pdf_path" bucket="public-assets" folder="samples" accept="application/pdf" initial={p?.sample_pdf_path} />
        <FileUpload label="Author signature (optional)" name="signature_path" bucket="public-assets" folder="signatures" accept="image/*" initial={p?.signature_path} hint="Use a PNG with a transparent background if possible." />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="show_signature" defaultChecked={p?.show_signature} /> Show the signature in the “From the author” section of the product page</label>
        <FileUpload label="Ownership or copyright page (optional, private)" name="ownership_page_path" bucket="private-ebooks" folder="ownership" accept="application/pdf,image/*" initial={p?.ownership_page_path} hint="Stored safely for you. It is not shown publicly and is not inserted into your PDF." />
      </fieldset>

      <fieldset className="space-y-2"><legend className="text-xl font-semibold">Display</legend>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" defaultChecked={p?.is_featured} /> Featured ebook (shown in the Featured section)</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_bestseller" defaultChecked={p?.is_bestseller} /> Show in the optional Bestsellers section (you decide, nothing is counted automatically)</label>
      </fieldset>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-ink/10 bg-paper p-4 sm:-mx-8 sm:px-8">
        <SubmitButton name="intent" value="draft" className="btn btn-ghost">Save draft</SubmitButton>
        <SubmitButton name="intent" value="publish">Publish</SubmitButton>
        {p && <SubmitButton name="intent" value="archive" className="btn btn-ghost">Archive</SubmitButton>}
        <p className="text-xs text-ink/70">Current status: <strong>{p?.status ?? 'new'}</strong></p>
      </div>
    </form>
  );
}
