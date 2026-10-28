'use client';
import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import { publicUrl } from '@/lib/utils';

type Props = {
  label?: string; hint?: string; name?: string; bucket: 'public-assets' | 'private-ebooks'; folder: string;
  accept?: string; initial?: string | null; onPath?: (path: string) => void; keepValue?: boolean;
};

// Uploads straight from the browser to Supabase Storage (admins only, enforced by database rules).
export default function FileUpload({ label, hint, name, bucket, folder, accept, initial, onPath, keepValue = true }: Props) {
  const [path, setPath] = useState(initial || '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true); setErr('');
    const ext = (f.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
    const p = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await browserClient().storage.from(bucket).upload(p, f, { contentType: f.type || undefined });
    setBusy(false); e.target.value = '';
    if (error) { setErr(error.message); return; }
    if (keepValue) setPath(p);
    onPath?.(p);
  }
  const isImg = bucket === 'public-assets' && /\.(png|jpe?g|webp|gif|svg|ico)$/i.test(path);
  return (
    <div>
      {label && <p className="label">{label}</p>}
      {name && <input type="hidden" name={name} value={path} />}
      {keepValue && path && (
        <div className="mb-2 flex items-center gap-3">
          {isImg ? <img src={publicUrl(path)} alt="" className="h-16 w-auto max-w-[8rem] rounded border border-ink/10 bg-white object-contain" /> : <span className="rounded bg-ink/5 px-2 py-1 text-xs">File uploaded</span>}
          <button type="button" className="text-sm underline" onClick={() => { setPath(''); onPath?.(''); }}>Remove</button>
        </div>
      )}
      <input type="file" accept={accept} onChange={pick} disabled={busy} className="block text-sm file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white" />
      {busy && <p className="hint" role="status">Uploading… please wait.</p>}
      {err && <p className="mt-1 text-xs font-semibold text-red-700" role="alert">Upload failed: {err}</p>}
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}
