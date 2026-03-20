create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null default 0,
  image text not null,
  stock integer not null default 1,
  category text not null,
  accent text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy if not exists "Public can view products"
on public.products
for select
to public
using (true);

create policy if not exists "Authenticated users can insert products"
on public.products
for insert
to authenticated
with check (true);

create policy if not exists "Authenticated users can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

create policy if not exists "Authenticated users can delete products"
on public.products
for delete
to authenticated
using (true);
