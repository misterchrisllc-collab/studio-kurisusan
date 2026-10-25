-- Story tab (project-level story fields), on-set "filmed" tracking for the
-- shot list, and stored AI setup suggestions per shot. Additive only.

alter table public.storyboard_projects
  add column if not exists logline   text not null default '',
  add column if not exists story     text not null default '',
  add column if not exists tone      text not null default '',
  add column if not exists audience  text not null default '',
  add column if not exists locations text not null default '',
  add column if not exists music     text not null default '';

alter table public.storyboard_shots
  add column if not exists filmed      boolean not null default false,
  -- Pending AI suggestions: [{ id, category, text }]. Kept apart from the
  -- shot's own fields so a suggestion is never mistaken for a decision.
  add column if not exists suggestions jsonb not null default '[]'::jsonb;
