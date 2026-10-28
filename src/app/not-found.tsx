import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl">Page not found</h1>
      <p className="mt-2 text-ink/70">The page you are looking for does not exist or has been moved.</p>
      <Link href="/ebooks" className="btn btn-primary mt-6">Browse ebooks</Link>
    </div>
  );
}
