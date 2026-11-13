# AppClients React — Ionic React + Supabase + PostgreSQL + Bootstrap + Auth

**Seguimiento de clase 13-11-2026**
- **Alumno:** Luis Lázaro Pimentel
- **Centro:** Instituto Nebrija de Formación Profesional
- **Ciclo:** 2º Desarrollo de Aplicaciones Multiplataforma (DAM)
- **Módulo:** Desarrollo de Interfaces / Programación Multimedia y Dispositivos Móviles

---

## Arquitectura del Proyecto (`src/`)

```text
src/
├── config/
│   └── supabase.ts
├── interfaces/
│   └── Client.ts
├── services/
│   ├── ClientsService.ts
│   └── AuthService.ts
├── routes/
│   └── ProtectedRoute.tsx
├── pages/
│   ├── ClientsPage.tsx
│   ├── NewClientPage.tsx
│   ├── EditClientPage.tsx
│   └── LoginPage.tsx
└── App.tsx
```

## Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto (excluido en `.gitignore` por seguridad):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-anon-public-key
```

## Credenciales de Prueba (Supabase Auth)
- **Email:** `alumno@centro.es` (o `profesor@centro.es`)
- **Password:** `123456`
