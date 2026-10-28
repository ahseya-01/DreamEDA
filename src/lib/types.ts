export type Product = {
  id: string; slug: string; title: string; author: string;
  short_description: string; full_description: string;
  category_id: string | null; categories?: { name: string; slug: string } | null;
  price_inr: number; discount_price_inr: number | null;
  language: string; page_count: number | null; file_format: string;
  table_of_contents: string; benefits: string; audience: string;
  cover_path: string | null; preview_paths: string[]; sample_pdf_path: string | null;
  pdf_path: string | null; signature_path: string | null; ownership_page_path: string | null;
  show_signature: boolean; is_featured: boolean; is_bestseller: boolean;
  status: 'draft' | 'published' | 'archived'; created_at: string; updated_at: string;
  is_demo?: boolean;
};
