import { hasSupabase } from './utils';
import { publicClient } from './supabase/public';

export const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero banner', categories: 'Category list', featured: 'Featured ebooks', bestsellers: 'Bestsellers (optional)',
  all: 'All ebooks', recent: 'Recently added', promo: 'Promotional banner', about: 'About DreamEDA', contact: 'Contact',
};

// Every value here can be changed in the admin dashboard. The official brand name stays DreamEDA.
export const DEFAULTS = {
  brand: {
    name: 'DreamEDA',
    tagline: 'Ebooks to read and keep',            // placeholder: edit in Logo & Branding
    description: 'DreamEDA is an online store for ebooks, delivered as secure downloads.',
    logo_light: '', logo_dark: '', favicon: '', banner: '',
    show_name_with_logo: false,
  },
  theme: { brand: '#1B2A6B', accent: '#0F8B8D', paper: '#F6F7FB', ink: '#101426' },
  store: {
    contact_email: '', footer_text: '',
    socials: { instagram: '', facebook: '', x: '', youtube: '' },
  },
  home: {
    sections: Object.keys(SECTION_LABELS).map((id) => ({ id, enabled: id !== 'bestsellers' })),
    hero_title: 'Ebooks you can read today and keep for good',
    hero_subtitle: 'Browse the DreamEDA library and download your ebook right after purchase.',
    promo_title: 'New ebooks are added regularly',
    promo_text: 'Browse the catalog to see what is new.',
    about_text: 'DreamEDA is an independent ebook store. Edit this text in Admin > Website Content.',
    contact_text: 'Questions about an ebook or an order? Write to us.',
    show_demo: true,
  },
  payments: { mode: 'not_configured', provider: 'razorpay' },
};
export type Settings = typeof DEFAULTS;

export async function getSettings(): Promise<Settings> {
  const out: any = structuredClone(DEFAULTS);
  if (!hasSupabase()) return out;
  try {
    const { data } = await publicClient().from('store_settings').select('key,value');
    for (const r of data ?? []) if (out[r.key] !== undefined) out[r.key] = { ...out[r.key], ...(r.value as object) };
  } catch { /* use defaults */ }
  out.brand.name = 'DreamEDA';
  return out;
}
