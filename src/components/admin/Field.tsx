export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (<label className="block"><span className="label">{label}</span>{children}{hint && <span className="hint block">{hint}</span>}</label>);
}
export function Notice({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  if (searchParams.saved) return <p className="mb-4 rounded-md bg-green-100 p-3 text-sm font-semibold text-green-900" role="status">Saved.</p>;
  if (searchParams.error) return <p className="mb-4 rounded-md bg-red-100 p-3 text-sm font-semibold text-red-900" role="alert">{searchParams.error}</p>;
  return null;
}
