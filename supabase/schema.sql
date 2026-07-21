-- ============================================================================
-- Ashraya Events — Supabase schema
-- Run this ONCE in your Supabase project: Dashboard → SQL Editor → paste → Run.
-- Creates the content tables, public read access, and the media storage bucket.
-- ============================================================================

-- ---- Tables ----------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  short text,
  description text,
  image text,
  features text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text,
  image text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event text,
  location text,
  rating int default 5,
  quote text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  category text,
  cover_image text,
  author text,
  body text,                       -- Markdown
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id int primary key default 1,
  tagline text,
  hero_images text[] default '{}',
  story_title text,
  story_body text,
  stats jsonb default '[]',
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ---- Row Level Security: public can READ, only service role can WRITE -------
alter table services         enable row level security;
alter table portfolio_items  enable row level security;
alter table testimonials     enable row level security;
alter table faqs             enable row level security;
alter table posts            enable row level security;
alter table site_settings    enable row level security;

do $$
declare t text;
begin
  foreach t in array array['services','portfolio_items','testimonials','faqs','posts','site_settings']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- (No insert/update/delete policies => writes are only possible with the
--  service-role key, which the /api/admin routes use server-side.)

-- ---- Media storage bucket ---------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
