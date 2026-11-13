-- ============================================================================
-- Seguimiento de clase 13-11-2026: AppClients React (Supabase + PostgreSQL)
-- Autor: Luis Lázaro Pimentel - 2º DAM - Instituto Nebrija FP
-- ============================================================================

create table if not exists clients (
  id bigint generated always as identity primary key,
  name varchar(100),
  email varchar(100),
  phone varchar(20)
);

truncate table clients restart identity;

insert into clients (name, email, phone) values
('Juan', 'juan@test.com', '600111111'),
('Ana', 'ana@test.com', '600222222');
