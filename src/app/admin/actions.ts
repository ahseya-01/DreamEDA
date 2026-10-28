'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { SECTION_LABELS } from '@/lib/settings';

const str = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
const opt = (f: FormData, k: string) => str(f, k) || null;
const num = (f: FormData, k: string) => { const v = str(f, k); return v === '' ? null : Number(v); };
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Colors must look like #1B2A6B');
const url = (v: string) => (v === '' || /^https?:\/\//i.test(v) ? v : '');

async function saveSetting(sb: any, key: string, value: object) {
  const { error } = await sb.from('store_settings').upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
const done = (path: string) => { revalidatePath('/', 'layout'); redirect(`${path}?saved=1`); };
const fail = (path: string, msg: string) => redirect(`${path}?error=${encodeURIComponent(msg)}`);

// ───────── Ebooks ─────────
export async function saveEbook(_prev: { error?: string } | null, f: FormData): Promise<{ error?: string }> {
  const { sb } = await requireAdmin();
  const id = str(f, 'id');
  const intent = str(f, 'intent');   // draft | publish | archive
  const status = intent === 'publish' ? 'published' : intent === 'archive' ? 'archived' : 'draft';

  const title = str(f, 'title');
  if (!title) return { error: 'Please enter a title.' };
  const price = num(f, 'price_inr');
  if (price === null || isNaN(price) || price < 0) return { error: 'Please enter a valid price in rupees.' };
  const disc = num(f, 'discount_price_inr');
  if (disc !== null && (isNaN(disc) || disc >= price || disc < 0)) return { error: 'The discounted price must be lower than the normal price.' };
  const pdf = opt(f, 'pdf_path');
  if (status === 'published' && !pdf) return { error: 'Upload the main ebook PDF before publishing. You can still save as a draft.' };

  let previews: string[] = [];
  try { previews = JSON.parse(str(f, 'preview_paths') || '[]').filter((x: unknown) => typeof x === 'string').slice(0, 4); } catch { /* ignore */ }

  const row = {
    title, slug: slugify(str(f, 'slug') || title) || `ebook-${Date.now()}`, author: str(f, 'author'),
    short_description: str(f, 'short_description'), full_description: str(f, 'full_description'),
    category_id: opt(f, 'category_id'), price_inr: price, discount_price_inr: disc,
    language: str(f, 'language') || 'English', page_count: num(f, 'page_count'), file_format: str(f, 'file_format') || 'PDF',
    table_of_contents: str(f, 'table_of_contents'), benefits: str(f, 'benefits'), audience: str(f, 'audience'),
    cover_path: opt(f, 'cover_path'), preview_paths: previews, sample_pdf_path: opt(f, 'sample_pdf_path'),
    pdf_path: pdf, signature_path: opt(f, 'signature_path'), ownership_page_path: opt(f, 'ownership_page_path'),
    show_signature: f.get('show_signature') === 'on', is_featured: f.get('is_featured') === 'on', is_bestseller: f.get('is_bestseller') === 'on',
    status,
  };
  const q = id ? sb.from('products').update(row).eq('id', id) : sb.from('products').insert(row);
  const { error } = await q;
  if (error) return { error: error.code === '23505' ? 'Another ebook already uses this web address (slug). Change the slug.' : `Could not save: ${error.message}` };
  revalidatePath('/', 'layout');
  redirect(`/admin/ebooks?saved=1`);
}

export async function deleteEbook(f: FormData) {
  const { sb } = await requireAdmin();
  const { error } = await sb.from('products').delete().eq('id', str(f, 'id'));
  if (error) fail('/admin/ebooks', 'This ebook has orders, so it cannot be deleted. Archive it instead.');
  done('/admin/ebooks');
}

// ───────── Branding ─────────
export async function saveBranding(f: FormData) {
  const { sb } = await requireAdmin();
  const colors = z.object({ brand: hex, accent: hex, paper: hex, ink: hex }).safeParse({ brand: str(f, 'c_brand'), accent: str(f, 'c_accent'), paper: str(f, 'c_paper'), ink: str(f, 'c_ink') });
  if (!colors.success) fail('/admin/branding', colors.error.issues[0].message);
  await saveSetting(sb, 'brand', {
    tagline: str(f, 'tagline').slice(0, 120), description: str(f, 'description').slice(0, 300),
    logo_light: str(f, 'logo_light'), logo_dark: str(f, 'logo_dark'), favicon: str(f, 'favicon'), banner: str(f, 'banner'),
    show_name_with_logo: f.get('show_name_with_logo') === 'on',
  });
  await saveSetting(sb, 'theme', colors.data!);
  done('/admin/branding');
}

// ───────── Store settings, categories, homepage sections ─────────
export async function saveStore(f: FormData) {
  const { sb } = await requireAdmin();
  const email = str(f, 'contact_email');
  if (email && !z.string().email().safeParse(email).success) fail('/admin/store', 'Please enter a valid contact email.');
  await saveSetting(sb, 'store', {
    contact_email: email, footer_text: str(f, 'footer_text').slice(0, 300),
    socials: { instagram: url(str(f, 'instagram')), facebook: url(str(f, 'facebook')), x: url(str(f, 'x')), youtube: url(str(f, 'youtube')) },
  });
  done('/admin/store');
}

export async function saveSections(f: FormData) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from('store_settings').select('value').eq('key', 'home').maybeSingle();
  const sections = Object.keys(SECTION_LABELS)
    .map((id) => ({ id, enabled: f.get(`on_${id}`) === 'on', pos: Number(f.get(`pos_${id}`)) || 99 }))
    .sort((a, b) => a.pos - b.pos).map(({ id, enabled }) => ({ id, enabled }));
  await saveSetting(sb, 'home', { ...(data?.value ?? {}), sections });
  done('/admin/store');
}

export async function addCategory(f: FormData) {
  const { sb } = await requireAdmin();
  const name = str(f, 'name');
  if (!name) fail('/admin/store', 'Enter a category name.');
  const { error } = await sb.from('categories').insert({ name, slug: slugify(name) });
  if (error) fail('/admin/store', 'That category already exists.');
  done('/admin/store');
}
export async function deleteCategory(f: FormData) {
  const { sb } = await requireAdmin();
  await sb.from('categories').delete().eq('id', str(f, 'id'));
  done('/admin/store');
}

// ───────── Website content ─────────
export async function saveHomeContent(f: FormData) {
  const { sb } = await requireAdmin();
  const { data } = await sb.from('store_settings').select('value').eq('key', 'home').maybeSingle();
  await saveSetting(sb, 'home', {
    ...(data?.value ?? {}),
    hero_title: str(f, 'hero_title').slice(0, 140), hero_subtitle: str(f, 'hero_subtitle').slice(0, 300),
    promo_title: str(f, 'promo_title').slice(0, 140), promo_text: str(f, 'promo_text').slice(0, 300),
    about_text: str(f, 'about_text').slice(0, 2000), contact_text: str(f, 'contact_text').slice(0, 500),
    show_demo: f.get('show_demo') === 'on',
  });
  done('/admin/content');
}
export async function savePage(f: FormData) {
  const { sb } = await requireAdmin();
  const slug = str(f, 'slug');
  const { error } = await sb.from('pages').update({
    title: str(f, 'title').slice(0, 120), content: str(f, 'content').slice(0, 20000),
    is_draft_template: f.get('is_draft_template') === 'on', updated_at: new Date().toISOString(),
  }).eq('slug', slug);
  if (error) fail('/admin/content', error.message);
  done('/admin/content');
}

// ───────── Payments ─────────
export async function savePaymentMode(f: FormData) {
  const { sb } = await requireAdmin();
  const mode = str(f, 'mode');
  if (!['not_configured', 'test', 'live', 'disabled'].includes(mode)) fail('/admin/payments', 'Unknown mode.');
  await saveSetting(sb, 'payments', { mode, provider: 'razorpay' });
  done('/admin/payments');
}
