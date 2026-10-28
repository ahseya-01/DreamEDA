import { createClient } from '@supabase/supabase-js';

/** Read-only client with the public key. Row-level security limits what it can see. */
export function publicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
    global: { fetch: (u: any, o: any) => fetch(u, { ...o, cache: 'no-store' }) },
  });
}
