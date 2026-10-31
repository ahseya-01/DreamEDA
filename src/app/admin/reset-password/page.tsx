'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const supabase = browserClient();

    supabase.auth.getSession().then(({ data }) => {
      setValid(!!data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setValid(!!session);
          setChecking(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { error } = await browserClient().auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Password updated successfully! Redirecting...');
    setTimeout(() => router.push('/admin/login'), 2000);
  }

  if (checking) {
    return <main className="mx-auto mt-20 max-w-sm px-4">Checking recovery link...</main>;
  }

  if (!valid) {
    return (
      <main className="mx-auto mt-20 max-w-sm px-4">
        <h1 className="text-2xl">Password Reset</h1>
        <p className="mt-4">Recovery link is invalid or expired. Please request a new link.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto mt-20 max-w-sm px-4">
      <h1 className="text-3xl">Set New Password</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          placeholder="New password"
          required
          minLength={8}
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          required
          minLength={8}
          className="input w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {message && <p className="text-sm">{message}</p>}

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </main>
  );
}