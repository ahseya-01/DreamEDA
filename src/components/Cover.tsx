import { publicUrl } from '@/lib/utils';

// Real cover image if uploaded; otherwise a plain typographic placeholder.
export default function Cover({ path, title, author, className = '' }: { path?: string | null; title: string; author?: string; className?: string }) {
  if (path) return <img src={publicUrl(path)} alt={`Cover of ${title}`} loading="lazy" className={`aspect-[2/3] w-full rounded-md object-cover shadow-md ${className}`} />;
  return (
    <div className={`flex aspect-[2/3] w-full flex-col justify-between rounded-md bg-brand p-4 text-white shadow-md ${className}`} role="img" aria-label={`Placeholder cover for ${title}`}>
      <span className="font-display text-lg leading-snug sm:text-xl">{title}</span>
      <span className="text-xs text-white/80">{author}</span>
    </div>
  );
}
