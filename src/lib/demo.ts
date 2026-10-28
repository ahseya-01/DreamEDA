import type { Product } from './types';

// DEMO products: shown only when the store has no real published ebooks and "demo preview" is on.
// They are not real, cannot be bought, and never grant downloads.
const base = {
  full_description: 'This is a demo product so you can preview the INKDIA design. It is not a real ebook.',
  category_id: null, categories: { name: 'Demo', slug: 'demo' }, language: 'English', page_count: null, file_format: 'PDF',
  table_of_contents: '', benefits: '', audience: '', cover_path: null, preview_paths: [], sample_pdf_path: null,
  pdf_path: null, signature_path: null, ownership_page_path: null, show_signature: false,
  is_bestseller: false, status: 'published' as const, created_at: '', updated_at: '', is_demo: true,
};
export const DEMO_PRODUCTS: Product[] = [
  { ...base, id: 'demo-1', slug: 'demo-sample-ebook-one', title: 'Sample Ebook Title', author: 'Author Name', short_description: 'A placeholder ebook that shows how a product card looks.', price_inr: 299, discount_price_inr: null, is_featured: true },
  { ...base, id: 'demo-2', slug: 'demo-sample-ebook-two', title: 'Another Sample Title', author: 'Author Name', short_description: 'A second placeholder so you can see how a catalog grid looks.', price_inr: 199, discount_price_inr: null, is_featured: true },
  { ...base, id: 'demo-3', slug: 'demo-sample-ebook-three', title: 'Third Sample Title', author: 'Author Name', short_description: 'Replace these by publishing your real ebooks in the admin dashboard.', price_inr: 149, discount_price_inr: null, is_featured: true },
];
