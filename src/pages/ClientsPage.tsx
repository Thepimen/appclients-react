import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';
import { AuthService } from '../services/AuthService';

export default function ClientsPage() {

  const [clients, setClients] = useState<Client[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    loadClients();
    checkAuth();
  }, []);

  const loadClients = async () => {
    const data = await ClientsService.getClients();
    setClients(data);
  };

  const checkAuth = async () => {
    const ok = await AuthService.isAuthenticated();
    setIsLogged(ok);
  };

  const deleteClient = async (id?: number) => {
    if (!id) return;

    const ok = confirm('¿Eliminar cliente?');
    if (!ok) return;

    await ClientsService.deleteClient(id);
    loadClients();
  };

  const logout = async () => {
    await AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Clientes</h2>

        <div>
          {isLogged ? (
            <button
              className="btn btn-secondary"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-primary"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>

      {isLogged && (
        <Link
          to="/new-client"
          className="btn btn-primary mb-3"
        >
          Nuevo Cliente
        </Link>
      )}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <Link
                  to={`/edit-client/${c.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteClient(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
