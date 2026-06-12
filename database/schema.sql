-- Health-ID production MVP schema
-- Run in Supabase SQL editor after reviewing project-specific requirements.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default auth.uid(),
  email text,
  full_name text,
  role text default 'patient' check (role in ('patient', 'doctor')),
  preferred_language text default 'en',
  created_at timestamp with time zone default now()
);

create table if not exists public.medical_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  category text,
  file_url text,
  ai_summary text,
  created_at timestamp with time zone default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references auth.users(id) on delete cascade,
  doctor_name text,
  specialty text,
  appointment_date timestamp with time zone,
  status text default 'pending'
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  messages jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  language text default 'en',
  notifications_enabled boolean default true,
  privacy_mode boolean default true
);

alter table public.profiles enable row level security;
alter table public.medical_records enable row level security;
alter table public.appointments enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.settings enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);

create policy "Users can read own medical records"
  on public.medical_records for select
  using (auth.uid() = user_id);

create policy "Users can insert own medical records"
  on public.medical_records for insert
  with check (auth.uid() = user_id);

create policy "Users can update own medical records"
  on public.medical_records for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own medical records"
  on public.medical_records for delete
  using (auth.uid() = user_id);

create policy "Users can read own appointments"
  on public.appointments for select
  using (auth.uid() = patient_id);

create policy "Users can insert own appointments"
  on public.appointments for insert
  with check (auth.uid() = patient_id);

create policy "Users can update own appointments"
  on public.appointments for update
  using (auth.uid() = patient_id)
  with check (auth.uid() = patient_id);

create policy "Users can delete own appointments"
  on public.appointments for delete
  using (auth.uid() = patient_id);

create policy "Users can read own AI conversations"
  on public.ai_conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert own AI conversations"
  on public.ai_conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own AI conversations"
  on public.ai_conversations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own AI conversations"
  on public.ai_conversations for delete
  using (auth.uid() = user_id);

create policy "Users can read own settings"
  on public.settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own settings"
  on public.settings for delete
  using (auth.uid() = user_id);
