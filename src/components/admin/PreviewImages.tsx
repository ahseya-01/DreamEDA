'use client';
import { useState } from 'react';
import FileUpload from './FileUpload';
import { publicUrl } from '@/lib/utils';

export default function PreviewImages({ initial }: { initial: string[] }) {
  const [paths, setPaths] = useState<string[]>(initial || []);
  const move = (i: number, d: number) => { const a = [...paths]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setPaths(a); };
  return (
    <div>
      <p className="label">Preview images (up to 4)</p>
      <input type="hidden" name="preview_paths" value={JSON.stringify(paths)} />
      <ul className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {paths.map((p, i) => (
          <li key={p} className="card p-2 text-center">
            <img src={publicUrl(p)} alt={`Preview ${i + 1}`} className="mx-auto h-28 w-auto object-contain" />
            <p className="mt-1 text-xs">Position {i + 1}</p>
            <div className="mt-1 flex justify-center gap-2 text-xs">
              <button type="button" className="underline disabled:opacity-40" disabled={i === 0} onClick={() => move(i, -1)}>Earlier</button>
              <button type="button" className="underline disabled:opacity-40" disabled={i === paths.length - 1} onClick={() => move(i, 1)}>Later</button>
              <button type="button" className="underline" onClick={() => setPaths(paths.filter((x) => x !== p))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {paths.length < 4
        ? <FileUpload bucket="public-assets" folder="previews" accept="image/*" keepValue={false} onPath={(p) => p && setPaths((a) => [...a, p].slice(0, 4))} hint="Each upload adds one image. Pick images of sample pages." />
        : <p className="hint">Maximum of 4 preview images. Remove one to add another.</p>}
    </div>
  );
}
