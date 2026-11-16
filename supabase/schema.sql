-- ============================================================================
-- Seguimiento 16-11-2026: AppClients React (Supabase + PostgreSQL + Bootstrap)
-- Autor: Luis Lázaro Pimentel - 2º DAM - Instituto Nebrija FP
-- ============================================================================

create table if not exists public.clients (
  id bigint generated always as identity primary key,
  name varchar(100) not null,
  email varchar(100) not null,
  phone varchar(20) not null
);

-- Permisos y política de acceso para cliente frontend con clave pública (práctica 2º DAM)
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.clients to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

alter table public.clients enable row level security;

drop policy if exists "lab_clients_public_access" on public.clients;
create policy "lab_clients_public_access"
  on public.clients
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Datos iniciales de ejemplo (evitando duplicados si ya existen)
insert into public.clients (name, email, phone)
select v.name, v.email, v.phone
from (
  values
    ('Juan', 'juan@test.com', '600111111'),
    ('Ana', 'ana@test.com', '600222222')
) as v(name, email, phone)
where not exists (
  select 1 from public.clients c where c.email = v.email
);
