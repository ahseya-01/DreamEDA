'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const notAdmin = params.get('error') === 'not_admin';

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr('');
    const { error } = await browserClient().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { setErr('Email or password is not correct.'); return; }
    router.push('/admin'); router.refresh();
  }
  return (
    <main className="mx-auto mt-20 max-w-sm px-4">
      <h1 className="text-3xl">DreamEDA admin</h1>
      {notAdmin && <p className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-900" role="alert">This account is signed in but is not an administrator. See the setup guide, step "Make yourself an admin".</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div><label className="label" htmlFor="e">Email</label><input id="e" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></div>
        <div><label className="label" htmlFor="p">Password</label><input id="p" type="password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></div>
        {err && <p className="text-sm font-semibold text-red-700" role="alert">{err}</p>}
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
