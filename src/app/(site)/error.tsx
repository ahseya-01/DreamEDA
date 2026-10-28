'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl">Something went wrong</h1>
      <p className="mt-2 text-ink/70">Please try again. If it keeps happening, contact us.</p>
      <button className="btn btn-primary mt-6" onClick={reset}>Try again</button>
    </div>
  );
}
