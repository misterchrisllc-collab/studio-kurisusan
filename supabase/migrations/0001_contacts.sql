-- Contact form submissions for STUDIOくりすさん
-- Run this in your Supabase project's SQL editor (or via the CLI / Management API).

create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  email       text not null,
  shoot_type  text,
  message     text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security. Inserts happen server-side with the service-role
-- key (which bypasses RLS), so no public policies are granted. This keeps the
-- table locked down to anonymous/public clients while the contact form works.
alter table public.contacts enable row level security;

-- Helpful index for reviewing leads newest-first.
create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);
