'use client';
import { useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';
export default function SignOut() {
  const router = useRouter();
  return <button className="mt-2 block underline" onClick={async () => { await browserClient().auth.signOut(); router.push('/admin/login'); router.refresh(); }}>Sign out</button>;
}
