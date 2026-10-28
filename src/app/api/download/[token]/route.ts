import { serviceClient } from '@/lib/supabase/service';
import { sha256 } from '@/lib/orders';
import { rateLimit, clientIp } from '@/lib/ratelimit';

const page = (msg: string, status: number) =>
  new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Download</title><body style="font-family:system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>Download unavailable</h1><p>${msg}</p><p><a href="/">Back to INKDIA</a></p>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

export async function GET(req: Request, { params }: { params: { token: string } }) {
  if (!rateLimit(`dl:${clientIp(req)}`, 30, 60_000)) return page('Too many requests. Please wait a minute and try again.', 429);
  const sb = serviceClient();
  const { data: a } = await sb.from('download_authorizations')
    .select('id, expires_at, max_downloads, download_count, order_items(product_id, orders(payment_status, is_demo))')
    .eq('token_hash', sha256(params.token)).maybeSingle();
  const item: any = a?.order_items;
  if (!a || !item) return page('This download link is not valid.', 404);
  if (item.orders?.payment_status !== 'paid' || item.orders?.is_demo) return page('This order has not been paid, so no download is available.', 403);
  if (new Date(a.expires_at) < new Date()) return page('This link has expired. Open your order confirmation page again to get a new link, or contact us.', 410);
  if (a.download_count >= a.max_downloads) return page('This link has reached its download limit. Contact us if you need help.', 410);

  // Count the download only if nobody else changed the counter at the same moment.
  const { data: bumped } = await sb.from('download_authorizations').update({ download_count: a.download_count + 1 }).eq('id', a.id).eq('download_count', a.download_count).select('id');
  if (!bumped?.length) return page('Please try the link again.', 409);

  const { data: prod } = await sb.from('products').select('pdf_path, slug').eq('id', item.product_id).maybeSingle();
  if (!prod?.pdf_path) return page('This ebook file is not available. Please contact us.', 404);
  const { data: signed } = await sb.storage.from('private-ebooks').createSignedUrl(prod.pdf_path, 60, { download: `${prod.slug}.pdf` });
  if (!signed?.signedUrl) return page('Could not prepare your download. Please try again.', 500);
  return Response.redirect(signed.signedUrl, 302);
}
