export default function AboutPage() {
  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-lg-7">
          <section className="surface-card p-4 h-100" aria-label="Descripción técnica del proyecto y perfil">
            <span className="badge text-bg-primary mb-2">Seguimiento 16-11-2026 · Desarrollo de Interfaces</span>
            <h1 className="h3 fw-bold mb-3">Sobre AppClients React</h1>

            <p className="text-body-secondary">
              Esta aplicación web SPA ha sido diseñada y desarrollada por <strong>Luis Lázaro Pimentel</strong>,
              estudiante de <strong>2º de Desarrollo de Aplicaciones Multiplataforma (DAM)</strong> en el{' '}
              <strong>Instituto Nebrija de Formación Profesional</strong>, con{' '}
              <strong>formación previa en Ingeniería del Software en U-tad</strong>.
            </p>

            <p className="text-body-secondary">
              El proyecto constituye la evolución del módulo <em>AppClients React</em> integrando{' '}
              <strong>React 18 + TypeScript + Vite</strong> para el renderizado reactivo basado en componentes,{' '}
              <strong>Supabase (<code>@supabase/supabase-js</code>)</strong> como backend PostgreSQL y capa de API REST en la nube, y{' '}
              <strong>Bootstrap 5</strong> para ofrecer una interfaz responsiva, limpia y accesible desde cualquier
              dispositivo.
            </p>

            <h2 className="h5 fw-semibold mt-4 mb-3">Arquitectura y decisiones técnicas</h2>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item px-0">
                <strong>Conexión desacoplada con Supabase:</strong> Inicialización centralizada mediante variables de
                entorno <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_KEY</code> y verificación automática en
                consola (<code>verifySupabaseConnection</code>).
              </li>
              <li className="list-group-item px-0">
                <strong>Enrutamiento SPA resiliente:</strong> Rutas declarativas con <code>react-router-dom</code> (
                <code>/clients</code>, <code>/add-client</code>, <code>/about</code>) respaldadas por reglas{' '}
                <code>rewrites</code> en <code>vercel.json</code> para evitar errores 404 al recargar.
              </li>
              <li className="list-group-item px-0">
                <strong>Seguridad en el control de versiones:</strong> Exclusión explícita de secretos y artefactos de
                compilación mediante <code>.gitignore</code> (<code>.env</code>, <code>.env.*</code>,{' '}
                <code>node_modules</code>, <code>dist</code>, <code>build</code>).
              </li>
            </ul>

            <figure className="mb-0">
              <img
                src="/images/appclients-architecture.webp"
                alt="Diagrama de arquitectura AppClients React con Supabase PostgreSQL y despliegue en Vercel"
                width={1200}
                height={675}
                className="webp-showcase"
              />
              <figcaption className="small text-secondary mt-2">
                Recurso gráfico local servido en formato <code>.webp</code> desde{' '}
                <code>public/images/appclients-architecture.webp</code>.
              </figcaption>
            </figure>
          </section>
        </div>

        <div className="col-lg-5">
          <section className="surface-card p-4 mb-4" aria-label="Ficha académica del autor">
            <h2 className="h5 fw-bold mb-3">Ficha Académica</h2>
            <dl className="row mb-0 small">
              <dt className="col-sm-4 text-secondary">Alumno</dt>
              <dd className="col-sm-8 fw-semibold">Luis Lázaro Pimentel</dd>

              <dt className="col-sm-4 text-secondary">Formación previa</dt>
              <dd className="col-sm-8">Ingeniería del Software (U-tad)</dd>

              <dt className="col-sm-4 text-secondary">Centro actual</dt>
              <dd className="col-sm-8">Instituto Nebrija de Formación Profesional</dd>

              <dt className="col-sm-4 text-secondary">Ciclo / Módulo</dt>
              <dd className="col-sm-8">2º DAM · Desarrollo de Interfaces</dd>

              <dt className="col-sm-4 text-secondary">Stack</dt>
              <dd className="col-sm-8 mb-0">React · Supabase · Bootstrap · Vercel</dd>
            </dl>
          </section>

          <section className="surface-card p-4" aria-label="Vídeo técnico embebido sobre Supabase">
            <h2 className="h5 fw-bold mb-2">Recurso Técnico Multimedia</h2>
            <p className="small text-secondary mb-3">
              Introducción técnica a la arquitectura PostgreSQL y APIs instantáneas de Supabase utilizada en esta aplicación.
            </p>
            <div className="ratio ratio-16x9 rounded overflow-hidden border">
              <iframe
                src="https://www.youtube.com/embed/zBZgdTb-dns"
                title="Supabase in 100 Seconds - Arquitectura PostgreSQL y SDK"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
