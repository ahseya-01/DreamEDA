'use client';
import { useState } from 'react';
import { saveBranding } from '@/app/admin/actions';
import FileUpload from './FileUpload';
import { SubmitButton } from './ui';
import { Field } from './Field';
import { publicUrl } from '@/lib/utils';

export default function BrandingForm({ brand, theme }: { brand: any; theme: any }) {
  const [c, setC] = useState({ brand: theme.brand, accent: theme.accent, paper: theme.paper, ink: theme.ink });
  const [logo, setLogo] = useState<string>(brand.logo_light || '');
  const [logoDark, setLogoDark] = useState<string>(brand.logo_dark || '');
  const [banner, setBanner] = useState<string>(brand.banner || '');
  const [tagline, setTagline] = useState<string>(brand.tagline);
  const [withName, setWithName] = useState<boolean>(!!brand.show_name_with_logo);
  const color = (k: keyof typeof c, label: string) => (
    <Field label={label}><div className="flex gap-2"><input type="color" value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} className="h-10 w-12 rounded border border-ink/20" aria-label={label} /><input name={`c_${k}`} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} className="input" pattern="#[0-9a-fA-F]{6}" /></div></Field>
  );
  return (
    <form action={saveBranding} className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        <p className="rounded-md border border-ink/20 bg-white p-3 text-sm">Until you upload a logo, a plain text wordmark “DreamEDA” is shown. It is a temporary placeholder, not a finished logo. The website name is always DreamEDA.</p>
        <FileUpload label="Logo (for light backgrounds)" name="logo_light" bucket="public-assets" folder="branding" accept="image/*" initial={brand.logo_light} onPath={setLogo} hint="PNG, SVG or WebP. Transparent background works best." />
        <FileUpload label="Logo (for dark backgrounds, optional)" name="logo_dark" bucket="public-assets" folder="branding" accept="image/*" initial={brand.logo_dark} onPath={setLogoDark} hint="Used in the footer. If empty, the light logo is used." />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="show_name_with_logo" checked={withName} onChange={(e) => setWithName(e.target.checked)} /> Also show the text “DreamEDA” next to my logo</label>
        <FileUpload label="Favicon (the small icon in the browser tab)" name="favicon" bucket="public-assets" folder="branding" accept="image/png,image/x-icon,image/svg+xml" initial={brand.favicon} hint="A square PNG, at least 64×64 pixels." />
        <FileUpload label="Homepage banner image (optional)" name="banner" bucket="public-assets" folder="branding" accept="image/*" initial={brand.banner} onPath={setBanner} />
        <Field label="Tagline"><input name="tagline" className="input" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={120} /></Field>
        <Field label="Website description" hint="Used by search engines and when the site is shared."><textarea name="description" rows={3} className="input" defaultValue={brand.description} maxLength={300} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">{color('brand', 'Main color')}{color('accent', 'Accent color')}{color('paper', 'Page background')}{color('ink', 'Text color')}</div>
        <SubmitButton>Publish changes</SubmitButton>
      </div>
      <aside aria-label="Preview">
        <p className="label">Preview (not live until you publish)</p>
        <div className="overflow-hidden rounded-lg border border-ink/20" style={{ background: c.paper, color: c.ink }}>
          <div className="flex h-12 items-center gap-2 border-b px-3" style={{ borderColor: c.ink + '22' }}>
            {logo ? <img src={publicUrl(logo)} alt="" className="h-7 w-auto" /> : null}
            {(!logo || withName) && <span className="font-display text-lg font-semibold tracking-[0.2em]">DreamEDA</span>}
          </div>
          <div className="space-y-3 p-4" style={{ background: c.brand, color: '#fff' }}>
            <p className="font-display text-xl">{tagline}</p>
            {banner && <img src={publicUrl(banner)} alt="" className="w-full rounded" />}
            <span className="inline-block rounded px-3 py-1.5 text-sm font-semibold text-white" style={{ background: c.accent }}>Browse ebooks</span>
          </div>
          <div className="p-4 text-sm">Sample page text on your chosen background.</div>
          <div className="p-3" style={{ background: c.brand }}>{logoDark || logo ? <img src={publicUrl(logoDark || logo)} alt="" className="h-6 w-auto" /> : <span className="font-display text-white tracking-[0.2em]">DreamEDA</span>}</div>
        </div>
      </aside>
    </form>
  );
}
