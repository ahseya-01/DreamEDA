import { redirect } from 'next/navigation';
import { serverClient } from './supabase/server';

/** Call at the top of every admin page and every admin action. Redirects unless the user is a listed admin. */
export async function requireAdmin() {
  const sb = serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data } = await sb.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!data) redirect('/admin/login?error=not_admin');
  return { sb, user };
}
