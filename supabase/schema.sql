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
  intro_title text,
  intro_body text,
  intro_image_1 text,
  intro_image_2 text,
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

-- Additive columns for existing projects (safe to re-run):
alter table site_settings add column if not exists intro_title   text;
alter table site_settings add column if not exists intro_body    text;
alter table site_settings add column if not exists intro_image_1 text;
alter table site_settings add column if not exists intro_image_2 text;

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

-- ---- Decorations store (Module 1) ------------------------------------------
create table if not exists decoration_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  image text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  image text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists decorations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text,                       -- category name/slug
  city text,                           -- city name
  area text,
  price int default 0,
  discount int default 0,              -- percent off
  theme text,
  description text,
  included_items text[] default '{}',
  addons jsonb default '[]',           -- [{ "name": text, "price": int }]
  images text[] default '{}',          -- gallery
  faqs jsonb default '[]',             -- [{ "question": text, "answer": text }]
  rating numeric default 0,
  availability boolean default true,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table decoration_categories enable row level security;
alter table cities                enable row level security;
alter table decorations           enable row level security;

do $$
declare t text;
begin
  foreach t in array array['decoration_categories','cities','decorations']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- ---- Home-page managed sections (photos editable in admin) ------------------
create table if not exists home_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null, description text, image text, tint text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists service_tiles (
  id uuid primary key default gen_random_uuid(),
  title text not null, image text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists inspiration_frames (
  id uuid primary key default gen_random_uuid(),
  title text not null, tab text, image text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text, bio text, image text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  name text not null, image text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists process_steps (
  id uuid primary key default gen_random_uuid(),
  step text, title text not null, description text, image text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists page_banners (
  id uuid primary key default gen_random_uuid(),
  page text not null, image text, title text, subtitle text,
  sort_order int default 0, created_at timestamptz default now()
);

alter table home_categories    enable row level security;
alter table service_tiles       enable row level security;
alter table inspiration_frames  enable row level security;
alter table team_members        enable row level security;
alter table awards              enable row level security;
alter table process_steps       enable row level security;
alter table page_banners        enable row level security;

do $$
declare t text;
begin
  foreach t in array array['home_categories','service_tiles','inspiration_frames','team_members','awards','process_steps','page_banners']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- More home/about images + media on the site_settings singleton (idempotent):
alter table site_settings add column if not exists collage_images  text[] default '{}';
alter table site_settings add column if not exists collage_image   text;
alter table site_settings add column if not exists about_image     text;
alter table site_settings add column if not exists video_poster    text;
alter table site_settings add column if not exists hero_video      text;
alter table site_settings add column if not exists youtube_ids     text[] default '{}';
alter table site_settings add column if not exists instagram_embed text;
alter table site_settings add column if not exists instagram_posts text[] default '{}';

-- ---- About page CMS (dedicated /admin/about-editor) -------------------------
create table if not exists page_content (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,     -- e.g. 'about_hero', 'about_story', 'about_cta'
  title text, subtitle text, body_markdown text, media_url text,
  seo_title text, seo_description text,
  is_published boolean default true,
  updated_at timestamptz default now()
);
create table if not exists core_values (
  id uuid primary key default gen_random_uuid(),
  icon text, title text not null, description text,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists about_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null, value text not null, prefix_suffix text,
  sort_order int default 0, created_at timestamptz default now()
);

alter table page_content  enable row level security;
alter table core_values   enable row level security;
alter table about_stats   enable row level security;

do $$
declare t text;
begin
  foreach t in array array['page_content','core_values','about_stats']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- Extend team_members with social link + active flag (idempotent):
alter table team_members add column if not exists linkedin_url text;
alter table team_members add column if not exists is_active boolean default true;

-- Extend testimonials with a "featured on About page" flag (idempotent):
alter table testimonials add column if not exists is_featured boolean default false;

-- ---- About page: narrative sections (Shaandaar-style) -----------------------
create table if not exists recognitions (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort_order int default 0, created_at timestamptz default now()
);
create table if not exists destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null default 'Domestic',   -- 'Domestic' | 'International'
  sort_order int default 0, created_at timestamptz default now()
);

alter table recognitions enable row level security;
alter table destinations enable row level security;

do $$
declare t text;
begin
  foreach t in array array['recognitions','destinations']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- ---- How It Works page: 4-step journey + team roles --------------------------
-- NOTE: superseded process_phases / role_cards tables from an earlier revision
-- of this page are intentionally left alone here (schema.sql never drops
-- tables) — they're just unused now. Drop them by hand in Supabase if desired.

create table if not exists how_it_works_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,             -- e.g. "Introductory Call"
  slug text not null unique,       -- anchor target, e.g. "introductory-call"
  nav_label text,                  -- optional override for the step-navigator label
  icon text,                       -- one of the shared icon names (see core_values.icon)
  pull_quote text,                 -- optional emphasised line shown at the end of this step
  is_active boolean default true,
  sort_order int default 0, created_at timestamptz default now()
);

create table if not exists how_it_works_step_items (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null references how_it_works_steps(id) on delete cascade,
  heading text not null,
  body text,
  image text,
  cta_label text,
  cta_url text,                    -- if blank, the frontend opens the enquiry drawer instead
  is_active boolean default true,
  sort_order int default 0, created_at timestamptz default now()
);
create index if not exists how_it_works_step_items_step_id_idx on how_it_works_step_items(step_id);

create table if not exists how_it_works_team_roles (
  id uuid primary key default gen_random_uuid(),
  title text not null,             -- e.g. "Wedding Consultant"
  description text,
  icon text,                       -- shown if no photo is set
  image text,
  is_active boolean default true,
  sort_order int default 0, created_at timestamptz default now()
);

alter table how_it_works_steps      enable row level security;
alter table how_it_works_step_items enable row level security;
alter table how_it_works_team_roles enable row level security;

do $$
declare t text;
begin
  foreach t in array array['how_it_works_steps','how_it_works_step_items','how_it_works_team_roles']
  loop
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format('create policy "public read %1$s" on %1$I for select using (true);', t);
  end loop;
end $$;

-- CTA fields on the shared page_content singleton-by-key table (used by the
-- How It Works intro band's primary CTA, and reusable by any future section):
alter table page_content add column if not exists cta_label text;
alter table page_content add column if not exists cta_url   text;

-- Optional photo-gallery array on the shared page_content singleton-by-key
-- table — used by the About page's hero gallery (matches Shaandaar's
-- multi-photo banner at the top of /about), reusable by any future section:
alter table page_content add column if not exists gallery_images text[];

-- ---- Media storage bucket ---------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
