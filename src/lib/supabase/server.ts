import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** Client that acts as the logged-in person (used for the admin dashboard). */
export function serverClient() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a page: safe to ignore */ }
      },
    },
  });
}
