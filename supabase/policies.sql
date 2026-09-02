-- =============================================================
-- PERFECT DETAILING — row level security
--
-- Two audiences:
--   • the public website, reading published content anonymously
--   • the portal, which writes as the service role
--
-- The service role bypasses RLS entirely, so these policies define
-- what an anonymous or signed-in visitor may do. Nothing here
-- grants public write access to content, and no policy exposes a
-- lead to anyone but staff.
-- =============================================================

alter table portal_users      enable row level security;
alter table site_settings     enable row level security;
alter table site_collections  enable row level security;
alter table media_assets      enable row level security;
alter table leads             enable row level security;
alter table lead_notes        enable row level security;
alter table lead_events       enable row level security;
alter table analytics_events  enable row level security;
alter table audit_log         enable row level security;

-- Helper: is the current JWT a member of staff?
create or replace function is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from portal_users u
    where u.auth_id = auth.uid()
      and u.active
  );
$$;

-- -------------------------------------------------------------
-- Content: world-readable, staff-writable
-- -------------------------------------------------------------
drop policy if exists site_settings_read on site_settings;
create policy site_settings_read on site_settings
  for select using (true);

drop policy if exists site_settings_write on site_settings;
create policy site_settings_write on site_settings
  for all using (is_staff()) with check (is_staff());

drop policy if exists site_collections_read on site_collections;
create policy site_collections_read on site_collections
  for select using (status = 'published' or is_staff());

drop policy if exists site_collections_write on site_collections;
create policy site_collections_write on site_collections
  for all using (is_staff()) with check (is_staff());

drop policy if exists media_assets_read on media_assets;
create policy media_assets_read on media_assets
  for select using (true);

drop policy if exists media_assets_write on media_assets;
create policy media_assets_write on media_assets
  for all using (is_staff()) with check (is_staff());

-- -------------------------------------------------------------
-- Leads: nobody reads them but staff.
--
-- Anonymous inserts are NOT permitted here. The website submits
-- through a server action using the service role, which keeps the
-- anon key from being usable to flood the table directly.
-- -------------------------------------------------------------
drop policy if exists leads_staff_all on leads;
create policy leads_staff_all on leads
  for all using (is_staff()) with check (is_staff());

drop policy if exists lead_notes_staff_all on lead_notes;
create policy lead_notes_staff_all on lead_notes
  for all using (is_staff()) with check (is_staff());

drop policy if exists lead_events_staff_all on lead_events;
create policy lead_events_staff_all on lead_events
  for all using (is_staff()) with check (is_staff());

-- -------------------------------------------------------------
-- Analytics: staff read only; writes come from the server action.
-- -------------------------------------------------------------
drop policy if exists analytics_staff_read on analytics_events;
create policy analytics_staff_read on analytics_events
  for select using (is_staff());

-- -------------------------------------------------------------
-- Staff directory and audit trail
-- -------------------------------------------------------------
drop policy if exists portal_users_self_read on portal_users;
create policy portal_users_self_read on portal_users
  for select using (auth.uid() = auth_id or is_staff());

drop policy if exists portal_users_owner_write on portal_users;
create policy portal_users_owner_write on portal_users
  for all using (
    exists (select 1 from portal_users u where u.auth_id = auth.uid() and u.role = 'owner' and u.active)
  ) with check (
    exists (select 1 from portal_users u where u.auth_id = auth.uid() and u.role = 'owner' and u.active)
  );

drop policy if exists audit_log_staff_read on audit_log;
create policy audit_log_staff_read on audit_log
  for select using (is_staff());

-- -------------------------------------------------------------
-- Storage
-- -------------------------------------------------------------
drop policy if exists storage_public_read on storage.objects;
create policy storage_public_read on storage.objects
  for select using (bucket_id in ('media', 'gallery', 'brand'));

drop policy if exists storage_staff_write on storage.objects;
create policy storage_staff_write on storage.objects
  for all using (bucket_id in ('media', 'gallery', 'brand', 'private') and is_staff())
  with check (bucket_id in ('media', 'gallery', 'brand', 'private') and is_staff());
