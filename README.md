# AppClients React — React + Supabase (PostgreSQL) + Bootstrap

**Seguimiento 16-11-2026 (Evolución sobre base 13-11-2026)**
- **Alumno:** Luis Lázaro Pimentel (formación previa en Ingeniería del Software en U-tad)
- **Centro:** Instituto Nebrija de Formación Profesional
- **Ciclo:** 2º Desarrollo de Aplicaciones Multiplataforma (DAM)
- **Módulo:** Desarrollo de Interfaces

---

## Arquitectura del Proyecto (`src/` y `public/`)

```text
appclients-react/
├── public/
│   └── images/
│       └── appclients-architecture.webp
├── supabase/
│   └── schema.sql
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── config/
│   │   └── supabase.ts
│   ├── interfaces/
│   │   └── Client.ts
│   ├── pages/
│   │   ├── ClientsPage.tsx
│   │   ├── AddClientPage.tsx
│   │   ├── EditClientPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── LoginPage.tsx
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── ClientsService.ts
│   ├── styles/
│   │   └── app.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── .gitignore
├── package.json
└── vercel.json
```

## Funcionalidades Principales (16-11-2026)
- **Verificación real de Supabase en consola:** Al iniciar la aplicación, `verifySupabaseConnection()` valida la sesión y consulta la tabla `clients`, imprimiendo `"Conexión correcta"` junto con los metadatos de conexión.
- **Ver clientes (`/clients`):** Lectura real en Supabase PostgreSQL (`select('*')`), estados de carga, lista vacía, gestión explícita de errores y edición/borrado.
- **Añadir clientes (`/add-client`):** Formulario controlado validado para insertar registros reales en `clients` (`insert`).
- **About (`/about`):** Perfil técnico de Luis Lázaro Pimentel, imagen local `.webp` en `public/images/appclients-architecture.webp` y vídeo técnico embebido de YouTube.
- **Seguridad `.gitignore` y SPA Routing:** `.env`, `.env.*`, `node_modules`, `dist` y `build` excluidos de Git; `vercel.json` con rewrite hacia `/index.html`.
