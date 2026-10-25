-- Storyboards for the private admin area (/admin/storyboards).
-- Same lockdown as contacts: RLS on, no policies. Every read and write goes
-- through the server with the service-role key after an admin check.

create table if not exists public.storyboard_projects (
  id              uuid primary key default gen_random_uuid(),
  title           text not null default 'Untitled storyboard',
  client_name     text not null default '',
  description     text not null default '',
  notes           text not null default '',
  format          text not null default '16:9' check (format in ('9:16', '16:9', '1:1')),
  target_seconds  integer check (target_seconds is null or target_seconds between 1 and 36000),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.storyboard_shots (
  id                uuid primary key default gen_random_uuid(),
  project_id        uuid not null references public.storyboard_projects(id) on delete cascade,
  position          integer not null default 0,
  title             text not null default '',
  description       text not null default '',
  shot_size         text not null default '',
  camera_angle      text not null default '',
  camera_movement   text not null default '',
  subject_action    text not null default '',
  script            text not null default '',
  audio_notes       text not null default '',
  lighting_notes    text not null default '',
  duration_seconds  numeric(6,1) check (duration_seconds is null or duration_seconds >= 0),
  production_notes  text not null default '',
  -- Storage object paths inside the storyboard-assets bucket (never URLs).
  reference_path    text,
  sketch_path       text,
  -- Which image sits under the drawing: none (blank), reference or sketch.
  background        text not null default 'none' check (background in ('none', 'reference', 'sketch')),
  -- Editable vector strokes, kept separate from the images. See lib/storyboards/drawing.ts.
  drawing           jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.storyboard_projects enable row level security;
alter table public.storyboard_shots enable row level security;

create index if not exists storyboard_projects_updated_at_idx
  on public.storyboard_projects (updated_at desc);
create index if not exists storyboard_shots_project_position_idx
  on public.storyboard_shots (project_id, position);

-- Private bucket for reference images and generated sketches.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('storyboard-assets', 'storyboard-assets', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
