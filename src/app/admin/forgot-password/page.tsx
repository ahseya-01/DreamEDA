'use client';

import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await browserClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Password recovery email sent. Please check your inbox.');
  }

  return (
    <main className="mx-auto mt-20 max-w-sm px-4">
      <h1 className="text-3xl">Forgot Password?</h1>
      <p className="mt-3 text-sm">
        Enter your admin email to receive a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          required
          placeholder="Admin email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <p className="text-sm">{message}</p>}

        <button
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Recovery Email'}
        </button>
      </form>
    </main>
  );
}