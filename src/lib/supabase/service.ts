import { createClient } from '@supabase/supabase-js';

/** SECRET client that bypasses row-level security. Use ONLY in server code (API routes, server components). */
export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false },
    global: { fetch: (u: any, o: any) => fetch(u, { ...o, cache: 'no-store' }) },
  });
}
