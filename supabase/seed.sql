-- =============================================================
-- PERFECT DETAILING — initial data
--
-- Note on content: the application treats its own seed content as
-- the floor and stores only what an editor has changed. That means
-- you do NOT need to import page copy here — connect the database,
-- open the portal, and the first save of any module writes that
-- module's row. Until then the site renders from the built-in
-- defaults.
--
-- What is worth inserting is the staff directory, because RLS
-- policies key off it.
-- =============================================================

-- Replace the email with the address you will sign in with, and
-- link auth_id once you have created the matching Supabase Auth user.
insert into portal_users (name, email, role, active)
values ('Owner', 'hello@perfectdetailing.co.za', 'owner', true)
on conflict (email) do update
  set role = excluded.role,
      active = excluded.active;

-- Example: attach the portal user to a Supabase Auth account.
-- update portal_users
--    set auth_id = '00000000-0000-0000-0000-000000000000'
--  where email = 'hello@perfectdetailing.co.za';

-- Start lead references at a sensible number if you are migrating
-- from an existing system.
-- select setval('lead_reference_seq', 42);
