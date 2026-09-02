-- =============================================================
-- PERFECT DETAILING — database schema
-- PostgreSQL / Supabase
--
-- Run this once against a fresh project (SQL editor, or
-- `supabase db push`). It is idempotent: re-running it is safe.
--
-- Design note. Editorial content is stored as JSONB documents in
-- `site_settings` (one row per singleton) and `site_collections`
-- (one row per item). That is deliberate: the site's content model
-- evolves faster than a migration cycle, and the application owns
-- its shape. Everything that is *queried* rather than *rendered* —
-- leads, analytics, media, audit — gets proper columns, foreign
-- keys and indexes.
-- =============================================================

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- -------------------------------------------------------------
-- Enumerated types
-- -------------------------------------------------------------
do $$ begin
  create type publish_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('new', 'contacted', 'quoted', 'scheduled', 'won', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_source as enum ('contact', 'quote', 'calculator', 'phone', 'referral');
exception when duplicate_object then null; end $$;

do $$ begin
  create type portal_role as enum ('owner', 'manager', 'staff');
exception when duplicate_object then null; end $$;

-- -------------------------------------------------------------
-- Shared trigger: keep updated_at honest
-- -------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- =============================================================
-- 1. Staff
-- =============================================================
create table if not exists portal_users (
  id          uuid primary key default gen_random_uuid(),
  auth_id     uuid unique,                       -- links to auth.users when Supabase Auth is used
  name        text        not null,
  email       citext      not null unique,
  role        portal_role not null default 'staff',
  active      boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists portal_users_active_idx on portal_users (active) where active;

drop trigger if exists portal_users_updated on portal_users;
create trigger portal_users_updated before update on portal_users
  for each row execute function set_updated_at();

-- =============================================================
-- 2. Editorial content
-- =============================================================

-- One row per singleton: home, about, contact, seo, appearance…
create table if not exists site_settings (
  key         text primary key,
  data        jsonb       not null default '{}'::jsonb,
  updated_by  uuid references portal_users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists site_settings_updated on site_settings;
create trigger site_settings_updated before update on site_settings
  for each row execute function set_updated_at();

-- One row per collection item: services, faqs, testimonials…
create table if not exists site_collections (
  id          uuid primary key default gen_random_uuid(),
  collection  text        not null,
  item_id     text        not null,
  slug        text,
  status      publish_status not null default 'published',
  sort_order  integer     not null default 0,
  data        jsonb       not null default '{}'::jsonb,
  updated_by  uuid references portal_users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint site_collections_unique_item unique (collection, item_id)
);

create index if not exists site_collections_lookup_idx
  on site_collections (collection, status, sort_order);
create index if not exists site_collections_slug_idx
  on site_collections (collection, slug) where slug is not null;
create index if not exists site_collections_data_idx
  on site_collections using gin (data jsonb_path_ops);

drop trigger if exists site_collections_updated on site_collections;
create trigger site_collections_updated before update on site_collections
  for each row execute function set_updated_at();

-- =============================================================
-- 3. Media
-- =============================================================
create table if not exists media_assets (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  kind        text        not null check (kind in ('image', 'video', 'document', 'vector')),
  bucket      text        not null default 'media',
  path        text        not null,
  src         text        not null,
  alt         text        not null default '',
  bytes       bigint      not null default 0,
  width       integer     not null default 0,
  height      integer     not null default 0,
  folder      text        not null default 'uploads',
  uploaded_by uuid references portal_users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint media_assets_unique_path unique (bucket, path)
);

create index if not exists media_assets_folder_idx on media_assets (folder, created_at desc);

drop trigger if exists media_assets_updated on media_assets;
create trigger media_assets_updated before update on media_assets
  for each row execute function set_updated_at();

-- =============================================================
-- 4. Leads
-- =============================================================
create table if not exists leads (
  id              uuid primary key default gen_random_uuid(),
  reference       text        not null unique,
  status          lead_status not null default 'new',
  source          lead_source not null default 'contact',

  name            text        not null,
  email           citext      not null,
  phone           text        not null default '',
  company         text        not null default '',
  property_type   text        not null default '' check (property_type in ('', 'residential', 'commercial')),

  service_slug    text        not null default '',
  asset_details   text        not null default '',
  panel_count     integer     check (panel_count is null or panel_count >= 0),
  estimated_value numeric(12, 2) check (estimated_value is null or estimated_value >= 0),

  message         text        not null default '',
  page_url        text        not null default '',
  consent         boolean     not null default false,

  assigned_to     uuid references portal_users (id) on delete set null,

  -- Full application-shaped document, so the app reads one row per lead.
  data            jsonb       not null default '{}'::jsonb,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists leads_status_idx      on leads (status, created_at desc);
create index if not exists leads_created_idx     on leads (created_at desc);
create index if not exists leads_service_idx     on leads (service_slug) where service_slug <> '';
create index if not exists leads_assigned_idx    on leads (assigned_to) where assigned_to is not null;
create index if not exists leads_email_idx       on leads (email);
create index if not exists leads_search_idx      on leads using gin (
  (coalesce(name, '') || ' ' || coalesce(email::text, '') || ' ' || coalesce(company, '')) gin_trgm_ops
);

drop trigger if exists leads_updated on leads;
create trigger leads_updated before update on leads
  for each row execute function set_updated_at();

create table if not exists lead_notes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references leads (id) on delete cascade,
  author_id  uuid references portal_users (id) on delete set null,
  author     text not null default 'Portal',
  body       text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_idx on lead_notes (lead_id, created_at desc);

create table if not exists lead_events (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references leads (id) on delete cascade,
  kind       text not null check (kind in ('created', 'status', 'note', 'assignment')),
  from_value text,
  to_value   text,
  body       text,
  author     text not null default 'Portal',
  created_at timestamptz not null default now()
);

create index if not exists lead_events_lead_idx on lead_events (lead_id, created_at desc);

-- Human-readable reference numbers: PD-26-0001
create sequence if not exists lead_reference_seq;

create or replace function next_lead_reference()
returns text
language sql
as $$
  select 'PD-' || to_char(now(), 'YY') || '-' ||
         lpad(nextval('lead_reference_seq')::text, 4, '0');
$$;

-- =============================================================
-- 5. Analytics
-- =============================================================
create table if not exists analytics_events (
  id         uuid primary key default gen_random_uuid(),
  kind       text not null check (kind in ('pageview', 'lead', 'calculator', 'cta')),
  path       text not null default '/',
  referrer   text not null default '',
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_created_idx on analytics_events (created_at desc);
create index if not exists analytics_kind_idx    on analytics_events (kind, created_at desc);
create index if not exists analytics_path_idx    on analytics_events (path, created_at desc);

-- Daily rollup for the portal's charts, so long ranges never scan raw rows.
create or replace view analytics_daily as
select
  date_trunc('day', created_at)::date              as day,
  kind,
  count(*)                                         as events,
  count(distinct path)                             as paths
from analytics_events
group by 1, 2;

-- =============================================================
-- 6. Audit trail
-- =============================================================
create table if not exists audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references portal_users (id) on delete set null,
  actor_email text,
  action      text not null,          -- 'update' | 'insert' | 'delete'
  entity      text not null,          -- table name
  entity_id   text,
  before      jsonb,
  after       jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists audit_log_entity_idx  on audit_log (entity, created_at desc);
create index if not exists audit_log_actor_idx   on audit_log (actor_id, created_at desc);

create or replace function record_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
begin
  insert into audit_log (actor_id, action, entity, entity_id, before, after)
  values (
    actor,
    lower(tg_op),
    tg_table_name,
    coalesce(
      to_jsonb(case when tg_op = 'DELETE' then old else new end) ->> 'id',
      to_jsonb(case when tg_op = 'DELETE' then old else new end) ->> 'key'
    ),
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists audit_site_settings on site_settings;
create trigger audit_site_settings
  after insert or update or delete on site_settings
  for each row execute function record_audit();

drop trigger if exists audit_site_collections on site_collections;
create trigger audit_site_collections
  after insert or update or delete on site_collections
  for each row execute function record_audit();

drop trigger if exists audit_leads on leads;
create trigger audit_leads
  after insert or update or delete on leads
  for each row execute function record_audit();

-- =============================================================
-- 7. Storage buckets
-- =============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media',    'media',    true,  26214400,
    array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','video/mp4','video/webm','application/pdf']),
  ('gallery',  'gallery',  true,  52428800,
    array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm']),
  ('brand',    'brand',    true,   5242880,
    array['image/svg+xml','image/png','image/webp','application/pdf']),
  ('private',  'private',  false, 26214400, null)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
