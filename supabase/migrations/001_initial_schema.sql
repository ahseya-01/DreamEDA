-- DreamEDA database schema. Run this ONCE in Supabase: SQL Editor > New query > paste > Run.
create extension if not exists pgcrypto;

-- ───────── Admins ─────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ───────── Catalog ─────────
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  author text not null default '',
  short_description text not null default '',
  full_description text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  price_inr numeric(10,2) not null check (price_inr >= 0),
  discount_price_inr numeric(10,2) check (discount_price_inr is null or discount_price_inr < price_inr),
  language text not null default 'English',
  page_count int,
  file_format text not null default 'PDF',
  table_of_contents text not null default '',
  benefits text not null default '',
  audience text not null default '',
  cover_path text,                              -- public-assets bucket
  preview_paths text[] not null default '{}',   -- public-assets bucket (max 4)
  sample_pdf_path text,                         -- public-assets bucket (free sample)
  pdf_path text,                                -- PRIVATE bucket: the paid ebook
  signature_path text,                          -- public-assets bucket
  ownership_page_path text,                     -- PRIVATE bucket
  show_signature boolean not null default false,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_status_idx on public.products(status, created_at desc);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

-- ───────── Settings and pages ─────────
create table if not exists public.store_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  slug text primary key,
  title text not null,
  content text not null default '',
  is_draft_template boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ───────── Orders (written only by the server with the service key) ─────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  email text not null,
  status text not null default 'pending' check (status in ('pending','paid','failed','cancelled','refunded')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','cancelled','refunded')),
  total_inr numeric(10,2) not null,
  currency text not null default 'INR',
  provider text,
  provider_order_id text unique,
  access_key_hash text not null,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  title_snapshot text not null,
  price_inr numeric(10,2) not null
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  provider_ref text not null unique,   -- makes webhook/verify processing idempotent
  status text not null,
  amount_inr numeric(10,2),
  raw jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.download_authorizations (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  max_downloads int not null default 5,
  download_count int not null default 0,
  created_at timestamptz not null default now()
);

-- ───────── Row-level security ─────────
alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.store_settings enable row level security;
alter table public.pages enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.download_authorizations enable row level security;

create policy "admin_users: see own row" on public.admin_users for select using (user_id = auth.uid() or public.is_admin());

create policy "categories: public read" on public.categories for select using (true);
create policy "categories: admin write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "products: public reads published" on public.products for select using (status = 'published' or public.is_admin());
create policy "products: admin write" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "settings: public read" on public.store_settings for select using (true);
create policy "settings: admin write" on public.store_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "pages: public read" on public.pages for select using (true);
create policy "pages: admin write" on public.pages for all using (public.is_admin()) with check (public.is_admin());

-- Orders, items, payments and download links: admins may READ. Nobody else can touch them
-- through the public API. The website server writes them using the secret service key.
create policy "orders: admin read" on public.orders for select using (public.is_admin());
create policy "order_items: admin read" on public.order_items for select using (public.is_admin());
create policy "payments: admin read" on public.payments for select using (public.is_admin());
create policy "downloads: admin read" on public.download_authorizations for select using (public.is_admin());

-- ───────── Storage buckets ─────────
insert into storage.buckets (id, name, public) values ('public-assets', 'public-assets', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('private-ebooks', 'private-ebooks', false) on conflict (id) do nothing;

create policy "storage: admins manage ebook buckets" on storage.objects for all
  using (bucket_id in ('public-assets','private-ebooks') and public.is_admin())
  with check (bucket_id in ('public-assets','private-ebooks') and public.is_admin());

-- ───────── Starter content (all editable in the admin dashboard) ─────────
insert into public.categories (name, slug, sort_order) values ('General', 'general', 0) on conflict (slug) do nothing;

insert into public.pages (slug, title, content) values
('about', 'About DreamEDA', E'DRAFT TEMPLATE: replace this text in Admin > Website Content.\n\nDreamEDA is an online store for ebooks. Tell visitors who you are, why you write, and what readers can expect.'),
('contact', 'Contact Us', E'DRAFT TEMPLATE: replace this text in Admin > Website Content.\n\nAdd your support email address and how quickly you usually reply.'),
('privacy', 'Privacy Policy', E'DRAFT TEMPLATE, NOT LEGAL ADVICE. Review and complete before launching.\n\nExplain what customer information you collect (for example email address and order details), why, how long you keep it, who processes it (payment provider, email provider, hosting), and how customers can contact you about their data.'),
('terms', 'Terms and Conditions', E'DRAFT TEMPLATE, NOT LEGAL ADVICE. Review and complete before launching.\n\nExplain how ebooks may be used (personal use, no resharing), pricing in INR, delivery by download, and your business details once you have them.'),
('refund', 'Digital Product Refund Policy', E'DRAFT TEMPLATE, NOT LEGAL ADVICE. Review and complete before launching.\n\nDigital products are usually not returnable once downloaded. State clearly when, if ever, you offer refunds, and how to request one.')
on conflict (slug) do nothing;
