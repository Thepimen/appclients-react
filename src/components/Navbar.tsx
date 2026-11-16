import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SupabaseConnectionStatus } from '../config/supabase';

interface NavbarProps {
  connectionStatus: SupabaseConnectionStatus | null;
}

export default function Navbar({ connectionStatus }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top" aria-label="Navegación principal">
      <div className="container py-1">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/clients" onClick={closeMenu}>
          <span>AppClients</span>
          <span className="badge text-bg-primary fw-semibold" style={{ fontSize: '0.72rem' }}>
            2º DAM · 16-11-2026
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbarNav"
          aria-expanded={menuOpen}
          aria-label="Alternar menú de navegación"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="mainNavbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                to="/clients"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Ver clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add-client"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Añadir clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            {connectionStatus === null ? (
              <span className="status-pill bg-secondary bg-opacity-25 text-light border border-secondary">
                <span className="status-dot bg-warning" />
                Comprobando Supabase...
              </span>
            ) : connectionStatus.ok ? (
              <span
                className="status-pill bg-success bg-opacity-25 text-white border border-success"
                title={`Conectado a ${connectionStatus.projectUrl}`}
              >
                <span className="status-dot bg-success" />
                Supabase conectado
              </span>
            ) : (
              <span
                className="status-pill bg-danger bg-opacity-25 text-white border border-danger"
                title={connectionStatus.errorMessage ?? 'Error de conexión'}
              >
                <span className="status-dot bg-danger" />
                Error Supabase
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
