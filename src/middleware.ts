import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Keeps the admin login session fresh and sends signed-out visitors away from /admin.
// (Every admin page and action ALSO checks admin rights on the server. This is a second layer.)
export async function middleware(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return NextResponse.next();
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await sb.auth.getUser();
  const p = req.nextUrl.pathname;
  if (p.startsWith('/admin') && p !== '/admin/login' && !user) {
    const u = req.nextUrl.clone(); u.pathname = '/admin/login'; u.search = '';
    return NextResponse.redirect(u);
  }
  return res;
}
export const config = { matcher: ['/admin/:path*'] };
